var setCotizacion = true;

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
                    if(arrayData[i].fecharegistro_sol === null){arrayData[i].fecharegistro_sol = 'No registrado';}
                    if(arrayData[i].fecharegistro_rq === null){
                        arrayData[i].fecharegistro_rq = 'No registrado';
                    }
                    else{
                        arrayData[i].fecharegistro_rq = arrayData[i].fecharegistro_rq.substr(0,10);
                    }
                    html += `<tr name="cotizacion-requerimiento">`;
                    html += `<td><div style="width: 5px"><span name="spn-proyecto-num" class="text-center">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-proyecto-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-proyecto-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 180px"><span name="spn-proyecto-nomreq" class="text-center" />${arrayData[i].requerimiento}</div></td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-regreq" class="text-center" /></div>${arrayData[i].fecharegistro_rq}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nomsol" class="text-center" /></div>${arrayData[i].cotizacion}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-inisol" class="text-center" /></div>${arrayData[i].fecharegistro_sol}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nompro" class="text-center" /></div>${arrayData[i].nomproyecto}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nomemp" class="text-center" /></div>${arrayData[i].nomempresa}</td>`;
                    html += `</tr>`;
                }

                $('tbody[name=tbody-cotizacion-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-proyecto-idreq]').text();
                        isolSolucion = $(this).find('span[name=spn-proyecto-idsol]').text();
                        let ab = isolSolucion;
                        // SesionSolucion(isolSolucion);

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
                                $('.spn-cotizacion-emp').html(`EMPRESA: ${arrayData[i].nomempresa}`);
                                $('.spn-cotizacion-pro').html(`PROYECTO: ${arrayData[i].nomproyecto}`);
                                $('.spn-cotizacion-req').html(`REQUERIMIENTO: ${arrayData[i].requerimiento}`);
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



function AddSetCotizacion() {

    if(setCotizacion){
        console.log('mServicioCot');
        console.log(mServicioCot);
        console.log('mEquipoCot');
        console.log(mEquipoCot);


        menuNivel3.push(`<li><a id='menu-tab__${mEquipoCot.idmenu}' class='tab'><span>${mEquipoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        menuNivel3.push(`<li><a id='menu-tab__${mServicioCot.idmenu}' class='tab'><span>${mServicioCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        menuNivel3.push(`<li><a id='menu-tab__${mViaticoCot.idmenu}' class='tab'><span>${mViaticoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        $('#tabBar').html(menuNivel3);

        $('#main')
            .append(`<div id='panel__${mEquipoCot.idmenu}' class="ocultar"></div>`)
            .append(`<div id='panel__${mServicioCot.idmenu}' class="ocultar"></div>`)
            .append(`<div id='panel__${mViaticoCot.idmenu}' class="ocultar"></div>`);

        $.post(mEquipoCot.url, function (htmlExterno) {
            $('#panel__' + mEquipoCot.idmenu).html(htmlExterno);
        });
        $.post(mServicioCot.url, function (htmlExterno) {
            $('#panel__' + mServicioCot.idmenu).html(htmlExterno);
        });
        $.post(mViaticoCot.url, function (htmlExterno) {
            $('#panel__' + mViaticoCot.idmenu).html(htmlExterno);
        });
        setCotizacion = false;
    }
    $('#menu-tab__' + icotJson).addClass('tab-active');



}










