<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<html>
<head>
    <title>Operaciones</title>
    <style type="text/css">
        .select2-container .select2-selection--single {
            height: 25.15px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
        }

        .select2-results{
            /*JS*/
            font-size: 10px;
            padding: .12rem;
        }

        #tbody-solucion-operaciones tr:hover {
            background-color: #E6E6E6;
            cursor: pointer;
        }
        .unstyled::-webkit-inner-spin-button{
            display: none;
            -webkit-appearance: none;
        }

        .row-selected{
            /*JS*/
            color: #D34539;
            border-top: .13rem solid grey;
            border-bottom: .13rem solid grey;
        }


    </style>
</head>

<body>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
    <div class="cell large-1 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-4  text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-8 ">
                <p class="main-title">Operaciones</p>
            </div>
        </div>
    </div>
    <div class="cell large-2"></div>
    <div class="cell large-7">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_operaciones_pendientes" class="btn btn-primary" onclick="BuscarSolucionesPendientes();">Pendientes</button>
            </div>
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_operaciones_guardar" class="btn btn-primary" onclick="Registrar_Operaciones();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_operaciones_aprobar" class="btn btn-primary" onclick="AprobarOperaciones();">Aprobar</button>
            </div>
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_operaciones_rechazar" class="btn btn-secondary" onclick="RechazarOperaciones();">Rechazar</button>
            </div>
        </div>
    </div>
    <div class="cell large-2">
        <%--<div class="grid-x align-center-middle">--%>
            <%--<div class="cell small-4 medium-4 large-4 text-center">--%>
                <%--<button type="button" id="btn_operaciones_reporte" class="btn btn-primary" onclick="AbrirReporte();">Reporte</button>--%>
            <%--</div>--%>
        <%--</div>--%>
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_operaciones_fecha">${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<%--Formulario--%>
<div class="grid-x grid-padding-x align-center">
    <div class="cell large-5">
        <div class="grid-x grid-padding-x">
            <div class="cell large-10">
                <div class="form-group">
                    <label class="label text-primary"><b>SELECCIONE SOLUCIÓN:</b></label>
                    <select id="selectEmpresa_Proyecto_Sol_Opera" onchange="BuscarSolucionOperaciones($(this).val())"></select>
                </div>
            </div>
            <div class="cell large-2">
                <div class="form-group">
                    <label class="label text-primary"><b>VALIDEZ</b></label>
                    <input id="txt_validezofer_opera" class="form-control unstyled" required="required" placeholder='Ejm: 1' type="number"/>
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x">
            <div class="cell large-6">
                <div class="form-group">
                    <label class="label text-primary"><b>TIEMPO ENTREGA</b></label>
                    <input type="text" id="txt_timeentre_opera" class="form-control" placeholder='' />
                </div>
            </div>
            <div class="cell large-6">
                <div class="form-group">
                    <label class="label text-primary"><b>TIEMPO EJECUCIÓN</b></label>
                    <input type="text" id="txt_timeejecu_opera" class="form-control" placeholder='' />
                </div>
            </div>
        </div>
    </div>
    <div class="cell large-4">
        <div class="form-group">
            <label class="label text-primary"><b>CONDICIONES COMERCIALES</b></label>
            <textarea id="txt_condcomer_opera" style="width:100%; height:90px;" class="form-control" placeholder=''></textarea>
        </div>
    </div>
</div>
<%--Fin Formulario--%>

<%--Tabla--%>
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-12">
        <table class="table">
            <thead id="thead-solucion-operaciones" class="thead-primary" style="display:none">
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
            <tbody id="tbody-solucion-operaciones">
            </tbody>
        </table>
    </div>
</div>
<%--Fin Tabla--%>






<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptOperaciones.js"></script>
<!-- End JavaScript -->
</body>
</html>