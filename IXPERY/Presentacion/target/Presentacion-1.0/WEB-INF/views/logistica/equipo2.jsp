<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipos</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <style type="text/css">
        .ocultar{
            display: none;}
        #capa1{
            z-index:0;
        }
        #capa2{

            z-index:1;
        }
        #txt_equire_nom_1{
        }
        #cmb_equire_nom_1{
            outline:0px;
            border: none;


        }
        .full{
        }

        .menos{
            padding: 0;
        }


    </style>
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
                <p class="main-title">Equipos</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-6 large-6">
        <div id="IrMenu" class="grid-x align-center-middle">


            <div id="IrMenu1" class="IrMenu cell small-3 medium-3 large-3 text-center">
                <a id="menu-sec__25" href="/historialprecio"  class="btn2 btn-light">Asociar Precio</a>
            </div>

            <div id="IrMenu2" class="IrMenu cell small-3 medium-3 large-3 text-center">
                <a id="menu-sec__26" href="/asociarproducto"  class="btn2 btn-light">Asociar Producto</a>
            </div>
            <div id="IrMenu3" class="IrMenu cell small-3 medium-3 large-3 text-center">
                <a id="menu-sec__28" href="/proveedor"  class="btn2 btn-light">Registar Proveedor</a>
            </div>
            <div id="IrMenu4" class="IrMenu cell small-3 medium-3 large-3 text-center">
                <a id="menu-sec__24" href="/producto"  class="btn2 btn-light">Registrar Productos</a>
            </div>

        </div>
    </div>
    <div class="cell small-12 medium-6 large-3">
    </div>


</div>
<!-- End Buttons  -->

<div>
    <div class="grid-x align-center-middle grid-padding-y">
        <div class="cell large-2 text-center">
            <label id="lbl_solucion_fecha" >Fecha: 07/07/2018</label>
        </div>
        <div class="cell large-8 text-center">
            <h4>EQM001 - Equipos y Materiales</h4>
        </div>
        <div class="cell large-2">
            <label id="lbl_solucion_fechacoti" >Ultima fecha de envio: 07/07/2018</label>
        </div>
    </div>

    <div>
        <!-- Table -->
        <div class="grid-x align-center-middle">
            <div class="cell large-10">
                <table class="table2 text-center formato-tabla" id="tbl_equipo">
                    <thead class="thead2">
                    <tr>
                        <th style="width: 5%">N</th>
                        <th >Nombre de Producto</th>
                        <th style="width: 10%">Codigo</th>
                        <th style="width: 10%">Modelo</th>
                        <th style="width: 10%">Marca</th>
                        <th style="width: 5%">UM</th>
                        <th style="width: 5%">Cantidad</th>
                        <th style="width: 5%" class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody id="tbody_equire" class="borde-tbody">
                    <tr id="re_row">
                        <td class="fondo"><div><button type="button" id="btn_equipo_add" onclick="AgregarFilaRe();" style="cursor: pointer;"><i class="icon icon-plus3"></i></button></div></td>
                        <td colspan="7" class="fondo" style="text-align: left">Seleccionar Equipos y Materiales</td>
                    </tr>
                    <tr id="re_row1">
                        <td><div id="equireg_numero_1" style="padding: 0 5px"><p id="par_equire_num_1" class="text-center">1</p></div></td>
                        <td><div id="equireg_nombre_1" ><div id="capa2"><input type="text" id="txt_equire_nom_1" name="txt_equipo_nom_1" class="form-control" /></div><div id="capa1"><select id="cmb_equire_nom_1" name="cmb_equire_nom_1" class="form-control ocultar"></select></div></div></td>
                        <td><div id="equireg_codigo_1" style="padding: 0 5px"><span id="spn_equire_cod_1" /></div></td>
                        <td><div id="equireg_modelo_1" style="padding: 0 5px"><span id="spn_equire_mod_1" /></div></td>
                        <td><div id="equireg_marcas_1" style="padding: 0 5px"><span id="spn_equire_mrc_1" /></div></td>
                        <td><div id="equireg_unimed_1" style="padding: 0 5px"><span id="spn_equire_ume_1" /></div></td>
                        <td><div id="equireg_cantid_1" style="padding: 0 5px"><input type="text" id="txt_equire_cnt_1" name="txt_equipo_cnt_1" class="form-control" /></div></td>
                        <td hidden><div id="equireg_prodid_1" ><input type="text" id="txt_equire_pid_1" name="txt_equire_pid_1" class="form-control" /></div></td>
                        <td><div id="equireg_delete_1" style="padding: 0 5px"><button type="button" class="btn btn-sm-delete" id="btn_equire_del_1"><i class="icon icon-bin"></i></button></div></td>
                    </tr>
                    </tbody>
                    <tbody id="tbody_equinr" class="borde-tbody">
                    <tr id="nr_row">
                        <td class="fondo"><div><button type="button" id="btn_equiponr_add" style="cursor: pointer;" onclick="AgregarFilaNr();"><i class="icon icon-plus3"></i></button></div></td>
                        <td colspan="7" class="fondo" style="text-align: left">Equipos y Materiales no Registrados</td>
                    </tr>
                    <tr id="nr_row1">
                        <td><div id="eqnoreg_numero_1" style="padding: 0 5px"><p id="par_equinr_num_1" class="text-center">1</p></div></td>
                        <td><div id="eqnoreg_nombre_1" style="padding: 0 5px"><input type="text" id="txt_equinr_nom_1" name="txt_equinr_nom_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_codigo_1" style="padding: 0 5px"><input type="text" id="txt_equinr_cod_1" name="txt_equinr_cod_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_modelo_1" style="padding: 0 5px"><input type="text" id="txt_equinr_mod_1" name="txt_equinr_mod_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_marcas_1" style="padding: 0 5px"><input type="text" id="txt_equinr_mrc_1" name="txt_equinr_mrc_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_unimed_1" style="padding: 0 5px"><input type="text" id="txt_equinr_ume_1" name="txt_equinr_ume_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_cantid_1" style="padding: 0 5px"><input type="text" id="txt_equinr_cnt_1" name="txt_equinr_cnt_1" class="form-control" /></div></td>
                        <td><div id="eqnoreg_delete_1" style="padding: 0 5px"><button type="button" class="btn btn-sm-delete" id="btn_equinr_del_1"><i class="icon icon-bin"></i></button></div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- JavaScript -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>



</script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo2.js"></script>

<!-- End JavaScript -->
</body>
</html>