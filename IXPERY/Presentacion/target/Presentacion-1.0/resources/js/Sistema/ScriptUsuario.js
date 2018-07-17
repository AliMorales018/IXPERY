var idFila_usuario = 1;
var cFila_usuario = 1;
var arrayElem_usuario = [];
var arrayElemV_usuario = [];
var array_usuario = [];
var totalCol_usuario;
var tabla_usuario;
var tbody_usuario;
var valorNodo_usuario;
var childNodo_usuario;
var btnNuevo_usuario;
var nomTabl_usuario;
var nomBody_usuario;
var txtHiFi_usuario;
var txtInVa_usuario;
var idPriFilaBody_usuario = "firstRowBody_usuario";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_usuario
filaTabla_usuario = filaTabla_usuario + "<tr id='" + idPriFilaBody_usuario + "'>";
filaTabla_usuario = filaTabla_usuario + $("#" + idPriFilaBody_usuario).html();
filaTabla_usuario = filaTabla_usuario + "</tr>";
//Fin primera fila.

CargarJS_usuario(0,0,0);

function CargarJS_usuario(estado, childNodes, reloadTabla) {

    idFila_usuario = 1;
    cFila_usuario = 1;
    arrayElem_usuario = [];
    arrayElemV_usuario = [];
    array_usuario = [];
    childNodo_usuario = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_usuario).html(filaTabla_usuario);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_usuario").css('display', 'none');

    //Valores Script
    btnNuevo_usuario = "btn_usuario_nue";
    //Btn de reload nuevo.
    btnNuevo_usuario_reload = "btn_usuario_nue_reload";
    //Btn guardar.
    btn_usuario_save = "btn_usuario_save";
    //Nombre de la tabla
    nomTabl_usuario = "tbl_usuario";
    //Nombre del body
    nomBody_usuario = "tbody_usuario";
    //Contar fila de tabla
    txtHiFi_usuario = "hdn_usuario";
    //Validar Base de Datos
    txtInVa_usuario = "hdn_usuario_isvalid";
    //ID del Body
    idPriFilaBody_usuario = "firstRowBody_usuario";


    //Alternar botones Nuevo
    $("#" + btnNuevo_usuario).css('display', 'inline');
    $("#" + btnNuevo_usuario_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_usuario_save).attr("disabled", false);

    if (estado == 0) {

        tabla_usuario = document.getElementById(nomTabl_usuario);
        tbody_usuario = document.getElementById(nomBody_usuario);
        document.getElementById(txtHiFi_usuario).value = cFila_usuario;

        if (childNodo_usuario == 0 && reloadTabla == 0) {
            totalCol_usuario = tbody_usuario.childNodes[1].children.length;
            $("#" + btnNuevo_usuario).on('click', function () {
                idFila_usuario++;
                funcNuevaLinea_tbl_usuario(idFila_usuario, tabla_usuario.id);
                document.getElementById(txtHiFi_usuario).value = cFila_usuario;
            });
        }

        for (var i = 1; i <= totalCol_usuario; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_usuario);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_usuario.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_usuario.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_usuario(id) {
    var idTabla = tabla_usuario.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_usuario(idTabla);
        cFila_usuario = cFila_usuario - 1;
        document.getElementById(txtHiFi_usuario).value = cFila_usuario;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_usuario(idTabla);
        cFila_usuario = cFila_usuario - 1;
        document.getElementById(txtHiFi_usuario).value = cFila_usuario;
    }
    ReordenarId_tbl_usuario(idTabla);
}

