<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Perfil</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
</head>
<body>
<input type="hidden" id="hdn_perfil" />
<input type="hidden" id="hdn_perfil_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-user-tie"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de Perfiles</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_perfil_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_perfil_nue_reload"  onclick="CargarJS_perfil(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_perfil_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_perfil();">Guardar</button>
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
            <label class="text-f" id="lbl_perfil_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-7">
        <table class="table" id="tbl_perfil">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th class="p-3">Aplicacion</th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_perfil_busnom" placeholder='Perfil' class="form-con txtBus" />
                        <button id="btn_perfil_busnom"  class="btn btn-sm-search" onclick="buscar_Perfil();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Estado</th>
                <th id="thEditar_perfil"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_perfil" >
            <tr id="firstRowBody_perfil">
                <td><div id="campo1_tbl_perfil"><p id="p_num_perfil1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_perfil"><select id="cmb_perfil_aplicacion1" name="cmb_perfil_aplicacion1" class="custom-select">
                                                    <c:forEach items="${listApli}" var="aplicacion">
                                                        <option value="${aplicacion.idapli}">${aplicacion.aplicacion}</option>
                                                    </c:forEach>
                                                </select></div></td>
                <td><div id="campo3_tbl_perfil"><input type="text" id="Vtxt_perfil_nombre1" name="Vtxt_perfil_nombre1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_perfil"><select id="Dcmb_perfil_estado1" name="Dcmb_perfil_estado1" class="custom-select" disabled><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                <td><div id="campo5_tbl_perfil" class="text-center"><button type="button" class="btn btn-sm-delete" id="btn_perfil_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script language="JavaScript" src="${urlPublic}/js/Sistema/ScriptPerfil.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script >
<!-- End JavaScript -->

</body>
</html>
