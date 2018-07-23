//ARRAY DE TODOS LOS ELEMENTOS DE LA PRIMERA FILA : TABLA EQUIPO PRODUCTOS EXISTENTES EN BD
var arrayElem_equipo = [];
arrayElem_equipo.push(["P", "p_num_equipo1", ]);
arrayElem_equipo.push(["SELECT","cmb_equipo_nompro1", "select-one"]);
arrayElem_equipo.push(["SPAN", "spn_equipo_codpro1", "text"]);
arrayElem_equipo.push(["SPAN", "spn_equipo_modpro1", "text"]);
arrayElem_equipo.push(["SPAN", "spn_equipo_marpro1", "text"]);
arrayElem_equipo.push(["SPAN", "spn_equipo_medpro1", "text"]);
arrayElem_equipo.push(["INPUT", "txt_equipo_canpro1", "text"]);
arrayElem_equipo.push(["BUTTON","equipo_1_btn_elim_1", "button"]);

var childNodo_equipo;
var nomBody_equipo="tbody_equipo";
var conta_filas_equipo=1;
//INICIO DE FUNCIONES PARA EQUIPOS REGISTRADOS
function addEquipos_equipo(obj){
    conta_filas_equipo++;
    var id = obj.id;
    var Equipo = id.split("add_row_");
    //alert(Equipo[1]);
    var childs = $("#"+Equipo[1] + " tbody tr").length;

    childs++;

    $("#"+Equipo[1]+" tbody").append(
        "<tr id='"+Equipo[1]+"_fila_"+childs+"'>"+
        "<td><div><p id='p_num_equipo"+conta_filas_equipo+"' class='text-center'>"+childs+"</p></></td>"+
        "<td><div><select id='cmb_equipo_nompro"+conta_filas_equipo+"' name='cmb_equipo_nompro' class='select_equipo_equipos' style='width: 100%;'></select></div></td>"+
        "<td><div><span id='spn_equipo_codpro"+conta_filas_equipo+"' name='spn_equipo_codpro'></span></div></td>"+
        "<td><div><span id='spn_equipo_modpro"+conta_filas_equipo+"' name='spn_equipo_modpro'></span></div></td>"+
        "<td><div><span id='spn_equipo_marpro"+conta_filas_equipo+"' name='spn_equipo_marpro'></span></div></td>"+
        "<td><div><span id='spn_equipo_medpro"+conta_filas_equipo+"' name='spn_equipo_medpro'></span></div></td>"+
        "<td><div><input type='text' id='txt_equipo_canpro"+conta_filas_equipo+"' name='txt_equipo_canpro' type='text' class='form-control' /></div></td>"+
        "<td><div class='text-center'><button id='"+Equipo[1]+"_btn_elim_"+childs+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_equipos(this);'><i class='icon icon-bin '></i></button></div></td>"+
        "<td hidden><div><input type='text' id='txt_equipo_idprodo"+conta_filas_equipo+"' name='txt_equipo_idprodo' type='text' class='form-control' /></div></td>"+
        "</tr>"
    );
    contPrimervez++;
    borrar_select2();
    clonar_select2(conta_filas_equipo);

}
function clonar_select2(fila){

    $('#cmb_equipo_nompro'+fila).select2({
        ajax: {
            url: "/equipo/busproducto",
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
        placeholder: 'Buscar por producto . . .',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
        templateResult: formatRepoProd,
        templateSelection: formatRepoSelectionProd
    });

}

function borrar_select2(){
    $('.js-example-basic-single').select2("destroy");
}


//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD

function eliminar_fila_tabla_equipos(obj){
    var id = obj.id;
    var splitId = id.split("_btn_elim_");
    var childs = $("#"+splitId[0] + " tbody tr").length;

    if(childs > 1){
        $("#"+splitId[0]+"_fila_"+splitId[1]).remove();
        reordernar_num_tabla_equipos(splitId[0]);
    }
    conta_filas_equipo--;
    contaprueba=1;
    ReordenarId_tbl_equipo();
}

function reordernar_num_tabla_equipos(idEquipo){
    var contador = 1;
    var obj = $("#"+idEquipo+ " tbody tr");

    $(obj).each(function () {
        $(this).find("p").text(contador);
        contador++;
    });
}
/*
function ReordenarId_tbl_equipo() {
    var r = 1;
    var aux = 0;
    var child;
    var idText;
    var pasoPri = 1;
    var tbody_equipo = document.getElementById(nomBody_equipo);
    var totalColumnas_equipo=8;

    for (var i = 1; i <= conta_filas_equipo; i++) {
        if (pasoPri == 1) {
            for (var j = 1; j <= ((totalColumnas_equipo - 1) * 2) + 1; j += 2) {
                child = tbody_equipo.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_equipo[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
            //if (childNodo_preempresa == 0) {
            if (i == 1) {
                i = i + 1;
            }
            // }
            pasoPri = 2;
        }
        else {
            aux = 0;
            for (var j = 0; j <= totalColumnas_equipo - 2; j++) {
                child = tbody_equipo.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idText = arrayElem_equipo[aux][1];
                idText = idText.substring(0, idText.length - 1);
                child.id = idText + r;
                child.name = idText + r;
                aux++;
            }
        }
        r++;
    }
}
*/

//FIN GUARDAR EQUIPOS PRODUCTOS REGISTRADOS
//FIN DE FUNCIONES QUE OPERAN A NIVEL DE LA TABLA
//FIN DE FUNCIONES PARA EQUIPOS REGISTRADOS
/*
* ------------------------------------------------------------------------------------
* ------------------------------------------------------------------------------------
* ------------------------------------------------------------------------------------
* */
//INICIO DE FUNCIONES PARA EQUIPOS NO REGISTRADOS

//ARRAY DE TODOS LOS ELEMENTOS DE LA PRIMERA FILA : TABLA EQUIPO PRODUCTOS EXISTENTES EN BD
var arrayElem_equiponr = [];
arrayElem_equiponr.push(["P", "p_num_equiponr", ]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_nompro1", "text"]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_codpro1", "text"]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_modpro1", "text"]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_marpro1", "text"]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_medpro1", "text"]);
arrayElem_equiponr.push(["INPUT", "txt_equiponr_canpro1", "text"]);
arrayElem_equiponr.push(["BUTTON", "equiponr_1_btn_elim_1", "button"]);

