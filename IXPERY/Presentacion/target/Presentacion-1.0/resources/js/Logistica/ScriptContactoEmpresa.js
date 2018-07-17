var idFila_contactoempresa = 1;
var cFila_contactoempresa = 1;
var arrayElem_contactoempresa = [];
var arrayElemV_contactoempresa = [];
var array_contactoempresa = [];
var totalCol_contactoempresa;
var tabla_contactoempresa;
var tbody_contactoempresa;
var valorNodo_contactoempresa;
var childNodo_contactoempresa;
var btnNuevo_contactoempresa;
var nomTabl_contactoempresa;
var nomBody_contactoempresa;
var txtHiFi_contactoempresa;
var txtInVa_contactoempresa;
var idPriFilaBody_contactoempresa = "firstRowBody_contactoempresa";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_contactoempresa
filaTabla_contactoempresa = filaTabla_contactoempresa + "<tr id='" + idPriFilaBody_contactoempresa + "'>";
filaTabla_contactoempresa = filaTabla_contactoempresa + $("#" + idPriFilaBody_contactoempresa).html();
filaTabla_contactoempresa = filaTabla_contactoempresa + "</tr>";
//Fin primera fila.

CargarJS_contactoempresa(0,0,0);

function CargarJS_contactoempresa(estado, childNodes, reloadTabla) {
    modo_form_contactoempresa = "nuevo";
    idFila_contactoempresa = 1;
    cFila_contactoempresa = 1;
    arrayElem_contactoempresa = [];
    arrayElemV_contactoempresa = [];
    array_contactoempresa = [];
    childNodo_contactoempresa = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_contactoempresa).html(filaTabla_contactoempresa);
        $("#selectEmpresa_contacto").empty();
        $("#selectEmpresa_contacto").html("<option value=''></option>");
        $("#selectEmpresa_contacto").removeAttr("onchange");
    }

    //Ocultamos la columna de editar.
    $("#thEditar_contactoempresa").css('display', 'none');

    //Valores Script
    btnNuevo_contactoempresa = "btn_contactoempresa_nue";
    //Btn de reload nuevo.
    btnNuevo_contactoempresa_reload = "btn_contactoempresa_nue_reload";
    //Btn guardar.
    btn_contactoempresa_save = "btn_contactoempresa_save";
    //Nombre de la tabla
    nomTabl_contactoempresa = "tbl_contactoempresa";
    //Nombre del body
    nomBody_contactoempresa = "tbody_contactoempresa";
    //Contar fila de tabla
    txtHiFi_contactoempresa = "hdn_contactoempresa";
    //Validar Base de Datos
    txtInVa_contactoempresa = "hdn_contactoempresa_isvalid";
    //ID del Body
    idPriFilaBody_contactoempresa = "firstRowBody_contactoempresa";


    //Alternar botones Nuevo
    $("#" + btnNuevo_contactoempresa).css('display', 'inline');
    $("#" + btnNuevo_contactoempresa_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_contactoempresa_save).attr("disabled", false);

    if (estado == 0) {

        tabla_contactoempresa = document.getElementById(nomTabl_contactoempresa);
        tbody_contactoempresa = document.getElementById(nomBody_contactoempresa);
        document.getElementById(txtHiFi_contactoempresa).value = cFila_contactoempresa;

        if (childNodo_contactoempresa == 0 && reloadTabla == 0) {
            totalCol_contactoempresa = tbody_contactoempresa.childNodes[1].children.length;
            $("#" + btnNuevo_contactoempresa).on('click', function () {
                idFila_contactoempresa++;
                funcNuevaLinea_tbl_contactoempresa(idFila_contactoempresa, tabla_contactoempresa.id);
                document.getElementById(txtHiFi_contactoempresa).value = cFila_contactoempresa;
            });
        }

        for (var i = 1; i <= totalCol_contactoempresa; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_contactoempresa);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_contactoempresa.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_contactoempresa.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_contactoempresa(id) {
    var idTabla = tabla_contactoempresa.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_contactoempresa(idTabla);
        cFila_contactoempresa = cFila_contactoempresa - 1;
        document.getElementById(txtHiFi_contactoempresa).value = cFila_contactoempresa;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_contactoempresa(idTabla);
        cFila_contactoempresa = cFila_contactoempresa - 1;
        document.getElementById(txtHiFi_contactoempresa).value = cFila_contactoempresa;
    }
    ReordenarId_tbl_contactoempresa(idTabla);
}

