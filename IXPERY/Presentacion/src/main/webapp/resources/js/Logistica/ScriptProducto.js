var nomBody_producto;
var idPriFilaBody_producto = "firstRowBody_producto";

CargarJS_producto(0,0,0);

function limpiarTotal() {
    var arrayCajas=["txt_producto_nombb","txt_producto_codd","txt_producto_sminn","txt_producto_saldd","txt_producto_modee",
        "txt_producto_marcc","txt_producto_idprodd"]

    var arrayCombo = ["cmb_producto_famii","cmb_producto_catee","cmb_producto_umedd"];
    limpiaCombo(arrayCombo);
    limpiarCajas(arrayCajas);
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
    limpiarTotal();
    //Nombre del body
    nomBody_producto = "tbody_producto";
    //ID del Body
    idPriFilaBody_producto = "firstRowBody_producto";
}
function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

//METODOS AJAX
/*function elimRegistro_producto(posicionFila) {

    var i = $("#txt_producto_idpre" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/producto/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja al Producto.");
                $("#fila_producto" + posicionFila).remove();
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}*/

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

function buscar_producto() {
    //Alterna funcion del boton nuevo.
    $("#btn_producto_nue").css("display", "none");
    $("#btn_producto_nue_reload").css("display", "inline");
    $("#btn_producto_save").attr("disabled", true);
    var prod = $("#txt_producto_busnom").val();
    // var cate = $("#txt_producto_buscat").val().toUpperCase();
    $.ajax({
        method: "POST",
        url: "/producto/search",
        data: {"prod":prod},
        success: function resultado(valor) {
            // $("#thEditar_producto").css("display", "block");
            $("#" + nomBody_producto).html(valor);
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
        data: {"combo":combo,"famil":famil},
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
function llenarCate_producto(idfami,idcate) {
    $.ajax({
        method: "POST",
        url: "/producto/listarcate",
        data: {"idfami":idfami},
        success: function resultado(valor) {
            $("#cmb_producto_catee").html(valor);
            if(idcate==""){}else{
                $("#cmb_producto_catee option").each(function() {
                    if ($(this).text() == idcate) {
                        $("#cmb_producto_catee option[value=" + $(this).val() + "]").attr("selected", true);
                    }
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function listarUmedida_producto(combo,umed) {
    $.ajax({
        method: "POST",
        url: "/producto/listarumed",
        data: {"combo":combo,"umed":umed},
        success: function resultado(valor) {
            if(valor=="anidados"){
                llenarCate_anidado(combo,fami);
            }else{
                $("#" + combo).html(valor);
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function guardaProducto(){
    var valida=validarcampos();
    if(valida==true) {
        $("#cmb_producto_umedd option").each(function () {
            if ($(this).val() == "sel") {
                $(this).removeAttr("selected");
                $(this).remove();
            }
        });

        var i = $("#txt_producto_idprodd").val();
        var idcate = $("#cmb_producto_catee").val();
        var idumed = $("#cmb_producto_umedd").val();
        var umed = $('select[name="cmb_producto_umedd"] option:selected').text();
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
                    alert("Producto Actualizado Correctamente");
                } else {
                    alert("Producto Registrado Correctamente");
                }
                buscar_producto();
                $("#txt_producto_idprodd").val("");
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
                    $("tbody tr td input").each(function() {
                        if ($(this).val() == i) {
                            $(this).closest('tr').remove();
                        }
                    });
                    CargarJS_producto(0,1,1);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}