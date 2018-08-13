<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="input" uri="http://www.springframework.org/tags/form" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Operaciones</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
    <link rel="stylesheet" href="${urlPublic}/css/checkmulti.css">
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
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-briefcase"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Operaciones</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_operaciones_save" class="btn btn-secondary" onclick="Registrar_Operaciones();">Guardar</button>
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
            <label class="text-f" id="lbl_operaciones_fecha">17/07/2018</label>
        </div>
    </div>
</div>
<!-- End Date -->
<!-- Combo ProyectoEmpresa -->
<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <div class="l-container">
            <div class="grid-x grid-padding-x">
                <div class="cell large-4">
                    <div class="form-group">
                        <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONE SOLUCIÓN:</b></label>
                        <select id="selectEmpresa_Proyecto_Sol_Opera" onchange="BuscarSolucionOperaciones($(this).val())"></select>
                    </div>
                </div>
            <%--</div>--%>
            <%--<div class="grid-x grid-padding-x">--%>
                <div class="cell large-1">
                    <div class="form-group" style="margin-top:5px">
                        <label class="label text-primary"><b>VALIDEZ</b></label>
                        <input id="txt_validezofer_opera" style="text-align: right" class="form-control" required="required" placeholder='Ej 1' type="number"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- End Combo -->


<div class="grid-x grid-padding-x l-container">
    <div class="cell large-12">
        <div class="l-container">
            <div class="grid-x grid-padding-x">
                <div class="cell large-5">
                    <div class="form-group">
                        <label class="label text-primary"><b>TIEMPO ENTREGA</b></label>
                        <textarea id="txt_timeentre_opera" style="width:470px; height:90px;" class="form-control" placeholder=''></textarea>
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-5">
                    <div class="form-group">
                        <label class="label text-primary"><b>TIEMPO EJECUCIÓN</b></label>
                        <textarea id="txt_timeejecu_opera" style="width:470px; height:90px;" class="form-control" placeholder=''></textarea>
                    </div>
                </div>
            </div>

            <div class="grid-x grid-padding-x">
                <div class="cell large-5">
                    <div class="form-group">
                        <label class="label text-primary"><b>CONDICIONES COMERCIALES</b></label>
                        <textarea id="txt_condcomer_opera" style="width:470px; height:90px;" class="form-control" placeholder=''></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="editor"></div>
<!-- Fin operacioness -->

<!-- JavaScript -->
<script src="${urlPublic}/js/jquery-3.3.1.js"></script>

<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptOperaciones.js"></script>
<script type="'text/javascript'">

</script>
<script>

    $(document).ready(function () {
        $("#selectEmpresa_Proyecto_Sol_Opera").select2({
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

    function BuscarSolucionOperaciones(id){
        if(id!="" || id!=undefined){
            $.ajax({
                method: "POST",
                url: "/operaciones/buscaroperacionsol",
                data: {"idsol": id},
                success: function resultado(valor) {
                    JSONobjGeneralOpera = JSON.parse(valor);
                    console.log(JSONobjGeneralOpera);
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
    }
</script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<!-- End JavaScript -->
</body>
</html>