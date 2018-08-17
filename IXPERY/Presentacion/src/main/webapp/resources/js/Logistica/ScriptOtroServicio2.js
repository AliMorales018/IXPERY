var JSONobjGeneralServ2;
//////ACTUALIZAR, INSERTAR, ELIMINAR EN BLOQUE
var idRowProdSolOtS2="";
var sSolucionOtSer2="";
var rowEqui2ObjIn = {};
var rowOtroSer2ObjOut = {};

var jsonGuardarFullOtroSer2 = {};
var arrGuardarOtroSer2 = [];

var arrProEdit2OtSer2 = [];

$(document).ready(function () {
    let idProdProvOs2;
    let preProdOs2;
    let subProdOs2;
    $('#otroservicio_2 tbody')
        .on('focusin', 'tr[class=otroservicio2-edit]', function () {
            idRowProdSolOtS2 = parseInt($(this).find('span[id = spn_otroservicio2_idservicsolu]').html());
            idProdProvOs2 = parseInt($(this).find('span[id = spn_otroservicio2_idserprov]').html());
        })
        .on('focusout', 'tr[class=otroservicio2-edit]', function () {
            let objProEdit = {};
            idProdProvOs2 = parseInt($(this).find('span[id = spn_otroservicio2_idserprov]').html());
            preProdOs2 = parseFloat($(this).find('span[id = spn_otroservicio2_preser]').html());
            subProdOs2 = parseFloat($(this).find('span[id = spn_otroservicio2_subtot]').html());

            rowOtroSer2ObjOut['ssl1'] = idRowProdSolOtS2;
            rowOtroSer2ObjOut['ssl3'] = idProdProvOs2;
            rowOtroSer2ObjOut['ssl17'] = preProdOs2;
            rowOtroSer2ObjOut['ssl7'] = subProdOs2;


            $.each(JSONobjGeneralServ2.items[1].items2, function (obj, item) {
                if(item.idservicsolu===rowOtroSer2ObjOut.ssl1){
                    objProEdit["ssl1"] = rowOtroSer2ObjOut.ssl1;
                    if(item.idservprov===null){
                        console.log("entro a null");
                        if(!isNaN(rowOtroSer2ObjOut.ssl3)){
                            console.log("ES <> A NaN");
                            console.log(rowOtroSer2ObjOut.ssl3);
                            item.idservprov=rowOtroSer2ObjOut.ssl3;
                            item.costounitario=rowOtroSer2ObjOut.ssl17;
                            item.costosubtotal=rowOtroSer2ObjOut.ssl7;

                            let objProdProv={};
                            objProdProv.spr1=idProdProvOs2;
                            objProEdit["ssl3"] =objProdProv;
                            objProEdit["ssl17"] = preProdOs2;
                            objProEdit["ssl7"] = subProdOs2;

                            arrProEdit2OtSer2.push(objProEdit);
                            arrGuardarOtroSer2 = arrProEdit2OtSer2.slice();
                        }
                    }else{
                        console.log("objProEdit");
                        console.log("IDPRODPROV: "+item.idservprov);
                        console.log("rowOtroSer2ObjOut.ssl3: "+rowOtroSer2ObjOut.ssl3);
                        if (item.idservprov!== rowOtroSer2ObjOut.ssl3) {

                            let objProdProv={};
                            objProdProv.spr1=rowOtroSer2ObjOut.ssl3;
                            objProEdit["ssl3"] =objProdProv;

                            objProEdit["ssl17"] = rowOtroSer2ObjOut.ssl17;
                            objProEdit["ssl7"] = rowOtroSer2ObjOut.ssl7;

                            let countKeys = Object.keys(objProEdit).length;
                            console.log("objProEdit");
                            console.log(JSON.stringify(objProEdit));
                            console.log("CONTAobjProEdit");
                            console.log(countKeys);
                            if(countKeys > 1){
                                arrProEdit2OtSer2.push(objProEdit);
                                arrProEdit2OtSer2 = eliminarObjetosDuplicados(arrProEdit2OtSer2, 'ssl1');
                                arrGuardarOtroSer2 = arrProEdit2OtSer2.slice();
                            }else if(countKeys === 1){
                                arrProEdit2OtSer2.forEach(function(currentValue, index, arr){
                                    if(arrProEdit2OtSer2[index].ssl1===item.idservicsolu){
                                        console.log("entré a eliminar");
                                        arrProEdit2OtSer2.splice(index,1);
                                        arrGuardarOtroSer2 = arrProEdit2OtSer2.slice();
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
//////////////////////////////////////////////////////////////////////////////




function clonar_selectOtroSer2(fila,id){

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


//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function formatRepoProveOtS2 (repo) {
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
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_preser]').text(data[0].precio);
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_idserprov]').text(idProdProv);
    subTot=parseFloat(data[0].precio)*parseFloat($("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_canser]').html());
    $("#"+selectId).closest('tr').find('span[id=spn_otroservicio2_subtot]').text(subTot);
}

function InsUpdDelOtroServ2() {
    jsonGuardarFullOtroSer2.ssl=arrGuardarOtroSer2;//TPRODSOL
    console.log("Json A Guardar");
    console.log(jsonGuardarFullOtroSer2);
    $.ajax({
        method: "POST",
        url: "/otroservi/guardarfull",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarFullOtroSer2),
        success: function resultado(valor) {
            if (valor == "") {
                alert("Datos Guardados Correctamente");
            }
            else {
                console.log("Entro en ELSE");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function crearSesProvSoli(idtr){
    let idProve = $("tbody#tbody_otroservicio2 tr#"+idtr).find("td div select[id ^= cmb_otroservicio2_provee]").val();
    let idSoli =  $("tbody#tbody_otroservicio2 tr#"+idtr).find("td div span[id = spn_otroservicio2_idsersoli]").text();
    console.log("idProveedor: "+idProve);
    console.log("idSoli: "+idSoli);
    $.ajax({
        method: "POST",
        url: "/otroservicio2/sesproverod",
        data: {"prove": idProve,"soli": idSoli},
        success: function resultado(valor) {
            console.log("Rpta de sesion");
            console.log(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function abrir_prove_ot2(){
    
}