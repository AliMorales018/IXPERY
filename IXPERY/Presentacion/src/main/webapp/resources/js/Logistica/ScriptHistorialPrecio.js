
//Funciones para llenar Combos

var contador_nuevo_precio = 1;
var count_historial = 1;

function searchProveedor_hp(searchLike){
    $("#tbody_historialprecio").empty();
    $("#selectProducto_hp").empty();
    $.ajax({
        method: "POST",
        url: "/historialprecio/busproveedor",
        data: {"var":searchLike},
        success: function resultado(data) {
            if(data == "0"){
                $("#selectProveedor_hp").html("<option></option>");
                $("#selectProducto_hp").empty();
                $("#selectProducto_hp").append("<option value=''></option>");
                $("#tbody_historialprecio").empty();
                ocultar_precio_nuevo();
            }
            else{
                $("#selectProveedor_hp").empty();
                var JSONobj = JSON.parse(data);
                $("#selectProveedor_hp").append("<option value=''></option>");
                $.each(JSONobj, function (obj, item) {
                    $("#selectProveedor_hp").append('<option value="'+item.idproveedor+'">'+item.nomempresa+' - '+item.ruc+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function searchProducto_hp(){
    var idProv = $("#selectProveedor_hp").val();
    if(idProv != "") {
        $("#tbody_historialprecio").empty();
        ocultar_precio_nuevo();
        $.ajax({
            method: "POST",
            url: "/historialprecio/busproducto",
            data: {"idProv": idProv},
            success: function resultado(data) {
                if (data == "0") {
                    $("#selectProducto_hp").html("<option></option>");
                    console.log("entro");
                }
                else {
                    console.log("listando");
                    $("#selectProducto_hp").empty();
                    var JSONobj = JSON.parse(data);
                    $("#selectProducto_hp").append("<option value=''></option>");
                    $.each(JSONobj, function (obj, item) {
                        $("#selectProducto_hp").append('<option value="' + item.idproducto + '">' + item.nomproducto + '</option>');
                    });
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

//Listar Hiatorial de Precios

function ListarHistorial_Precios(){
    var idProv_ = $("#selectProveedor_hp").val();
    var idProd_ = $("#selectProducto_hp").val();
    if(idProd_ != ""){
        $.ajax({
            method: "POST",
            url: "/historialprecio/listar",
            data: {"idProv":idProv_,"idProd":idProd_},
            success: function resultado(data) {
                if(data != "0"){
                    count_historial = 1;
                    var JSONobj = JSON.parse(data);
                    console.log(JSONobj);
                    $("#tbody_historialprecio").empty();
                    ocultar_precio_nuevo();
                    var estado;
                    var fi;
                    var ff;
                    $.each(JSONobj, function (obj, item) {
                        if(item.estado == 1){
                            estado = "<i class='icon-checkmark icon-hp-habil'></i>";
                        }
                        else{
                            estado = "<i class='icon-cross icon-hp-desh'></i>";
                        }
                        if(item.fechainicio == null){
                            fi = "0000-00-00";
                        }
                        else{
                            fi = item.fechainicio;
                        }
                        if(item.fechafin == null) {
                            ff = "0000-00-00";
                        }
                        else{
                            ff = item.fechafin;
                        }
                        var row = "<tr>" +
                            "<td class='text-center'><p class='text-center'>"+count_historial+"</p></td>" +
                            "<td class='text-center'><span>"+fi+"</span></td>" +
                            "<td class='text-center'><span>"+ff+"</span></td>" +
                            "<td class='text-center text-primary'><span><b>s/. "+item.n_preciocompra+"</b></span></td>" +
                            "<td class='text-center'><span>"+estado+"</span></td>" +
                            "</tr>>";

                        $("#tbody_historialprecio").append(row);
                        count_historial++;
                    });
                }
                else{
                    $("#tbody_historialprecio").append("<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontró un historial para el producto seleccionado.</div></td></tr>");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function agregar_nuevo_Precio() {
    if (contador_nuevo_precio == 1) {
        if ($("#selectProducto_hp").val() != "") {
            $("#contenedor_nuevo_precio").css("visibility","visible");
            contador_nuevo_precio++;
        }
        else {
            alert("Seleccione un producto para agregar un precio a su historial.");
        }
    }
    else{
        alert("Guarde el registro actual para añadir uno nuevo");
    }
}

function guardar_nuevo_Precio() {
    if(contador_nuevo_precio > 1) {
        if ($("#new_date_hp").val() != "" && $("#new_precio_hp").val() != "") {
            var idProducto = $("#selectProducto_hp").val();
            var idProveedor = $("#selectProveedor_hp").val();
            var fechaInicio = $("#new_date_hp").val();
            var precio = $("#new_precio_hp").val();

            $.ajax({
                method: "POST",
                url: "/historialprecio/register",
                data: {"iP": idProducto,"iProv":idProveedor,"fI": fechaInicio, "pre": precio},
                success: function resultado(data) {
                    //Cargar otra vez la tabla
                    ListarHistorial_Precios();
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
        else {
            alert("Complete los campos necesarios para registrar un nuevo precio.");
        }
    }
    else{
        alert("Agregue un nuevo precio a un producto.");
    }
}

function cerrar_nuevo_precio(){
    ocultar_precio_nuevo();
}

function ocultar_precio_nuevo(){
    $("#contenedor_nuevo_precio").css("visibility","hidden");
    $("#new_precio_hp").val("");
    contador_nuevo_precio = 1;
}