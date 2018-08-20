let json = '';

$.ajax({
    method: "POST",
    async: false,
    url: "/solucion/RerporteGererencia",
    success: function resultado(valor) {
        // alert('reporte-ger');

        json = valor;
        console.log('jsonStr');
        console.log(json);

    },
    error: function errores(msg) {
        alert('Error: ' + msg.responseText);
    }
});

json = JSON.parse(json);

console.log('jsonObj');
console.log(json);


let arrCabecera = json.CABECERA;
let arrITEM1 = json.ITEM1;
let arrITEM2 = json.ITEM2;
let arrITEM3 = json.ITEM3;

let lengthCabecera = arrITEM1.length;
let lengthITEM1 = arrITEM1.length;
let lengthITEM2 = arrITEM2.length;
let lengthITEM3 = arrITEM3.length;

let htmlTabCab = ``;
let htmlDatosCli = ``;
let htmlDatosCot = ``;
let htmlITME1 = ``;
let htmlITME2 = ``;
let htmlITME3 = ``;
let htmlPieTabla = ``;
let htmlMemo = ``;

let totalITEM1 = false;
let totalITEM2 = false;
let totalITEM3 = false;


//LLENADO DE LA TABLA REPORTE
//LLEANDO DE ITEM1
for(let i = 0; i < lengthITEM1; ++i){
    $.each(arrITEM1[i], function(key, value){
        if(value === null){
            arrITEM1[i][key] = '';
        }
    });

    let preciounitario = '';
    let preciosubtotal = '';

    if(arrITEM1[i].punitvisible === '1'){
        preciounitario = `<div class="moneda">${arrITEM1[i].preciounitario}</div>`;
        $('input#item1-check-prunitario').attr( 'checked', true );
    }
    else{
        preciounitario = `<div class="sinmoneda">INCLUIDO</div>`;
        $('input#item1-check-prunitario').attr( 'checked', false );
    }

    if(arrITEM1[i].pstotalvisible === '1'){
        preciosubtotal = `<div class="moneda">${arrITEM1[i].preciosubtotal}</div>`;
        $('input#item1-check-prsubtotal').attr( 'checked', true );
    }
    else{
        preciosubtotal = `<div class="sinmoneda">SUB TOTAL</div>`;
        totalITEM1 = true;
        $('input#item1-check-prsubtotal').attr( 'checked', false );
    }

    htmlITME1 += `<tr name="item1-fila-${i+1}">`;
    htmlITME1 += `<td><div>${i+1}</div></td>`;
    htmlITME1 += `<td style="display:none"><span>${arrITEM1[i].idcotdet}</span></td>>`;
    htmlITME1 += `<td><div>${arrITEM1[i].codigo}</div></td>>`;
    htmlITME1 += `<td><div>${arrITEM1[i].marca} ${arrITEM1[i].modelo}</div></td>>`;
    htmlITME1 += `<td><div>${arrITEM1[i].descripcion}</div></td>>`;
    htmlITME1 += `<td><div class="item1-cantidad">${arrITEM1[i].cantidad}</div></td>>`;
    htmlITME1 += `<td><div class="item1-prunitario">${preciounitario}</div></td>>`;
    htmlITME1 += `<td><div class="item1-prsubtotal">${preciosubtotal}</div></td>>`;
    htmlITME1 += `</tr>`;
}
//LLENADO DE ITEM2
for(let i = 0; i < lengthITEM2; ++i){
    $.each(arrITEM2[i],function(key, value){
        if(value === null){
            arrITEM2[i][key]= '';
        }
    });

    let preciounitario = '';
    let preciosubtotal = '';

    if(arrITEM2[i].punitvisible === '1'){
        preciounitario = `<div class="moneda">${arrITEM2[i].preciounitario}</div>`;
        $('input#item2-check-prunitario').attr( 'checked', true );
    }
    else{
        preciounitario = `<div class="sinmoneda">INCLUIDO</div>`;
        $('input#item2-check-prunitario').attr( 'checked', false );
    }

    if(arrITEM2[i].pstotalvisible === '1'){
        preciosubtotal = `<div class="moneda">${arrITEM2[i].preciosubtotal}</div>`;
        $('input#item2-check-prsubtotal').attr( 'checked', true );
    }
    else{
        preciosubtotal = `<div class="sinmoneda">SUB TOTAL</div>`;
        totalITEM2 = true;
        $('input#item2-check-prsubtotal').attr( 'checked', false );
    }

    htmlITME2 += `<tr name="item2-fila-${i+1}">`;
    htmlITME2 += `<td><div>${lengthITEM1 + i + 1}</div></td>`;
    htmlITME2 += `<td style="display:none"><span>${arrITEM2[i].idcotdet}</span></td>>`;
    htmlITME2 += `<td><div>${arrITEM2[i].codigo}</div></td>>`;
    htmlITME2 += `<td><div>${arrITEM2[i].marca} ${arrITEM2[i].modelo}</div></td>>`;
    htmlITME2 += `<td><div>${arrITEM2[i].descripcion}</div></td>>`;
    htmlITME2 += `<td><div class="item2-cantidad">${arrITEM2[i].cantidad}</div></td>>`;
    htmlITME2 += `<td><div class="item2-prunitario">${preciounitario}</div></td>>`;
    htmlITME2 += `<td><div class="item2-prsubtotal">${preciosubtotal}</div></td>>`;
    htmlITME2 += `</tr>`;
}
//LLENADO DE ITEM3
for(let i = 0; i < lengthITEM3; ++i){
    $.each(arrITEM3[i], function(key, value){
        if(value === null){
            arrITEM3[i][key] = '';
        }
    });

    let preciounitario = '';
    let preciosubtotal = '';

    if(arrITEM3[i].punitvisible === '1'){
        preciounitario = `<div class="moneda">${arrITEM3[i].preciounitario}</div>`;

        $('input#item3-check-prunitario').attr( 'checked', true );
    }
    else{
        preciounitario = '<div class="sinmoneda">INCLUIDO</div>';
        $('input#item3-check-prunitario').attr( 'checked', false );
    }

    if(arrITEM3[i].pstotalvisible === '1'){
        preciosubtotal =  `<div class="moneda">${arrITEM3[i].preciosubtotal}</div>`;
        $('input#item3-check-prsubtotal').attr( 'checked', true );
    }
    else{
        preciosubtotal = '<div class="sinmoneda">SUB TOTAL</div>';
        totalITEM3 = true;
        $('input#item3-check-prsubtotal').attr( 'checked', false );
    }

    htmlITME3 += `<tr name="item3-fila-${i+1}">`;
    htmlITME3 += `<td><div>${lengthITEM1 + lengthITEM2 + i+1}</div></td>`;
    htmlITME3 += `<td style="display:none"><span>${arrITEM3[i].idcotdet}</span></td>>`;
    htmlITME3 += `<td><div>${arrITEM3[i].codigo}</div></td>>`;
    htmlITME3 += `<td><div>${arrITEM3[i].marca} ${arrITEM3[i].modelo}</div></td>>`;
    htmlITME3 += `<td><div>${arrITEM3[i].descripcion}</div></td>>`;
    htmlITME3 += `<td><div class="item3-cantidad">${arrITEM3[i].cantidad}</div></td>>`;
    htmlITME3 += `<td><div class="item3-prunitario">${preciounitario}</div></td>>`;
    htmlITME3 += `<td><div class="item3-prsubtotal">${preciosubtotal}</div></td>>`;
    htmlITME3 += `</tr>`;
}

