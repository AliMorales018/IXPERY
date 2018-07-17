var idFila_perfilusuario = 1;
var cFila_perfilusuario = 1;
var arrayElem_perfilusuario = [];
var arrayElemV_perfilusuario = [];
var array_perfilusuario = [];
var totalCol_perfilusuario;
var tabla_perfilusuario;
var tbody_perfilusuario;
var valorNodo_perfilusuario;
var childNodo_perfilusuario;
var btnNuevo_perfilusuario;
var nomTabl_perfilusuario;
var nomBody_perfilusuario;
var txtHiFi_perfilusuario;
var txtInVa_perfilusuario;
var idPriFilaBody_perfilusuario = "firstRowBody_perfilusuario";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_perfilusuario
filaTabla_perfilusuario = filaTabla_perfilusuario + "<tr id='" + idPriFilaBody_perfilusuario + "'>";
filaTabla_perfilusuario = filaTabla_perfilusuario + $("#" + idPriFilaBody_perfilusuario).html();
filaTabla_perfilusuario = filaTabla_perfilusuario + "</tr>";
//Fin primera fila.

CargarJS_perfilusuario(0,0,0);

function CargarJS_perfilusuario(estado, childNodes, reloadTabla) {

    idFila_perfilusuario = 1;
    cFila_perfilusuario = 1;
    arrayElem_perfilusuario = [];
    arrayElemV_perfilusuario = [];
    array_perfilusuario = [];
    childNodo_perfilusuario = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_perfilusuario).html(filaTabla_perfilusuario);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_perfilusuario").css('display', 'none');

    //Valores Script
    btnNuevo_perfilusuario = "btn_perfilusuario_nue";
    //Btn de reload nuevo.
    btnNuevo_perfilusuario_reload = "btn_perfilusuario_nue_reload";
    //Btn guardar.
    btn_perfilusuario_save = "btn_perfilusuario_save";
    //Nombre de la tabla
    nomTabl_perfilusuario = "tbl_perfilusuario";
    //Nombre del body
    nomBody_perfilusuario = "tbody_perfilusuario";
    //Contar fila de tabla
    txtHiFi_perfilusuario = "hdn_perfilusuario";
    //Validar Base de Datos
    txtInVa_perfilusuario = "hdn_perfilusuario_isvalid";
    //ID del Body
    idPriFilaBody_perfilusuario = "firstRowBody_perfilusuario";


    //Alternar botones Nuevo
    $("#" + btnNuevo_perfilusuario).css('display', 'inline');
    $("#" + btnNuevo_perfilusuario_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_perfilusuario_save).attr("disabled", false);

    if (estado == 0) {

        tabla_perfilusuario = document.getElementById(nomTabl_perfilusuario);
        tbody_perfilusuario = document.getElementById(nomBody_perfilusuario);
        document.getElementById(txtHiFi_perfilusuario).value = cFila_perfilusuario;

        if (childNodo_perfilusuario == 0 && reloadTabla == 0) {
            totalCol_perfilusuario = tbody_perfilusuario.childNodes[1].children.length;
            $("#" + btnNuevo_perfilusuario).on('click', function () {
                idFila_perfilusuario++;
                funcNuevaLinea_tbl_perfilusuario(idFila_perfilusuario, tabla_perfilusuario.id);
                document.getElementById(txtHiFi_perfilusuario).value = cFila_perfilusuario;
            });
        }

        for (var i = 1; i <= totalCol_perfilusuario; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_perfilusuario);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_perfilusuario.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_perfilusuario.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_perfilusuario(id) {
    var idTabla = tabla_perfilusuario.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_perfilusuario(idTabla);
        cFila_perfilusuario = cFila_perfilusuario - 1;
        document.getElementById(txtHiFi_perfilusuario).value = cFila_perfilusuario;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_perfilusuario(idTabla);
        cFila_perfilusuario = cFila_perfilusuario - 1;
        document.getElementById(txtHiFi_perfilusuario).value = cFila_perfilusuario;
    }
    ReordenarId_tbl_perfilusuario(idTabla);
}

