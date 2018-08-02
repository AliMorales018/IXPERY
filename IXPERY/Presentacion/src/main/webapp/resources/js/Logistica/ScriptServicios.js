var cont_actividades_tabla = 0;
var cont_select_cargolaboral = 1;
var array_personal_transito = [];

function addActividad(){
    cont_actividades_tabla++;
    $('#container_actividades')
        .append(
            "<div id='actividad_"+cont_actividades_tabla+"' class='actividad grid-container'>"+
                "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                    "<div class='cell large-12'>"+
                       "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad "+cont_actividades_tabla+"</b><i id='delete_actividad_"+cont_actividades_tabla+"' onclick='eliminar_contenedor_actividad(this);' class='icon-minus-row-service icon-minus2 delete_actividad'></i></label>"+
                    "</div>"+
                "</div>"+
                    "<div class='grid-x grid-padding-x'>"+
                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input type='text' class='data-control form-control' type='text' placeholder='Nombre de actividad'></div></div>"+
                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input type='text' class='data-control form-control' type='text'  placeholder='Descripcion'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input type='number' class='data-control form-control' type='number' placeholder='Cantidad'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Riesgo'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Adicionales'></div></div>"+
            "</div>"+
                "<div class='grid-x grid-padding-x'>"+
                    "<div class='cell large-12'>"+
                        "<table class='table'>"+
                            "<thead class='thead-primary'>"+
                                "<tr>"+
                                    "<th id='add_row_actividad_"+cont_actividades_tabla+"' onclick='addCargoLaboral(this);' class='text-center'><i class='icon-plus2 icon-add-row-service'></i></th>"+
                                    "<th style='width: 450px'>Cargo Laboral</th>"+
                                    "<th>Cantidad</th>"+
                                    "<th>Días laborables</th>"+
                                    "<th class='text-center'><i class='icon icon-bin'></i></th>"+
                                "</tr>"+
                            "</thead>"+
                            "<tbody>"+
                                "<tr id='actividad_"+cont_actividades_tabla+"_fila_1'>"+
                                    "<td><div><p class='text-center'>1</p></div></td>"+
                                    "<td><div class='data-cargolab'><select id='selectcl_"+cont_select_cargolaboral+"' class='select_actividad_cargolab' style='width: 100%;' onchange='generar_personal_transito(this);'></select></div></td>"+
                                    "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Cantidad'/></div></td>"+
                                    "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Días laborables'/></div></td>"+
                                    "<td><div class='text-center'><button id='actividad_"+cont_actividades_tabla+"_btn_elim_1' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin'></i></button></div></td>"+
                                "</tr>"+
                            "</tbody>"+
                        "</table>"+
                    "</div>"+
                "</div>"+
            "</div>"
        );
    clonar_select2(cont_select_cargolaboral);
    cont_select_cargolaboral++;
}

function addCargoLaboral(obj){
    let id = obj.id;
    let Actividad = id.split("add_row_");
    let childs = $("#"+Actividad[1] + " tbody tr").length;
    childs++;
    $("#"+Actividad[1]+" tbody").append(
        "<tr id='"+Actividad[1]+"_fila_"+childs+"'>"+
            "<td><div><p class='text-center'>"+childs+"</p></div></td>"+
            "<td><div class='data-cargolab'><select id='selectcl_"+cont_select_cargolaboral+"' class='select_actividad_cargolab' style='width: 100%;' onchange='generar_personal_transito(this);'></select></div></td>"+
            "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Cantidad'/></div></td>"+
            "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Días laborables'/></div></td>"+
            "<td><div class='text-center'><button id='"+Actividad[1]+"_btn_elim_"+childs+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin '></i></button></div></td>"+
        "</tr>"
    );
    clonar_select2(cont_select_cargolaboral);
    Reordenar_filas_tabla_cargolaboral();
    cont_select_cargolaboral++;
}

//FUNCIONES QUE OPERAN A NIVEL DE CONTENEDOR DE ACTIVIDAD
function eliminar_contenedor_actividad(obj){
    let id = obj.id;
    let idActividad = id.split("actividad_");
    if(cont_actividades_tabla > 1){
        //Regenerar tabla de personal en tránsito
        $("#actividad_"+idActividad[1]+" table tbody tr select").each(function(){
            if($(this).val() !== null){
                editar_arrayPT($(this).val());
            }
        });
        $("#actividad_"+idActividad[1]).remove();
        cont_actividades_tabla = cont_actividades_tabla - 1;
        reordenar_num_actividad();
    }
    ReordenarId_servicio_cargolab();
    agregarfila_personaltransito();
}

