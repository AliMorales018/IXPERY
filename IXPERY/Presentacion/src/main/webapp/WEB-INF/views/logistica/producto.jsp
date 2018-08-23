<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RegistroProducto</title>
</head>

<body>
<input type="hidden" id="hdn_producto"/>
<input type="hidden" id="hdn_producto_isvalid"/>
<input type="hidden" id="hdn_producto_ubi"/>
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
                <p class="main-title">Registro de Productos</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_producto_nue" onclick="limpiarTotalProd();">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <div style="display: none;"><button type="button" id="btn_producto_save" class="btn btn-secondary" onclick="guardaProducto(); ">Guardar</button></div>
                <button type="button" id="btn_producto_savee" class="btn btn-secondary" onclick="guardaProducto();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button id="BtnEliminar" class="btn btn-primary" onclick="eliProducto();">Eliminar</button>
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
            <label class="text-f" id="lbl_producto_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->

<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <div class="l-container">
            <div class="grid-x grid-padding-x">
                <div class="cell large-3">
                    <div class="form-group">
                        <label class="label text-primary">Producto</label>
                        <input id="txt_producto_nombb" class="form-control" required="required" placeholder='Ingrese Nombre' type="text" />
                    </div>
                </div>
                <div class="cell large-2">
                    <div id="div_producto_familia" class="form-group">
                        <label class="label text-primary">Familia</label>
                        <select id="cmb_producto_famii" class="form-control" onchange="llenarCate_producto($(this).val())"></select>
                    </div>
                </div>
                <div class="cell large-2">
                    <div id="div_producto_categoria" class="form-group">
                        <label class="label text-primary">Categoría</label>
                        <select id="cmb_producto_catee" class="form-control"></select>
                    </div>
                </div>
                <div class="cell large-2">
                    <div id="div_producto_umedida" class="form-group">
                        <label class="label text-primary">Unidad Medida</label>
                        <select id="cmb_producto_umedd" name="cmb_producto_umedd" class="form-control"></select>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <label class="label text-primary">Código</label>
                        <input id="txt_producto_codd" class="form-control" type="text" placeholder='Ingrese Código'/>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">S. Min</label>
                        <input id="txt_producto_sminn" required="required" class="form-control" placeholder='Ejm. 1.00' type="text" />
                    </div>
                </div>
            </div>
            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">S. Real</label>
                        <input id="txt_producto_saldd" required="required" class="form-control" placeholder='Ejm. 1.00' type="text" />
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <label class="label text-primary">Modelo</label>
                        <input id="txt_producto_modee" class="form-control" type="text" placeholder='Ingrese Modelo'/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <label class="label text-primary">Marca</label>
                        <input id="txt_producto_marcc" class="form-control" type="text" placeholder='Ingrese Marca'/>
                    </div>
                </div>


                <div class="cell large-2">
                    <div id="div_producto_estado" class="form-group">
                        <label class="label text-primary">Estado</label>
                        <select id="cmb_producto_estadd" class="form-control"><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select>
                    </div>
                </div>
                <div class="cell large-2" style="display: none;">
                    <div class="form-group">
                        <input type="text" id="txt_producto_idprodd" />
                    </div>
                </div>


            </div>
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Opciones</label>
                        <div id="contentcheck_producto_estadd" style="border:1px solid #ccc; overflow-y: scroll;">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="cell large-12">
        <table class="table" id="tbl_producto">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" id="divControlProd">
                        <input type="text" id="txt_producto_busnom" name='txt_producto_busnom' onblur="convertUpperCase(this);" placeholder='Nombre Producto' class="form-con txtBus" />
                        <button type="button" id="btn_producto_busnom" class="btn btn-sm-search" onclick="CargarProductos();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th style="display: none;" class="p-3">Familia</th>
                <th class="p-3">Categoría</th>
                <th class="p-3">U. Medida</th>
                <th class="p-3">Código</th>
                <th style="display: none;" class="p-3">Estado</th>
                <th style="display: none;" class="p-3">Stock Real</th>
                <th style="display: none;" class="p-3">Stock Min.</th>
                <th class="p-3">Modelo</th>
                <th class="p-3">Marca</th>
                <th style="display: none;" class="p-3">Fecha Reg.</th>
                <th style="display: none;" class="p-3">User Reg.</th>
                <th style="display: none;" class="p-3">Insumo</th>
                <th style="display: none;" class="p-3">P.Final</th>
                <th style="display: none;" class="p-3">Estado Insumo</th>
                <th style="display: none;" class="p-3">Estado P.Final</th>
                <th style="display: none;" class="p-3">Ver</th>
            </tr>
            </thead>
            <tbody id="tbody_producto">
            <tr id="firstRowBody_producto">
            </tr>
            </tbody>
        </table>
        <div>
            <button id="BtnRegistrar" class="btn btn-success btn-sm" onclick="" style="display: none"></button>
        </div>
    </div>
</div>
<input type="hidden" id="hdn_producto_id" />

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptProducto.js"></script>
<!-- End JavaScript -->
</body>
</html>