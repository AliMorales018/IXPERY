var setCotizacion = true;
var countsc = 0;
var isolCotizacion;


$(document).ready(function(){
    BuscarSolucionesPendientes();


});

function BuscarSolucionesPendientes(){
    $.ajax({
        method: "POST",
        url: "/cotizacion/BuscarSolucionesPendientes",
        success: function (data) {
            if (data !== "0") {
                modSolPend = "1";
                console.log('BuscarSolucionesPendientes');
                console.log(data);
                JSONpro = JSON.parse(data);
                let arrayData = JSONpro.items;
                const length = arrayData.length;
                let html = '';
                for (let i = 0; i < length; ++i) {
                    if(arrayData[i].fecharegistro_sol === null){arrayData[i].fecharegistro_sol = 'NO REGISTRADO';}
                    if(arrayData[i].fecharegistro_rq === null){
                        arrayData[i].fecharegistro_rq = 'NO REGISTRADO';
                    }
                    else{
                        arrayData[i].fecharegistro_rq = arrayData[i].fecharegistro_rq.substr(0,10);
                    }

                    html += `<tr name="cotizacion-requerimiento">`;
                    html += `<td><div style="width: 15px" class="text-span"><span name="spn-cotizacion-num">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-cotizacion-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-cotizacion-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-cotizacion-nomreq">${arrayData[i].requerimiento}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-cotizacion-regreq">${arrayData[i].fecharegistro_rq}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-cotizacion-nomsol">${arrayData[i].solucion}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-cotizacion-inisol">${arrayData[i].fecharegistro_sol}</span></div></td>`;
                    html += `<td><div style="width: 200px" class="text-span"><span name="spn-cotizacion-nompro">${arrayData[i].nomproyecto}</span></div></td>`;
                    html += `<td><div style="width: 150px" class="text-span"><span name="spn-cotizacion-nomemp">${arrayData[i].nomempresa}</span></div></td>`;
                    html += `</tr>`;
                }
                $('thead#thead-cotizacion-requerimientos').show();
                $('tbody[name=tbody-cotizacion-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-cotizacion-idreq]').text();
                        isolCotizacion = $(this).find('span[name=spn-cotizacion-idsol]').text();
                        SesionSolucionCot(isolCotizacion);
                        console.log("session");
                        console.log(isolCotizacion);
                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    $('input[name="txt-cotizacion-nom"]').val(arrayData[i].cotizacion);
                                    $('input[name="txt-cotizacion-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-cotizacion-enc"]').html(new Option('soli','1',true,true));
                                    $('textarea[name="tar-cotizacion-des"]').val('descripcion');
                                }
                                else{
                                    // LimpiarCampos();
                                }
                                $('.spn-cotizacion-emp').html(`<span style="font-size:14px">${arrayData[i].nomempresa}</span>`);
                                $('.spn-cotizacion-pro').html(`<span style="font-size:14px">${arrayData[i].nomproyecto}</span>`);
                                $('.spn-cotizacion-req').html(`<span style="font-size:12px">${arrayData[i].requerimiento}</span>`);
                            }
                        }
                        AddSetCotizacion();

                    });

            }
            else {
                alert('No se encontraron cotizaciones pendientes');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}



function EnviarSolucionOperaciones(){
    let jsonGuardarCotizacion = {};
    let arrCotizacion = [];
    let rowInsertCotizacion = {};


    console.log('ireqSolucion');
    console.log(ireqSolucion);
    console.log('isolCotizacion');
    console.log(isolCotizacion);

    if(isolCotizacion !== '0'){
        rowInsertCotizacion.sol1 = parseInt(isolCotizacion);
        rowInsertCotizacion.sol16 = '1';
        rowInsertCotizacion.sol17 = '1';

        arrCotizacion.push(rowInsertCotizacion);
        jsonGuardarCotizacion.sol = arrCotizacion;

        console.log('jsonGuardarCotizacion');
        console.log(jsonGuardarCotizacion);

        $.ajax({
            method: "POST",
            async: false,
            url: "/solucion/GuardarSolucion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonGuardarCotizacion),
            success: function resultado(valor) {
                if (valor === "0") {
                    alert("La solución fue enviada a operaciones.");
                    // LimpiarCampos();
                    // LimpiarVariables();
                    BuscarSolucionesPendientes();
                    LimpiarCamposCot();
                }
                else {
                    alert("Error en la red. No se han guardado cambios.");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });

    }
    LimpiarSetCotizacion();
}

function LimpiarCamposCot() {
    $('.spn-cotizacion-emp').html('');
    $('.spn-cotizacion-pro').html('');
    $('.spn-cotizacion-req').html('');
}


function AddSetCotizacion() {

    if(setCotizacion){
        menuNivel3.push(`<li><a id='menu-tab__${mEquipoCot.idmenu}' class='tab'><span>${mEquipoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        // menuNivel3.push(`<li><a id='menu-tab__${mServicioCot.idmenu}' class='tab'><span>${mServicioCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        menuNivel3.push(`<li><a id='menu-tab__${mViaticoCot.idmenu}' class='tab'><span>${mViaticoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        $('#tabBar').html(menuNivel3);

        $('#main')
            .append(`<div id='panel__${mEquipoCot.idmenu}' class="ocultar"></div>`)
            // .append(`<div id='panel__${mServicioCot.idmenu}' class="ocultar"></div>`)
            .append(`<div id='panel__${mViaticoCot.idmenu}' class="ocultar"></div>`);

        $.post(mEquipoCot.url, function (htmlExterno) {
            $('#panel__' + mEquipoCot.idmenu).html(htmlExterno);
        });
        // $.post(mServicioCot.url, function (htmlExterno) {
        //     $('#panel__' + mServicioCot.idmenu).html(htmlExterno);
        // });
        $.post(mViaticoCot.url, function (htmlExterno) {
            $('#panel__' + mViaticoCot.idmenu).html(htmlExterno);
        });
        setCotizacion = false;
    }
    $('#menu-tab__' + icotJson).addClass('tab-active');

    if(countsc !== 0){
        console.log('entre');
        BuscarSesionSol();
        // BuscarServicioCotizacion();
        BuscarOtroServicio();
    }

}




function SesionSolucionCot(sol) {
    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/SesionSolucion",
        data: {"sol": sol},
        success: function(valor) {
            // alert("La sesion de solucion es: " + valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

}




function LimpiarSetCotizacion() {
    let i;
    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mEquipoCot.idmenu}' class='tab'><span>${mEquipoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i1');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mEquipoCot.idmenu}`).remove();
        $('#panel__' + mEquipoCot.idmenu).remove();
        menuNivel3.splice(i,1);
    }

    // i = menuNivel3.indexOf(`<li><a id='menu-tab__${mServicioCot.idmenu}' class='tab'><span>${mServicioCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    // console.log('i2');
    // console.log(i);
    // if(i > 0){
    //     $('#tabBar').find(`a#menu-tab__${mServicioCot.idmenu}`).remove();
    //     $('#panel__' + mServicioCot.idmenu).remove();
    //     menuNivel3.splice(i,1);
    // }

    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mViaticoCot.idmenu}' class='tab'><span>${mViaticoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i3');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mViaticoCot.idmenu}`).remove();
        $('#panel__' + mViaticoCot.idmenu).remove();
        menuNivel3.splice(i,1);
        setCotizacion = true;
    }

}
