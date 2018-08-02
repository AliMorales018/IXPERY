<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usuarios</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
</head>

<body>
<input type="hidden" id="hdn_usuario"/>
<input type="hidden" id="hdn_usuario_isvalid"/>

<!-- Buttons  -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-users"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de Usuarios</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_usuario_nue">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_usuario_nue_reload" onclick="CargarJS_usuario(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_usuario_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_usuario();">Guardar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!--Notify-->
    </div>
</div>
<!-- End Buttons  -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_usuario_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <table class="table" id="tbl_usuario">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_usuario_bususer" name='txt_usuario_bususer' placeholder='Usuario' class="form-con txtBus" />
                        <button type="button" id="btn_usuario_bususer" class="btn btn-sm-search" onclick="buscar_Usuario();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_usuario_busnom" name='txt_usuario_busnom' placeholder='Nombre' class="form-con txtBus" />
                        <button type="button" id="btn_usuario_busnom" class="btn btn-sm-search" onclick="buscar_Usuario();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_usuario_busapep" name='txt_usuario_busapep' placeholder='A. Paterno' class="form-con txtBus" />
                        <button type="button" id="btn_usuario_busapep" class="btn btn-sm-search" onclick="buscar_Usuario();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_usuario_busapem" name='txt_usuario_busapem' placeholder='A. Materno' class="form-con txtBus" />
                        <button type="button" id="btn_usuario_busapem" class="btn btn-sm-search"onclick="buscar_Usuario();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Estado</th>
                <th class="p-3">Clave</th>
                <th class="p-3">Personal</th>
                <th class="p-3">Correo</th>
                <th id="thEditar_usuario"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_usuario" >
            <tr id="firstRowBody_usuario">
                <td><div id="campo1_tbl_usuario"><p id="p_num_usuario1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_usuario"><input type="text" id="Vtxt_usuario_user1" name="Vtxt_usuario_user1" class="form-control" /></div></td>
                <td><div id="campo3_tbl_usuario"><input type="text" id="txt_usuario_nombre1" name="txt_usuario_nombre1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_usuario"><input type="text" id="txt_usuario_apep1" name="txt_usuario_apep1" class="form-control" /></div></td>
                <td><div id="campo5_tbl_usuario"><input type="text" id="txt_usuario_apem1" name="txt_usuario_apem1" class="form-control" /></div></td>
                <td><div id="campo6_tbl_usuario"><select id="Dcmb_usuario_estado1" name="dcmb_usuario_estado1" class="custom-select" disabled><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                <td><div id="campo7_tbl_usuario"><input type="text" id="txt_usuario_clave1" name="txt_usuario_clave1" class="form-control" /></div></td>
                <td><div id="campo8_tbl_usuario"><select  class="custom-select" id="cmb_usuario_empleado1" name="cmb_usuario_empleado1" >
                    <option value="0">Seleccione . . .</option>
                    <c:forEach items="${listEmpleados}" var="empleado">
                        <option value="${empleado.idempleado}">${empleado.nombre} ${empleado.apellidopaterno} ${empleado.apellidomaterno} - ${empleado.dni}</option>
                    </c:forEach>
                </select></div></td>
                <td><div id="campo9_tbl_usuario"><input type="text" id="txt_usuario_correo1" name="txt_usuario_correo1" class="form-control" /></div></td>
                <td><div id="campo10_tbl_usuario"><button type="button" class="btn btn-sm-delete" id="btn_usuario_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script language="JavaScript" src="${urlPublic}/js/Sistema/ScriptUsuario.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script >
<!-- End JavaScript -->
</body>
</html>

