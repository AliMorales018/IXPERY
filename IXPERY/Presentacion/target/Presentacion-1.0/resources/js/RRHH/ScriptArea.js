var idFila_area = 1;
var cFila_area = 1;
var arrayElem_area = [];
var arrayElemV_area = [];
var array_area = [];
var totalCol_area;
var tabla_area;
var tbody_area;
var valorNodo_area;
var childNodo_area;
var btnNuevo_area;
var nomTabl_area;
var nomBody_area;
var txtHiFi_area;
var txtInVa_area;
var idPriFilaBody_area = "firstRowBody_area";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_area
filaTabla_area = filaTabla_area + "<tr id='" + idPriFilaBody_area + "'>";
filaTabla_area = filaTabla_area + $("#" + idPriFilaBody_area).html();
filaTabla_area = filaTabla_area + "</tr>";
//Fin primera fila.

CargarJS_area(0,0,0);

function CargarJS_area(estado, childNodes, reloadTabla) {

    idFila_area = 1;
    cFila_area = 1;
    arrayElem_area = [];
    arrayElemV_area = [];
    array_area = [];
    childNodo_area = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_area).html(filaTabla_area);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_area").css('display', 'none');

    //Valores Script
    btnNuevo_area = "btn_area_nue";
    //Btn de reload nuevo.
    btnNuevo_area_reload = "btn_area_nue_reload";
    //Btn guardar.
    btn_area_save = "btn_area_save";
    //Nombre de la tabla
    nomTabl_area = "tbl_area";
    //Nombre del body
    nomBody_area = "tbody_area";
    //Contar fila de tabla
    txtHiFi_area = "hdn_area";
    //Validar Base de Datos
    txtInVa_area = "hdn_area_isvalid";
    //ID del Body
    idPriFilaBody_area = "firstRowBody_area";


    //Alternar botones Nuevo
    $("#" + btnNuevo_area).css('display', 'inline');
    $("#" + btnNuevo_area_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_area_save).attr("disabled", false);

    if (estado == 0) {

        tabla_area = document.getElementById(nomTabl_area);
        tbody_area = document.getElementById(nomBody_area);
        document.getElementById(txtHiFi_area).value = cFila_area;

        if (childNodo_area == 0 && reloadTabla == 0) {
            totalCol_area = tbody_area.childNodes[1].children.length;
            $("#" + btnNuevo_area).on('click', function () {
                idFila_area++;
                funcNuevaLinea_tbl_area(idFila_area, tabla_area.id);
                document.getElementById(txtHiFi_area).value = cFila_area;
            });
        }

        for (var i = 1; i <= totalCol_area; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_area);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_area.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_area.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_area(id) {
    var idTabla = tabla_area.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_area(idTabla);
        cFila_area = cFila_area - 1;
        document.getElementById(txtHiFi_area).value = cFila_area;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_area(idTabla);
        cFila_area = cFila_area - 1;
        document.getElementById(txtHiFi_area).value = cFila_area;
    }
    ReordenarId_tbl_area(idTabla);
}

function Reordenar_num_tbl_area(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_area(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_area = document.getElementById(nomBody_area);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_area == 1) {
        valorNodo_area = 0;
        cantFilas = cFila_area - 1;
    }

    else {
        valorNodo_area = 1;
        cantFilas = cFila_area + 1;
    }

    for (var i = valorNodo_area; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_area - 1) * 2) + 1; j += 2) {
                child = tbody_area.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_area[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_area == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_area - 2; j++) {
                child = tbody_area.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_area[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_area(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_area++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_area)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_area; i++) {
                            var tagName = arrayElem_area[i][0];
                            var idText = arrayElem_area[i][1];
                            var type = arrayElem_area[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_area + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_area + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_area + "' onclick='eliminar_fila_tbl_area(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_area + "' name='" + idText + idFila_area + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_area + "'><script type='text/javascript'>$('#" + idDiv + idFila_area + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_area + "').attr('id','" + idText + idFila_area + "').attr('name','" + idText + idFila_area + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_area + "'><script type='text/javascript'>$('#" + idDiv + idFila_area + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_area + "').attr('id','" + idText + idFila_area + "').attr('name','" + idText + idFila_area + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_area(idTabla);
    ReordenarId_tbl_area(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_area() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_area = document.getElementById(nomTabl_area);
    var idTabla = tabla_area.id;
    nFilas = $('#' + txtHiFi_area).val();
    array_area = ObtenerValores_tbl_area(nFilas);
    document.getElementById(txtInVa_area).value = "true";
    for (var a = 0; a < array_area.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_area[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_area[a][j - 1][1] != id) {
                    if (array_area[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_area).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_area).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_area).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_area; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_area - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_area[j][1];
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
                url: "/area/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Area(es) registrada(s) correctamente.");
                        $("#" + nomBody_area).html(filaTabla_area);
                        CargarJS_area(0, 1, 0);
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

function ObtenerValores_tbl_area(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_area.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_area[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Area(posicionFila) {

    var i = $("#txt_area_idarea" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/area/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja a la Area.");
                $("#fila_Area" + posicionFila).remove();
                Reordenar_num_tbl_area("tbl_area");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Area(posicionFila) {

    var i = $("#txt_area_idarea" + posicionFila).val();
    var nom = $("#Vtxt_area_nomarea" + posicionFila).val();
    var est = $("#txt_area_estado" + posicionFila).val();
    //var est = $("#Dcmb_area_estado" + posicionFila).val();
    //var fch = $("#txt_area_fchReg" + posicionFila).val();
    var usr = $("#txt_area_usreg" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/area/edit",
        data: {"i":i,"nom":nom,"est":est,/*"fch":fch,*/"usreg":usr},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Area Actualizada.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_Area() {
    //Alterna funcion del boton nuevo.
    $("#btn_area_nue").css("display", "none");
    $("#btn_area_nue_reload").css("display", "inline");
    $("#btn_area_save").attr("disabled", true);

    var nom = $("#txt_area_busnom").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/area/search",
        data: {"nom":nom},
        success: function resultado(valor) {
            $("#thEditar_area").css("display", "block");
            $("#" + nomBody_area).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}