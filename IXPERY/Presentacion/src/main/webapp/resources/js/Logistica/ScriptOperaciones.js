var JSONobjGeneralOpera;

var setOperaciones = true;
var countsc = 0;
var countso = 0;
var isolOperaciones;

var countSelOpe = false;



$(document).ready(function () {
    BuscarSolucionesPendientes();

    $("#selectEmpresa_Proyecto_Sol_Opera").select2({
        ajax: {
            url: "/operaciones/BuscarSolucionPendiente",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                $.each(data.items, function(i, d) {
                    data.items[i]['id'] = d.idsol;
                });
                return {
                    results: data.items
                };
            },
            cache: true
        },
        placeholder: 'Buscar por empresa o solución . . .',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
        templateResult: formatRepo,
        templateSelection: formatRepoSelection
    });
});

function formatRepo (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='select2-results'>EMP: "+repo.nomempresa+"</div>"+
        "<div class='select2-results'>PRO: "+repo.nomproyecto+"</span></div>"+
        "<div class='select2-results'>REQ: "+repo.requerimiento+"</span></div>"+
        "<div class='select2-results'>SOL: "+repo.solucion+"</span></div>";
    return markup;
}

function formatRepoSelection (repo) {
    if(countSelOpe){
        isolOperaciones = repo.id;
        SesionSolucionOpe(isolOperaciones);
        // AddSetOperaciones();
    }
    countSelOpe = true;
    return repo.text || repo.solucion;
}

