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
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
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

        .selectempresa2-result-empresa{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectempresa2-result-proyecto{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectempresa2-result-solucion{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectempresa2-span-result{
            font-size: 9.9px;
        }
    </style>
</head>

<body>
<!-- Combo ProyectoEmpresa -->
<div class="grid-x grid-padding-x align-center-middle l-container">
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
        <div class="grid-x align-center-middle">

            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_solucion_send" class="btn btn-light" onclick="EquipoCotizar();">Enviar a Cotizar</button>
            </div>

        </div>
    </div>
    <div class="cell small-12 medium-3 large-3">
        <!--Notify-->
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
                        <td><div id="equireg_numero_1" style="padding: 0 5px"><p id="par_equire_num_1" class="text-center"></p></div></td>
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
                        <td><div id="eqnoreg_numero_1" style="padding: 0 5px"><p id="par_equinr_num_1" class="text-center"></p></div></td>
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
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo.js"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script>
    $(document).ready(function () {
        $("#selectEmpresaEquipo_Proyecto").select2({
            ajax: {
                url: "/equipo/busempresa",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por empresa o proyecto . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepo,
            templateSelection: formatRepoSelection
        });
    });
    function formatRepo (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectempresa2-result-empresa'><span class='selectempresa2-span-result'>EMPRESA: </span>"+repo.nomempresa+" - " + repo.ruc +"</div>"+
            "<div class='selectempresa2-result-proyecto'><span class='selectempresa2-span-result'>PROYECTO: </span>"+repo.nomproyecto+"</span></div>"+
            "<div class='selectempresa2-result-solucion'><span class='selectempresa2-span-result'>SOLUCION: </span>"+repo.solucion+"</span></div>";
        return markup;
    }
    function formatRepoSelection (repo) {
        //alert(JSON.stringify(repo));
        return  repo.text || repo.nomempresa + " - " + repo.solucion;
        BuscarSolucionEquipos();
    }

    function BuscarSolucionEquipos(){
        $.ajax({
            method: "POST",
            url: "/equipo/buscarequiposol",
            data: {"combo":combo,"umed":umed},
            success: function resultado(valor) {
                if(valor=="anidados"){
                    llenarCate_anidado(combo,fami);
                }else{
                    $("#" + combo).html(valor);
                }

            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
</script>
<!-- End JavaScript -->
</body>
</html>