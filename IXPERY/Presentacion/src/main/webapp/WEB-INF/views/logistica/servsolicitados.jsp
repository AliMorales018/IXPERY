<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serv Solicitados</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css" />
    <style type="text/css">

        .icon-add-row{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }
    </style>
    <script src="${urlPublic}/js/jquery-3.3.1.js"></script>
</head>

<body>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Serv. Solicitados</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_servsolic_save" class="btn btn-secondary" onclick="InsUpdDelservsolic();">Guardar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notify -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div id="content">
    <div class="l-container-sm">
        <div class="grid-x grid-padding-x">
            <div class="cell large-12">
                <label class="text-f" id="lbl_servsolic_fecha">${fecha}</label>
            </div>
        </div>
    </div>
    <!-- End Date -->


    <!-- Equipos Regitrados-->
    <div id="container_servsolics" style="margin-top: 15px;">
        <div id="servsolic_1" class="actividad grid-container">
            <label id="lbl_servsolic_ideq" style="visibility: hidden;"></label>
            <!-- Table -->
            <div class="grid-x grid-padding-x">
                <div class="cell large-9">
                    <div class="grid-x grid-margin-x">
                        <div class="cell large-6 container-combo">
                            <div class="form-group">
                                <label class="label text-primary" style="line-height: 1.5;"><b>REGISTRAR SERVICIOS</b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell large-12">
                    <table class="table">
                        <thead class="thead-primary">
                        <tr>
                            <th id="add_row_servsolic_1" class="text-center" onclick="addservsolics_servsolic();"><i class="icon-plus2 icon-add-row"></i></th>
                            <th>
                                <div class="input-group" id="divControlProd">
                                    <input type="text" id="txt_servsolic_busnom" name='txt_servsolic_busnom' onblur="convertUpperCase(this);" placeholder='Nombre Servicio' class="form-con txtBus" />
                                    <button type="button" id="btn_servsolic_busnom" class="btn btn-sm-search" onclick="buscar_servsolic();"><i class="icon icon-search4"></i></button>
                                </div>
                            </th>
                            <th>Estado</th>
                            <th style="display: none">IdServSolic</th>
                            <th class="text-center"><i class="icon icon-bin"></i></th>
                        </tr>
                        </thead>
                        <tbody id="tbody_servsolic">
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End Table -->
        </div>
    </div>
    <!-- Fin Equipos -->


</div>
<div id="editor"></div>
<!-- Fin Equipos -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptServSolicitados.js"></script>
<!-- End JavaScript -->

</body>
</html>