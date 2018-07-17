var menuNivel1 = [];
var menuNivel2 = [];
var menuNivel3 = [];
var tabPaneles = [];

var numero = 1;
$(document).ready(function () {
    $.ajax({
        url: '/SistemaIntegral/menu',
        method: 'POST',
        success: function (data) {
            //console.log("ENTRE");
            //console.log(data);

            var JSONobj = JSON.parse(data);
            var lenghtDatos = JSONobj.length;
            var datos = JSONobj[1];

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
                });
            }
            $('#MenuPrincipal').html(menuNivel1);

            $('#prueba').on('click', function () {
                //console.log("SECUNDARIO");
            })




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
                $('div[id ^= panel__]').removeClass("ocultar").addClass("ocultar");
                $('#panel__' + idTab).removeClass("ocultar");
                $('a[id ^= menu-tab__]').removeClass('tab-active');
                $('#menu-tab__' + idTab).addClass('tab-active');
            });

            $('#tabBar').on('click', 'div[id ^= tab-cerrar__]', function (e) {
                //console.log("Estoy en cerrar");
                var idFullCerrar = $(this).prop("id");
                var idCerrar = idFullCerrar.substring(12);
                var textTab = $('#menu-tab__' + idCerrar).text();
                //console.log(idFullCerrar);
                //console.log(idCerrar);
                $(this).parent('li a').remove();
                $('#panel__' + idCerrar).remove();
                //console.log(menuNivel3);
                //var contenido = "<li><a id='menu-tab__" + idCerrar + "' class='tab'>" + textTab + "</a><div id='tab-cerrar__" + idCerrar + "' class='icon-cerrar'><i class='icon-x'></i></div></li>"
                var contenido = "<li><a id='menu-tab__" + idCerrar + "' class='tab'><span>" + textTab + "</span><div id='tab-cerrar__" + idCerrar + "' class='icon-cerrar'><i class='icon-x'></i></div></a></li>";
                //console.log(contenido);
                var irem = menuNivel3.indexOf(contenido);
                //console.log(irem);
                menuNivel3.splice(irem, 1);
                //console.log(menuNivel3);
            });


        },
        error: function (error) {
            alert("ERRROR" + error);
        }

    });

});