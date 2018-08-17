<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipos</title>
    <style type="text/css">

        .icon-add-row{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }

        .equipo{
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: 15px;
        }

        .select2-container .select2-selection--single {
            height: 25.15px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
        }

        .selectempresa2-result-equipo{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectempresa2-result-equipoproyecto{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
    </style>
</head>

<body>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">S. Equipo</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo_save" class="btn btn-secondary" onclick="VerEstaGuardaItem1();">Enviar a Cotizar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notify -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div id="content">
    <div class="l-container-sm">
        <div class="grid-x grid-padding-x">
            <div class="cell large-12">
                <label class="text-f" id="lbl_equipo_fecha">${fecha}</label>
            </div>
        </div>
    </div>
    <!-- End Date -->
    <!-- Combo ProyectoEmpresa -->
    <div class="grid-container" style="display: none;">
        <div class="cell large-9">
            <div class="grid-x grid-margin-x">
                <div class="cell large-4 container-combo">
                    <div class="form-group">
                        <label class="label text-primary" style="line-height: 1.5;"><b>Seleccione Solución:</b></label>
                        <select id="selectEmpresaEquipo_Proyecto"></select>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Combo -->

    <!-- Equipos Regitrados-->
    <div id="container_equipos" style="margin-top: 15px;">
        <div id="equipo_1" class="actividad grid-container">
            <label id="lbl_equipo_ideq" style="visibility: hidden;"></label>
            <!-- Table -->
            <div class="grid-x grid-padding-x">
                <div class="cell large-9">
                    <div class="grid-x grid-margin-x">
                        <div class="cell large-6 container-combo">
                            <div class="form-group">
                                <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONAR EQUIPOS Y MATERIALES</b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell large-12">
                    <table class="table">
                        <thead class="thead-primary">
                        <tr>
                            <th id="add_row_equipo_1" class="text-center" onclick="addEquipos_equipo();"><i class="icon-plus2 icon-add-row"></i></th>
                            <th>Producto</th>
                            <th>Código</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>U. Medida</th>
                            <th style="width: 20px;">Cantidad</th>
                            <th style="display: none">IdProducto</th>
                            <th style="display: none">IdProdSolucion</th>
                            <th class="text-center"><i class="icon icon-bin"></i></th>
                        </tr>
                        </thead>
                        <tbody id="tbody_equipo">
                        <%--<tr id="equipo_1_fila_1" class="equipo-insert">
                            <td><div><p class="text-center">1</p></div></td>
                            &lt;%&ndash;<td><div><select   id="cmb_equipo_nompro1" name="cmb_equipo_nompro1" class="select_equipo_equipos" onchange="selCmbProd(this)" style="width: 100%;"></select></div></td>&ndash;%&gt;
                            <td><div><select   id="cmb_equipo_nompro" class="select_equipo_equipos" onchange="selCmbProd(this)" style="width: 100%;"></select></div></td>
                            <td><div><span id="spn_equipo_codpro"></span></div></td>
                            <td><div><span id="spn_equipo_modpro"></span></div></td>
                            <td><div><span id="spn_equipo_marpro"></span></div></td>
                            <td><div><span id="spn_equipo_umepro"></span></div></td>
                            <td><div><input id="txt_equipo_canpro" type="text" class="form-control" required/></div></td>
                            <td hidden><div><span id="spn_equipo_idprod"></span></div></td>
                            <td hidden><div><span id="spn_equipo_idprodsol"></span></div></td>
                            <td><div class="text-center"><button type="button" onclick="eliminar_fila_tabla_equipos(`equipo_1_fila_1`);"><i class="icon-cross icon-hp-desh"></i></button></div></td>
                        </tr>--%>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End Table -->
        </div>
    </div>
    <!-- Fin Equipos -->

    <!-- Equipos no Registrados-->
    <div id="container_equiposnr" style="margin-top: 15px;">
        <div id="equiponr_1" class="actividad grid-container">
            <!-- Table -->
            <div class="grid-x grid-padding-x">
                <div class="cell large-9">
                    <div class="grid-x grid-margin-x">
                        <div class="cell large-6 container-combo">
                            <div class="form-group">
                                <label class="label text-primary" style="line-height: 1.5;"><b>REGISTRAR EQUIPOS Y MATERIALES NUEVOS</b></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell large-12">
                    <table class="table" id="tbl_equiponr">
                        <thead class="thead-primary">
                        <tr>
                            <th id="add_row_equiponr_1" class="text-center" onclick="addEquipos_equiponr(this);"><i class="icon-plus2 icon-add-row"></i></th>
                            <th>Producto</th>
                            <th>Modelo</th>
                            <th>Marca</th>
                            <th>U. Medida</th>
                            <th>Cantidad</th>
                            <th style="display: none">IdPreRegProd</th>
                            <th class="text-center"><i class="icon icon-bin"></i></th>
                        </tr>
                        </thead>
                        <tbody  id="tbody_equiponr">
                        <tr id="equiponr_1_fila_1">
                            <td><div><p class="text-center">1</p></div></td>
                            <td><div><input id="txt_equiponr_nompro" type="text" class="form-control" /></div></td>
                            <td><div><input id="txt_equiponr_modpro" type="text" class="form-control" /></div></td>
                            <td><div><input id="txt_equiponr_marpro" type="text" class="form-control" /></div></td>
                            <td><div><input id="txt_equiponr_umepro" type="text" class="form-control" /></div></td>
                            <td><div><input id="txt_equiponr_canpro" type="text" class="form-control" /></div></td>
                            <td hidden><div><span id="spn_equiponr_idpreg"></span></div></td>
                            <td><div class="text-center"><button type="button" onclick="eliminar_fila_tabla_equiposnr(`equiponr_1_fila_1`);"><i class='icon-cross icon-hp-desh'></i></button></div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- End Table -->
        </div>
    </div>
</div>
<div id="editor"></div>
<!-- Fin Equipos -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo.js"></script>
<!-- End JavaScript -->

</body>
</html>