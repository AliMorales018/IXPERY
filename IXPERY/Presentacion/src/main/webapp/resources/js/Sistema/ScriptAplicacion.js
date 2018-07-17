var idFila_aplicacion = 1;
var cFila_aplicacion = 1;
var arrayElem_aplicacion = [];
var arrayElemV_aplicacion = [];
var array_aplicacion = [];
var totalCol_aplicacion;
var tabla_aplicacion;
var tbody_aplicacion;
var valorNodo_aplicacion;
var childNodo_aplicacion;
var btnNuevo_aplicacion;
var nomTabl_aplicacion;
var nomBody_aplicacion;
var txtHiFi_aplicacion;
var txtInVa_aplicacion;
var idPriFilaBody_aplicacion = "firstRowBody_aplicacion";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_aplicacion
filaTabla_aplicacion = filaTabla_aplicacion + "<tr id='" + idPriFilaBody_aplicacion + "'>";
filaTabla_aplicacion = filaTabla_aplicacion + $("#" + idPriFilaBody_aplicacion).html();
filaTabla_aplicacion = filaTabla_aplicacion + "</tr>";
//Fin primera fila.

CargarJS_aplicacion(0,0,0);

function CargarJS_aplicacion(estado, childNodes, reloadTabla) {

    idFila_aplicacion = 1;
    cFila_aplicacion = 1;
    arrayElem_aplicacion = [];
    arrayElemV_aplicacion = [];
    array_aplicacion = [];
    childNodo_aplicacion = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_aplicacion).html(filaTabla_aplicacion);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_aplicacion").css('display', 'none');

    //Valores Script
    btnNuevo_aplicacion = "btn_aplicacion_nue";
    //Btn de reload nuevo.
    btnNuevo_aplicacion_reload = "btn_aplicacion_nue_reload";
    //Btn guardar.
    btn_aplicacion_save = "btn_aplicacion_save";
    //Nombre de la tabla
    nomTabl_aplicacion = "tbl_aplicacion";
    //Nombre del body
    nomBody_aplicacion = "tbody_aplicacion";
    //Contar fila de tabla
    txtHiFi_aplicacion = "hdn_aplicacion";
    //Validar Base de Datos
    txtInVa_aplicacion = "hdn_aplicacion_isvalid";
    //ID del Body
    idPriFilaBody_aplicacion = "firstRowBody_aplicacion";


    //Alternar botones Nuevo
    $("#" + btnNuevo_aplicacion).css('display', 'inline');
    $("#" + btnNuevo_aplicacion_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_aplicacion_save).attr("disabled", false);

    if (estado == 0) {

        tabla_aplicacion = document.getElementById(nomTabl_aplicacion);
        tbody_aplicacion = document.getElementById(nomBody_aplicacion);
        document.getElementById(txtHiFi_aplicacion).value = cFila_aplicacion;

        if (childNodo_aplicacion == 0 && reloadTabla == 0) {
            totalCol_aplicacion = tbody_aplicacion.childNodes[1].children.length;
            $("#" + btnNuevo_aplicacion).on('click', function () {
                idFila_aplicacion++;
                funcNuevaLinea_tbl_aplicacion(idFila_aplicacion, tabla_aplicacion.id);
                document.getElementById(txtHiFi_aplicacion).value = cFila_aplicacion;
            });
        }

        for (var i = 1; i <= totalCol_aplicacion; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_aplicacion);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_aplicacion.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_aplicacion.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_aplicacion(id) {
    var idTabla = tabla_aplicacion.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_aplicacion(idTabla);
        cFila_aplicacion = cFila_aplicacion - 1;
        document.getElementById(txtHiFi_aplicacion).value = cFila_aplicacion;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_aplicacion(idTabla);
        cFila_aplicacion = cFila_aplicacion - 1;
        document.getElementById(txtHiFi_aplicacion).value = cFila_aplicacion;
    }
    ReordenarId_tbl_aplicacion(idTabla);
}

