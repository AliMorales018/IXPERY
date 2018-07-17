<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solucions</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
</head>

<body>

<!-- Buttons  -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-3 large-3 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-users"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Solucion</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-6 large-6">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_solucion_save" class="btn btn-light" onclick="RegistrarSolucion();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_solucion_send" class="btn btn-light" onclick="ValidarCampos_tbl_solucion();">Enviar a Operaciones</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_solucion_delete" class="btn btn-secondary" onclick="ValidarCampos_tbl_solucion();">Eliminar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-3 large-3">
        <!--Notify-->
    </div>
</div>
<!-- End Buttons  -->

<!-- Formulario -->
<div>
    <div class="grid-x align-center-middle">
        <div class="cell large-1 text-center">
            <div>
                <label class="text-f" id="lbl_solucion_fecha" >${fecha}</label>

            </div>
            <div>
                <label class="text-f" id="lbl_solucion_fecha1" style="color: #F2F2F2">.</label>
            </div>
            <div>
                <label class="text-f" id="lbl_solucion_fecha2" style="color: #F2F2F2">.</label>
            </div>
        </div>
        <div class="cell large-10 text-center">
            <div style="margin: 7px auto">
                <h4>SOLUCION-SEMP0001</h4>
            </div>
        </div>
        <div class="cell large-1">
        </div>
    </div>

    <div style="margin: 10px auto" class="grid-x grid-padding-x align-center-middle">
        <div class="cell large-9">
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Empresa:</label>
                        <div id="sol_emp_capa1"><input type="text" id="txt_solucion_emp" name="txt_solucion_emp" class="form-control" /></div><div id="sol_emp_capa0"><select id="cmb_solucion_emp" name="cmb_solucion_emp" class="form-control ocultar"></select></div>
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Proyecto:</label>
                        <div id="sol_pro_capa1"><input type="text" id="txt_solucion_pro" name="txt_solucion_pro" class="form-control" /></div><div id="sol_pro_capa0"><select id="cmb_solucion_pro" name="cmb_solucion_pro" class="form-control ocultar"></select></div>
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Requerimiento:</label>
                        <div id="sol_req_capa1"><input type="text" id="txt_solucion_req" name="txt_solucion_req" class="form-control" /></div><div id="sol_req_capa0"><select id="cmb_solucion_req" name="cmb_solucion_req" class="form-control ocultar"></select></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid-x grid-padding-x align-center-middle">
        <div class="cell large-9">
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Nombre de la Solución:</label>
                        <input class="form-control" type="text" id="txt_solucion_nom" placeholder="Nombre">
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Fecha de Inicio:</label>
                        <input class="form-control" id="txt_solucion_fch" type="date">
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Encargado:</label>
                        <input class="form-control" type="text" id="txt_solucion_enc" placeholder="Encargado" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="grid-x grid-padding-x align-center-middle">
        <div class="cell large-9">
            <div class="form-group">
                <label class="label text-primary">Descripcion:</label>
                <div>
                    <textarea style="width:100%;" id="txt_solucion_des" placeholder="Despcripcion"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Formulario -->



<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptSolucion.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script >
<!-- End JavaScript -->
</body>
</html>


























