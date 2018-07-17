var filaRe = 1;
var contRe = 2;
var ultRe = 1;
var ultNr =1;
var idFilaRe = '#re_row' + ultRe;
var idFilaNr = '#nr_row' + ultNr;


// var clonedRow = $('tbody_equipo tr:first').clone();
// clonedRow.find('input').val('');
// $(this).prev().find($('tbody_equipo')).append(clonedRow);
$(document).ready(function(){
    buscarInput();
    //$('#cmb_equire_nom_1').addClass('ocultar');

    $('#IrMenu').on('click', 'a[id ^= menu-sec__]', function (e) {
        //console.log("Llegue");
        var idFullSec = $(this).prop("id");
        var idSec = idFullSec.substring(10);
        var desSec = $(this).text();
        var urlSec = $(this).prop("href");


        if ($('#menu-tab__' + idSec).length) {
            console.log("Existe");
            $('div[id ^= panel__]').addClass("ocultar");
            $('#panel__' + idSec).removeClass("ocultar");
            $('a[id ^= menu-tab__]').removeClass('tab-active');
            $('#menu-tab__' + idSec).addClass('tab-active');
            e.preventDefault();
        }
        else {
            //console.log("No Existe");
            //menuNivel3.push("<li><a id='menu-tab__" + idSec + "'>" + desSec + "</a><span id='tab-span__" + idSec + "' class='span'>X</span></li>");
            menuNivel3.push("<li><a id='menu-tab__" + idSec + "' class='tab'><span>" + desSec + "</span><div id='tab-cerrar__" + idSec + "' class='icon-cerrar'><i class='icon-x'></i></div></a></li>");
            $('#tabBar').html(menuNivel3);
            $('#menu-tab__' + idSec).addClass('tab-active');
            $('div[id ^= panel__]').addClass("ocultar");
            tabPaneles.push("<div id='panel__" + idSec + "'></div>");
            $('#main').append(tabPaneles);
            e.preventDefault();
            //$('#panel__' + idSec).load(urlSec);
            $.post(urlSec, function (htmlexterno) {
                $('#panel__' + idSec).html(htmlexterno);
            });
            tabPaneles = [];
        }

    });



    // $('#txt_equire_nom_1').bind("enterKey",function(e){
    //     alert("Enter key pressed");
    // });


    /*
    $('#txt_equire_nom_1').on('keypress', function (e) {
        if(e.which === 13){
            alert("ENTRE");
            //Disable textbox to prevent multiple submit
            //$(this).attr("disabled", "disabled");

            //Do Stuff, submit, etc..

            //Enable the textbox again if needed.
            //$(this).removeAttr("disabled");
        }
    });
    */
    // $('txt_equire_nom_1').keyup(function(e){
    //     if(e.keyCode == 13)
    //     {
    //         $(this).trigger("enterKey");
    //     }
    // });


});

