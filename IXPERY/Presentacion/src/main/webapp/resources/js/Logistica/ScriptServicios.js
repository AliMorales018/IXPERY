var cont_actividades_tabla;
var cont_select_cargolaboral = 1;
var array_personal_transito = [];
var JsonObjectItems2;
//Variable para enviar las tabla con registros editado , insertados y dados de baja.
var jsonGuardarFullItem2 = {};
//Array de Tabla Servicio
var arrayGuardarServicio = [];
//Array de Tabla de Personal en tránsito
var arrayEditPersTran = [];
var arrayGuardarPersTran = [];
//Array de Tabla Actividad
var idActividadItemTwo;
var arrayEditActividad = [];
var arrayGuardarActividad = [];
//Array de Tabla Actividad - CargoLaboral
var idActividadCargoItemTwo;
var arrayEditActividadCL = [];
var arrayGuardarActividadCL = [];

function addActividad(){
    cont_actividades_tabla++;
    $('#container_actividades')
        .append(
            "<div id='actividad_"+cont_actividades_tabla+"' class='actividad grid-container insert-actividad'>"+
                "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                    "<div class='cell large-12'>"+
                       "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad "+cont_actividades_tabla+"</b><i id='delete_actividad_"+cont_actividades_tabla+"' onclick='eliminar_contenedor_actividad(this);' class='icon-minus-row-service icon-minus2 delete_actividad'></i></label>"+
                    "</div>"+
                "</div>"+
                    "<div class='grid-x grid-padding-x'>"+
                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input type='text' class='data-control form-control' type='text' placeholder='Nombre de actividad'></div></div>"+
                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input class='data-control form-control' type='text'  placeholder='Descripcion'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input class='data-control form-control' type='number' placeholder='Cantidad'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input class='data-control form-control' type='number' placeholder='Riesgo'></div></div>"+
                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><input class='data-control form-control' type='number' placeholder='Adicionales'></div></div>"+
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
                                "<tr id='actividad_"+cont_actividades_tabla+"_fila_1' class='insert-actividadcl'>"+
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
        "<tr id='"+Actividad[1]+"_fila_"+childs+"' class='insert-actividadcl'>"+
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
        let nameClass = $("#actividad_"+idActividad[1]).hasClass("insert-actividad");
        if(nameClass){
            eliminarseccion_actividad(idActividad);
        }
        else{
            let r = confirm("¿Está seguro de eliminar esta actividad?");
            if (r == true) {
                let idActiv = parseInt($("#actividad_"+idActividad[1]).find("input[class = id]").val());
                let ObjEditAct = {};
                let encontrado = false;
                if(arrayEditActividad.length >= 1){
                    for(let i = 0; i < arrayEditActividad.length ; i++){
                        if(arrayEditActividad[i].act1 === idActiv){
                            arrayEditActividad[i].act11 = "0";
                            encontrado = true;
                            break;
                        }
                    }
                    if(encontrado !== true){
                        ObjEditAct.act1 = idActiv;
                        ObjEditAct.act11 = "0";
                        arrayEditActividad.push(ObjEditAct);
                        arrayGuardarActividad = arrayEditActividad.slice();
                    }
                }
                else{
                    ObjEditAct.act1 = idActiv;
                    ObjEditAct.act11 = "0";
                    arrayEditActividad.push(ObjEditAct);
                    arrayGuardarActividad = arrayEditActividad.slice();
                }
                eliminarseccion_actividad(idActividad);
            }
        }
    }
}

