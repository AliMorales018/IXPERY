<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Historial de precios</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">

    <style>
        .icon-hp-habil{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
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
        #contenedor_nuevo_precio{
            visibility: hidden;
        }
    </style>
</head>
<body>

<!-- Buttons -->
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
                <button type="button" class="btn btn-light" id="btn_historialpre_nue" onclick="agregar_nuevo_Precio();" >Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_historialpre_save" class="btn btn-secondary" onclick="guardar_nuevo_Precio();">Guardar</button>
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
            <label class="text-f" id="lbl_historialpre_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Combos -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <div class="grid-x grid-margin-x">
            <div class="cell large-4">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Proveedor:</b></label>
                    <select class="js-example-basic-single" id="selectProveedor_hp" onchange="searchProducto_hp(this);">
                        <option></option>
                    </select>
                </div>
            </div>
            <div class="cell large-4">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Producto:</b></label>
                    <select class="js-example-basic-single" id="selectProducto_hp" onchange="ListarHistorial_Precios();">
                        <option></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combos -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <table class="table" id="tbl_historialprecio">
            <thead class="thead-primary">
            <tr>
                <th class="text-center"><p class="text-center">N°</p></th>
                <th class="text-center">Fecha Inicio</th>
                <th class="text-center">Fecha Fin</th>
                <th class="text-center">Precio</th>
                <th class="text-center">Estado</th>
            </tr>
            </thead>
            <tbody id="tbody_historialprecio">

            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- Nuevo Precio -->
<div id="contenedor_nuevo_precio" class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <div class="grid-x grid-padding-x" style="margin-bottom:10px">
            <div class="cell large-12">
                <label class="text-primary" style="font-size: 18px"><b>Agregar Precio <i onclick="cerrar_nuevo_precio();" class="icon-hp-habil icon-minus2"></i></b></label>
            </div>
        </div>
        <div class="grid-x grid-margin-x">
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Fecha de Inicio:</b></label>
                    <input type="date" class="form-control" id="new_date_hp" placeholder="Fecha de Inicio">
                </div>
            </div>
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Precio:</b></label>
                    <input type="number" class="form-control" id="new_precio_hp" placeholder="Precio">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End TNuevo Precio -->

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptHistorialPrecio.js"></script>
<script>
    $(document).ready(function() {
        setOptions("txt_select_busproveedor","onkeyup='select_buscar_proveedor(event,this);'");
        $('#selectProveedor_hp').select2({placeholder : "Buscar Proveedor. . ."});

        setOptions("txt_select_busproducto","");
        $('#selectProducto_hp').select2({placeholder : "Buscar Producto . . ."});
    });

    function select_buscar_proveedor(event,obj){
        obj.value = obj.value.toUpperCase();
        if(event.keyCode == 13) {
            if (obj.value != "") {
                searchProveedor_hp(obj.value);
                $(".select2-search__field").trigger({type: "keydown", which: 9});
            }
        }
    }

</script>
</body>
</html>
