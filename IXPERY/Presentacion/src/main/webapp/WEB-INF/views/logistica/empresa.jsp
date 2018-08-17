<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RegistroEmpresa</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/hovertable.css">
    <style>
        /*#tbody_empresa tr:hover {
            background-color: #E6E6E6;
        }*/

    </style>
</head>

<body>
<input type="hidden" id="hdn_empresa"/>
<input type="hidden" id="hdn_empresa_isvalid"/>
<input type="hidden" id="hdn_empresa_ubi"/>
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
                <p class="main-title">Registro de Empresa</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_empresa_nue">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_empresa_nue_reload" onclick="CargarJS_empresa(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <div style="display: none;"><button type="button" id="btn_empresa_save" class="btn btn-secondary" onclick="guardaEmpresa(); ">Guardar</button></div>
                <button type="button" id="btn_empresa_savee" class="btn btn-secondary" onclick="guardaEmpresa();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button id="BtnEliminar" class="btn btn-primary" onclick="eliEmpresa();">Eliminar</button>
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
            <label class="text-f" id="lbl_empresa_fecha" >${fecha}</label>
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
                        <input type="text" id="txt_empresa_busrucc" name='txt_empresa_busrucc' required="required" placeholder='Ingrese Ruc' maxlength="11" class='form-control' onkeypress="ValidNum(this.id);"/>
                    </div>
                </div>
                <!--<div class="cell large-4">
                    <div class="form-group">
                        <button id="btn_empresa_busrucc" class="btn btn-sm-search" onclick=""><i class="icon icon-search4"></i></button>
                    </div>
                </div>-->
            </div>
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Nombre</label>
                        <input id="txt_empresa_nombb" placeholder='Ingrese Nombre' class="form-control" type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Dirección</label>
                        <input id="txt_empresa_diree" placeholder='Ingrese Dirección' class="form-control" type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Dirección Fiscal</label>
                        <input id="txt_empresa_dirfiss" placeholder='Ingrese Dirección Fiscal' class="form-control" type="text" />
                    </div>
                </div>

            </div>
            <div class="grid-x grid-padding-x">

                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Nombre Comercial</label>
                        <input id="txt_empresa_nomcomm" placeholder='Ingrese Nombre Comercial' class="form-control" type="text" required="required" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Rubro</label>
                        <input id="txt_empresa_rubrr" placeholder='Ingrese Rubro' class="form-control" type="text" />
                    </div>
                </div>
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Referencia</label>
                        <input id="txt_empresa_refee" placeholder='Ingrese Referencia' class="form-control" type="text" />
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Descripción</label>
                        <input id="txt_empresa_descrr" placeholder='Ingrese Descripción' class="form-control" type="text" />
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divDpto" visible="true">
                            <label class="label text-primary">Departamento</label>
                            <select id="cmb_empresa_dptoo" class="form-control" onchange="llenarProv()"></select>
                        </div>
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divProv" visible="true">
                            <label class="label text-primary">Provincia</label>
                            <select id="cmb_empresa_provv" class="form-control" onchange="llenarDist()"></select>
                        </div>
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <div id="divDist" visible="true">
                            <label class="label text-primary">Distrito</label>
                            <select id="cmb_empresa_distt" class="form-control" onchange=""></select>
                        </div>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <label class="label text-primary">Teléfono</label>
                        <input id="txt_empresa_telee" placeholder='Ingrese Teléfono' class="form-control" type="text" />
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">E-mail</label><div id="div_empresa_emailok" style="display: inline"></div>
                        <input id="txt_empresa_emaill" placeholder='Ingrese E-mail' class="form-control" type="text" onkeypress="validaEmail(this.id,'div_empresa_emailok',event);" />
                    </div>
                </div>

                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary">Sitio Web</label>
                        <input id="txt_empresa_webb" placeholder='Ingrese Web' class="form-control" type="text" />
                    </div>
                </div>

                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">C. Postal</label>
                        <input id="txt_empresa_codpostt" placeholder='Ejm. +051' class="form-control" type="text" />
                    </div>
                </div>
                <div style="display: none;" class="cell large-3">
                    <div class="form-group">
                        <label class="label text-primary">Logo</label>
                        <input type="file" id="file_empresa_logoo" />
                    </div>
                </div>
                <div class="cell large-3" style="display: none;">
                    <div class="form-group">
                        <input type="text" id="txt_empresa_idemprr" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="cell large-12">
        <div class="l-container-sm">
            <div class="grid-x grid-padding-x">
                <div class="cell large-2">
                    <label class="label text-primary">Búsqueda Por: </label>
                    <select id="cmb_empresa_tipo" name="cmb_empresa_tipo" class="custom-select"><option value="2" selected>Pre-Registros</option><option value="1">Clientes</option></select>
                </div>
            </div>
        </div>
        <table class="table" id="tbl_empresa">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" id="divControlRuccPre">
                        <input type="text" id="txt_empresa_busruc" name='txt_empresa_busruc' placeholder='Ruc' class="form-con txtBus" maxlength="11" onkeypress="ValidNum(this.id);"/>
                        <button type="button" id="btn_empresa_busruc" class="btn btn-sm-search" onclick="buscar_empresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th style="display: none;">
                    <div class="input-group" id="divControlEmpresaPre">
                        <input type="text" id="txt_empresa_busnomb" name='txt_empresa_busnomb' placeholder='Nombre Comercial' class="form-con txtBus" />
                        <button type="button" id="btn_empresa_busnom" class="btn btn-sm-search" onclick="buscar_empresa();"><i class="icon icon-search4"></i></button>
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
                <!--<th style="display: none;" class="p-3">Cliente</th>-->
                <th style="display: none;" class="p-3">Fecha Pre</th>
                <th style="display: none;" class="p-3">User Reg</th>
                <th style="display: none;" class="p-3">Empleado Reg</th>
                <th style="display: none;" class="p-3">Empleado Pre</th>
                <th style="display: none;" class="p-3">Fecha Reg</th>
                <th class="text-center p-3">Ver</th>
            </tr>
            </thead>
            <tbody id="tbody_empresa">
            <tr id="firstRowBody_empresa">
                <td colspan="20" class="text-center font-weight-light">
                    <div id="campoempresa1">NO SE HA BUSCADO EMPRESA</div>
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
            <button id="btn_empresa_proyecto" class="btn btn-danger btn-lg mb-5" style="display: none;">Registrar Proyecto</button>
        </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <button id="btn_empresa_contacto" visible="false" class="btn btn-danger btn-lg mb-5" style="display: none;">Registrar Contacto</button>
        </div>
    </div>
</div>
<input type="hidden" id="hdn_empresa_id" />
<input type="hidden" id="hdn_empresa_nom" />
<input type="hidden" id="hdn_empresa_prereg" />


<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEmpresa.js"></script>
<script language="JavaScript" src="${urlPublic}/js/validaciones.js"></script>
<!-- End JavaScript -->
</body>
</html>