var childNodo_equiponr;
var nomBody_equiponr="tbody_equiponr";
var conta_filas_equiponr=1;

function addEquipos_equiponr(objnr){

    conta_filas_equiponr++;

    var idnr = objnr.id;
    var Equiponr = idnr.split("add_row_");

    var childsnr = $("#"+Equiponr[1] + " tbody tr").length;
    childsnr++;

    $("#"+Equiponr[1]+" tbody").append(
        "<tr id='"+Equiponr[1]+"_fila_"+childsnr+"'>"+
        "<td><div><p id='p_num_equiponr"+conta_filas_equiponr+"' class='text-center'>"+childsnr+"</p></div></td>"+
        "<td><div><input id='txt_equiponr_nompro"+conta_filas_equiponr+"' name='txt_equiponr_nompro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_codpro"+conta_filas_equiponr+"' name='txt_equiponr_codpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_modpro"+conta_filas_equiponr+"' name='txt_equiponr_modpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_marpro"+conta_filas_equiponr+"' name='txt_equiponr_marpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_medpro"+conta_filas_equiponr+"' name='txt_equiponr_medpro' type='text' class='form-control' /></div></td>"+
        "<td><div><input id='txt_equiponr_canpro"+conta_filas_equiponr+"' name='txt_equiponr_canpro' type='text' class='form-control' /></div></td>"+
        "<td><div class='text-center'><button id='"+Equiponr[1]+"_btn_elim_"+childsnr+"' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_equiposnr(this);'><i class='icon icon-bin '></i></button></div></td>"+
        "</tr>"
    );
}

//FUNCIONES QUE OPERAN A NIVEL DE TABLA DENTRO DE CONTENEDOR DE ACTIVIDAD

function eliminar_fila_tabla_equiposnr(objnr){
    var idnr = objnr.id;
    var splitIdnr = idnr.split("_btn_elim_");
    var childsnr = $("#"+splitIdnr[0] + " tbody tr").length;

    if(childsnr > 1){
        $("#"+splitIdnr[0]+"_fila_"+splitIdnr[1]).remove();
        reordernar_num_tabla_equiposnr(splitIdnr[0]);
    }
    conta_filas_equiponr--;
    ReordenarId_tbl_equiponr();

}
function eliminar_fila_tabla_equipos(obj){
    var id = obj.id;
    var splitId = id.split("_btn_elim_");
    var childs = $("#"+splitId[0] + " tbody tr").length;

    if(childs > 1){
        $("#"+splitId[0]+"_fila_"+splitId[1]).remove();
        reordernar_num_tabla_equipos(splitId[0]);
    }
    conta_filas_equipo--;
    contaprueba=1;
    ReordenarId_tbl_equipo();
}
function reordernar_num_tabla_equiposnr(idEquiponr){
    var contadornr = 1;
    var obj = $("#"+idEquiponr+ " tbody tr");

    $(obj).each(function () {
        $(this).find("p").text(contadornr);
        contadornr++;
    });
}

function ReordenarId_tbl_equiponr() {
    var rnr = 1;
    var auxnr = 0;
    var childnr;
    var idTextnr;
    var pasoPrinr = 1;
    var tbody_equiponr = document.getElementById(nomBody_equiponr);
    var totalColumnas_equiponr=8;

    for (var i = 1; i <= conta_filas_equiponr; i++) {
        if (pasoPrinr == 1) {
            for (var j = 1; j <= ((totalColumnas_equiponr - 1) * 2) + 1; j += 2) {
                childnr = tbody_equiponr.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idTextnr = arrayElem_equipo[auxnr][1];
                idTextnr = idTextnr.substring(0, idTextnr.length - 1);
                childnr.id = idTextnr + rnr;
                childnr.name = idTextnr + rnr;
                auxnr++;
            }
            //if (childNodo_preempresa == 0) {
            if (i == 1) {
                i = i + 1;
            }
            // }
            pasoPrinr = 2;
        }
        else {
            auxnr = 0;
            for (var j = 0; j <= totalColumnas_equiponr - 2; j++) {
                childnr = tbody_equiponr.childNodes[i].childNodes[j].childNodes[0].firstChild;
                idTextnr = arrayElem_equiponr[auxnr][1];
                idTextnr = idTextnr.substring(0, idTextnr.length - 1);
                childnr.id = idTextnr + rnr;
                childnr.name = idTextnr + rnr;
                auxnr++;
            }
        }
        rnr++;
    }
}