function BuscarSolucionOperaciones(id){
    console.log('id');
    console.log(id);
    if(id!="" || id!=undefined){

        $.ajax({
            method: "POST",
            url: "/operaciones/buscaroperacionsol",
            data: {"sol": id},
            success: function resultado(valor) {
                console.log('valor condicion');
                console.log(valor);

                let json = JSON.parse(valor);
                let arrJson = json.items;
                $("#txt_validezofer_opera").val(arrJson[0].validezoferta);
                $("#txt_timeentre_opera").val(arrJson[0].tiempoentrega);
                $("#txt_timeejecu_opera").val(arrJson[0].tiempoejecucion);
                $("#txt_condcomer_opera").val(arrJson[0].condicioncomercial);
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function Registrar_Operaciones() {
    if($("#selectEmpresa_Proyecto_Sol_Opera").val()!==null){

        let data = $("#selectEmpresa_Proyecto_Sol_Opera").select2('data');

        let idEmp=data[0].idempresa;
        let idPro=data[0].idproyecto;
        let idSol=data[0].id;

        let txtOfer=$("#txt_validezofer_opera").val();
        let txtEntre=$("#txt_timeentre_opera").val();
        let txtEjecu=$("#txt_timeejecu_opera").val();

        let cadena=txtOfer+":-)"+txtEntre+":-)"+txtEjecu;
        let txtCond=$("#txt_condcomer_opera").val();

        if(verificaCajas(txtOfer,"txt_validezofer_opera") === true &&
           verificaCajas(txtEntre,"txt_timeentre_opera")  === true &&
           verificaCajas(txtEjecu,"txt_timeejecu_opera")  === true &&
           verificaCajas(txtCond,"txt_condcomer_opera")   === true
        ){
            idEmp = 1;
            console.log("idEmp");
            console.log(idEmp);
            console.log('idPro');
            console.log(idPro);
            console.log('idSol');
            console.log(idSol);
            console.log('cadena');
            console.log(cadena);
            console.log('cond');
            console.log(txtCond);
            $.ajax({
                method: "POST",
                url: "/operaciones/register",
                data: {"idEmp":idEmp,"idPro":idPro,"idSol":idSol,"cadena":cadena,"cond":txtCond},
                success: function resultado(valor) {
                    console.log('valor');
                    console.log(valor);
                    alert('La solución ha fue guardada correctamente');
                    LimpiarCamposOperaciones();
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }else{
            alert("Faltan completar campos");
        }



    }else{
        alert("Selecione una Solución o Empresa por favor...");
    }
}

function AprobarOperaciones() {
    let id = "";
    let jsonAprobarOperaciones = {};
    let arrAporbarOperaciones = [];
    let jsonItem = {};

    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/VerificarSesionSolucion",
        success: function(valor) {
            console.log('valor');
            console.log(valor);
            id = valor;
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

    jsonItem.sol1 = parseInt(id);
    jsonItem.sol19 = '1';

    arrAporbarOperaciones.push(jsonItem);
    jsonAprobarOperaciones.sol = arrAporbarOperaciones;

    console.log('jsonAprobarOperaciones');
    console.log(jsonAprobarOperaciones);

    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/GuardarSolucion",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonAprobarOperaciones),
        success: function resultado(valor) {
            if (valor === "0") {
                alert("La solución fue aprobada.");
                LimpiarCamposOperaciones();
                BuscarSolucionesPendientes();
                // LimpiarVariables();
                // if(modSolPend === '1'){
                //     BuscarRequerimientos();
                // }
            }
            else {
                alert("Error en la red. No se han guardado cambios.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
    LimpiarSetOperaciones();
}




function RechazarOperaciones() {
    let id = "";
    let jsonRechazarOperaciones = {};
    let arrRechazarOperaciones = [];
    let jsonItem = {};

    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/VerificarSesionSolucion",
        success: function(valor) {
            console.log('valor');
            console.log(valor);
            id = valor;
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

    jsonItem.sol1 = parseInt(id);
    jsonItem.sol18 = '1';

    arrRechazarOperaciones.push(jsonItem);
    jsonRechazarOperaciones.sol = arrRechazarOperaciones;

    console.log('jsonRechazarOperaciones');
    console.log(jsonRechazarOperaciones);

    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/GuardarSolucion",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonRechazarOperaciones),
        success: function resultado(valor) {
            if (valor === "0") {
                alert("La solución fue rechazada.");
                LimpiarCamposOperaciones();
                BuscarSolucionesPendientes();
                // LimpiarVariables();
                // if(modSolPend === '1'){
                //     BuscarRequerimientos();
                // }
            }
            else {
                alert("Error en la red. No se han guardado cambios.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
    LimpiarSetOperaciones();
}




function verificaCajas(valCaja,id){
    if(valCaja!==""){
       $("#"+id).removeClass('is-invalid');
        return true;
    }else{
        $("#"+id).addClass('is-invalid');
        return false;
    }
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


function LimpiarCamposOperaciones() {
    $('input#txt_validezofer_opera').val("");
    $('input#txt_timeentre_opera').val("");
    $('input#txt_timeejecu_opera').val("");
    $('select#selectEmpresa_Proyecto_Sol_Opera').html("");
    $('textarea#txt_condcomer_opera').val("");
}


function BuscarSolucionesPendientes(){
    // AddMenu(mEquipoCot);

    $.ajax({
        method: "POST",
        url: "/operaciones/BuscarSolucionesPendientes",
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

                    html += `<tr name="operaciones-requerimiento">`;
                    html += `<td><div style="width: 15px" class="text-span"><span name="spn-operaciones-num">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-operaciones-idreq">${arrayData[i].idreq}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-operaciones-idsol">${arrayData[i].idsol}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-operaciones-nomreq">${arrayData[i].requerimiento}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-operaciones-regreq">${arrayData[i].fecharegistro_rq}</span></div></td>`;
                    html += `<td><div style="width: 250px" class="text-span"><span name="spn-operaciones-nomsol">${arrayData[i].solucion}</span></div></td>`;
                    html += `<td><div style="width: 100px" class="text-span"><span name="spn-operaciones-inisol">${arrayData[i].fecharegistro_sol}</span></div></td>`;
                    html += `<td><div style="width: 200px" class="text-span"><span name="spn-operaciones-nompro">${arrayData[i].nomproyecto}</span></div></td>`;
                    html += `<td><div style="width: 150px" class="text-span"><span name="spn-operaciones-nomemp">${arrayData[i].nomempresa}</span></div></td>`;
                    html += `</tr>`;
                }
                $('thead#thead-solucion-operaciones').show();
                $('tbody#tbody-solucion-operaciones').html(html)
                    .on('click', 'tr', function(){
                        let actual = $(this);
                        ireqSolucion = $(this).find('span[name=spn-operaciones-idreq]').text();
                        isolOperaciones = $(this).find('span[name=spn-operaciones-idsol]').text();
                        SesionSolucionOpe(isolOperaciones);
                        console.log("session");
                        console.log(isolOperaciones);
                        for (let i = 0; i < length; ++i) {
                            if(arrayData[i].idreq.toString() === ireqSolucion){
                                if(arrayData[i].idsol.toString() !== '0'){
                                    $('input[name="txt-operaciones-nom"]').val(arrayData[i].operaciones);
                                    $('input[name="txt-operaciones-fch"]').val(arrayData[i].fecharegistro_sol);
                                    $('select[name="cmb-operaciones-enc"]').html(new Option('soli','1',true,true));
                                    $('textarea[name="tar-operaciones-des"]').val('descripcion');
                                }
                                else{
                                    // LimpiarCampos();
                                }
                                $('.spn-operaciones-emp').html(`EMPRESA: <span style="font-size:14px">${arrayData[i].nomempresa}</span>`);
                                $('.spn-operaciones-pro').html(`PROYECTO: <span style="font-size:14px">${arrayData[i].nomproyecto}</span>`);
                                $('.spn-operaciones-req').html(`REQUERIMIENTO: <span style="font-size:12px">${arrayData[i].requerimiento}</span>`);
                            }
                        }
                        AddSetOperaciones();

                        $('tbody#tbody-solucion-operaciones tr').removeClass('row-selected');
                        actual.addClass('row-selected');

                    });

            }
            else {
                alert('No se encontraron operacioneses pendientes');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });


}


function LimpiarCamposCot() {
    $('.spn-operaciones-emp').html('');
    $('.spn-operaciones-pro').html('');
    $('.spn-operaciones-req').html('');
}







function AddSetOperaciones() {

    if(setOperaciones){
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
        setOperaciones = false;
    }
    console.log('iopeJson');
    console.log(iopeJson);
    $('#menu-tab__' + iopeJson).addClass('tab-active');

    if(countso !== 0){
        console.log('entre');
        BuscarSesionSol();
        BuscarServicioCotizacion();
        BuscarOtroServicio();
    }

}




function SesionSolucionOpe(sol) {
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



function LimpiarSetOperaciones() {
    let i;
    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mEquipoCot.idmenu}' class='tab'><span>${mEquipoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i1');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mEquipoCot.idmenu}`).remove();
        $('#panel__' + mEquipoCot.idmenu).remove();
        menuNivel3.splice(i,1);
    }

    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mServicioCot.idmenu}' class='tab'><span>${mServicioCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i2');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mServicioCot.idmenu}`).remove();
        $('#panel__' + mServicioCot.idmenu).remove();
        menuNivel3.splice(i,1);
    }

    i = menuNivel3.indexOf(`<li><a id='menu-tab__${mViaticoCot.idmenu}' class='tab'><span>${mViaticoCot.descripcion}</span><div class='icon-cerrar'><i></i></div></a></li>`);
    console.log('i3');
    console.log(i);
    if(i > 0){
        $('#tabBar').find(`a#menu-tab__${mViaticoCot.idmenu}`).remove();
        $('#panel__' + mViaticoCot.idmenu).remove();
        menuNivel3.splice(i,1);
        setOperaciones = true;
    }

}



