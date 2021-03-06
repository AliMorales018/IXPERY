var ireqSolucion;
var isolSolucion;
var jsonGuardarSolucion = {};
var arrSolucion = [];

var modSolPend;

$(document).ready(function(){
    $('select[name="cmb-solucion-enc"]')
        .select2({
            ajax: {
                url: "/solucion/BuscarEmpleado",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        value: params.term
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    $.each(data.epl, function(i, d) {
                        data.epl[i]['id'] = d.epl1;
                        data.epl[i]['text'] = d.epl4 + " " + d.epl5 + " " + d.epl6;
                    });
                    return {
                        results: data.epl,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empleado . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatEmpleado,
        });

    $('#cmb-solucion-req')
        .select2({
            ajax: {
                url: "/solucion/BuscarRequerimiento",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        value: params.term
                    };
                },
                processResults: function (data) {
                    console.log('BuscarRequerimiento');
                    console.log(data);
                    $.each(data.items, function(i, d) {
                        data.items[i]['id'] = d.idreq;
                    });

                    return {
                        results: data.items,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empresa . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatReqProEmp,
            templateSelection: FormatReportReqProEmp

        });

});


function BuscarSolucion(sol) {
    $.ajax({
        method: "POST",
        url: "/solucion/BuscarSolucion",
        data: {"sol":sol},
        success: function (data) {
            if (data !== "0") {
                console.log('BuscarSolucion');
                console.log(data);
                JSONpro = JSON.parse(data);
                let arrayData = JSONpro.sol;
                const length = arrayData.length;
                $('input[name="txt-solucion-nom"]').val(arrayData[0].sol3);
                $('input[name="txt-solucion-fch"]').val(arrayData[0].sol6);
                $('select[name="cmb-solucion-enc"]').html(new Option(arrayData[0].sol5,'1',true,true));
                $('textarea[name="tar-solucion-des"]').val(arrayData[0].sol4);
            }
            else {
                LimpiarCampos();
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

}











function BuscarRequerimientos() {
    $.ajax({
        method: "POST",
        url: "/solucion/BuscarRequerimientos",
        success: function (data) {
            if (data !== "0") {
                modSolPend = "1";
                console.log('BuscarRequerimientos');
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
                    html += `<tr name="solucion-requerimiento">`;
                    html += `<td><div style="width: 5px"><span name="spn-proyecto-num" class="text-center">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-proyecto-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-proyecto-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 180px"><span name="spn-proyecto-nomreq" class="text-center" />${arrayData[i].requerimiento}</div></td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-regreq" class="text-center" /></div>${arrayData[i].fecharegistro_rq}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nomsol" class="text-center" /></div>${arrayData[i].solucion}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-inisol" class="text-center" /></div>${arrayData[i].fecharegistro_sol}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nompro" class="text-center" /></div>${arrayData[i].nomproyecto}</td>`;
                    html += `<td><div style="width: 150px"><span name="spn-proyecto-nomemp" class="text-center" /></div>${arrayData[i].nomempresa}</td>`;
                    html += `</tr>`;
                }

                $('tbody[name=tbody-solucion-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-proyecto-idreq]').text();
                        isolSolucion = $(this).find('span[name=spn-proyecto-idsol]').text();
                        let ab = isolSolucion;
                        SesionSolucion(isolSolucion);

                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    $('input[name="txt-solucion-nom"]').val(arrayData[i].solucion);
                                    $('input[name="txt-solucion-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-solucion-enc"]').html(new Option('soli','1',true,true));
                                    $('textarea[name="tar-solucion-des"]').val('descripcion');
                                }
                                else{
                                    LimpiarCampos();
                                }
                                $('.spn-solucion-emp').html(`EMPRESA: ${arrayData[i].nomempresa}`);
                                $('.spn-solucion-pro').html(`PROYECTO: ${arrayData[i].nomproyecto}`);
                                $('.spn-solucion-req').html(`REQUERIMIENTO: ${arrayData[i].requerimiento}`);
                            }
                        }

                    });

            }
            else {
                // $('#cmb-proyecto-est').html('<option>No se encontraron registros</option>');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}


function GuardarSolucion(){
    let rowInsertSolucion = {};
    let objSolReq = {};

    console.log('ireqSolucion');
    console.log(ireqSolucion);
    console.log('isolSolucion');
    console.log(isolSolucion);

    if(isolSolucion === '0'){

        let fchSol = $('input[name="txt-solucion-fch"]').val();

        objSolReq.req1 = parseInt(ireqSolucion);
        rowInsertSolucion.sol1 = 0;
        rowInsertSolucion.sol2 = objSolReq;
        rowInsertSolucion.sol3 = $('input[name="txt-solucion-nom"]').val();
        rowInsertSolucion.sol4 = $('textarea[name="tar-solucion-des"]').val();
        rowInsertSolucion.sol5 = $('select[name="cmb-solucion-enc"]').text();

        if(fchSol !== ''){
            rowInsertSolucion.sol6 = fchSol;
        }

        arrSolucion.push(rowInsertSolucion);
        jsonGuardarSolucion.sol = arrSolucion;

        console.log('jsonGuardarSolucion');
        console.log(jsonGuardarSolucion);

        $.ajax({
            method: "POST",
            url: "/solucion/GuardarSolucion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonGuardarSolucion),
            success: function resultado(valor) {
                if (valor === "0") {
                    alert("La solución fue guardada correctamente.");
                    LimpiarCampos();
                    LimpiarVariables();
                    if(modSolPend === '1'){
                        BuscarRequerimientos();
                    }
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
    else {
        let fchSol = $('input[name="txt-solucion-fch"]').val();

        objSolReq.req1 = parseInt(ireqSolucion);
        rowInsertSolucion.sol1 = parseInt(isolSolucion);
        rowInsertSolucion.sol2 = objSolReq;
        rowInsertSolucion.sol3 = $('input[name="txt-solucion-nom"]').val();
        rowInsertSolucion.sol4 = $('textarea[name="tar-solucion-des"]').val();
        rowInsertSolucion.sol5 = $('select[name="cmb-solucion-enc"]').text();

        if(fchSol !== ''){
            rowInsertSolucion.sol6 = fchSol;
        }

        arrSolucion.push(rowInsertSolucion);
        jsonGuardarSolucion.sol = arrSolucion;

        console.log('jsonGuardarSolucion');
        console.log(jsonGuardarSolucion);

        $.ajax({
            method: "POST",
            url: "/solucion/GuardarSolucion",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(jsonGuardarSolucion),
            success: function resultado(valor) {
                if (valor === "0") {
                    alert("La solución fue guardada correctamente.");
                    LimpiarCampos();
                    LimpiarVariables();
                    if(modSolPend === '1'){
                        BuscarRequerimientos();
                    }
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


}


function EliminarSolucion() {
    let rowDeleteSolucion = {};

    rowDeleteSolucion.sol1 = parseInt(isolSolucion);
    rowDeleteSolucion.sol10 = '0';

    arrSolucion.push(rowDeleteSolucion);
    jsonGuardarSolucion.sol = arrSolucion;

    $.ajax({
        method: "POST",
        url: "/solucion/GuardarSolucion",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarSolucion),
        success: function resultado(valor) {
            if (valor === "0") {
                alert("La solución ha sido eliminada.");
                LimpiarCampos();
                LimpiarVariables();
                if(modSolPend === '1'){
                    BuscarRequerimientos();
                }
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


function SesionSolucion(sol) {
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





function LimpiarCampos() {

    $('input[name="txt-solucion-nom"]').val("");
    $('input[name="txt-solucion-fch"]').val("");
    $('select[name="cmb-solucion-enc"]').html("");
    $('textarea[name="tar-solucion-des"]').val("");
}

function LimpiarVariables() {
    ireqSolucion = '';
    isolSolucion = '';
    jsonGuardarSolucion = {};
    arrSolucion = [];
}


//****************************************************************************//
//***************************** Formatos Select2 *****************************//
//****************************************************************************//

function FormatEmpleado (repo) {
    if (repo.loading) {
        return repo.text;
    }
    let markup = `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Nombre: ${repo.epl4} ${repo.epl5} ${repo.epl6}</div>`+
        `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>DNI: ${repo.epl3}</div>`;
    return markup;
}

function FormatReqProEmp (repo) {
    if (repo.loading) {
        return repo.text;
    }
    let markup = `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Empresa: ${repo.nomempresa}</div>`+
        `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Proyecto: ${repo.nomproyecto}</div>`+
        `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Requerimiento: ${repo.requerimiento}</div>`;
    return markup;
}


function FormatReportReqProEmp (repo) {
    if(repo.nomempresa !== undefined){
        $('.spn-solucion-emp').html(`EMPRESA: ${repo.nomempresa}`);
        $('.spn-solucion-pro').html(`PROYECTO: ${repo.nomproyecto}`);
        $('.spn-solucion-req').html(`REQUERIMIENTO: ${repo.requerimiento}`);
        ireqSolucion = repo.idreq;
        isolSolucion = repo.idsol;
        SesionSolucion(isolSolucion);
    }
    return  repo.text || repo.nomempresa + ' - ' + repo.nomproyecto  + ' - ' + repo.requerimiento ;
}
