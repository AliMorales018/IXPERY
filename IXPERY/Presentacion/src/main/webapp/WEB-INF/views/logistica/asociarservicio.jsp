<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asociar Servicio</title>
    <style>
        .select2-container .select2-selection--single {
            height: 25.15px;
        }
        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
        }
        .line-height-asoprod{
            line-height: 25.15px;
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
                    <i class="icon icon-loop3"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Asociar Servicio</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_asociarservsoli_save" class="btn btn-secondary" onclick="save_servsoli_asociados();">Guardar</button>
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
            <label class="text-f" id="lbl_asociarservsolic_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-6">
        <table class="table" id="tbl_asociarservsolic">
            <thead class="thead-primary">
            <tr>
                <th class="text-center"><p class="text-center">N°</p></th>
                <th>Servicio</th>
                <th>Asociar Servicio</th>
                <th class="text-center">Crear Servicio</th>
            </tr>
            </thead>
            <tbody id="tbody_asociarservsolic">
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script type="text/javascript" src="${urlPublic}/js/Logistica/ScriptAsociarServSolic.js"></script>
<!-- End JavaScript -->
</body>
</html>
