var JSONobjGeneralEq;
var sSolucionEq=0;
var estOperaEq=0;//0: guardar simple//1:updatetotal(sav-updt-del)
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

var arrGuardarFinEquipo = [];
var arrGuardarFinPreRegEq = [];

var idRowPreRegEq="";
// var rowPreRegEquiObjIn = {};
var rowPreRegEquiObjOut = {};

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
    });
    $('tbody#tbody_equiponr').find('tr[class=equiponr-insert]').each(function () {
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
        objFilaPreReg.prp4=$(this).find("input[id = txt_equiponr_nompro]").val();
        objFilaPreReg.prp5=$(this).find("input[id = txt_equiponr_umepro]").val();
        objFilaPreReg.prp6=$(this).find("input[id = txt_equiponr_canpro]").val();
        objFilaPreReg.prp7="1";
        objFilaPreReg.prp8=$(this).find("input[id = txt_equiponr_modpro]").val();
        objFilaPreReg.prp9=$(this).find("input[id = txt_equiponr_marpro]").val();
        console.log('objFilaPreReg');
        console.log(objFilaPreReg);
        arrGuardarFinPreRegEq.push(objFilaPreReg);
        console.log('arrGuardarFinPreRegEq');
        console.log(arrGuardarFinPreRegEq);

        //REGISTRO PRODUCTO SOLUCIÓN

        objEqu.eqi1=parseInt($("label#lbl_equipo_ideq").html());//foránea equipo
        objProd.pdt1= 0;

        objPreReg.prp1=0;//foránea pre-registro producto

        objFilaProSolPre.pso1=0;
        objFilaProSolPre.pso2=objEqu;//objeto foránea equipo
        objFilaProSolPre.pso4= $(this).find("td div input[id = txt_equiponr_canpro]").val();
        objFilaProSolPre.pso8="1";
        //objFilaProSolPre.pso11=objProd;
        objFilaProSolPre.pso12="1";
        objFilaProSolPre.pso14=objPreReg;
        arrGuardarFinEquipo.push(objFilaProSolPre);
        console.log('arrGuardarFinEquipo');
        console.log(arrGuardarFinEquipo);
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
        objEqu.eqi1=$("label#lbl_equipo_ideq").text();//foránea equipo;
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
        arrGuardarFinEquipo.push(objFilaProSol);
    });

    $.merge(arrGuardarFinEquipo,arrGuardarEquipo);
    $.merge(arrGuardarFinPreRegEq,arrGuardarPreRegEq);

    jsonGuardarFullEq.pso=arrGuardarFinEquipo;//TPRODSOL
    jsonGuardarFullEq.prp=arrGuardarFinPreRegEq;//TPREREGPRO


    console.log("Json A Guardar");
    console.log(jsonGuardarFullEq);


    $.ajax({
        method: "POST",
        url: "/equipo/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullEq),
        success: function resultado(valor) {
            if (valor == "") {
                alert('Los datos fueron guardados correctamente.');
                // var sid=$("#selectEmpresaEquipo_Proyecto").val();
                var sid=sSolucionEq;
                BuscarSolucionEquipos(sid);
                limpiarInsUpdTot();

                //
                // $("#" + nomBody_proyecto).html(filaTabla_proyecto);
                // CargarJS_proyecto(0, 1, 0);
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

var conta_filas_equipo=1;
var dollyRowEquipo = '';
dollyRowEquipo+= '<tr class="equipo-insert">';
dollyRowEquipo+= '<td><div><p class="text-center" id="p_equipo_num"></p></div></td>';
dollyRowEquipo+= '<td><div style="width: 170px"><select name="cmb_equipo_nompro" class="select_equipo_equipos"></select></div></td>';
dollyRowEquipo+= '<td><div><span id="spn_equipo_codpro"></span></div></td>';
dollyRowEquipo+= '<td><div><span id="spn_equipo_modpro"></span></div></td>';
dollyRowEquipo+= '<td><div><span id="spn_equipo_marpro"></span></div></td>';
dollyRowEquipo+= '<td><div><span id="spn_equipo_umepro"></span></div></td>';
dollyRowEquipo+= '<td><div><input type="text" id="txt_equipo_canpro" class="form-control"/></div></td>';
dollyRowEquipo+= '<td hidden><div><span id="spn_equipo_idprod"></span></div></td>';
dollyRowEquipo+= '<td hidden><div><span id="spn_equipo_idprodsol"></span></div></td>';
dollyRowEquipo+= '<td><div class="text-center"><button type="button"><i class="icon-cross icon-hp-desh"></i></button></div></td>';
dollyRowEquipo+= '</tr>';

var dollyRowEquipoHTML = $.parseHTML(dollyRowEquipo);

var rowCloneEquipo;

$(document).ready(function () {
    $("#selectEmpresaEquipo_Proyecto").select2({
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
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });


    rowCloneEquipo =$(dollyRowEquipoHTML).clone().prop({id:'row-equipo-' + conta_filas_equipo});
    rowCloneEquipo.find('p').html(1);

    $('table #tbody_equipo')
        .html(rowCloneEquipo).find('tr:last-child')
        .find('select[name=cmb_equipo_nompro]').attr('onchange','selCmbProd(1)')
        .select2({
            ajax: {
                url: "/equipo/busproducto",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    // $.each(data.equ, function(i, d) {
                    //     data.equ[i]['id'] = d.equ1;
                    // });
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por producto . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoProd,
            templateSelection: formatRepoSelectionProd
        });


    var idProdEq;
    var canProdEq;

    $('#equipo_1 tbody')
        .on('focusin', 'tr[class=equipo-edit]', function () {
            idRowProdSolEq = parseInt($(this).find('span[id = spn_equipo_idprodsol]').html());
            // console.log("entrando");
        })
        .on('focusout', 'tr[class=equipo-edit]', function () {
            // console.log("saliendo");
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


    let nomProdEqReg; let modProdEqReg;let marProdEqReg;let umeProdEqReg;let canProdEqReg;

    let estadoNomProdEqReg;let estadoModProdEqReg;let estadoMarProdEqReg;let estadoUmeProdEqReg;let estadoCanProdEqReg;

    $('#equiponr_1 tbody')
        .on('focusin', 'tr[class=equiponr-edit]', function () {
            idRowPreRegEq = parseInt($(this).find('span[id = spn_equiponr_idpreg]').html());
            console.log("ENTRANDO");
        })
        .on('focusout', 'tr[class=equiponr-edit]', function () {
            console.log("saliendo");
            let objProEdit = {};
            nomProdEqReg = $(this).find('input[id = txt_equiponr_nompro]').val();
            modProdEqReg = $(this).find('input[id = txt_equiponr_modpro]').val();
            marProdEqReg = $(this).find('input[id = txt_equiponr_marpro]').val();
            umeProdEqReg = $(this).find('input[id = txt_equiponr_umepro]').val();
            canProdEqReg = parseInt($(this).find('input[id = txt_equiponr_canpro]').val());

            // console.log("nomProdEqReg: "+nomProdEqReg);
            // console.log("modProdEqReg: "+modProdEqReg);
            // console.log("marProdEqReg: "+marProdEqReg);
            // console.log("umeProdEqReg: "+umeProdEqReg);
            // console.log("canProdEqReg: "+canProdEqReg);
            // console.log("///////////////////////////");
            // console.log("///////////////////////////");


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
                                $("#btn_equipo_save").prop( "disabled", false );
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
    BuscarSolucionEquipos(1);
});




//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function addEquipos_equipo(){
    let cRowEqu;
    //conta_filas_equipo++;

    conta_filas_equipo=$('table #tbody_equipo tr').length;
    ++conta_filas_equipo;

    let rowCloneEquipo=$(dollyRowEquipoHTML).clone().prop({id:'row-equipo-' + conta_filas_equipo});
    rowCloneEquipo.find('p').html(conta_filas_equipo);

    $('table #tbody_equipo').append(rowCloneEquipo)
        .find('tr:last-child').find('select[name=cmb_equipo_nompro]').attr('onchange','selCmbProd('+conta_filas_equipo+')')
        .select2({
            ajax: {
                url: "/equipo/busproducto",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    // $.each(data.equ, function(i, d) {
                    //     data.equ[i]['id'] = d.equ1;
                    // });
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por producto . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoProd,
            templateSelection: formatRepoSelectionProd
        });

    $('table #tbody_equipo').find('button').each(function () {
        $(this).on('click', function () {
            let rRowPro = 1;
            $(this).closest('tr').remove();
            var obj = $('table #tbody_equipo tr');

            $(obj).each(function () {
                $(this).attr("id","row-equipo-"+rRowPro);
                $(this).find('p[id=p_equipo_num]').html(rRowPro);
                $(this).find('select[name=cmb_equipo_nompro]').removeAttr('onchange');
                $(this).find('select[name=cmb_equipo_nompro]').attr('onchange','selCmbProd('+rRowPro+')');

                ++rRowPro;
            });
        });
    });

 /*   $('table #tbody_equipo').find('select').each(function () {
        $(this).on('change', function () {
            selCmbProd(this);
        });
    });*/


    //onchange="selCmbProd(this)"
    /*    conta_filas_equipo++;
        var id = obj.id;
        var Equipo = id.split("add_row_");
        //alert(Equipo[1]);
        var childs = $("#"+Equipo[1] + " tbody tr").length;

        childs++;

        var trval="equipo_1_fila_"+childs;
        $("#"+Equipo[1]+" tbody").append(
            "<tr id='"+Equipo[1]+"_fila_"+childs+"' class='equipo-insert'>"+
            "<td><div><p class='text-center'>"+childs+"</p></div></td>"+
            "<td><div><select id='cmb_equipo_nompro"+conta_filas_equipo+"' name='cmb_equipo_nompro' class='select_equipo_equipos' onchange='selCmbProd(this)' style='width: 100%;'></select></div></td>"+
            // "<td><div><select id='cmb_equipo_nompro' class='select_equipo_equipos' onchange='selCmbProd(this)' style='width: 100%;'></select></div></td>"+
            "<td><div><span id='spn_equipo_codpro'></span></div></td>"+
            "<td><div><span id='spn_equipo_modpro'></span></div></td>"+
            "<td><div><span id='spn_equipo_marpro'></span></div></td>"+
            "<td><div><span id='spn_equipo_umepro'></span></div></td>"+
            "<td><div><input id='txt_equipo_canpro' type='text' type='text' class='form-control' /></div></td>"+
            "<td hidden><div><span id='spn_equipo_idprod'></span></div></td>"+
            "<td hidden><div><span id='spn_equipo_idprodsol'></span></div></td>"+
            "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_equipos(`"+trval+"`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
            "</tr>"
        );
        // contPrimervez++;
        borrar_select2();
        clonar_select2Equipo(conta_filas_equipo);*/
}
function clonar_select2Equipo(fila){
    $('#cmb_equipo_nompro'+fila).select2({
        ajax: {
            url: "/equipo/busproducto",
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
        placeholder: 'Buscar por producto . . .',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
        templateResult: formatRepoProd,
        templateSelection: formatRepoSelectionProd
    });
}

function formatRepoProd (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectequipo2-result-equipoproducto'><span class='select2-span-result'>PRODUCTO: </span>"+repo.nombre+"</div>"+
        "<div class=         'selectequipo2-result-equipomodelo'  ><span class='select2-span-result'>MODELO: </span>"+repo.modelo+"</span></div>"+
        "<div class=         'selectequipo2-result-equipomarca'   ><span class='select2-span-result'>MARCA: </span>"+repo.marca+"</span></div>";
    return markup;
}

function formatRepoSelectionProd (repo) {
    return repo.text || repo.nombre;
}

function borrar_select2(){
    $('.js-example-basic-single').select2("destroy");
}
function selCmbProd(fila){
    let data = $('tbody#tbody_equipo tr#row-equipo-'+fila).find('select').select2('data');
    //alert(JSON.stringify(data));
    // let selectId = obj.id;
    // let data = $("#"+selectId).select2('data');
    let idProd=data[0].id;
    $('tbody#tbody_equipo tr#row-equipo-'+fila).closest('tr').find('span[id=spn_equipo_codpro]').text(data[0].codigo);
    $('tbody#tbody_equipo tr#row-equipo-'+fila).closest('tr').find('span[id=spn_equipo_modpro]').text(data[0].modelo);
    $('tbody#tbody_equipo tr#row-equipo-'+fila).closest('tr').find('span[id=spn_equipo_marpro]').text(data[0].marca);
    $('tbody#tbody_equipo tr#row-equipo-'+fila).closest('tr').find('span[id=spn_equipo_umepro]').text(data[0].umedida);
    $('tbody#tbody_equipo tr#row-equipo-'+fila).closest('tr').find('span[id=spn_equipo_idprod]').text(idProd);
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD
function eliminar_fila_tabla_equipos(fila){
    var equiporeg="equipo_1";
    var childs = $("#"+equiporeg + " tbody tr").length;
    if(childs > 1){
        $("#"+fila).remove();
        reordernar_num_tabla_equipos(equiporeg);
        conta_filas_equipo--;
    }
}

function reordernar_num_tabla_equipos(idEquipo){
    var contador = 1;

    var obj = $("#"+idEquipo+ " tbody tr");

    $(obj).each(function () {
        $(this).removeAttr('id');
        $(this).attr("id","equipo_1_fila_"+contador);
        $(this).find("p").text(contador);
        $(this).find("button").removeAttr('onclick');
        $(this).find("button").attr("onclick","eliminar_fila_tabla_equipos('equipo_1_fila_"+contador+"')");
        /*        $(this).find("select").removeAttr('id');
                $(this).find("select").attr("id","cmb_equipo_nompro"+contador);*/
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

var conta_filas_equiponr=1;

function addEquipos_equiponr(objnr){
    conta_filas_equiponr++;

    var idnr = objnr.id;
    var Equiponr = idnr.split("add_row_");

    var childsnr = $("#"+Equiponr[1] + " tbody tr").length;
    childsnr++;
    var trvalnr="equiponr_1_fila_"+childsnr;

    $("#"+Equiponr[1]+" tbody").append(
        "<tr id='"+Equiponr[1]+"_fila_"+childsnr+"' class='equiponr-insert'>"+
        "<td><div><p class='text-center'>"+childsnr+"</p></div></td>"+
        "<td><div><input id='txt_equiponr_nompro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_modpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_marpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_umepro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_canpro' type='text' class='form-control' /></div></td>"+
        "<td hidden><div><span id='spn_equiponr_idpreg'></span></div></td>"+
        // "<td hidden><div><input id='txt_equiponr_idpreg' type='text' class='form-control' /></div></td>"+
        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_equiposnr(`"+trvalnr+"`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
        "</tr>"
    );
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD
function eliminar_fila_tabla_equiposnr(fila){
    var equiponoreg="equiponr_1";
    var childsnr = $("#"+equiponoreg + " tbody tr").length;

    if(childsnr > 1){
        $("#"+fila).remove();
        reordernar_num_tabla_equiposnr(equiponoreg);
        conta_filas_equiponr--;
    }
}

function reordernar_num_tabla_equiposnr(idEquiponr){
    var contadornr = 1;
    var obj = $("#"+idEquiponr+ " tbody tr");

    $(obj).each(function () {
        $(this).removeAttr('id');
        $(this).attr("id","equiponr_1_fila_"+contadornr);
        $(this).find("p").text(contadornr);
        $(this).find("button").removeAttr('onclick');
        $(this).find("button").attr("onclick","eliminar_fila_tabla_equiposnr('equiponr_1_fila_"+contadornr+"')");
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
    // if($("#selectEmpresaEquipo_Proyecto").val()!=null){

        var tbody_re = $("#tbody_equipo tr");
        var tbody_nr = $("#tbody_equiponr tr");
        var length_re = tbody_re.length;
        var length_nr = tbody_nr.length;

        // var sid=$("#selectEmpresaEquipo_Proyecto").val();
        var sid=sSolucionEq;

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

            if(conta_filas_equiponr===1){
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
                    limpiarInsUpdTot();
                    alert("Datos Registrados Correctamente");
                    BuscarSolucionEquipos(sid);
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
 /*   }else{
        alert("Selecione una Solución o Empresa por favor...");
    }*/
}

function addEquiposUpdate_equipo(obj){
    conta_filas_equipo=0;
    $( "#tbody_equipo" ).empty();
    var JSONobj = JSON.parse(obj);
    //RECORREMOS EQUIPO SOLUCIÓN

    $.each(JSONobj.items[1].items2, function (obj, item) {
        conta_filas_equipo++;

        $("#equipo_1 tbody").append(
            "<tr id='row-equipo-"+conta_filas_equipo+"' class='equipo-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_equipo+"</p></></td>"+
            "<td><div><select id='cmb_equipo_nompro"+conta_filas_equipo+"' name='cmb_equipo_nompro' class='select_equipo_equipos' style='width: 100%;' onchange='selCmbProd2(this)'></select></div></td>"+
            "<td><div><span id='spn_equipo_codpro'>"+item.codigo+"</span></div></td>"+
            "<td><div><span id='spn_equipo_modpro'>"+item.modelo+"</span></div></td>"+
            "<td><div><span id='spn_equipo_marpro'>"+item.marca+"</span></div></td>"+
            "<td><div><span id='spn_equipo_umepro'>"+item.nomumedida+"</span></div></td>"+
            "<td><div><input id='txt_equipo_canpro' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td hidden><div><span id='spn_equipo_idprod'>"+item.idproducto+"</span></div></td>"+
            "<td hidden><div><span id='spn_equipo_idprodsol'>"+item.idprodsol+"</span></div></td>"+
            "<td><div><center><input id='txt_equipo_del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>"+
            "</tr>"
        );
        $("label#lbl_equipo_ideq").text(item.idequipo);
        /*<i class='icon-checkmark icon-hp-habil'></i>";
        <i class='icon-cross icon-hp-desh'></i>";        */
        borrar_select2();
        clonar_select2Equipo(conta_filas_equipo);

        $("#select2-cmb_equipo_nompro"+conta_filas_equipo+"-container").text(item.producto);
    });

    //SI EXISTEN
    conta_filas_equiponr=0;
    $( "#tbody_equiponr" ).empty();
    $.each(JSONobj.items[2].items3, function (obj, item) {
        conta_filas_equiponr++;

        $("#equiponr_1 tbody").append(
            "<tr id='equiponr_1_fila_"+conta_filas_equiponr+"' class='equiponr-edit'>"+
            "<td><div><p class='text-center'>"+conta_filas_equiponr+"</p></div></td>"+
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
function selCmbProd2(obj){
    let selectId = obj.id;
    let data = $("#"+selectId).select2('data');
    let idProd=data[0].id;
    //alert(JSON.stringify(data));
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_codpro]').text(data[0].codigo);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_modpro]').text(data[0].modelo);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_marpro]').text(data[0].marca);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_umepro]').text(data[0].umedida);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo_idprod]').text(idProd);
}
function formatRepo (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectempresa2-result-equipo'><span class='selectempresa2-span-equiporesult'>EMPRESA: </span>"+repo.nomempresa+" - " + repo.ruc +"</div>"+
        "<div class='selectempresa2-result-equipoproyecto'><span class='selectempresa2-span-equiporesult'>PROYECTO: </span>"+repo.nomproyecto+"</span></div>"+
        "<div class='selectempresa2-result-equiposolucion'><span class='selectempresa2-span-equiporesult'>SOLUCION: </span>"+repo.solucion+"</span></div>";
    return markup;
}

function formatRepoSelection (repo) {
    return repo.text || repo.nomempresa + " - " + repo.solucion;
}

function BuscarSolucionEquipos(idSol){
    let id = "";
    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/VerificarSesionSolucion",
        success: function(valor) {
            console.log('valor');
            console.log(valor);
            id = valor;
            sSolucionEq=id;
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
            url: "/equipo/buscarequiposol",
            data: {"idsol": id},
            success: function resultado(valor) {
                JSONobjGeneralEq = JSON.parse(valor);
                if(JSONobjGeneralEq.items.length>0){
                    estOperaEq=1;
                    addEquiposUpdate_equipo(valor);
                }else{
                    estOperaEq=0;
                    conta_filas_equipo=0;
                    $("#tbody_equipo").empty();
                    /*  $("#equipo_1 tbody").append(
                          "<tr id='equipo_1_fila_1' class='equipo-insert'>"+
                          "<td><div><p class='text-center'>1</p></div></td>"+
                          // "<td><div><select id='cmb_equipo_nompro1' name='cmb_equipo_nompro' class='select_equipo_equipos' onchange='selCmbProd(this);' style='width: 100%;'></select></div></td>"+
                          "<td><div><select id='cmb_equipo_nompro' class='select_equipo_equipos' onchange='selCmbProd(this);' style='width: 100%;'></select></div></td>"+
                          "<td><div><span id='spn_equipo_codpro'></span></div></td>"+
                          "<td><div><span id='spn_equipo_modpro'></span></div></td>"+
                          "<td><div><span id='spn_equipo_marpro'></span></div></td>"+
                          "<td><div><span id='spn_equipo_umepro'></span></div></td>"+
                          "<td><div><input id='txt_equipo_canpro' type='text' type='text' class='form-control' required/></div></td>"+
                          "<td hidden><div><span id='spn_equipo_idprod'></span></div></td>"+
                          "<td hidden><div><span id='spn_equipo_idprodsol'></span></div></td>"+
                          "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_equipos(`equipo_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
                          "</tr>"
                      );
                      borrar_select2();
                      clonar_select2Equipo(1);*/

                    //EQUIPOS NO REGISTRADOS
                    conta_filas_equiponr=1;
                    $("#tbody_equiponr").empty();
                    $("#equiponr_1 tbody").append(
                        "<tr id='equiponr_1_fila_1' class='equiponr-insert'>"+
                        "<td><div><p class='text-center'>1</p></div></td>"+
                        "<td><div><input id='txt_equiponr_nompro' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_equiponr_modpro' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_equiponr_marpro' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_equiponr_umepro' type='text' class='form-control' /></div></td>"+
                        "<td><div><input id='txt_equiponr_canpro' type='text' class='form-control' /></div></td>"+
                        "<td hidden><div><span id='spn_equiponr_idpreg'></span></div></td>"+
                        "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_equiposnr(`equiponr_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
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
function limpiarInsUpdTot(){
    idRowProdSolEq="";
    rowEquiObjOut = {};

    jsonGuardarFullEq = {};
    arrGuardarEquipo = [];
    arrGuardarPreRegEq = [];
    arrProEditEq = [];
    arrProEditNoRegEq = [];

    arrGuardarFinEquipo = [];
    arrGuardarFinPreRegEq = [];

    idRowPreRegEq="";
    rowPreRegEquiObjOut = {};




    arrayDatos_extras=[];
    arrayDatos_re=[];
    arrayDatos_nr=[];
    arrayData_re;
    arrayData_nr;
    arrayData_completo={};
}


