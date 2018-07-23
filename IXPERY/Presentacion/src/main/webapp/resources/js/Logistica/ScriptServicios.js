
var cont_actividades_tabla = 1

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
            "<div class='cell large-4'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input type='text' class='data-control form-control' type='text' placeholder='Nombre de actividad'></div></div>"+
            "<div class='cell large-4'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input type='text' class='data-control form-control' type='text'  placeholder='Descripcion'></div></div>"+
            "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input type='number' class='data-control form-control' type='number' placeholder='Cantidad'></div></div>"+
            "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input type='text' class='data-control form-control' type='number' placeholder='Riesgo'></div></div>"+
            "</div>"+
            "<div class='grid-x grid-padding-x'>"+
            "<div class='cell large-12'>"+
            "<table class='table'>"+
            "<thead class='thead-primary'>"+
            "<tr>"+
            "<th id='add_row_actividad_"+cont_actividades_tabla+"' onclick='addCargoLaboral(this);' class='text-center'><i class='icon-plus2 icon-add-row-service'></i></th>"+
            "<th>Cargo Laboral</th>"+
            "<th>Cantidad</th>"+
            "<th>Tiempo (Horas)</th>"+
            "<th class='text-center'><i class='icon icon-bin'></i></th>"+
            "</tr>"+
            "</thead>"+
            "<tbody>"+
            "<tr id='actividad_"+cont_actividades_tabla+"_fila_1'>"+
            "<td><div><p class='text-center'>1</p></div></td>"+
            "<td><div class='data-cargolab'><select class='select_actividad_cargolab' style='width: 100%;'></select></div></td>"+
            "<td><div class='data-cargolab'><input type='number' class='form-control' /></div></td>"+
            "<td><div class='data-cargolab'><input type='number' class='form-control' /></div></td>"+
            "<td><div class='text-center'><button id='actividad_"+cont_actividades_tabla+"_btn_elim_1' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin'></i></button></div></td>"+
            "</tr>"+
            "</tbody>"+
            "</table>"+
            "</div>"+
            "</div>"+
            "</div>"
        );
    clonar_select2();
}

function addCargoLaboral(obj){
    var id = obj.id;
    var Actividad = id.split("add_row_");

    var childs = $("#"+Actividad[1] + " tbody tr").length;

    childs++;

    $("#"+Actividad[1]+" tbody").append(
        "<tr id='"+Actividad[1]+"_fila_"+childs+"'>"+
        "<td><div><p class='text-center'>"+childs+"</p></div></td>"+
        "<td><div class='data-cargolab'><select class='select_actividad_cargolab' style='width: 100%;'></select></div></td>"+
        "<td><div class='data-cargolab'><input type='number' class='form-control' /></div></td>"+
        "<td><div class='data-cargolab'><input type='number' class='form-control' /></div></td>"+
        "<td><div class='text-center'><button id='"+Actividad[1]+"_btn_elim_"+childs+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_cargolab(this);'><i class='icon icon-bin '></i></button></div></td>"+
        "</tr>"
    );
    clonar_select2();
    Reordenar_filas_tabla_cargolaboral();
}

//FUNCIONES QUE OPERAN A NIVEL DE CONTENEDOR DE ACTIVIDAD

function eliminar_contenedor_actividad(obj){
    if(cont_actividades_tabla > 1){
        var id = obj.id;
        var idActividad = id.split("actividad_");
        $("#actividad_"+idActividad[1]).remove();
        cont_actividades_tabla = cont_actividades_tabla -1;
        reordenar_num_actividad();
    }
    ReordenarId_servicio_cargolab();
}

