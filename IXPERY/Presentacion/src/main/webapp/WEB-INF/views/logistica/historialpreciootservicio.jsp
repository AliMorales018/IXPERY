<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial de precios</title>
    <style>
        .icon-hp-habilOtServ{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
        }
        .select2-result-datahpots_f{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .select2-span-resultots{
            font-size: 9.9px;
        }
        .icon-hp-desh{
            background-color: #666666;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
        }
        input[type=date]{
            height: 25.15px;
        }
        #contenedor_nuevo_precioOtServ, #contasociar_pro_provots{
            visibility: hidden;
        }
        button:disabled{
            cursor: not-allowed;
        }
    </style>
</head>
<body>
<%--agregue de dante--%>
<input id="vppahis" type="hidden" value="0">
<%--agregue de dante--%>

<!-- Buttonss -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-stats-dots"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Historial de precios</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_historialpreotserv_nue" onclick="agregar_nuevo_PrecioOtServ();" >Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_historialpreotserv_save" class="btn btn-secondary" onclick="guardar_nuevo_PrecioOtServ();">Guardar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notify -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_historialpreotserv_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Datee -->

<!-- Combos -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <div class="grid-x grid-margin-x">
            <div class="cell large-4">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Proveedor:</b></label>
                    <select id="selectProveedor_hpOtServ" onchange="ListarHistorial_PreciosOtServ();">
                        <option></option>
                    </select>
                </div>
            </div>
            <div class="cell large-4">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Servicios:</b></label>
                    <select id="selectProducto_hpOtServ" onchange="ListarHistorial_PreciosOtServ();">
                        <option></option>
                    </select>
                </div>
            </div>

            <div class="cell large-4" id="contasociar_pro_provots">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Asociar Prod./Prov.:</b></label>
                    <button class="form-control" style="line-height: 23.09px;background-color: #D34539;color: white;cursor: pointer;width: 30px" onclick="asociar_prod_provots();"><i class="icon-loop3"></i></button>
                </div>
            </div>


        </div>
    </div>
</div>
<!-- End Combos -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <table class="table" id="tbl_historialpreciootserv">
            <thead class="thead-primary">
            <tr>
                <th class="text-center"><p class="text-center">N°</p></th>
                <th class="text-center">Fecha Inicio</th>
                <th class="text-center">Fecha Fin</th>
                <th class="text-center">Precio</th>
                <th class="text-center">Estado</th>
            </tr>
            </thead>
            <tbody id="tbody_historialprecioOtServ" style="background-color: #ffffffb5;">
                <tr><td colspan='5' class='text-center'><div class='p-3' style='font-size: 10px'>Seleccione proveedor y/o producto ó Asocie producto/proveedor</div></td></tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- Nuevo Precio -->
<div id="contenedor_nuevo_precioOtServ" class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <div class="grid-x grid-padding-x" style="margin-bottom:10px">
            <div class="cell large-12">
                <label class="text-primary" style="font-size: 18px"><b>Agregar Precio <i onclick="ocultar_precio_nuevoOtServ();" class="icon-hp-habilOtServ icon-minus2"></i></b></label>
            </div>
        </div>
        <div class="grid-x grid-margin-x">
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Fecha de Inicio:</b></label>
                    <input type="date" class="form-control" id="new_date_hpOtServ" placeholder="Fecha de Inicio">
                </div>
            </div>
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Precio:</b></label>
                    <input type="number" class="form-control" id="new_precio_hpOtServ" placeholder="Precio">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End TNuevo Precio -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptHistorialPrecioOtServ.js"></script>
<script>
    $(document).ready(function() {
        $('#selectProducto_hpOtServ').select2();
        $('#selectProveedor_hpOtServ').select2();
        $.ajax({
            method: "POST",
            async: false,
            url: "/otroservicio2/getsesionpp",
            success: function (valor) {
                console.log("VALOR DE RETORNO: "+valor);
                if (valor !== "0") {
                    let id = valor.split("@");
                    console.log("ID DE SESION: "+id);
                    if(id[0] !== "0"){
                        ListarHistorial_PreciosOtServ(parseInt(id[0]),parseInt(id[1]),"otroservicio2");
                    }else{
                        setSelect2_ProvHPOTS();
                        listar_historial_preciosots("0",parseInt(id[1]),null,"loadData");
                    }
                }
                else{
                    setSelect2_ProvHPOTS();
                    setSelect2_ProdHPOTS();
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
        $('footer').show();
    });

    function setSelect2_ProvHPOTS(){
        $("#selectProveedor_hpOtServ").select2({
            ajax: {
                url: "/historialprecioOtServicio/busproveedor",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term.toUpperCase()
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar proveedor . . .',
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 3,
            templateResult: formatRepo_historialprecioots,
            templateSelection: formatRepoSelection_historialprecioots
        });
    }

    function setSelect2_ProdHPOTS(){
        $("#selectProducto_hpOtServ").select2({
            ajax: {
                url: "/historialprecioOtServicio/busservsolic",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term.toUpperCase()

                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data

                    };
                },
                cache: true
            },
            placeholder: 'Buscar servicio  . . .',
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 3,
            templateResult: formatRepo_historialprecioproots,
            templateSelection: formatRepoSelection_historialprecioproots
        });
    }

    function formatRepo_historialprecioots(repo) {
        if (repo.loading) {
            return repo.text;
        }
        return  "<div class='select2-result-datahpots_f'><span class='select2-span-resultots'>PROVEEDOR: </span>"+repo.nomempresa+"</div>"+
            "<div class='select2-result-datahpots_f'><span class='select2-span-resultots'>RUC: </span>"+repo.ruc+"</span></div>";
    }

    function formatRepoSelection_historialprecioots(repo) {
        return  repo.text || repo.nomempresa + " - " + repo.ruc;
    }

    function formatRepo_historialprecioproots(repo) {
        if (repo.loading) {
            return repo.text;
        }
        return  "<div class='select2-result-datahpots_f'><span class='select2-span-resultots'>SERVICIO: </span>"+repo.servsol+"</div>";
            // "<div class='select2-result-datahpots_f'><span class='select2-span-resultots'>MODELO/MARCA: </span>"+repo.modelo+" - "+repo.marca+"</span></div>";
    }

    function formatRepoSelection_historialprecioproots(repo) {
        return  repo.text || repo.servsol;
    }
</script>
</body>
</html>