//CABECERA
for(let i = 0; i < lengthCabecera; ++i){
    $.each(arrCabecera[i], function(key, value){
        if(value === null){
            arrCabecera[i][key] = '';
        }
    });
}


//LLENADO DEL TOTAL
htmlPieTabla += `<tr>`;
htmlPieTabla += `<td colspan="5"></td>`;
htmlPieTabla += `<td class="reporte-ger-resaltar"><div>TOTAL</div></td>`;
htmlPieTabla += `<td class="reporte-ger-resaltar-sec"><div class="moneda">${arrCabecera[0].preciototal}</div></td>`;
htmlPieTabla += `</tr>`;
//FIN DE LLENADO DE TABLA REPORTE


//LLENADO DE LA TABLA CABECERA
htmlTabCab += `<tr style="border-top: 1px solid black"><td class="reporte-ger-tabla-cabecera">RUC: 20601857601</td></tr>`;
htmlTabCab += `<tr><td class="reporte-ger-tabla-cabecera">RNP: ${arrCabecera[0].rnp}</td></tr>`;
htmlTabCab += `<tr><td class="reporte-ger-tabla-cabecera reporte-ger-color-primary">COTIZACION</td></tr>`;
htmlTabCab += `<tr><td class="reporte-ger-tabla-cabecera">${arrCabecera[0].codigocotizacion}</td></tr>`;
//LLENADO DE LOS DATOS DEL CLIENTE
htmlDatosCli += `<div class="reporte-ger-sub" style="margin:.2rem">DATOS DEL CLIENTE</div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">Razón Social:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].razonsocial}</div></div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">Dirección:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].direccion}</div></div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">RUC:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].ruc}</div></div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">Teléfono:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].telefono}</div></div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">Atención:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].atencion}</div></div>`;
htmlDatosCli += `<div class="grid-x"><div class="cell large-4 reporte-ger-color-primary">Email:</div>`;
htmlDatosCli += `<div class="cell large-8 reporte-ger-color-black">${arrCabecera[0].email}</div></div>`;
//LLENADO DE LOS DATOS DE LA COTIZACION
htmlDatosCot += `<div class="reporte-ger-sub" style="margin:.2rem">DATOS DE COTIZACION</div>`;
htmlDatosCot += `<div class="grid-x"><div class="cell large-5 reporte-ger-color-primary">Fecha de Emisión:</div>`;
htmlDatosCot += `<div class="cell large-7 reporte-ger-color-black">${arrCabecera[0].fechaemision}</div></div>`;
htmlDatosCot += `<div class="grid-x"><div class="cell large-5 reporte-ger-color-primary">Tiempo de Entrega:</div>`;
htmlDatosCot += `<div class="cell large-7 reporte-ger-color-black">${arrCabecera[0].tiempoentrega}</div></div>`;
htmlDatosCot += `<div class="grid-x"><div class="cell large-5 reporte-ger-color-primary">Validez de Oferta:</div>`;
htmlDatosCot += `<div class="cell large-7 reporte-ger-color-black">${arrCabecera[0].validezoferta}</div></div>`;
htmlDatosCot += `<div class="grid-x"><div class="cell large-5 reporte-ger-color-primary">Lugar de Entrega:</div>`;
htmlDatosCot += `<div class="cell large-7 reporte-ger-color-black">${arrCabecera[0].lugarentrega}</div></div>`;
htmlDatosCot += `<div class="grid-x"><div class="cell large-5 reporte-ger-color-primary">Condiciones de Pago:</div>`;
htmlDatosCot += `<div class="cell large-7 reporte-ger-color-black">${arrCabecera[0].condicionespago}</div></div>`;
//LLENADO DEL MEMO
let condiciones = arrCabecera[0].condicionescomerciales;
condiciones = condiciones.replace(/\n/g,'<br />');
htmlMemo += `<div class="reporte-ger-color-primary">CONDICIONES COMERCIALES</div>`;
htmlMemo += `<div style="font-size:8px; margin-top:.1rem">${condiciones}</div>`;
htmlMemo += `<div class="reporte-ger-color-black">Solo se aceptarán pagos mediante depósito o transferencia a nuestras cuentas bancarias</div>`;
htmlMemo += `<div class="reporte-ger-color-black" style="font-style:italic;color:#D34539">Cuenta Corrientes en el Banco Continental BBVA.</div>`;
htmlMemo += `<div class="reporte-ger-color-black">Soles S/. 0011 - 0258 - 0100144809</div>`;
htmlMemo += `<div class="reporte-ger-color-black">Atte.</div>`;