function eliminarseccion_actividad(idActividad){
    //Regenerar tabla de personal en tránsito
    $("#actividad_"+idActividad[1]+" table tbody tr select").each(function(){
        if($(this).val() !== null){
            editar_arrayPT($(this).val());
            let idCargo = parseInt($(this).closest("tr").find("input[class = idActividadCargo]").val());
            editEstadoCargoLab(idCargo);
        }
    });
    $("#actividad_"+idActividad[1]).remove();
    cont_actividades_tabla = cont_actividades_tabla - 1;
    reordenar_num_actividad();
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
    if(childs > 1) {
        let nameClass = $("#"+id).closest("tr").hasClass("insert-actividadcl");
        if(nameClass){
            delete_reg_cargolab(object,splitId);
        }
        else {
            let r = confirm("¿Está seguro de eliminar este cargo laboral?");
            if (r == true) {
                let idActCL = parseInt(object.find("input[class = idActividadCargo]").val());
                editEstadoCargoLab(idActCL);
                delete_reg_cargolab(object,splitId);
            }
        }
    }
}

function editEstadoCargoLab(idActCL) {
    let ObjEditActCL = {};
    let encontrado = false;
    if(arrayEditActividadCL.length >= 1){
        for(let i = 0; i < arrayEditActividadCL.length; i++){
            if(arrayEditActividadCL[i].acc1 === idActCL){
                arrayEditActividadCL[i].acc10 = "0";
                encontrado = true;
                break;
            }
        }
        if(encontrado !== true){
            ObjEditActCL.acc1 = idActCL;
            ObjEditActCL.acc10 = "0";
            arrayEditActividadCL.push(ObjEditActCL);
            arrayGuardarActividadCL = arrayEditActividadCL.slice();
        }
    }
    else{
        ObjEditActCL.acc1 = idActCL;
        ObjEditActCL.acc10 = "0";
        arrayEditActividadCL.push(ObjEditActCL);
        arrayGuardarActividadCL = arrayEditActividadCL.slice();
    }
}