function reordenar_num_actividad() {
    let num = 1;
    let obj = $("#container_actividades div div .title_actividad");
    $(obj).each(function () {
        $(this).find("b").text("Actividad "+num);
        num++;
    });
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD

function eliminar_fila_tabla_cargolab(obj){
    let id = obj.id;
    let splitId = id.split("_btn_elim_");
    let childs = $("#"+splitId[0] + " tbody tr").length;
    let object = $("#"+splitId[0]+"_fila_"+splitId[1]);
    if(childs > 1){
        //Editamos tabla personal en tránsito
        let valueSelect = object.find(".select_actividad_cargolab").val();
        if(valueSelect !== null){
            editar_arrayPT(valueSelect);
            agregarfila_personaltransito();
        }
        object.remove();
        reordernar_num_tabla_cargolab(splitId[0]);
        Reordenar_filas_tabla_cargolaboral();
    }
}

function reordernar_num_tabla_cargolab(idActividad){
    var contador = 1;
    var obj = $("#"+idActividad+ " tbody tr");
    $(obj).each(function () {
        $(this).find("p").text(contador);
        contador++;
    });
}

function clonar_select2(countSelect){
            $("#selectcl_"+countSelect).select2({
                ajax: {
                    url: "/servicios/listarcargolaboral",
                    dataType: 'json',
                    delay: 250,
                    data: function (params) {
                        return {
                            q: params.term.toUpperCase()
                        };
                    },
                    processResults: function (data, params) {
                        return {
                            results: data.items
                        };
                    },
                    cache: true
                },
                placeholder: 'Buscar cargo laboral / area . . .',
                escapeMarkup: function (markup) { return markup; }, // var our custom formatter work
                minimumInputLength: 2,
                templateResult: formatRepo_servicio,
                templateSelection: formatRepoSelection_servicio
            });
}

function ReordenarId_servicio_cargolab(){
    var count1 = 1; var count3 = 1; var count4 = 1;
    var actividades = $("#container_actividades .actividad");
    var iconAddActi = $("#container_actividades .actividad .icon-add-row-service");
    var iconMinusActi = $("#container_actividades .actividad .icon-minus-row-service");
    //Reordenar Id de Contenedores
    actividades.each(function(){
        $(this).attr("id","actividad_"+count1);
        count1++;
    });
    Reordenar_filas_tabla_cargolaboral();
    //Reordenar signos de agregar (+)
    iconAddActi.each(function(){
        $(this).parent().attr("id","add_row_actividad_"+count3);
        count3++;
    });
    //Reordenar signos de quitar (-)
    iconMinusActi.each(function(){
        $(this).attr("id","delete_actividad_"+count4);
        count4++;
    });
}

function Reordenar_filas_tabla_cargolaboral(){
    let count2 = 1;
    let filasActivi = $("#container_actividades .actividad table tbody");
    //Reordenar Id de filas de Actividad
    filasActivi.each(function(index){
        $(this).find("tr").each(function(){
            $(this).attr("id","actividad_"+(index+1)+"_fila_"+count2);
            $(this).find("button").attr("id","actividad_"+(index+1)+"_btn_elim_"+count2);
            count2++;
        });
        count2 = 1;
    });
}

//FUNCIONES PARA RECORRER LOS DATOS DE LA TABLA
function guardar_actividades_servicio(){
    if($("#select_solucion_servicio_cl").val() !== null) {
        var arrayDatosServicio = [];
        var porcen_depre_servicio = $("#txt_porcen_depre").val();
            if (porcen_depre_servicio !== "") {
                var filaDataServicio = [porcen_depre_servicio];
                arrayDatosServicio.push(filaDataServicio);
                var resultDataActividad = get_actividad_campos();
                if (resultDataActividad !== "invalid") {
                    var resultCargoslaborales = get_tablas_cargoslaborales();
                    if (resultCargoslaborales !== "invalid") {
                        var resultPersonalTra = get_data_personaltransito();
                        if (resultPersonalTra !== "invalid") {
                            let values = {
                                "servicio": [arrayDatosServicio],
                                "actividades": [resultDataActividad],
                                "cargoslab": resultCargoslaborales,
                                "personaltransito": [resultPersonalTra],
                            };
                            console.log(JSON.stringify(values));
                            $.ajax({
                                method: "POST",
                                url: "/servicios/register",
                                contentType: "application/json; charset=utf-8",
                                data: JSON.stringify(values),
                                success: function resultado(valor) {
                                    if (valor == "") {
                                        alert("Servicio Registrado Correctamente");
                                    }
                                },
                                error: function errores(msg) {

                                }
                            });
                        }
                    }
                }
            }
            else {
                alert("Ingrese porcentaje de depreciacion");
                $("#txt_porcen_depre").focus();
                return false;
            }
    }
    else{
        alert("Seleccione solución");
    }
}

function get_actividad_campos(){
    //DATOS PARA GUARDAR EN TABLA ACTIVIDAD
    var arrayDatosActividad = [];
    var valido_state_DatosActividad = "valid";
    $("#container_actividades .actividad").each(function() {
        if (valido_state_DatosActividad === "invalid") {
            return "invalid";
        }
        else {
            var filaData = [];
            $(this).find(".data-control").each(function (index) {
                var val = $(this).val();
                if (index === 0) {
                    if (val === "") {
                        alert("Ingrese nombre de actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                }
                if (index === 1) {
                    if (val === "") {
                        alert("Ingrese descripción de actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                }
                if (index === 2) {
                    if (val === "") {
                        alert("Ingrese cantidad requerida en la actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                }
                if (index === 3) {
                    if (val === "") {
                        alert("Ingrese riesgo de la actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                }
                if (index === 4) {
                    if (val === "") {
                        alert("Ingrese adicionales.");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                }
                filaData[index] = val;
            });
        }
        arrayDatosActividad.push(filaData);
    });
    if(valido_state_DatosActividad === "valid") {
        return arrayDatosActividad;
    }
    else{
        arrayDatosActividad = [];
        return "invalid" ;
    }
    //DATOS PARA GUARDAR EN TABLA ACTIVIDAD
}

function get_tablas_cargoslaborales(){
    var arrayConjunto_TablaCL = [];
    //DATOS PARA GUARDAR EN TABLA CARGO LABORAL
    var sV; var cV; var tV;
    var valido_ingresados = true;
    //FOR1
    $("#container_actividades .actividad").each(function(){
        if(valido_ingresados === false){
            return false;
        }
        else {
            var array_TablaCL = [];
            $(this).find("table tbody tr").each(function () {
                if (valido_ingresados === false) {
                    return false;
                }
                else {
                    var array_filaTablaCL = [];
                    sV = false;
                    cV = false;
                    tV = false;
                    $(this).find("td .data-cargolab").each(function (index) {
                        var value;
                        var element;
                        if (index === 0) {
                            value = $(this).find(".select_actividad_cargolab").val();
                            if (value == null) {
                                sV = true;
                                alert("Seleccione un cargo laboral.");
                                $(this).focus();
                                valido_ingresados = false;
                                return false;
                            }
                        }
                        if (index === 1) {
                            element =  $(this).children(":first-child");
                            value = element.val();
                            if (value === "") {
                                cV = true;
                                alert("Ingrese una cantidad válida.");
                                element.focus();
                                valido_ingresados = false;
                                return false;
                            }
                        }
                        if (index === 2) {
                            element = $(this).children(":first-child");
                            value = element.val();
                            if (value === "") {
                                tV = true;
                                alert("Ingrese un tiempo (Horas) válido.");
                                element.focus();
                                valido_ingresados = false;
                                return false;
                            }
                        }
                        array_filaTablaCL[index] = value;
                    });
                    if (sV === false && cV === false && tV === false) {
                        array_TablaCL.push(array_filaTablaCL);
                    }
                }
            });
            if(valido_ingresados === true) {
                arrayConjunto_TablaCL.push(array_TablaCL);
            }
            else{
                arrayConjunto_TablaCL = [];
            }
        }
    });
    if(valido_ingresados === true) {
        return arrayConjunto_TablaCL;
    }
    else{
        return "invalid";
    }
}

function get_data_personaltransito(){
    var arrayDatosPersTra = [];
    var valido_state_DatosPersonalTra = "valid";
    $('#tbody_personal_transito tr').each(function () {
        if (valido_state_DatosPersonalTra === "invalid") {
            return "invalid";
        }
        else {
            var filaData = [];
            var val;
            $(this).find(".data-personal").each(function (index) {
                if (index === 0) {
                    val = $(this).text();
                }
                if (index === 1) {
                    val = $(this).text();
                }
                if (index === 2) {
                    val = $(this).val();
                    if (val === "") {
                        alert("Ingrese una cantidad válida.");
                        $(this).focus();
                        valido_state_DatosPersonalTra = "invalid";
                        return false;
                    }
                }
                if (index === 3) {
                    val = $(this).val();
                    if (val === "") {
                        alert("Ingrese un tiempo (Horas) válido.");
                        $(this).focus();
                        valido_state_DatosPersonalTra = "invalid";
                        return false;
                    }
                }
                filaData[index] = val;
            });
        }
        arrayDatosPersTra.push(filaData);
    });
    if(valido_state_DatosPersonalTra === "valid") {
        return arrayDatosPersTra;
    }
    else{
        arrayDatosPersTra = [];
        return "invalid" ;
    }
}

function habilitarElements() {
    $("input").removeAttr("disabled");
    $("button").removeAttr("disabled");
    $("select").removeAttr("disabled");
}

function BuscarSolucionServiciosCL(id) {
        $.ajax({
            method: "POST",
            url: "/servicios/verservicio",
            data: {"id":id},
            success: function resultado(valor) {
                let JsonObj = JSON.parse(valor);
                if (JsonObj.items.length > 0) {
                    let elementsPT = "";
                    let JsonServicio = JsonObj.items[0].SERVICIO[0];
                    let countCL = 1;
                    let data;
                    console.log(JsonObj);

                    //Removemos atributos disabled
                    habilitarElements();

                    //Tabla Servicio
                    $("#txt_porcen_depre").val(JsonServicio.porcentaje_depreciacion);

                    //Tabla Personal de Tránsito
                    $.each(JsonObj.items[2].PERSONALTRANSITO, function (index, item) {
                        elementsPT += "<tr>" +
                            "<td><p class='text-center' style='font-size:11px;'>" + (index + 1) + "</p></td>" +
                                "<td style='display: none'><span class='data-personal'>" + item.idperstran + "</span></td>" +
                                "<td><span class='data-personal'>" + item.cargolaboral + "</span></td>" +
                                "<td><input type='number' placeholder='Cantidad' class='form-control data-personal' value='" + item.cantidad + "'/></td>" +
                                "<td><input type='number' placeholder='Días pago' class='form-control data-personal' value='" + item.diaspago + "'/></td>" +
                            "</tr>"
                        array_personal_transito.push([item.idcargo.toString(),item.cargolaboral,item.contador,item.cantidad,item.diaspago]);
                    });

                    $("#tbody_personal_transito").html(elementsPT);

                    //Tabla Actividades
                    $("#container_actividades").empty();
                    $.each(JsonObj.items[1].ACTIVIDAD, function (index, item) {
                        cont_actividades_tabla++;
                        $("#container_actividades").append("<div id='actividad_"+cont_actividades_tabla+"' class='actividad grid-container'>"+
                                                                "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                                                                    "<div class='cell large-12'>"+
                                                                        "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad "+cont_actividades_tabla+"</b><i id='delete_actividad_"+cont_actividades_tabla+"' onclick='eliminar_contenedor_actividad(this);' class='icon-minus-row-service icon-minus2 delete_actividad'></i></label>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                                "<div class='grid-x grid-padding-x'>"+
                                                                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input type='text' class='data-control form-control' type='text' placeholder='Nombre de actividad' value='"+item.actividad+"'></div></div>"+
                                                                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input type='text' class='data-control form-control' type='text'  placeholder='Descripcion' value='"+item.descripcion+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input type='number' class='data-control form-control' type='number' placeholder='Cantidad' value='"+item.cantidad+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Riesgo' value='"+item.riesgo+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Adicionales' value='"+item.adicional+"'></div></div>"+
                                                                "</div>"+
                                                                "<div class='grid-x grid-padding-x'>"+
                                                                    "<div class='cell large-12'>"+
                                                                        "<table class='table'>"+
                                                                            "<thead class='thead-primary'>"+
                                                                                "<tr>"+
                                                                                    "<th id='add_row_actividad_"+cont_actividades_tabla+"' onclick='addCargoLaboral(this);' class='text-center'><i class='icon-plus2 icon-add-row-service'></i></th>"+
                                                                                    "<th style='width:450px'>Cargo Laboral</th>"+
                                                                                    "<th>Cantidad</th>"+
                                                                                    "<th>Días laborables</th>"+
                                                                                    "<th class='text-center'><i class='icon icon-bin'></i></th>"+
                                                                                "</tr>"+
                                                                            "</thead>"+
                                                                            "<tbody>"+
                                                                            "</tbody>"+
                                                                        "</table>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                          "</div>");

                        $.each(item.cargoslaborales, function (index, item) {
                            $("#actividad_"+cont_actividades_tabla+" table tbody").append("<tr id='actividad_"+cont_actividades_tabla+"_fila_"+countCL+"'>" +
                                "<td><div><p class='text-center'>"+countCL+"</p></div></td>" +
                                "<td><div class='data-cargolab'><select id='selectcl_"+cont_select_cargolaboral+"' class='select_actividad_cargolab' style='width: 100%;'></select></div></td>" +
                                "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Cantidad' value='"+item.cantidad+"'/></div></td>" +
                                "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Días laborables' value='"+item.diaslaborables+"'/></div></td>" +
                                "<td><div class='text-center'><button id='actividad_"+cont_actividades_tabla+"_btn_elim_"+countCL+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin'></i></button></div></td>" +
                                "</tr>"
                            );
                            clonar_select2(cont_select_cargolaboral);
                            data = {id: item.idcargo, text: item.nomcargo + " - " + item.nomarea};
                            let newOption = new Option(data.text, data.id, false, false);
                            $('#selectcl_'+cont_select_cargolaboral).append(newOption).trigger('change');
                            $('#selectcl_'+cont_select_cargolaboral).attr("onchange","generar_personal_transito(this);");
                            cont_select_cargolaboral++;
                            countCL++;
                        });
                        countCL = 1 ;
                    });
                }
                else{
                    cont_actividades_tabla = 1;
                    cont_select_cargolaboral = 2;
                    array_personal_transito = [];

                    //Removemos atributos disabled
                    habilitarElements();

                    //Tabla Servicio
                    $("#txt_porcen_depre").val("");

                    //Personal de tránsito
                    $("#tbody_personal_transito").html("<tr><td colspan='5' class='text-center'><div style=\"padding: 4px; font-size: 10px\">Seleccione cargo laboral.</div></td></tr>")

                    //Tabla Actividades
                    $("#container_actividades").html(
                        "<div id='actividad_1' class='actividad grid-container'>"+
                            "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                                "<div class='cell large-12'>"+
                                    "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad 1</b><i id='delete_actividad_1' onclick='eliminar_contenedor_actividad(this);' class='icon-minus-row-service icon-minus2 delete_actividad'></i></label>"+
                                "</div>"+
                            "</div>"+
                            "<div class='grid-x grid-padding-x'>"+
                                "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input type='text' class='data-control form-control' type='text' placeholder='Nombre de actividad'></div></div>"+
                                "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input type='text' class='data-control form-control' type='text'  placeholder='Descripcion'></div></div>"+
                                "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input type='number' class='data-control form-control' type='number' placeholder='Cantidad'></div></div>"+
                                "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Riesgo'></div></div>"+
                                "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Adicionales'></div></div>"+
                            "</div>"+
                            "<div class='grid-x grid-padding-x'>"+
                                "<div class='cell large-12'>"+
                                "<table class='table'>"+
                                    "<thead class='thead-primary'>"+
                                        "<tr>"+
                                            "<th id='add_row_actividad_1' onclick='addCargoLaboral(this);' class='text-center'><i class='icon-plus2 icon-add-row-service'></i></th>"+
                                            "<th style='width: 450px'>Cargo Laboral</th>"+
                                            "<th>Cantidad</th>"+
                                            "<th>Díás laborables</th>"+
                                            "<th class='text-center'><i class='icon icon-bin'></i></th>"+
                                        "</tr>"+
                                    "</thead>"+
                                    "<tbody>"+
                                        "<tr id='actividad_1_fila_1'>"+
                                            "<td><div><p class='text-center'>1</p></div></td>"+
                                            "<td><div class='data-cargolab'><select id='selectcl_1' class='select_actividad_cargolab' style='width: 100%;' onchange='generar_personal_transito(this);'></select></div></td>"+
                                            "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Cantidad'/></div></td>"+
                                            "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Días laborables'/></div></td>"+
                                            "<td><div class='text-center'><button id='actividad_1_btn_elim_1' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin'></i></button></div></td>"+
                                        "</tr>"+
                                    "</tbody>"+
                                "</table>"+
                                "</div>"+
                            "</div>"+
                        "</div>"
                    );
                    clonar_select2(1);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
}

/*Generar la tabla de Personal de tránsito*/
function generar_personal_transito(obj){
    //console.log("Cambió combo");
    let selectId = obj.id;
    let data = $("#"+obj.id).select2('data');
    let id = data[0].id;
    let cargo = data[0].cargo + " - " + data[0].area;
    let lengthPT = array_personal_transito.length;
    if(lengthPT === 0){
        array_personal_transito.push([id,cargo,1,0,0]);
        agregarfila_personaltransito();
    }
    else{
        verificar_cargolaboral_unico(id, cargo, selectId);
    }
}

function verificar_cargolaboral_unico(idCargo,cargo,selectId) {
    let id = $("#" + selectId).parent().parent().parent().attr("id");
    let encontrado = false;
    let optionEncontrado = false;
    let idSCL;
    id = id.split("_fila_");
    //id[0] id de la actividad
    $("#" + id[0] + " table tbody .select_actividad_cargolab").each(function () {
        //No se llama a si mismo
        if ($(this).attr("id") !== selectId) {
            //Valor del primer select y así sucesivamente
            idSCL = $(this).val();
            //Si lo encuentra en la misma actividad salta el mensaje de duplicado.
            if (idCargo === idSCL) {
                alert("Ya existe el cargo laboral " + cargo + " en esta actividad");
                removeOptions(selectId,true);
                encontrado = true;
            }
        }
    });
    if (encontrado === false) {
        let objOptionCount = $("#" + selectId).find("option").length;
        if (objOptionCount > 1) {
            editar_arrayPT($("#" + selectId).find("option").eq(objOptionCount - 2).val());
            removeOptions(selectId,false);
        }
        verificar_arrayPT(idCargo, cargo);
    }
    //Tabla personal en tránsito
    agregarfila_personaltransito();
}

function removeOptions(idSelect,condition){
    if(condition == true) {
        $("#" + idSelect).find("option:last").remove();
    }
    $("#"+idSelect+" option").not(":last-child").each(function(){
        $(this).remove();
    });
}

function verificar_arrayPT(idCargo,cargo){
    let encontradoArray = false;
    for(let i = 0; i < array_personal_transito.length; i++){
        if(array_personal_transito[i][0] === idCargo){
            array_personal_transito[i][2] = array_personal_transito[i][2] + 1;
            encontradoArray = true;
            break;
        }
    }
    if(encontradoArray === false){
        array_personal_transito.push([idCargo, cargo,1,0,0]);
    }
}

function editar_arrayPT(idCargo){
    //alert("Editando Array");
    //console.log(idCargo);
  for(let i = 0; i < array_personal_transito.length; i++){
        if(array_personal_transito[i][0] === idCargo){
            if(array_personal_transito[i][2] === 1){
                array_personal_transito.splice(i,1);
            }
            else{
                array_personal_transito[i][2] = array_personal_transito[i][2] - 1;
            }
        }
    }
}

function agregarfila_personaltransito() {
    let obj = $("#tbody_personal_transito");
    let cantidad;
    let horas;
    obj.html("");
    if (array_personal_transito.length >= 1) {
        for (let i = 0; i < array_personal_transito.length; i++) {
            cantidad = array_personal_transito[i][3];
            horas = array_personal_transito[i][4];
            if(cantidad === 0){
                cantidad = "";
            }
            if(horas === 0){
                horas = "";
            }
            obj.append(
                "<tr>" +
                    "<td><p class='text-center' style='font-size:11px;'>" + (i + 1) + "</p></td>" +
                    "<td style='display: none'><span class='data-personal'>" + array_personal_transito[i][0] + "</span></td>" +
                    "<td><span class='data-personal'>" + array_personal_transito[i][1] + "</span></td>" +
                    "<td><input type='number' placeholder='Cantidad' class='form-control data-personal' value='"+cantidad+"'/></td>" +
                    "<td><input type='number' placeholder='Días pago' class='form-control data-personal' value='"+horas+"' /></td>" +
                "</tr>"
            );
        }
    }
    else{
        obj.html("<tr><td colspan='5' class='text-center'><div style=\"padding: 4px; font-size: 10px\">Seleccione cargo laboral.</div></td></tr>");
    }
}