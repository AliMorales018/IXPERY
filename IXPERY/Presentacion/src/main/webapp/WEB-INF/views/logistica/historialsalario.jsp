<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Historial Salario</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
    <style>
        .icon-hp-habil{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
        }

        .icon-hp-desh{
            background-color: #666666;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
        }
        input[type=date]{
            height: 25.15px;
        }
        .select2-result-cargolab{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .select2-result-area{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .select2-span-result{
            font-size: 9.9px;
        }
        #contenedor_nuevo_precio_cl_hs{
            visibility: hidden;
        }
        button:disabled{
            cursor: not-allowed;
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
                    <i class="icon icon-stats-dots"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Historial de salarios</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button disabled type="button" class="btn btn-light" id="btn_historialsal_nue" onclick="agregar_nuevo_SalarioCL();" >Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button disabled type="button" id="btn_historialsal_save" class="btn btn-secondary" onclick="guardar_nuevo_SalarioCL();">Guardar</button>
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
            <label class="text-f" id="lbl_historialsal_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Combos -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-6">
        <div class="grid-x grid-margin-x">
            <div class="cell large-6">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Cargo Laboral:</b></label>
                    <select id="selectCargoLaboral_histsal" onchange="ListarHistorial_SalariosCL(this.value);">
                        <option></option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combos -->

<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-6">
        <table class="table" id="tbl_historialsalariocl">
            <thead class="thead-primary">
            <tr>
                <th class="text-center"><p style="font-size: 12px" class="text-center">N°</p></th>
                <th style="font-size: 12px" class="text-center">Fecha Inicio</th>
                <th style="font-size: 12px" class="text-center">Fecha Fin</th>
                <th style="font-size: 12px" class="text-center">Salario</th>
                <th style="font-size: 12px" class="text-center">Estado</th>
            </tr>
            </thead>
            <tbody id="tbody_historialsalariocl" style="background-color: #ffffffb5;">
                <tr><td colspan='5' class='text-center'><div style="padding: 4px; font-size: 10px">Seleccione cargo laboral.</div></td></tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<!-- Nuevo Precio -->
<div id="contenedor_nuevo_precio_cl_hs" class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-6">
        <div class="grid-x grid-padding-x" style="margin-bottom:10px">
            <div class="cell large-12">
                <label class="text-primary" style="font-size: 18px"><b>Nuevo Salario  <i onclick="ocultar_precio_nuevo_hscl();" class="icon-hp-habil icon-minus2"></i></b></label>
            </div>
        </div>
        <div class="grid-x grid-margin-x">
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Fecha de Inicio:</b></label>
                    <input type="date" class="form-control" id="new_date_hs_cl" placeholder="Fecha de Inicio">
                </div>
            </div>
            <div class="cell large-3">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5"><b>Salario:</b></label>
                    <input type="number" class="form-control" id="new_precio_hs_cl" placeholder="Salario">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Nuevo Precio -->

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="${urlPublic}/js/select2.js"></script>
<script src="${urlPublic}/js/RRHH/ScriptHistorialSalario.js"></script>

<script>
    $(document).ready(function() {

        //Verificar sesion
        let idCargo;
        $.ajax({
            method: "POST",
            url:"/cargolaboral/getsesioncl",
            data:{},
            success: function resultado(data) {
                idCargo = data;
                console.log(idCargo);
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });

        $("#selectCargoLaboral_histsal").select2({
            ajax: {
                url: "/servicios/listarcargolaboral",
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
            placeholder: 'Buscar cargo laboral / area . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 2,
            templateResult: formatRepo_historialcls,
            templateSelection: formatRepoSelection_historialcls
        })
    });
    function formatRepo_historialcls (repo) {
        if (repo.loading) {
            return repo.text;
        }

        return  "<div class='select2-result-cargolab'><span class='select2-span-result'>CARGO: </span>"+repo.cargo+"</div>"+
            "<div class='select2-result-area'><span class='select2-span-result'>AREA: </span>"+repo.area+"</span></div>";
    }

    function formatRepoSelection_historialcls (repo) {
        return  repo.text || repo.cargo + " - " + repo.area;
    }
</script>
</body>
</html>