function EquipoCotizar() {
    var tbody_re = $("#tbody_equire tr");
    var tbody_nr = $("#tbody_equinr tr");
    var length_re = tbody_re.length;
    var length_nr = tbody_nr.length;

    length_re = tbody_re.length;
    length_nr = tbody_nr.length;

    console.log(length_re);
    console.log(length_nr);
    var nom;
    var cod;
    var mod;
    var mrc;
    var ume;
    var cnt;
    var pid;

    var arrayDatos_re=[];
    var arrayDatos_nr=[];

    for(let i = 1; i<length_re; ++i){
        var filaData = [];
        nom = tbody_re.find("#txt_equire_nom_"+i).val();
        cnt = tbody_re.find("#txt_equire_cnt_"+i).val();
        pid = tbody_re.find("#txt_equire_pid_"+i).val();
        filaData.push(pid);
        // filaData.push(nom);
        filaData.push(cnt);
        console.log(filaData);
        arrayDatos_re.push(filaData);
        console.log("Primer array " + filaData);

    }
    console.log("Segundo array " + arrayDatos_re);

    var arrayData_re = {
        values: arrayDatos_re
    }




    for(let i = 1; i<length_nr; ++i){
        var filaData = [];
        nom = tbody_nr.find("#txt_equinr_nom_"+i).val();
        cod = tbody_nr.find("#txt_equinr_cod_"+i).val();
        mod = tbody_nr.find("#txt_equinr_mod_"+i).val();
        mrc = tbody_nr.find("#txt_equinr_mrc_"+i).val();
        ume = tbody_nr.find("#txt_equinr_ume_"+i).val();
        cnt = tbody_nr.find("#txt_equinr_cnt_"+i).val();
        filaData.push(nom);
        // filaData.push(cod);
        // filaData.push(mod);
        // filaData.push(mrc);
        filaData.push(ume);
        filaData.push(cnt);
        console.log(filaData);
        arrayDatos_nr.push(filaData);
    }

    console.log("NR: "+arrayDatos_nr);

    var arrayData_nr = {
        values: arrayDatos_nr
    }

    // var arrayData = {values: arrayData_re, arrayData_nr}


    $.ajax({
        method: "POST",
        url: "/equipo/register",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(arrayData_re),
        success: function resultado(valor) {
            if (valor == "") {
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





                // $("#txt_equire_nom_"+i).html("");
                // $("#spn_equire_cod_"+i).html("");
                // $("#spn_equire_mod_"+i).html("");
                // $("#spn_equire_mrc_"+i).html("");
                // $("#spn_equire_ume_"+i).html("");
                // $("#txt_equire_cnt_"+i).html("");
            }
            else {
                alert(valor);
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });






    // if($("#selectEmpresa").val() != 0  && $("#selectProyecto").val() != 0) {
    //     var iE = $("#selectEmpresa").val()
    //     var iP = $("#selectProyecto").val()
    //     //METODO AJAX
    //     $.ajax({
    //         method: "POST",
    //         url: "/requerimiento/register",
    //         data: {"values":arrayDatos.toString(),"iE":iE,"iP":iP},
    //         success: function resultado(valor) {
    //             if (valor == "") {
    //                 alert("Requerimiento(s) registrado(s) correctamente.");
    //                 $("#" + nomBody_requerimiento).html(filaTabla_requerimiento);
    //                 limpiarCombos();
    //                 CargarJS_requerimiento(0, 1, 0);
    //             }
    //             else {
    //                 alert(valor);
    //             }
    //         },
    //         error: function errores(msg) {
    //             alert('Error: ' + msg.responseText);
    //         }
    //     });
    // }
    // else{
    //     alert("Seleccione una empresa o proyecto válido.");
    // }
}

function buscarInput() {
    //alert("ACA ESTOY");
    $("input[id^='txt_equire_nom_']").on("keyup", function(e){
        if(e != undefined){
            if(e.keyCode == 13){
                var id = $(this).attr('id');
                var my_id = id.substr(15,16);
                var parametro = $(this).val();
                console.log(my_id);
                console.log(parametro);

                searchProducto(parametro, my_id);
                $('#cmb_equire_nom_'+my_id).attr('size', function(){
                    var length = $('#cmb_equire_nom_'+my_id+' option').length;
                    if(length <= 4){
                        return 2;
                    }
                    else{
                        return 4;
                    }
                });

                $(this).addClass("ocultar");
                $('#cmb_equire_nom_'+my_id).removeClass("ocultar");
            }
        }


    });
}

// $('#txt_equire_nom_1').on("keyup", function checkKey(evt){
//     // var keyID = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
//     // alert(keyID);
//     alert(evt);
//     if(evt != undefined){
//         if(evt.keyCode == 13){
//             $('#cmb_equire_nom_1').attr('size', function(){
//                 var length = $('#cmb_equire_nom_1 option').length;
//                 if(length <= 4){
//                     return length;
//                 }
//                 else{
//                     return 4;
//                 }
//             });
//
//             $(this).addClass("ocultar");
//
//         }
//     }
//
//
// });
//
//
// $('#cmb_equire_nom_1 option').click(function(){
//     $(this).attr('selected', true);
//     $('#cmb_equire_nom_1').attr('size', false);
//     $('#txt_equire_nom_1').val(this.value).removeClass("ocultar");
// });



function searchProducto(parametro, my_id) {
    $.ajax({
        method: "POST",
        url: "/equipo/productos",
        data: {"prod":parametro},
        success: function resultado(data) {
            console.log(data);
            if(data == "0"){
                $("#cmb_equire_nom_"+my_id).html("<option>No se encontraron productos...</option>");
                $('#cmb_equire_nom_'+my_id+' option').click(function(){
                    //alert("Si escuché");
                    $(this).attr('selected', true);
                    $('#cmb_equire_nom_'+my_id).attr('size', false);
                    $('#cmb_equire_nom_'+my_id).addClass("ocultar");
                    $('#txt_equire_nom_'+my_id).val(this.value).removeClass("ocultar");
                });
            }
            else{

                $("#cmb_equire_nom_"+my_id).empty();
                var JSONobj = JSON.parse(data);
                var lenghtDatos = JSONobj.length;
                //$("#cmb_equire_nom_1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_equire_nom_"+my_id).append('<option value="'+item[0]+'">'+item[3]+' - '+item[4]+'</option>');
                });

                $('#cmb_equire_nom_'+my_id+' option').click(function(){
                    //alert("Si escuché");
                    var valor = this.value;
                    console.log(valor);

                    console.log(JSONobj);
                    $(this).attr('selected', true);
                    $('#cmb_equire_nom_'+my_id).attr('size', false);
                    $('#cmb_equire_nom_'+my_id).addClass("ocultar");


                    for (var i = 0; i < lenghtDatos; ++i) {
                        $.each(JSONobj[i], function (key, value) {
                            //if (key==="n_idproducto" && String(value)===valor) {ESTO ES DE JUAN DESCOMENTAR SINO SALE
                            if (String(value)===valor) {
                                $('#txt_equire_nom_'+my_id).val(JSONobj[i][3]).removeClass("ocultar");
                                $('#spn_equire_cod_'+my_id).html(JSONobj[i][2]);
                                $('#spn_equire_mod_'+my_id).html(JSONobj[i][4]);
                                $('#spn_equire_mrc_'+my_id).html(JSONobj[i][5]);
                                $('#spn_equire_ume_'+my_id).html(JSONobj[i][1]);
                                $('#txt_equire_pid_'+my_id).val(JSONobj[i][0]);
                                // var a = $('#txt_equire_pid_'+my_id).val(JSONobj[i].idproducto);
                                // console.log(a);
                            }
                        });
                    }
                });
            }
        },
        error: function errores(msg) {
            //alert('Error: ' + msg.responseText);
        }
    });
}

