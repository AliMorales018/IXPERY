var hdempresa;
var hdproyecto;
var hdrequerimiento;
var hdsolucion;

$(document).ready(function () {
    txtBuscarEmpresa();
    txtBuscarProyecto();
    txtBuscarRequerimiento();
});

function txtBuscarEmpresa() {
    $("#txt_solucion_emp").on("keyup", function(e){
        if(e != undefined){
            if(e.keyCode == 13){
                var emp = $(this).val();
                console.log(emp);
                buscarEmpresa(emp);
                $('#cmb_solucion_emp').attr('size', function(){
                    var length = $('#cmb_solucion_emp option').length;
                    if(length <= 4){
                        return 2;
                    }
                    else{
                        return 4;
                    }
                });

                $(this).addClass("ocultar");
                $('#cmb_solucion_emp').removeClass("ocultar");
            }
        }

    });

}

function txtBuscarProyecto() {
    $("#txt_solucion_pro").on("keyup", function(e){
        if(e != undefined){
            if(e.keyCode == 13){
                var emp = hdempresa;
                var pro = $(this).val();
                console.log(emp + pro);
                console.log(emp);
                buscarProyecto(emp,pro);
                $('#cmb_solucion_pro').attr('size', function(){
                    var length = $('#cmb_solucion_pro option').length;
                    if(length <= 4){
                        return 2;
                    }
                    else{
                        return 4;
                    }
                });

                $(this).addClass("ocultar");
                $('#cmb_solucion_pro').removeClass("ocultar");
            }
        }

    });

}

function txtBuscarRequerimiento() {
    $("#txt_solucion_req").on("keyup", function(e){
        if(e != undefined){
            if(e.keyCode == 13){
                var pro = hdproyecto;
                var req = $(this).val();
                console.log(pro + req);
                buscarRequerimiento(pro, req);
                $('#cmb_solucion_req').attr('size', function(){
                    var length = $('#cmb_solucion_req option').length;
                    if(length <= 4){
                        return 2;
                    }
                    else{
                        return 4;
                    }
                });

                $(this).addClass("ocultar");
                $('#cmb_solucion_req').removeClass("ocultar");
            }
        }

    });

}



function txtBuscarSolucion() {
    $("#txt_solucion_sol").on("keyup", function(e){
        if(e != undefined){
            if(e.keyCode == 13){
                var sol = $(this).val();
                buscarSolucion(sol);


            }
        }

    });

}



