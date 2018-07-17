var idFila_requerimiento = 1;
var cFila_requerimiento = 1;
var arrayElem_requerimiento = [];
var arrayElemV_requerimiento = [];
var array_requerimiento = [];
var totalCol_requerimiento;
var tabla_requerimiento;
var tbody_requerimiento;
var valorNodo_requerimiento;
var childNodo_requerimiento;
var btnNuevo_requerimiento;
var nomTabl_requerimiento;
var nomBody_requerimiento;
var txtHiFi_requerimiento;
var txtInVa_requerimiento;
var idPriFilaBody_requerimiento = "firstRowBody_requerimiento";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_requerimiento
filaTabla_requerimiento = filaTabla_requerimiento + "<tr id='" + idPriFilaBody_requerimiento + "'>";
filaTabla_requerimiento = filaTabla_requerimiento + $("#" + idPriFilaBody_requerimiento).html();
filaTabla_requerimiento = filaTabla_requerimiento + "</tr>";
//Fin primera fila.

CargarJS_requerimiento(0,0,0);

function CargarJS_requerimiento(estado, childNodes, reloadTabla) {
    modo_form_requerimiento = "nuevo";
    idFila_requerimiento = 1;
    cFila_requerimiento = 1;
    arrayElem_requerimiento = [];
    arrayElemV_requerimiento = [];
    array_requerimiento = [];
    childNodo_requerimiento = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_requerimiento).html(filaTabla_requerimiento);
        $("#selectEmpresa_Proyecto").removeAttr("onchange");
        limpiarCombos();
    }

    //Ocultamos la columna de editar.
    $("#thEditar_requerimiento").css('display', 'none');

    //Valores Script
    btnNuevo_requerimiento = "btn_requerimiento_nue";
    //Btn de reload nuevo.
    btnNuevo_requerimiento_reload = "btn_requerimiento_nue_reload";
    //Btn guardar.
    btn_requerimiento_save = "btn_requerimiento_save";
    //Nombre de la tabla
    nomTabl_requerimiento = "tbl_requerimiento";
    //Nombre del body
    nomBody_requerimiento = "tbody_requerimiento";
    //Contar fila de tabla
    txtHiFi_requerimiento = "hdn_requerimiento";
    //Validar Base de Datos
    txtInVa_requerimiento = "hdn_requerimiento_isvalid";
    //ID del Body
    idPriFilaBody_requerimiento = "firstRowBody_requerimiento";


    //Alternar botones Nuevo
    $("#" + btnNuevo_requerimiento).css('display', 'inline');
    $("#" + btnNuevo_requerimiento_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_requerimiento_save).attr("disabled", false);

    if (estado == 0) {

        tabla_requerimiento = document.getElementById(nomTabl_requerimiento);
        tbody_requerimiento = document.getElementById(nomBody_requerimiento);
        document.getElementById(txtHiFi_requerimiento).value = cFila_requerimiento;

        if (childNodo_requerimiento == 0 && reloadTabla == 0) {
            totalCol_requerimiento = tbody_requerimiento.childNodes[1].children.length;
            $("#" + btnNuevo_requerimiento).on('click', function () {
                idFila_requerimiento++;
                funcNuevaLinea_tbl_requerimiento(idFila_requerimiento, tabla_requerimiento.id);
                document.getElementById(txtHiFi_requerimiento).value = cFila_requerimiento;
            });
        }

        for (var i = 1; i <= totalCol_requerimiento; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_requerimiento);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_requerimiento.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_requerimiento.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_requerimiento(id) {
    var idTabla = tabla_requerimiento.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_requerimiento(idTabla);
        cFila_requerimiento = cFila_requerimiento - 1;
        document.getElementById(txtHiFi_requerimiento).value = cFila_requerimiento;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_requerimiento(idTabla);
        cFila_requerimiento = cFila_requerimiento - 1;
        document.getElementById(txtHiFi_requerimiento).value = cFila_requerimiento;
    }
    ReordenarId_tbl_requerimiento(idTabla);
}

