<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>S. Servicios</title>
    <style>
        .select_actividad_cargolab:focus{
            -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
            box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.1);
        }
        .icon-add-row-service{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }

        .icon-minus-row-service{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }

        .add-actividad{
            background:#D34539;
            font-size:25px;
            color:#fff;
            cursor:pointer;
            position: fixed;
            bottom:20px;
            right:20px;
            cursor:pointer;
            padding: 10px 20px 20px 20px;
            border-radius: 50%;
            z-index: 1;
        }

        .actividad{
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: 15px;
        }

        .select2-container .select2-selection--single {
            height: 25.15px;
        }

        .select2-container--default .select2-selection--single .select2-selection__rendered {
            line-height: 23px;
        }

        .delete_actividad{
            margin-left: 15px;
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
        .form-service{
            line-height: 1.44;
        }
        .table-personal-transito{
            font-size: 11.5px;
            margin-bottom: 20px;
            width: 100%;
            background-color: #ffffffb5;
        }
        .table-personal-transito thead{
            background-color: #E6E6E6;
            color: #666666;
        }
        .table-personal-transito thead tr td{
            height: 14px;
            padding: 8px 8px 8px 8px;
        }
        .select2-result-empresa{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .select2-result-proyecto{
            font-size: 9.55px;
            padding: 0px 15px 10px;
        }
        .select2-result-solucion{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
    </style>
</head>
<body>
<button class="add-actividad" title="Agregar actividad" onclick="addActividad();" disabled><span for="Agregar actividad"><i class="icon-plus2"></i></span></button>
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
                <p class="main-title">S. Servicios</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" disabled id="btn_servicio_save" class="btn btn-secondary" onclick="guardar_actividades_servicio();">Guardar y enviar a cotizar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notify Icon -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_servicio_fecha">${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- Input-->
<div class="grid-container">
    <div class="grid-x grid-padding-x">
        <div class="cell large-6">
            <div class="form-group">
                <label class="label text-primary"><b>Solución:</b></label>
                <select disabled id="select_solucion_servicio_cl" style="width: 100%;"></select>
                <!--span class="form-control" id="lbl_nomsolucion_servicio onchange="BuscarSolucionServiciosCL($(this).val())">-</span-->
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary"><b>Depreciación de herramientas (%):</b></label>
                <input type="number" disabled class="form-control form-service" id="txt_porcen_depre" placeholder="Porcentaje de Depreciación">
                <input type="hidden" disabled class="form-control form-service" id="txt_idservicio">
            </div>
        </div>
    </div>
</div>
<!-- End Input -->

<!-- Personal en Transito -->
<div id="container_personal_transito" style="margin-top: 15px;">
    <div class="grid-container">
        <!-- Titulo -->
        <div class="grid-x grid-padding-x" style="margin-bottom:10px">
            <div class="cell large-12">
                <label class="text-primary" style="font-size: 12px"><b>Personal en tránsito: </b></label>
            </div>
        </div>
        <!-- Titulo -->

        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <table class="table table-personal-transito">
                    <thead>
                        <tr>
                            <td>N°</td>
                            <td class="text-center" style="width: 370px">Cargo Laboral</td>
                            <td class="text-center">Cantidad</td>
                            <td class="text-center">Días pago</td>
                        </tr>
                    </thead>
                    <tbody id="tbody_personal_transito">
                        <tr><td colspan='5' class='text-center'><div style="padding: 4px; font-size: 10px">Seleccione cargo laboral.</div></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->

    </div>
</div>
<!-- Personal en Transito -->

<!-- Actividades -->
<div id="container_actividades" style="margin-top: 15px;">
    <div id="actividad_1" class="actividad grid-container">
        <!-- Titulo -->
        <div class="grid-x grid-padding-x" style="margin-bottom:10px">
            <div class="cell large-12">
                <label class="text-primary title_actividad" style="font-size: 20px"><b>Actividad 1</b><i id="delete_actividad_1" onclick="eliminar_contenedor_actividad(this);" class="icon-minus-row-service icon-minus2 delete_actividad"></i></label>
            </div>
        </div>
        <!-- Titulo -->

        <!-- Cabecera de tabla -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-3"><div class="form-group"><label class="label text-primary"><b>Nombre de actividad:</b></label><input disabled type="text" class="data-control form-control" type="text"></div></div>
            <div class="cell large-3"><div class="form-group"><label class="label text-primary"><b>Descripción:</b></label><input disabled type="text" class="data-control form-control" type="text"></div></div>
            <div class="cell large-2"><div class="form-group"><label class="label text-primary"><b>Cantidad:</b></label><input disabled type="number" class="data-control form-control" type="number" placeholder="Cantidad"></div></div>
            <div class="cell large-2"><div class="form-group"><label class="label text-primary"><b>Riesgo:</b></label><input disabled type="text" class="data-control form-control" type="number" placeholder="Riesgo"></div></div>
            <div class="cell large-2"><div class="form-group"><label class="label text-primary"><b>Adicionales:</b></label><input disabled type="text" class="data-control form-control" type="number" placeholder="Adicionales"></div></div>
        </div>
        <!-- Cabecera de tabla -->

        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-12">
                <table class="table">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_actividad_1" class="text-center"><button disabled><i class="icon-plus2 icon-add-row-service" onclick="addCargoLaboral(this);"></i></button></th>
                        <th style="width:450px">Cargo Laboral</th>
                        <th>Cantidad</th>
                        <th>Días laborables</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr id="actividad_1_fila_1">
                        <td><div><p class="text-center">1</p></div></td>
                        <td><div class="data-cargolab"><select disabled id="selectcl_1" class="select_actividad_cargolab" style="width: 100%;" onchange="generar_personal_transito(this);"></select></div></td>
                        <td><div class="data-cargolab"><input type="number" disabled class="form-control" placeholder="Cantidad"/></div></td>
                        <td><div class="data-cargolab"><input type="number" disabled class="form-control" placeholder="Días laborables" /></div></td>
                        <td><div class="text-center"><button id="actividad_1_btn_elim_1" type="button" class="btn btn-sm-delete" onclick="eliminar_fila_tabla_cargolab(this);"><i class="icon icon-bin"></i></button></div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Actividades -->

<div style="margin-top: 200px"></div>

<script src="${urlPublic}/js/Logistica/ScriptServicios.js"></script>

<script>
    $(document).ready(function(){
        $("#select_solucion_servicio_cl").select2();
        BuscarSolucionServiciosCL();
        $('footer').show();
    });

    function formatRepo_servicio (repo) {
        if (repo.loading) {
            return repo.text;
        }

        return  "<div class='select2-result-cargolab'><span class='select2-span-result'>CARGO: </span>"+repo.cargo+"</div>"+
                "<div class='select2-result-area'><span class='select2-span-result'>AREA: </span>"+repo.area+"</span></div>";
    }

    function formatRepoSelection_servicio (repo) {
        return  repo.text || repo.cargo + " - " + repo.area;
    }


</script>

</body>
</html>


