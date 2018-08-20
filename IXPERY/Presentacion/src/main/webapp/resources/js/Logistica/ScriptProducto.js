var c_fil_producto;
var dollyRowProducto = '';
dollyRowProducto+= '<tr class="producto-edit">';
dollyRowProducto+= '<td><div><p class="text-center" id="p_producto_num"></p></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_idpro"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_nombre"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_famil"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_categ"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_umedi"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_codig"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_estad"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_sreal"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_smini"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_model"/></div></td>';
dollyRowProducto+= '<td><div><span id="spn_producto_marca"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_fregi"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_uregi"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_insum"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_pfina"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_einsu"/></div></td>';
dollyRowProducto+= '<td style="display:none"><div><span id="spn_producto_epfin"/></div></td>';
dollyRowProducto+= '<td><div class="text-center"><button type="button"><i class="icon-cross icon-hp-desh"></i></button></div></td>';
dollyRowProducto+= '</tr>';

var dollyRowProductoHTML = $.parseHTML(dollyRowProducto);

var rowCloneProducto;
function CargarProductos() {
    limpiarTotalProd();
    var nomProd = $("#txt_producto_busnom").val();
    c_fil_producto = 0;
    $.ajax({
        method: "POST",
        url: "/producto/search",
        data: {"prod":nomProd},
        success: function resultado(data) {
            if(data != 0) {
                let JSONobjProducto = JSON.parse(data);
                console.log(JSONobjProducto);
                $("table #tbody_producto").empty();
                $.each(JSONobjProducto.pdt, function (obj, item) {

                    c_fil_producto++;
                    let rowCloneProducto=$(dollyRowProductoHTML).clone().prop({id:'fila_producto' + c_fil_producto});
                    rowCloneProducto.find('p').html(c_fil_producto);
                    rowCloneProducto.find('span[id=spn_producto_idpro]').html(item.pdt1);
                    rowCloneProducto.find('span[id=spn_producto_nombre]').html(item.pdt7);
                    rowCloneProducto.find('span[id=spn_producto_famil]').html(item.pdt2.cat3);
                    rowCloneProducto.find('span[id=spn_producto_categ]').html(item.pdt2.cat2);
                    rowCloneProducto.find('span[id=spn_producto_umedi]').html(item.pdt4);
                    rowCloneProducto.find('span[id=spn_producto_codig]').html(item.pdt6);
                    rowCloneProducto.find('span[id=spn_producto_estad]').html(item.pdt8);
                    rowCloneProducto.find('span[id=spn_producto_sreal]').html(item.pdt9);
                    rowCloneProducto.find('span[id=spn_producto_smini]').html(item.pdt10);
                    rowCloneProducto.find('span[id=spn_producto_model]').html(item.pdt11);
                    rowCloneProducto.find('span[id=spn_producto_marca]').html(item.pdt12);
                    rowCloneProducto.find('span[id=spn_producto_fregi]').html(item.pdt13);
                    rowCloneProducto.find('span[id=spn_producto_uregi]').html(item.pdt14);
                    rowCloneProducto.find('span[id=spn_producto_insum]').html(item.pdt15);
                    rowCloneProducto.find('span[id=spn_producto_pfina]').html(item.pdt16);
                    rowCloneProducto.find('span[id=spn_producto_einsu]').html(item.pdt17);
                    rowCloneProducto.find('span[id=spn_producto_epfin]').html(item.pdt18);

                    $("table #tbody_producto").append(rowCloneProducto);
                });

            }else{
                $("table #tbody_producto").empty();
                $("table #tbody_producto").append("<td colspan='20' class='text-center font-weight-light'><div id='campoempresa1'>NO SE HA BUSCADO PRODUCTO</div></td>");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
$(document).ready(function () {
    CargarProductos();
    listarFamilia("");
    listarUmedida_producto("");
    listarEsta_producto("contentcheck_producto");
    $('table #tbody_producto')
        .on('click','tr[class=producto-edit]',function(){
            $("#txt_producto_idprodd").val(parseInt($(this).find('span[id = spn_producto_idpro]').html()));
            $("#txt_producto_nombb").val($(this).find('span[id = spn_producto_nombre]').text());
            $("#txt_producto_codd").val($(this).find('span[id = spn_producto_codig]').text());
            $("#txt_producto_sminn").val($(this).find('span[id = spn_producto_smini]').text());
            $("#txt_producto_saldd").val($(this).find('span[id = spn_producto_sreal]').text());
            $("#txt_producto_modee").val($(this).find('span[id = spn_producto_model]').text());
            $("#txt_producto_marcc").val($(this).find('span[id = spn_producto_marca]').text());
            $("#cmb_producto_estadd").val($(this).find('span[id = spn_producto_estad]').text());

            let insum=$(this).find('span[id=spn_producto_insum]').text();
            let einsu=$(this).find('span[id=spn_producto_einsu]').text();
            let pfina=$(this).find('span[id=spn_producto_pfina]').text();
            let epfin=$(this).find('span[id=spn_producto_epfin]').text();

            $('input[type=checkbox]').prop('checked',false);
            $("#contentcheck_producto_estadd  input").each(function(){
                if ($(this).val() ===insum){
                    $("#"+$(this).attr("id")).prop('checked', true);
                }else if($(this).val()===einsu){
                    $("#"+$(this).attr("id")).prop('checked', true);
                }else if($(this).val()===pfina){
                    $("#"+$(this).attr("id")).prop('checked', true);
                }else if($(this).val()===epfin){
                    $("#"+$(this).attr("id")).prop('checked', true);
                }
            });
        })
});
function listarFamilia(nomFam){
    if (nomFam===""){
        $("#cmb_producto_famii").select2({
            ajax: {
                url: "/producto/listarfami",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    console.log(data.items);
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por familia . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoFamilia,
            templateSelection: formatRepoSelectionFam
        });
    }else{
        $("#cmb_producto_famii").select2({
            ajax: {
                url: "/producto/listarfami",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: nomFam
                    };
                },
                processResults: function (data, params) {
                    console.log(data.items);
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por familia . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoFamilia,
            templateSelection: formatRepoSelectionFam
        });
    }


}
function formatRepoFamilia (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectempresa2-result-familia'><span class='selectempresa2-span-equiporesult'>FAMILIA: </span>"+repo.familia+"</div>"+
                 "<div class='selectempresa2-result-categoria'><span class='selectempresa2-span-equiporesult'>CATEGORIA: </span>"+repo.categoria+"</div>";
    return markup;
}

function formatRepoSelectionFam (repo) {
    return repo.text || repo.familia +"-"+repo.categoria;
}

function formatRepoCategoria (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectempresa2-result-equipo'><span class='selectempresa2-span-equiporesult'>CATEGORIA: </span>"+repo.categoria+"</div>";
    return markup;
}
function formatRepoSelectionCat (repo) {
    return repo.text || repo.categoria;
}

function formatRepoUmedida (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectempresa2-result-equipo'><span class='selectempresa2-span-equiporesult'>U. MEDIDA: </span>"+repo.medida+"</div>";
    return markup;
}
function formatRepoSelectionUme (repo) {
    return repo.text || repo.medida;
}


function limpiarTotalProd() {
    var arrayCajas=["txt_producto_nombb","txt_producto_codd","txt_producto_sminn","txt_producto_saldd","txt_producto_modee",
        "txt_producto_marcc","txt_producto_idprodd","txt_producto_busnom"]

    var arrayCombo = ["cmb_producto_famii","cmb_producto_catee","cmb_producto_umedd"];
    limpiaCombo(arrayCombo);
    limpiarCajas(arrayCajas);
    $('input[type=checkbox]').prop('checked',false);
}
function validarcampos(){
    if($("#txt_producto_nombb").val()=="" || $("#txt_producto_sminn").val()=="" || $("#txt_producto_saldd").val()==""){
        alert("Ingresar Nombre Producto, Stock Mínimo y Máximo");
        return false;

    }else if(!$('#cmb_producto_catee').val() || $('#cmb_producto_catee').val()=="sel" || !$('#cmb_producto_umedd').val() || $('#cmb_producto_umedd').val()=="sel" ){
        alert("Seleccion Categoría y Unidad de Medida");
        return false;
    }else{
        return true;
    }
}
function ValidNum(id) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
}
function limpiaCombo(arrayCombo){
    for (var j = 0; j < arrayCombo.length; j++) {
        var idCombo = arrayCombo[j];
        $("#"+idCombo + " option").remove();
    }

}
function limpiarCajas(arrayCajas){
    for (var j = 0; j < arrayCajas.length; j++) {
        var idCajas = arrayCajas[j];
        $("#"+idCajas).val('');
    }
}
function CargarJS_producto(estado, childNodes, reloadTabla) {
    listarFami_producto("cmb_producto_famii","");
    listarUmedida_producto("cmb_producto_umedd","");
    listarEsta_producto("contentcheck_producto");
    buscar_producto();
    limpiarTotalProd();
    //Nombre del body
    nomBody_producto = "tbody_producto";
    //ID del Body
    idPriFilaBody_producto = "firstRowBody_producto";
}
function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}


function editRegistro_producto(posicionFila) {

    var i = $("#txt_producto_idpre" + posicionFila).val();
    var ruc =$("#Vtxt_producto_ruc" + posicionFila).val();
    var dir = $("#txt_producto_dire" + posicionFila).val();
    var ema = $("#txt_producto_emai" + posicionFila).val();
    var tel = $("#txt_producto_tele" + posicionFila).val();
    var nom = $("#txt_producto_nombre" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/producto/edit",
        data: {"i":i,"ruc":ruc,"dir":dir,"ema":ema,"tel":tel,"nom":nom},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Producto Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}


var id_fila_antigua="";
function llenarRegistro_producto(idtr,posicionFila){
    if(id_fila_antigua==""){//hover fila
        $("#"+idtr).addClass('seleccionada');
        id_fila_antigua=idtr;
    }else{
        $("#"+id_fila_antigua).removeClass('seleccionada');
        $("#"+idtr).addClass('seleccionada');
        id_fila_antigua=idtr;
    }
    var i     = $("#txt_producto_idpro" + posicionFila).val();
    var nomb   = $("#txt_producto_nombre" + posicionFila).val();
    var famil  = $("#txt_producto_famil" + posicionFila).val();
    var categ  = $("#txt_producto_categ" + posicionFila).val();
    var umedi  = $("#txt_producto_umedi" + posicionFila).val();
    var codig  = $("#txt_producto_codig" + posicionFila).val();
    var estad  = $("#txt_producto_estad" + posicionFila).val();
    var sreal  = $("#txt_producto_sreal" + posicionFila).val();
    var smini  = $("#txt_producto_smini" + posicionFila).val();
    var model  = $("#txt_producto_model" + posicionFila).val();
    var marca = $("#txt_producto_marca" + posicionFila).val();
    var freg  = $("#txt_producto_fregi" + posicionFila).val();
    var ureg  = $("#txt_producto_uregi" + posicionFila).val();
    var insum = $("#txt_producto_insum" + posicionFila).val();
    var pfina  = $("#txt_producto_pfina" + posicionFila).val();
    var einsu  = $("#txt_producto_einsu" + posicionFila).val();
    var epfin = $("#txt_producto_epfin" + posicionFila).val();

    $("#txt_producto_idprodd").val(i);
    $("#txt_producto_nombb").val(nomb);
    $("#txt_producto_codd").val(codig);
    $("#txt_producto_modee").val(model);
    $("#txt_producto_marcc").val(marca);
    $("#txt_producto_sminn").val(smini);
    $("#txt_producto_saldd").val(sreal);

    $("#div_producto_estado select").val(estad);
    //$("#div_producto_umedida option:selected").text(umedi);
    $("#cmb_producto_umedd option").each(function(){
        $(this).removeAttr("selected");
        if ($(this).text() == umedi){
            $("#cmb_producto_umedd option[value="+ $(this).val() +"]").attr("selected",true);
        }
    });
    // $("#cmb_producto_famii").removeProp("selected");
    //BUSCAS EL TEXTO Y OBTIENES EL VALOR.---
    $("#cmb_producto_famii option").each(function(){
        $(this).removeAttr("selected");
        if ($(this).text() == famil){
            $("#cmb_producto_famii option[value="+ $(this).val() +"]").attr("selected",true);
            llenarCate_producto($(this).val(),categ);
        }
    });
    $('input[type=checkbox]').prop('checked',false);
    $("#contentcheck_producto_estadd label input").each(function(){
        if ($(this).val() == insum){
            $("#"+$(this).attr("id")).prop('checked', true);
        }else if($(this).val()==einsu){
            $("#"+$(this).attr("id")).prop('checked', true);
        }else if($(this).val()==pfina){
            $("#"+$(this).attr("id")).prop('checked', true);
        }else if($(this).val()==epfin){
            $("#"+$(this).attr("id")).prop('checked', true);
        }
    });

}

function llenarCate_anidado(combo,famil){
    var select="";
    $("#cmb_producto_famii option").each(function(){
        if ($(this).text() == famil ){
            $("#cmb_producto_famii option[value="+ famil +"]").attr("selected",true);
            document.getElementById("cmb_producto_famii").onchange();
            $("#hdn_producto_ubi").val(famil);
        }
    });
}
function llenarUmed_anidado(combo,umed){
    var select="";
    $("#cmb_producto_umedd option").each(function(){
        if ($(this).text() == umed ){
            $("#cmb_producto_umedd option[value="+ umed +"]").attr("selected",true);
            $("#hdn_producto_ubi").val(umed);
        }
    });
}
function listarFami_producto(combo, famil) {
    //$("#hdn_producto_ubi").val("");
    $.ajax({
        method: "POST",
        url: "/producto/listarfami",
        data: {"famil":famil},
        success: function resultado(valor) {
            if(valor=="anidados"){
                llenarCate_anidado(combo,famil);
            }else{
                $("#" + combo).html(valor);
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

/*function listarUmed_producto(combo,umed) {
    //$("#hdn_producto_ubi").val("");
    $.ajax({
        method: "POST",
        url: "/producto/listarumed",
        data: {"combo":combo,"umed":umed},
        success: function resultado(valor) {
            if(valor=="anidados"){
                llenarCate_anidado(combo,umed);
            }else{
                $("#" + combo).html(valor);
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}*/

function listarEsta_producto(divcheck) {
    $.ajax({
        method: "POST",
        url: "/producto/listaresta",
        data:{"divcheck":divcheck},
        success: function resultado(valor) {
            $("#contentcheck_producto_estadd").html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function llenarCate_producto(idfami) {
    $("#cmb_producto_catee").select2({
        ajax: {
            url: "/producto/listarcate",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: idfami
                };
            },
            processResults: function (data, params) {
                console.log(data.items);
                return {
                    results: data.items
                };
            },
            cache: true
        },
        placeholder: 'Buscar por categoría . . .',
        escapeMarkup: function (markup) { return markup; },
        //minimumInputLength: 3,
        templateResult: formatRepoCategoria,
        templateSelection: formatRepoSelectionCat
    });
}

function listarUmedida_producto(umed) {
    if(umed===""){
        $("#cmb_producto_umedd").select2({
            ajax: {
                url: "/producto/listarumed",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    console.log(data.items);
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por u. medida . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoUmedida,
            templateSelection: formatRepoSelectionUme
        });
    }else{
        $("#cmb_producto_umedd").select2({
            ajax: {
                url: "/producto/listarumed",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: umed
                    };
                },
                processResults: function (data, params) {
                    console.log(data.items);
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por u. medida . . .',
            escapeMarkup: function (markup) { return markup; },
            //minimumInputLength: 3,
            templateResult: formatRepoUmedida,
            templateSelection: formatRepoSelectionUme
        });

    }


}
function guardaProducto(){
    var valida=validarcampos();
    if(valida==true) {

        var i = $("#txt_producto_idprodd").val();
        var idcate = $("#cmb_producto_catee").val();
        var idumed = $("#cmb_producto_umedd").val();

        var umed = $("#cmb_producto_umedd").select2('data')[0].medida;

        var cod = $("#txt_producto_codd").val().toUpperCase();
        var nomb = $("#txt_producto_nombb").val().toUpperCase();
        var esta = $("#cmb_producto_estadd").val();
        var srea = $("#txt_producto_saldd").val();
        var smin = $("#txt_producto_sminn").val();
        var mode = $("#txt_producto_modee").val().toUpperCase();
        var marc = $("#txt_producto_marcc").val().toUpperCase();
        var insu = "";
        var prodfin = "";
        var insuhabil = "";
        var prodfinhabil = "";

        if ($('#check_tbc_producto1_estadd').prop('checked')) {
            insu = $('#check_tbc_producto1_estadd').val();
        } else {
            var insu = "0";
        }
        if ($('#check_tbc_producto2_estadd').prop('checked')) {
            insuhabil = $('#check_tbc_producto2_estadd').val();
        } else {
            var insuhabil = "0";
        }
        if ($('#check_tbc_producto3_estadd').prop('checked')) {
            prodfin = $('#check_tbc_producto3_estadd').val();
        } else {
            var prodfin = "0";
        }
        if ($('#check_tbc_producto4_estadd').prop('checked')) {
            prodfinhabil = $('#check_tbc_producto4_estadd').val();
        } else {
            var prodfinhabil = "0";
        }


        if (i == "") {
            i = "0";
        }
        var arrayDatos = [idcate, idumed, umed, cod, nomb, esta, srea, smin, mode, marc, insu, prodfin, insuhabil, prodfinhabil, i];
        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos2 = [];
        for (var i = 1; i <= 1; i++) {

            var filaData = []
            for (var j = 0; j < arrayDatos.length; j++) {

                var id = arrayDatos[1];
                id = "#" + id.substring(0, id.length - 1);
                obj = $(id + i);
                filaData[j] = arrayDatos[j];

            }
            arrayDatos2.push(filaData);
        }

        var arrayData = {
            values: arrayDatos2
        }

        $.ajax({
            method: "POST",
            url: "/producto/guardar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(arrayData),
            success: function resultado(valor) {
                if (valor == "0") {//0:update
                    alert("Producto Registrado Correctamente");
                } else {
                    alert("Producto Actualizado Correctamente");
                }
                CargarProductos();
                $("#txt_producto_idprodd").val("");
                $("#txt_producto_busnom").val("");
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }else{

    }
}

function eliProducto(){
    var i = $("#txt_producto_idprodd").val();
    if(i==""){
        alert("Seleccione Producto por favor");
    }else{
        $.ajax({
            method: "POST",
            url: "/producto/delete",
            data: {"i":i},
            success: function resultado(valor) {
                if (valor == "") {
                    alert("Se dió de baja al Producto.");
                    CargarProductos;
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}