function Reordenar_num_tbl_usuario(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_usuario(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_usuario = document.getElementById(nomBody_usuario);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_usuario == 1) {
        valorNodo_usuario = 0;
        cantFilas = cFila_usuario - 1;
    }

    else {
        valorNodo_usuario = 1;
        cantFilas = cFila_usuario + 1;
    }

    for (var i = valorNodo_usuario; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_usuario - 1) * 2) + 1; j += 2) {
                child = tbody_usuario.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_usuario[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_usuario == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_usuario - 2; j++) {
                child = tbody_usuario.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_usuario[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_usuario(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_usuario++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_usuario)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_usuario; i++) {
                            var tagName = arrayElem_usuario[i][0];
                            var idText = arrayElem_usuario[i][1];
                            var type = arrayElem_usuario[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_usuario + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_usuario + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_usuario + "' onclick='eliminar_fila_tbl_usuario(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_usuario + "' name='" + idText + idFila_usuario + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_usuario + "'><script type='text/javascript'>$('#" + idDiv + idFila_usuario + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_usuario + "').attr('id','" + idText + idFila_usuario + "').attr('name','" + idText + idFila_usuario + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_usuario + "'><script type='text/javascript'>$('#" + idDiv + idFila_usuario + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_usuario + "').attr('id','" + idText + idFila_usuario + "').attr('name','" + idText + idFila_usuario + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_usuario(idTabla);
    ReordenarId_tbl_usuario(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_usuario() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_usuario = document.getElementById(nomTabl_usuario);
    var idTabla = tabla_usuario.id;
    nFilas = $('#' + txtHiFi_usuario).val();
    array_usuario = ObtenerValores_tbl_usuario(nFilas);
    document.getElementById(txtInVa_usuario).value = "true";
    for (var a = 0; a < array_usuario.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_usuario[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_usuario[a][j - 1][1] != id) {
                    if (array_usuario[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_usuario).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_usuario).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_usuario).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_usuario; i++) {
            if (validoIngresados == true) {
                var filaData = [];
                for (var j = 1; j <= totalCol_usuario - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_usuario[j][1];
                    id = "#" + id.substring(0, id.length - 1);
                    obj = $(id + i);
                    filaData[j - 1] = obj.val();

                    //Validando Campos Vacios tipo INPUT
                    if (obj[0].tagName == 'INPUT') {
                        if (obj.val().length == 0) {
                            validoIngresados = false;
                            obj.addClass("is-invalid");
                            obj.focus();
                            break;
                        }
                    }
                    //Fin Validacion de campos vacios.
                }
            }
            else {
                break;
            }
            arrayDatos.push(filaData);
        }
        //LISTA CON DATOS
        var arrayData = {
            values: arrayDatos
        }

        if (validoIngresados == true) {
            //METODO AJAX
            $.ajax({
                method: "POST",
                url: "/usuario/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Usuario(s) registrado(s) correctamente.");
                        $("#" + nomBody_usuario).html(filaTabla_usuario);
                        CargarJS_usuario(0, 1, 0);
                    }
                    else {
                        console.log("ENTRO AQUI alert");
                        alert(valor);
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
        else {
            alert("No puede ingresar un campo vacio.");
        }
    }
}

function ObtenerValores_tbl_usuario(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_usuario.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_usuario[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Usuario(posicionFila) {
    var i = $("#txt_usuario_idusu" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/usuario/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Usuario.");
                $("#fila_Usuario" + posicionFila).remove();
                Reordenar_num_tbl_usuario("tbl_usuario");
            }
        },
        error:   function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Usuario(posicionFila) {

    var i = $("#txt_usuario_idusu" + posicionFila).val();
    var usr = $("#Vtxt_usuario_user" + posicionFila).val();
    var nom = $("#txt_usuario_nombre" + posicionFila).val();
    var ap = $("#txt_usuario_apep" + posicionFila).val();
    var am = $("#txt_usuario_apem" + posicionFila).val();
    var est = $("#cmb_usuario_estado" + posicionFila).val();
    var cla = $("#txt_usuario_clave" + posicionFila).val();
    var idp = $("#cmb_usuario_empleado" + posicionFila).val();
    var ema = $("#txt_usuario_correo" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/usuario/edit",
        data: {"i":i,"usr":usr,"nom":nom,"ap":ap,"am":am,"est":est,"cla":cla,"idp":idp,"ema":ema},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Usuario Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_Usuario() {
    //Alterna funcion del boton nuevo.
    $("#btn_usuario_nue").css("display", "none");
    $("#btn_usuario_nue_reload").css("display", "inline");
    $("#btn_usuario_save").attr("disabled", true);

    //Deshabilitar Botones
    $("#btn_usuario_bususer").attr("disabled", true);
    $("#btn_usuario_busnom").attr("disabled", true);
    $("#btn_usuario_busapep").attr("disabled", true);
    $("#btn_usuario_busapem").attr("disabled", true);

    var user = $("#txt_usuario_bususer").val().toUpperCase();
    var nom =  $("#txt_usuario_busnom").val().toUpperCase();
    var apep = $("#txt_usuario_busapep").val().toUpperCase();
    var apem = $("#txt_usuario_busapem").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/usuario/search",
        data: {"user":user,"nom":nom,"apep":apep,"apem":apem},
        success: function resultado(valor) {
            //Habilitar Botones
            $("#btn_usuario_bususer").attr("disabled", false);
            $("#btn_usuario_busnom").attr("disabled",  false);
            $("#btn_usuario_busapep").attr("disabled", false);
            $("#btn_usuario_busapem").attr("disabled", false);

            $("#thEditar_usuario").css("display", "block");
            $("#" + nomBody_usuario).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}