function Reordenar_num_tbl_contactoempresa(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_contactoempresa(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_contactoempresa = document.getElementById(nomBody_contactoempresa);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_contactoempresa == 1) {
        valorNodo_contactoempresa = 0;
        cantFilas = cFila_contactoempresa - 1;
    }

    else {
        valorNodo_contactoempresa = 1;
        cantFilas = cFila_contactoempresa + 1;
    }

    for (var i = valorNodo_contactoempresa; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_contactoempresa - 1) * 2) + 1; j += 2) {
                child = tbody_contactoempresa.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_contactoempresa[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_contactoempresa == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_contactoempresa - 2; j++) {
                child = tbody_contactoempresa.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_contactoempresa[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_contactoempresa(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_contactoempresa++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_contactoempresa)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_contactoempresa; i++) {
                            var tagName = arrayElem_contactoempresa[i][0];
                            var idText = arrayElem_contactoempresa[i][1];
                            var type = arrayElem_contactoempresa[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_contactoempresa + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_contactoempresa + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_contactoempresa + "' onclick='eliminar_fila_tbl_contactoempresa(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_contactoempresa + "' name='" + idText + idFila_contactoempresa + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_contactoempresa + "'><script type='text/javascript'>$('#" + idDiv + idFila_contactoempresa + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_contactoempresa + "').attr('id','" + idText + idFila_contactoempresa + "').attr('name','" + idText + idFila_contactoempresa + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_contactoempresa + "'><script type='text/javascript'>$('#" + idDiv + idFila_contactoempresa + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_contactoempresa + "').attr('id','" + idText + idFila_contactoempresa + "').attr('name','" + idText + idFila_contactoempresa + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_contactoempresa(idTabla);
    ReordenarId_tbl_contactoempresa(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_contactoempresa() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_contactoempresa = document.getElementById(nomTabl_contactoempresa);
    var idTabla = tabla_contactoempresa.id;
    nFilas = $('#' + txtHiFi_contactoempresa).val();
    array_contactoempresa = ObtenerValores_tbl_contactoempresa(nFilas);
    document.getElementById(txtInVa_contactoempresa).value = "true";
    for (var a = 0; a < array_contactoempresa.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_contactoempresa[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_contactoempresa[a][j - 1][1] != id) {
                    if (array_contactoempresa[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_contactoempresa).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_contactoempresa).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_contactoempresa).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_contactoempresa; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_contactoempresa - 2; j++) {
                    var id = arrayElem_contactoempresa[j][1];
                    id = "#" + id.substring(0, id.length - 1);
                    obj = $(id + i);
                    obj.removeClass("is-invalid");
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

        if (validoIngresados == true) {
            if($("#selectEmpresa_contacto").val() != "") {
                var iE = $("#selectEmpresa_contacto").val()
                //METODO AJAX
                $.ajax({
                    method: "POST",
                    url: "/contactoempresa/register",
                    data: {"values":arrayDatos.toString(),"iE":iE},
                    success: function resultado(valor) {
                        if (valor == "") {
                            alert("Contácto(s) registrado(s) correctamente.");
                            $("#" + nomBody_contactoempresa).html(filaTabla_contactoempresa);
                            CargarJS_contactoempresa(0, 1, 0);
                        }
                        else {
                            alert(valor);
                        }
                    },
                    error: function errores(msg) {
                        alert('Error: ' + msg.responseText);
                    }
                });
            }
            else{
                alert("Seleccione una empresa.");
            }
        }
        else {
            alert("No puede ingresar un campo vacio.");
        }
    }
}

function ObtenerValores_tbl_contactoempresa(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_contactoempresa.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_contactoempresa[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_ContactoEmpresa(posicionFila) {
    var i = $("#txt_contactoempresa_id" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/contactoempresa/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Contácto.");
                $("#fila_ContactoEmpresa" + posicionFila).remove();
                Reordenar_num_tbl_contactoempresa("tbl_contactoempresa");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_ContactoEmpresa(posicionFila) {

    var i = $("#txt_contactoempresa_id" + posicionFila).val();
    var nom = $("#txt_contactoempresa_nom" + posicionFila).val();
    var ap = $("#txt_contactoempresa_apep" + posicionFila).val();
    var am = $("#txt_contactoempresa_apem" + posicionFila).val();
    var dni = $("#txt_contactoempresa_dni" + posicionFila).val();
    var ciu = $("#txt_contactoempresa_ciudad" + posicionFila).val();
    var tel = $("#txt_contactoempresa_telef" + posicionFila).val();
    var car = $("#txt_contactoempresa_cargo" + posicionFila).val();
    var dir = $("#txt_contactoempresa_direc" + posicionFila).val();
    var cor = $("#txt_contactoempresa_correo" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/contactoempresa/edit",
        data: {"i":i,"nom":nom,"ap":ap,"am":am,"dni":dni,"ciu":ciu,"tel":tel,"car":car,"dir":dir,"cor":cor},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Contacto Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_contactoempresa() {
    if($("#selectEmpresa_contacto").val() != 0){
        //Alterna funcion del boton nuevo.
        $("#btn_contactoempresa_nue").css("display", "none");
        $("#btn_contactoempresa_nue_reload").css("display", "inline");
        $("#btn_contactoempresa_save").attr("disabled", true);

        //Añadimos eventos Onchanged
        $("#selectEmpresa_contacto").attr("onchange",'buscar_contactoempresa();');

        //Deshabilitar Botones
        $("#btn_contactoempresa_busnom").attr("disabled", true);
        //$("#btn_contactoempresa_busapep").attr("disabled", true);
        //$("#btn_contactoempresa_busapem").attr("disabled", true);
        //$("#btn_contactoempresa_busdni").attr("disabled", true);

        var nom = $("#txt_contactoempresa_busnom").val().toUpperCase();
        //var pat = $("#txt_contactoempresa_busapep").val().toUpperCase();
        //var mat = $("#txt_contactoempresa_busapem").val().toUpperCase();
        //var dni = $("#txt_contactoempresa_busdni").val().toUpperCase();
        var iE = $("#selectEmpresa_contacto").val();

        $.ajax({
            method: "POST",
            url: "/contactoempresa/search",
            //data: {"nom":nom,"pat":pat,"mat":mat,"dni":dni,"iE":iE},
            data: {"nom":nom,"iE":iE},
            success: function resultado(valor) {
                $("#thEditar_contactoempresa").css("display", "block");
                $("#btn_contactoempresa_busnom").attr("disabled", false);

                //Habilitamos los botones
                //$("#btn_contactoempresa_busnom").attr("disabled", false);
                //$("#btn_contactoempresa_busapep").attr("disabled", false);
                //$("#btn_contactoempresa_busapem").attr("disabled", false);
                //$("#btn_contactoempresa_busdni").attr("disabled", false);

                $("#" + nomBody_contactoempresa).html(valor);
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
    else{
        alert("Seleccione una Empresa.");
    }
}

<!-- Funciones para llenar combos anidados-->
//ESTO SERA EL MISMO QUE EN OTROS LADOS
function searchEmpresa_Contacto(searchLike){
    $.ajax({
        method: "POST",
        url: "/contactoempresa/busempresa",
        data: {"var":searchLike},
        success: function resultado(data) {
            if(data == "0"){
                $("#selectEmpresa_contacto").html("<option value=''></option>");
            }
            else{
                console.log(data);
                $("#selectEmpresa_contacto").empty();
                var JSONobj = JSON.parse(data);
                $("#selectEmpresa_contacto").html("<option value=''></option>");
                $.each(JSONobj, function (obj, item) {
                    $("#selectEmpresa_contacto").append('<option value="'+item.idempresa+'">'+item.nomempresa+' - '+item.ruc+'</option>');
                });
                $("#txt_select_busempresa").trigger({type: "keydown", which: 27});
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}