var setGerencia = true;
var countsc = 0;
var isolGerencia;


$(document).ready(function(){
    BuscarSolucionesAprobadas();


});

function BuscarSolucionesAprobadas(){
    $.ajax({
        method: "POST",
        url: "/gerencia/BuscarSolucionesAprobadas",
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

                    html += `<tr name="gerencia-requerimiento">`;
                    html += `<td><div style="width: 15px" class="text-span"><span name="spn-gerencia-num">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-gerencia-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-gerencia-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-gerencia-nomreq">${arrayData[i].requerimiento}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-gerencia-regreq">${arrayData[i].fecharegistro_rq}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-gerencia-nomsol">${arrayData[i].solucion}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-gerencia-inisol">${arrayData[i].fecharegistro_sol}</span></div></td>`;
                    html += `<td><div style="width: 200px" class="text-span"><span name="spn-gerencia-nompro">${arrayData[i].nomproyecto}</span></div></td>`;
                    html += `<td><div style="width: 150px" class="text-span"><span name="spn-gerencia-nomemp">${arrayData[i].nomempresa}</span></div></td>`;
                    html += `</tr>`;
                }
                $('thead#thead-gerencia-requerimientos').show();
                $('tbody[name=tbody-gerencia-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-gerencia-idreq]').text();
                        isolGerencia = $(this).find('span[name=spn-gerencia-idsol]').text();
                        SesionSolucionAprobado(isolGerencia);
                        console.log("session");
                        console.log(isolGerencia);
                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    $('input[name="txt-gerencia-nom"]').val(arrayData[i].gerencia);
                                    $('input[name="txt-gerencia-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-gerencia-enc"]').html(new Option('soli','1',true,true));
                                    $('textarea[name="tar-gerencia-des"]').val('descripcion');
                                }
                                else{
                                    // LimpiarCampos();
                                }
                                $('.spn-gerencia-emp').html(`<span style="font-size:14px">${arrayData[i].nomempresa}</span>`);
                                $('.spn-gerencia-pro').html(`<span style="font-size:14px">${arrayData[i].nomproyecto}</span>`);
                                $('.spn-gerencia-req').html(`<span style="font-size:12px">${arrayData[i].requerimiento}</span>`);
                            }
                        }
                    });

            }
            else {
                alert('No se encontraron gerenciaes pendientes');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}





function LimpiarCamposCot() {
    $('.spn-gerencia-emp').html('');
    $('.spn-gerencia-pro').html('');
    $('.spn-gerencia-req').html('');
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

    window.open('/reportes/ReporteGerencia');
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











