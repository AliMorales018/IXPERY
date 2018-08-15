var ireqSolucion;
var isolSolucion;
var jsonGuardarSolucion = {};
var arrSolucion = [];

var modSolPend;
var setSolucion = true;

var countss = 0;

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
                    if(arrayData[i].fecharegistro_sol === null){arrayData[i].fecharegistro_sol = 'NO REGISTRADO';}
                    if(arrayData[i].fecharegistro_rq === null){
                        arrayData[i].fecharegistro_rq = 'NO REGISTRADO';
                    }
                    else{
                        arrayData[i].fecharegistro_rq = arrayData[i].fecharegistro_rq.substr(0,10);
                    }
                    html += `<tr name="solucion-requerimiento">`;
                    html += `<td><div style="width: 15px" class="text-span"><span name="spn-proyecto-num">${i + 1}</span></div></td>`;
                    html += `<td style="display:none"><div><span name="spn-proyecto-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display:none"><div><span name="spn-proyecto-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-proyecto-nomreq">${arrayData[i].requerimiento}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-proyecto-regreq">${arrayData[i].fecharegistro_rq}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-proyecto-nomsol">${arrayData[i].solucion}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-proyecto-inisol">${arrayData[i].fecharegistro_sol}</span></div></td>`;
                    html += `<td><div style="width: 200px" class="text-span"><span name="spn-proyecto-nompro">${arrayData[i].nomproyecto}</span></div></td>`;
                    html += `<td><div style="width: 150px" class="text-span"><span name="spn-proyecto-nomemp">${arrayData[i].nomempresa}</span></div></td>`;
                    html += `</tr>`;
                }
                $('thead#thead-solucion-requerimientos').show();
                $('tbody[name=tbody-solucion-requerimientos]').html(html)
                    .on('click', 'tr', function(){
                        ireqSolucion = $(this).find('span[name=spn-proyecto-idreq]').text();
                        isolSolucion = $(this).find('span[name=spn-proyecto-idsol]').text();

                        console.log('isolSolucion');
                        console.log(isolSolucion);



                        SesionSolucion(isolSolucion);



                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    console.log('arrayData[i]');
                                    console.log(arrayData[i]);
                                    $('input[name="txt-solucion-nom"]').val(arrayData[i].solucion);
                                    $('input[name="txt-solucion-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-solucion-enc"]').html(new Option(arrayData[i].encargado,'1',true,true));
                                    $('textarea[name="tar-solucion-des"]').val(arrayData[i].descripcion);
                                }
                                else{
                                    LimpiarCampos();
                                }
                                $('.spn-solucion-emp').html(`EMPRESA: <span style="font-size:14px">${arrayData[i].nomempresa}</span>`);
                                $('.spn-solucion-pro').html(`PROYECTO: <span style="font-size:14px">${arrayData[i].nomproyecto}</span>`);
                                $('.spn-solucion-req').html(`REQUERIMIENTO: <span style="font-size:12px">${arrayData[i].requerimiento}</span>`);
                            }
                        }


                        if(isolSolucion !== '0'){
                            $('button#btn_enviar_solucion_cotizacion').show();
                            AddSetSolucion();
                        }
                        else{
                            LimpiarSetSolucion();
                            $('button#btn_enviar_solucion_cotizacion').hide();

                        }



                    });

            }
            else {
                //$('#cmb-proyecto-est').html('<option>No se encontraron registros</option>');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}


function AddSetSolucion() {

    if(setSolucion){
        menuNivel3.push(`<li><a id='menu-tab__${mEquipo.idmenu}' class='tab'><span>${mEquipo.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        menuNivel3.push(`<li><a id='menu-tab__${mServicio.idmenu}' class='tab'><span>${mServicio.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        menuNivel3.push(`<li><a id='menu-tab__${mViatico.idmenu}' class='tab'><span>${mViatico.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
        $('#tabBar').html(menuNivel3);

        $('#main')
            .append(`<div id='panel__${mEquipo.idmenu}' class="ocultar"></div>`)
            .append(`<div id='panel__${mServicio.idmenu}' class="ocultar"></div>`)
            .append(`<div id='panel__${mViatico.idmenu}' class="ocultar"></div>`);

        $.post(mEquipo.url, function (htmlExterno) {
            $('#panel__' + mEquipo.idmenu).html(htmlExterno);
        });
        $.post(mServicio.url, function (htmlExterno) {
            $('#panel__' + mServicio.idmenu).html(htmlExterno);
        });
        $.post(mViatico.url, function (htmlExterno) {
            $('#panel__' + mViatico.idmenu).html(htmlExterno);
        });
        setSolucion = false;
    }
    $('#menu-tab__' + isolJson).addClass('tab-active');

    if(countss !== 0){
        console.log('entre');
        BuscarSolucionEquipos();
        BuscarSolucionServiciosCL();
        BuscarSolucionOtroServis();
    }


}

function LimpiarSetSolucion() {
    let i;
    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mEquipo.idmenu}' class='tab'><span>${mEquipo.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i1');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mEquipo.idmenu}`).remove();
        $('#panel__' + mEquipo.idmenu).remove();
        menuNivel3.splice(i,1);
    }

    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mServicio.idmenu}' class='tab'><span>${mServicio.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i2');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mServicio.idmenu}`).remove();
        $('#panel__' + mServicio.idmenu).remove();
        menuNivel3.splice(i,1);
    }

    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mViatico.idmenu}' class='tab'><span>${mViatico.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i3');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mViatico.idmenu}`).remove();
        $('#panel__' + mViatico.idmenu).remove();
        menuNivel3.splice(i,1);
        setSolucion = true;
    }

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

        // objSolReq.req1 = parseInt(ireqSolucion);
        rowInsertSolucion.sol1 = parseInt(isolSolucion);
        // rowInsertSolucion.sol2 = objSolReq;
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


function EnviarSolucionCotizacion(){
    let rowInsertSolucion = {};

    console.log('ireqSolucion');
    console.log(ireqSolucion);
    console.log('isolSolucion');
    console.log(isolSolucion);

    if(isolSolucion !== '0'){
        rowInsertSolucion.sol1 = parseInt(isolSolucion);
        rowInsertSolucion.sol15 = '1';

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
                    alert("La solución fue enviada a cotizar.");
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
    $('select[name="cmb-solucion-req"]').html("");
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
        $('.spn-solucion-emp').html(`EMPRESA: <span style="font-size:14px">${repo.nomempresa}</span>`);
        $('.spn-solucion-pro').html(`PROYECTO: <span style="font-size:14px">${repo.nomproyecto}</span>`);
        $('.spn-solucion-req').html(`REQUERIMIENTO: <span style="font-size:12px">${repo.requerimiento}</span>`);

        ireqSolucion = repo.idreq;
        isolSolucion = repo.idsol;
        SesionSolucion(isolSolucion);
        // AddSet();
    }
    return  repo.text || repo.nomempresa + ' - ' + repo.nomproyecto  + ' - ' + repo.requerimiento ;
}