//GUARDAR PRODUCTOS EQUIPOS REGISTRADOS Y NO REGISTRADOS
var arrayDatos_extras=[];
var arrayDatos_re=[];
var arrayDatos_nr=[];
var arrayData_re;
var arrayData_nr;
var arrayData_completo;

function RegistrarEquipo_equipo() {
    var tbody_re = $("#tbody_equipo tr");
    var tbody_nr = $("#tbody_equiponr tr");
    var length_re = tbody_re.length;
    var length_nr = tbody_nr.length;

    var sid=$("#selectEmpresaEquipo_Proyecto").val();
    var filaDataExtras=[];
    filaDataExtras.push(sid);
    arrayDatos_extras.push(filaDataExtras);

    //RECORRER EQUIPOS PRODUCTOS REGISTRADOS
    for(var i = 1; i<=length_re; i++){
        var filaData = [];

        var pid = tbody_re.find("#txt_equipo_idprodo"+i).val();
        var cod = tbody_re.find("#spn_equipo_codpro"+i).text();
        var mod = tbody_re.find("#spn_equipo_modpro"+i).text();
        var mrc = tbody_re.find("#spn_equipo_marpro"+i).text();
        var ume = tbody_re.find("#spn_equipo_medpro"+i).text();
        var cnt = tbody_re.find("#txt_equipo_canpro"+i).val();

        filaData.push(pid);filaData.push(cod);filaData.push(mod);filaData.push(mrc);filaData.push(ume);filaData.push(cnt);

        arrayDatos_re.push(filaData);
    }

    //RECORRER EQUIPOS PRODUCTOS NO REGISTRADOS
    for(var i = 1; i<=length_nr; i++){
        var filaData = [];

        var nomnr = tbody_nr.find("#txt_equiponr_nompro"+i).val();
        var codnr = tbody_nr.find("#txt_equiponr_codpro"+i).val();
        var modnr = tbody_nr.find("#txt_equiponr_modpro"+i).val();
        var mrcnr = tbody_nr.find("#txt_equiponr_marpro"+i).val();
        var umenr = tbody_nr.find("#txt_equiponr_medpro"+i).val();
        var cntnr = tbody_nr.find("#txt_equiponr_canpro"+i).val();

        filaData.push(nomnr);filaData.push(codnr);filaData.push(modnr);filaData.push(mrcnr);filaData.push(umenr);filaData.push(cntnr);

        arrayDatos_nr.push(filaData);
    }

    arrayData_completo = {
        values0:arrayDatos_extras,
        values1: arrayDatos_re,
        values2: arrayDatos_nr
    }

    console.log(JSON.stringify(arrayData_completo));

     $.ajax({
         method: "POST",
         url: "/equipo/register",
         contentType: "application/json; charset=utf-8",
         data: JSON.stringify(arrayData_completo),
         success: function resultado(valor) {
             /*if (valor == "") {
                 //alert("Producto(s) registrado(s) correctamente.");
                 console.log("aqa");
                 console.log(arrayData_nr);
                 $.ajax({
                     method: "POST",
                     url: "/equipo/preregister",
                     contentType: "application/json; charset=utf-8",
                     data: JSON.stringify(arrayData_nr),
                     success: function resultado(valor) {
                         if (valor == "") {
                             alert("Producto(s) registrado(s) correctamente.");

                             for(let i = 1; i<length_re; ++i) {
                                 $("#txt_equire_nom_" + i).val("");
                                 $("#spn_equire_cod_" + i).html("");
                                 $("#spn_equire_mod_" + i).html("");
                                 $("#spn_equire_mrc_" + i).html("");
                                 $("#spn_equire_ume_" + i).html("");
                                 $("#txt_equire_cnt_" + i).val("");
                             }

                             for(let i = 1; i<length_nr; ++i) {
                                 $("#txt_equinr_nom_" + i).val("");
                                 $("#txt_equinr_cod_" + i).val("");
                                 $("#txt_equinr_mod_" + i).val("");
                                 $("#txt_equinr_mrc_" + i).val("");
                                 $("#txt_equinr_ume_" + i).val("");
                                 $("#txt_equinr_cnt_" + i).val("");
                             }

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
                 alert(valor);
             }*/
         },
         error: function errores(msg) {
             alert('Error: ' + msg.responseText);
         }
     });
}

function addEquiposUpdate_equipo(obj){
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