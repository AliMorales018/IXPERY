var nomBody_proveedor;
var idPriFilaBody_proveedor = "firstRowBody_proveedor";

CargarJS_proveedor(0,0,0);

function limpiarTotal() {
    var arrayCajas=["txt_proveedor_busrucc","txt_proveedor_nombb","txt_proveedor_diree","txt_proveedor_dirfiss",
        "txt_proveedor_nomcomm","txt_proveedor_rubrr","txt_proveedor_refee","txt_proveedor_descrr",
        "txt_proveedor_telee","txt_proveedor_emaill","txt_proveedor_webb","txt_proveedor_codpostt","txt_proveedor_idemprr"]
    var arrayCombo = ["cmb_proveedor_dptoo","cmb_proveedor_provv","cmb_proveedor_distt"];
    limpiaCombo(arrayCombo);
    limpiarCajas(arrayCajas);
}
function validarcampos(){
    if($("#txt_proveedor_busrucc").val()=="" || $("#txt_proveedor_nomcomm").val()=="" || $("#txt_proveedor_diree").val()==""){
        alert("Ingresar RUC, Nombre Comercial y Dirección como mínimo");
        return false;

    }else if(!$('#cmb_proveedor_distt').val() || $('#cmb_proveedor_distt').val()=="sel"){
        alert("Seleccion Dpto, Provincia y Distrito");
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
function CargarJS_proveedor(estado, childNodes, reloadTabla) {
    listarDpto_proveedor("cmb_proveedor_dptoo","");
    buscar_proveedor();
    limpiarTotal();
    //Nombre del body
    nomBody_proveedor = "tbody_proveedor";
    //ID del Body
    idPriFilaBody_proveedor = "firstRowBody_proveedor";
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

//METODOS AJAX
/*function elimRegistro_proveedor(posicionFila) {

    var i = $("#txt_proveedor_idpre" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/proveedor/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja el Proveedor.");
                $("#fila_proveedor" + posicionFila).remove();
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}*/

/*function editRegistro_proveedor(posicionFila) {

    var i = $("#txt_proveedor_idpre" + posicionFila).val();
    var ruc =$("#Vtxt_proveedor_ruc" + posicionFila).val();
    var dir = $("#txt_proveedor_dire" + posicionFila).val();
    var ema = $("#txt_proveedor_emai" + posicionFila).val();
    var tel = $("#txt_proveedor_tele" + posicionFila).val();
    var nom = $("#txt_proveedor_nombre" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/proveedor/edit",
        data: {"i":i,"ruc":ruc,"dir":dir,"ema":ema,"tel":tel,"nom":nom},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Proveedor Actualizado.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}*/

function buscar_proveedor() {
    //Alterna funcion del boton nuevo.
    $("#btn_proveedor_nue").css("display", "none");
    $("#btn_proveedor_nue_reload").css("display", "inline");
    $("#btn_proveedor_save").attr("disabled", true);
    var ruc = $("#txt_proveedor_busruc").val();
    var nom = $("#txt_proveedor_busnomb").val().toUpperCase();
    var opc = 3;//ES PROVEEDOR
    $.ajax({
        method: "POST",
        url: "/proveedor/search",
        data: {"ruc":ruc,"nom":nom,"opc":opc},
        success: function resultado(valor) {
            // $("#thEditar_proveedor").css("display", "block");
            $("#" + nomBody_proveedor).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

var id_fila_antigua="";
function llenarRegistro_proveedor(idtr,posicionFila){
    if(id_fila_antigua==""){//hover fila
        $("#"+idtr).addClass('seleccionada');
        id_fila_antigua=idtr;
    }else{
        $("#"+id_fila_antigua).removeClass('seleccionada');
        $("#"+idtr).addClass('seleccionada');
        id_fila_antigua=idtr;
    }

    var i     = $("#txt_proveedor_idpre" + posicionFila).val();
    var ruc   = $("#txt_proveedor_ruc" + posicionFila).val();
    var nomb  = $("#txt_proveedor_nombre" + posicionFila).val();
    var dire  = $("#txt_proveedor_dire" + posicionFila).val();
    var emai  = $("#txt_proveedor_emai" + posicionFila).val();
    var tele  = $("#txt_proveedor_tele" + posicionFila).val();
    var ncom  = $("#txt_proveedor_nomcom" + posicionFila).val();
    var dfis  = $("#txt_proveedor_dirfis" + posicionFila).val();
    var cpos  = $("#txt_proveedor_codpos" + posicionFila).val();
    var desc  = $("#txt_proveedor_desc" + posicionFila).val();
    var refe  = $("#txt_proveedor_refe" + posicionFila).val();
    var ubig  = $("#txt_proveedor_ubig" + posicionFila).val();
    var rubr  = $("#txt_proveedor_rubr" + posicionFila).val();
    var web   = $("#txt_proveedor_web" + posicionFila).val();
    var logo  = $("#txt_proveedor_logo" + posicionFila).val();
    var clie  = $("#txt_proveedor_clie" + posicionFila).val();
    var fpre  = $("#txt_proveedor_fpre" + posicionFila).val();
    var ureg  = $("#txt_proveedor_usreg" + posicionFila).val();
    var emplr = $("#txt_proveedor_emplr" + posicionFila).val();
    var emplpr= $("#txt_proveedor_emplpr" + posicionFila).val();
    var freg  = $("#txt_proveedor_freg" + posicionFila).val();

    $("#txt_proveedor_idemprr").val(i);
    $("#txt_proveedor_busrucc").val(ruc);
    $("#txt_proveedor_nombb").val(nomb);
    $("#txt_proveedor_diree").val(dire);
    $("#txt_proveedor_dirfiss").val(dfis);
    $("#txt_proveedor_nomcomm").val(ncom);
    $("#txt_proveedor_rubrr").val(rubr);
    $("#txt_proveedor_refee").val(refe);
    $("#txt_proveedor_descrr").val(desc);
    $("#txt_proveedor_telee").val(tele);
    $("#txt_proveedor_emaill").val(emai);
    $("#txt_proveedor_webb").val(web);
    $("#txt_proveedor_codpostt").val(cpos);
    //LLENAR DPTOS
    $("#cmb_proveedor_dptoo option").each(function() {
        $(this).removeAttr("selected");
    });
    var arrayCombo = ["cmb_proveedor_provv","cmb_proveedor_distt"];

    limpiaCombo(arrayCombo);

    listarDpto_proveedor("cmb_proveedor_dptoo",ubig);
}
function llenarDire_anidado(combo,ubigeo){
    var dpto= ubigeo.substring(0,2);
    var select="";
    $("#cmb_proveedor_dptoo option").each(function(){
        if ($(this).val() == dpto ){
            $("#cmb_proveedor_dptoo option[value="+ dpto +"]").attr("selected",true);
            document.getElementById("cmb_proveedor_dptoo").onchange();
            $("#hdn_proveedor_ubi").val(ubigeo);
        }
    });
}
function listarDpto_proveedor(combo, ubigeo) {
    /* var arrayCombo=["cmb_proveedor_provv","cmb_proveedor_distt"];
     limpiaCombo(arrayCombo);*/
    $("#hdn_proveedor_ubi").val("");
    $.ajax({
        method: "POST",
        url: "/proveedor/listardpto",
        data: {"combo":combo,"ubigeo":ubigeo},
        success: function resultado(valor) {
            if(valor=="anidados"){
                llenarDire_anidado(combo,ubigeo);
            }else{
                $("#" + combo).html(valor);
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function llenarProv() {
    var iddpto  = $("#cmb_proveedor_dptoo").val();
    $.ajax({
        method: "POST",
        url: "/proveedor/listarprov",
        data: {"iddpto":iddpto},
        success: function resultado(valor) {
            $("#cmb_proveedor_provv").html(valor);
            if($("#hdn_proveedor_ubi").val()!=""){
                var prov= $("#hdn_proveedor_ubi").val().substring(0,4);
                $("#cmb_proveedor_provv option").each(function(){
                    if ($(this).val() == prov ){
                        $("#cmb_proveedor_provv option[value="+ prov +"]").attr("selected",true);
                        document.getElementById("cmb_proveedor_provv").onchange();
                    }
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function llenarDist() {
    var idprov  = $("#cmb_proveedor_provv").val();
    $.ajax({
        method: "POST",
        url: "/proveedor/listardist",
        data: {"idprov":idprov},
        success: function resultado(valor) {
            $("#cmb_proveedor_distt").html(valor);
            if($("#hdn_proveedor_ubi").val()!=""){
                var dist= $("#hdn_proveedor_ubi").val();
                $("#cmb_proveedor_distt option").each(function(){
                    if ($(this).val() == dist ){
                        $("#cmb_proveedor_distt option[value="+ dist +"]").attr("selected",true);
                        document.getElementById("cmb_proveedor_distt").onchange();
                    }
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function guardaProveedor(){
    var valida=validarcampos();
    if(valida==true) {
        var i = $("#txt_proveedor_idemprr").val();
        var ruc = $("#txt_proveedor_busrucc").val();
        var nomb = $("#txt_proveedor_nombb").val().toUpperCase();
        var dire = $("#txt_proveedor_diree").val().toUpperCase();
        var dirf = $("#txt_proveedor_dirfiss").val().toUpperCase();
        var ncom = $("#txt_proveedor_nomcomm").val().toUpperCase();
        var rubr = $("#txt_proveedor_rubrr").val().toUpperCase();
        var refe = $("#txt_proveedor_refee").val().toUpperCase();
        var desc = $("#txt_proveedor_descrr").val().toUpperCase();
        var ubig = $("#cmb_proveedor_distt").val();
        var tele = $("#txt_proveedor_telee").val();
        var emai = $("#txt_proveedor_emaill").val().toUpperCase();
        var web = $("#txt_proveedor_webb").val().toUpperCase();
        var cpos = $("#txt_proveedor_codpostt").val();
        var logo = "D:/images/";//$("#txt_proveedor_rubrr").val();
        if (i == "") {i = "0";}
        var arrayDatos = [ruc, nomb, dire, dirf, ncom, rubr, refe, desc, ubig, tele, emai, web, cpos, logo, i];
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
            url: "/proveedor/guardar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(arrayData),
            success: function resultado(valor) {
                if (valor == "0") {//0:update
                    alert("Proveedor Actualizado Correctamente");
                } else {
                    alert("Proveedor Registrado Correctamente");
                }
                buscar_proveedor();
                $("#txt_proveedor_idemprr").val("");
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }else{

    }
}

function eliProveedor(){
    var i = $("#txt_proveedor_idemprr").val();
    if(i=="") {
        alert("Seleccione un Proveedor por favor");
    }else{
        $.ajax({
            method: "POST",
            url: "/proveedor/delete",
            data: {"i":i},
            success: function resultado(valor) {
                if (valor == "") {
                    alert("Se dió de baja al Proveedor.");
                    $("tbody tr td input").each(function() {
                        if ($(this).val() == i) {
                            $(this).closest('tr').remove();
                        }
                    });
                    CargarJS_proveedor(0,1,1);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}