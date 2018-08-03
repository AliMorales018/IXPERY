var JSONobjGeneralOtSer;
var estOperaOtSer=0;//0: guardar simple//1:updatetotal(sav-updt-del)
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUE
var idRowProdSolEq="";
// var rowEquiObjIn = {};
var rowEquiObjOut = {};
// var arrProdSolEq = [];
// var arrProdNoRegSol = [];
var jsonGuardarFullEq = {};
var arrGuardarEquipo = [];
var arrGuardarPreRegEq = [];
var arrProEditEq = [];
var arrProEditNoRegEq = [];

var idRowPreRegEq="";
// var rowPreRegEquiObjIn = {};
var rowPreRegEquiObjOut = {};
$(document).ready(function () {
    var idProdEq;
    var canProdEq;

    $('#equipo_1 tbody')
        .on('focusin', 'tr[class=equipo-edit]', function () {
            idRowProdSolEq = parseInt($(this).find('span[id = spn_equipo_idprodsol]').html());
        })
        .on('focusout', 'tr[class=equipo-edit]', function () {
            var objProEdit = {};
            idProdEq = parseInt($(this).find('span[id = spn_equipo_idprod]').html());
            canProdEq = parseInt($(this).find('input[id = txt_equipo_canpro]').val());

            if(canProdEq===null || canProdEq==="" || canProdEq===0 || isNaN(canProdEq)){
                $(this).find('input[id = txt_equipo_canpro]').focus();
                $(this).find('input[id = txt_equipo_canpro]').addClass('is-invalid');
                $("#btn_equipo_save").prop( "disabled", true );
            }else{
                $(this).find('input[id = txt_equipo_canpro]').removeClass('is-invalid');
                rowEquiObjOut['pso1'] = idRowProdSolEq;
                rowEquiObjOut['pso11'] = idProdEq;
                rowEquiObjOut['pso4'] = canProdEq;

                $.each(JSONobjGeneralEq.items[1].items2, function (obj, item) {
                    if(item.idprodsol===rowEquiObjOut.pso1){
                        objProEdit["pso1"] = rowEquiObjOut.pso1;

                        if(item.idproducto!==rowEquiObjOut.pso11){
                            objProEdit["pso11"] = rowEquiObjOut.pso11;
                        }

                        if(item.cantidad!==rowEquiObjOut.pso4){
                            objProEdit["pso4"] = rowEquiObjOut.pso4;
                        }

                        var countKeys = Object.keys(objProEdit).length;
                        if(countKeys > 1){
                            arrProEditEq.push(objProEdit);
                            arrProEditEq = eliminarObjetosDuplicados(arrProEditEq, 'pso1');
                            arrGuardarEquipo = arrProEditEq.slice();
                        }else{
                            arrProEditEq.forEach(function(currentValue, index, arr){
                                /*                            console.log("entré al for");
                                                            console.log("ARRAY INDEX: "+arrProEditEq[index].pso1);
                                                            console.log("ARRAY IDROWSOL: "+idRowProdSolEq);*/
                                if(arrProEditEq[index].pso1===item.idprodsol){
                                    console.log("entré a eliminar");
                                    arrProEditEq.splice(index,1);
                                    arrGuardarEquipo = arrProEditEq.slice();
                                    return false;
                                }

                            })
                        }
                        return false;
                    }
                });
                $("#btn_equipo_save").prop( "disabled", false );
            }


        });


    let nomProdEqReg;
    let modProdEqReg;
    let marProdEqReg;
    let umeProdEqReg;
    let canProdEqReg;

    let estadoNomProdEqReg;
    let estadoModProdEqReg;
    let estadoMarProdEqReg;
    let estadoUmeProdEqReg;
    let estadoCanProdEqReg;

    $('#equiponr_1 tbody')
        .on('focusin', 'tr[class=equiponr-edit]', function () {
            idRowPreRegEq = parseInt($(this).find('span[id = spn_equiponr_idpreg]').html());
        })
        .on('focusout', 'tr[class=equiponr-edit]', function () {
            let objProEdit = {};
            nomProdEqReg = $(this).find('input[id = txt_equiponr_nompro]').val();
            modProdEqReg = $(this).find('input[id = txt_equiponr_modpro]').val();
            marProdEqReg = $(this).find('input[id = txt_equiponr_marpro]').val();
            umeProdEqReg = $(this).find('input[id = txt_equiponr_umepro]').val();
            canProdEqReg = parseInt($(this).find('input[id = txt_equiponr_canpro]').val());

            console.log("nomProdEqReg: "+nomProdEqReg);
            console.log("modProdEqReg: "+modProdEqReg);
            console.log("marProdEqReg: "+marProdEqReg);
            console.log("umeProdEqReg: "+umeProdEqReg);
            console.log("canProdEqReg: "+canProdEqReg);
            console.log("///////////////////////////");
            console.log("///////////////////////////");


            if(nomProdEqReg==="") {
                $(this).find('input[id = txt_equiponr_nompro]').focus();
                $(this).find('input[id = txt_equiponr_nompro]').addClass('is-invalid');
                estadoNomProdEqReg=0;
                $("#btn_equipo_save").prop( "disabled", true );
            }else{
                estadoNomProdEqReg=1;
                $(this).find('input[id = txt_equiponr_nompro]').removeClass('is-invalid');
                if(modProdEqReg==="") {
                    $(this).find('input[id = txt_equiponr_modpro]').focus();
                    $(this).find('input[id = txt_equiponr_modpro]').addClass('is-invalid');
                    estadoModProdEqReg = 0;
                    $("#btn_equipo_save").prop( "disabled", true );
                }else{
                    estadoModProdEqReg = 1;
                    $(this).find('input[id = txt_equiponr_modpro]').removeClass('is-invalid');
                    if(marProdEqReg==="") {
                        $(this).find('input[id = txt_equiponr_marpro]').focus();
                        $(this).find('input[id = txt_equiponr_marpro]').addClass('is-invalid');
                        estadoMarProdEqReg = 0;
                        $("#btn_equipo_save").prop( "disabled", true );
                    }else{
                        estadoMarProdEqReg = 1;
                        $(this).find('input[id = txt_equiponr_marpro]').removeClass('is-invalid');
                        if(umeProdEqReg==="") {
                            $(this).find('input[id = txt_equiponr_umepro]').focus();
                            $(this).find('input[id = txt_equiponr_umepro]').addClass('is-invalid');
                            estadoUmeProdEqReg = 0;
                            $("#btn_equipo_save").prop( "disabled", true );
                        }else{
                            estadoUmeProdEqReg = 1;
                            $(this).find('input[id = txt_equiponr_umepro]').removeClass('is-invalid');
                            if(canProdEqReg==="" || canProdEqReg===0 || isNaN(canProdEqReg)) {
                                $(this).find('input[id = txt_equiponr_canpro]').focus();
                                $(this).find('input[id = txt_equiponr_canpro]').addClass('is-invalid');
                                estadoCanProdEqReg = 0;
                                $("#btn_equipo_save").prop( "disabled", true );
                            }else{
                                estadoCanProdEqReg = 1;
                                $(this).find('input[id = txt_equiponr_canpro]').removeClass('is-invalid');
                                $("#btn_equipo_save").prop( "disabled", true );
                            }
                        }
                    }
                }
            }

            if(estadoNomProdEqReg===1 &&
                estadoModProdEqReg===1 &&
                estadoMarProdEqReg===1 &&
                estadoUmeProdEqReg===1 &&
                estadoCanProdEqReg===1)
            {
                rowPreRegEquiObjOut['prp1']  = idRowPreRegEq;
                rowPreRegEquiObjOut['prp4'] = nomProdEqReg;
                rowPreRegEquiObjOut['prp8']  = modProdEqReg;
                rowPreRegEquiObjOut['prp9']  = marProdEqReg;
                rowPreRegEquiObjOut['prp5'] = umeProdEqReg;
                rowPreRegEquiObjOut['prp6']  = canProdEqReg;

                $.each(JSONobjGeneralEq.items[2].items3, function (obj, item) {
                    if(item.idprereg===rowPreRegEquiObjOut.prp1){
                        objProEdit["prp1"] = rowPreRegEquiObjOut.prp1;

                        if (item.nomproducto!== rowPreRegEquiObjOut.prp4) {
                            objProEdit["prp4"] = rowPreRegEquiObjOut.prp4;
                        }
                        if (item.modelo !== rowPreRegEquiObjOut.prp8) {
                            objProEdit["prp8"] = rowPreRegEquiObjOut.prp8;
                        }
                        if (item.marca !== rowPreRegEquiObjOut.prp9) {
                            objProEdit["prp9"] = rowPreRegEquiObjOut.prp9;
                        }

                        if (item.umedida !== rowPreRegEquiObjOut.prp5) {
                            objProEdit["prp5"] = rowPreRegEquiObjOut.prp5;
                        }
                        if (item.cantidad !== rowPreRegEquiObjOut.prp6) {
                            objProEdit["prp6"] = rowPreRegEquiObjOut.prp6;
                        }

                        var countKeys = Object.keys(objProEdit).length;
                        if(countKeys > 1){
                            arrProEditNoRegEq.push(objProEdit);
                            arrProEditNoRegEq = eliminarObjetosDuplicados(arrProEditNoRegEq, 'prp1');
                            arrGuardarPreRegEq = arrProEditNoRegEq.slice();
                        }else{
                            arrProEditNoRegEq.forEach(function(currentValue, index, arr){
                                if(arrProEditNoRegEq[index].prp1===item.idprereg){
                                    console.log("entré a eliminar");
                                    arrProEditNoRegEq.splice(index,1);
                                    arrGuardarPreRegEq = arrProEditNoRegEq.slice();
                                    return false;
                                }
                            })
                        }
                        return false;
                    }
                });
            }
        })
});
function VerEstaGuardaItem1(){
    if(estOperaEq===0){
        RegistrarEquipo_equipo();
    }else if(estOperaEq===1){
        InsUpdDelEquipo();
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

function InsUpdDelEquipo() {
    $('tbody#tbody_equiponr').find('tr[class=equiponr-edit]').each(function(){
        if($(this).find('input[type=checkbox]').is(':checked')) {
            let objJsonDel = {};
            $(this).closest('tr').find('span[id=spn_equiponr_idpreg]').each(function(){
                objJsonDel.prp1 = parseInt($(this).html());
                objJsonDel.prp7 = "0";
            });
            arrGuardarPreRegEq.push(objJsonDel);
            console.log("ELIMINAR");
            console.log(arrGuardarPreRegEq);
        }
    }).closest('tbody').find('tr[class=equiponr-insert]').each(function () {
        let objFilaPreReg = {};
        let objProdSol= {};
        let objFilaProSolPre = {};
        let objEqu={};
        let objProd={};
        let objPreReg={};

        //PRE-REGISTRO PRODUCTO
        objProdSol.pso1=0;//foránea prod solución

        objFilaPreReg.prp1=0;
        objFilaPreReg.prp2=objProdSol;
        objFilaPreReg.prp4=$(this).find("td div input[id = txt_equiponr_nompro]").val();
        objFilaPreReg.prp5=$(this).find("td div input[id = txt_equiponr_umepro]").val();
        objFilaPreReg.prp6=$(this).find("td div input[id = txt_equiponr_canpro]").val();
        objFilaPreReg.prp7="1";
        objFilaPreReg.prp8=$(this).find("td div input[id = txt_equiponr_modpro]").val();
        objFilaPreReg.prp9=$(this).find("td div input[id = txt_equiponr_marpro]").val();
        arrGuardarPreRegEq.push(objFilaPreReg);

        //REGISTRO PRODUCTO SOLUCIÓN

        objEqu.eqi1=parseInt($("label#lbl_otroservi_idotroserv").html());//foránea equipo
        objProd.pdt1= 0;

        objPreReg.prp1=0;//foránea pre-registro producto

        objFilaProSolPre.pso1=0;
        objFilaProSolPre.pso2=objEqu;//objeto foránea equipo
        objFilaProSolPre.pso4= $(this).find("td div input[id = txt_equiponr_canpro]").val();
        objFilaProSolPre.pso8="1";
        //objFilaProSolPre.pso11=objProd;
        objFilaProSolPre.pso12="1";
        objFilaProSolPre.pso14=objPreReg;
        arrGuardarEquipo.push(objFilaProSolPre);
    });


    $('tbody#tbody_equipo').find('tr[class=equipo-edit]').each(function(){
        console.log("Fila");
        if($(this).find('input[type=checkbox]').is(':checked')) {
            let objJsonDel = {};
            $(this).closest('tr').find('span[id=spn_equipo_idprodsol]').each(function(){
                objJsonDel.pso1 = parseInt($(this).html());
                objJsonDel.pso8 = "0";
            });
            arrGuardarEquipo.push(objJsonDel);
            console.log("ELIMINAR");
            console.log(arrGuardarEquipo);
        }else{
            /* if(pid!==""){
                 filaOkEqReg=1;

                 filaData.push(pid);
                 filaData.push(cod);
                 filaData.push(mod);
                 filaData.push(mrc);
                 filaData.push(ume);
                 filaData.push(cnt);
                 arrayDatos_re.push(filaData);
             }else{
                 filaOkEqReg=0;
                 arrayDatos_re=[];
                 return false;
             }*/

        }
    }).closest('tbody').find('tr[class=equipo-insert]').each(function () {
        let objFilaProSol = {};

        let objEqu= {};
        let objProd={};
        //let objPreReg= {};

        //REGISTRO PRODUCTO SOLUCIÓN
        objEqu.eqi1=$("label#lbl_otroservi_idotroserv").text();//foránea equipo;
        objProd.pdt1=parseInt($(this).find("td div span[id = spn_equipo_idprod]").html());
        //objPreReg.prp1=0;//foránea pre-registro producto

        objFilaProSol.pso1=0;
        objFilaProSol.pso2=objEqu;//objeto foránea equipo
        objFilaProSol.pso4=$(this).find("td div input[id = txt_equipo_canpro]").val();
        objFilaProSol.pso8="1";
        objFilaProSol.pso11=objProd;
        objFilaProSol.pso12="1";
        //objFilaProSol.pso14=objPreReg;
        //arrProdSolEq.push(objFilaProSol);
        arrGuardarEquipo.push(objFilaProSol);
    });

    jsonGuardarFullEq.pso=arrGuardarEquipo;//TPRODSOL
    jsonGuardarFullEq.prp=arrGuardarPreRegEq;//TPREREGPRO


    console.log("Json A Guardar");
    console.log(jsonGuardarFullEq);


    $.ajax({
        method: "POST",
        url: "/equipo/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullEq),
        success: function resultado(valor) {
            if (valor == "") {
                alert("Entro en IF");
                //
                // $("#" + nomBody_proyecto).html(filaTabla_proyecto);
                // CargarJS_proyecto(0, 1, 0);
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



























































































var conta_filas_otroservi=1;
//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function addOtroServ_otroservi(obj){
    conta_filas_otroservi++;
    var id = obj.id;
    var OtroServic = id.split("add_row_");
    //alert(Equipo[1]);
    var childs = $("#"+OtroServic[1] + " tbody tr").length;

    childs++;

    var trval="otroservi_1_fila_"+childs;
    $("#"+OtroServic[1]+" tbody").append(
        "<tr id='"+OtroServic[1]+"_fila_"+childs+"' class='otroservi-insert'>"+
        "<td><div><p class='text-center'>"+childs+"</p></></td>"+
        "<td><div><select id='cmb_otroservi_nombre"+conta_filas_otroservi+"' name='cmb_otroservi_nombre' class='select_otroservi_otroservis' onchange='selCmbProd(this)' style='width: 100%;'></select></div></td>"+
        // "<td><div><span id='spn_otroservi_codpro'></span></div></td>"+
        "<td><div><input id='txt_otroservi_descri' type='text' class='form-control' /></div></td>"+
        /*"<td><div><span id='spn_otroservi_marpro'></span></div></td>"+
        "<td><div><span id='spn_otroservi_umepro'></span></div></td>"+*/
        "<td><div><input id='txt_otroservi_cantid' type='text' class='form-control' /></div></td>"+
        "<td hidden><div><span id='spn_otroservi_idservsoli'></span></div></td>"+
        "<td hidden><div><span id='spn_otroservi_idservsolu'></span></div></td>"+
        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservis(`"+trval+"`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
        "</tr>"
    );
    // contPrimervez++;
    borrar_select2();
    clonar_select2(conta_filas_otroservi);
}
function clonar_select2(fila){
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
function selCmbProd(obj){
    let selectId = obj.id;
    let data = $("#"+selectId).select2('data');
    let idProd=data[0].id;
    alert(JSON.stringify(data));
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_codpro]').text(data[0].codigo);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_modpro]').text(data[0].modelo);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_marpro]').text(data[0].marca);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_umepro]').text(data[0].umedida);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_idprod]').text(idProd);
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD
function eliminar_fila_tabla_otroservis(fila){
    var otroservi="otroservi_1";
    var childs = $("#"+otroservi + " tbody tr").length;
    if(childs > 1){
        $("#"+fila).remove();
        reordernar_num_tabla_equipos(otroservi);
        conta_filas_otroservi--;
    }
}

function reordernar_num_tabla_equipos(idEquipo){
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
        $(this).find("select").attr("onchange","selCmbProd(this)");
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
        reordernar_num_tabla_equiposnr(otroservinr);
        conta_filas_otroservinr--;
    }
}

function reordernar_num_tabla_equiposnr(idEquiponr){
    var contadornr = 1;
    var obj = $("#"+idEquiponr+ " tbody tr");

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
var arrayDatos_extras=[];
var arrayDatos_re=[];
var arrayDatos_nr=[];
var arrayData_re;
var arrayData_nr;
var arrayData_completo;

function RegistrarEquipo_equipo() {
    if($("#selectEmpresaEquipo_Proyecto").val()!=null){

        var tbody_re = $("#tbody_equipo tr");
        var tbody_nr = $("#tbody_equiponr tr");
        var length_re = tbody_re.length;
        var length_nr = tbody_nr.length;

        var sid=$("#selectEmpresaEquipo_Proyecto").val();

        var filaDataExtras=[];
        var filaOkEqReg=0;//0:hace referencia a que falta completar algún campo de la fila//1:todoOK
        var filaOkEqNoReg=0;//0:hace referencia a que falta completar algún campo de la fila//1:todoOK
        //ponemos el id de solución en array


        //RECORRER EQUIPOS PRODUCTOS REGISTRADOS
        //for(var i = 1; i<=length_re; i++){
        $(tbody_re).each(function () {
            var pid = $(this).find("td div span[id = spn_equipo_idprod]").text();
            var cod = $(this).find("td div span[id = spn_equipo_codpro]").text();
            var mod = $(this).find("td div span[id = spn_equipo_modpro]").text();
            var mrc = $(this).find("td div span[id = spn_equipo_marpro]").text();
            var ume = $(this).find("td div span[id = spn_equipo_umepro]").text();
            var cnt = $(this).find("td div input[id = txt_equipo_canpro]").val();

            var filaData = [];

            if(pid!=="" && cnt!==""){
                filaOkEqReg=1;

                filaData.push(pid);
                filaData.push(cod);
                filaData.push(mod);
                filaData.push(mrc);
                filaData.push(ume);
                filaData.push(cnt);
                arrayDatos_re.push(filaData);
            }else{
                filaOkEqReg=0;
                arrayDatos_re=[];
                return false;
            }

        });
        //}

        //RECORRER EQUIPOS PRODUCTOS NO REGISTRADOS
        //for(var i = 1; i<=length_nr; i++){
        $(tbody_nr).each(function () {
            var nomnr = $(this).find("td div input[id = txt_equiponr_nompro]").val();
            var modnr = $(this).find("td div input[id = txt_equiponr_modpro]").val();
            var mrcnr = $(this).find("td div input[id = txt_equiponr_marpro]").val();
            var umenr = $(this).find("td div input[id = txt_equiponr_umepro]").val();
            var cntnr = $(this).find("td div input[id = txt_equiponr_canpro]").val();

            var filaData = [];

            if(conta_filas_otroservinr===1){
                if(nomnr!=="" && modnr!=="" && mrcnr!=="" && umenr!=="" && cntnr!=="") {
                    filaOkEqNoReg=1;
                    filaData.push(nomnr);
                    filaData.push(modnr);
                    filaData.push(mrcnr);
                    filaData.push(umenr);
                    filaData.push(cntnr);

                    arrayDatos_nr.push(filaData);
                }else if(nomnr==="" && modnr==="" && mrcnr==="" && umenr==="" && cntnr===""){
                    filaOkEqNoReg=1;
                }else{
                    filaOkEqNoReg=0;
                }
            }else{
                if(nomnr!=="" && modnr!=="" && mrcnr!=="" && umenr!=="" && cntnr!==""){
                    filaOkEqNoReg=1;
                    filaData.push(nomnr);
                    filaData.push(modnr);
                    filaData.push(mrcnr);
                    filaData.push(umenr);
                    filaData.push(cntnr);

                    arrayDatos_nr.push(filaData);
                }else{
                    filaOkEqNoReg=0;
                    arrayDatos_nr=[];
                    return false;
                }
            }


        });
        //}
        if(filaOkEqReg===1 && filaOkEqNoReg===1){
            filaDataExtras.push(sid);
            arrayDatos_extras.push(filaDataExtras);
            arrayData_completo = {
                values0:arrayDatos_extras,
                values1: arrayDatos_re,
                values2: arrayDatos_nr
            };

            console.log(JSON.stringify(arrayData_completo));

            $.ajax({
                method: "POST",
                url: "/equipo/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData_completo),
                success: function resultado(valor) {
                    alert("Equipo Solución Registrado Correctamente");
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }else{
            alert("Faltan completar datos");
            arrayDatos_re=[];
            arrayDatos_nr=[];
        }
    }else{
        alert("Selecione una Solución o Empresa por favor...");
    }
}

function addOtroServisUpdate_otroservi(obj){
    conta_filas_equipo=0;
    $( "#tbody_equipo" ).empty();
    var JSONobj = JSON.parse(obj);
    //RECORREMOS EQUIPO SOLUCIÓN

    $.each(JSONobj.items[1].items2, function (obj, item) {
        conta_filas_otroservi++;

        $("#otroservi_1 tbody").append(
            "<tr id='otroservi_1_fila_1"+conta_filas_otroservi+"' class='otroservi-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_otroservi+"</p></></td>"+
            "<td><div><select id='cmb_otroservi_nombre"+conta_filas_otroservi+"' name='cmb_otroservi_nombre' class='select_otroservi_otroservis' style='width: 100%;' onchange='selCmbProd(this)'></select></div></td>"+
            // "<td><div><span id='spn_equipo_codpro'>"+item.codigo+"</span></div></td>"+
            "<td><div><input id='txt_otroservi_descri' type='text' class='form-control'>"+item.modelo+"</input></div></td>"+
           /* "<td><div><span id='spn_equipo_marpro'>"+item.marca+"</span></div></td>"+
            "<td><div><span id='spn_equipo_umepro'>"+item.nomumedida+"</span></div></td>"+*/
            "<td><div><input id='txt_otroservi_cantid' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td hidden><div><span id='spn_otroservi_idservsoli'>"+item.idproducto+"</span></div></td>"+
            "<td hidden><div><span id='spn_otroservi_idservsolu'>"+item.idprodsol+"</span></div></td>"+
            "<td><div><center><input id='txt_otroservi_del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>"+
            "</tr>"
        );
        $("label#lbl_otroservi_idotroserv").text(item.idequipo);
        /*<i class='icon-checkmark icon-hp-habil'></i>";
        <i class='icon-cross icon-hp-desh'></i>";        */
        borrar_select2();
        clonar_select2(conta_filas_otroservi);

        $("#select2-cmb_equipo_nompro"+conta_filas_equipo+"-container").text(item.producto);
    });

    //SI EXISTEN
    conta_filas_otroservinr=0;
    $( "#tbody_equiponr" ).empty();
    $.each(JSONobj.items[2].items3, function (obj, item) {
        conta_filas_otroservinr++;

        $("#equiponr_1 tbody").append(
            "<tr id='equiponr_1_fila_"+conta_filas_otroservinr+"' class='equiponr-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_otroservinr+"</p></div></td>"+
            "<td><div><input id='txt_equiponr_nompro' type='text' class='form-control' value='"+item.nomproducto+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_modpro' type='text' class='form-control' value='"+item.modelo+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_marpro' type='text' class='form-control' value='"+item.marca+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_umepro' type='text' class='form-control' value='"+item.umedida+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_canpro' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td hidden><div><span id='spn_equiponr_idpreg'>"+item.idprereg+"</span></div></td>"+
            "<td><div><center><input id='txt_equiponr_del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>"+
            "</tr>"
        );
    });
}