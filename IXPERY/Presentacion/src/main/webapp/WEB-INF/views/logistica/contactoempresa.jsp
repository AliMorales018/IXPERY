<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacto de Empresa</title>
</head>

<body>
<input type="hidden" id="hdn_contactoempresa"/>
<input type="hidden" id="hdn_contactoempresa_isvalid"/>

<!-- Buttons  -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-phone"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Registro de contáctos</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_contactoempresa_nue">Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_contactoempresa_nue_reload" onclick="CargarJS_contactoempresa(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_contactoempresa_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_contactoempresa();">Guardar</button>
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
            <label class="text-f" id="lbl_contactoempresa_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Formulario -->
<div class="l-container">
    <div class="grid-x grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary"><b>Seleccione Empresa:</b></label>
                <select class="js-example-basic-single custom-select" id="selectEmpresa_contacto">
                    <option></option>
                </select>
            </div>
        </div>
        <!--div class="cell large-3">
            <div class="form-group">
                <label class="label">Apellido Paterno: </label>
                <input class="form-control" type="text" placeholder="Apellido Paterno">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label">Apellido Materno: </label>
                <input class="form-control" type="text" placeholder="Apellido Materno">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label">Direccion: </label>
                <input class="form-control" type="text" placeholder="Direccion">
            </div>
        </div>
    </div>

    <div class="grid-x grid-padding-x mt-1">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label">Nombre: </label>
                <input class="form-control" type="text" placeholder="Nombre">
            </div>
        </div>
        <div class="cell large-3">
            <div class="grid-x grid-padding-x">
                <div class="cell large-6">
                    <div class="form-group">
                        <label class="label">Dni: </label>
                        <input class="form-control" type="text" placeholder="Dni">
                    </div>
                </div>
                <div class="cell large-6">
                    <div class="form-group">
                        <label class="label">Ciudad: </label>
                        <input class="form-control" type="text" placeholder="Ciudad">
                    </div>
                </div>
            </div>
        </div>
        <div class="cell large-3">
            <div class="grid-x grid-padding-x">
                <div class="cell large-6">
                    <div class="form-group">
                        <label class="label">Telefono(s): </label>
                        <input class="form-control" type="text" placeholder="Telefono">
                    </div>
                </div>
                <div class="cell large-6">
                    <div class="form-group">
                        <label class="label">Cargo: </label>
                        <input class="form-control" type="text" placeholder="Cargo">
                    </div>
                </div>
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label">Correo(s) Electrónico(s): </label>
                <input class="form-control" type="text" placeholder="Correo Electronico">
            </div>
        </div--->
    </div>
</div>
<!-- Fin Formulario -->

<!-- Table -->
<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <table class="table" id="tbl_contactoempresa">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_contactoempresa_busnom" name='txt_contactoempresa_busnom' placeholder='Nombre' class="form-con txtBus" />
                        <button type="button" id="btn_contactoempresa_busnom" class="btn btn-sm-search" onclick="buscar_contactoempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Ape. Paterno</th>
                <!--th>
                    <div class="input-group" >
                        <input type="text" id="txt_contactoempresa_busapep" name='txt_contactoempresa_busapep' placeholder='A. Paterno' class="form-con txtBus" />
                        <button type="button" id="btn_contactoempresa_busapep" class="btn btn-sm-search" onclick="buscar_contactoempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th-->
                <th class="p-3">Ape. Materno</th>
                <!--th>
                    <div class="input-group" >
                        <input type="text" id="txt_contactoempresa_busapem" name='txt_contactoempresa_busapem' placeholder='A. Materno' class="form-con txtBus" />
                        <button type="button" id="btn_contactoempresa_busapem" class="btn btn-sm-search"onclick="buscar_contactoempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th-->
                <th class="p-3">Dni</th>
                <!--th>
                    <div class="input-group" >
                        <input type="text" id="txt_contactoempresa_busdni" name='txt_contactoempresa_busdni' placeholder='Dni' class="form-con txtBus" />
                        <button type="button" id="btn_contactoempresa_busdni" class="btn btn-sm-search" onclick="buscar_contactoempresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th-->
                <th class="p-3">Ciudad</th>
                <th class="p-3">Teléfono</th>
                <th class="p-3">Cargo</th>
                <th class="p-3">Direccion</th>
                <th class="p-3">Correo</th>
                <th id="thEditar_contactoempresa"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_contactoempresa" >
            <tr id="firstRowBody_contactoempresa">
                <td><div id="campo1_tbl_contactoempresa"><p id="p_num_contactoempresa1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_nombre1" name="txt_contactoempresa_nombre1" class="form-control" /></div></td>
                <td><div id="campo3_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_apep1" name="txt_contactoempresa_apep1" class="form-control" /></div></td>
                <td><div id="campo4_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_apem1" name="txt_contactoempresa_apem1" class="form-control" /></div></td>
                <td><div id="campo5_tbl_contactoempresa"><input type="number" id="txt_contactoempresa_dni1" name="txt_contactoempresa_dni1" class="form-control" /></div></td>
                <td><div id="campo6_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_ciudad1" name="txt_contactoempresa_ciudad1" class="form-control" /></div></td>
                <td><div id="campo7_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_telefono1" name="txt_contactoempresa_telefono1" class="form-control" /></div></td>
                <td><div id="campo8_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_cargo1" name="txt_contactoempresa_cargo1" class="form-control" /></div></td>
                <td><div id="campo9_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_direccion1" name="txt_contactoempresa_direccion1" class="form-control" /></div></td>
                <td><div id="campo10_tbl_contactoempresa"><input type="text" id="txt_contactoempresa_email1" name="txt_contactoempresa_email1" class="form-control" /></div></td>
                <td><div id="campo11_tbl_contactoempresa"><button type="button" class="btn btn-sm-delete" id="btn_contactoempresa_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptContactoEmpresa.js"></script>
<!-- End JavaScript -->

<script>
    $(document).ready(function() {
        setOptions("txt_select_busempresa","onkeyup='select_buscar_empresa_contacto(event,this);'");
        $('#selectEmpresa_contacto').select2({placeholder : "Buscar Empresa . . ."});
    });

    function select_buscar_empresa_contacto(event,obj){
        obj.value = obj.value.toUpperCase();
        if(event.keyCode == 13) {
            if (obj.value != "") {
                searchEmpresa_Contacto(obj.value);
            }
        }
    }

</script>
</body>
</html>
