var setFinalizar = true;
var countsc = 0;
var isolFinalizar;


$(document).ready(function(){
    BuscarSolucionesAprobadas();


});

function BuscarSolucionesAprobadas(){
    $.ajax({
        method: "POST",
        url: "/finalizar/BuscarSolucionesAprobadas",
        success: function (data) {
            if (data !== "0") {
                modSolPend = "1";
                console.log('BuscarSolucionesAprobadas');
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

                    html += `<tr name="finalizar-requerimiento">`;
                    html += `<td><div style="width: 15px" class="text-span"><span name="spn-finalizar-num">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-finalizar-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-finalizar-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-finalizar-nomreq">${arrayData[i].requerimiento}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-finalizar-regreq">${arrayData[i].fecharegistro_rq}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-finalizar-nomsol">${arrayData[i].solucion}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-finalizar-inisol">${arrayData[i].fecharegistro_sol}</span></div></td>`;
                    html += `<td><div style="width: 200px" class="text-span"><span name="spn-finalizar-nompro">${arrayData[i].nomproyecto}</span></div></td>`;
                    html += `<td><div style="width: 150px" class="text-span"><span name="spn-finalizar-nomemp">${arrayData[i].nomempresa}</span></div></td>`;
                    html += `</tr>`;
                }
                $('thead#thead-finalizar-requerimientos').show();
                $('tbody[name=tbody-finalizar-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-finalizar-idreq]').text();
                        isolFinalizar = $(this).find('span[name=spn-finalizar-idsol]').text();
                        SesionSolucionAprobado(isolFinalizar);
                        console.log("session");
                        console.log(isolFinalizar);
                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    $('input[name="txt-finalizar-nom"]').val(arrayData[i].finalizar);
                                    $('input[name="txt-finalizar-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-finalizar-enc"]').html(new Option('soli','1',true,true));
                                    $('textarea[name="tar-finalizar-des"]').val('descripcion');
                                }
                                else{
                                    // LimpiarCampos();
                                }
                                $('.spn-finalizar-emp').html(`<span style="font-size:14px">${arrayData[i].nomempresa}</span>`);
                                $('.spn-finalizar-pro').html(`<span style="font-size:14px">${arrayData[i].nomproyecto}</span>`);
                                $('.spn-finalizar-req').html(`<span style="font-size:12px">${arrayData[i].requerimiento}</span>`);
                            }
                        }
                    });

            }
            else {
                alert('No se encontraron finalizares pendientes');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}





function LimpiarCamposCot() {
    $('.spn-finalizar-emp').html('');
    $('.spn-finalizar-pro').html('');
    $('.spn-finalizar-req').html('');
}




function SesionSolucionAprobado(sol) {
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










function AbrirReporte() {

    window.open('/reportes/ReporteOperaciones');
    // $.ajax({
    //     method: "POST",
    //     url: "/reporteoperaciones",
    //     success: function resultado(valor) {
    //         console.log(valor);
    //         // alert('reporte');
    //
    //     },
    //     error: function errores(msg) {
    //         alert('Error: ' + msg.responseText);
    //     }
    // });

}











