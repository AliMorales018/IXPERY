//Funciones para llenar Combos

var cont_nuevo_preciOtServ = 1;
var count_historialOtServ = 1;

function searchProveedor_hpOtServ(searchLike){
    $("#tbody_historialprecioOtServ").empty();
    $("#selectProducto_hpOtServ").empty();
    $.ajax({
        method: "POST",
        url: "/historialprecio/busproveedor",
        data: {"var":searchLike},
        success: function resultado(data) {
            if(data == "0"){
                $("#selectProveedor_hpOtServ").html("<option></option>");
                $("#selectProducto_hpOtServ").empty();
                $("#selectProducto_hpOtServ").append("<option value=''></option>");
                $("#tbody_historialprecioOtServ").empty();
                ocultar_precio_nuevoOtServ();
            }
            else{
                $("#selectProveedor_hpOtServ").empty();
                var JSONobj = JSON.parse(data);
                $("#selectProveedor_hpOtServ").append("<option value=''></option>");
                $.each(JSONobj, function (obj, item) {
                    $("#selectProveedor_hpOtServ").append('<option value="'+item.idproveedor+'">'+item.nomempresa+' - '+item.ruc+'</option>');
                });
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function searchProducto_hpOtServ(){
    var idProv = $("#selectProveedor_hpOtServ").val();
    if(idProv != "") {
        $("#tbody_historialprecioOtServ").empty();
        ocultar_precio_nuevoOtServ();
        $.ajax({
            method: "POST",
            url: "/historialprecioOtServicio/busservsolic",//en Datos filtrar_serviciosolicitado_proveedor
            data: {"idProv": idProv},
            success: function resultado(data) {
          var JSONobj = JSON.parse(data);
          console.log(JSONobj);
                if (data == "0") {
                    $("#selectProducto_hpOtServ").html("<option></option>");
                    console.log("entro");
                }
                else {
                    console.log("listando");
                    $("#selectProducto_hpOtServ").empty();
                    var JSONobj = JSON.parse(data);
                    $("#selectProducto_hpOtServ").append("<option value=''></option>");
                    $.each(JSONobj, function (obj, item) {
                        $("#selectProducto_hpOtServ").append('<option value="' + item.servsol + '">' + item.servsolicitado + '</option>');
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

function ListarHistorial_PreciosOtServ(){
    var idProv_ = $("#selectProveedor_hpOtServ").val();
    var idProd_ = $("#selectProducto_hpOtServ").val();
    if(idProd_ != ""){
        $.ajax({
            method: "POST",
            url: "/historialprecioOtServicio/listar",
            data: {"idProv":idProv_,"idProd":idProd_},
            success: function resultado(data) {
                if(data != "0"){
                    count_historialOtServ = 1;
                    var JSONobj = JSON.parse(data);
                    console.log(JSONobj);
                    $("#tbody_historialprecioOtServ").empty();
                    ocultar_precio_nuevoOtServ();
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
                            "<td class='text-center'><p class='text-center'>"+count_historialOtServ+"</p></td>" +
                            "<td class='text-center'><span>"+fi+"</span></td>" +
                            "<td class='text-center'><span>"+ff+"</span></td>" +
                            "<td class='text-center text-primary'><span><b>s/. "+item.precio+"</b></span></td>" +
                            "<td class='text-center'><span>"+estado+"</span></td>" +
                            "</tr>>";

                        $("#tbody_historialprecioOtServ").append(row);
                        count_historialOtServ++;
                    });
                }
                else{
                    $("#tbody_historialprecioOtServ").append("<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontró un historial para el producto seleccionado.</div></td></tr>");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function agregar_nuevo_PrecioOtServ() {
    if (cont_nuevo_preciOtServ == 1) {
        if ($("#selectProducto_hpOtServ").val() != "") {
            $("#contenedor_nuevo_precioOtServ").css("visibility","visible");
            cont_nuevo_preciOtServ++;
        }
        else {
            alert("Seleccione un producto para agregar un precio a su historial.");
        }
    }
    else{
        alert("Guarde el registro actual para añadir uno nuevo");
    }
}

/*function guardar_nuevo_PrecioOtServ() {
    if(cont_nuevo_preciOtServ > 1) {
        if ($("#new_date_hpOtServ").val() != "" && $("#new_precio_hpOtServ").val() != "") {
            var idProducto = $("#selectProducto_hpOtServ").val();
            var idProveedor = $("#selectProveedor_hpOtServ").val();
            var fechaInicio = $("#new_date_hpOtServ").val();
            var precio = $("#new_precio_hpOtServ").val();

            $.ajax({
                method: "POST",
                url: "/historialprecioOtServicio/register",
                data: {"iP": idProducto,"iProv":idProveedor,"fI": fechaInicio, "pre": precio},
                success: function resultado(data) {
                    //Cargar otra vez la tabla
                    ListarHistorial_PreciosOtServ();
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
}*/
var arrGuardarHOtSer = [];
var jsonGuardarHOtSer = {};
function sumOresDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias +1);
    return fecha;
}

function convertDate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
    // return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}
function guardar_nuevo_PrecioOtServ() {
    if(cont_nuevo_preciOtServ > 1) {
        if ($("#new_date_hpOtServ").val() != "" && $("#new_precio_hpOtServ").val() != "") {
            let objFilaServProv={};
            let objServSolic={};
            let objProvee={};

            let idProducto = $("#selectProducto_hpOtServ").val();
            let idProveedor = $("#selectProveedor_hpOtServ").val();
            let fechaInicio = $("#new_date_hpOtServ").val();
            let precio = $("#new_precio_hpOtServ").val();

            var d = new Date(fechaInicio);
             let fechaRes=sumOresDias(d,-1);
             let fechaFin=convertDate(fechaRes);


            objServSolic.sso1=idProducto;//foránea de Serv Solicitados
            objProvee.prd1=idProveedor;

            objFilaServProv.spr1=0;
            objFilaServProv.spr2=objServSolic;
            objFilaServProv.spr3=objProvee;
            objFilaServProv.spr4=precio;
            objFilaServProv.spr5="1";
            objFilaServProv.spr9=fechaInicio;

            arrGuardarHOtSer.push(objFilaServProv);
            jsonGuardarHOtSer.spr=arrGuardarHOtSer;


            let vals=idProducto+","+fechaFin;
            console.log("Json A Guardar");
            console.log(jsonGuardarHOtSer);
            console.log("Fecha Inicio");
            console.log(fechaInicio);
            console.log("Fecha fechaUlt");
            console.log(fechaFin);
            $.ajax({
                method: "POST",
                url: "/historialprecioOtServicio/guardarfull",
                data: {"json":JSON.stringify(jsonGuardarHOtSer),"vals":vals},
                success: function resultado(data) {
                    //Cargar otra vez la tabla
                    ListarHistorial_PreciosOtServ();
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

function cerrar_nuevo_precioOtServ(){
    ocultar_precio_nuevoOtServ();
}

function ocultar_precio_nuevoOtServ(){
    $("#contenedor_nuevo_precioOtServ").css("visibility","hidden");
    $("#new_precio_hpOtServ").val("");
    cont_nuevo_preciOtServ = 1;
}