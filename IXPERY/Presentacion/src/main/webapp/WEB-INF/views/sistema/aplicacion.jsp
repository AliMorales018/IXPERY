<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Aplicacion</title>
</head>
<body>
    <input type="hidden" id="hdn_aplicacion" />
    <input type="hidden" id="hdn_aplicacion_isvalid"/>

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
                    <p class="main-title">Registro de Aplicaciones</p>
                </div>
            </div>
        </div>
        <div class="cell small-12 medium-4">
            <div class="grid-x align-center-middle">
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button type="button" class="btn btn-light" id="btn_aplicacion_nue" >Nuevo</button>
                    <button type="button" class="btn btn-light" id="btn_aplicacion_nue_reload"  onclick="CargarJS_aplicacion(0,1,1);" style="display:none">Nuevo</button>
                </div>
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button type="button" id="btn_aplicacion_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_aplicacion();">Guardar</button>
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
                <label class="text-f" id="lbl_aplicacion_fecha" >${fecha}</label>
            </div>
        </div>
    </div>
    <!-- End Date -->

    <!-- Table -->
    <div class="grid-x grid-padding-x align-center-middle l-container">
        <div class="cell large-7">
            <table class="table" id="tbl_aplicacion">
                <thead class="thead-primary">
                <tr>
                    <th class="p-3"><p class="text-center">N°</p></th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_aplicacion_busnomapli" name='txt_aplicacion_busnomapli' placeholder='Aplicacion' class="form-con txtBus" />
                            <button type="button" id="btn_aplicacion_busapli" class="btn btn-sm-search" onclick="buscar_Aplicacion();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th class="p-3">Estado</th>
                    <th class="p-3">Versión</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_aplicacion_busabrevia" name='txt_aplicacion_abrevia' placeholder='Abreviatura' class="form-con txtBus" />
                            <button id="btn_aplicacion_busabrevia"  class="btn btn-sm-search" onclick="buscar_Aplicacion();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th id="thEditar_aplicacion"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>
                <tbody id="tbody_aplicacion" >
                <tr id="firstRowBody_aplicacion">
                    <td><div id="campo1_tbl_aplicacion"><p id="p_num_aplicacion1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_aplicacion"><input type="text" id="Vtxt_aplicacion_nombre1" name="Vtxt_aplicacion_nombre1" class="form-control" /></div></td>
                    <td><div id="campo3_tbl_aplicacion"><select id="Dcmb_aplicacion_estado1" name="Dcmb_aplicacion_estado1" class="custom-select" disabled><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                    <td><div id="campo4_tbl_aplicacion"><input type="text" id="txt_aplicacion_version1" name="txt_aplicacion_version1" class="form-control" /></div></td>
                    <td><div id="campo5_tbl_aplicacion"><input type="text" id="txt_aplicacion_abrevia1" name="txt_aplicacion_abrevia1" class="form-control" /></div></td>
                    <td><div id="campo6_tbl_aplicacion"><button type="button" class="btn btn-sm-delete" id="btn_aplicacion_elim1"><i class="icon icon-bin"></i></button></div></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- End Table -->

    <!-- JavaScript -->
    <script language="JavaScript" src="${urlPublic}/js/Sistema/ScriptAplicacion.js"></script>
    <!-- End JavaScript -->

</body>
</html>
