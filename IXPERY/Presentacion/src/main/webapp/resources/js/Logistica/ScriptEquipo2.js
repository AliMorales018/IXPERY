var JSONobjGeneralEq2;
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUEr
var idRowProdSolEq2="";
var sSolucionEq2="";
var rowEqui2ObjIn = {};
var rowEqui2ObjOut = {};

var jsonGuardarFullEq2 = {};
var arrGuardarEquipo2 = [];

var arrProEdit2 = [];

$(document).ready(function () {
    let idProdProvEq2;
    let preProdEq2;
    let subProdEq2;
    $('#equipo_2 tbody')
        .on('focusin', 'tr[class=equipo2-edit]', function () {
            idRowProdSolEq2 = parseInt($(this).find('span[id = spn_equipo2_idprodsol]').html());
            idProdProvEq2 = parseInt($(this).find('span[id = spn_equipo2_idprprov]').html());
        })
        .on('focusout', 'tr[class=equipo2-edit]', function () {
            let objProEdit = {};
            idProdProvEq2 = parseInt($(this).find('span[id = spn_equipo2_idprprov]').html());
            preProdEq2 = parseFloat($(this).find('span[id = spn_equipo2_prepro]').html());
            subProdEq2 = parseFloat($(this).find('span[id = spn_equipo2_subtot]').html());

            rowEqui2ObjOut['pso1'] = idRowProdSolEq2;
            rowEqui2ObjOut['pso3'] = idProdProvEq2;
            rowEqui2ObjOut['pso5'] = preProdEq2;
            rowEqui2ObjOut['pso7'] = subProdEq2;


            $.each(JSONobjGeneralEq2.items[1].items2, function (obj, item) {
                if(item.idprodsol===rowEqui2ObjOut.pso1){
                    objProEdit["pso1"] = rowEqui2ObjOut.pso1;
                    if(item.idprodprov===null){
                        console.log("entro a null");
                        if(!isNaN(rowEqui2ObjOut.pso3)){
                            console.log("ES <> A NaN");
                            console.log(rowEqui2ObjOut.pso3);
                            item.idprodprov=rowEqui2ObjOut.pso3;
                            item.preciounit=rowEqui2ObjOut.pso5;
                            item.subtotal=rowEqui2ObjOut.pso7;

                            let objProdProv={};
                            objProdProv.ppr1=idProdProvEq2;
                            objProEdit["pso3"] =objProdProv;
                            objProEdit["pso5"] = preProdEq2;
                            objProEdit["pso7"] = subProdEq2;

                            arrProEdit2.push(objProEdit);
                            arrGuardarEquipo2 = arrProEdit2.slice();
                        }
                    }else{
                        console.log("objProEdit");
                        console.log("IDPRODPROV: "+item.idprodprov);
                        console.log("rowEqui2ObjOut.pso3: "+rowEqui2ObjOut.pso3);
                        if (item.idprodprov!== rowEqui2ObjOut.pso3) {

                            let objProdProv={};
                            objProdProv.ppr1=rowEqui2ObjOut.pso3;
                            objProEdit["pso3"] =objProdProv;

                            objProEdit["pso5"] = rowEqui2ObjOut.pso5;
                            objProEdit["pso7"] = rowEqui2ObjOut.pso7;

                            let countKeys = Object.keys(objProEdit).length;
                            console.log("objProEdit");
                            console.log(JSON.stringify(objProEdit));
                            console.log("CONTAobjProEdit");
                            console.log(countKeys);
                            if(countKeys > 1){
                                arrProEdit2.push(objProEdit);
                                arrProEdit2 = eliminarObjetosDuplicados(arrProEdit2, 'pso1');
                                arrGuardarEquipo2 = arrProEdit2.slice();
                            }else if(countKeys === 1){
                                arrProEdit2.forEach(function(currentValue, index, arr){
                                    if(arrProEdit2[index].pso1===item.idprodsol){
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

function clonar_selectEq2(fila,id){

    $('#cmb_equipo2_provee'+fila).select2({
        ajax: {
            url: "/equipo2/busprovprod",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                //alert(params);
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
        templateResult: formatRepoProveEq2,
        templateSelection: formatRepoSelectionProveEq2
    });

}

/*function borrar_select3(){
    $('.js-example-basic-single').select2("destroy");
}*/

//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function formatRepoProveEq2 (repo) {
    //alert(repo.precio);
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectequipo2-result-empresa'><span class='selectequipo2-span-result'>EMPRESA: </span>"+repo.empresa+"</div>"+
        "<div class='selectequipo2-result-producto'><span class='selectequipo2-span-result'>PRODUCTO: </span>"+repo.nomproducto+"</div>"+
        "<div class=         'selectequipo2-result-modelo'  ><span class='selectequipo2-span-result'>PRECIO: </span>"+repo.precio+"</span></div>"
    return markup;
}
function formatRepoSelectionProveEq2 (repo) {
    return repo.text || repo.empresa;
}
function selCmbProveeEq2(obj){
    let selectId = obj.id;
    let data = $("#"+selectId).select2('data');
    let idProdProv=data[0].id;
    let subTot;
    //alert(JSON.stringify(data));
    $("#"+selectId).closest('tr').find('span[id=spn_equipo2_prepro]').text(data[0].precio);
    $("#"+selectId).closest('tr').find('span[id=spn_equipo2_idprprov]').text(idProdProv);
    subTot=parseFloat(data[0].precio)*parseFloat($("#"+selectId).closest('tr').find('span[id=spn_equipo2_canpro]').html());
    $("#"+selectId).closest('tr').find('span[id=spn_equipo2_subtot]').text(subTot);
}

function InsUpdDelEquipo2() {
    jsonGuardarFullEq2.pso=arrGuardarEquipo2;//TPRODSOL
    console.log("Json A Guardar");
    console.log(jsonGuardarFullEq2);
    $.ajax({
        method: "POST",
        url: "/equipo/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullEq2),
        success: function resultado(valor) {
            if (valor == "") {
                alert("Datos Guardados correctamente");
                //
                // $("#" + nomBodggy_proyecto).html(filaTabla_proyecto);
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

function crearSesProvProd(idtr){
    let idProve = $("tbody#tbody_equipo2 tr#"+idtr).find("td div select[id ^= cmb_equipo2_provee]").val();
    let idProd =  $("tbody#tbody_equipo2 tr#"+idtr).find("td div span[id = spn_equipo2_idproduc]").text();
    console.log("idProveedor: "+idProve);
    console.log("idProducto: "+idProd);
    $.ajax({
        method: "POST",
        url: "/equipo2/sesproverod",
        data: {"prove": idProve,"prod": idProd},
        success: function resultado(valor) {
            console.log("Rpta de sesion");
            console.log(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

}

function abrir_equipo2_regprod(){
     AddMenu(mAsociarProd);
}