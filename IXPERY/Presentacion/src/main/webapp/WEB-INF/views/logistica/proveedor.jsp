<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RegistroProveedor</title>
</head>

<body>
<input type="hidden" id="hdn_proveedor"/>
<input type="hidden" id="hdn_proveedor_isvalid"/>
<input type="hidden" id="hdn_proveedor_ubi"/>
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
                <p class="main-title">Registro de Proveedor</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_proveedor_nue">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_proveedor_nue_reload" onclick="CargarJS_proveedor(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <div style="display: none;"><button type="button" id="btn_proveedor_save" class="btn btn-secondary" onclick="guardaProveedor(); ">Guardar</button></div>
                <button type="button" id="btn_proveedor_savee" class="btn btn-secondary" onclick="guardaProveedor();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button id="BtnEliminar" class="btn btn-primary" onclick="eliProveedor();">Eliminar</button>
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
            <label class="text-f" id="lbl_proveedor_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Table -->

<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <div class="l-container">
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Ruc</label>
                        <input type="text" id="txt_proveedor_busrucc" name='txt_proveedor_busrucc' required="required" placeholder='Ingrese Ruc' maxlength="11" class='form-control' onkeypress="ValidNum(this.id);" />
                    </div>
                </div>
                <!-- <div class="cell large-4">
                     <div class="form-group">
                         <button id="btn_proveedor_busrucc" class="btn btn-sm-search" onclick=""><i class="icon icon-search4"></i></button>
                     </div>
                 </div>-->
            </div>
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Nombre</label>
                        <input id="txt_proveedor_nombb" class="form-control" placeholder='Ingrese Nombre' type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Dirección</label>
                        <input id="txt_proveedor_diree" class="form-control" placeholder='Ingrese Dirección' type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Dirección Fiscal</label>
                        <input id="txt_proveedor_dirfiss" class="form-control" placeholder='Ingrese Dirección Fiscal' type="text" />
                    </div>
                </div>

            </div>
            <div class="grid-x grid-padding-x">

                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Nombre Comercial</label>
                        <input id="txt_proveedor_nomcomm" required="required" placeholder='Ingrese Nombre Comercial' class="form-control" type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Rubro</label>
                        <input id="txt_proveedor_rubrr" class="form-control" placeholder='Ingrese Rubro' type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Referencia</label>
                        <input id="txt_proveedor_refee" class="form-control" placeholder='Ingrese Referencia' type="text" />
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Descripción</label>
                        <input id="txt_proveedor_descrr" class="form-control" placeholder='Ingrese Descripción' type="text" />
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divDpto" visible="true">
                            <label class="label text-primary">Departamento</label>
                            <select id="cmb_proveedor_dptoo" class="form-control" onchange="llenarProv()"></select>
                        </div>
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divProv" visible="true">
                            <label class="label text-primary">Provincia</label>
                            <select id="cmb_proveedor_provv" class="form-control" onchange="llenarDist()"></select>
                        </div>
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divDist" visible="true">
                            <label class="label text-primary">Distrito</label>
                            <select id="cmb_proveedor_distt" class="form-control" onchange=""></select>
                        </div>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <label class="label text-primary">Teléfono</label>
                        <input id="txt_proveedor_telee" class="form-control" placeholder='Ingrese Teléfono' type="text" />
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">E-mail</label>
                        <input id="txt_proveedor_emaill" class="form-control" placeholder='Ingrese E-mail' type="text" />
                    </div>
                </div>

                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Sitio Web</label>
                        <input id="txt_proveedor_webb" class="form-control" placeholder='Ingrese Web' type="text" />
                    </div>
                </div>

                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">C. Postal</label>
                        <input id="txt_proveedor_codpostt" class="form-control" placeholder='Ejm. +051' type="text" />
                    </div>
                </div>
                <div style="display: none;" class="cell large-3">
                    <div class="form-group">
                        <label class="label text-primary">Logo</label>
                        <input type="file" id="file_proveedor_logoo" />
                    </div>
                </div>
                <div class="cell large-3" style="display: none;">
                    <div class="form-group">
                        <input type="text" id="txt_proveedor_idemprr" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="cell large-12">
        <table class="table" id="tbl_proveedor">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <!--<th style="display: none;" class="p-3">Proveedor</th>-->
                <th>
                    <div class="input-group" id="divControlRuccPre">
                        <input type="text" id="txt_proveedor_busruc" name='txt_proveedor_busruc' placeholder='Ruc' maxlength="11" onkeypress="ValidNum(this.id);" class="form-con txtBus" />
                        <button type="button" id="btn_proveedor_busruc" class="btn btn-sm-search" onclick="buscar_proveedor();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th style="display: none;">
                    <div class="input-group" id="divControlProveedorPre">
                        <input type="text" id="txt_proveedor_busnomb" name='txt_proveedor_busnomb' placeholder='Nombre Comercial' class="form-con txtBus" />
                        <button type="button" id="btn_proveedor_busnom" class="btn btn-sm-search" onclick="buscar_proveedor();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Dirección</th>
                <th class="p-3">E-mail</th>
                <th class="p-3">Teléfono</th>
                <th class="p-3">Nombre Comercial</th>
                <th style="display: none;" class="p-3">Dirección Fiscal</th>
                <th style="display: none;" class="p-3">Código Postal</th>
                <th style="display: none;" class="p-3">Descripción</th>
                <th style="display: none;" class="p-3">Referencia</th>
                <th style="display: none;" class="p-3">Ubigeo</th>
                <th style="display: none;" class="p-3">Rubro</th>
                <th style="display: none;" class="p-3">Sitio Web</th>
                <th style="display: none;" class="p-3">Logo</th>
                <th style="display: none;" class="p-3">Fecha Pre</th>
                <th style="display: none;" class="p-3">User Reg</th>
                <th style="display: none;" class="p-3">Empleado Reg</th>
                <th style="display: none;" class="p-3">Empleado Pre</th>
                <th style="display: none;" class="p-3">Fecha Reg</th>
                <th class="text-center p-3">Ver</th>
            </tr>
            </thead>
            <tbody id="tbody_proveedor">
            <tr id="firstRowBody_proveedor">
                <td colspan="20" class="text-center font-weight-light">
                    <div id="campoempresa1">NO SE HA BUSCADO PROVEEDOR</div>
                </td>
            </tr>
            </tbody>
        </table>
        <div>
            <button id="BtnRegistrar" class="btn btn-success btn-sm" onclick="" style="display: none"></button>
        </div>
    </div>

    <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <button id="btn_proveedor_proyecto" class="btn btn-danger btn-lg mb-5" style="display: none;">Registrar Proyecto</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <button id="btn_proveedor_contacto" visible="false" class="btn btn-danger btn-lg mb-5" style="display: none;">Registrar Contacto</button>
        </div>
    </div>
</div>
<input type="hidden" id="hdn_proveedor_id" />
<input type="hidden" id="hdn_proveedor_nom" />
<input type="hidden" id="hdn_proveedor_prereg" />


<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptProveedor.js"></script>
<!-- End JavaScript -->
</body>
</html>