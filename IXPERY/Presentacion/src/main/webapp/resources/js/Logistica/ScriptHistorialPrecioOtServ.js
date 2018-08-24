//agregue de dante
function agregar_nuevo_PrecioOtServ() {
    if ($("#contenedor_nuevo_precioOtServ").css("visibility") !== "visible") {
        if ( $("#selectProveedor_hpOtServ").val() !== "" && $("#selectProducto_hpOtServ").val() !== "") {
            $("#btn_historialpreotserv_save").removeAttr("disabled");
            $("#contenedor_nuevo_precioOtServ").css("visibility", "visible");
        }
    }
}

function llenar_combo_proveedor_producto_hpots(id, text, id2, text2) {
    //COMBO DE SOLUCION
    if (id !== null) {
        let data = {id: id, text: text};
        let newOption = new Option(data.text, data.id, false, false);
        //Proveedor
        $('#selectProveedor_hpOtServ').empty().append(newOption);
        setSelect2_ProvHPOTS();
    }

    let data2 = {id: id2 , text: text2};
    let newOption2 = new Option(data2.text, data2.id, false, false);
    //Servicio
    $('#selectProducto_hpOtServ').empty().append(newOption2);
    $('#selectProducto_hpOtServ').attr("disabled",true);
}

function ocultar_precio_nuevoOtServ(){
    $("#btn_historialpreotserv_save").attr("disabled",true);
    $("#contenedor_nuevo_precioOtServ").css("visibility", "hidden");
    $("#new_date_hpOtServ").val("");
    $("#new_precio_hpOtServ").val("");
}

function sumOresDias_HPOTSERV(fecha,dias) {
    fecha.setDate(fecha.getDate() + dias + 1);
    return fecha;
}

function convertDate_HPOTSERV(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
}


