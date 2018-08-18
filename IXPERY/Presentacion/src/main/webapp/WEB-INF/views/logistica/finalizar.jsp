<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte</title>
    <style>
        #tbody-finalizar-requerimientos tr:hover {
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
                <p class="main-title">Solución</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-6 large-6">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_finalizar_pendientes" class="btn btn-light" onclick="BuscarSolucionesPendientes();">Aprobados</button>
            </div>

        </div>
    </div>
    <div class="cell small-12 medium-2 large-3">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_operaciones_reporte" class="btn btn-primary" onclick="AbrirReporte();">Reporte</button>
            </div>
        </div>
    </div>
</div>
<!-- End Buttons  -->

<!-- Formulario -->
<div name="div-finalizar-frm" class="content">
    <div class="grid-x align-top">
        <div class="cell large-2">
            <label class="text-f" id="lbl_solucion_fecha" >${fecha}</label>
        </div>
        <div class="cell large-8">
            <div class="grid-x align-center align-top">
                <div class="cell text-center" style="visibility:visible">
                    <div style="margin-bottom: 5px"><span class="spn-finalizar-emp text-primary" style="font-size:10px;font-weight:bold"></span></div>
                    <div style="margin-bottom: 5px"><span class="spn-finalizar-pro text-primary" style="font-size:10px;font-weight:bold"></span></div>
                    <div><span class="spn-finalizar-req text-primary" style="font-size:10px;font-weight:bold"></span></div>
                </div>
            </div>
        </div>
        <div class="cell large-2"></div>
    </div>
</div>

<!-- End Formulario -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-12">
        <table class="table">
            <thead id="thead-finalizar-requerimientos" class="thead-primary" style="display:none">
            <tr>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 15px">N</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 250px">Requermiento</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 100px">Fecha Registro Requerimiento</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 250px">Solucion</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 100px">Fecha Inicio Solucion</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 200px">Proyecto</th>
                <th class="p-3 text-primary text-center" style="font-size: 14px; width: 150px">Empresa</th>
            </tr>
            </thead>
            <tbody id="tbody-finalizar-requerimientos" name="tbody-finalizar-requerimientos" >
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->



<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptFinalizar.js"></script>
<!-- End JavaScript -->
</body>
</html>