//INSERCION CABECERA
$('#tabla-cabecera').html(htmlTabCab);

//INSERCION DATOS
$('#reporte-ger-datos-cliente').html(htmlDatosCli);
$('#reporte-ger-datos-cotizacion').html(htmlDatosCot);

//INSERCION TABLA
$('thead').prepend(`<tr class="reporte-ger-color-primary"><th colspan="7"><div>${arrCabecera[0].nomsolucion}</div></th></tr>`);
$('#reporte-ger-ITEM1').append(htmlITME1);
$('#reporte-ger-ITEM2').append(htmlITME2);
$('#reporte-ger-ITEM3').append(htmlITME3).append(htmlPieTabla);

$('tbody#reporte-ger-ITEM1').find('tr[name=item1-fila-1]').append(`<td rowspan="${lengthITEM1}" class="reporte-ger-ocultar item1-prtotal reporte-ger-totales" style="vertical-align:middle"><div class="moneda">${arrCabecera[0].precioItem1}</div></td>`);
$('tbody#reporte-ger-ITEM2').find('tr[name=item2-fila-1]').append(`<td rowspan="${lengthITEM2}" class="reporte-ger-ocultar item2-prtotal reporte-ger-totales" style="vertical-align:middle"><div class="moneda">${arrCabecera[0].precioItem2}</div></td>`);
$('tbody#reporte-ger-ITEM3').find('tr[name=item3-fila-1]').append(`<td rowspan="${lengthITEM3}" class="reporte-ger-ocultar item3-prtotal reporte-ger-totales" style="vertical-align:middle"><div class="moneda">${arrCabecera[0].precioItem3}</div></td>`);
// // style="vertical-align:middle;text-align:center"

