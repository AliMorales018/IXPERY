function agregar_nuevo_Precio() {
    if ($("#contenedor_nuevo_precio").css("visibility") !== "visible") {
        if ( $("#selectProveedor_hp").val() !== "" && $("#selectProducto_hp").val() !== "") {
            $("#btn_historialpre_save").removeAttr("disabled");
            $("#contenedor_nuevo_precio").css("visibility", "visible");
        }
    }
}

function llenar_combo_proveedor_producto_hp(id, text, id2, text2) {
    //COMBO DE SOLUCION
    if (id !== null) {
        let data = {id: id, text: text};
        let newOption = new Option(data.text, data.id, false, false);
        //Proveedor
        $('#selectProveedor_hp').empty().append(newOption);
    }

    let data2 = {id: id2 , text: text2};
    let newOption2 = new Option(data2.text, data2.id, false, false);
    //Producto
    $('#selectProducto_hp').empty().append(newOption2);
    $('#selectProducto_hp').attr("disabled",true);
}

function ocultar_precio_nuevo(){
    $("#btn_historialpre_save").attr("disabled",true);
    $("#contenedor_nuevo_precio").css("visibility", "hidden");
    $("#new_date_hp").val("");
    $("#new_precio_hp").val("");
}

function sumOresDias_HP(fecha,dias) {
    fecha.setDate(fecha.getDate() + dias + 1);
    return fecha;
}

function convertDate_HP(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
}

