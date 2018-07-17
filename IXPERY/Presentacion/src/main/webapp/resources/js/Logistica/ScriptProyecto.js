var idFila_proyecto = 1;
var cFila_proyecto = 1;
var arrayElem_proyecto = [];
var arrayElemV_proyecto = [];
var array_proyecto = [];
var totalCol_proyecto;
var tabla_proyecto;
var tbody_proyecto;
var valorNodo_proyecto;
var childNodo_proyecto;
var btnNuevo_proyecto;
var nomTabl_proyecto;
var nomBody_proyecto;
var txtHiFi_proyecto;
var txtInVa_proyecto;
var idPriFilaBody_proyecto = "firstRowBody_proyecto";

//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_proyecto
filaTabla_proyecto = filaTabla_proyecto + "<tr id='" + idPriFilaBody_proyecto + "'>";
filaTabla_proyecto = filaTabla_proyecto + $("#" + idPriFilaBody_proyecto).html();
filaTabla_proyecto = filaTabla_proyecto + "</tr>";
//Fin primera fila.

CargarJS_proyecto(0,0,0);

$(document).ready(function(){
    // $( "#tbody_proyecto tr" ).on( "mouseenter mouseleave", function(){
    //     $(this).css("background-color","#E6E6E6");
    // } );
    //
    // $("#tbody_proyecto tr td").on('click', clickTabla);


});

function clickTabla(){
    var x = $(this).parent("tr");
    //$('#tbody_proyecto tr:hover').css("background-color","transparent");
    x.css("background-color","#E6E6E6");
    $( "#tbody_proyecto tr" ).off( "mouseenter mouseleave" );


    // $("#tbody_proyecto tr")
    // #tbody_proyecto tr:hover {
    //     background-color: #E6E6E6;
    // }

    //$('#tbody_proyecto tr').unbind('mouseenter mouseleave');
}



