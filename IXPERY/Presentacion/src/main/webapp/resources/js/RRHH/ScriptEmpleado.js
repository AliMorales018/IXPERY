var idFila_empleado = 1;
var cFila_empleado = 1;
var arrayElem_empleado = [];
var arrayElemV_empleado = [];
var array_empleado = [];
var totalCol_empleado;
var tabla_empleado;
var tbody_empleado;
var valorNodo_empleado;
var childNodo_empleado;
var btnNuevo_empleado;
var nomTabl_empleado;
var nomBody_empleado;
var txtHiFi_empleado;
var txtInVa_empleado;
var idPriFilaBody_empleado = "firstRowBody_empleado";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_empleado
filaTabla_empleado = filaTabla_empleado + "<tr id='" + idPriFilaBody_empleado + "'>";
filaTabla_empleado = filaTabla_empleado + $("#" + idPriFilaBody_empleado).html();
filaTabla_empleado = filaTabla_empleado + "</tr>";
//Fin primera fila.

CargarJS_empleado(0,0,0);

function CargarJS_empleado(estado, childNodes, reloadTabla) {

    idFila_empleado = 1;
    cFila_empleado = 1;
    arrayElem_empleado = [];
    arrayElemV_empleado = [];
    array_empleado = [];
    childNodo_empleado = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_empleado).html(filaTabla_empleado);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_empleado").css('display', 'none');

    //Valores Script
    btnNuevo_empleado = "btn_empleado_nue";
    //Btn de reload nuevo.
    btnNuevo_empleado_reload = "btn_empleado_nue_reload";
    //Btn guardar.
    btn_empleado_save = "btn_empleado_save";
    //Nombre de la tabla
    nomTabl_empleado = "tbl_empleado";
    //Nombre del body
    nomBody_empleado = "tbody_empleado";
    //Contar fila de tabla
    txtHiFi_empleado = "hdn_empleado";
    //Validar Base de Datos
    txtInVa_empleado = "hdn_empleado_isvalid";
    //ID del Body
    idPriFilaBody_empleado = "firstRowBody_empleado";


    //Alternar botones Nuevo
    $("#" + btnNuevo_empleado).css('display', 'inline');
    $("#" + btnNuevo_empleado_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_empleado_save).attr("disabled", false);

    if (estado == 0) {

        tabla_empleado = document.getElementById(nomTabl_empleado);
        tbody_empleado = document.getElementById(nomBody_empleado);
        document.getElementById(txtHiFi_empleado).value = cFila_empleado;

        if (childNodo_empleado == 0 && reloadTabla == 0) {
            totalCol_empleado = tbody_empleado.childNodes[1].children.length;
            $("#" + btnNuevo_empleado).on('click', function () {
                idFila_empleado++;
                funcNuevaLinea_tbl_empleado(idFila_empleado, tabla_empleado.id);
                document.getElementById(txtHiFi_empleado).value = cFila_empleado;
            });
        }

        for (var i = 1; i <= totalCol_empleado; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_empleado);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_empleado.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_empleado.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_empleado(id) {
    var idTabla = tabla_empleado.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_empleado(idTabla);
        cFila_empleado = cFila_empleado - 1;
        document.getElementById(txtHiFi_empleado).value = cFila_empleado;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_empleado(idTabla);
        cFila_empleado = cFila_empleado - 1;
        document.getElementById(txtHiFi_empleado).value = cFila_empleado;
    }
    ReordenarId_tbl_empleado(idTabla);
}

