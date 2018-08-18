var count_productos_pr;

$(document).ready(function() {
    let sol = 0;
    $.ajax({
        method: "POST",
        async: false,
        url:"/solucion/VerificarSesionSolucion",
        data:{},
        success: function resultado(data) {
            sol = data;
            //SESION CARGO
            console.log("SESION ID CARGO: "+ sol);
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });

    CargarProductosNRBDD(sol);
});




function CargarProductosNRBDD(sol) {
    var idSolucion = sol;
    count_productos_pr = 1;
    $.ajax({
        method: "POST",
        url: "/asociarproducto/verproductosnbsolucion",
        data: {"i":idSolucion},
        success: function resultado(data) {
            if(data != 0) {
                var JSONobj = JSON.parse(data);
                $.each(JSONobj, function (obj, item) {
                    $("#tbody_asociarproducto").append(
                        "<tr>" +
                        "<td id='row_enum_" + count_productos_pr + "' class='text-center line-height-asoprod'><p class='text-center'>" + count_productos_pr + "</p></td>" +
                        "<td style='display: none'><span id='txt_id_preregistro_" + count_productos_pr + "'>"+item.IDPREREGISTRO+"</span></td>" +
                        "<td><span class='line-height-asoprod'>" + item.NOMPRODUCTO + "</span></td>" +
                        "<td style='width: 280px'><select id='select_filtrar_insumo_" + count_productos_pr + "' style='width: 250px'></select></td>" +
                        "<td class='text-center'><a href='/producto' class='btn btn-sm-search'><i class='icon icon-plus2'></i></a></td>" +
                        "</tr>"
                    );
                    count_productos_pr++;
                });
                for (var i = 1; i <= count_productos_pr; i++) {
                    setOptions("txt_input_businsumo_"+i, "onkeyup='select_buscar_productoinsumo(event,this);'");
                    $("#select_filtrar_insumo_"+i).select2({placeholder: "Buscar Producto . . ."});
                }
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function select_buscar_productoinsumo(event,obj) {
    obj.value = obj.value.toUpperCase();
    if (event.keyCode == 16) {
        if (obj.value != "") {
            var id = obj.id;
            id = id.split("txt_input_businsumo_");
            $.ajax({
                method: "POST",
                url: "/asociarproducto/listproinsumo",
                data: {"value": obj.value},
                success: function resultado(data) {
                    if (data == "0") {
                        $("#select_filtrar_insumo_"+id[1]).html("<option value=''></option>");
                    }
                    else{
                        $("#select1").empty();
                        var JSONobj = JSON.parse(data);
                        $("#select_filtrar_insumo_"+id[1]).html("<option value=''></option>");

                        $.each(JSONobj, function (obj, item) {
                            $("#select_filtrar_insumo_"+id[1]).append('<option value="'+item.IDPRODUCTO+'">'+item.NOMPRODUCTO+'</option>');
                        });
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
            $(".select2-search__field").trigger({type: "keydown", which: 9});
        }
    }
}

function save_productos_asociados() {
    var idSolucion;
    var idPreRegistro;
    var idProducto;
    var campos;
    var cadena = "";

    for (var i = 1; i < count_productos_pr; i++) {
        if ($("#select_filtrar_insumo_" + i).val() != null) {
            idSolucion = 1;
            idPreRegistro = $("#txt_id_preregistro_" + i).text();
            idProducto = $("#select_filtrar_insumo_" + i).val();
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
                    CargarProductosNRBDD();
                }
                else{
                    alert(data);
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}