function reordenar_num_actividad() {
    var num = 1;
    var obj = $("#container_actividades div div .title_actividad");

    $(obj).each(function () {
        $(this).find("b").text("Actividad "+num);
        num++;
    });
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD

function eliminar_fila_tabla_cargolab(obj){
    var id = obj.id;
    var splitId = id.split("_btn_elim_");
    var childs = $("#"+splitId[0] + " tbody tr").length;

    if(childs > 1){
        $("#"+splitId[0]+"_fila_"+splitId[1]).remove();
        reordernar_num_tabla_cargolab(splitId[0]);
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

function clonar_select2(){
    $('.select_actividad_cargolab').each(function () {
        if($(this).find("option").length == 0) {
            $(this).select2({
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
                escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
                minimumInputLength: 2,
                templateResult: formatRepo_servicio,
                templateSelection: formatRepoSelection_servicio
            });
        }
    });
}

function ReordenarId_servicio_cargolab(){
    var count1 = 1; count3 = 1; count4 = 1;

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
    var count2 = 1
    var filasActivi = $("#container_actividades .actividad table tbody");
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
    //DATOS PARA GUARDAR EN TABLA SERVICIO
    var arrayDatosServicio = [];
    var num_cuadrilla_servicio = $("#txt_num_cuadrilla").val();
    var porcen_depre_servicio = $("#txt_porcen_depre").val();
    if(num_cuadrilla_servicio != ""){
        if(porcen_depre_servicio != ""){
            var filaDataServicio = [num_cuadrilla_servicio, porcen_depre_servicio];
            arrayDatosServicio.push(filaDataServicio);
            var resultDataActividad = get_actividad_campos();
            if(resultDataActividad != false){
                var resultCargoslaborales = get_tablas_cargoslaborales();
                if(resultCargoslaborales != "invalid") {
                    //Datos dentro de otro array
                    var Data1 = [];
                    Data1.push(arrayDatosServicio);
                    var Data2 = [];
                    Data2.push(resultDataActividad);

                    var values = {
                        "servicio": Data1,
                        "actividades": Data2,
                        "cargoslaborales": resultCargoslaborales
                    }

                    $.ajax({
                        method: "POST",
                        url: "/servicios/register",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(values),
                        success: function resultado(valor) {
                            if(valor == ""){
                                alert("Servicio Registrado Correctamente");
                            }
                        },
                        error: function errores(msg) {

                        }
                    });
                }
            }
        }
        else{
            alert("Ingrese porcentaje de depreciacion");
            $("#txt_porcen_depre").focus();
            return false;
        }
    }
    else{
        alert("Ingrese número de cuadrillas");
        $("#txt_num_cuadrilla").focus();
        return false;
    }
    //DATOS PARA GUARDAR EN TABLA SERVICIO
}

function get_actividad_campos(){
    //DATOS PARA GUARDAR EN TABLA ACTIVIDAD
    var arrayDatosActividad = [];
    var valido_state_DatosActividad;
    $("#container_actividades .actividad").each(function() {
        if (valido_state_DatosActividad == "invalid") {
            return false;
        }
        else {
            var filaData = [];
            $(this).find(".data-control").each(function (index) {
                var val = $(this).val();
                if (index == 0) {
                    if (val == "") {
                        alert("Ingrese nombre de Actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        arrayDatosActividad = [];
                        return false;
                    }
                    else {
                        valido_state_DatosActividad = "valid";
                    }
                }
                filaData[index] = val;
            });
        }
        arrayDatosActividad.push(filaData);
    });
    return arrayDatosActividad;
    //DATOS PARA GUARDAR EN TABLA ACTIVIDAD
}

function get_tablas_cargoslaborales(){
    var arrayConjunto_TablaCL = [];
    //DATOS PARA GUARDAR EN TABLA CARGO LABORAL
    var sV; var cV; var tV;
    var valido_ingresados = true;
    //FOR1
    $("#container_actividades .actividad").each(function(){
        if(valido_ingresados == false){
            return false;
        }
        else {
            var array_TablaCL = [];
            $(this).find("table tbody tr").each(function () {
                if (valido_ingresados == false) {
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
                        if (index == 0) {
                            value = $(this).find(".select_actividad_cargolab").val();
                            if (value == null) {
                                sV = true;
                                alert("Seleccione un cargo laboral.");
                                $(this).focus();
                                valido_ingresados = false
                                return false;
                            }
                        }
                        if (index == 1) {
                            element =  $(this).children(":first-child");
                            value = element.val();
                            if (value == "") {
                                cV = true;
                                alert("Ingrese una cantidad válida.");
                                element.focus();
                                valido_ingresados = false
                                return false;
                            }
                        }
                        if (index == 2) {
                            element = $(this).children(":first-child");
                            value = element.val();
                            if (value == "") {
                                tV = true;
                                alert("Ingrese un tiempo (Horas) válido.");
                                element.focus();
                                valido_ingresados = false
                                return false;
                            }
                        }
                        array_filaTablaCL[index] = value;
                    });
                    if (sV == false && cV == false && tV == false) {
                        array_TablaCL.push(array_filaTablaCL);
                    }
                }
            });
            if(valido_ingresados == true) {
                arrayConjunto_TablaCL.push(array_TablaCL);
            }
            else{
                arrayConjunto_TablaCL = [];
            }
        }
    });
    if(valido_ingresados == true) {
        return arrayConjunto_TablaCL;
    }
    else{
        return "invalid" ;
    }
    //DATOS PARA GUARDAR EN TABLA CARGO LABORAL
}