//INSERCION MEMO
$('#reporte-ger-memo').html(htmlMemo);

//INSERCION PIE DE PAGINA
$('#reporte-ger-piepagina').offset({top:760,left:35});
// $('button#boton-reporte-ger').offset({top:50,left:200});

if(totalITEM1){
    $('tbody#reporte-ger-ITEM1')
        .find('.item1-prtotal').show().closest('tbody')
        .find('.item1-prsubtotal').closest('td').hide();
}
if(totalITEM2){
    $('tbody#reporte-ger-ITEM2')
        .find('.item2-prtotal').show().closest('tbody')
        .find('.item2-prsubtotal').closest('td').hide();
}
if(totalITEM3){
    $('tbody#reporte-ger-ITEM3')
        .find('.item3-prtotal').show().closest('tbody')
        .find('.item3-prsubtotal').closest('td').hide();
}




$('tbody#reporte-ger-ITEM1')
    .find('input#item1-check-prunitario').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item1-prunitario').each(function(){
            $(this).html('PRECIO');

        });
    }
    else{
        $(this).closest('tbody').find('.item1-prunitario').each(function(){
            for(let i = 0; i < lengthITEM1; ++i){
                $(this).html('INCLUIDO');
            }
        });
    }
}).closest('tbody')
    .find('input#item1-check-prsubtotal').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item1-prtotal').hide();
        $(this).closest('tbody').find('.item1-prsubtotal').closest('td').show();

    }
    else{
        $(this).closest('tbody').find('.item1-prtotal').show();
        $(this).closest('tbody').find('.item1-prsubtotal').closest('td').hide();
    }
});

$('tbody#reporte-ger-ITEM2')
    .find('input#item2-check-prunitario').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item2-prunitario').each(function(){
            $(this).html('PRECIO');

        });
    }
    else{
        $(this).closest('tbody').find('.item2-prunitario').each(function(){
            for(let i = 0; i < lengthITEM2; ++i){
                $(this).html('INCLUIDO');
            }
        });
    }
}).closest('tbody')
    .find('input#item2-check-prsubtotal').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item2-prtotal').hide();
        $(this).closest('tbody').find('.item2-prsubtotal').closest('td').show();

    }
    else{
        $(this).closest('tbody').find('.item2-prtotal').show();
        $(this).closest('tbody').find('.item2-prsubtotal').closest('td').hide();
    }
});

