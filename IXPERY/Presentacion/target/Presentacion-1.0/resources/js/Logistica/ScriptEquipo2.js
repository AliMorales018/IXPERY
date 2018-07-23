var fila=0;
function clonar_select3(fila){

    $('#cmb_equipo2_provee'+fila).select2({
        ajax: {
            url: "/equipo2/busprovprod",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
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
        minimumInputLength: 3,
        templateResult: formatRepoProve,
        templateSelection: formatRepoSelectionProve
    });

}

function borrar_select3(){
    $('.js-example-basic-single').select2("destroy");
}

//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function formatRepoProve (repo) {
    //alert(repo.precio);
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectequipo2-result-empresa'><span class='selectequipo2-span-result'>EMPRESA: </span>"+repo.empresa+"</div>"+
        "<div class='selectequipo2-result-producto'><span class='selectequipo2-span-result'>PRODUCTO: </span>"+repo.nomproducto+"</div>"+
        "<div class=         'selectequipo2-result-modelo'  ><span class='selectequipo2-span-result'>PRECIO: </span>"+repo.precio+"</span></div>"
    return markup;
}
function formatRepoSelectionProve (repo) {

    fila=repo._resultId;
    if(fila!=undefined) {
        var pos = fila.indexOf("-");
        fila=fila.substring(pos+1);
        pos = fila.indexOf("-");
        fila=fila.substring(0,pos);
        fila=fila.charAt(fila.length-1);
        alert(fila);
        //LLENAMOS LOS CAMPOS POR FILAS
        $("#spn_equipo2_prepro"+fila).text(repo.precio);
    }
    return repo.text || repo.empresa;

}
/*function clonar_select3(fila){

    $('#cmb_equipo2_provee'+fila).select2({
        ajax: {
            url: "/equipo2/busprovprod",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
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
        minimumInputLength: 3,
        templateResult: formatRepoProve,
        templateSelection: formatRepoSelectionProve
    });

}

function borrar_select3(){
    $('.js-example-basic-single').select2("destroy");
}*/



function addEquiposUpdate_equipo2(obj){
    conta_filas_equipo=0;
    $( "#tbody_equipo" ).empty();
    var JSONobj = JSON.parse(obj);

    //RECORREMOS EQUIPO SOLUCIÓN

    $.each(JSONobj.items[1].items2, function (obj, item) {
        conta_filas_equipo++;

        $("#equipo_1 tbody").append(
            "<tr id='equipo_1_fila_"+conta_filas_equipo+"'>"+
            "<td id='td_equipo_num"+conta_filas_equipo+"'><div><p id='p_num_equipo"+conta_filas_equipo+"' class='text-center'>"+conta_filas_equipo+"</p></></td>"+
            "<td id='td_equipo_nompro"+conta_filas_equipo+"'><div><select id='cmb_equipo_nompro"+conta_filas_equipo+"' name='cmb_equipo_nompro' class='select_equipo_equipos' style='width: 100%;'></select></div></td>"+
            "<td id='td_equipo_codpro"+conta_filas_equipo+"'><div><span id='spn_equipo_codpro"+conta_filas_equipo+"' name='spn_equipo_codpro'>"+item.codigo+"</span></div></td>"+
            "<td id='td_equipo_modpro"+conta_filas_equipo+"'><div><span id='spn_equipo_modpro"+conta_filas_equipo+"' name='spn_equipo_modpro'>"+item.modelo+"</span></div></td>"+
            "<td id='td_equipo_marpro"+conta_filas_equipo+"'><div><span id='spn_equipo_marpro"+conta_filas_equipo+"' name='spn_equipo_marpro'>"+item.marca+"</span></div></td>"+
            "<td id='td_equipo_medpro"+conta_filas_equipo+"'><div><span id='spn_equipo_medpro"+conta_filas_equipo+"' name='spn_equipo_medpro'>"+item.nomumedida+"</span></div></td>"+
            "<td id='td_equipo_canpro"+conta_filas_equipo+"'><div><input type='text' id='txt_equipo_canpro"+conta_filas_equipo+"' name='txt_equipo_canpro' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td id='td_equipo_eli"+conta_filas_equipo+"'><div class='text-center'><button id='equipo_1_fila_btn_elim_"+conta_filas_equipo+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_equipos(this);'><i class='icon icon-bin '></i></button></div></td>"+
            "<td hidden><div><input type='text' id='txt_equipo_idprodo"+conta_filas_equipo+"' name='txt_equipo_idprodo' type='text' class='form-control' value='"+item.idproducto+"'/></div></td>"+
            "</tr>"
        );
        borrar_select2();
        clonar_select2(conta_filas_equipo);

        $("#select2-cmb_equipo_nompro"+conta_filas_equipo+"-container").text(item.producto);
    });

    //SI EXISTEN
    conta_filas_equiponr=0;
    $( "#tbody_equiponr" ).empty();
    $.each(JSONobj.items[2].items3, function (obj, item) {
        conta_filas_equiponr++;

        $("#equiponr_1 tbody").append(
            "<tr id='equiponr_1_fila_"+conta_filas_equiponr+"'>"+
            "<td><div><p id='p_num_equiponr"+conta_filas_equiponr+"' class='text-center'>"+conta_filas_equiponr+"</p></div></td>"+
            "<td><div><input id='txt_equiponr_nompro"+conta_filas_equiponr+"' name='txt_equiponr_nompro' type='text' class='form-control' value='"+item.nomproducto+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_codpro"+conta_filas_equiponr+"' name='txt_equiponr_codpro' type='text' class='form-control' value=''/></div></td>"+
            "<td><div><input id='txt_equiponr_modpro"+conta_filas_equiponr+"' name='txt_equiponr_modpro' type='text' class='form-control' value='"+item.modelo+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_marpro"+conta_filas_equiponr+"' name='txt_equiponr_marpro' type='text' class='form-control' value='"+item.marca+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_medpro"+conta_filas_equiponr+"' name='txt_equiponr_medpro' type='text' class='form-control' value='"+item.umedida+"'/></div></td>"+
            "<td><div><input id='txt_equiponr_canpro"+conta_filas_equiponr+"' name='txt_equiponr_canpro' type='text' class='form-control' value='"+item.cantidad+"'/></div></td>"+
            "<td><div class='text-center'><button id='equiponr_1_btn_elim_"+conta_filas_equiponr+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_equiposnr(this);'><i class='icon icon-bin '></i></button></div></td>"+
            "</tr>"
        );
    });


}