function ListarHistorial_Precios(idSesionProv,idSesionProd,bandera){
    let idProv;
    let idProd;
    if(bandera === "equipo2"){
        idProv = idSesionProv;
        idProd = idSesionProd;
    }
    else{
        idProv = $("#selectProveedor_hp").val();
        idProd = $("#selectProducto_hp").val();
    }
    if(idProv !== "" && idProd !== ""){
        console.log("ID1: "+idProd);
        console.log("ID2: "+idProv);
        //Verificar si se encuentran asociados
        $.ajax({
            method: "POST",
            url: "/historialprecio/consultarasociados",
            data: {"idProv":idProv,"idProd":idProd},
            success: function resultado(data) {
                if(data === "0"){
                    $("#contenedor_nuevo_precio").css("visibility", "hidden");
                    $("#contasociar_pro_prov").css("visibility","visible");
                    $("#vppa").val("0");
                    $("#tbody_historialprecio").html("<tr><td colspan='5' class='text-center'><div class='p-3' style='font-size: 10px'>Seleccione proveedor y/o producto ó Asocie producto/proveedor</div></td></tr>");
                    listar_historial_precios(idProv,idProd,null,"loadData");
                }
                else{
                    $("#contasociar_pro_prov").css("visibility","hidden");
                    listar_historial_precios(idProv,idProd,bandera);
                    $("#vppa").val("1");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function listar_historial_precios(idProv,idProd,bandera,combos) {
    //Listar Historial de Precios
    $.ajax({
        method: "POST",
        url: "/historialprecio/listar",
        async: false,
        data: {"idProv":idProv,"idProd":idProd},
        success: function resultado(data) {
            let JSONobj = JSON.parse(data);
            console.log(JSONobj)
            if(combos === "loadData"){
                if(idProv === "0") {
                    llenar_combo_proveedor_producto_hp(null, null, JSONobj.pdt[0].pdt1, JSONobj.pdt[0].pdt7 + " - " + JSONobj.pdt[0].pdt11 + " - " + JSONobj.pdt[0].pdt12);
                    $("#selectProveedor_hp").removeAttr("disabled");
                    $("#selectProveedor_hp").empty();
                    setSelect2_ProvHP();
                }
                else{
                    llenar_combo_proveedor_producto_hp(JSONobj.emp[0].emp2, JSONobj.emp[0].emp4 + " - " + JSONobj.emp[0].emp3,JSONobj.pdt[0].pdt1, JSONobj.pdt[0].pdt7 + " - " + JSONobj.pdt[0].pdt11 + " - " + JSONobj.pdt[0].pdt12);
                }
                ++contador_equipo2_s;
            }
            else{
                $("#btn_historialpre_nue").removeAttr("disabled");
                ocultar_precio_nuevo();
                if (bandera === "equipo2") {
                    llenar_combo_proveedor_producto_hp(JSONobj.emp[0].emp2, JSONobj.emp[0].emp4 + " - " + JSONobj.emp[0].emp3, JSONobj.pdt[0].pdt1, JSONobj.pdt[0].pdt7 + " - " + JSONobj.pdt[0].pdt11 + " - " + JSONobj.pdt[0].pdt12);
                    ++contador_equipo2_s;
                }
                if (JSONobj.ppr.length > 0) {
                    if (JSONobj.ppr.length === 1 && JSONobj.ppr[0].ppr4 === null) {
                        $("#tbody_historialprecio").html("<tr class='no-registers act-precio'><td colspan='11' class='text-center'><div class='p-3' style='font-size: 10px'><input type='hidden' value='" + JSONobj.ppr[0].ppr1 + "'>Ingrese un precio para el producto.</div></td></tr>");
                        $("#contenedor_nuevo_precio").css("visibility", "visible");
                        $("#btn_historialpre_save").removeAttr("disabled");
                    }
                    else {
                        $("#tbody_historialprecio").empty();
                        let contador = 1;
                        let estado;
                        $.each(JSONobj.ppr, function (obj, item) {
                            estado = item.ppr8 === "1" ? "<i class='icon-checkmark icon-hp-habil'></i>" : "<i class='icon-cross icon-hp-desh'></i>";
                            let row = "<tr>" +
                                "<td class='text-center'><p class='text-center'>" + contador + "</p></td>" +
                                "<td class='text-center'><span>" + item.ppr6 + "</span></td>" +
                                "<td class='text-center'><span>" + item.ppr7 + "</span></td>" +
                                "<td class='text-center text-primary'><span><b>S/ " + item.ppr4 + "</b></span></td>" +
                                "<td class='text-center'><span>" + estado + "</span></td>" +
                                "</tr>>";

                            $("#tbody_historialprecio").append(row);
                            contador++;
                        });
                    }
                }
                else {
                    $("#tbody_historialprecio").html("<tr class='no-registers'><td colspan='11' class='text-center'><div class='p-3' style='font-size: 10px'>No se encontró un historial de precios para el producto seleccionado.</div></td></tr>");
                }
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}
function asociar_prod_prov(){
    let objProdProv = {
        "ppr": [{
            "ppr1": 0,
            "ppr2": {
                        "pdt1": parseInt($("#selectProducto_hp").val())
                    },
            "ppr3": {
                        "prd1": parseInt($("#selectProveedor_hp").val())
                    },
        }]
    };
    $.ajax({
        method: "POST",
        url: "/historialprecio/registrarasociado",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(objProdProv),
        success: function resultado(data) {
            if(data === "0"){
                alert("Se asoció correctamente.");
                $("#contasociar_pro_prov").css("visibility","hidden");
                ListarHistorial_Precios();
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}

function guardar_nuevo_Precio() {
    if($("#vppa").val() !== "0") {
        let idProducto = $("#selectProducto_hp").val();
        let idProveedor = $("#selectProveedor_hp").val();
        if ($("#new_date_hp").val() !== "" && $("#new_precio_hp").val() !== "") {
            let data = {
                "ppr": [
                    {
                        "ppr1": 0,
                        "ppr2": {
                            "pdt1": parseInt(idProducto)
                        },
                        "ppr3": {
                            "prd1": parseInt(idProveedor)
                        },
                        "ppr4": parseFloat($("#new_precio_hp").val()),
                        "ppr6": $("#new_date_hp").val(),
                        "ppr8": "1"
                    }
                ]
            };
            let FechaIni = new Date($("#new_date_hp").val());
            let FechaFin = sumOresDias_HP(FechaIni, -1);
            let stateRegisters = $("#tbody_historialprecio :first-child").hasClass("no-registers");
            let stateRegistersFirst = $("#tbody_historialprecio :first-child").hasClass("act-precio");
            let ultimaFecha;
            let fechaCorrecta;
            if (!stateRegisters) {
                ultimaFecha = $("#tbody_historialprecio tr:last-child td").eq(1).find("span").text();
                FechaFin = convertDate_HP(FechaFin);
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
                    let idProdProv = parseInt($("#tbody_historialprecio :first-child").find("input").val());
                    console.log("ID PRODUCTO PROVEEDOR: "+idProdProv)
                    let ObjProdProvAct = {
                        "ppr": [
                            {
                                "ppr1": idProdProv,
                                "ppr4": parseFloat($("#new_precio_hp").val()),
                                "ppr6": $("#new_date_hp").val(),
                                "ppr8": "1"
                            }
                        ]
                    };
                    $.ajax({
                        method: "POST",
                        url: "/historialprecio/actualizarprecio",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(ObjProdProvAct),
                        success: function resultado(data) {
                            if (data === "0") {
                                //Cargar otra vez la tabla
                                ListarHistorial_Precios(null,null,"historial");
                                if (typeof BuscarSolucionEquipos !== 'undefined' && jQuery.isFunction(BuscarSolucionEquipos)) {
                                    BuscarSolucionEquipos();
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
                        url: "/historialprecio/register",
                        data: {"json": JSON.stringify(data), "idProd": idProducto, "fechafin": FechaFin},
                        success: function resultado(data) {
                            if (data === "") {
                                //Cargar otra vez la tabla
                                ListarHistorial_Precios();
                                if (typeof BuscarSesionSol !== 'undefined' && jQuery.isFunction(BuscarSesionSol)) {
                                    console.log("Recalculando Solución");
                                    BuscarSesionSol();
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
        alert("Asocie el producto al proveedor para poder insertar un nuevo precio.");
    }
}