function CargarJS_proyecto(estado, childNodes, reloadTabla) {

    idFila_proyecto = 1;
    cFila_proyecto = 1;
    arrayElem_proyecto = [];
    arrayElemV_proyecto = [];
    array_proyecto = [];
    childNodo_proyecto = childNodes;

    if (childNodes == 1) {
        $("#" + nomBody_proyecto).html(filaTabla_proyecto);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_proyecto").css('display', 'none');

    //Valores Script
    btnNuevo_proyecto = "btn_proyecto_nue";
    //Btn de reload nuevo.
    btnNuevo_proyecto_reload = "btn_proyecto_nue_reload";
    //Btn guardar.
    btn_proyecto_save = "btn_proyecto_save";
    //Nombre de la tabla
    nomTabl_proyecto = "tbl_proyecto";
    //Nombre del body
    nomBody_proyecto = "tbody_proyecto";
    //Contar fila de tabla
    txtHiFi_proyecto = "hdn_proyecto";
    //Validar Base de Datos
    txtInVa_proyecto = "hdn_proyecto_isvalid";
    //ID del Body
    idPriFilaBody_proyecto = "firstRowBody_proyecto";


    //Alternar botones Nuevo
    $("#" + btnNuevo_proyecto).css('display', 'inline');
    $("#" + btnNuevo_proyecto_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_proyecto_save).attr("disabled", false);

    if (estado == 0) {

        tabla_proyecto = document.getElementById(nomTabl_proyecto);
        tbody_proyecto = document.getElementById(nomBody_proyecto);
        document.getElementById(txtHiFi_proyecto).value = cFila_proyecto;

        if (childNodo_proyecto == 0 && reloadTabla == 0) {
            totalCol_proyecto = tbody_proyecto.childNodes[1].children.length;
            $("#" + btnNuevo_proyecto).on('click', function () {
                idFila_proyecto++;
                funcNuevaLinea_tbl_proyecto(idFila_proyecto, tabla_proyecto.id);
                document.getElementById(txtHiFi_proyecto).value = cFila_proyecto;
            });
        }

        for (var i = 1; i <= totalCol_proyecto; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_proyecto);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_proyecto.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_proyecto.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_proyecto(id) {
    var idTabla = tabla_proyecto.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_proyecto(idTabla);
        cFila_proyecto = cFila_proyecto - 1;
        document.getElementById(txtHiFi_proyecto).value = cFila_proyecto;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_proyecto(idTabla);
        cFila_proyecto = cFila_proyecto - 1;
        document.getElementById(txtHiFi_proyecto).value = cFila_proyecto;
    }
    ReordenarId_tbl_proyecto(idTabla);
}

function Reordenar_num_tbl_proyecto(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_proyecto(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_proyecto = document.getElementById(nomBody_proyecto);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_proyecto == 1) {
        valorNodo_proyecto = 0;
        cantFilas = cFila_proyecto - 1;
    }

    else {
        valorNodo_proyecto = 1;
        cantFilas = cFila_proyecto + 1;
    }

    for (var i = valorNodo_proyecto; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_proyecto - 1) * 2) + 1; j += 2) {
                child = tbody_proyecto.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_proyecto[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_proyecto == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_proyecto - 2; j++) {
                child = tbody_proyecto.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_proyecto[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_proyecto(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_proyecto++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_proyecto)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_proyecto; i++) {
                            var tagName = arrayElem_proyecto[i][0];
                            var idText = arrayElem_proyecto[i][1];
                            var type = arrayElem_proyecto[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_proyecto + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_proyecto + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='text-center'><button class='btn btn-sm-delete' id='" + idText + idFila_proyecto + "' onclick='eliminar_fila_tbl_proyecto(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_proyecto + "' name='" + idText + idFila_proyecto + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_proyecto + "'><script type='text/javascript'>$('#" + idDiv + idFila_proyecto + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_proyecto + "').attr('id','" + idText + idFila_proyecto + "').attr('name','" + idText + idFila_proyecto + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_proyecto + "'><script type='text/javascript'>$('#" + idDiv + idFila_proyecto + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_proyecto + "').attr('id','" + idText + idFila_proyecto + "').attr('name','" + idText + idFila_proyecto + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_proyecto(idTabla);
    ReordenarId_tbl_proyecto(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_proyecto() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_proyecto = document.getElementById(nomTabl_proyecto);
    var idTabla = tabla_proyecto.id;
    nFilas = $('#' + txtHiFi_proyecto).val();
    array_proyecto = ObtenerValores_tbl_proyecto(nFilas);
    document.getElementById(txtInVa_proyecto).value = "true";
    for (var a = 0; a < array_proyecto.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_proyecto[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_proyecto[a][j - 1][1] != id) {
                    if (array_proyecto[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_proyecto).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_proyecto).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_proyecto).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_proyecto; i++) {
            if (validoIngresados == true) {
                var filaData = [];
                for (var j = 1; j <= totalCol_proyecto - 2; j++) {
                    var id = arrayElem_proyecto[j][1];
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
        //LISTA CON DATOS
        var arrayData = {
            values: arrayDatos
        }

        if (validoIngresados == true) {
            //METODO AJAX
            $.ajax({
                method: "POST",
                url: "/proyecto/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Proyecto(s) registrado(s) correctamente.");

                        $("#" + nomBody_proyecto).html(filaTabla_proyecto);
                        CargarJS_proyecto(0, 1, 0);
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

function ObtenerValores_tbl_proyecto(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_proyecto.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_proyecto[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}

//METODOS AJAX
function elimRegistro_Proyecto(posicionFila) {
    var i = $("#txt_proyecto_idusu" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/proyecto/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Proyecto.");
                $("#fila_Proyecto" + posicionFila).remove();
                Reordenar_num_tbl_proyecto("tbl_proyecto");
            }
        },
        error:   function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_Proyecto(posicionFila) {

    var i = $("#txt_proyecto_idusu" + posicionFila).val();
    var usr = $("#Vtxt_proyecto_pro" + posicionFila).val();
    var nom = $("#txt_proyecto_nombre" + posicionFila).val();
    var ap = $("#txt_proyecto_apep" + posicionFila).val();
    var am = $("#txt_proyecto_apem" + posicionFila).val();
    var est = $("#cmb_proyecto_estado" + posicionFila).val();
    var cla = $("#txt_proyecto_clave" + posicionFila).val();
    var idp = $("#cmb_proyecto_empleado" + posicionFila).val();
    var ema = $("#txt_proyecto_correo" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/proyecto/edit",
        data: {"i":i,"usr":usr,"nom":nom,"ap":ap,"am":am,"est":est,"cla":cla,"idp":idp,"ema":ema},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Proyecto Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_proyecto() {
    //Alterna funcion del boton nuevo.
    $("#btn_proyecto_nue").css("display", "none");
    $("#btn_proyecto_nue_reload").css("display", "inline");
    $("#btn_proyecto_save").attr("disabled", true);

    var pro = $("#txt_proyecto_busnom").val().toUpperCase();
    var emp = "";
    var jef = "";
    // var em =  $("#txt_proyecto_emp").val().toUpperCase();
    // var apep = $("#txt_proyecto_busapep").val().toUpperCase();
    // var apem = $("#txt_proyecto_busapem").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/proyecto/search",
        data: {"pro":pro,"emp":emp, "jef": jef},
        success: function resultado(valor) {
            // $( "#tbody_proyecto tr" ).on( "mouseenter mouseleave", function(){
            //     $(this).css("background-color","#E6E6E6");
            // } );

            $("#thEditar_proyecto").css("display", "block");
            $("#" + nomBody_proyecto).html(valor);
            // $("#tbody_proyecto tr td").on('click', clickTabla);

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}


function searchEmpresa(){
    $.ajax({
        method: "POST",
        url: "/proyecto/buscarempresa",
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_proyecto_emp1").html("<option></option>");
            }
            else{
                $("#cmb_proyecto_emp1").empty();
                var JSONobj = JSON.parse(data);
                $("#cmb_proyecto_emp1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_proyecto_emp1").append('<option value="'+item.idempresa+'">'+item.nomempresa+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function searchEmpleado(){
    $.ajax({
        method: "POST",
        url: "/proyecto/buscarempleado",
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_proyecto_jef1").html("<option></option>");
            }
            else{
                $("#cmb_proyecto_jef1").empty();
                var JSONobj = JSON.parse(data);
                $("#cmb_proyecto_jef1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_proyecto_jef1").append('<option value="'+item.idempleado+'">'+item.nomempleado+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function searchTipo(){
    $.ajax({
        method: "POST",
        url: "/proyecto/buscartipo",
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_proyecto_est1").html("<option></option>");
            }
            else{
                $("#cmb_proyecto_est1").empty();
                var JSONobj = JSON.parse(data);
                $("#cmb_proyecto_est1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_proyecto_est1").append('<option value="'+item.idestado+'">'+item.nomestado+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

// $(document).ready(function(){
//     function searchEmpresa(){
//         $.ajax({
//             method: "POST",
//             url: "/proyecto/buscarempresa",
//             success: function resultado(data) {
//                 if(data == "0"){
//                     $("#cmb_proyecto_emp1").html("<option></option>");
//                 }
//                 else{
//                     $("#cmb_proyecto_emp1").empty();
//                     var JSONobj = JSON.parse(data);
//                     $("#cmb_proyecto_emp1").append("<option value='0'>Seleccione . . .</option>");
//                     $.each(JSONobj, function (obj, item) {
//                         $("#cmb_proyecto_emp1").append('<option value="'+item.idempresa+'">'+item.nomempresa+'</option>');
//                     });
//                 }
//             },
//             error: function errores(msg) {
//                 alert('Error: ' + msg.responseText);
//             }
//         });
//     }
//
//     function searchEmpleado(){
//         $.ajax({
//             method: "POST",
//             url: "/proyecto/buscarempleado",
//             success: function resultado(data) {
//                 if(data == "0"){
//                     $("#cmb_proyecto_jef1").html("<option></option>");
//                 }
//                 else{
//                     $("#cmb_proyecto_jef1").empty();
//                     var JSONobj = JSON.parse(data);
//                     $("#cmb_proyecto_jef1").append("<option value='0'>Seleccione . . .</option>");
//                     $.each(JSONobj, function (obj, item) {
//                         $("#cmb_proyecto_jef1").append('<option value="'+item.idempleado+'">'+item.nomempleado+'</option>');
//                     });
//                 }
//             },
//             error: function errores(msg) {
//                 alert('Error: ' + msg.responseText);
//             }
//         });
//     }
//
//     function searchTipo(){
//         $.ajax({
//             method: "POST",
//             url: "/proyecto/buscartipo",
//             success: function resultado(data) {
//                 if(data == "0"){
//                     $("#cmb_proyecto_est1").html("<option></option>");
//                 }
//                 else{
//                     $("#cmb_proyecto_est1").empty();
//                     var JSONobj = JSON.parse(data);
//                     $("#cmb_proyecto_est1").append("<option value='0'>Seleccione . . .</option>");
//                     $.each(JSONobj, function (obj, item) {
//                         $("#cmb_proyecto_est1").append('<option value="'+item.idestado+'">'+item.nomestado+'</option>');
//                     });
//                 }
//             },
//             error: function errores(msg) {
//                 alert('Error: ' + msg.responseText);
//             }
//         });
//     }
// });


$(document).ready(function(){
    $.ajax({
        sync: true,
        method: "POST",
        url: "/proyecto/buscarempresa",
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_proyecto_emp1").html("<option></option>");
            }
            else{
                $("#cmb_proyecto_emp1").empty();
                var JSONobj = JSON.parse(data);
                $("#cmb_proyecto_emp1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_proyecto_emp1").append('<option value="'+item.idempresa+'">'+item.nomempresa+'</option>');
                });
            }
            $.ajax({
                sync: true,
                method: "POST",
                url: "/proyecto/buscarempleado",
                success: function resultado(data) {
                    if(data == "0"){
                        $("#cmb_proyecto_jef1").html("<option></option>");
                    }
                    else{
                        $("#cmb_proyecto_jef1").empty();
                        var JSONobj = JSON.parse(data);
                        $("#cmb_proyecto_jef1").append("<option value='0'>Seleccione . . .</option>");
                        $.each(JSONobj, function (obj, item) {
                            $("#cmb_proyecto_jef1").append('<option value="'+item.idempleado+'">'+item.nomempleado+'</option>');
                        });
                    }
                    $.ajax({
                        sync: true,
                        method: "POST",
                        url: "/proyecto/buscartipo",
                        success: function resultado(data3) {
                            if(data == "0"){
                                $("#cmb_proyecto_est1").html("<option></option>");
                            }
                            else{
                                $("#cmb_proyecto_est1").empty();
                                var JSONobj = JSON.parse(data3);
                                $("#cmb_proyecto_est1").append("<option value='0'>Seleccione . . .</option>");
                                $.each(JSONobj, function (obj, item) {
                                    $("#cmb_proyecto_est1").append('<option value="'+item.idestado+'">'+item.nomestado+'</option>');
                                });
                            }
                        },
                        error: function errores(msg) {
                            alert('Error: ' + msg.responseText);
                        }
                    });
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }



            });




        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


    $('#tbody_proyecto tr').on('click', function(){
        //var dato = $(this).find('td:first').html();
        // var dato = $(this).find('td:nth-child(3)').html();
        // $('#txt_proyecto_jef').val(dato);
    });


});

function searchEmpresa(searchLike){
    $.ajax({
        method: "POST",
        url: "/proyecto/buscarempresas",
        data: {"var":searchLike},
        success: function resultado(data) {
            if(data == "0"){
                $("#selectEmpresa").html("<option></option>");
            }
            else{
                $("#selectEmpresa").empty();
                var JSONobj = JSON.parse(data);
                $("#selectEmpresa").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#selectEmpresa").append('<option value="'+item.idempresa+'">'+item.nomempresa+' - '+item.ruc+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