function Reordenar_num_tbl_requerimiento(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_requerimiento(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_requerimiento = document.getElementById(nomBody_requerimiento);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_requerimiento == 1) {
        valorNodo_requerimiento = 0;
        cantFilas = cFila_requerimiento - 1;
    }

    else {
        valorNodo_requerimiento = 1;
        cantFilas = cFila_requerimiento + 1;
    }

    for (var i = valorNodo_requerimiento; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_requerimiento - 1) * 2) + 1; j += 2) {
                child = tbody_requerimiento.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_requerimiento[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_requerimiento == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_requerimiento - 2; j++) {
                child = tbody_requerimiento.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_requerimiento[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_requerimiento(cont, idTabla) {
    if($("#selectEmpresa_Proyecto").val() != null) {
        var nuevaFila = "";
        var contSelect = 0;
        var idDiv = "";
        cFila_requerimiento++;
        $("#" + idTabla + ">tbody")
            .append
            (
                $('<tr>').attr('id', idTabla + "_fila" + idFila_requerimiento)
                    .append
                    (
                        function () {
                            for (var i = 0; i < totalCol_requerimiento; i++) {
                                var tagName = arrayElem_requerimiento[i][0];
                                var idText = arrayElem_requerimiento[i][1];
                                var type = arrayElem_requerimiento[i][2];
                                if (tagName == 'SELECT') {
                                    contSelect++;
                                    idDiv = "div" + contSelect + "_" + nomTabl_requerimiento + "_";
                                }
                                idText = idText.substring(0, idText.length - 1);
                                switch (tagName) {
                                    case 'P':
                                        nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_requerimiento + "</p></div></td>";
                                        break;
                                    case 'BUTTON':
                                        nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_requerimiento + "' onclick='eliminar_fila_tbl_requerimiento(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                        break;
                                    case 'INPUT':
                                        nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_requerimiento + "' name='" + idText + idFila_requerimiento + "' class='form-control'/></div></td>"
                                        break;
                                    case 'SELECT':
                                        if (type == 'disabled') {
                                            nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_requerimiento + "'><script type='text/javascript'>$('#" + idDiv + idFila_requerimiento + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_requerimiento + "').attr('id','" + idText + idFila_requerimiento + "').attr('name','" + idText + idFila_requerimiento + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                        }
                                        else {
                                            nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_requerimiento + "'><script type='text/javascript'>$('#" + idDiv + idFila_requerimiento + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_requerimiento + "').attr('id','" + idText + idFila_requerimiento + "').attr('name','" + idText + idFila_requerimiento + "').attr('runat','server'))</script></div></td>"
                                        }
                                        break;
                                }
                            }
                            return nuevaFila;
                        }
                    )
            );
        Reordenar_num_tbl_requerimiento(idTabla);
        ReordenarId_tbl_requerimiento(idTabla);
    }
    else{
        alert("Seleccione un proyecto válido");
    }
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_requerimiento() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_requerimiento = document.getElementById(nomTabl_requerimiento);
    var idTabla = tabla_requerimiento.id;
    nFilas = $('#' + txtHiFi_requerimiento).val();
    array_requerimiento = ObtenerValores_tbl_requerimiento(nFilas);
    document.getElementById(txtInVa_requerimiento).value = "true";
    for (var a = 0; a < array_requerimiento.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_requerimiento[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_requerimiento[a][j - 1][1] != id) {
                    if (array_requerimiento[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_requerimiento).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_requerimiento).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_requerimiento).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_requerimiento; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_requerimiento - 2; j++) {
                    var id = arrayElem_requerimiento[j][1];
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
            if($("#selectEmpresa_Proyecto").val() != null) {
                var iP = $("#selectEmpresa_Proyecto").val()
                //METODO AJAX
                $.ajax({
                    method: "POST",
                    url: "/requerimiento/register",
                    data: {"values":arrayDatos.toString(),"iP":iP},
                    success: function resultado(valor) {
                        if (valor == "") {
                            alert("Requerimiento(s) registrado(s) correctamente.");
                            $("#" + nomBody_requerimiento).html(filaTabla_requerimiento);
                            limpiarCombos();
                            CargarJS_requerimiento(0, 1, 0);
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
                alert("Seleccione un proyecto válido.");
            }
        }
        else {
            alert("No puede ingresar un campo vacio.");
        }
    }
}

function limpiarCombos(){
    $("#selectEmpresa_Proyecto").empty();
}

function ObtenerValores_tbl_requerimiento(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_requerimiento.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_requerimiento[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Requerimiento(posicionFila) {
    var i = $("#txt_requerimiento_idreq" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/requerimiento/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Requerimiento.");
                $("#fila_Requerimiento" + posicionFila).remove();
                Reordenar_num_tbl_requerimiento("tbl_requerimiento");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Requerimiento(posicionFila) {
    var i = $("#txt_requerimiento_idreq" + posicionFila).val();
    var nom = $("#Vtxt_requerimiento_nombre" + posicionFila).val();
    var niv = $("#cmb_requerimiento_idnivel" + posicionFila).val();
    var est = $("#cmb_requerimiento_estado" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/requerimiento/edit",
        data: {"i":i,"nom":nom,"niv":niv,"est":est},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Requerimiento Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_requerimiento() {
    if($("#selectEmpresa_Proyecto").val() != null){
        //Alterna funcion del boton nuevo.
        $("#btn_requerimiento_nue").css("display", "none");
        $("#btn_requerimiento_nue_reload").css("display", "inline");
        $("#btn_requerimiento_save").attr("disabled", true);

        //Deshabilitar Botones
        $("#btn_requerimiento_busnom").attr("disabled", true);

        //AñadimosEvento
        $("#selectEmpresa_Proyecto").attr("onchange","buscar_requerimiento();");

        var nom = $("#txt_requerimiento_busnom").val().toUpperCase();
        var iP = $("#selectEmpresa_Proyecto").val();
        $.ajax({
            method: "POST",
            url: "/requerimiento/search",
            data: {"nom":nom,"iP":iP},
            success: function resultado(valor) {
                $("#thEditar_requerimiento").css("display", "block");
                $("#btn_requerimiento_busnom").attr("disabled", false);
                $("#" + nomBody_requerimiento).html(valor);
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
    else{
        alert("Seleccione un Proyecto válido.");
    }
}