function Reordenar_num_tbl_aplicacion(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_aplicacion(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_aplicacion = document.getElementById(nomBody_aplicacion);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_aplicacion == 1) {
        valorNodo_aplicacion = 0;
        cantFilas = cFila_aplicacion - 1;
    }

    else {
        valorNodo_aplicacion = 1;
        cantFilas = cFila_aplicacion + 1;
    }

    for (var i = valorNodo_aplicacion; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_aplicacion - 1) * 2) + 1; j += 2) {
                child = tbody_aplicacion.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_aplicacion[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_aplicacion == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_aplicacion - 2; j++) {
                child = tbody_aplicacion.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_aplicacion[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_aplicacion(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_aplicacion++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_aplicacion)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_aplicacion; i++) {
                            var tagName = arrayElem_aplicacion[i][0];
                            var idText = arrayElem_aplicacion[i][1];
                            var type = arrayElem_aplicacion[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_aplicacion + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_aplicacion + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_aplicacion + "' onclick='eliminar_fila_tbl_aplicacion(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_aplicacion + "' name='" + idText + idFila_aplicacion + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_aplicacion + "'><script type='text/javascript'>$('#" + idDiv + idFila_aplicacion + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_aplicacion + "').attr('id','" + idText + idFila_aplicacion + "').attr('name','" + idText + idFila_aplicacion + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_aplicacion + "'><script type='text/javascript'>$('#" + idDiv + idFila_aplicacion + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_aplicacion + "').attr('id','" + idText + idFila_aplicacion + "').attr('name','" + idText + idFila_aplicacion + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_aplicacion(idTabla);
    ReordenarId_tbl_aplicacion(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_aplicacion() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_aplicacion = document.getElementById(nomTabl_aplicacion);
    var idTabla = tabla_aplicacion.id;
    nFilas = $('#' + txtHiFi_aplicacion).val();
    array_aplicacion = ObtenerValores_tbl_aplicacion(nFilas);
    document.getElementById(txtInVa_aplicacion).value = "true";
    for (var a = 0; a < array_aplicacion.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_aplicacion[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_aplicacion[a][j - 1][1] != id) {
                    if (array_aplicacion[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_aplicacion).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_aplicacion).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_aplicacion).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_aplicacion; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_aplicacion - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_aplicacion[j][1];
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
                url: "/aplicacion/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Aplicacion(es) registrada(s) correctamente.");
                        $("#" + nomBody_aplicacion).html(filaTabla_aplicacion);
                        CargarJS_aplicacion(0, 1, 0);
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
        else {
            alert("No puede ingresar un campo vacio.");
        }
    }
}

function ObtenerValores_tbl_aplicacion(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_aplicacion.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_aplicacion[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Aplicacion(posicionFila) {

    var i = $("#txt_aplicacion_idapli" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/aplicacion/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja a la Aplicacion.");
                $("#fila_Aplicacion" + posicionFila).remove();
                Reordenar_num_tbl_aplicacion("tbl_aplicacion");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Aplicacion(posicionFila) {

    var i = $("#txt_aplicacion_idapli" + posicionFila).val();
    var nom = $("#Vtxt_aplicacion_nombre" + posicionFila).val();
    var est = $("#cmb_aplicacion_estado" + posicionFila).val();
    var ver = $("#txt_aplicacion_version" + posicionFila).val();
    var abr = $("#txt_aplicacion_abrevia" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/aplicacion/edit",
        data: {"i":i,"nom":nom,"est":est,"ver":ver,"abr":abr},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Aplicacion Actualizada.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_Aplicacion() {
    //Alterna funcion del boton nuevo.
    $("#btn_aplicacion_nue").css("display", "none");
    $("#btn_aplicacion_nue_reload").css("display", "inline");
    $("#btn_aplicacion_save").attr("disabled", true);

    var nom = $("#txt_aplicacion_busnomapli").val().toUpperCase();
    var abr = $("#txt_aplicacion_busabrevia").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/aplicacion/search",
        data: {"nom":nom,"abr":abr},
        success: function resultado(valor) {
            $("#thEditar_aplicacion").css("display", "block");
            $("#" + nomBody_aplicacion).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}