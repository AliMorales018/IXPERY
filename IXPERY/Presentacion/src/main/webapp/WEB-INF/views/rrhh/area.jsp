<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<html>
<head>
    <title>Área</title>
</head>
<body>
<input type="hidden" id="hdn_area" />
<input type="hidden" id="hdn_area_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-pie-chart"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de Áreas</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_area_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_area_nue_reload"  onclick="CargarJS_area(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_area_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_area();">Guardar</button>
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
            <label class="text-f" id="lbl_area_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-7">
        <table class="table" id="tbl_area">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_area_busnom" placeholder='area' class="form-con txtBus" />
                        <button id="btn_area_busnom"  class="btn btn-sm-search" onclick="buscar_Area();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <!--th class="p-3">Estado</th-->
                <!--th class="p-3">Fecha Registro</--th-->
                <!--th class="p-3">Usuario Registro</th-->
                <th id="thEditar_area"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_area" >
            <tr id="firstRowBody_area">
                <td><div id="campo1_tbl_area"><p id="p_num_area1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_area"><input type="text" id="Vtxt_area_nombre1" name="Vtxt_area_nombre1" class="form-control" /></div></td>
                <!--td><div id="campo3_tbl_area"><select id="Dcmb_area_estado1" name="Dcmb_area_estado1" class="custom-select" disabled><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td-->
                <!--td><div id="campo4_tbl_area"><input type="text" id="txt_area_fchReg1" name="txt_area_fchReg1" class="form-control" /></div></td-->
                <!--td><div id="campo3_tbl_area"><input type="text" id="txt_area_usrEst1" name="txt_area_usrEst1" class="form-control" /></div></td-->
                <!--td><div id="campo4_tbl_area"><input type="text" id="txt_area_usrReg1" name="txt_area_usrReg1" class="form-control" /></div></td-->
                <td><div id="campo5_tbl_area"><button type="button" class="btn btn-sm-delete" id="btn_area_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/RRHH/ScriptArea.js"></script>
<!-- End JavaScript -->

</body>
</html>