$('tbody#reporte-ger-ITEM3')
    .find('input#item3-check-prunitario').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item3-prunitario').each(function(){
            $(this).html('PRECIO');

        });
    }
    else{
        $(this).closest('tbody').find('.item3-prunitario').each(function(){
            for(let i = 0; i < lengthITEM3; ++i){
                $(this).html('INCLUIDO');
            }
        });
    }
}).closest('tbody')
    .find('input#item3-check-prsubtotal').on('change', function(){
    if(this.checked){
        $(this).closest('tbody').find('.item3-prtotal').hide();
        $(this).closest('tbody').find('.item3-prsubtotal').closest('td').show();

    }
    else{
        $(this).closest('tbody').find('.item3-prtotal').show();
        $(this).closest('tbody').find('.item3-prsubtotal').closest('td').hide();
    }
});




$(document).ready(function() {
    GenerarRerporteGer();
    Remover();
});

function GuardarRerporteGer() {
    let jsonGuardar = {};
    let arrGuardar = [];

    $('tbody#reporte-ger-ITEM1').find('tr[name ^= item1-fila]').each(function(){
        let jsonItem = {};
        jsonItem.cod1 = parseInt($(this).find('span').html());
        $('input#item1-check-prunitario').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod20 = "1";
            }
            else{
                jsonItem.cod20 = "0";
            }
        });
        $('input#item1-check-prsubtotal').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod21 = "1";
            }
            else{
                jsonItem.cod21 = "0";
            }
        });
        arrGuardar.push(jsonItem);
    });
    $('tbody#reporte-ger-ITEM2').find('tr[name ^= item2-fila]').each(function(){
        let jsonItem = {};
        jsonItem.cod1 = parseInt($(this).find('span').html());
        $('input#item2-check-prunitario').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod20 = "1";
            }
            else{
                jsonItem.cod20 = "0";
            }
        });
        $('input#item2-check-prsubtotal').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod21 = "1";
            }
            else{
                jsonItem.cod21 = "0";
            }
        });
        arrGuardar.push(jsonItem);
    });
    $('tbody#reporte-ger-ITEM3').find('tr[name ^= item3-fila]').each(function(){
        let jsonItem = {};
        jsonItem.cod1 = parseInt($(this).find('span').html());
        $('input#item3-check-prunitario').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod20 = "1";
            }
            else{
                jsonItem.cod20 = "0";
            }
        });
        $('input#item3-check-prsubtotal').each(function(){
            if($(this).is(':checked')){
                jsonItem.cod21 = "1";
            }
            else{
                jsonItem.cod21 = "0";
            }
        });
        arrGuardar.push(jsonItem);
    });

    jsonGuardar.cod = arrGuardar;
    console.log('jsonGuardar');
    console.log(jsonGuardar);


    $.ajax({
        method: "POST",
        async: false,
        url: "/reporte-gers/GuardarRerporteGer",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardar),
        success: function resultado(valor) {
            console.log('valor');
            console.log(valor);

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}



function GenerarRerporteGer() {
    // GuardarRerporteGer();
    Limpiar();
    var pdf = new jsPDF('p', 'pt', 'a4');
    var canvas = pdf.canvas;
    canvas.height = 842;
    canvas.width=595;
    html2pdf(document.body, pdf, function(pdf) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('style','position:absolute;right:0; top:0; bottom:0; height:222mm; width:200mm');
            document.body.appendChild(iframe);
            iframe.src = pdf.output('datauristring');

            // const valor = pdf.output('datauristring');
            // $.post(iframe.src, function(htmlexterno){
            //     $('#reporte-ger-pdf').append(htmlexterno);
            // });


        }
    );
    Remover();
}




function Limpiar() {
    $('input[type=checkbox]').each(function(){
        $(this).addClass('ocultar');
        // if($(this).is(':checked')){
        //     $(this).closest('tr').addClass('ocultar');
        // }
    });
    $('button[class=boton-reporte-ger]').addClass('ocultar');
}
function Remover() {
    $('.ocultar').removeClass('ocultar');
}



