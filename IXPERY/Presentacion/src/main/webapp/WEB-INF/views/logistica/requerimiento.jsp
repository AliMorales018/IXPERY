<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Requerimiento</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
    <style>
        .select2-result-empresa{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .select2-result-proyecto{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .select2-span-result{
            font-size: 9.9px;
        }
        /*.container-combo{
            background-color: #ffffff;
            border-radius: 0.25rem;
            border: 1px solid rgba(0,0,0,0.2,0.15);
            padding: 10px 0px 5px 20px;
            margin-bottom: 20px;
        }*/
    </style>
</head>
<body>
<input type="hidden" id="hdn_requerimiento" />
<input type="hidden" id="hdn_requerimiento_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-list2"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Requerimientos de Proyecto</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_requerimiento_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_requerimiento_nue_reload"  onclick="CargarJS_requerimiento(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_requerimiento_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_requerimiento();">Guardar</button>
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
            <label class="text-f" id="lbl_requerimiento_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Combo ProyectoEmpresa -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-9">
        <div class="grid-x grid-margin-x">
            <div class="cell large-5 container-combo">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5;"><b>Seleccione Proyecto:</b></label>
                    <select id="selectEmpresa_Proyecto"></select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combo -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-9">
        <table class="table" id="tbl_requerimiento">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N°</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_requerimiento_busnom" name='txt_requerimiento_busnomapli' placeholder='Requerimiento' class="form-con txtBus" />
                        <button type="button" id="btn_requerimiento_busnom" class="btn btn-sm-search" onclick="buscar_requerimiento();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Nivel</th>
                <th class="p-3">Estado</th>
                <th id="thEditar_requerimiento"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_requerimiento" >
            <tr id="firstRowBody_requerimiento">
                <td><div id="campo1_tbl_requerimiento"><p id="p_num_requerimiento1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_requerimiento"><input type="text" id="txt_requerimiento_nombre1" name="txt_requerimiento_nombre1" class="form-control" /></div></td>
                <td><div id="campo3_tbl_requerimiento"><select id="cmb_requerimiento_nivel1" name="cmb_requerimiento_nivel1" class="custom-select">
                    <c:forEach items="${listEstados}" var="estado">
                        <option value="${estado.idestado}">${estado.nomestado}</option>
                    </c:forEach>
                </select></div></td>
                <td><div id="campo4_tbl_requerimiento"><select id="Dcmb_requerimiento_estado1" name="Dcmb_requerimiento_estado1" class="custom-select" disabled><option value="1" selected>Habilitado</option><option value="0">Deshabilitado</option></select></div></td>
                <td><div class="text-center" id="campo5_tbl_requerimiento"><button type="button" class="btn btn-sm-delete" id="btn_requerimiento_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptRequerimiento.js"></script>

<script>

    $(document).ready(function () {

        $("#selectEmpresa_Proyecto").select2({
            ajax: {
                url: "/requerimiento/busempresa",
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

        var markup = "<div class='select2-result-empresa'><span class='select2-span-result'>EMPRESA: </span>"+repo.nomempresa+" - " + repo.ruc +"</div>"+
                     "<div class='select2-result-proyecto'><span class='select2-span-result'>PROYECTO: </span>"+repo.nomproyecto+"</span></div>";
        return markup;
    }

    function formatRepoSelection (repo) {
        return  repo.text || repo.nomempresa + " - " + repo.nomproyecto;
    }

</script>
</body>
</html>
