<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<html>
<head>
    <title>Proyecto</title>
    <style>
        #tbody_proyecto tr:hover {
            background-color: #E6E6E6;
            /*cursor: pointer;*/
        }
        .unstyled::-webkit-inner-spin-button{
            display: none;
            -webkit-appearance: none;
        }

    </style>

</head>

<body>
<input type="hidden" id="hdn_proyecto" />
<input type="hidden" id="hdn_proyecto_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-list2"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Proyecto</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" onclick="NuevoProyecto();">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_proyecto_nue_reload" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_proyecto_save" class="btn btn-secondary"  onclick="GuardarProyecto();">Guardar</button>
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
            <label class="text-f" id="lbl_proyecto_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container content">
    <div class="cell large-12">
        <table class="table" id="tbl_proyecto">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_proyecto_busnom" name='txt_proyecto_busnomapli' placeholder='Proyecto' class="form-con txtBus" />
                        <button type="button" id="btn_proyecto_busnom" class="btn btn-sm-search" onclick="BuscarProyecto();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_proyecto_busemp" name='txt_proyecto_emp' placeholder='Empresa' class="form-con txtBus" />
                        <button type="button" id="btn_proyecto_emp" class="btn btn-sm-search" onclick="BuscarProyecto();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Jefe Proyecto</th>
                <th class="p-3">F. Inicio</th>
                <th class="p-3">F. Prob. Fin</th>
                <th class="p-3">Estado</th>
                <th class="p-3">REQ</th>
                <th class="p-3">TIM</th>
                <th class="p-3">INV</th>
                <th id="thEditar_proyecto"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th class="text-center p-3"><i name="pro-del" class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_proyecto">
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->


<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptProyecto.js"></script>

</body>
</html>