function Reordenar_num_tbl_perfilusuario(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_perfilusuario(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_perfilusuario = document.getElementById(nomBody_perfilusuario);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_perfilusuario == 1) {
        valorNodo_perfilusuario = 0;
        cantFilas = cFila_perfilusuario - 1;
    }

    else {
        valorNodo_perfilusuario = 1;
        cantFilas = cFila_perfilusuario + 1;
    }

    for (var i = valorNodo_perfilusuario; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_perfilusuario - 1) * 2) + 1; j += 2) {
                child = tbody_perfilusuario.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_perfilusuario[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_perfilusuario == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_perfilusuario - 2; j++) {
                child = tbody_perfilusuario.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_perfilusuario[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_perfilusuario(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_perfilusuario++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_perfilusuario)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_perfilusuario; i++) {
                            var tagName = arrayElem_perfilusuario[i][0];
                            var idText = arrayElem_perfilusuario[i][1];
                            var type = arrayElem_perfilusuario[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_perfilusuario + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_perfilusuario + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='d-flex justify-content-center'><button class='btn btn-sm-delete' id='" + idText + idFila_perfilusuario + "' onclick='eliminar_fila_tbl_perfilusuario(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_perfilusuario + "' name='" + idText + idFila_perfilusuario + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_perfilusuario + "'><script type='text/javascript'>$('#" + idDiv + idFila_perfilusuario + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_perfilusuario + "').attr('id','" + idText + idFila_perfilusuario + "').attr('name','" + idText + idFila_perfilusuario + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_perfilusuario + "'><script type='text/javascript'>$('#" + idDiv + idFila_perfilusuario + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_perfilusuario + "').attr('id','" + idText + idFila_perfilusuario + "').attr('name','" + idText + idFila_perfilusuario + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_perfilusuario(idTabla);
    ReordenarId_tbl_perfilusuario(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_perfilusuario() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_perfilusuario = document.getElementById(nomTabl_perfilusuario);
    var idTabla = tabla_perfilusuario.id;
    nFilas = $('#' + txtHiFi_perfilusuario).val();
    array_perfilusuario = ObtenerValores_tbl_perfilusuario(nFilas);
    document.getElementById(txtInVa_perfilusuario).value = "true";
    for (var a = 0; a < array_perfilusuario.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_perfilusuario[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_perfilusuario[a][j - 1][1] != id) {
                    if (array_perfilusuario[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_perfilusuario).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_perfilusuario).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_perfilusuario).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_perfilusuario; i++) {
            if (validoIngresados == true) {
                var filaData = [];
                for (var j = 1; j <= totalCol_perfilusuario - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_perfilusuario[j][1];
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
                        $("#" + nomBody_perfilusuario).html(filaTabla_perfilusuario);
                        CargarJS_perfilusuario(0, 1, 0);
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

function ObtenerValores_tbl_perfilusuario(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_perfilusuario.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_perfilusuario[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_perfilusuario(posicionFila) {
    var i = $("#txt_perfilusuario_idusu" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/usuario/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Usuario.");
                $("#fila_perfilusuario" + posicionFila).remove();
                Reordenar_num_tbl_perfilusuario("tbl_perfilusuario");
            }
        },
        error:   function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_perfilusuario(posicionFila) {

    var i = $("#txt_perfilusuario_idusu" + posicionFila).val();
    var usr = $("#Vtxt_perfilusuario_user" + posicionFila).val();
    var nom = $("#txt_perfilusuario_nombre" + posicionFila).val();
    var ap = $("#txt_perfilusuario_apep" + posicionFila).val();
    var am = $("#txt_perfilusuario_apem" + posicionFila).val();
    var est = $("#cmb_perfilusuario_estado" + posicionFila).val();
    var cla = $("#txt_perfilusuario_clave" + posicionFila).val();
    var idp = $("#cmb_perfilusuario_empleado" + posicionFila).val();
    var ema = $("#txt_perfilusuario_correo" + posicionFila).val();

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

function buscar_perfilusuario() {
    //Alterna funcion del boton nuevo.
    $("#btn_perfilusuario_nue").css("display", "none");
    $("#btn_perfilusuario_nue_reload").css("display", "inline");
    $("#btn_perfilusuario_save").attr("disabled", true);

    var user = $("#txt_perfilusuario_bususer").val().toUpperCase();
    var nom =  $("#txt_perfilusuario_busnom").val().toUpperCase();
    var apep = $("#txt_perfilusuario_busapep").val().toUpperCase();
    var apem = $("#txt_perfilusuario_busapem").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/usuario/search",
        data: {"user":user,"nom":nom,"apep":apep,"apem":apem},
        success: function resultado(valor) {
            $("#thEditar_perfilusuario").css("display", "block");
            $("#" + nomBody_perfilusuario).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}