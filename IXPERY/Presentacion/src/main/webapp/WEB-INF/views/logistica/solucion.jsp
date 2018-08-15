<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solucions</title>
    <style>
        #tbody-solucion-requerimientos tr:hover {
            background-color: #E6E6E6;
            /*background-color: #D34539;*/
            cursor: pointer;
        }
        .unstyled::-webkit-inner-spin-button{
            display: none;
            -webkit-appearance: none;
        }
    </style>

</head>

<body>

<!-- Buttons  -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
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
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_solucion_pendientes" class="btn btn-light" onclick="BuscarRequerimientos();">Pendientes</button>
            </div>
            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_solucion_save" class="btn btn-light" onclick="GuardarSolucion();">Guardar</button>
            </div>

            <div class="cell small-4 medium-4 large-3 text-center">
                <button type="button" id="btn_solucion_delete" class="btn btn-secondary" onclick="EliminarSolucion();">Eliminar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-2 large-3">
        <div class="cell small-4 medium-4 large-12 text-center">
            <button type="button" id="btn_enviar_solucion_cotizacion" class="btn btn-light" onclick="EnviarSolucionCotizacion();" style="display:none">Enviar a Cotizacion</button>
        </div>
    </div>
</div>
<!-- End Buttons  -->

<!-- Formulario -->
<div name="div-solucion-frm" class="content">
    <div class="grid-x align-center align-top">

        <div class="cell large-2">
            <label class="text-f" id="lbl_solucion_fecha" >${fecha}</label>
        </div>
        <div class="cell large-8">
            <div class="grid-x align-center align-top">
                <div class="cell text-center" style="visibility:visible">
                    <div style="margin-bottom: 5px"><span class="spn-solucion-emp text-primary" style="font-size:10px;font-weight:bold"></span></div>
                    <div style="margin-bottom: 5px"><span class="spn-solucion-pro text-primary" style="font-size:10px;font-weight:bold"></span></div>
                    <div><span class="spn-solucion-req text-primary" style="font-size:10px;font-weight:bold"></span></div>
                </div>
            </div>
        </div>
        <div class="cell large-2"></div>


        <div class="cell large-7" style="margin-top: 20px">
            <div class="grid-x grid-padding-x align-center-middle">
                <div class="cell large-7">
                    <div class="form-group">
                        <label class="label text-primary">Buscar Solucion:</label>
                        <select id="cmb-solucion-req" name="cmb-solucion-req" onchange="BuscarSolucion($(this).val());">
                        </select>
                    </div>
                </div>
                <div class="cell large-5">
                    <div class="form-group">
                        <label class="label text-primary">Fecha Inicio:</label>
                        <input name="txt-solucion-fch" class="form-control" type="date">
                    </div>
                </div>
            </div>



            <div class="grid-x grid-padding-x align-center-middle">
                <div class="cell large-7">
                    <div class="form-group">
                        <label class="label text-primary">Nombre de la Solucion:</label>
                        <input name="txt-solucion-nom" class="form-control" type="text" placeholder="Nombre">
                    </div>
                </div>
                <div class="cell large-5">
                    <div class="form-group">
                        <label class="label text-primary">Encargado:</label>
                        <select name="cmb-solucion-enc" class="custom-select"></select>
                    </div>
                </div>
            </div>
        </div>



        <div class="cell large-4" style="margin-top: 20px">
            <div class="grid-x grid-padding-x">
                <div class="cell large-12">
                    <div class="form-group">
                        <label class="label text-primary">Descripcion:</label>
                        <textarea name="tar-solucion-des" rows="6" style="width:100%;" id="txt_solucion_des" placeholder="Despcripcion"></textarea>
                    </div>
                </div>
            </div>
        </div>




    </div>
</div>
<!-- End Formulario -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-12">
        <table class="table">
            <thead id="thead-solucion-requerimientos" class="thead-primary" style="display:none">
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
            <tbody id="tbody-solucion-requerimientos" name="tbody-solucion-requerimientos" >
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->



<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptSolucion.js"></script>
<!-- End JavaScript -->
</body>
</html>