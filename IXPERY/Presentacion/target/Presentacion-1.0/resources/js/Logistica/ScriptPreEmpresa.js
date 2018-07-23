var idFila_preempresa = 1;
var cFila_preempresa = 1;
var arrayElem_preempresa = [];
var arrayElemV_preempresa = [];
var array_preempresa = [];
var totalCol_preempresa;
var tabla_preempresa;
var tbody_preempresa;
var valorNodo_preempresa;
var childNodo_preempresa;
var btnNuevo_preempresa;
var nomTabl_preempresa;
var nomBody_preempresa;
var txtHiFi_preempresa;
var txtInVa_preempresa;
var idPriFilaBody_preempresa = "firstRowBody_preempresa";
var tipoOpcion_preempresa=0;
//-----------------------------------------------------------------
//INICIO VARIABLES PARA EDITAR EN BLOQUE SÓLO DONDE SE HAYA MODIFICADO
//-------------------------------------------------------------------
//var arrayDatos_preempresa=[];
//contador de input, select, ect por fila
var contarray_preempresa=0;
//contador de indices del Array arrcompleto_preempresa
var contcompleto_preempresa=0;
//array por fila
var arr_preempresa=[];
//array de todas las filas
var arrcompleto_preempresa = [];
//array temporal se llena siempre y cuando haya modificacion en el DOM
var arrtempfinal_preempresa=[];
//array comparado a guardar
var arrfinalCompleto_preempresa=[];
//id de fila posición para el hover
var idfilantigua_preempresa="";
//array que se convierte a json stringfy
var arrayDataFinal_preeempresa=[];
//Nota: cuando de en el botón nuevo reiniciar variables y arrays temporales,
// siempre y cuando arrayfinal esté vacío/////
//FIN DE VARIABLES PARA EDITAR EN BLOQUE SÓLO DONDE SE HAYA MODIFICADO
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//Variable para guardar los valores de la primera fila de la tabla.
var filaTabla_preempresa
filaTabla_preempresa = filaTabla_preempresa + "<tr id='" + idPriFilaBody_preempresa + "'>";
filaTabla_preempresa = filaTabla_preempresa + $("#" + idPriFilaBody_preempresa).html();
filaTabla_preempresa = filaTabla_preempresa + "</tr>";
//Fin primera fila.

CargarJS_preempresa(0,0,0);