function ListarHistorial_PreciosOtServ(idSesionProv,idSesionServ,bandera){
    console.log('ListarHistorial_PreciosOtServ');
    // console.log();
    let idProv;
    let idServ;
    if(bandera === "otroservicio2"){
        idProv = idSesionProv;
        idServ = idSesionServ;
    }
    else{
        idProv = $("#selectProveedor_hpOtServ").val();
        idServ = $("#selectProducto_hpOtServ").val();
    }
    if(idProv !== "" && idServ !== ""){
        console.log("ID1: "+idServ);
        console.log("ID2: "+idProv);
        //Verificar si se encuentran asociados
        $.ajax({
            method: "POST",
            url: "/historialprecioOtServicio/consultarasociados",
            data: {"idProv":idProv,"idServ":idServ},
            success: function resultado(data) {
                if(data === "0"){
                    $("#contenedor_nuevo_precioOtServ").css("visibility", "hidden");
                    $("#contasociar_pro_provots").css("visibility","visible");
                    $("#vppahis").val("0");
                    $("#tbody_historialprecioOtServ").html("<tr><td colspan='5' class='text-center'><div class='p-3' style='font-size: 10px'>Seleccione proveedor y/o servicio ó Asocie servicio/proveedor</div></td></tr>");
                    listar_historial_preciosots(idProv,idServ,"historial","loadData");
                }
                else{
                    $("#contasociar_pro_provots").css("visibility","hidden");
                    listar_historial_preciosots(idProv,idServ,bandera);
                    $("#vppahis").val("1");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function listar_historial_preciosots(idProv,idServ,bandera,combos) {
    //Listar Historial de Precios
    $.ajax({
        method: "POST",
        url: "/historialprecioOtServicio/listar",
        async: false,
        data: {"idProv":idProv,"idServ":idServ},
        success: function resultado(data) {
            let JSONobj = JSON.parse(data);
            console.log(JSONobj);
            if(combos === "loadData"){
                if(idProv === "0") {
                    llenar_combo_proveedor_producto_hpots(null, null, JSONobj.sso[0].sso1, JSONobj.sso[0].sso3 + " - " + "-" + " - " + "-");
                    ++contador_otroservicio2_s;
                    $("#selectProveedor_hpOtServ").removeAttr("disabled");
                    $("#selectProveedor_hpOtServ").empty();
                    setSelect2_ProvHPOTS();
                }
                else{
                    if(bandera === "otroservicio2") {
                        llenar_combo_proveedor_producto_hpots(JSONobj.emp[0].emp2, JSONobj.emp[0].emp4 + " - " + JSONobj.emp[0].emp3, JSONobj.sso[0].sso1, JSONobj.sso[0].sso3 + " - " + "-" + " - " + "-");
                        ++contador_otroservicio2_s;
                    }
                }

            }
            else{
                $("#btn_historialpreotserv_nue").removeAttr("disabled");
                ocultar_precio_nuevoOtServ();
                if (bandera === "otroservicio2") {
                    llenar_combo_proveedor_producto_hpots(JSONobj.emp[0].emp2, JSONobj.emp[0].emp4 + " - " + JSONobj.emp[0].emp3, JSONobj.sso[0].sso1, JSONobj.sso[0].sso3 + " - " + "-" + " - " + "-");
                    ++contador_otroservicio2_s;
                }
                if (JSONobj.spr.length > 0) {
                    if (JSONobj.spr.length === 1 && JSONobj.spr[0].spr4 === 0) {
                        $("#tbody_historialprecioOtServ").html("<tr class='no-registers act-precio'><td colspan='11' class='text-center'><div class='p-3' style='font-size: 10px'><input type='hidden' value='" + JSONobj.spr[0].spr1 + "'>Ingrese un precio para el servicio.</div></td></tr>");
                        $("#contenedor_nuevo_precioOtServ").css("visibility", "visible");
                        $("#btn_historialpreotserv_save").removeAttr("disabled");
                    }
                    else {
                        $("#tbody_historialprecioOtServ").empty();
                        let contador = 1;
                        let estado;
                        $.each(JSONobj.spr, function (obj, item) {
                            estado = item.spr5 === "1" ? "<i class='icon-checkmark icon-hp-habil'></i>" : "<i class='icon-cross icon-hp-desh'></i>";
                            let row = "<tr>" +
                                "<td class='text-center'><p class='text-center'>" + contador + "</p></td>" +
                                "<td class='text-center'><span>" + item.spr9 + "</span></td>" +
                                "<td class='text-center'><span>" + item.spr10 + "</span></td>" +
                                "<td class='text-center text-primary'><span><b>S/ " + item.spr4 + "</b></span></td>" +
                                "<td class='text-center'><span>" + estado + "</span></td>" +
                                "</tr>>";

                            $("#tbody_historialprecioOtServ").append(row);
                            contador++;
                        });
                    }
                }
                else {
                    $("#tbody_historialprecioOtServ").html("<tr class='no-registers'><td colspan='11' class='text-center'><div class='p-3' style='font-size: 10px'>No se encontró un historial de precios para el servicio seleccionado.</div></td></tr>");
                }
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function asociar_prod_provots(){
    let objProdProv = {
        "spr": [{
            "spr1": 0,
            "spr2": {
                "sso1": parseInt($("#selectProducto_hpOtServ").val())
            },
            "spr3": {
                "prd1": parseInt($("#selectProveedor_hpOtServ").val())
            },
            "spr4": 0,
            "spr5": "1",
        }]
    };
    $.ajax({
        method: "POST",
        url: "/historialprecioOtServicio/registrarasociado",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(objProdProv),
        success: function resultado(data) {
            if(data === "0"){
                alert("Se asoció correctamente.");
                $("#contasociar_pro_provots").css("visibility","hidden");
                ListarHistorial_PreciosOtServ();
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function guardar_nuevo_PrecioOtServ() {
    if($("#vppahis").val() !== "0") {
        let idServicio = $("#selectProducto_hpOtServ").val();
        let idProveedor = $("#selectProveedor_hpOtServ").val();
        if ($("#new_date_hpOtServ").val() !== "" && $("#new_precio_hpOtServ").val() !== "") {
            let data = {
                "spr": [
                    {
                        "spr1": 0,
                        "spr2": {
                            "sso1": parseInt(idServicio)
                        },
                        "spr3": {
                            "prd1": parseInt(idProveedor)
                        },
                        "spr4": parseFloat($("#new_precio_hpOtServ").val()),
                        "spr9": $("#new_date_hpOtServ").val(),
                        "spr5": "1"
                    }
                ]
            };
            let FechaIni = new Date($("#new_date_hpOtServ").val());
            let FechaFin = sumOresDias_HPOTSERV(FechaIni, -1);
            let stateRegisters = $("#tbody_historialprecioOtServ :first-child").hasClass("no-registers");
            let stateRegistersFirst = $("#tbody_historialprecioOtServ :first-child").hasClass("act-precio");
            let ultimaFecha;
            let fechaCorrecta;
            if (!stateRegisters) {
                ultimaFecha = $("#tbody_historialprecioOtServ tr:last-child td").eq(1).find("span").text();
                FechaFin = convertDate_HPOTSERV(FechaFin);
                if (Date.parse(FechaIni) <= Date.parse(ultimaFecha)) {
                    fechaCorrecta = false;
                }
                else {
                    fechaCorrecta = true;
                }
            }
            else {
                FechaFin = "0";
                fechaCorrecta = true;
            }
            if (fechaCorrecta) {
                if(stateRegistersFirst){
                    let idServProv = parseInt($("#tbody_historialprecioOtServ :first-child").find("input").val());
                    console.log("ID SERVICIO PROVEEDOR: "+idServProv)
                    let ObjServProvAct = {
                        "spr": [
                            {
                                "spr1": idServProv,
                                "spr4": parseFloat($("#new_precio_hpOtServ").val()),
                                "spr9": $("#new_date_hpOtServ").val(),
                                "spr5": "1"
                            }
                        ]
                    };
                    data.spr[0].spr1 = idServProv;
                    $.ajax({
                        method: "POST",
                        url: "/historialprecioOtServicio/actualizarprecio",
                        data: {"json1":JSON.stringify(ObjServProvAct),"json2":JSON.stringify(data),"idServ":idServicio},
                        success: function resultado(data) {
                            if (data === "0") {
                                //Cargar otra vez la tabla
                                ListarHistorial_PreciosOtServ(null,null,"historial");
                                if (typeof BuscarOtroServicio !== 'undefined' && jQuery.isFunction(BuscarOtroServicio)) {
                                    BuscarOtroServicio();
                                }
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
                else {
                    $.ajax({
                        method: "POST",
                        url: "/historialprecioOtServicio/register2",
                        data: {"json": JSON.stringify(data), "idProd": idServicio, "fechafin": FechaFin},
                        success: function resultado(data) {
                            if (data === "") {
                                //Cargar otra vez la tabla
                                ListarHistorial_PreciosOtServ(null,null,"historial");
                                if (typeof BuscarOtroServicio !== 'undefined' && jQuery.isFunction(BuscarOtroServicio)) {
                                    console.log("Recalculando Solución");
                                    BuscarOtroServicio();
                                }
                            }
                        },
                        error: function errores(msg) {
                            alert('Error: ' + msg.responseText);
                        }
                    });
                }
            }
            else {
                alert("La Fecha de inicio debe ser mayor a la última fecha de registro.");
            }
        }
        else {
            alert("Complete los campos necesarios para registrar un nuevo precio.");
        }
    }
    else{
        alert("Asocie el servicio al proveedor para poder insertar un nuevo precio.");
    }
}
//



















































































/*
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
                    console.log("Datos de BD");
                    console.log(JSONobj);
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
                    console.log("Datos de Data");
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

function guardar_nuevo_PrecioOtServ() {
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
}
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
            let objFilaServProv = {};
            let objServSolic = {};
            let objProvee = {};

            let idProducto = $("#selectProducto_hpOtServ").val();
            let idProveedor = $("#selectProveedor_hpOtServ").val();
            let fechaInicio = $("#new_date_hpOtServ").val();
            let precio = $("#new_precio_hpOtServ").val();
            let ultimaFecha = $("#tbody_historialprecioOtServ tr:last-child td").eq(2).find("span").text();

            var d = new Date(fechaInicio);
            let fechaRes = sumOresDias(d, -1);
            let fechaFin = convertDate(fechaRes);

            objServSolic.sso1 = parseInt(idProducto);//foránea de Serv Solicitados
            objProvee.prd1 = parseInt(idProveedor);

            objFilaServProv.spr1 = 0;
            objFilaServProv.spr2 = objServSolic;
            objFilaServProv.spr3 = objProvee;
            objFilaServProv.spr4 = precio;
            objFilaServProv.spr5 = "1";
            objFilaServProv.spr9 = fechaInicio;

            arrGuardarHOtSer.push(objFilaServProv);
            jsonGuardarHOtSer.spr = arrGuardarHOtSer;

            let idsersoli = idProducto;
            let fecfin=fechaFin;
            console.log("Json A Guardar");
            console.log(jsonGuardarHOtSer);
            console.log("Fecha Inicio");
            console.log(fechaInicio);
            console.log("Fecha fechaUlt");
            console.log(fechaFin);

            function compararFechasOtSer() {
                if (Date.parse(fechaInicio) <= Date.parse(ultimaFecha)) {
                    return false;
                }
                else {
                    return true;
                }
            }

            if (compararFechasOtSer()){
                $.ajax({
                    method: "POST",
                    url: "/historialprecioOtServicio/guardarfull",
                    data: {"json": JSON.stringify(jsonGuardarHOtSer), "idsersoli": idsersoli,"fecfin":fecfin},
                    success: function resultado(data) {
                        //Cargar otra vez la tabla
                        ListarHistorial_PreciosOtServ();
                    },
                    error: function errores(msg) {
                        alert('Error: ' + msg.responseText);
                    }
                });
            }else{
                alert("La fecha de inicio debe ser mayor a la última fecha de registro");
            }
        }
        else {
            alert("Complete los campos necesarios para registrar un nuevo precio.");
        }
    }
    else{
        alert("Agregue un nuevo precio a un producto.");
    }
}
/!*

function cerrar_nuevo_precioOtServ(){
    ocultar_precio_nuevoOtServ();
}

function ocultar_precio_nuevoOtServ(){
    $("#contenedor_nuevo_precioOtServ").css("visibility","hidden");
    $("#new_precio_hpOtServ").val("");
    cont_nuevo_preciOtServ = 1;
}*!/
*/
