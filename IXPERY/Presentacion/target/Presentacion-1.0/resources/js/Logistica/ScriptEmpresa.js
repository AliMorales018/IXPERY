var nomBody_empresa;
var idPriFilaBody_empresa = "firstRowBody_empresa";

CargarJS_empresa(0,0,0);

function limpiarTotal() {
    var arrayCajas=["txt_empresa_busrucc","txt_empresa_nombb","txt_empresa_diree","txt_empresa_dirfiss",
        "txt_empresa_nomcomm","txt_empresa_rubrr","txt_empresa_refee","txt_empresa_descrr",
        "txt_empresa_telee","txt_empresa_emaill","txt_empresa_webb","txt_empresa_codpostt","txt_empresa_idemprr"];
    var arrayCombo = ["cmb_empresa_dptoo","cmb_empresa_provv","cmb_empresa_distt"];
    limpiaCombo(arrayCombo);
    limpiarCajas(arrayCajas);
}
function validarcampos(){
    if($("#txt_empresa_busrucc").val()=="" || $("#txt_empresa_nomcomm").val()=="" || $("#txt_empresa_diree").val()==""){
        alert("Ingresar RUC, Nombre Comercial y Dirección como mínimo");
        return false;

    }else if(!$('#cmb_empresa_distt').val() || $('#cmb_empresa_distt').val()=="sel"){
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
function CargarJS_empresa(estado, childNodes, reloadTabla) {
    listarDpto_empresa("cmb_empresa_dptoo", "");
    buscar_empresa();
    limpiarTotal();
    //Nombre del body
    nomBody_empresa = "tbody_empresa";
    //ID del Body
    idPriFilaBody_empresa = "firstRowBody_empresa";
}


function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

//METODOS AJAX
function elimRegistro_empresa(posicionFila) {

    var i = $("#txt_empresa_idpre" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/empresa/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja a la Empresa.");
                $("#fila_empresa" + posicionFila).remove();
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_empresa(posicionFila) {

    var i = $("#txt_empresa_idpre" + posicionFila).val();
    var ruc =$("#Vtxt_empresa_ruc" + posicionFila).val();
    var dir = $("#txt_empresa_dire" + posicionFila).val();
    var ema = $("#txt_empresa_emai" + posicionFila).val();
    var tel = $("#txt_empresa_tele" + posicionFila).val();
    var nom = $("#txt_empresa_nombre" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/empresa/edit",
        data: {"i":i,"ruc":ruc,"dir":dir,"ema":ema,"tel":tel,"nom":nom},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Empresa Actualizada.");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function buscar_empresa() {
    //Alterna funcion del boton nuevo.
    $("#btn_empresa_nue").css("display", "none");
    $("#btn_empresa_nue_reload").css("display", "inline");
    $("#btn_empresa_save").attr("disabled", true);
    var ruc = $("#txt_empresa_busruc").val();
    var nom = $("#txt_empresa_busnomb").val().toUpperCase();
    var opc = $("#cmb_empresa_tipo").val();
    $.ajax({
        method: "POST",
        url: "/empresa/search",
        data: {"ruc":ruc,"nom":nom,"opc":opc},
        success: function resultado(valor) {
            // $("#thEditar_empresa").css("display", "block");
            $("#" + nomBody_empresa).html(valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
var idfilantigua_empresa="";
function llenarRegistro_empresa(idtr,posicionFila) {
    if(idfilantigua_empresa==""){//hover fila
        $("#"+idtr).addClass('seleccionada');
        idfilantigua_empresa=idtr;
    }else{
        $("#"+idfilantigua_empresa).removeClass('seleccionada');
        $("#"+idtr).addClass('seleccionada');
        idfilantigua_empresa=idtr;
    }

    var i = $("#txt_empresa_idpre" + posicionFila).val();
    var ruc = $("#txt_empresa_ruc" + posicionFila).val();
    var nomb = $("#txt_empresa_nombre" + posicionFila).val();
    var dire = $("#txt_empresa_dire" + posicionFila).val();
    var emai = $("#txt_empresa_emai" + posicionFila).val();
    var tele = $("#txt_empresa_tele" + posicionFila).val();
    var ncom = $("#txt_empresa_nomcom" + posicionFila).val();
    var dfis = $("#txt_empresa_dirfis" + posicionFila).val();
    var cpos = $("#txt_empresa_codpos" + posicionFila).val();
    var desc = $("#txt_empresa_desc" + posicionFila).val();
    var refe = $("#txt_empresa_refe" + posicionFila).val();
    var ubig = $("#txt_empresa_ubig" + posicionFila).val();
    var rubr = $("#txt_empresa_rubr" + posicionFila).val();
    var web = $("#txt_empresa_web" + posicionFila).val();
    var logo = $("#txt_empresa_logo" + posicionFila).val();
    var clie = $("#txt_empresa_clie" + posicionFila).val();
    var fpre = $("#txt_empresa_fpre" + posicionFila).val();
    var ureg = $("#txt_empresa_usreg" + posicionFila).val();
    var emplr = $("#txt_empresa_emplr" + posicionFila).val();
    var emplpr = $("#txt_empresa_emplpr" + posicionFila).val();
    var freg = $("#txt_empresa_freg" + posicionFila).val();

    $("#txt_empresa_idemprr").val(i);
    $("#txt_empresa_busrucc").val(ruc);
    $("#txt_empresa_nombb").val(nomb);
    $("#txt_empresa_diree").val(dire);
    $("#txt_empresa_dirfiss").val(dfis);
    $("#txt_empresa_nomcomm").val(ncom);
    $("#txt_empresa_rubrr").val(rubr);
    $("#txt_empresa_refee").val(refe);
    $("#txt_empresa_descrr").val(desc);
    $("#txt_empresa_telee").val(tele);
    $("#txt_empresa_emaill").val(emai);
    $("#txt_empresa_webb").val(web);
    $("#txt_empresa_codpostt").val(cpos);
    //LLENAR DPTOS
    $("#cmb_empresa_dptoo option").each(function () {
        $(this).removeAttr("selected");
    });
    var arrayCombo = ["cmb_empresa_provv", "cmb_empresa_distt"];

    limpiaCombo(arrayCombo);

    listarDpto_empresa("cmb_empresa_dptoo", ubig);
}

function llenarDire_anidado(combo,ubigeo){
    var dpto= ubigeo.substring(0,2);
    var select="";
    $("#cmb_empresa_dptoo option").each(function(){
        if ($(this).val() == dpto ){
            $("#cmb_empresa_dptoo option[value="+ dpto +"]").attr("selected",true);
            document.getElementById("cmb_empresa_dptoo").onchange();
            $("#hdn_empresa_ubi").val(ubigeo);
        }
    });
}

function listarDpto_empresa(combo, ubigeo) {
    /* var arrayCombo=["cmb_empresa_provv","cmb_empresa_distt"];
     limpiaCombo(arrayCombo);*/
    $("#hdn_empresa_ubi").val("");
    $.ajax({
        method: "POST",
        url: "/empresa/listardpto",
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
    var iddpto  = $("#cmb_empresa_dptoo").val();
    $.ajax({
        method: "POST",
        url: "/empresa/listarprov",
        data: {"iddpto":iddpto},
        success: function resultado(valor) {
            $("#cmb_empresa_provv").html(valor);
            if($("#hdn_empresa_ubi").val()!=""){
                var prov= $("#hdn_empresa_ubi").val().substring(0,4);
                $("#cmb_empresa_provv option").each(function(){
                    if ($(this).val() == prov ){
                        $("#cmb_empresa_provv option[value="+ prov +"]").attr("selected",true);
                        document.getElementById("cmb_empresa_provv").onchange();
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
    var idprov  = $("#cmb_empresa_provv").val();
    $.ajax({
        method: "POST",
        url: "/empresa/listardist",
        data: {"idprov":idprov},
        success: function resultado(valor) {
            $("#cmb_empresa_distt").html(valor);
            if($("#hdn_empresa_ubi").val()!=""){
                var dist= $("#hdn_empresa_ubi").val();
                $("#cmb_empresa_distt option").each(function(){
                    if ($(this).val() == dist ){
                        $("#cmb_empresa_distt option[value="+ dist +"]").attr("selected",true);
                        document.getElementById("cmb_empresa_distt").onchange();
                    }
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function guardaEmpresa(){
    var valida=validarcampos();
    if(valida==true) {
        var i = $("#txt_empresa_idemprr").val();
        var ruc = $("#txt_empresa_busrucc").val();
        var nomb = $("#txt_empresa_nombb").val().toUpperCase();
        var dire = $("#txt_empresa_diree").val().toUpperCase();
        var dirf = $("#txt_empresa_dirfiss").val().toUpperCase();
        var ncom = $("#txt_empresa_nomcomm").val().toUpperCase();
        var rubr = $("#txt_empresa_rubrr").val().toUpperCase();
        var refe = $("#txt_empresa_refee").val().toUpperCase();
        var desc = $("#txt_empresa_descrr").val().toUpperCase();
        var ubig = $("#cmb_empresa_distt").val().toUpperCase();
        var tele = $("#txt_empresa_telee").val().toUpperCase();
        var emai = $("#txt_empresa_emaill").val().toUpperCase();
        var web = $("#txt_empresa_webb").val().toUpperCase();
        var cpos = $("#txt_empresa_codpostt").val().toUpperCase();
        var logo = "D:/images/";//$("#txt_empresa_rubrr").val();
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
            url: "/empresa/guardar",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(arrayData),
            success: function resultado(valor) {
                if (valor == "0") {//0:update
                    alert("Empresa Actualizada Correctamente");
                } else {
                    alert("Empresa Registrada Correctamente");
                }
                buscar_empresa();
                $("#txt_empresa_idemprr").val("");
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }else{

    }
}

function eliEmpresa(){
    var i = $("#txt_empresa_idemprr").val();
    if(i==""){
        alert("Seleccione una Empresa por favor");
    }else{
        $.ajax({
            method: "POST",
            url: "/empresa/delete",
            data: {"i":i},
            success: function resultado(valor) {
                if (valor == "") {
                    alert("Se dió de baja a la Empresa.");
                    $("tbody tr td input").each(function() {
                        if ($(this).val() == i) {
                            $(this).closest('tr').remove();
                        }
                    });
                    CargarJS_empresa(0,1,1);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}