function CargarJS_preempresa(estado, childNodes, reloadTabla) {
    idFila_preempresa = 1;
    cFila_preempresa = 1;
    arrayElem_preempresa = [];
    arrayElemV_preempresa = [];
    array_preempresa = [];
    childNodo_preempresa = childNodes;

//INICIO: REINICIAR VARIABLES Y ARRAYS QUE SIRVEN PARA LA EDICIÓN DE FILAS MÚLTIPLES
    if(arrfinalCompleto_preempresa.length>0){
        var mensaje;
        var opcion = confirm("Hizo algunas modificaciones desea guardarlas");
        if (opcion == true) {
            alert("Guardando....");
            //METODO AJAX
            $.ajax({
                method: "POST",
                url: "/preempresa/editbloque",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayDataFinal_preeempresa),
                success: function resultado(valor) {
                    alert(valor);
                    CargarJS_preempresa(0, 1, 0);
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        } else {
            alert("No se guardarán");
        }
        contarray_preempresa=0;
        contcompleto_preempresa=0;
        arr_preempresa;
        arrcompleto_preempresa = [];
        arrtempfinal_preempresa=[];
        arrfinalCompleto_preempresa=[];
        idfilantigua_preempresa="";
        arrayDataFinal_preeempresa=[];
    }else{
        alert("El array de modificación en bloque está vacío");
    }

//FIN DE REINICIO

    if (childNodes == 1) {
        $("#" + nomBody_preempresa).html(filaTabla_preempresa);
    }

    //Ocultamos la columna de editar.
    $("#thEditar_preempresa").css('display', 'none');

    //Valores Script
    btnNuevo_preempresa = "btn_preempresa_nue";
    //Btn de reload nuevo.
    btnNuevo_preempresa_reload = "btn_preempresa_nue_reload";
    //Btn guardar.
    btn_preempresa_save = "btn_preempresa_save";
    //Nombre de la tabla
    nomTabl_preempresa = "tbl_preempresa";
    //Nombre del body
    nomBody_preempresa = "tbody_preempresa";
    //Contar fila de tabla
    txtHiFi_preempresa = "hdn_preempresa";
    //Validar Base de Datos
    txtInVa_preempresa = "hdn_preempresa_isvalid";
    //ID del Body
    idPriFilaBody_preempresa = "firstRowBody_preempresa";

    //Alternar botones Nuevo
    $("#" + btnNuevo_preempresa).css('display', 'inline');
    $("#" + btnNuevo_preempresa_reload).css('display', 'none');
    //Activar boton guardar.
    $('#' + btn_preempresa_save).attr("disabled", false);

    if (estado == 0) {

        tabla_preempresa = document.getElementById(nomTabl_preempresa);
        tbody_preempresa = document.getElementById(nomBody_preempresa);
        document.getElementById(txtHiFi_preempresa).value = cFila_preempresa;

        if (childNodo_preempresa == 0 && reloadTabla == 0) {
            totalCol_preempresa = tbody_preempresa.childNodes[1].children.length;
            $("#" + btnNuevo_preempresa).on('click', function () {
                idFila_preempresa++;
                funcNuevaLinea_tbl_preempresa(idFila_preempresa, tabla_preempresa.id);
                document.getElementById(txtHiFi_preempresa).value = cFila_preempresa;
            });
        }

        for (var i = 1; i <= totalCol_preempresa; i++) {
            var campo = document.getElementById("campo" + i + "_" + nomTabl_preempresa);
            var type;
            if (campo.firstChild.tagName == 'SELECT' && campo.firstChild.id.substring(0, 1) == "D") {
                type = "disabled";
            }
            else {
                type = campo.firstChild.type;
            }
            arrayElem_preempresa.push([campo.firstChild.tagName, campo.firstChild.id, type]);
            if (campo.firstChild.tagName == "INPUT") {
                $("#" + campo.firstChild.id).attr("onkeyup", "convertUpperCase(this);");
            }

            if (campo.firstChild.id.substring(0, 1) == "V") {
                var idTextV = campo.firstChild.id;
                idTextV = idTextV.substring(0, idTextV.length - 1);
                arrayElemV_preempresa.push(idTextV);
            }
        }
    }
    else {
        alert("Script ya esta cargado.");
    }
}

function eliminar_fila_tbl_preempresa(id) {
    var idTabla = tabla_preempresa.id;
    var idstr = id.split('_elim');
    if (idstr[1].length == 1) {
        var id = id.substring(id.length - 1, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_preempresa(idTabla);
        cFila_preempresa = cFila_preempresa - 1;
        document.getElementById(txtHiFi_preempresa).value = cFila_preempresa;
    }
    else {
        var id = id.substring(id.length - 2, id.length);
        $('#' + idTabla + "_fila" + id).remove();
        Reordenar_num_tbl_preempresa(idTabla);
        cFila_preempresa = cFila_preempresa - 1;
        document.getElementById(txtHiFi_preempresa).value = cFila_preempresa;
    }
    ReordenarId_tbl_preempresa(idTabla);
}

function Reordenar_num_tbl_preempresa(idTabla) {
    var num = 1;
    $id = "#" + idTabla + " tbody tr";
    $($id).each(function () {
        $(this).find("td p").text(num);
        num++;
    });
}

function ReordenarId_tbl_preempresa(idTabla) {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_preempresa = document.getElementById(nomBody_preempresa);
    var cantFilas = 0;
    var cantColumnasP = 0;
    var cantColumnasS = 0;

    if (childNodo_preempresa == 1) {
        valorNodo_preempresa = 0;
        cantFilas = cFila_preempresa - 1;
    }

    else {
        valorNodo_preempresa = 1;
        cantFilas = cFila_preempresa + 1;
    }

    for (var i = valorNodo_preempresa; i <= cantFilas; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalCol_preempresa - 1) * 2) + 1; j += 2) {
                child = tbody_preempresa.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_preempresa[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            if (childNodo_preempresa == 0) {
                if (i == 1) {
                    i = i + 1;
                }
            }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalCol_preempresa - 2; j++) {
                child = tbody_preempresa.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_preempresa[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}

function funcNuevaLinea_tbl_preempresa(cont, idTabla) {
    var nuevaFila = "";
    var contSelect = 0;
    var idDiv = "";
    cFila_preempresa++;
    $("#" + idTabla + ">tbody")
        .append
        (
            $('<tr>').attr('id', idTabla + "_fila" + idFila_preempresa)
                .append
                (
                    function () {
                        for (var i = 0; i < totalCol_preempresa; i++) {
                            var tagName = arrayElem_preempresa[i][0];
                            var idText = arrayElem_preempresa[i][1];
                            var type = arrayElem_preempresa[i][2];
                            if (tagName == 'SELECT') {
                                contSelect++;
                                idDiv = "div" + contSelect + "_" + nomTabl_preempresa + "_";
                            }
                            idText = idText.substring(0, idText.length - 1);
                            switch (tagName) {
                                case 'P': nuevaFila = nuevaFila + "<td><div><p class='text-center'>" + idFila_preempresa + "</p></div></td>";
                                    break;
                                case 'BUTTON': nuevaFila = nuevaFila + "<td><div class='d-flex justify-content-center'><button class='btn btn-sm-delete' id='" + idText + idFila_preempresa + "' onclick='eliminar_fila_tbl_preempresa(this.id)'><i class='icon icon-bin'></i></button></div></td>";
                                    break;
                                case 'INPUT': nuevaFila = nuevaFila + "<td><div><input type='" + type + "' required='' onkeyup='convertUpperCase(this);' runat='server' id='" + idText + idFila_preempresa + "' name='" + idText + idFila_preempresa + "' class='form-control'/></div></td>"
                                    break;
                                case 'SELECT': if (type == 'disabled') {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_preempresa + "'><script type='text/javascript'>$('#" + idDiv + idFila_preempresa + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_preempresa + "').attr('id','" + idText + idFila_preempresa + "').attr('name','" + idText + idFila_preempresa + "').attr('runat','server').attr('disabled',''))</script></div></td>"
                                }
                                else {
                                    nuevaFila = nuevaFila + "<td><div id='" + idDiv + idFila_preempresa + "'><script type='text/javascript'>$('#" + idDiv + idFila_preempresa + "').prepend($('#" + idText + "1').clone().insertAfter('#" + idDiv + idFila_preempresa + "').attr('id','" + idText + idFila_preempresa + "').attr('name','" + idText + idFila_preempresa + "').attr('runat','server'))</script></div></td>"
                                }
                                    break;
                            }
                        }
                        return nuevaFila;
                    }
                )
        );
    Reordenar_num_tbl_preempresa(idTabla);
    ReordenarId_tbl_preempresa(idTabla);
}

function convertUpperCase(e) {
    e.value = e.value.toUpperCase();
}

function ValidarCampos_tbl_preempresa() {
    var obj;
    var val;
    var id;
    var nFilas;
    tabla_preempresa = document.getElementById(nomTabl_preempresa);
    var idTabla = tabla_preempresa.id;
    nFilas = $('#' + txtHiFi_preempresa).val();
    array_preempresa = ObtenerValores_tbl_preempresa(nFilas);
    document.getElementById(txtInVa_preempresa).value = "true";
    for (var a = 0; a < array_preempresa.length; a++) {
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_preempresa[a] + i);
            obj.removeClass("is-invalid");
            val = obj.val().trim();
            id = obj.attr('id');
            for (var j = 1; j <= nFilas; j++) {
                if (array_preempresa[a][j - 1][1] != id) {
                    if (array_preempresa[a][j - 1][0] == val) {
                        document.getElementById(txtInVa_preempresa).value = "false";
                        obj.addClass("is-invalid");
                        obj.focus();
                    }
                }
            }
        }
    }

    if (document.getElementById(txtInVa_preempresa).value == "false") {
        alert("No pueden existir dos campos con el mismo nombre.");
        return false;
    }
    if (document.getElementById(txtInVa_preempresa).value == "true") {
        var validoIngresados = true;

        //LLENANDO LISTA CON DATOS INGRESADOS
        var id;
        var obj;
        var arrayDatos = [];
        for (var i = 1; i <= cFila_preempresa; i++) {
            if (validoIngresados == true) {
                var filaData = []
                for (var j = 1; j <= totalCol_preempresa - 2; j++) {
                    obj.removeClass("is-invalid");
                    var id = arrayElem_preempresa[j][1];
                    id = "#" + id.substring(0, id.length - 1);
                    obj = $(id + i);
                    filaData[j - 1] = obj.val();

                    //Validando Campos Vacios tipo INPUT
                    if (obj[0].tagName == 'INPUT') {
                        if (obj.val().length == 0) {
                            validoIngresados = false;
                            obj.addClass("is-invalid");
                            obj.focus();
                            break;
                        }
                    }
                    //Fin Validacion de campos vacios.
                }
            }
            else {
                break;
            }
            arrayDatos.push(filaData);
        }

        //LISTA CON DATOS
        var arrayData = {
            values: arrayDatos
        }
        console.log(arrayData);
        if (validoIngresados == true) {
            //METODO AJAX
            $.ajax({
                method: "POST",
                url: "/preempresa/register",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(arrayData),
                success: function resultado(valor) {
                    if (valor == "") {
                        alert("Empresa(s) pre-registrada(s) correctamente.");
                        $("#" + nomBody_preempresa).html(filaTabla_preempresa);
                        CargarJS_preempresa(0, 1, 0);
                    }
                    else {
                        alert(valor);
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
        else {
            alert("No puede ingresar un campo vacio.");
        }
    }
}

function ObtenerValores_tbl_preempresa(nFilas) {
    var arrayConjunto = [];
    var Valor;
    var Id;
    for (var j = 0; j < arrayElemV_preempresa.length; j++) {
        var arrayValId = [];
        for (var i = 1; i <= nFilas; i++) {
            obj = $("#" + arrayElemV_preempresa[j] + i);
            Valor = obj.val().trim();
            Id = obj.attr('id');
            arrayValId.push([Valor, Id]);
        }
        arrayConjunto.push(arrayValId);
    }
    return arrayConjunto;
}



















//METODOS AJAX
function elimRegistro_preempresa(posicionFila) {

    var i = $("#txt_preempresa_idpre" + posicionFila).val();

    $.ajax({
        method: "POST",
        url: "/preempresa/delete",
        data: {"i":i},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Se dió de baja a la Empresa.");
                $("#fila_preempresa" + posicionFila).remove();
                Reordenar_num_tbl_preempresa("tbl_preempresa");
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function editRegistro_preempresa(posicionFila) {
    var i = $("#txt_preempresa_idpre" + posicionFila).val();
    var ruc =$("#Vtxt_preempresa_ruc" + posicionFila).val();
    var dir = $("#txt_preempresa_dire" + posicionFila).val();
    var ema = $("#txt_preempresa_emai" + posicionFila).val();
    var tel = $("#txt_preempresa_tele" + posicionFila).val();
    var nom = $("#txt_preempresa_nombre" + posicionFila).val();
    $.ajax({
        method: "POST",
        url: "/preempresa/edit",
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

function buscar_preempresa() {
    //Reiniciar contadores y arrays temporales
    contarray_preempresa=0;
    contcompleto_preempresa=0;
    arr_preempresa=[];
    arrcompleto_preempresa=[];
    //Alterna funcion del boton nuevo.
    $("#btn_preempresa_nue").css("display", "none");
    $("#btn_preempresa_nue_reload").css("display", "inline");
    $("#btn_preempresa_save").attr("disabled", true);
    var ruc = $("#txt_preempresa_busruc").val();
    var nom = $("#txt_preempresa_busnomb").val().toUpperCase();

    $.ajax({
        method: "POST",
        url: "/preempresa/search",
        data: {"ruc":ruc,"nom":nom,"opc":2},
        success: function resultado(valor) {
            $("#thEditar_preempresa").css("display", "block");
            $("#" + nomBody_preempresa).html(valor);

            var nFilas= $("#tbl_preempresa tbody tr").length;
            var nColumnas = $("#tbl_preempresa tr:last td").length - 3;

            arr_preempresa = new Array(nColumnas);

            for(var i=0; i < nFilas; i++) {
                var nomtr="#fila_preempresa"+(i+1);
                $("#tbl_preempresa #tbody_preempresa " + nomtr + "").find("td").each(function () {
                    var valor=$(this).find("input").val();
                    if(valor==undefined){

                    }else{
                        arr_preempresa[contarray_preempresa] = $(this).find("input").val();
                        contarray_preempresa++;
                    }
                });
                arrcompleto_preempresa[contcompleto_preempresa]=arr_preempresa;
                contcompleto_preempresa++;
                arr_preempresa=[];
                contarray_preempresa=0;
            }
            contcompleto_preempresa=0;
            //console.log(arrcompleto_preempresa);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function llenarRegArray_preempresa(idtr,posicionFila) {
    if(idfilantigua_preempresa==""){//hover fila
        $("#"+idtr).addClass('seleccionada');
        idfilantigua_preempresa=idtr;
    }else{
        $("#"+idfilantigua_preempresa).removeClass('seleccionada');
        $("#"+idtr).addClass('seleccionada');
        idfilantigua_preempresa=idtr;
    }

    //Obtengo valor del Id
    var i = $("#txt_preempresa_idpre" + posicionFila).val();

    //verifico si el id existe en array temporal
    if (arr_preempresa.indexOf(i) === -1) {
        arr_preempresa.push(i);
        console.log('La nueva colección es: ' + arr_preempresa);
    } else if (arr_preempresa.indexOf(i) > -1) {
        console.log(i + ' ya existe en la colección .');
    }
}

function comparaArrayGuardar_preempresa(){
    var cArrayCompleto=arrcompleto_preempresa.length;
    var cArrayTemp=arr_preempresa.length;
    for(var i=0; i < cArrayCompleto; i++) {
        for(var j=0; j < cArrayTemp; j++) {
            if(arrcompleto_preempresa[i][0]==arr_preempresa[j]){
                //Sirve para contar los elementos de cada posicion del array
                //var cElemArrayCompleto=arrcompleto_preempresa[i].length;
                var posFila=i+1;
                var idd=$("#txt_preempresa_idpre"+posFila).val();
                var ruc=$("#Vtxt_preempresa_ruc"+posFila).val();
                var nom=$("#txt_preempresa_nombre"+posFila).val();
                var dir=$("#txt_preempresa_dire"+posFila).val();
                var ema=$("#txt_preempresa_emai"+posFila).val();
                var tel=$("#txt_preempresa_tele"+posFila).val();
                // alert(idd+","+ruc+","+nom+","+dir+","+ema+","+tel);
                //alert("tel de array completo: " +arrcompleto_preempresa[i][5]);
                if(idd===arrcompleto_preempresa[i][0] &&
                    ruc===arrcompleto_preempresa[i][1] &&
                    nom===arrcompleto_preempresa[i][2] &&
                    dir===arrcompleto_preempresa[i][3] &&
                    ema===arrcompleto_preempresa[i][4] &&
                    tel===arrcompleto_preempresa[i][5]){
                }else{
                    arrtempfinal_preempresa= new Array(idd,ruc,nom,dir,ema,tel);
                    arrfinalCompleto_preempresa[contcompleto_preempresa] = arrtempfinal_preempresa;
                    contcompleto_preempresa++;
                    //alert("a menos 1 fue distinto");
                }
            }
        }
    }
    arrayDataFinal_preeempresa = {
        values: arrfinalCompleto_preempresa
    }
}