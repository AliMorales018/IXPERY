var JSONobjGeneralServ2;
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUE
var idRowProdSolOtS2="";
var sSolucionOtSer2="";
var rowEqui2ObjIn = {};
var rowEqui2ObjOut = {};

var jsonGuardarFullEq2 = {};
var arrGuardarEquipo2 = [];

var arrProEdit2 = [];

$(document).ready(function () {
    let idProdProvEq2;
    let preProdEq2;
    let subProdEq2;
    $('#otroservicio_2 tbody')
        .on('focusin', 'tr[class=otroservicio2-edit]', function () {
            idRowProdSolOtS2 = parseInt($(this).find('span[id = spn_otroservicio2_idservicsolu]').html());
            idProdProvEq2 = parseInt($(this).find('span[id = spn_otroservicio2_idserprov]').html());
        })
        .on('focusout', 'tr[class=otroservicio2-edit]', function () {
            let objProEdit = {};
            idProdProvEq2 = parseInt($(this).find('span[id = spn_otroservicio2_idserprov]').html());
            preProdEq2 = parseFloat($(this).find('span[id = spn_otroservicio2_preser]').html());
            subProdEq2 = parseFloat($(this).find('span[id = spn_otroservicio2_subtot]').html());

            rowEqui2ObjOut['ssl1'] = idRowProdSolOtS2;
            rowEqui2ObjOut['ssl3'] = idProdProvEq2;
            rowEqui2ObjOut['ssl17'] = preProdEq2;
            rowEqui2ObjOut['ssl7'] = subProdEq2;


            $.each(JSONobjGeneralServ2.items[1].items2, function (obj, item) {
                if(item.idservicsolu===rowEqui2ObjOut.ssl1){
                    objProEdit["ssl1"] = rowEqui2ObjOut.ssl1;
                    if(item.idservprov===null){
                        console.log("entro a null");
                        if(!isNaN(rowEqui2ObjOut.ssl3)){
                            console.log("ES <> A NaN");
                            console.log(rowEqui2ObjOut.ssl3);
                            item.idservprov=rowEqui2ObjOut.ssl3;
                            item.costounitario=rowEqui2ObjOut.ssl17;
                            item.costosubtotal=rowEqui2ObjOut.ssl7;

                            let objProdProv={};
                            objProdProv.spr1=idProdProvEq2;
                            objProEdit["ssl3"] =objProdProv;
                            objProEdit["ssl17"] = preProdEq2;
                            objProEdit["ssl7"] = subProdEq2;

                            arrProEdit2.push(objProEdit);
                            arrGuardarEquipo2 = arrProEdit2.slice();
                        }
                    }else{
                        console.log("objProEdit");
                        console.log("IDPRODPROV: "+item.idservprov);
                        console.log("rowEqui2ObjOut.ssl3: "+rowEqui2ObjOut.ssl3);
                        if (item.idservprov!== rowEqui2ObjOut.ssl3) {

                            let objProdProv={};
                            objProdProv.spr1=rowEqui2ObjOut.ssl3;
                            objProEdit["ssl3"] =objProdProv;

                            objProEdit["ssl17"] = rowEqui2ObjOut.ssl17;
                            objProEdit["ssl7"] = rowEqui2ObjOut.ssl7;

                            let countKeys = Object.keys(objProEdit).length;
                            console.log("objProEdit");
                            console.log(JSON.stringify(objProEdit));
                            console.log("CONTAobjProEdit");
                            console.log(countKeys);
                            if(countKeys > 1){
                                arrProEdit2.push(objProEdit);
                                arrProEdit2 = eliminarObjetosDuplicados(arrProEdit2, 'ssl1');
                                arrGuardarEquipo2 = arrProEdit2.slice();
                            }else if(countKeys === 1){
                                arrProEdit2.forEach(function(currentValue, index, arr){
                                    if(arrProEdit2[index].ssl1===item.idservicsolu){
                                        console.log("entré a eliminar");
                                        arrProEdit2.splice(index,1);
                                        arrGuardarEquipo2 = arrProEdit2.slice();
                                        return false;
                                    }

                                });
                            }
                        }
                    }
                }
            });
        })
});

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
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////




var filaOtS2=0;
function clonar_select4(fila,id){

    $('#cmb_otroservicio2_provee'+fila).select2({
        ajax: {
            url: "/otroservicio2/busprovserv",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: id
                };
            },
            processResults: function (data, params) {
                return {
                    results: data.items
                };
            },
            cache: true
        },
        placeholder: 'Buscar por proveedor . . .',
        escapeMarkup: function (markup) { return markup; },
        //minimumInputLength: 3,
        templateResult: formatRepoProveOtS2,
        templateSelection: formatRepoSelectionProveOtS2
    });

}

function borrar_select4(){
    $('.js-example-basic-single').select2("destroy");
}

//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function formatRepoProveOtS2 (repo) {
    //alert(repo.precio);
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectequipo2-result-empresa'><span class='selectequipo2-span-result'>EMPRESA: </span>"+repo.empresa+"</div>"+
        "<div class='selectequipo2-result-producto'><span class='selectequipo2-span-result'>PRODUCTO: </span>"+repo.serviciosolicitado+"</div>"+
        "<div class=         'selectequipo2-result-modelo'  ><span class='selectequipo2-span-result'>PRECIO: </span>"+repo.precio+"</span></div>"
    return markup;
}
function formatRepoSelectionProveOtS2 (repo) {
    return repo.text || repo.empresa;
}
function selCmbProveeOtS2(obj){
    let selectId = obj.id;
    let data = $("#"+selectId).select2('data');
    let idProdProv=data[0].id;
    let subTot;
    alert(JSON.stringify(data));
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_preser]').text(data[0].precio);
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_idserprov]').text(idProdProv);
    subTot=parseFloat(data[0].precio)*parseFloat($("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_canser]').html());
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_subtot]').text(subTot);
}

function InsUpdDelOtroServ2() {
    jsonGuardarFullEq2.pso=arrGuardarEquipo2;//TPRODSOL
    console.log("Json A Guardar");
    console.log(jsonGuardarFullEq2);
    $.ajax({
        method: "POST",
        url: "/otroservi/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullEq2),
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