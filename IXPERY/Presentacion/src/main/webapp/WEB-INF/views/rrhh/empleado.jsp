<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Empleado</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
</head>
<body>
<input type="hidden" id="hdn_empleado" />
<input type="hidden" id="hdn_empleado_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-cogs"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de Empleados</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_empleado_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_empleado_nue_reload"  onclick="CargarJS_empleado(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_empleado_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_empleado();">Guardar</button>
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
            <label class="text-f" id="lbl_empleado_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-12">
        <table class="table" id="tbl_empleado">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th class="p-3"><p class="text-center">Area</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_empleado_busdni" name='txt_empleado_busdni' placeholder='Dni' class="form-con txtBus" />
                        <button type="button" id="btn_empleado_busdni" class="btn btn-sm-search" onclick="buscar_Empleado();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_empleado_busnomempleado" name='txt_empleado_busnomempleado' placeholder='Nombre' class="form-con txtBus" />
                        <button type="button" id="btn_empleado_busempleado" class="btn btn-sm-search" onclick="buscar_Empleado();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_empleado_busapaterno" name='txt_empleado_busapaterno' placeholder='Ape. Pat.' class="form-con txtBus" />
                        <button type="button" id="btn_empleado_busapaterno" class="btn btn-sm-search" onclick="buscar_Empleado();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_empleado_busamaterno" name='txt_empleado_busamaterno' placeholder='Ape. Mat.' class="form-con txtBus" />
                        <button type="button" id="btn_empleado_busamaterno" class="btn btn-sm-search" onclick="buscar_Empleado();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Telefono</th>
                <th class="p-3">Direccion</th>
                <th class="p-3">FechaNac</th>
                <th class="p-3">Sexo</th>
                <th class="p-3">Estado</th>

                <th id="thEditar_empleado"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_empleado" >
            <tr id="firstRowBody_empleado">
                <td><div id="campo1_tbl_empleado"><p id="p_num_empleado1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_empleado"><select type="text" id="cmb_empleado_area1" name="cmb_empleado_area1" class="form-control" >
                                                        <c:forEach items="${areas}" var="area">
                                                            <option value="${area.idArea}">${area.nomArea}</option>
                                                        </c:forEach>
                                                 </select></div></td>
                <td><div id="campo3_tbl_empleado"><input type="number" id="Vtxt_empleado_dni1" name="Vtxt_empleado_dni1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_empleado"><input type="text" id="Vtxt_empleado_nombre1" name="Vtxt_empleado_nombre1" class="form-control" /></div></td>
                <td><div id="campo5_tbl_empleado"><input type="text" id="Vtxt_empleado_apaterno1" name="Vtxt_empleado_apaterno1" class="form-control" /></div></td>
                <td><div id="campo6_tbl_empleado"><input type="text" id="Vtxt_empleado_amaterno1" name="Vtxt_empleado_amaterno1" class="form-control" /></div></td>
                <td><div id="campo7_tbl_empleado"><input type="number" id="txt_empleado_telefono1" name="txt_empleado_telefono1" class="form-control" /></div></td>
                <td><div id="campo8_tbl_empleado"><input type="text" id="txt_empleado_direccion1" name="txt_empleado_direccion1" class="form-control" /></div></td>
                <td><div id="campo9_tbl_empleado"><input type="date" id="txt_empleado_fechanac1" name="txt_empleado_fechanac1" class="form-control" /></div></td>
                <td><div id="campo10_tbl_empleado"><select id="cmb_empleado_sexo1" name="cmb_empleado_sexo1" class="custom-select"><option value="M" selected>M</option><option value="F">F</option></select></div></td>
                <td><div id="campo11_tbl_empleado"><select id="Dcmb_empleado_estado1" name="Dcmb_empleado_estado1" class="custom-select" disabled ><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                <td><div id="campo12_tbl_empleado"><button type="button" class="btn btn-sm-delete" id="btn_empleado_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/RRHH/ScriptEmpleado.js"></script>
<!-- End JavaScript -->

</body>
</html>
