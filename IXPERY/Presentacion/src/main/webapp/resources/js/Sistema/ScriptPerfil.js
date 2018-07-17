var idFila_perfil = 1;
var cFila_perfil = 1;
var arrayElem_perfil = [];
var arrayElemV_perfil = [];
var array_perfil = [];
var totalCol_perfil;
var tabla_perfil;
var tbody_perfil;
var valorNodo_perfil;
var childNodo_perfil;
var btnNuevo_perfil;
var nomTabl_perfil;
var nomBody_perfil;
var txtHiFi_perfil;
var txtInVa_perfil;
var idPriFilaBody_perfil = "firstRowBody_perfil";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_perfil
filaTabla_perfil = filaTabla_perfil + "<tr id='" + idPriFilaBody_perfil + "'>";
filaTabla_perfil = filaTabla_perfil + $("#" + idPriFilaBody_perfil).html();
filaTabla_perfil = filaTabla_perfil + "</tr>";
//Fin primera fila.

CargarJS_perfil(0,0,0);

function CargarJS_perfil(estado, childNodes, reloadTabla) {

    idFila_perfil = 1;
    cFila_perfil = 1;
    arrayElem_perfil = [];
    arrayElemV_perfil = [];
    array_perfil = [];
    childNodo_perfil = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_perfil).html(filaTabla_perfil);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_perfil").css('display', 'none');

    //Valores Script
    btnNuevo_perfil = "btn_perfil_nue";
    //Btn de reload nuevo.
    btnNuevo_perfil_reload = "btn_perfil_nue_reload";
    //Btn guardar.
    btn_perfil_save = "btn_perfil_save";
    //Nombre de la tabla
    nomTabl_perfil = "tbl_perfil";
    //Nombre del body
    nomBody_perfil = "tbody_perfil";
    //Contar fila de tabla
    txtHiFi_perfil = "hdn_perfil";
    //Validar Base de Datos
    txtInVa_perfil = "hdn_perfil_isvalid";
    //ID del Body
    idPriFilaBody_perfil = "firstRowBody_perfil";


    //Alternar botones Nuevo
    $("#" + btnNuevo_perfil).css('display', 'inline');
    $("#" + btnNuevo_perfil_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_perfil_save).attr("disabled", false);

    if (estado == 0) {

        tabla_perfil = document.getElementById(nomTabl_perfil);
        tbody_perfil = document.getElementById(nomBody_perfil);
        document.getElementById(txtHiFi_perfil).value = cFila_perfil;

        if (childNodo_perfil == 0 && reloadTabla == 0) {
            totalCol_perfil = tbody_perfil.childNodes[1].children.length;
            $("#" + btnNuevo_perfil).on('click', function () {
                idFila_perfil++;
                funcNuevaLinea_tbl_perfil(idFila_perfil, tabla_perfil.id);
                document.getElementById(txtHiFi_perfil).value = cFila_perfil;
            });
        }

        for (var i = 1; i <= totalCol_perfil; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_perfil);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_perfil.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_perfil.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_perfil(id) {
    var idTabla = tabla_perfil.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_perfil(idTabla);
        cFila_perfil = cFila_perfil - 1;
        document.getElementById(txtHiFi_perfil).value = cFila_perfil;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_perfil(idTabla);
        cFila_perfil = cFila_perfil - 1;
        document.getElementById(txtHiFi_perfil).value = cFila_perfil;
    }
    ReordenarId_tbl_perfil(idTabla);
}

function Reordenar_num_tbl_perfil(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_perfil(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_perfil = document.getElementById(nomBody_perfil);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_perfil == 1) {
        valorNodo_perfil = 0;
        cantFilas = cFila_perfil - 1;
    }

    else {
        valorNodo_perfil = 1;
        cantFilas = cFila_perfil + 1;
    }

    for (var i = valorNodo_perfil; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_perfil - 1) * 2) + 1; j += 2) {
                child = tbody_perfil.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_perfil[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_perfil == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_perfil - 2; j++) {
                child = tbody_perfil.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_perfil[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_perfil(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_perfil++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_perfil)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_perfil; i++) {
                            var tagName = arrayElem_perfil[i][0];
                            var idText = arrayElem_perfil[i][1];
                            var type = arrayElem_perfil[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_perfil + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_perfil + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_perfil + "' onclick='eliminar_fila_tbl_perfil(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_perfil + "' name='" + idText + idFila_perfil + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_perfil + "'><script type='text/javascript'>$('#" + idDiv + idFila_perfil + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_perfil + "').attr('id','" + idText + idFila_perfil + "').attr('name','" + idText + idFila_perfil + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_perfil + "'><script type='text/javascript'>$('#" + idDiv + idFila_perfil + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_perfil + "').attr('id','" + idText + idFila_perfil + "').attr('name','" + idText + idFila_perfil + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_perfil(idTabla);
    ReordenarId_tbl_perfil(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_perfil() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_perfil = document.getElementById(nomTabl_perfil);
    var idTabla = tabla_perfil.id;
    nFilas = $('#' + txtHiFi_perfil).val();
    array_perfil = ObtenerValores_tbl_perfil(nFilas);
    document.getElementById(txtInVa_perfil).value = "true";
    for (var a = 0; a < array_perfil.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_perfil[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_perfil[a][j - 1][1] != id) {
                    if (array_perfil[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_perfil).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_perfil).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_perfil).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_perfil; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_perfil - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_perfil[j][1];
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

        console.log(JSON.stringify(arrayData));

        if (validoIngresados == true) {
            //METODO AJAX
            $.ajax({
                method: "POST",
                url: "/perfil/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Perfil(es) registrado(s) correctamente.");
                        $("#" + nomBody_perfil).html(filaTabla_perfil);
                        CargarJS_perfil(0, 1, 0);
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

function ObtenerValores_tbl_perfil(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_perfil.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_perfil[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Perfil(posicionFila) {

    var i = $("#txt_perfil_idperf" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/perfil/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Perfil.");
                $("#fila_Perfil" + posicionFila).remove();
                Reordenar_num_tbl_perfil("tbl_perfil");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Perfil(posicionFila) {

    var i = $("#txt_perfil_idperf" + posicionFila).val();
    var ia = $("#cmb_perfil_idapli" + posicionFila).val();
    var nom = $("#Vtxt_perfil_nombre" + posicionFila).val();
    var est = $("#cmb_perfil_estado" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/perfil/edit",
        data: {"i":i,"ia":ia,"nom":nom,"est":est},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Perfil Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_Perfil() {
    //Alterna funcion del boton nuevo.
    $("#btn_perfil_nue").css("display", "none");
    $("#btn_perfil_nue_reload").css("display", "inline");
    $("#btn_perfil_save").attr("disabled", true);

    var nom = $("#txt_perfil_busnom").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/perfil/search",
        data: {"nom":nom},
        success: function resultado(valor) {
            $("#thEditar_perfil").css("display", "block");
            $("#" + nomBody_perfil).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}