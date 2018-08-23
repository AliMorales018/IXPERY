<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viaticos</title>

    <style type="text/css">

        .icon-add-row{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }

        .otroservi{
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: 15px;
        }

        .select2-container .select2-selection--single {
            height: 25.15px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
        }

        .selectempresa2-result-otroservicioempresa{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectempresa2-result-otroservicioproyecto{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectempresa2-result-otroserviciosolucion{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectempresa2-span-otroservicioresult{
            font-size: 9.9px;
        }

        .selectotroservi2-result-otroservicioproducto{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectotroservi2-span-otroservicioresult{
            font-size: 9.9px;
        }
    </style>
</head>

<body>

<!-- Buttonss -->
<div class="grid-x grid-padding-x align-center-middle l-comandos controles-permanentes">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">S. Viáticos</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_otroservi_save" class="btn btn-secondary" onclick="VerEstaGuardaItem3();">Enviar a Cotizar</button>
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
    <div class="grid-x align-center align-top">
        <div class="cell large-2">
            <label class="text-f" id="lbl_solucion_fecha" >${fecha}</label>
        </div>
        <div class="cell large-8">
            <div class="grid-x align-center align-top">
                <div class="cell text-center" style="visibility:visible">
                    <div style="margin-bottom: 5px"><span class="spn-otroservi-emp text-primary" style="font-size:14px;font-weight:bold"></span></div>
                    <div style="margin-bottom: 5px"><span class="spn-otroservi-pro text-primary" style="font-size:14px;font-weight:bold"></span></div>
                    <div><span class="spn-otroservi-req text-primary" style="font-size:12px;font-weight:bold"></span></div>
                </div>
            </div>
        </div>
        <div class="cell large-2"></div>
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
                    <select id="selectEmpresaOtroServi_Proyecto"></select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combo -->

<!-- otroservis Regitrados-->
<div id="container_otroservi" style="margin-top: 15px;">
    <div id="otroservi_1" class="actividad grid-container">
        <label id="lbl_otroservi_idotroserv" style="visibility: hidden;"></label>
        <!-- Table -->
        <div class="grid-x grid-padding-x">

            <div class="cell large-12">
                <table class="table">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_otroservi_1" class="text-center" onclick="addOtroServ_otroservi();"><i class="icon-plus2 icon-add-row"></i></th>
                        <th>Servicio</th>
                        <%--<th>Código</th>--%>
                        <th>Descripción</th>
                        <%--<th>Marca</th>
                        <th>U. Medida</th>--%>
                        <th style="width: 20px;">Cantidad</th>
                        <th style="display: none">IdServSolic</th>
                        <th style="display: none">IdServSoluc</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody id="tbody_otroservi">
                    <%--<tr id="otroservi_1_fila_1" class="otroservi-insert">
                        <td><div><p class="text-center">1</p></div></td>
                        <td><div><select   id="cmb_otroservi_nombre1" name="cmb_otroservi_nombre1" class="select_otroservi_otroservis" onchange="selCmbServ(this)" style="width: 100%;"></select></div></td>
                        &lt;%&ndash;<td><div><span id="spn_otroservi_codpro"></span></div></td>&ndash;%&gt;
                        <td><div><input id="txt_otroservi_descri" type="text" class="form-control" required/></div></td>
                       &lt;%&ndash; <td><div><span id="spn_otroservi_marpro"></span></div></td>
                        <td><div><span id="spn_otroservi_umepro"></span></div></td>&ndash;%&gt;
                        <td><div><input id="txt_otroservi_cantid" type="text" class="form-control" required/></div></td>
                        <td hidden><div><span id="spn_otroservi_idservsoli"></span></div></td>
                        <td hidden><div><span id="spn_otroservi_idservsolu"></span></div></td>
                        <td><div class="text-center"><button type="button" onclick="eliminar_fila_tabla_otroservis(`otroservi_1_fila_1`);"><i class="icon-cross icon-hp-desh"></i></button></div></td>
                    </tr>--%>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin otroservis -->

<!-- otroservis no Registrados-->
<div id="container_otroservisnr" style="margin-top: 15px;">
    <div id="otroservinr_1" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>REGISTRAR SERVICIOS NUEVOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_otroservinr">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_otroservinr_1" class="text-center" onclick="addOtroServi_otroservinr(this);"><i class="icon-plus2 icon-add-row"></i></th>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <%--<th>Marca</th>
                        <th>U. Medida</th>--%>
                        <th>Cantidad</th>
                        <th style="display: none">IdPreRegServ</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody  id="tbody_otroservinr">
                    <tr id="otroservinr_1_fila_1">
                        <td><div><p class="text-center">1</p></div></td>
                        <td><div><input id="txt_otroservinr_nomserv" type="text" class="form-control" /></div></td>
                        <td><div><input id="txt_otroservinr_desserv" type="text" class="form-control" /></div></td>
                        <%--<td><div><input id="txt_otroservinr_marpro" type="text" class="form-control" /></div></td>
                        <td><div><input id="txt_otroservinr_umepro" type="text" class="form-control" /></div></td>--%>
                        <td><div><input id="txt_otroservinr_canpro" type="text" class="form-control" /></div></td>
                        <td hidden><div><span id="spn_otroservinr_idpreg"></span></div></td>
                        <td><div class="text-center"><button type="button" onclick="eliminar_fila_tabla_otroservisnr(`otroservinr_1_fila_1`);"><i class='icon-cross icon-hp-desh'></i></button></div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin otroservis -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptOtroServicio.js"></script>
<script>
    $(document).ready(function () {
        //LISTAR COMBO PRODUCTOS
        $("#cmb_otroservi_nombre1").select2({
            ajax: {
                url: "/otroservi/buservsolic",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term.toUpperCase()
                    };
                },
                processResults: function (data, params) {
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por servicio . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoServSolic,
            templateSelection: formatRepoSelectionServSolic
        });
        //COMBO PRODUCTOS
    });

    function formatRepoOtroServ (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectempresa2-result-otroservicioempresa'><span class='selectempresa2-span-otroservicioresult'>EMPRESA: </span>"+repo.nomempresa+" - " + repo.ruc +"</div>"+
            "<div class='selectempresa2-result-otroservicioproyecto'><span class='selectempresa2-span-otroservicioresult'>PROYECTO: </span>"+repo.nomproyecto+"</span></div>"+
            "<div class='selectempresa2-result-otroserviciosolucion'><span class='selectempresa2-span-otroservicioresult'>SOLUCION: </span>"+repo.solucion+"</span></div>";
        return markup;
    }

    function formatRepoSelectionOtroServ (repo) {
        return repo.text || repo.nomempresa + " - " + repo.solucion;
    }

    function formatRepoServSolic (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectotroservi2-result-otroservicioproducto'><span class='selectotroservi2-span-otroservicioresult'>SERVICIO: </span>"+repo.serviciosolicitado+"</div>";
        return markup;
    }

    function formatRepoSelectionServSolic (repo) {
        return repo.text || repo.serviciosolicitado;
    }


</script>
<!-- End JavaScript -->
</body>
</html>