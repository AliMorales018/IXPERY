var count_otroserpr;
var dolRowOtroSer2 = '';
dolRowOtroSer2+= '<tr class="otrosepr-edit">';
dolRowOtroSer2+= '<td><div><p class="text-center" id="p_otrosepr_num"></p></div></td>';
dolRowOtroSer2+= '<td><div><span id="spn_otrosepr_nomserv" class="line-height-asoprod"></span></div></td>';
dolRowOtroSer2+= '<td style="width: 280px"><div><select name="select_filtrar_insumoot2" class="select_equipo_equipos" style="width: 250px"></select></div></td>';
dolRowOtroSer2+= '<td hidden><div><span id="spn_otrosepr_idpreregsoli"></span></div></td>';
dolRowOtroSer2+= '<td class="text-center"><div><a href="/servsolicitados" class="btn btn-sm-search"><i class="icon icon-plus2"></i></a></div></td>';
dolRowOtroSer2+= '</tr>';

var dolRowOtroSer2HTML = $.parseHTML(dolRowOtroSer2);

var rowCloneOtroSer2;

$(document).ready(function() {
    CargarOtSerNRBDD();
});

function CargarOtSerNRBDD() {
    var idSolucion = 1;
    count_otroserpr = 0;
    $.ajax({
        method: "POST",
        url: "/asociarservicio/verservicionbsolucion",
        data: {"i":idSolucion},
        success: function resultado(data) {
            if(data != 0) {
                let JSONobjServSolic = JSON.parse(data);
                console.log(JSONobjServSolic)
                $.each(JSONobjServSolic, function (obj, item) {
                    count_otroserpr++;
                    let rowCloneOtSer2=$(dolRowOtroSer2HTML).clone().prop({id:'row-otrosepr-' + count_otroserpr});
                    rowCloneOtSer2.find('p').html(count_otroserpr);
                    rowCloneOtSer2.find('span[id=spn_otrosepr_nomserv]').html(item.NOMSERVICIO);
                    rowCloneOtSer2.find('span[id=spn_otrosepr_idpreregsoli]').html(item.IDPREREGISTRO);

                    $("table #tbody_asociarservsolic").append(rowCloneOtSer2)
                        .find('tr:last-child').find('select[name=select_filtrar_insumoot2]')
                        .select2({
                            ajax: {
                                url: "/otroservi/buservsolic",
                                dataType: 'json',
                                delay: 250,
                                data: function (params) {
                                    return {
                                        q: params.term
                                    };
                                },
                                processResults: function (data, params) {
                                    // $.each(data.equ, function(i, d) {
                                    //     data.equ[i]['id'] = d.equ1;
                                    // });
                                    return {
                                        results: data.items
                                    };
                                },
                                cache: true
                            },
                            placeholder: 'Buscar por servicio . . .',
                            escapeMarkup: function (markup) { return markup; },
                            minimumInputLength: 3,
                            templateResult: formatRepoAsocOtS2,
                            templateSelection: formatRepoSelectionAsocOtS2
                        })
                });

            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function formatRepoAsocOtS2 (repo) {
    if (repo.loading) {
        return repo.text;
    }
    var markup = "<div class='selectotroservi2-result-otroservicioproducto'><span class='selectotroservi2-span-otroservicioresult'>SERVICIO: </span>"+repo.serviciosolicitado+"</div>";
    return markup;
}

function formatRepoSelectionAsocOtS2 (repo) {
    return repo.text || repo.serviciosolicitado;
}


function save_servsoli_asociados() {
   /* var idSolucion;
    var idPreRegistro;
    var idProducto;
    var campos;
    var cadena = "";

    for (var i = 1; i < count_otroserpr; i++) {
        if ($("#select_filtrar_insumoot2_" + i).val() != null) {
            idSolucion = 1;
            idPreRegistro = $("#txt_id_preregot2_" + i).text();
            idProducto = $("#select_filtrar_insumoot2_" + i).val();
            campos = idSolucion + "," + idPreRegistro + "," + idProducto;
            cadena = cadena + campos + ";";
        }
    }

    if (cadena != "") {
        $.ajax({
            method: "POST",
            url: "/asociarproducto/register",
            data: {"value": cadena},
            success: function resultado(data) {
                if(data == ""){
                    alert("Productos Asociados Correctamente");
                    $("#tbody_asociarproducto").empty();
                    CargarOtSerNRBDD();
                }
                else{
                    alert(data);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }*/
}