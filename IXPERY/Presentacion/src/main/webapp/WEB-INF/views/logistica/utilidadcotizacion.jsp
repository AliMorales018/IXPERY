<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UtilidadCoti</title>
    <style type="text/css">

        .select2-container .select2-selection--single {
            height: 25.15px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
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
                <p class="main-title">Item1</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo_save" class="btn btn-secondary" onclick="RegistrarUtilidad_Coti();">Guardar</button>
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
                <label class="text-f" id="lbl_equipo_fecha">${fecha}</label>
            </div>
        </div>
    </div>
    <!-- End Date -->
    <!-- Combo ProyectoEmpresa -->
<label id="lbl_util_coti_id" style="visibility: hidden;"></label>
    <div class="grid-x grid-padding-x l-container">
        <div class="cell large-9">
            <div class="grid-x grid-margin-x">
                <div class="cell large-4 container-combo">
                    <div class="form-group">
                        <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONE SOLUCIÓN:</b></label>
                        <select id="selectEmpresa_Proyecto_Sol_Uti" onchange="BuscarSolucionUtilidad($(this).val())"></select>
                    </div>
                </div>
            </div>
        </div>
    </div>

<div class="grid-x grid-padding-x l-container">
    <div class="cell large-9">
        <div class="grid-x grid-margin-x">
            <div class="cell large-4 container-combo">
                <div class="form-group">
                        <label class="label text-primary" style="line-height: 1.5;"><b>DESCRIPCIÓN CONDICIÓN DE PAGO: </b></label>
                    <textarea id="txt_cond_pago_uti" style="width:290px; height:90px;"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="grid-x grid-padding-x l-container">
    <div class="cell large-9">
        <div class="grid-x grid-margin-x">
            <div class="cell large-4 container-combo">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5;"><b>AGREGAR PORCENTAJES: </b></label>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <div class="l-container">
            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group">
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                    </div>
                </div>

                <div class="cell large-2">
                        <label class="label text-primary">COSTO</label>
                </div>

                <div class="cell large-2">
                        <label class="label text-primary">PRECIO</label>
                </div>

                <div class="cell large-2">
                        <label class="label text-primary">UTILIDAD</label>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">&nbsp;</label>
                        <label class="label text-primary">%COMERCIAL</label>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                            <label class="label text-primary"></label>
                        <input id="txt_porc_comer" style="text-align: right" class="form-control" required="required" placeholder='Ej 1.00' type="number" onchange="verificaCajasPorcen();"/>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">&nbsp;</label>
                        <span id="spn_porc_comer_old">100.05</span>
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group" style="padding-top:10%;">
                        <label class="label text-primary">%ITEM1</label>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <%--<label class="label text-primary"></label>--%>
                            <input id="txt_porc_item1" style="text-align: right" class="form-control" type="number" placeholder='Ej 1.00' onchange="verificaCajasPorcen();"/>
                    </div>
                </div>

                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary">&nbsp;</label>
                            <span id="spn_porc_item1_old">100.05</span>
                    </div>
                </div>

                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_costo_item1" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_precio_item1" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_util_item1" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group" style="padding-top:10%;">
                        <label class="label text-primary">%ITEM2</label>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <input id="txt_porc_item2" style="text-align: right" class="form-control" type="number" placeholder='Ej 1.00' onchange="verificaCajasPorcen();"/>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary"></label>
                        <span id="spn_porc_item2_old">100.05</span>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_costo_item2" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_precio_item2" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_util_item2" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-1">
                    <div class="form-group" style="padding-top:10%;">
                        <label class="label text-primary">%ITEM3</label>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <input id="txt_porc_item3" style="text-align: right" required="required" class="form-control" placeholder='Ej 1.00' type="number" onchange="verificaCajasPorcen();"/>
                    </div>
                </div>
                <div class="cell large-1">
                    <div class="form-group">
                        <label class="label text-primary"></label>
                        <span id="spn_porc_item3_old">100.05</span>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_costo_item3" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_precio_item3" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
                <div class="cell large-2">
                    <div class="form-group">
                        <input id="txt_util_item3" style="text-align: right" class="form-control" required="required" placeholder='' type="text" disabled/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptUtilidadCoti.js"></script>
<script>
    $(document).ready(function () {
        $("#selectEmpresa_Proyecto_Sol_Uti").select2({
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
                    console.log(data.items);
                    return {
                        results: data.items
                    };
                },
                cache: true
            },
            placeholder: 'Buscar por empresa o solución . . .',
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
        return repo.text || repo.nomempresa + " - " + repo.solucion;
    }

    function BuscarSolucionUtilidad(id){
        if(id!="" || id!=undefined){
            $.ajax({
                method: "POST",
                url: "/utilidadcotizacion/buscarutilidadsol",
                data: {"idsol": id},
                success: function resultado(valor) {
                    JSONobjGeneralUtiCoti = JSON.parse(valor);
                    console.log(JSONobjGeneralUtiCoti);
                    if(JSONobjGeneralUtiCoti.items.length>0){
                        estOperaUtiCoti=1;
                        addEquiposUpdate_utiCoti(valor);
                    }else{
                       estOperaUtiCoti=0;
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
    }
</script>
<!-- End JavaScript -->
</body>
</html>