function buscarEmpresa(emp) {
    $.ajax({
        method: "POST",
        url: "/solucion/empresa",
        data: {"emp":emp},
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_solucion_emp").html("<option>No se encontraron productos...</option>");
                $('#cmb_solucion_emp option').click(function(){
                    //alert("Si escuché");
                    $(this).attr('selected', true);
                    $('#cmb_solucion_emp').attr('size', false);
                    $('#cmb_solucion_emp').addClass("ocultar");
                    $('#txt_solucion_emp').val(this.value).removeClass("ocultar");
                });
            }
            else{
                $("#cmb_solucion_emp").empty();
                var JSONobj = JSON.parse(data);
                var lenghtDatos = JSONobj.length;
                //$("#cmb_equire_nom_1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_solucion_emp").append('<option value="'+item.idempresa+'">'+item.nomempresa+' - '+item.ruc+'</option>');
                });

                $('#cmb_solucion_emp option').click(function(){
                    //alert("Si escuché");
                    var valor = this.value;

                    $(this).attr('selected', true);
                    $('#cmb_solucion_emp').attr('size', false);
                    $('#cmb_solucion_emp').addClass("ocultar");
                    console.log(JSONobj);
                    console.log(valor);
                    console.log(lenghtDatos);

                    //$('#txt_solucion_emp').val(this.option).text().removeClass("ocultar");
                    for (var i = 0; i < lenghtDatos; ++i) {
                        $.each(JSONobj[i], function (key, value) {
                            if (key==="idempresa" && String(value)===valor) {
                                console.log("entre"+key+value);
                                $('#txt_solucion_emp').val(JSONobj[i].nomempresa).removeClass("ocultar");
                                hdempresa = JSONobj[i].idempresa;
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

function buscarProyecto(emp, pro) {
    $.ajax({
        method: "POST",
        url: "/solucion/proyecto",
        data: {"emp":emp, "pro":pro},
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_solucion_pro").html("<option>No se encontraron productos...</option>");
                $('#cmb_solucion_pro option').click(function(){
                    //alert("Si escuché");
                    $(this).attr('selected', true);
                    $('#cmb_solucion_pro').attr('size', false);
                    $('#cmb_solucion_pro').addClass("ocultar");
                    $('#txt_solucion_pro').val(this.value).removeClass("ocultar");
                });
            }
            else{
                $("#cmb_solucion_pro").empty();
                var JSONobj = JSON.parse(data);
                var lenghtDatos = JSONobj.length;
                //$("#cmb_equire_nom_1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    $("#cmb_solucion_pro").append('<option value="'+item.idproyecto+'">'+item.nomproyecto+'</option>');
                });

                $('#cmb_solucion_pro option').click(function(){
                    //alert("Si escuché");
                    var valor = this.value;

                    $(this).attr('selected', true);
                    $('#cmb_solucion_pro').attr('size', false);
                    $('#cmb_solucion_pro').addClass("ocultar");
                    console.log(JSONobj);
                    console.log(valor);
                    console.log(lenghtDatos);

                    for (var i = 0; i < lenghtDatos; ++i) {
                        $.each(JSONobj[i], function (key, value) {
                            if (key==="idproyecto" && String(value)===valor) {
                                console.log("entre"+key+value);
                                $('#txt_solucion_pro').val(JSONobj[i].nomproyecto).removeClass("ocultar");
                                hdproyecto = JSONobj[i].idproyecto;
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

function buscarRequerimiento(pro, req) {
    $.ajax({
        method: "POST",
        url: "/solucion/requerimiento",
        data: {"pro":pro, "req":req},
        success: function resultado(data) {
            if(data == "0"){
                $("#cmb_solucion_req").html("<option>No se encontraron productos...</option>");
                $('#cmb_solucion_req option').click(function(){
                    //alert("Si escuché");
                    $(this).attr('selected', true);
                    $('#cmb_solucion_req').attr('size', false);
                    $('#cmb_solucion_req').addClass("ocultar");
                    $('#txt_solucion_req').val(this.value).removeClass("ocultar");
                });
            }
            else{
                $("#cmb_solucion_req").empty();
                var JSONobj = JSON.parse(data);
                var lenghtDatos = JSONobj.length;
                //$("#cmb_equire_nom_1").append("<option value='0'>Seleccione . . .</option>");
                $.each(JSONobj, function (obj, item) {
                    console.log(item.idrequerimiento+item.nomrequerimiento);
                    $("#cmb_solucion_req").append('<option value="'+item.idrequerimiento+'">'+item.nomrequerimiento+'</option>');
                });

                $('#cmb_solucion_req option').click(function(){
                    //alert("Si escuché1");
                    var valor = this.value;

                    $(this).attr('selected', true);
                    $('#cmb_solucion_req').attr('size', false);
                    $('#cmb_solucion_req').addClass("ocultar");
                    console.log(JSONobj);
                    console.log(valor);
                    console.log(lenghtDatos);

                    for (var i = 0; i < lenghtDatos; ++i) {
                        $.each(JSONobj[i], function (key, value) {
                            if (key==="idrequerimiento" && String(value)===valor) {
                                //alert("Si escuché1");

                                console.log("entre"+key+value);
                                $('#txt_solucion_req').val(JSONobj[i].nomrequerimiento).removeClass("ocultar");
                                hdrequerimiento = JSONobj[i].idrequerimiento;
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

function buscarSolucion(req) {
    $.ajax({
        method: "POST",
        url: "/solucion/solucion",
        data: {"req":req},
        success: function resultado(data) {
            if(data == "0"){
                //
            }
            else{
                var JSONobj = JSON.parse(data);
                var lenghtDatos = JSONobj.length;
                hdsolucion = JSONobj[0].idsolucion;
                alert(hdsolucion);
                $('#txt_solucion_nom').val(JSONobj[1].nomsolucion);
                $('#txt_solucion_fch').val(JSONobj[2].fechacreacion);
                $('#txt_solucion_enc').val(JSONobj[3].encargadosol);
                $('#txt_solucion_des').val(JSONobj[4].descripcion);


            }
        },
        error: function errores(msg) {
            //alert('Error: ' + msg.responseText);
        }
    });


}






function RegistrarSolucion() {
    // var id;
    // var obj;
    // var arrayDatos = [];
    // for (var i = 1; i <= cFila_requerimiento; i++) {
    //     if (1 == 1) {
    //         var filaData = []
    //         for (var j = 1; j <= totalCol_requerimiento - 2; j++) {
    //             var id = arrayElem_requerimiento[j][1];
    //             id = "#" + id.substring(0, id.length - 1);
    //             obj = $(id + i);
    //             obj.removeClass("is-invalid");
    //             filaData[j - 1] = obj.val();
    //
    //             //Validando Campos Vacios tipo INPUT
    //             if (obj[0].tagName == 'INPUT') {
    //                 if (obj.val().length == 0) {
    //                     validoIngresados = false;
    //                     obj.addClass("is-invalid");
    //                     obj.focus();
    //                     break;
    //                 }
    //             }
    //             //Fin Validacion de campos vacios.
    //         }
    //     }
    //     else {
    //         break;
    //     }
    //     arrayDatos.push(filaData);
    // }

    var txt_fch = $('#txt_solucion_fch').val();

    console.log("Fecha nav: " + txt_fch);
    fch = moment(txt_fch, 'YYYY-MM-DD');
    fch = fch.format('DD-MM-YYYY');
    console.log("FECHA: " + fch);


    //var arrayDatos = [$('#txt_solucion_nom').val(), fch , $('#txt_solucion_enc').val(), $('#txt_solucion_des').val()];
    var arrayDatos = [$('#txt_solucion_nom').val(), $('#txt_solucion_enc').val(), $('#txt_solucion_des').val()];

    var iR = hdrequerimiento;

    console.log(arrayDatos);
    console.log(iR);



    $.ajax({
        method: "POST",
        url: "/solucion/register",
        data: {"values":arrayDatos.toString(),"iR":iR},
        success: function resultado(valor) {
            if (valor == "") {
                alert("Solucion registrada correctamente.");
                //$("#" + nomBody_requerimiento).html(filaTabla_requerimiento);
                //limpiarCombos();
                //CargarJS_requerimiento(0, 1, 0);
                $('#txt_solucion_nom').val('');
                $('#txt_solucion_fch').val('');
                $('#txt_solucion_enc').val('');
                $('#txt_solucion_des').val('');
                $('#txt_solucion_emp').val('');
                $('#txt_solucion_pro').val('');
                $('#txt_solucion_req').val('');


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