function AgregarFilaNr() {
    var new_id = ultNr + 1;
    var clon = $(idFilaNr).clone().attr('id', 'nr_row'+ new_id)
        .children()
        .each(function() {
            $(this).find('*')
                .each(function() {
                    var name = String(this.name);
                    var id = String(this.id);
                    this.name = name.substr(0,15) + new_id;
                    this.id = id.substr(0,15) + new_id;
                })
        });

    var idFilaNrNew = '#nr_row' + new_id;
    var idTr = 'nr_row' + new_id;
    var tr = document.createElement('tr');
    tr.setAttribute("id", idTr);
    $("#tbody_equinr").append(tr);
    $(idFilaNrNew).append(clon);
    ++ultNr;
    buscarInput();
}

function AgregarFilaRe(){
    var new_id = ultRe + 1;
    var re_clon = $(idFilaRe).clone().attr('id', 're_row'+ new_id)
        .children()
        .each(function() {
            $(this).find('*')
                .each(function() {
                    var name = String(this.name);
                    var id = String(this.id);
                    this.name = name.substr(0,15) + new_id;
                    this.id = id.substr(0,15) + new_id;
                })
        });

    var idFilaReNew = '#re_row' + new_id;
    var idTr = 're_row' + new_id;
    var tr = document.createElement('tr');
    tr.setAttribute("id", idTr);
    $("#tbody_equire").append(tr);
    $(idFilaReNew).append(re_clon);
    ++ultRe;
    buscarInput();
}

//LUIS


//FIN LUIS