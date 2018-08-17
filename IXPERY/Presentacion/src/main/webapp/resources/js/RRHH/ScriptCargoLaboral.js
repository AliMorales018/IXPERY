var idFila_cargolaboral = 1;
var cFila_cargolaboral = 1;
var arrayElem_cargolaboral = [];
var arrayElemV_cargolaboral = [];
var array_cargolaboral = [];
var totalCol_cargolaboral;
var tabla_cargolaboral;
var tbody_cargolaboral;
var valorNodo_cargolaboral;
var childNodo_cargolaboral;
var btnNuevo_cargolaboral;
var nomTabl_cargolaboral;
var nomBody_cargolaboral;
var txtHiFi_cargolaboral;
var txtInVa_cargolaboral;
var idPriFilaBody_cargolaboral = "firstRowBody_cargolaboral";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_cargolaboral
filaTabla_cargolaboral = filaTabla_cargolaboral + "<tr id='" + idPriFilaBody_cargolaboral + "'>";
filaTabla_cargolaboral = filaTabla_cargolaboral + $("#" + idPriFilaBody_cargolaboral).html();
filaTabla_cargolaboral = filaTabla_cargolaboral + "</tr>";
//Fin primera fila.

CargarJS_cargolaboral(0,0,0);

function CargarJS_cargolaboral(estado, childNodes, reloadTabla) {

    idFila_cargolaboral = 1;
    cFila_cargolaboral = 1;
    arrayElem_cargolaboral = [];
    arrayElemV_cargolaboral = [];
    array_cargolaboral = [];
    childNodo_cargolaboral = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_cargolaboral).html(filaTabla_cargolaboral);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_cargolaboral").css('display', 'none');

    //Valores Script
    btnNuevo_cargolaboral = "btn_cargolaboral_nue";
    //Btn de reload nuevo.
    btnNuevo_cargolaboral_reload = "btn_cargolaboral_nue_reload";
    //Btn guardar.
    btn_cargolaboral_save = "btn_cargolaboral_save";
    //Nombre de la tabla
    nomTabl_cargolaboral = "tbl_cargolaboral";
    //Nombre del body
    nomBody_cargolaboral = "tbody_cargolaboral";
    //Contar fila de tabla
    txtHiFi_cargolaboral = "hdn_cargolaboral";
    //Validar Base de Datos
    txtInVa_cargolaboral = "hdn_cargolaboral_isvalid";
    //ID del Body
    idPriFilaBody_cargolaboral = "firstRowBody_cargolaboral";


    //Alternar botones Nuevo
    $("#" + btnNuevo_cargolaboral).css('display', 'inline');
    $("#" + btnNuevo_cargolaboral_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_cargolaboral_save).attr("disabled", false);

    if (estado == 0) {

        tabla_cargolaboral = document.getElementById(nomTabl_cargolaboral);
        tbody_cargolaboral = document.getElementById(nomBody_cargolaboral);
        document.getElementById(txtHiFi_cargolaboral).value = cFila_cargolaboral;

        if (childNodo_cargolaboral == 0 && reloadTabla == 0) {
            totalCol_cargolaboral = tbody_cargolaboral.childNodes[1].children.length;
            $("#" + btnNuevo_cargolaboral).on('click', function () {
                idFila_cargolaboral++;
                funcNuevaLinea_tbl_cargolaboral(idFila_cargolaboral, tabla_cargolaboral.id);
                document.getElementById(txtHiFi_cargolaboral).value = cFila_cargolaboral;
            });
        }

        for (var i = 1; i <= totalCol_cargolaboral; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_cargolaboral);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_cargolaboral.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_cargolaboral.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_cargolaboral(id) {
    var idTabla = tabla_cargolaboral.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_cargolaboral(idTabla);
        cFila_cargolaboral = cFila_cargolaboral - 1;
        document.getElementById(txtHiFi_cargolaboral).value = cFila_cargolaboral;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_cargolaboral(idTabla);
        cFila_cargolaboral = cFila_cargolaboral - 1;
        document.getElementById(txtHiFi_cargolaboral).value = cFila_cargolaboral;
    }
    ReordenarId_tbl_cargolaboral(idTabla);
}

