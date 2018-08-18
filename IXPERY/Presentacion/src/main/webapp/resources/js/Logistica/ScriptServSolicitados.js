var JSONobjServSolic;
var tipOpSerSoli=0;//0-.guardar; 1:update
var sServSolici=0;
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUE
var idRowServSol="";
var rowObjOutServSol = {};
var jsonGuardarFullServSol = {};
var arrGuardarservsolic = [];
var arrProEditServSol = [];

var arrGuardarFinservsolic = [];

var rowPreRegEquiObjOut = {};


function eliminarObjetosDuplicados(arr, prop) {
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

function InsUpdDelservsolic() {
    $('tbody#tbody_servsolic').find('tr[class=servsolic-insert]').each(function(){
        let objFilaProSol = {};
        objFilaProSol.sso1=0;
        objFilaProSol.sso3=$(this).find("td div input[id = txt_servsolic_nombre]").val();
        objFilaProSol.sso4="1";
        arrGuardarFinservsolic.push(objFilaProSol);
    });

    jsonGuardarFullServSol.sso=arrGuardarFinservsolic;//TPRODSOL

    console.log("Json A Guardar");
    console.log(jsonGuardarFullServSol);

    $.ajax({
        method: "POST",
        url: "/servsolic/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullServSol),
        success: function resultado(valor) {
            if (valor == "") {
                limpiarInsUpdTot();

            }
            else {
                console.log("Entro en ELSE");
                // alert(valor);
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

var conta_filas_servsolic=1;
var dollyRowservsolic = '';
dollyRowservsolic+= '<tr class="servsolic-insert">';
dollyRowservsolic+= '<td><div><p class="text-center" id="p_servsolic_num"></p></div></td>';
dollyRowservsolic+= '<td><div><input type="text" id="txt_servsolic_nombre" class="form-control"/></div></td>';
dollyRowservsolic+= '<td><div style="width: 170px"><select name="cmb_servsolic_estado" class="custom-select"><option value="1">Habilitado</option><option value="0">Deshabilitado</option></select></div></td>';
dollyRowservsolic+= '<td hidden><div><span id="spn_servsolic_idservsolic"></span></div></td>';
dollyRowservsolic+= '<td><div class="text-center"><button type="button"><i class="icon-cross icon-hp-desh"></i></button></div></td>';
dollyRowservsolic+= '</tr>';

var dollyRowservsolicHTML = $.parseHTML(dollyRowservsolic);

var rowCloneservsolic;

$(document).ready(function () {
    rowCloneservsolic =$(dollyRowservsolicHTML).clone().prop({id:'row-servsolic-' + conta_filas_servsolic});
    rowCloneservsolic.find('p').html(1);
    $('table #tbody_equipo').html(rowCloneservsolic);
    let serv;
    let esta;

    $('#servsolic_1 tbody')
        .on('focusin', 'tr[class=servsolic-edit]', function () {
            idRowServSol = parseInt($(this).find('span[id = spn_servsolic_idservsolic]').html());
        })
        .on('focusout', 'tr[class=servsolic-edit]', function () {
            var objProEdit = {};
            serv = $(this).find('input[id = txt_servsolic_nombre]').val();
            esta = $(this).find('select').val();

            if(serv===null || serv===""){
                $(this).find('input[id = txt_servsolic_nombre]').focus();
                $(this).find('input[id = txt_servsolic_nombre]').addClass('is-invalid');
                $("#btn_servsolic_save").prop( "disabled", true );
            }else{
                $(this).find('input[id = txt_servsolic_nombre]').removeClass('is-invalid');
                rowObjOutServSol['sso1'] = idRowServSol;
                rowObjOutServSol['sso3'] = serv;
                rowObjOutServSol['sso4'] = esta;

                $.each(JSONobjServSolic.sso, function (obj, item) {
                    if(item.sso1===rowObjOutServSol.sso1){
                        objProEdit["sso1"] = rowObjOutServSol.sso1;

                        if(item.sso3!==rowObjOutServSol.sso3){
                            objProEdit["sso3"] = rowObjOutServSol.sso3;
                        }

                        if(item.sso4!==rowObjOutServSol.sso4){
                            objProEdit["sso4"] = rowObjOutServSol.sso4;
                        }

                        var countKeys = Object.keys(objProEdit).length;
                        if(countKeys > 1){
                            arrProEditServSol.push(objProEdit);
                            arrProEditServSol = eliminarObjetosDuplicados(arrProEditServSol, 'sso1');
                            arrGuardarFinservsolic = arrProEditServSol.slice();
                        }else{
                            arrProEditServSol.forEach(function(currentValue, index, arr){
                                if(arrProEditServSol[index].pso1===item.idprodsol){
                                    console.log("entré a eliminar");
                                    arrProEditServSol.splice(index,1);
                                    arrGuardarFinservsolic = arrProEditServSol.slice();
                                    return false;
                                }

                            })
                        }
                        return false;
                    }
                });
                $("#btn_servsolic_save").prop( "disabled", false );
            }


        });


});




//INICIO DE FUNCIONES PARA servsolicS REGISTRADOS
function addservsolics_servsolic(){
    if(tipOpSerSoli===1){
        $( "#tbody_servsolic" ).empty();
        tipOpSerSoli=0;
    }

    conta_filas_servsolic=$('table #tbody_servsolic tr').length;

    ++conta_filas_servsolic;

    let rowCloneservsolic=$(dollyRowservsolicHTML).clone().prop({id:'row-servsolic-' + conta_filas_servsolic});
    rowCloneservsolic.find('p').html(conta_filas_servsolic);
    $('table #tbody_servsolic').append(rowCloneservsolic);

    $('table #tbody_servsolic').find('button').each(function () {
        $(this).on('click', function () {
            let rRowPro = 1;
            $(this).closest('tr').remove();
            var obj = $('table #tbody_servsolic tr');

            $(obj).each(function () {
                $(this).attr("id","row-servsolic-"+rRowPro);
                $(this).find('p[id=p_servsolic_num]').html(rRowPro);
                ++rRowPro;
            });
        });
    });
}





function confirBusc(){
    conta_filas_servsolic=0;
    $( "#tbody_servsolic" ).empty();
    let bus=$("#txt_servsolic_busnom").val();
    $.ajax({
        method: "POST",
        url: "/servsolic/buservsolic",
        data: {"bus":bus},
        success: function resultado(valor) {
            JSONobjServSolic = JSON.parse(valor);
            console.log(JSONobjServSolic);
            if(valor==="0") {
                alert("No se Encontraron Resultados");

            }else{
                tipOpSerSoli=1;
                $.each(JSONobjServSolic.sso, function (obj, item) {
                    conta_filas_servsolic++;
                    let opcHabil;
                    if(item.sso3==="0"){
                        opcHabil="<option value='0' selected>Deshabilitado</option><option value='1'>Habilitado</option>";
                    }else{
                        opcHabil="<option value='1' selected>Habilitado</option><option value='0'>Deshabilitado</option>";
                    }
                    $("#servsolic_1 tbody").append(
                        "<tr id='row-servsolic-"+conta_filas_servsolic+"' class='servsolic-edit'>"+
                        "<td><div><p class='text-center' id='p_servsolic_num'>"+conta_filas_servsolic+"</p></div></td>"+
                        "<td><div><input type='text' id='txt_servsolic_nombre' class='form-control' value='"+item.sso3+"'/></div></td>"+
                        "<td><div style='width: 170px'><select name='cmb_servsolic_estado' class='custom-select'>"+opcHabil+"</select></div></td>"+
                        "<td hidden><div><span id='spn_servsolic_idservsolic'>"+item.sso1+"</span></div></td>"+
                        "</tr>"
                    );
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function buscar_servsolic(){
    conta_filas_servsolic=$('table #tbody_servsolic tr').length;
    tipOpSerSoli=1;
    if($('table #tbody_servsolic tr').hasClass('servsolic-insert')){
        let rpta=confirm("Tiene Datos por guardar: desea guardarlos?");
        if(rpta){
            InsUpdDelservsolic();
        }else{
            confirBusc();
        }
    }else{
       confirBusc();
    }

}

function limpiarInsUpdTot(){
    idRowServSol="";
    rowObjOutServSol = {};

    jsonGuardarFullServSol = {};
    arrGuardarservsolic = [];
    arrGuardarPreRegEq = [];
    arrProEditServSol = [];
    arrProEditNoRegEq = [];

    arrGuardarFinservsolic = [];
    arrGuardarFinPreRegEq = [];

    idRowPreRegEq="";
    rowPreRegEquiObjOut = {};




    arrayDatos_extras=[];
    arrayDatos_re=[];
    arrayDatos_nr=[];

    arrayData_completo={};
}


function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}