function delete_reg_cargolab(object,splitId){
    //Editamos tabla personal en tránsito
    let valueSelect = object.find(".select_actividad_cargolab").val();
    if (valueSelect !== null) {
        editar_arrayPT(valueSelect);
        agregarfila_personaltransito();
    }
    object.remove();
    reordernar_num_tabla_cargolab(splitId[0]);
    Reordenar_filas_tabla_cargolaboral();
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
            if ($("#txt_porcen_depre").val() !== "") {
                var objFilaPreReg = {};
                objFilaPreReg.ser1 = 0;
                if($("#txt_porcen_depre").hasClass("insert-servicio")){
                    let objForSolucion = {};
                    objForSolucion.sol1 = parseInt($("#select_solucion_servicio_cl").val());
                    objFilaPreReg.ser2 = objForSolucion;
                    objFilaPreReg.ser7 = parseInt($("#txt_porcen_depre").val());
                    objFilaPreReg.ser10 = "1";
                }
                var resultDataActividad = get_actividad_campos();
                if (resultDataActividad !== "invalid") {
                    var resultCargoslaborales = get_tablas_cargoslaborales();
                    if (resultCargoslaborales !== "invalid") {
                        var resultPersonalTra = get_data_personaltransito();
                        if (resultPersonalTra !== "invalid") {
                            //Tabla Servicio
                            if(Object.keys(objFilaPreReg).length > 1){
                                arrayGuardarServicio.push(objFilaPreReg);
                            }
                            //Tabla Actividad
                            for(let i = 0; i < resultDataActividad.length; i++){
                                arrayGuardarActividad.push(resultDataActividad[i]);
                            }
                            //Tabla ActividadCargo
                            for(let i = 0; i < resultCargoslaborales.length; i++){
                                arrayGuardarActividadCL.push(resultCargoslaborales[i]);
                            }
                            if(arrayGuardarServicio.length > 0){
                                jsonGuardarFullItem2.ser = arrayGuardarServicio;
                            }
                            if(arrayGuardarActividad.length > 0){
                                jsonGuardarFullItem2.act = arrayGuardarActividad;
                            }
                            if(arrayGuardarActividadCL.length > 0){
                                jsonGuardarFullItem2.acc = arrayGuardarActividadCL;
                            }
                            //LOGICA DE PERSONAL DE TRANSITO
                            let encontradoPT = false;
                            for(let i = 0; i < array_personal_transito.length; i++){
                                //console.log("Entro "+i);
                                if(JsonObjectItems2.items.length > 1) {
                                    //console.log("Entro mayor a 0")
                                    $.each(JsonObjectItems2.items[2].PERSONALTRANSITO, function (index, item) {
                                        if (parseInt(array_personal_transito[i][0]) === item.idcargo) {
                                            //console.log("Encontrado");
                                            encontradoPT = true;
                                            //Verificar si hubo cambios
                                            //Cantidad
                                            let ObjPersonalTransito = {};
                                            ObjPersonalTransito.pet1 = item.idperstran;
                                            if (array_personal_transito[i][3] !== item.cantidad) {
                                                ObjPersonalTransito.pet4 = array_personal_transito[i][3];
                                            }
                                            //Diaspago
                                            if (array_personal_transito[i][4] !== item.diaspago) {
                                                ObjPersonalTransito.pet5 = array_personal_transito[i][4];
                                            }
                                            //Contador
                                            if (array_personal_transito[i][2] !== item.contador) {
                                                ObjPersonalTransito.pet11 = array_personal_transito[i][2];
                                            }
                                            if (Object.keys(ObjPersonalTransito).length > 1) {
                                                arrayGuardarPersTran.push(ObjPersonalTransito);
                                            }
                                            return false;
                                        }
                                    });
                                }
                                if(encontradoPT === false){
                                    //console.log("No encontrado");
                                    let idServicio = JsonObjectItems2.items.length > 1 ?  JsonObjectItems2.items[0].SERVICIO[0].idservicio : 0;
                                    arrayGuardarPersTran.push({pet1: 0, pet2: {ser1: idServicio}, pet3: array_personal_transito[i][1], pet4: array_personal_transito[i][3], pet5: array_personal_transito[i][4], pet10: {cal1: parseInt(array_personal_transito[i][0])}, pet11: array_personal_transito[i][2], pet12: "1"});
                                }
                                encontradoPT = false;
                            };
                            //Eliminados Personal de Transito
                            let encontradoBDPT = false;
                            if(JsonObjectItems2.items.length > 1) {
                                $.each(JsonObjectItems2.items[2].PERSONALTRANSITO, function (index, item) {
                                    for (let j = 0; j < array_personal_transito.length; j++) {
                                        if (item.idperstran === array_personal_transito[j][5]) {
                                            encontradoBDPT = true;
                                        }
                                    }
                                    if (encontradoBDPT === false) {
                                        arrayGuardarPersTran.push({pet1: item.idperstran, pet12: "0"});
                                    }
                                    encontradoBDPT = false;
                                });
                            }
                            if(arrayGuardarPersTran.length > 0){
                                jsonGuardarFullItem2.pet = arrayGuardarPersTran;
                            }
                            if(Object.keys(jsonGuardarFullItem2).length >= 1){
                                console.log(jsonGuardarFullItem2);
                                $("#btn_servicio_save").attr("disabled",true);
                                $.ajax({
                                    method: "POST",
                                    url: "/servicios/register",
                                    contentType: "application/json; charset=utf-8",
                                    data: JSON.stringify(jsonGuardarFullItem2),
                                    success: function resultado(valor) {
                                        if (valor == "") {
                                            alert("Servicio Registrado Correctamente");
                                            reiniciarvarServicio();
                                            BuscarSolucionServiciosCL($("#select_solucion_servicio_cl").val())
                                            $("#btn_servicio_save").removeAttr("disabled");
                                        }
                                        else{
                                            alert(valor);
                                        }
                                    },
                                    error: function errores(msg) {
                                    }
                                });
                            }else{
                                alert("No se detectaron cambios a guardar.");
                            }
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
    let keyActividad = -1;
    //DATOS PARA GUARDAR EN TABLA ACTIVIDAD
    var arrayDatosActividad = [];
    var valido_state_DatosActividad = "valid";
    $("#container_actividades .actividad").each(function() {
        if (valido_state_DatosActividad === "invalid") {
            return "invalid";
        }
        else {
            var objFilaActividad = {};
            var objForServicio = {};
            $(this).find(".data-control").each(function (index) {
                objFilaActividad.act1 = keyActividad;
                if(JsonObjectItems2.items.length > 1) {
                    objForServicio.ser1 = JsonObjectItems2.items[0].SERVICIO[0].idservicio;
                }
                else{
                    objForServicio.ser1 = 0;
                }
                objFilaActividad.act2 = objForServicio;
                var val = $(this).val();
                if (index === 0) {
                    if (val === "") {
                        alert("Ingrese nombre de actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                    else {
                        objFilaActividad.act3 = val;
                    }
                }
                if (index === 1) {
                    if (val === "") {
                        alert("Ingrese descripción de actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                    else{
                        objFilaActividad.act4 = val;
                    }
                }
                if (index === 2) {
                    if (val === "") {
                        alert("Ingrese cantidad requerida en la actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                    else{
                        objFilaActividad.act5 = parseInt(val);
                    }
                }
                if (index === 3) {
                    if (val === "") {
                        alert("Ingrese riesgo de la actividad");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                    else{
                        objFilaActividad.act6 = parseInt(val);
                    }
                }
                if (index === 4) {
                    if (val === "") {
                        alert("Ingrese adicionales.");
                        $(this).focus();
                        valido_state_DatosActividad = "invalid";
                        return false;
                    }
                    else{
                        objFilaActividad.act15 = parseInt(val);
                    }
                }
                objFilaActividad.act11 = "1";
            });
        }
        if($(this).hasClass("insert-actividad")){
            arrayDatosActividad.push(objFilaActividad);
        }
        keyActividad--;
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
    let keyForaneaActividad = -1;
    var arrayTablaCL = [];
    //DATOS PARA GUARDAR EN TABLA CARGO LABORAL
    var valido_ingresados = true;
    var stateEdit = false;
    var stateEditForanea = false;
    var idForActividad;
    //FOR1
    $("#container_actividades .actividad").each(function(){
        if(valido_ingresados === false){
            return false;
        }
        else {
            if($(this).hasClass("insert-actividad")){
                stateEditForanea = true;
            }else{
                idForActividad = parseInt($(this).find("input[class = id]").val());
            }
            $(this).find("table tbody tr").each(function () {
                if (valido_ingresados === false) {
                    return false;
                }
                else {
                    if($(this).hasClass("insert-actividadcl")){
                        stateEdit = true;
                    }
                    var objFilaTablaCL = {};
                    var objForIdActiv = {};
                    var objForIdCargo = {};
                    $(this).find("td .data-cargolab").each(function (index) {
                        if(stateEditForanea === true){
                            objForIdActiv.act1 = keyForaneaActividad;
                        }
                        else{
                            objForIdActiv.act1 = idForActividad;
                        }
                        objFilaTablaCL.acc2 = objForIdActiv;
                        var value;
                        var element;
                        if (index === 0) {
                            value = $(this).find(".select_actividad_cargolab").val();
                            if (value == null) {
                                alert("Seleccione un cargo laboral.");
                                $(this).focus();
                                valido_ingresados = false;
                                return false;
                            }
                            else{
                                objForIdCargo.cal1 = parseInt(value);
                                objFilaTablaCL.acc3 = objForIdCargo;
                                objFilaTablaCL.acc1 = 0;
                            }
                        }
                        if (index === 1) {
                            element =  $(this).children(":first-child");
                            value = element.val();
                            if (value === "") {
                                alert("Ingrese una cantidad válida del cargo laboral.");
                                element.focus();
                                valido_ingresados = false;
                                return false;
                            }
                            else{
                                objFilaTablaCL.acc4 = parseInt(value);
                            }
                        }
                        if (index === 2) {
                            element = $(this).children(":first-child");
                            value = element.val();
                            if (value === "") {
                                alert("Ingrese un número válida de días laborables.");
                                element.focus();
                                valido_ingresados = false;
                                return false;
                            }
                            else{
                                objFilaTablaCL.acc5 = parseInt(value);
                            }
                        }
                        objFilaTablaCL.acc10 = "1";
                    });
                }
                if(stateEdit === true){
                    arrayTablaCL.push(objFilaTablaCL);
                    stateEdit = false;
                }
            });
        }
        stateEditForanea = false;
        keyForaneaActividad--;
    });
    if(valido_ingresados === true) {
        return arrayTablaCL;
    }
    else{
        arrayTablaCL = [];
        return "invalid";
    }
}

function get_data_personaltransito(){
    var valido_state_DatosPersonalTra = "valid";
    $('#tbody_personal_transito tr').each(function () {
        if (valido_state_DatosPersonalTra === "invalid") {
            return "invalid";
        }
        else {
            var val;
            $(this).find(".data-personal").each(function (index) {
                if (index === 3) {
                    val = parseInt($(this).val());
                    if (isNaN(val) === true) {
                        alert("Ingrese una cantidad válida de personal en tránsito.");
                        $(this).focus();
                        valido_state_DatosPersonalTra = "invalid";
                        return false;
                    }
                }
                if (index === 4) {
                    val = parseInt($(this).val());
                    if (isNaN(val) === true) {
                        alert("Ingrese un número de dias de pago válido.");
                        $(this).focus();
                        valido_state_DatosPersonalTra = "invalid";
                        return false;
                    }
                }
            });
        }
    });
    if(valido_state_DatosPersonalTra === "valid") {
        return "valid";
    }
    else{
        return "invalid" ;
    }
}

function habilitarElements() {
    $("input").removeAttr("disabled");
    $("button").removeAttr("disabled");
    $("select").removeAttr("disabled");
}

function reiniciarvarServicio () {
    array_personal_transito = [];
    arrayEditActividad = [];
    arrayEditActividadCL = [];
    arrayEditPersTran = [];
    arrayGuardarServicio = [];
    arrayGuardarActividad = [];
    arrayGuardarActividadCL = [];
    arrayGuardarPersTran = [];
    jsonGuardarFullItem2 = {};
}

function focusPersonalTransito(){
    //Añadimos el evento a la tabla personal de tránsito
    $("#container_personal_transito table tbody").find("tr").on("focusin",function (){
    }).on("focusout",function () {
        let idCargo = $(this).find("span").eq(1).text();
        let cantidad = parseInt($(this).find("input").eq(0).val());
        let diasPago = parseInt($(this).find("input").eq(1).val());
        for (let i = 0; i < array_personal_transito.length; i++) {
            if (idCargo === array_personal_transito[i][0]) {
                array_personal_transito[i][3] = cantidad;
                array_personal_transito[i][4] = diasPago;
                break;
            }
        }
    });
}

function llenar_combo_solitem2(position){
    $('#select_solucion_servicio_cl').empty();
    //COMBO DE SOLUCION
    let data = {id:JsonObjectItems2.items[position].SOLUCION[0].idsol , text: JsonObjectItems2.items[position].SOLUCION[0].nomsol};
    let newOption = new Option(data.text, data.id, false, false);
    $('#select_solucion_servicio_cl').append(newOption).trigger('change');
}

function BuscarSolucionServiciosCL() {
        console.log("SERVICIOS");
        let id = "";
        $.ajax({
            method: "POST",
            async: false,
            url: "/solucion/VerificarSesionSolucion",
            success: function(valor) {
                console.log('valor');
                console.log(valor);
                id = valor;
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
        ++countss;

        $.ajax({
            method: "POST",
            url: "/servicios/verserviciosp",
            data: {"id":id},
            success: function resultado(valor) {
                JsonObjectItems2 = JSON.parse(valor);
                console.log(JsonObjectItems2);
                if (JsonObjectItems2.items.length > 1) {
                    cont_actividades_tabla = 0;
                    let elementsPT = "";
                    let JsonServicio = JsonObjectItems2.items[0].SERVICIO[0];
                    let countCL = 1;
                    let data;
                    console.log(JsonObjectItems2);

                    //Solucion
                    llenar_combo_solitem2(3);

                    //Removemos atributos disabled
                    habilitarElements();

                    //InicializamosArrays
                    reiniciarvarServicio();

                    //Tabla Servicio
                    $("#txt_porcen_depre").removeClass("insert-servicio");
                    $("#txt_porcen_depre").val(parseFloat(JsonServicio.porcentdepre));
                    $("#txt_idservicio").val(JsonServicio.idservicio);

                    //Tabla Personal de Tránsito
                    $.each(JsonObjectItems2.items[2].PERSONALTRANSITO, function (index, item) {
                        elementsPT += "<tr>" +
                                            "<td><p class='text-center' style='font-size:11px;'>" + (index + 1) + "</p></td>" +
                                            "<td style='display: none'><span class='data-personal'>" + item.idperstran + "</span></td>" +
                                            "<td style='display: none'><span class='data-personal'>" + item.idcargo + "</span></td>" +
                                            "<td><span class='data-personal'>" + item.cargolaboral + "</span></td>" +
                                            "<td><input type='number' placeholder='Cantidad' class='form-control data-personal' value='" + item.cantidad + "'/></td>" +
                                            "<td><input type='number' placeholder='Días pago' class='form-control data-personal' value='" + item.diaspago + "'/></td>" +
                                      "</tr>"
                        array_personal_transito.push([item.idcargo.toString(),item.cargolaboral,item.contador,item.cantidad,item.diaspago,parseInt(item.idperstran)]);
                    });

                    $("#tbody_personal_transito").html(elementsPT);

                    //Tabla Actividades
                    $("#container_actividades").empty();
                    $.each(JsonObjectItems2.items[1].ACTIVIDAD, function (index, item) {
                        cont_actividades_tabla++;
                        $("#container_actividades").append("<div id='actividad_"+cont_actividades_tabla+"' class='actividad grid-container'>"+
                                                                "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                                                                    "<div class='cell large-12'>"+
                                                                        "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad "+cont_actividades_tabla+"</b><i id='delete_actividad_"+cont_actividades_tabla+"' onclick='eliminar_contenedor_actividad(this);' class='icon-minus-row-service icon-minus2 delete_actividad'></i></label>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                                "<div class='grid-x grid-padding-x data-actividad-edit'>"+
                                                                    "<input class='id' style='display: none' value='"+item.idactividad+"'>"+
                                                                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><input class='data-control form-control' type='text' placeholder='Nombre de actividad' value='"+item.actividad+"'></div></div>"+
                                                                    "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><input class='data-control form-control' type='text'  placeholder='Descripcion' value='"+item.descripcion+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Cantidad:</b></label><input class='data-control form-control' type='number' placeholder='Cantidad' value='"+item.cantidad+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Riesgo:</b></label><input class='data-control form-control' type='number' placeholder='Riesgo' value='"+item.riesgo+"'></div></div>"+
                                                                    "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><input class='data-control form-control' type='number' placeholder='Adicionales' value='"+item.adicional+"'></div></div>"+
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
                                "<td style='display: none' ><input class='idActividadCargo' value='"+item.idactividadcargo+"'></td>"+
                                "<td><div><p class='text-center'>"+countCL+"</p></div></td>" +
                                "<td><div class='data-cargolab'><select id='selectcl_"+cont_select_cargolaboral+"' class='select_actividad_cargolab' style='width: 100%;'></select></div></td>" +
                                "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Cantidad' value='"+item.cantidad+"'/></div></td>" +
                                "<td><div class='data-cargolab'><input type='number' class='form-control' placeholder='Días laborables' value='"+item.diaslaboral+"'/></div></td>" +
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
                        //Añadimos el evento a las tablas de base de cargos laborales..
                        $("#actividad_"+cont_actividades_tabla+" tbody").find("tr").on("focusin",function () {
                            let idActividad = $(this).attr("id");
                            idActividad = idActividad.split("_fila_");
                            //Id Actividad
                            idActividadItemTwo = parseInt($("#"+idActividad[0]).find("input[class = id]").val());
                            //Id Actividad-Cargo
                            idActividadCargoItemTwo = parseInt($(this).find("input[class = idActividadCargo]").val());
                        }).on("focusout",function () {
                            let ObjEditActividadCargo = {};
                            let idCargoSelect = parseInt($(this).find(".data-cargolab").eq(0).children().val());
                            //console.log("ID CARGO: "+ idCargoSelect);
                            let cantidadCL = parseInt($(this).find(".data-cargolab").eq(1).children().val());
                            let diaslaborablesCL = parseInt($(this).find(".data-cargolab").eq(2).children().val());
                            $.each(JsonObjectItems2.items[1].ACTIVIDAD,function (index,item) {
                                if(item.idactividad === idActividadItemTwo){
                                    for(let i = 0; i < item.cargoslaborales.length; i++){
                                        if(item.cargoslaborales[i].idactividadcargo === idActividadCargoItemTwo){
                                            ObjEditActividadCargo["acc1"] = idActividadCargoItemTwo;
                                            //console.log("ID CARGO BBDD: "+item.cargoslaborales[i].idcargo);
                                            if(item.cargoslaborales[i].idcargo !== idCargoSelect){
                                                //console.log("Son diferentes");
                                                let ObjForCaL = {};
                                                ObjForCaL.cal1 = idCargoSelect;
                                                ObjEditActividadCargo["acc3"] = ObjForCaL;
                                            }
                                            if(item.cargoslaborales[i].cantidad !== cantidadCL){
                                                ObjEditActividadCargo["acc4"] = cantidadCL;
                                            }
                                            if(item.cargoslaborales[i].diaslaborables !== diaslaborablesCL){
                                                ObjEditActividadCargo["acc5"] = diaslaborablesCL;
                                            }
                                            let countKeys = Object.keys(ObjEditActividadCargo).length;
                                            if(countKeys > 1){
                                                arrayEditActividadCL.push(ObjEditActividadCargo);
                                                arrayEditActividadCL = eliminarObjetosDuplicadosItem2(arrayEditActividadCL, 'acc1');
                                                arrayGuardarActividadCL = arrayEditActividadCL.slice();
                                            }
                                            else{
                                                arrayEditActividadCL.forEach(function(currentValue, index, arr){
                                                    if(arrayEditActividadCL[index].acc1 === item.cargoslaborales[i].idactividadcargo){
                                                        arrayEditActividadCL.splice(index,1);
                                                        arrayGuardarActividadCL = arrayEditActividadCL.slice();
                                                        return false;
                                                    }
                                                });
                                            }
                                            break;
                                        }
                                    }
                                    return false;
                                }
                            });
                        });
                        //Añadimos el evento a las controles de actividad.
                        $("#actividad_"+cont_actividades_tabla).find(".data-actividad-edit").on("focusin",function () {
                            idActividadItemTwo = parseInt($(this).find("input[class = id]").val());
                        }).on("focusout",function () {
                            let ObjEditActividad = {};
                            let nomactividad = $(this).find(".data-control").eq(0).val();
                            let descripcion = $(this).find(".data-control").eq(1).val();
                            let cantidad = parseInt($(this).find(".data-control").eq(2).val());
                            let riesgo = parseInt($(this).find(".data-control").eq(3).val());
                            let adicionales = parseFloat($(this).find(".data-control").eq(4).val());
                            $.each(JsonObjectItems2.items[1].ACTIVIDAD, function (obj, item) {
                                if(idActividadItemTwo === item.idactividad){
                                    ObjEditActividad["act1"] = idActividadItemTwo;
                                    if(item.actividad !== nomactividad){
                                        ObjEditActividad["act3"] = nomactividad;
                                    }
                                    if(item.descripcion !== descripcion){
                                        ObjEditActividad["act4"] = descripcion;
                                    }
                                    if(item.cantidad !== cantidad){
                                        ObjEditActividad["act5"] = cantidad;
                                    }
                                    if(item.riesgo !== riesgo){
                                        ObjEditActividad["act6"] = riesgo;
                                    }
                                    if(item.adicional !== adicionales){
                                        ObjEditActividad["act15"] = adicionales;
                                    }
                                    let countKeys = Object.keys(ObjEditActividad).length;
                                    if(countKeys > 1){
                                        arrayEditActividad.push(ObjEditActividad);
                                        arrayEditActividad = eliminarObjetosDuplicadosItem2(arrayEditActividad, 'act1');
                                        arrayGuardarActividad = arrayEditActividad.slice();
                                    }
                                    else{
                                        arrayEditActividad.forEach(function(currentValue, index, arr){
                                            if(arrayEditActividad[index].act1===item.idactividad){
                                                arrayEditActividad.splice(index,1);
                                                arrayGuardarActividad = arrayEditActividad.slice();
                                                return false;
                                            }
                                        });
                                    }
                                    return false;
                                }
                            });
                        });
                    });
                    //Añadimos el evento a la tabla servicio
                    $("#txt_porcen_depre").on("focusin",function (){}).on("focusout",function () {
                        let objSer = {};
                        let value = parseFloat(JsonObjectItems2.items[0].SERVICIO[0].porcentaje_depreciacion) === parseFloat($(this).val());
                        if(!value){
                            objSer.ser1 = parseInt($("#txt_idservicio").val());
                            objSer.ser7 = parseFloat($(this).val());
                            arrayGuardarServicio.push(objSer);
                            arrayGuardarServicio = eliminarObjetosDuplicadosItem2(arrayGuardarServicio, 'ser1');
                        }
                        else{
                            arrayGuardarServicio.splice(0,1);
                        }
                    });
                    focusPersonalTransito();
                }
                else{
                    //Solucion
                    llenar_combo_solitem2(0);

                    cont_actividades_tabla = 1;
                    cont_select_cargolaboral = 2;
                    array_personal_transito = [];

                    //Removemos atributos disabled
                    habilitarElements();

                    //Tabla Servicio
                    $("#txt_porcen_depre").val("");
                    $("#txt_porcen_depre").off();
                    $("#txt_porcen_depre").addClass("insert-servicio");

                    //Personal de tránsito
                    $("#tbody_personal_transito").html("<tr><td colspan='5' class='text-center'><div style=\"padding: 4px; font-size: 10px\">Seleccione cargo laboral.</div></td></tr>")

                    //Tabla Actividades
                    $("#container_actividades").html(
                        "<div id='actividad_1' class='actividad grid-container insert-actividad'>"+
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
                                        "<tr id='actividad_1_fila_1' class='insert-actividadcl'>"+
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

function eliminarObjetosDuplicadosItem2(arr, prop) {
    var nuevoArray = [];
    var lookup  = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }

    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }

    return nuevoArray;
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
        array_personal_transito.push([id,cargo,1,0,0,0]);
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
        //contador,cantidad,diaspafo,idperstran
        array_personal_transito.push([idCargo, cargo,1,0,0,0]);
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
                    "<td style='display: none'><span class='data-personal'>"+array_personal_transito[i][5]+"</span></td>" +
                    "<td style='display: none'><span class='data-personal'>" + array_personal_transito[i][0] + "</span></td>" +
                    "<td><span class='data-personal'>" + array_personal_transito[i][1] + "</span></td>" +
                    "<td><input type='number' placeholder='Cantidad' class='form-control data-personal' value='"+cantidad+"'/></td>" +
                    "<td><input type='number' placeholder='Días pago' class='form-control data-personal' value='"+horas+"' /></td>" +
                "</tr>"
            );
        }
        //Colocamos el focus
        focusPersonalTransito();
    }
    else{
        obj.html("<tr><td colspan='5' class='text-center'><div style=\"padding: 4px; font-size: 10px\">Seleccione cargo laboral.</div></td></tr>");
    }
}