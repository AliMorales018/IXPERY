var JSONobjGeneralOtSer;
var sSolucionOtSer=0;
var estadoVacio;
var estOperaOtSer=0;//0: guardar simple//1:updatetotal(sav-updt-del)
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUE
var idRowServSol="";
// var rowEquiObjIn = {};
var rowOtroServObjOut = {};
// var arrProdSolEq = [];
// var arrProdNoRegSol = [];
var jsonGuardarFullOtroServ = {};
var arrGuardarOtroServ = [];
var arrGuardarPreRegServ = [];
var arrSoliEditSer = [];
var arrServEditNoRegSer = [];

var arrGuardarFinOtroServ = [];
var arrGuardarFinPreRegServ = [];


var idRowPreRegServ="";
// var rowPreRegEquiObjIn = {};
var rowPreRegOtSObjOut = {};

function VerEstaGuardaItem3(){
    if(estOperaOtSer===0){
        RegistrarOtro_servicio();
    }else if(estOperaOtSer===1){
        InsUpdDelOtroServ();
    }
}
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

function InsUpdDelOtroServ() {
    let xd=0;
    let filaEdit=0;
    $('tbody#tbody_otroservinr').find('tr[class=otroservinr-edit]').each(function() {
        filaEdit++;
        if ($(this).find('input[type=checkbox]').is(':checked')) {
            xd++;
            let objJsonDel = {};
            $(this).closest('tr').find('span[id=spn_otroservinr_idpreg]').each(function () {
                objJsonDel.prs1 = parseInt($(this).html());
                objJsonDel.prs6 = "0";
            });
            arrGuardarPreRegServ.push(objJsonDel);
            console.log("ELIMINAR");
            console.log(arrGuardarPreRegServ);
        }
    });
    $('tbody#tbody_otroservinr').find('tr[class=otroservinr-insert]').each(function () {
        let objFilaPreReg = {};
        let objServSolu= {};
        let objFilaProSolPre = {};
        let objOtroServ={};
        let objServSoli={};
        let objPreReg={};

        //PRE-REGISTRO SERVICIO
        objServSolu.ssl1=0;//foránea Serv solución

        objFilaPreReg.prs1=0;
        objFilaPreReg.prs3=objServSolu;
        objFilaPreReg.prs4=$(this).find("input[id = txt_otroservinr_nomserv]").val();
        objFilaPreReg.prs5=$(this).find("input[id = txt_otroservinr_canpro]").val();
        objFilaPreReg.prs6="1";
        objFilaPreReg.prs9=$(this).find("input[id = txt_otroservinr_desserv]").val();

        arrGuardarFinPreRegServ.push(objFilaPreReg);

        //REGISTRO SERVICIO SOLUCIÓN

        objOtroServ.ose1=parseInt($("label#lbl_otroservi_idotroserv").html());//foránea otro servi
        objServSoli.sso1= 0;

        objPreReg.prs1=0;//foránea pre-registro servicio

        objFilaProSolPre.ssl1=0;
        objFilaProSolPre.ssl2=objOtroServ;//objeto foránea equipo
        objFilaProSolPre.ssl4= $(this).find("input[id = txt_otroservinr_nomserv]").val();
        objFilaProSolPre.ssl5= $(this).find("input[id = txt_otroservinr_desserv]").val();
        objFilaProSolPre.ssl6= $(this).find("input[id = txt_otroservinr_canpro]").val();
        objFilaProSolPre.ssl9="1";
        //objFilaProSolPre.pso11=objServSoli;
        objFilaProSolPre.ssl13="1";
        objFilaProSolPre.ssl15=objPreReg;
        arrGuardarFinOtroServ.push(objFilaProSolPre);
    });


    $('tbody#tbody_otroservi').find('tr[class=otroservi-edit]').each(function(){
        console.log("Fila");
        if($(this).find('input[type=checkbox]').is(':checked')) {
            let objJsonDel = {};
            $(this).closest('tr').find('span[id=spn_otroservi_idservsolu]').each(function(){
                objJsonDel.ssl1 = parseInt($(this).html());
                objJsonDel.ssl9 = "0";
            });
            arrGuardarOtroServ.push(objJsonDel);
            console.log("ELIMINAR");
            console.log(arrGuardarOtroServ);
        }else{

        }
    }).closest('tbody').find('tr[class=otroservi-insert]').each(function () {
        let objFilaProSol = {};

        let objEqu= {};
        let objServSoli={};
        //let objPreReg= {};


        let data = $(this).find("td div select[name = cmb_otroservi_nombre]").select2('data');
        let nom="";
        if($(this).find("td div select[name ^= cmb_otroservi_nombre]").val()>0){
            nom=data[0].serviciosolicitado;

            //REGISTRO PRODUCTO SOLUCIÓN
            objEqu.ose1=$("label#lbl_otroservi_idotroserv").text();//foránea otro servi;
            objServSoli.sso1=parseInt($(this).find("td div span[id = spn_otroservi_idservsoli]").html());
            //objPreReg.prp1=0;//foránea pre-registro producto

            objFilaProSol.ssl1=0;
            objFilaProSol.ssl2=objEqu;//objeto foránea equipo

            objFilaProSol.ssl4= nom;
            objFilaProSol.ssl5= $(this).find("td div input[id = txt_otroservi_descri]").val();
            objFilaProSol.ssl6= $(this).find("td div input[id = txt_otroservi_cantid]").val();

            objFilaProSol.ssl9="1";
            objFilaProSol.ssl12=objServSoli;
            objFilaProSol.ssl13="1";
            //objFilaProSol.pso14=objPreReg;
            //arrProdSolEq.push(objFilaProSol);
            arrGuardarFinOtroServ.push(objFilaProSol);
            estadoVacio=1;
        }else{
            estadoVacio=0;
        }
    });

    $.merge(arrGuardarFinOtroServ,arrGuardarOtroServ);
    $.merge(arrGuardarFinPreRegServ,arrGuardarPreRegServ);

    jsonGuardarFullOtroServ.ssl=arrGuardarFinOtroServ;//TSERVSOLU
    jsonGuardarFullOtroServ.prs=arrGuardarFinPreRegServ;//TPREREGSERV


    console.log("Json A GuardarFULLLL");
    console.log(jsonGuardarFullOtroServ);


    $.ajax({
        method: "POST",
        url: "/otroservi/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullOtroServ),
        success: function resultado(valor) {
            if (valor == "") {
                alert('Los datos fueron guardados correctamente.');
                var sid=sSolucionOtSer;
                BuscarSolucionOtroServis(sid);
                limpiarInsUpdTotServi();
            }
            else {
                alert('Error en la red. No se guardaron los cambios.');
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

var conta_filas_otroservi=1;
var dollyRowOtroServicio = '';
dollyRowOtroServicio+= '<tr class="otroservi-insert">';
dollyRowOtroServicio+= '<td><div><p class="text-center" id="p_otroservi_num"></p></div></td>';
dollyRowOtroServicio+= '<td><div style="width: 170px"><select name="cmb_otroservi_nombre" class="select_otroservi_otroservis"></select></div></td>';
dollyRowOtroServicio+= '<td><div><input type="text" id="txt_otroservi_descri" class="form-control"/></div></td>';
dollyRowOtroServicio+= '<td><div><input type="text" id="txt_otroservi_cantid" class="form-control"/></div></td>';
dollyRowOtroServicio+= '<td hidden><div><span id="spn_otroservi_idservsoli"></span></div></td>';
dollyRowOtroServicio+= '<td hidden><div><span id="spn_otroservi_idservsolu"></span></div></td>';
dollyRowOtroServicio+= '<td><div class="text-center"><button type="button"><i class="icon-cross icon-hp-desh"></i></button></div></td>';
dollyRowOtroServicio+= '</tr>';

var dollyRowOtroServicioHTML = $.parseHTML(dollyRowOtroServicio);

var rowCloneOtroServicio;

$(document).ready(function () {
    $("#selectEmpresaOtroServi_Proyecto").select2({
        ajax: {
            url: "/equipo/busempresa",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                console.log(data.items);
                return {
                    results: data.items
                };
            },
            cache: true
        },
        placeholder: 'Buscar por empresa o solución . . .',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
        templateResult: formatRepoOtroServ,
        templateSelection: formatRepoSelectionOtroServ
    });
    rowCloneOtroServicio =$(dollyRowOtroServicioHTML).clone().prop({id:'row-otroservi-' + conta_filas_otroservi});
    rowCloneOtroServicio.find('p').html(1);

    $('table #tbody_otroservi')
        .html(rowCloneOtroServicio).find('tr:last-child')
        .find('select[name=cmb_otroservi_nombre]').attr('onchange','selCmbServ(1)')
        .select2({
            ajax: {
                url: "/otroservi/buservsolic",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por servicio . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoServSolic,
            templateSelection: formatRepoSelectionServSolic
        });


    let idServSoli;
    let canServSoli;
    let desServSoli;

    let estadoCanServReg;
    let estadoDesServReg;

    $('#otroservi_1 tbody')
        .on('focusin', 'tr[class=otroservi-edit]', function () {
            idRowServSol = parseInt($(this).find('span[id = spn_otroservi_idservsolu]').html());
        })
        .on('focusout', 'tr[class=otroservi-edit]', function () {
            var objProEdit = {};
            idServSoli = parseInt($(this).find('span[id = spn_otroservi_idservsoli]').html());
            desServSoli = $(this).find('input[id = txt_otroservi_descri]').val();
            canServSoli = parseInt($(this).find('input[id = txt_otroservi_cantid]').val());

            if(canServSoli===null || canServSoli==="" || canServSoli===0 || isNaN(canServSoli)){
                $(this).find('input[id = txt_otroservi_cantid]').focus();
                $(this).find('input[id = txt_otroservi_cantid]').addClass('is-invalid');
                estadoCanServReg=0;
                $("#btn_otroservi_save").prop( "disabled", true );
            }else{
                estadoCanServReg=1;
                $(this).find('input[id = txt_otroservi_cantid]').removeClass('is-invalid');

                if(desServSoli===""){
                    $(this).find('input[id = txt_otroservi_descri]').focus();
                    $(this).find('input[id = txt_otroservi_descri]').addClass('is-invalid');
                    estadoDesServReg=0;
                    $("#btn_otroservi_save").prop( "disabled", true );
                }else{
                    estadoDesServReg=1;
                    $(this).find('input[id = txt_otroservi_descri]').removeClass('is-invalid');
                    $("#btn_otroservi_save").prop( "disabled", false );
                }
            }

            if(estadoCanServReg===1 && estadoDesServReg===1){
                rowOtroServObjOut['ssl1'] = idRowServSol;
                rowOtroServObjOut['ssl12'] = idServSoli;
                rowOtroServObjOut['ssl5'] = desServSoli;
                rowOtroServObjOut['ssl6'] = canServSoli;

                $.each(JSONobjGeneralOtSer.items[1].items2, function (obj, item) {
                    if(item.idservicsolu===rowOtroServObjOut.ssl1){
                        objProEdit["ssl1"] = rowOtroServObjOut.ssl1;

                        if(item.idservsol!==rowOtroServObjOut.ssl12){
                            objProEdit["ssl12"] = rowOtroServObjOut.ssl12;
                        }
                        if(item.descripcion!==rowOtroServObjOut.ssl5){
                            objProEdit["ssl5"] = rowOtroServObjOut.ssl5;
                        }
                        if(item.cantidad!==rowOtroServObjOut.ssl6){
                            objProEdit["ssl6"] = rowOtroServObjOut.ssl6;
                        }

                        var countKeys = Object.keys(objProEdit).length;
                        if(countKeys > 1){
                            arrSoliEditSer.push(objProEdit);
                            arrSoliEditSer = eliminarObjetosDuplicados(arrSoliEditSer, 'ssl1');
                            arrGuardarOtroServ = arrSoliEditSer.slice();
                        }else{
                            arrSoliEditSer.forEach(function(currentValue, index, arr){
                                /*                            console.log("entré al for");
                                                            console.log("ARRAY INDEX: "+arrSoliEditSer[index].pso1);
                                                            console.log("ARRAY IDROWSOL: "+idRowServSol);*/
                                if(arrSoliEditSer[index].ssl1===item.idservicsolu){
                                    console.log("entré a eliminar");
                                    arrSoliEditSer.splice(index,1);
                                    arrGuardarOtroServ = arrSoliEditSer.slice();
                                    return false;
                                }

                            })
                        }
                        return false;
                    }
                });
            }
        });


    let nomServOtroSerReg;
    let desServOtroSerReg;
    let canServOtroSerReg;

    let estadoNomServOtroSerReg;
    let estadoDesServOtroSerReg;
    let estadoCanServOtroSerReg;

    $('#otroservinr_1 tbody')
        .on('focusin', 'tr[class=otroservinr-edit]', function () {
            idRowPreRegServ = parseInt($(this).find('span[id = spn_otroservinr_idpreg]').html());
        })
        .on('focusout', 'tr[class=otroservinr-edit]', function () {
            let objProEdit = {};
            nomServOtroSerReg = $(this).find('input[id = txt_otroservinr_nomserv]').val();
            desServOtroSerReg = $(this).find('input[id = txt_otroservinr_desserv]').val();
            canServOtroSerReg = parseInt($(this).find('input[id = txt_otroservinr_canpro]').val());

            console.log("nomServOtroSerReg: "+nomServOtroSerReg);
            console.log("desServOtroSerReg: "+desServOtroSerReg);
            console.log("canServOtroSerReg: "+canServOtroSerReg);
            console.log("///////////////////////////");
            console.log("///////////////////////////");

            if(nomServOtroSerReg==="") {
                $(this).find('input[id = txt_otroservinr_nomserv]').focus();
                $(this).find('input[id = txt_otroservinr_nomserv]').addClass('is-invalid');
                estadoNomServOtroSerReg=0;
                $("#btn_otroservi_save").prop( "disabled", true );
            }else{
                estadoNomServOtroSerReg=1;
                $(this).find('input[id = txt_otroservinr_nomserv]').removeClass('is-invalid');
                if(desServOtroSerReg==="") {
                    $(this).find('input[id = txt_otroservinr_desserv]').focus();
                    $(this).find('input[id = txt_otroservinr_desserv]').addClass('is-invalid');
                    estadoDesServOtroSerReg = 0;
                    $("#btn_otroservi_save").prop( "disabled", true );
                }else{
                    estadoDesServOtroSerReg = 1;
                    $(this).find('input[id = txt_otroservinr_desserv]').removeClass('is-invalid');
                    if(canServOtroSerReg==="") {
                        $(this).find('input[id = txt_otroservinr_canpro]').focus();
                        $(this).find('input[id = txt_otroservinr_canpro]').addClass('is-invalid');
                        estadoCanServOtroSerReg = 0;
                        $("#btn_otroservi_save").prop( "disabled", true );
                    }else{
                        estadoCanServOtroSerReg = 1;
                        $(this).find('input[id = txt_otroservinr_canpro]').removeClass('is-invalid');
                        $("#btn_otroservi_save").prop( "disabled", false );
                    }
                }
            }

            if(estadoNomServOtroSerReg===1 &&
                estadoDesServOtroSerReg===1 &&
                estadoCanServOtroSerReg===1)
            {
                rowPreRegOtSObjOut['prs1']  = idRowPreRegServ;
                rowPreRegOtSObjOut['prs4']  = nomServOtroSerReg;
                rowPreRegOtSObjOut['prs5']  = canServOtroSerReg;
                rowPreRegOtSObjOut['prs9']  = desServOtroSerReg;


                $.each(JSONobjGeneralOtSer.items[2].items3, function (obj, item) {
                    if(item.idpreregserv===rowPreRegOtSObjOut.prs1){
                        objProEdit["prs1"] = rowPreRegOtSObjOut.prs1;

                        if (item.servsolicitado!== rowPreRegOtSObjOut.prs4) {
                            objProEdit["prs4"] = rowPreRegOtSObjOut.prs4;
                        }
                        if (item.cantidad !== rowPreRegOtSObjOut.prs5) {
                            objProEdit["prs5"] = rowPreRegOtSObjOut.prs5;
                        }
                        if (item.descripcion !== rowPreRegOtSObjOut.prs9) {
                            objProEdit["prs9"] = rowPreRegOtSObjOut.prs9;
                        }

                        var countKeys = Object.keys(objProEdit).length;
                        if(countKeys > 1){
                            arrServEditNoRegSer.push(objProEdit);
                            arrServEditNoRegSer = eliminarObjetosDuplicados(arrServEditNoRegSer, 'prs1');
                            arrGuardarPreRegServ = arrServEditNoRegSer.slice();
                        }else{
                            arrServEditNoRegSer.forEach(function(currentValue, index, arr){
                                if(arrServEditNoRegSer[index].prs1===item.idpreregserv){
                                    console.log("entré a eliminar");
                                    arrServEditNoRegSer.splice(index,1);
                                    arrGuardarPreRegServ = arrServEditNoRegSer.slice();
                                    return false;
                                }
                            })
                        }
                        return false;
                    }
                });
            }
        });
    BuscarSolucionOtroServis(1);
});
//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function addOtroServ_otroservi(){
    conta_filas_otroservi=$('table #tbody_otroservi tr').length;
    ++conta_filas_otroservi;

    let rowCloneOtroServicio=$(dollyRowOtroServicioHTML).clone().prop({id:'row-otroservi-' + conta_filas_otroservi});
    rowCloneOtroServicio.find('p').html(conta_filas_otroservi);

    $('table #tbody_otroservi').append(rowCloneOtroServicio)
        .find('tr:last-child').find('select[name=cmb_otroservi_nombre]').attr('onchange','selCmbServ('+conta_filas_otroservi+')')
        .select2({
            ajax: {
                url: "/otroservi/buservsolic",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por servicio . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoServSolic,
            templateSelection: formatRepoSelectionServSolic
        });

    $('table #tbody_otroservi').find('button').each(function () {
        $(this).on('click', function () {
            let rRowPro = 1;
            $(this).closest('tr').remove();
            var obj = $('table #tbody_otroservi tr');

            $(obj).each(function () {
                $(this).attr("id","row-otroservi-"+rRowPro);
                $(this).find('p[id=p_otroservi_num]').html(rRowPro);
                $(this).find('select[name=cmb_otroservi_nombre]').removeAttr('onchange');
                $(this).find('select[name=cmb_otroservi_nombre]').attr('onchange','selCmbServ('+rRowPro+')');

                ++rRowPro;
            });
        });
    });
    /*conta_filas_otroservi++;
    var id = obj.id;
    var OtroServic = id.split("add_row_");
    //alert(Equipo[1]);
    var childs = $("#"+OtroServic[1] + " tbody tr").length;

    childs++;

    var trval="otroservi_1_fila_"+childs;
    $("#"+OtroServic[1]+" tbody").append(
        "<tr id='"+OtroServic[1]+"_fila_"+childs+"' class='otroservi-insert'>"+
        "<td><div><p class='text-center'>"+childs+"</p></></td>"+
        "<td><div><select id='cmb_otroservi_nombre"+conta_filas_otroservi+"' name='cmb_otroservi_nombre' class='select_otroservi_otroservis' onchange='selCmbServ(this)' style='width: 100%;'></select></div></td>"+
        // "<td><div><span id='spn_otroservi_codpro'></span></div></td>"+
        "<td><div><input id='txt_otroservi_descri' type='text' class='form-control' /></div></td>"+
        /!*"<td><div><span id='spn_otroservi_marpro'></span></div></td>"+
        "<td><div><span id='spn_otroservi_umepro'></span></div></td>"+*!/
        "<td><div><input id='txt_otroservi_cantid' type='text' class='form-control' /></div></td>"+
        "<td hidden><div><span id='spn_otroservi_idservsoli'></span></div></td>"+
        "<td hidden><div><span id='spn_otroservi_idservsolu'></span></div></td>"+
        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservis(`"+trval+"`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
        "</tr>"
    );
    // contPrimervez++;
    borrar_select2();
    clonar_select2OtroServicio(conta_filas_otroservi);*/
}
function clonar_select2OtroServicio(fila){
    $('#cmb_otroservi_nombre'+fila).select2({
        ajax: {
            url: "/otroservi/buservsolic",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        placeholder: 'Buscar por servicio . . .',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
        templateResult: formatRepoServSolic,
        templateSelection: formatRepoSelectionServSolic
    });
}

function borrar_select2(){
    $('.js-example-basic-single').select2("destroy");
}
function selCmbServ(fila){
    let data = $('tbody#tbody_otroservi tr#row-otroservi-'+fila).find('select').select2('data');
    //alert(JSON.stringify(data));
    // let selectId = obj.id;
    // let data = $("#"+selectId).select2('data');
    let idServ=data[0].id;
    $('tbody#tbody_otroservi tr#row-otroservi-'+fila).closest('tr').find('span[id=spn_otroservi_idservsoli]').text(idServ);
}
function selCmbServ2(obj){
    let selectId = obj.id;
    let data = $("#"+selectId).select2('data');
    let idServ=data[0].id;
    //alert(JSON.stringify(data));
    $("#"+selectId).closest('tr').find('span[id=spn_otroservi_idservsoli]').text(idServ);
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD
function eliminar_fila_tabla_otroservis(fila){
    var otroservi="otroservi_1";
    var childs = $("#"+otroservi + " tbody tr").length;
    if(childs > 1){
        $("#"+fila).remove();
        reordernar_num_tabla_otroservi(otroservi);
        conta_filas_otroservi--;
    }
}

function reordernar_num_tabla_otroservi(idEquipo){
    var contador = 1;

    var obj = $("#"+idEquipo+ " tbody tr");

    $(obj).each(function () {
        $(this).removeAttr('id');
        $(this).attr("id","otroservi_1_fila_"+contador);
        $(this).find("p").text(contador);
        $(this).find("button").removeAttr('onclick');
        $(this).find("button").attr("onclick","eliminar_fila_tabla_otroservis('otroservi_1_fila_"+contador+"')");
        $(this).find("select").removeAttr('id');
        $(this).find("select").attr("id","cmb_otroservi_nombre"+contador);
        $(this).find("select").removeAttr('onchange');
        $(this).find("select").attr("onchange","selCmbServ(this)");
        contador++;
    });
}


//FIN GUARDAR EQUIPOS PRODUCTOS REGISTRADOS
//FIN DE FUNCIONES QUE OPERAN A NIVEL DE LA TABLA
//FIN DE FUNCIONES PARA EQUIPOS REGISTRADOS
/*
* ------------------------------------------------------------------------------------
* ------------------------------------------------------------------------------------
* ------------------------------------------------------------------------------------
* */
//INICIO DE FUNCIONES PARA EQUIPOS NO REGISTRADOS

var conta_filas_otroservinr=1;

function addOtroServi_otroservinr(objnr){
    conta_filas_otroservinr++;

    var idnr = objnr.id;
    var OtroServinr = idnr.split("add_row_");

    var childsnr = $("#"+OtroServinr[1] + " tbody tr").length;
    childsnr++;
    var trvalnr="otroservinr_1_fila_"+childsnr;

    $("#"+OtroServinr[1]+" tbody").append(
        "<tr id='"+OtroServinr[1]+"_fila_"+childsnr+"' class='otroservinr-insert'>"+
        "<td><div><p class='text-center'>"+childsnr+"</p></div></td>"+
        "<td><div><input id='txt_otroservinr_nomserv' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_otroservinr_desserv' type='text' class='form-control' /></div></td>"+
        /*"<td><div><input id='txt_otroservinr_marpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_otroservinr_umepro' type='text' class='form-control' /></div></td>"+*/
        "<td><div><input id='txt_otroservinr_canpro' type='text' class='form-control' /></div></td>"+
        "<td hidden><div><span id='spn_otroservinr_idpreg'></span></div></td>"+
        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservisnr(`"+trvalnr+"`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
        "</tr>"
    );
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD
function eliminar_fila_tabla_otroservisnr(fila){
    var otroservinr="otroservinr_1";
    var childsnr = $("#"+otroservinr + " tbody tr").length;

    if(childsnr > 1){
        $("#"+fila).remove();
        reordernar_num_tabla_otroservinr(otroservinr);
        conta_filas_otroservinr--;
    }
}

function reordernar_num_tabla_otroservinr(idOtSernr){
    var contadornr = 1;
    var obj = $("#"+idOtSernr+ " tbody tr");

    $(obj).each(function () {
        $(this).removeAttr('id');
        $(this).attr("id","otroservinr_1_fila_"+contadornr);
        $(this).find("p").text(contadornr);
        $(this).find("button").removeAttr('onclick');
        $(this).find("button").attr("onclick","eliminar_fila_tabla_otroservisnr('otroservinr_1_fila_"+contadornr+"')");
        contadornr++;
    });
}

//GUARDAR PRODUCTOS EQUIPOS REGISTRADOS Y NO REGISTRADOS
var arrayDatos_extrasOtS=[];
var arrayDatos_servreOtS=[];
var arrayDatos_servnrOtS=[];
var arrayData_reOtS;
var arrayData_nrOtS;
var arrayData_completoserv;

function RegistrarOtro_servicio() {
    // if($("#selectEmpresaOtroServi_Proyecto").val()!=null){

        var tbody_re = $("#tbody_otroservi tr");
        var tbody_nr = $("#tbody_otroservinr tr");
        var length_re = tbody_re.length;
        var length_nr = tbody_nr.length;

        var sid=sSolucionOtSer;

        var filaDataExtras=[];
        var filaOkEqReg=0;//0:hace referencia a que falta completar algún campo de la fila//1:todoOK
        var filaOkEqNoReg=0;//0:hace referencia a que falta completar algún campo de la fila//1:todoOK
        //ponemos el id de solución en array


        //RECORRER EQUIPOS PRODUCTOS REGISTRADOS
        //for(var i = 1; i<=length_re; i++){
        $(tbody_re).each(function () {
            var pid = $(this).find("td div span[id = spn_otroservi_idservsoli]").text();
            let data = $(this).find("td div select[name = cmb_otroservi_nombre]").select2('data');
            let nom="";
            if($(this).find("td div select[name ^= cmb_otroservi_nombre]").val()>0){
                nom=data[0].serviciosolicitado;
            }

            var des = $(this).find("td div input[id = txt_otroservi_descri]").val();
            var cnt = $(this).find("td div input[id = txt_otroservi_cantid]").val();
            console.log("pid: "+pid+" nom: "+nom+" des: "+des+" can: "+cnt);
            var filaData = [];

            if(pid!=="" && cnt!=="" && des!=="" && nom!==""){
                filaOkEqReg=1;

                filaData.push(pid);
                filaData.push(nom);
                filaData.push(des);
                filaData.push(cnt);
                arrayDatos_servreOtS.push(filaData);
            }else{
                filaOkEqReg=0;
                arrayDatos_servreOtS=[];
                return false;
            }

        });
        //}

        //RECORRER EQUIPOS PRODUCTOS NO REGISTRADOS
        //for(var i = 1; i<=length_nr; i++){
        $(tbody_nr).each(function () {
            var nomnr = $(this).find("td div input[id = txt_otroservinr_nomserv]").val();
            var desnr = $(this).find("td div input[id = txt_otroservinr_desserv]").val();
            var cntnr = $(this).find("td div input[id = txt_otroservinr_canpro]").val();

            var filaData = [];

            if(conta_filas_otroservinr===1){
                if(nomnr!=="" && desnr!=="" && cntnr!=="") {
                    filaOkEqNoReg=1;
                    filaData.push(nomnr);
                    filaData.push(desnr);
                    filaData.push(cntnr);

                    arrayDatos_servnrOtS.push(filaData);
                }else if(nomnr==="" && desnr==="" && cntnr===""){
                    filaOkEqNoReg=1;
                }else{
                    filaOkEqNoReg=0;
                }
            }else{
                if(nomnr!=="" && desnr!=="" && cntnr!==""){
                    filaOkEqNoReg=1;
                    filaData.push(nomnr);
                    filaData.push(desnr);
                    filaData.push(cntnr);

                    arrayDatos_servnrOtS.push(filaData);
                }else{
                    filaOkEqNoReg=0;
                    arrayDatos_servnrOtS=[];
                    return false;
                }
            }


        });
        //}
        if(filaOkEqReg===1 && filaOkEqNoReg===1){
            filaDataExtras.push(sid);
            arrayDatos_extrasOtS.push(filaDataExtras);
            arrayData_completoserv = {
                values0:arrayDatos_extrasOtS,
                values1: arrayDatos_servreOtS,
                values2: arrayDatos_servnrOtS
            };

            console.log(JSON.stringify(arrayData_completoserv));

            $.ajax({
                method: "POST",
                url: "/otroservi/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData_completoserv),
                success: function resultado(valor) {
                    limpiarInsUpdTotServi();
                    alert("Datos Registrados Correctamente");
                    BuscarSolucionOtroServis(sid);
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }else{
            alert("Faltan completar datos");
            arrayDatos_servreOtS=[];
            arrayDatos_servnrOtS=[];
        }
  /*  }else{
        alert("Selecione una Solución o Empresa por favor...");
    }*/
}

function addOtroServisUpdate_otroservi(obj){
    conta_filas_otroservi=0;
    $( "#tbody_otroservi" ).empty();
    var JSONobj = JSON.parse(obj);
    //RECORREMOS EQUIPO SOLUCIÓN

    $.each(JSONobj.items[1].items2, function (obj, item) {
        conta_filas_otroservi++;

        $("#otroservi_1 tbody").append(
            "<tr id='row-otroservi-"+conta_filas_otroservi+"' class='otroservi-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_otroservi+"</p></></td>"+
            "<td><div><select id='cmb_otroservi_nombre"+conta_filas_otroservi+"' name='cmb_otroservi_nombre' class='select_otroservi_otroservis' style='width: 100%;' onchange='selCmbServ2(this)'></select></div></td>"+
            // "<td><div><span id='spn_equipo_codpro'>"+item.codigo+"</span></div></td>"+
            "<td><div><input id='txt_otroservi_descri' type='text' class='form-control' value='"+item.descripcion+"'/></div></td>"+
           /* "<td><div><span id='spn_equipo_marpro'>"+item.marca+"</span></div></td>"+
            "<td><div><span id='spn_equipo_umepro'>"+item.nomumedida+"</span></div></td>"+*/
            "<td><div><input id='txt_otroservi_cantid' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td hidden><div><span id='spn_otroservi_idservsoli'>"+item.idservsol+"</span></div></td>"+
            "<td hidden><div><span id='spn_otroservi_idservsolu'>"+item.idservicsolu+"</span></div></td>"+
            "<td><div><center><input id='txt_otroservi_del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>"+
            "</tr>"
        );
        $("label#lbl_otroservi_idotroserv").text(item.idoserv);
        /*<i class='icon-checkmark icon-hp-habil'></i>";
        <i class='icon-cross icon-hp-desh'></i>";        */
       // borrar_select2();
        clonar_select2OtroServicio(conta_filas_otroservi);

        $("#select2-cmb_otroservi_nombre"+conta_filas_otroservi+"-container").text(item.servsolicitado);
    });

    //SI EXISTEN
    conta_filas_otroservinr=0;
    $( "#tbody_otroservinr" ).empty();
    $.each(JSONobj.items[2].items3, function (obj, item) {
        conta_filas_otroservinr++;

        $("#otroservinr_1 tbody").append(
            "<tr id='otroservinr_1_fila_"+conta_filas_otroservinr+"' class='otroservinr-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_otroservinr+"</p></div></td>"+
            "<td><div><input id='txt_otroservinr_nomserv' type='text' class='form-control' value='"+item.servsolicitado+"'/></div></td>"+
            "<td><div><input id='txt_otroservinr_desserv' type='text' class='form-control' value='"+item.descripcion+"'/></div></td>"+
            /*"<td><div><input id='txt_equiponr_marpro' type='text' class='form-control' value='"+item.marca+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_umepro' type='text' class='form-control' value='"+item.umedida+"'/></div></td>"+*/
            "<td><div><input id='txt_otroservinr_canpro' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td hidden><div><span id='spn_otroservinr_idpreg'>"+item.idpreregserv+"</span></div></td>"+
            "<td><div><center><input id='txt_otroservinr_del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>"+
            "</tr>"
        );
    });
}

function BuscarSolucionOtroServis(idSol){
    let id = "";
    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/VerificarSesionSolucion",
        success: function(valor) {
            console.log('valor');
            console.log(valor);
            id = valor;
            sSolucionOtSer=id;
            // id = "1";
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
    ++countss;
    console.log("id");
    console.log(id);
    if(id!="" || id!=undefined){
        $.ajax({
            method: "POST",
            url: "/otroservi/buscarotroservsol",
            data: {"idsol": id},
            success: function resultado(valor) {
                JSONobjGeneralOtSer = JSON.parse(valor);
                console.log(JSONobjGeneralOtSer);
                $('.spn-otroservi-emp').html($(".spn-solucion-emp").text());
                $('.spn-otroservi-pro').html($(".spn-solucion-pro").text());
                $('.spn-otroservi-req').html($(".spn-solucion-req").text());
                if(JSONobjGeneralOtSer.items.length>0){
                    estOperaOtSer=1;
                    addOtroServisUpdate_otroservi(valor);
                }else{
                    estOperaOtSer=0;
                    conta_filas_otroservi=0;
                    $("#tbody_otroservi").empty();
                   /* $("#otroservi_1 tbody").append(
                        "<tr id='otroservi_1_fila_1' class='otroservi-insert'>"+
                        "<td><div><p class='text-center'>1</p></div></td>"+
                        "<td><div><select id='cmb_otroservi_nombre1' name='cmb_otroservi_nombre' class='select_otroservi_otroservis' onchange='selCmbServ(this);' style='width: 100%;'></select></div></td>"+
                        // "<td><div><span id='spn_otroservi_codpro'></span></div></td>"+
                        "<td><div><input id='txt_otroservi_descri' type='text' class='form-control'/></div></td>"+
                        /!*                            "<td><div><span id='spn_otroservi_marpro'></span></div></td>"+
                                                    "<td><div><span id='spn_otroservi_umepro'></span></div></td>"+*!/
                        "<td><div><input id='txt_otroservi_cantid' type='text' class='form-control' required/></div></td>"+
                        "<td hidden><div><span id='spn_otroservi_idservsoli'></span></div></td>"+
                        "<td hidden><div><span id='spn_otroservi_idservsolu'></span></div></td>"+
                        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservis(`otroservi_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
                        "</tr>"
                    );
                    borrar_select2();
                    clonar_select2OtroServicio(1);*/

                    //otroserviS NO REGISTRADOS
                    conta_filas_otroservinr=1;
                    $("#tbody_otroservinr").empty();
                    $("#otroservinr_1 tbody").append(
                        "<tr id='otroservinr_1_fila_1' class='otroservinr-insert'>"+
                        "<td><div><p class='text-center'>1</p></div></td>"+
                        "<td><div><input id='txt_otroservinr_nomserv' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_otroservinr_desserv' type='text' class='form-control' /></div></td>"+
                        /*"<td><div><input id='txt_otroservinr_marpro' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_otroservinr_umepro' type='text' class='form-control' /></div></td>"+*/
                        "<td><div><input id='txt_otroservinr_canpro' type='text' class='form-control' /></div></td>"+
                        "<td hidden><div><span id='spn_otroservinr_idpreg'></span></div></td>"+
                        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservisnr(`otroservinr_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
                        "</tr>"
                    );
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}


function limpiarInsUpdTotServi(){
    idRowServSol="";
    rowOtroServObjOut = {};

    jsonGuardarFullOtroServ = {};
    arrGuardarOtroServ = [];
    arrGuardarPreRegServ = [];
    arrSoliEditSer = [];
    arrServEditNoRegSer = [];

    arrGuardarFinOtroServ = [];
    arrGuardarFinPreRegServ = [];

    idRowPreRegServ="";
    rowPreRegOtSObjOut = {};



   arrayDatos_extrasOtS=[];
   arrayDatos_servreOtS=[];
   arrayDatos_servnrOtS=[];
   arrayData_reOtS;
   arrayData_nrOtS;
   arrayData_completoserv={};
}