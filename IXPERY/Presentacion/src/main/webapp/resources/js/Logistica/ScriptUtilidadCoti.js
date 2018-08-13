var JSONobjGeneralUtiCoti;
var comercial;
var item1;
var item2;
var item3;

function RegistrarUtilidad_Coti() {
    if($("#selectEmpresa_Proyecto_Sol_Uti").val()!==null){
        let sid=$("#selectEmpresa_Proyecto_Sol_Uti").val();
        let txtComer=$("#txt_porc_comer").val();
        let txtItem1=$("#txt_porc_item1").val();
        let txtItem2=$("#txt_porc_item2").val();
        let txtItem3=$("#txt_porc_item3").val();
        let txtDescr=$("#txt_cond_pago_uti").val();

        if(comercial!==txtComer||item1!==txtItem1||item2!==txtItem2||item3!==txtItem3){
            let cadena=sid+","+txtItem1+","+txtItem2+","+txtItem3+","+txtComer+":-)"+txtDescr;

            $.ajax({
                method: "POST",
                url: "/utilidadcotizacion/register",
                data: {"cadena":cadena},
                success: function resultado(valor) {

                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
    }else{
        alert("Selecione una Solución o Empresa por favor...");
    }
}

function addEquiposUpdate_utiCoti(obj){
    $.each(JSONobjGeneralUtiCoti.items[0].items1, function (obj, item) {
        $("#txt_costo_item1").val(item.costototal);
    });
    $.each(JSONobjGeneralUtiCoti.items[1].items2, function (obj, item) {
        $("#txt_costo_item2").val(item.costototal);
    });
    $.each(JSONobjGeneralUtiCoti.items[2].items3, function (obj, item) {
        $("#txt_costo_item3").val(item.costototal);
    });
    $.each(JSONobjGeneralUtiCoti.items[3].porcentajeitems1, function (obj, item) {
        $("#spn_porc_item1_old").text(item.porutiitem1);
    });
    $.each(JSONobjGeneralUtiCoti.items[4].porcentajeitems2, function (obj, item) {
        $("#spn_porc_item2_old").text(item.porutiitem2);
    });
    $.each(JSONobjGeneralUtiCoti.items[5].porcentajeitems3, function (obj, item) {
        $("#spn_porc_item3_old").text(item.porutiitem3);
    });
    $.each(JSONobjGeneralUtiCoti.items[6].porcentajecomercial, function (obj, item) {
        $("#spn_porc_comer_old").text(item.porcomercial);
    });

    $.each(JSONobjGeneralUtiCoti.items[7].mostraritem, function (obj, item) {
        comercial=item.comercial;
        item1=item.item1;
        item2=item.item2;
        item3=item.item3;

        $("#txt_porc_comer").val(comercial);
        $("#txt_porc_item1").val(item1);
        $("#txt_porc_item2").val(item2);
        $("#txt_porc_item3").val(item3);
    });

    $.each(JSONobjGeneralUtiCoti.items[8].idcotizacion, function (obj, item) {
        $("#lbl_util_coti_id").text(item.idcotizacion);
    });
}

function verificaCajasPorcen(){
    let porComer=$("#txt_porc_comer").val();
    let porItem1=$("#txt_porc_item1").val();
    let porItem2=$("#txt_porc_item2").val();
    let porItem3=$("#txt_porc_item3").val();

    let cosItem1=$("#txt_costo_item1").val();
    let cosItem2=$("#txt_costo_item2").val();
    let cosItem3=$("#txt_costo_item3").val();

    if(porComer>0 && porComer!=="" &&
       porItem1>0 && porItem1!=="" &&
       porItem2>0 && porItem2!=="" &&
       porItem3>0 && porItem3!==""
    ){
        alert("Todo ok");
        calTotalCotiUtilidad(porItem1,cosItem1,porItem2,cosItem2,porItem3,cosItem3,porComer);
    }
}
function calTotalCotiUtilidad(porItem1,cosItem1,porItem2,cosItem2,porItem3,cosItem3,porComer){
    let cadena=porItem1+","+cosItem1+";"+porItem2+","+cosItem2+";"+porItem3+","+cosItem3+";"+porComer;
    $.ajax({
        method: "POST",
        url: "/utilidadcotizacion/calTotalCotiUtilidad",
        data: {"cadena":cadena},
        success: function resultado(valor) {
            let rptaCotiValores = JSON.parse(valor);
            console.log(rptaCotiValores);
            $.each(rptaCotiValores.precios, function (obj, item) {
                $("#txt_precio_item1").val(item.precioitem1);
                $("#txt_precio_item2").val(item.precioitem2);
                $("#txt_precio_item3").val(item.precioitem3);
                $("#txt_util_item1").val(item.utilidad1);
                $("#txt_util_item2").val(item.utilidad2);
                $("#txt_util_item3").val(item.utilidad3);
            });
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}