<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cotizacion</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">

    <style>
        #tbody-cotizacion-requerimientos tr:hover {
            background-color: #E6E6E6;
            /*background-color: #D34539;*/
            cursor: pointer;
        }
        .unstyled::-webkit-inner-spin-button{
            display: none;
            -webkit-appearance: none;
        }

    </style>

</head>

<body>

<!-- Buttons  -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-3 large-3 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-users"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">cotizacion</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-6 large-6">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_cotizacion_pendientes" class="btn btn-light" onclick="BuscarSolucionesPendientes();">Pendientes</button>
            </div>

        </div>
    </div>
    <div class="cell small-12 medium-2 large-3">
        <div class="cell small-4 medium-4 large-12 text-center">
            <button type="button" id="btn_cotizacion_send" class="btn btn-light" onclick="ValidarCampos_tbl_cotizacion();">Enviar a Operaciones</button>
        </div>
    </div>
</div>
<!-- End Buttons  -->

<!-- Formulario -->
<div name="div-cotizacion-frm">
    <div class="grid-x ">
        <div class="cell large-2">
            <label class="text-f" id="lbl_cotizacion_fecha" >${fecha}</label>
        </div>

    </div>
</div>
<!-- End Formulario -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-9">
        <table class="table">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N</p></th>
                <th class="p-3">Requermiento</th>
                <th class="p-3">Fecha Registro Requerimiento</th>
                <th class="p-3">solucion</th>
                <th class="p-3">Fecha Inicio solucion</th>
                <th class="p-3">Proyecto</th>
                <th class="p-3">Empresa</th>
            </tr>
            </thead>
            <tbody id="tbody-cotizacion-requerimientos" name="tbody-cotizacion-requerimientos" >
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->



<!-- JavaScript -->
<script src="${urlPublic}/js/jquery-3.3.1.js"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptCotizacion.js"></script>

<!-- End JavaScript -->
</body>
</html>
