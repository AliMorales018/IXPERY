<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PreRegistroEmpresa</title>
    <link rel="stylesheet" href="${urlPublic}/css/hovertable.css">
</head>

<body>
<input type="hidden" id="hdn_preempresa"/>
<input type="hidden" id="hdn_preempresa_isvalid"/>

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
                <p class="main-title">Pre-Registro de Empresa</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_preempresa_nue">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_preempresa_nue_reload" onclick="CargarJS_preempresa(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_preempresa_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_preempresa();">Guardar</button>
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
            <label class="text-f" id="lbl_preempresa_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->
<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <table class="table" id="tbl_preempresa">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th class="text-center p-3" style="display:none">Id</th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_preempresa_busruc" name='txt_preempresa_busruc' placeholder='Ruc' class="form-con txtBus" />
                        <button type="button" id="btn_preempresa_busruc" class="btn btn-sm-search" onclick="buscar_preempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_preempresa_busnomb" name='txt_preempresa_busnomb' placeholder='Nombre' class="form-con txtBus" />
                        <button type="button" id="btn_preempresa_busnomb" class="btn btn-sm-search" onclick="buscar_preempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Dirección</th>
                <th class="p-3">E-mail</th>
                <th class="p-3">Teléfono</th>
                <th id="thEditar_preempresa"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_preempresa" >
            <tr id="firstRowBody_preempresa">
                <td><div id="campo1_tbl_preempresa"><p id="p_num_preempresa1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_preempresa"><input type="text" id="Vtxt_preempresa_ruc1" name="Vtxt_preempresa_ruc1" class="form-control" /></div></td>
                <td><div id="campo3_tbl_preempresa"><input type="text" id="txt_preempresa_nombre1" name="txt_preempresa_nombre1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_preempresa"><input type="text" id="txt_preempresa_dire1" name="txt_preempresa_dire1" class="form-control" /></div></td>
                <td><div id="campo5_tbl_preempresa"><input type="text" id="txt_preempresa_emai1" name="txt_preempresa_emai1" class="form-control" /></div></td>
                <td><div id="campo6_tbl_preempresa"><input type="text" id="txt_preempresa_tele1" name="txt_preempresa_tele1" class="form-control" /></div></td>
                <td><div id="campo7_tbl_preempresa"><button type="button" class="btn btn-sm-delete" id="btn_preempresa_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<button id="btnPrueba" onclick="comparaArrayGuardar_preempresa();">Comparar</button>
<!-- End Table -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptPreEmpresa.js"></script>
<script language="JavaScript" src="${urlPublic}/js/validaciones.js"></script>
<!-- End JavaScript -->
</body>
</html>