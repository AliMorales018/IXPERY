var menuNivel1 = [];
var menuNivel2 = [];
var menuNivel3 = [];
var tabPaneles = [];

var idBro = 0;
var idActive = 0;


var mEquipo = {};
var mServicio = {};
var mViatico = {};
var mEquipoCot = {};
var mServicioCot = {};
var mViaticoCot = {};
var mSueldos = {};
var mProveedor = {};
var mProducto = {};
var mAsociarProd = {};
var mHpViaticos = {};
var mHisPrecio = {};
var mAsPrecio={};
var mAsociarServ={};
var mServicioSol={};

var isolJson;
var icotJson;
var iopeJson;

var iAsPrecio;
var iSueldos;


var navbar;
var sticky;


$(document).ready(function () {
    $.ajax({
        url: '/SistemaIntegral/menu',
        method: 'POST',
        success: function (data) {
            //console.log("ENTRE");
            //console.log(data);
            console.log('json');
            console.log(data);
            var JSONobj = JSON.parse(data);
            var lenghtDatos = JSONobj.length;
            var datos = JSONobj[1];
            console.log(JSONobj);

            var abc = 0;
            var abc2 = 0;
            for (var i = 0; i < lenghtDatos; ++i) {
                ++abc;
                $.each(JSONobj[i], function (key, value) {
                    ++abc2;
                    //if (key.match(/id/) && String(value)==="1") {
                    if (key==="id" && String(value)==="1") {
                        menuNivel1.push("<li><a id='menu-pri__" + JSONobj[i].idmenu + "' href='" + JSONobj[i].url + "'><div class='cell small-12 medium-2 large-2 celda'>" + JSONobj[i].descripcion + "</div></a></li>");
                    }
                    if (key==="id" && String(value)==="2") {

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 10) {
                                mHisPrecio = JSONobj[i].idmenu;
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 13) {
                                isolJson = JSONobj[i].idmenu;
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 23) {
                                mEquipo = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 24) {
                                mProducto = JSONobj[i];
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 25) {
                                iAsPrecio = JSONobj[i].idmenu;
                                mAsPrecio = JSONobj[i];
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 26) {
                                mAsociarProd = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 28) {
                                mProveedor = JSONobj[i];
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 29) {
                                mEquipoCot = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 30) {
                                mServicio = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 31) {
                                mServicioCot = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]) {
                            if (JSONobj[i].idmenu === 32) {
                                mViatico = JSONobj[i];
                                JSONobj.splice(i, 1);
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 33){
                                mViaticoCot = JSONobj[i];
                                JSONobj.splice(i,1);
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 34) {
                                icotJson = JSONobj[i].idmenu;
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 37) {
                                iopeJson = JSONobj[i].idmenu;
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 38) {
                                mEquipoCot = JSONobj[i];
                                JSONobj.splice(i,1);
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 39) {
                                mServicioCot = JSONobj[i];
                                JSONobj.splice(i,1);
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 40) {
                                mViaticoCot = JSONobj[i];
                                JSONobj.splice(i,1);
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 42) {
                                iSueldos = JSONobj[i].idmenu;
                                mSueldos = JSONobj[i];

                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 43) {
                                mHpViaticos = JSONobj[i];
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 45) {
                                mServicioSol = JSONobj[i];
                            }
                        }

                        if(JSONobj[i]){
                            if(JSONobj[i].idmenu === 47) {
                                mAsociarServ = JSONobj[i];
                            }
                        }



                    }

                });
            }
            $('#MenuPrincipal').html(menuNivel1);

            $('#prueba').on('click', function () {
                //console.log("SECUNDARIO");
            });




            $('a[id ^= menu-]').on('click', function (e) {
                var idFullPri = $(this).prop("id");
                var idPri = idFullPri.substring(10);
                //console.log("pr " + idFullPri);
                //console.log("pr " + idPri);
                //console.log("Menu principal");
                for (var i = 0; i < lenghtDatos; ++i) {
                    $.each(JSONobj[i], function (key, value) {
                        if (key==="idpadre" && String(value)===idPri) {
                            menuNivel2.push("<div class='cell small-6 medium-3 large-1 text-center'><li><a id='menu-sec__" + JSONobj[i].idmenu + "' class='menu-secundario' href='" + JSONobj[i].url + "'><div class='icon-object'><i class='"+JSONobj[i].icono+"'></i><span>" + JSONobj[i].descripcion + "</span></div></a></li></div>");
                        }
                    });
                }

                $('#MenuSecundario').html(menuNivel2);
                menuNivel2 = [];
            });

            $('#MenuSecundario').on('click', 'a[id ^= menu-sec__]', function (e) {
                //console.log("Llegue");
                var idFullSec = $(this).prop("id");
                var idSec = idFullSec.substring(10);
                var desSec = $(this).text();
                var urlSec = $(this).prop("href");

                //console.log(idFullSec);
                //console.log(idSec);
                //console.log(desSec);
                //console.log(urlSec);

                if ($('#menu-tab__' + idSec).length) {
                    //console.log("Existe");
                    $('div[id ^= panel__]').addClass("ocultar");
                    $('#panel__' + idSec).removeClass("ocultar").find('.controles-permanentes').each(function () {
                        navbar = $(this).get(0);
                        console.log('navbar');
                        console.log(navbar);

                        sticky = navbar.offsetTop;
                        console.log('sticky');
                        console.log(sticky);

                        window.onscroll = function() {FijarMenu()};
                    });




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
                        $('#panel__' + idSec).html(htmlexterno).find('.controles-permanentes').each(function () {
                            navbar = $(this).get(0);
                            console.log('navbar');
                            console.log(navbar);

                            sticky = navbar.offsetTop;
                            console.log('sticky');
                            console.log(sticky);

                            window.onscroll = function() {FijarMenu()};
                        });
                    });
                    tabPaneles = [];

                    // $('#main').find('button[id^=btn_solucion_pendientes]').each(function () {
                    //     alert('entre');
                    // });
                    //     .find('.controles-permanentes').each(function(){
                    //     navbar = $(this).get(0);
                    //     console.log('navbar');
                    //     console.log(navbar);
                    //
                    //     sticky = navbar.offsetTop;
                    //     console.log('sticky');
                    //     console.log(sticky);
                    //
                    //     window.onscroll = function() {FijarMenu()};
                    // });


                }




            });

            //console.log(idFullSec);
            //console.log(idSec);
            //console.log(desSec);
            //console.log(urlSec);

            $('#tabBar').on('click', 'a[id ^= menu-tab__]', function (e) {
                //console.log("Estoy en los tabs");
                var idFullTab = $(this).prop("id");
                var idTab = idFullTab.substring(10);
                var desTab = $(this).text();
                //console.log(idFullTab);
                //console.log(idTab);
                //console.log(desTab);

                // if($(this).attr('class') === 'tab-active'){
                //
                // }



                $('div[id ^= panel__]').removeClass("ocultar").addClass("ocultar");
                $('#panel__' + idTab).removeClass("ocultar").find('.controles-permanentes').each(function () {
                    navbar = $(this).get(0);
                    console.log('navbar');
                    console.log(navbar);

                    sticky = navbar.offsetTop;
                    console.log('sticky');
                    console.log(sticky);

                    window.onscroll = function() {FijarMenu()};
                });



                if(menuNivel3.length === 0){
                    $('#panel__0').removeClass('ocultar');
                    // $('main').find('div#panel__0').removeClass("ocultar");
                }



                $('a[id ^= menu-tab__]').removeClass('tab-active');
                $('#menu-tab__' + idTab).addClass('tab-active');


                if(idActive !== 0){
                    $('#menu-tab__' + idActive).addClass('tab-active');
                    $('#panel__' + idActive).removeClass("ocultar");
                    idActive = 0;
                }



                if(idBro !== 0){
                    $('#menu-tab__' + idBro).addClass('tab-active');
                    $('#panel__' + idBro).removeClass("ocultar");
                    idBro = 0;
                }

            });

            $('#tabBar').on('click', 'div[id ^= tab-cerrar__]', function (e) {
                //console.log("Estoy en cerrar");
                var idFullCerrar = $(this).prop("id");
                var idCerrar = idFullCerrar.substring(12);
                var textTab = $('#menu-tab__' + idCerrar).text();


                // $(this).closest('li').prev().children().addClass('tab-active');


                //console.log(menuNivel3);
                //var contenido = "<li><a id='menu-tab__" + idCerrar + "' class='tab'>" + textTab + "</a><div id='tab-cerrar__" + idCerrar + "' class='icon-cerrar'><i class='icon-x'></i></div></li>"
                var contenido = "<li><a id='menu-tab__" + idCerrar + "' class='tab'><span>" + textTab + "</span><div id='tab-cerrar__" + idCerrar + "' class='icon-cerrar'><i class='icon-x'></i></div></a></li>";
                //console.log(contenido);
                var irem = menuNivel3.indexOf(contenido);
                //console.log(irem);
                menuNivel3.splice(irem, 1);
                //console.log(menuNivel3);

                console.log('menuNivel3.length');
                console.log(menuNivel3.length);



                if(menuNivel3.length > 0){
                    // console.log('a');
                    // console.log(a);
                    if($(this).closest('a').attr('class').includes('tab-active')){
                        if(irem !== 0){
                            console.log('PREV');
                            let idPrev = $(this).closest('li').prev().find('a').attr('id');
                            idBro = idPrev.substring(10);
                            console.log(idBro);
                        }
                        else{
                            console.log('NEXT');
                            let idNext = $(this).closest('li').next().find('a').attr('id');
                            idBro = idNext.substring(10);
                            console.log(idBro);
                        }
                    }
                    else{
                        let act = $('.tab-active').attr('id');
                        idActive = act.substring(10);
                        console.log(idActive);
                    }




                }




                // $(this).parent('li a').remove();
                $('#menu-tab__' + idCerrar).closest('li').remove();
                $('#panel__' + idCerrar).remove();


                console.log('idCerrar');
                console.log(idCerrar);
                console.log('isolJson');
                console.log(isolJson);

                if(idCerrar == isolJson){
                    menuNivel3.splice(menuNivel3.indexOf(mEquipo), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mServicio), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mViatico), 1);
                    $('#menu-tab__' + mEquipo.idmenu).closest('li').remove();
                    $('#menu-tab__' + mServicio.idmenu).closest('li').remove();
                    $('#menu-tab__' + mViatico.idmenu).closest('li').remove();
                    $('#panel__' + mEquipo.idmenu).remove();
                    $('#panel__' + mServicio.idmenu).remove();
                    $('#panel__' + mViatico.idmenu).remove();
                    DestruirSesionSolucion();
                }

                if(idCerrar == icotJson){
                    menuNivel3.splice(menuNivel3.indexOf(mEquipoCot), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mServicioCot), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mViaticoCot), 1);
                    $('#menu-tab__' + mEquipoCot.idmenu).closest('li').remove();
                    $('#menu-tab__' + mServicioCot.idmenu).closest('li').remove();
                    $('#menu-tab__' + mViaticoCot.idmenu).closest('li').remove();
                    $('#panel__' + mEquipoCot.idmenu).remove();
                    $('#panel__' + mServicioCot.idmenu).remove();
                    $('#panel__' + mViaticoCot.idmenu).remove();
                    DestruirSesionSolucion();


                }

                if(idCerrar == iopeJson){
                    menuNivel3.splice(menuNivel3.indexOf(mEquipoCot), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mServicioCot), 1);
                    menuNivel3.splice(menuNivel3.indexOf(mViaticoCot), 1);
                    $('#menu-tab__' + mEquipoCot.idmenu).closest('li').remove();
                    $('#menu-tab__' + mServicioCot.idmenu).closest('li').remove();
                    $('#menu-tab__' + mViaticoCot.idmenu).closest('li').remove();
                    $('#panel__' + mEquipoCot.idmenu).remove();
                    $('#panel__' + mServicioCot.idmenu).remove();
                    $('#panel__' + mViaticoCot.idmenu).remove();
                    DestruirSesionSolucion();

                }

                if(idCerrar == iSueldos){
                    DestruirSesionCargoLaboral();
                }

                if(idCerrar == iAsPrecio){
                    DestruirSesionProducto();
                    DestruirSesionProveedor();
                }



            });


        },
        error: function (error) {
            alert("ERRROR" + error);
        }

    });

});