function Reordenar_num_tbl_cargolaboral(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_cargolaboral(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_cargolaboral = document.getElementById(nomBody_cargolaboral);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_cargolaboral == 1) {
        valorNodo_cargolaboral = 0;
        cantFilas = cFila_cargolaboral - 1;
    }

    else {
        valorNodo_cargolaboral = 1;
        cantFilas = cFila_cargolaboral + 1;
    }

    for (var i = valorNodo_cargolaboral; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_cargolaboral - 1) * 2) + 1; j += 2) {
                child = tbody_cargolaboral.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_cargolaboral[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_cargolaboral == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_cargolaboral - 2; j++) {
                child = tbody_cargolaboral.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_cargolaboral[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_cargolaboral(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_cargolaboral++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_cargolaboral)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_cargolaboral; i++) {
                            var tagName = arrayElem_cargolaboral[i][0];
                            var idText = arrayElem_cargolaboral[i][1];
                            var type = arrayElem_cargolaboral[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_cargolaboral + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_cargolaboral + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_cargolaboral + "' onclick='eliminar_fila_tbl_cargolaboral(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_cargolaboral + "' name='" + idText + idFila_cargolaboral + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_cargolaboral + "'><script type='text/javascript'>$('#" + idDiv + idFila_cargolaboral + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_cargolaboral + "').attr('id','" + idText + idFila_cargolaboral + "').attr('name','" + idText + idFila_cargolaboral + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_cargolaboral + "'><script type='text/javascript'>$('#" + idDiv + idFila_cargolaboral + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_cargolaboral + "').attr('id','" + idText + idFila_cargolaboral + "').attr('name','" + idText + idFila_cargolaboral + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_cargolaboral(idTabla);
    ReordenarId_tbl_cargolaboral(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_cargolaboral() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_cargolaboral = document.getElementById(nomTabl_cargolaboral);
    var idTabla = tabla_cargolaboral.id;
    nFilas = $('#' + txtHiFi_cargolaboral).val();
    array_cargolaboral = ObtenerValores_tbl_cargolaboral(nFilas);
    document.getElementById(txtInVa_cargolaboral).value = "true";
    for (var a = 0; a < array_cargolaboral.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_cargolaboral[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_cargolaboral[a][j - 1][1] != id) {
                    if (array_cargolaboral[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_cargolaboral).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_cargolaboral).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_cargolaboral).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_cargolaboral; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_cargolaboral - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_cargolaboral[j][1];
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
                url: "/cargolaboral/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Cargo laboral(es) registrado(s) correctamente.");
                        $("#" + nomBody_cargolaboral).html(filaTabla_cargolaboral);
                        CargarJS_cargolaboral(0, 1, 0);
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

function ObtenerValores_tbl_cargolaboral(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_cargolaboral.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_cargolaboral[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_CargoLaboral(posicionFila) {

    var i = $("#txt_cargolaboral_idcargo" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/cargolaboral/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Cargo laboral.");
                $("#fila_CargoLaboral" + posicionFila).remove();
                Reordenar_num_tbl_cargolaboral("tbl_cargolaboral");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_CargoLaboral(posicionFila) {

    var i = $("#txt_cargolaboral_idcargo" + posicionFila).val();
    var area = $("#cmb_cargolaboral_idarea" + posicionFila).val();
    var nom = $("#Vtxt_cargolaboral_nomcargo" + posicionFila).val();
    var sal= $("#txt_cargolaboral_salario" + posicionFila).val();
    var est= $("#cmb_cargolaboral_estado" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/cargolaboral/edit",
        data: {"i":i,"area":area,"nom":nom,"sal":sal,"est":est},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Cargo laboral Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_CargoLaboral() {
    //Alterna funcion del boton nuevo.
    $("#btn_cargolaboral_nue").css("display", "none");
    $("#btn_cargolaboral_nue_reload").css("display", "inline");
    $("#btn_cargolaboral_save").attr("disabled", true);

    var nom = $("#txt_cargolaboral_busnom").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/cargolaboral/search",
        data: {"nom":nom},
        success: function resultado(valor) {
            $("#thEditar_cargolaboral").css("display", "block");
            $("#" + nomBody_cargolaboral).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });;
}







