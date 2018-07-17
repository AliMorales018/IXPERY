<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Servicios</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
</head>
<body>
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
                <p class="main-title">Servicios</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_servicio_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_servicio_nue_reload" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_servicio_save" class="btn btn-secondary">Guardar</button>
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
            <label class="text-f" id="lbl_servicio_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Input y Personal en Transito -->
<div class="l-container">
    <div class="grid-x align-center-middle grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary"><b>Número de Cuadrilla:</b></label>
                <input type="text" class="form-control" type="text" id="txt_num_cuadrilla" placeholder="Número de Cuadrilla">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary"><b>Porcentaje de Depreciación:</b></label>
                <input type="text" class="form-control" type="text" id="txt_porcen_depre" placeholder="Porcentaje de Depreciación">
            </div>
        </div>
    </div>
</div>
<!-- End Input y Personal en Transito -->

<!-- Actividades -->
<div class="l-container">
    <div class="grid-x align-center-middle grid-padding-x">
        <div class="cell large-4">
            <div class="form-group">
                <label class="label text-primary"><b>Nombre de actividad:</b></label>
                <input type="text" class="form-control" type="text" placeholder="Nombre de actividad">
            </div>
        </div>

        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary"><b>Descripción:</b></label>
                <input type="text" class="form-control" type="text"  placeholder="Descripcion">
            </div>
        </div>

        <div class="cell large-2">
            <div class="form-group">
                <label class="label text-primary"><b>Cantidad:</b></label>
                <input type="text" class="form-control" type="text" placeholder="Cantidad">
            </div>
        </div>
        <div class="cell large-2">
            <div class="form-group">
                <label class="label text-primary"><b>Riesgo:</b></label>
                <input type="text" class="form-control" type="text" placeholder="Riesgo">
            </div>
        </div>
    </div>
    <!-- Table -->
    <div class="grid-x grid-padding-x l-container">
        <div class="cell large-12">
            <table class="table" id="tbl_servicios">
                <thead class="thead-primary">
                <tr>
                    <th class="p-3">Cargo Laboral</th>
                    <th class="p-3">Cantidad</th>
                    <th class="p-3">Tiempo</th>
                </tr>
                </thead>
                <tbody id="tbody_contactoempresa" >
                <tr id="firstRowBody_contactoempresa">
                    <td><div id="campo1_tbl_contactoempresa"><p id="p_num_contactoempresa1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_nombre1" name="txt_contactoempresa_nombre1" class="form-control" /></div></td>
                    <td><div id="campo3_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_apep1" name="txt_contactoempresa_apep1" class="form-control" /></div></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- End Table -->
</div>
<!-- Actividades -->

</body>
</html>