function Reordenar_num_tbl_empleado(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_empleado(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_empleado = document.getElementById(nomBody_empleado);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_empleado == 1) {
        valorNodo_empleado = 0;
        cantFilas = cFila_empleado - 1;
    }

    else {
        valorNodo_empleado = 1;
        cantFilas = cFila_empleado + 1;
    }

    for (var i = valorNodo_empleado; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_empleado - 1) * 2) + 1; j += 2) {
                child = tbody_empleado.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_empleado[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_empleado == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_empleado - 2; j++) {
                child = tbody_empleado.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_empleado[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_empleado(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_empleado++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_empleado)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_empleado; i++) {
                            var tagName = arrayElem_empleado[i][0];
                            var idText = arrayElem_empleado[i][1];
                            var type = arrayElem_empleado[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_empleado + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_empleado + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_empleado + "' onclick='eliminar_fila_tbl_empleado(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_empleado + "' name='" + idText + idFila_empleado + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_empleado + "'><script type='text/javascript'>$('#" + idDiv + idFila_empleado + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_empleado + "').attr('id','" + idText + idFila_empleado + "').attr('name','" + idText + idFila_empleado + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_empleado + "'><script type='text/javascript'>$('#" + idDiv + idFila_empleado + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_empleado + "').attr('id','" + idText + idFila_empleado + "').attr('name','" + idText + idFila_empleado + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_empleado(idTabla);
    ReordenarId_tbl_empleado(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_empleado() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_empleado = document.getElementById(nomTabl_empleado);
    var idTabla = tabla_empleado.id;
    nFilas = $('#' + txtHiFi_empleado).val();
    array_empleado = ObtenerValores_tbl_empleado(nFilas);
    document.getElementById(txtInVa_empleado).value = "true";
    for (var a = 0; a < array_empleado.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_empleado[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_empleado[a][j - 1][1] != id) {
                    if (array_empleado[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_empleado).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_empleado).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_empleado).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_empleado; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_empleado - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_empleado[j][1];
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
                url: "/empleado/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Empleado(s) registrada(s) correctamente.");
                        $("#" + nomBody_empleado).html(filaTabla_empleado);
                        CargarJS_empleado(0, 1, 0);
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

function ObtenerValores_tbl_empleado(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_empleado.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_empleado[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Empleado(posicionFila) {

    var i = $("#txt_empleado_idempleado" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/empleado/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Empleado.");
                $("#fila_Empleado" + posicionFila).remove();
                Reordenar_num_tbl_empleado("tbl_empleado");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Empleado(posicionFila) {

    var i = $("#txt_empleado_idempleado" + posicionFila).val();
    var area= $("#txt_empleado_idarea" + posicionFila).val();
    var dni= $("#Vtxt_empleado_dni" + posicionFila).val();
    var nom= $("#Vtxt_empleado_nombre" + posicionFila).val();
    var pat= $("#Vtxt_empleado_apaterno" + posicionFila).val();
    var mat= $("#Vtxt_empleado_amaterno" + posicionFila).val();
    var tel= $("#txt_empleado_telefono" + posicionFila).val();
    var dir= $("#txt_empleado_direccion" + posicionFila).val();
    var fec= $("#txt_empleado_fechanac" + posicionFila).val();
    var sex= $("#txt_empleado_sexo" + posicionFila).val();
    var est= $("#txt_empleado_estado" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/empleado/edit",
        data: {"i":i,"area":area,"dni":dni,"nom":nom,"pat":pat,"mat":mat,"tel":tel,"dir":dir,"fec":fec,"sex":sex,"est":est},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Empleado Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_Empleado() {
    //Alterna funcion del boton nuevo.
    $("#btn_empleado_nue").css("display", "none");
    $("#btn_empleado_nue_reload").css("display", "inline");
    $("#btn_empleado_save").attr("disabled", true);

    var dni = $("#txt_empleado_busdni").val().toUpperCase();
    var nom = $("#txt_empleado_busnomempleado").val().toUpperCase();
    var pat= $("#txt_empleado_busapaterno").val().toUpperCase();
    var mat= $("#txt_empleado_busamaterno").val().toUpperCase();


    $.ajax({
        method: "POST",
        url: "/empleado/search",
        data: {"dni":dni,"nom":nom,"pat":pat,"mat":mat},
        success: function resultado(valor) {
            $("#thEditar_empleado").css("display", "block");
            $("#" + nomBody_empleado).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}