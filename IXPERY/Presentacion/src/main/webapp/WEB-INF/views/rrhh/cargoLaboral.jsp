<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>CargoLaboral</title>
</head>
<body>
<input type="hidden" id="hdn_cargolaboral" />
<input type="hidden" id="hdn_cargolaboral_isvalid"/>
<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de Cargo laboral</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_cargolaboral_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_cargolaboral_nue_reload"  onclick="CargarJS_cargolaboral(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_cargolaboral_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_cargolaboral();">Guardar</button>
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
            <label class="text-f" id="lbl_cargolaboral_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-8">
        <table class="table" id="tbl_cargolaboral">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p>N°</p></th>
                <th class="p-3"><p>Area</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_cargolaboral_busnom" name='txtcargolaboral_busnomcargo' placeholder='Cargo Laboral' class="form-con txtBus" />
                        <button type="button" id="btncargolaboral_buscargo" class="btn btn-sm-search" onclick="buscar_CargoLaboral();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3"><p>Salario</p></th>
                <th class="p-3"><p>Estado</p></th>
                <th id="thEditar_cargolaboral"  class=" p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_cargolaboral" >
            <tr id="firstRowBody_cargolaboral">
                <td><div id="campo1_tbl_cargolaboral"><p id="p_num_cargolaboral1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_cargolaboral"><select id="cmb_cargolaboral_area1" name="cmb_cargolaboral_area1" class="custom-select">
                                                            <c:forEach items="${areas}" var="area">
                                                                <option value="${area.idArea}">${area.nomArea}</option>
                                                            </c:forEach>
                                                      </select></div></td>
                <td><div id="campo3_tbl_cargolaboral"><input type="text" id="Vtxt_cargolaboral_nombre1" name="Vtxt_cargolaboral_nombre1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_cargolaboral"><input type="text" id="txt_cargolaboral_sal1" name="txt_cargolaboral_sal1" class="form-control" /></div></td>
                <td><div id="campo5_tbl_cargolaboral"><select id="Dcmb_cargolaboral_estado1" name="Dcmb_cargolaboral_estado1" class="custom-select" disabled ><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                <td><div class="text-center" id="campo6_tbl_cargolaboral" class="text-center"><button type="button" class="btn btn-sm-delete" id="btn_cargolaboral_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/RRHH/ScriptCargoLaboral.js"></script>
<!-- End JavaScript -->

</body>
</html>