function FijarMenu() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}




function AddMenu(newMenu) {
    // console.log('trueMenu1');
    // console.log(trueMenu);
    let i = menuNivel3.indexOf(`<li><a id='menu-tab__${newMenu.idmenu}' class='tab'><span>${newMenu.descripcion}</span><div id='tab-cerrar__${newMenu.idmenu}' class='icon-cerrar'><i class='icon-x'></i></div></a></li>`);
    console.log('i');
    console.log(i);
    if(i < 0){
        menuNivel3.push(`<li><a id='menu-tab__${newMenu.idmenu}' class='tab'><span>${newMenu.descripcion}</span><div id='tab-cerrar__${newMenu.idmenu}' class='icon-cerrar'><i class='icon-x'></i></div></a></li>`);
        $('#tabBar').html(menuNivel3);
        $('#main')
            .append(`<div id='panel__${newMenu.idmenu}' class="ocultar"></div>`);

        $.post(newMenu.url, function (htmlExterno) {
            $('#panel__' + newMenu.idmenu).html(htmlExterno);
        });
        // trueMenu = false;
        // console.log('trueMenu2');
        // console.log(trueMenu);
        $('#menu-tab__' + newMenu.idmenu).addClass('tab-active');
        $('div[id ^= panel__]').addClass("ocultar");
        $('#panel__' + newMenu.idmenu).removeClass("ocultar");

    }


}


function DestruirSesionSolucion() {
    $.ajax({
        method: "POST",
        async: false,
        url: "/solucion/DestruirSesionSolucion",
        success: function(valor) {
            // alert("La sesion de solucion es: " + valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function DestruirSesionCargoLaboral() {
    $.ajax({
        method: "POST",
        async: false,
        url: "/cargolaboral/DestruirSesionCargoLaboral",
        success: function(valor) {
            // alert("La sesion de solucion es: " + valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function DestruirSesionProducto() {
    $.ajax({
        method: "POST",
        async: false,
        url: "/producto/DestruirSesionProducto",
        success: function(valor) {
            // alert("La sesion de solucion es: " + valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function DestruirSesionProveedor() {
    $.ajax({
        method: "POST",
        async: false,
        url: "/proveedor/DestruirSesionProveedor",
        success: function(valor) {
            // alert("La sesion de solucion es: " + valor);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}


