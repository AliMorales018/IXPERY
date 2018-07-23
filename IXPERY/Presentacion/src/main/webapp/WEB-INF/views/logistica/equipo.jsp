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

        .icon-add-row{
            background-color: #D34539;
            border-radius: 50%;
            color:white;
            padding: 4px;
            font-size: 12px;
            cursor: pointer;
        }

        .equipo{
            border-bottom: 1px solid #D9D9D9;
            margin-bottom: 15px;
        }

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

        .selectequipo2-result-producto{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectequipo2-result-modelo{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectequipo2-result-marca{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectequipo2-span-result{
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
                <p class="main-title">Equipos</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo_save" class="btn btn-secondary" onclick="RegistrarEquipo_equipo();">Enviar a Cotizar</button>
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
            <label class="text-f" id="lbl_equipo_fecha">17/07/2018</label>
        </div>
    </div>
</div>
<!-- End Date -->
<!-- Combo ProyectoEmpresa -->
<div class="grid-container">
    <div class="cell large-9">
        <div class="grid-x grid-margin-x">
            <div class="cell large-4 container-combo">
                <div class="form-group">
                    <label class="label text-primary" style="line-height: 1.5;"><b>Seleccione Solución:</b></label>
                    <select id="selectEmpresaEquipo_Proyecto" onchange="BuscarSolucionEquipos($(this).val())"></select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combo -->

<!-- Equipos Regitrados-->
<div id="container_equipos" style="margin-top: 15px;">
    <div id="equipo_1" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONAR EQUIPOS Y MATERIALES</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_equipo">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_equipo_1" class="text-center" onclick="addEquipos_equipo(this);"><i class="icon-plus2 icon-add-row"></i></th>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th style="width: 20px;">Cantidad</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody id="tbody_equipo">
                    <tr id="equipo_1_fila_1">
                        <td><div id='campo1_tbl_equipo'><p                  id="p_num_equipo1"      class="text-center">1</p></div></td>
                        <td><div id='campo2_tbl_equipo'><select             id="cmb_equipo_nompro1" name="cmb_equipo_nompro1" class="select_equipo_equipos" style="width: 100%;"></select></div></td>
                        <td><div id='campo3_tbl_equipo'><span id="spn_equipo_codpro1" name="spn_equipo_codpro1"></span></div></td>
                        <td><div id='campo4_tbl_equipo'><span id="spn_equipo_modpro1" name="spn_equipo_modpro1"></span></div></td>
                        <td><div id='campo5_tbl_equipo'><span id="spn_equipo_marpro1" name="spn_equipo_marpro1"></span></div></td>
                        <td><div id='campo6_tbl_equipo'><span id="spn_equipo_medpro1" name="spn_equipo_medpro1"></span></div></td>
                        <td><div id='campo7_tbl_equipo'><input type="text" id="txt_equipo_canpro1" name="txt_equipo_canpro1" class="form-control" /></div></td>
                        <td><div id='campo8_tbl_equipo' class="text-center"><button id="equipo_1_btn_elim_1" type="button" class="btn btn-sm-delete" onclick="eliminar_fila_tabla_equipos(this);"><i class="icon icon-bin"></i></button></div></td>
                        <td hidden><div id='campo9_tbl_equipo'><input type="text" id="txt_equipo_idprodo1" name="txt_equipo_idprodo1" class="form-control" /></div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin Equipos -->

<!-- Equipos no Registrados-->
<div id="container_equiposnr" style="margin-top: 15px;">
    <div id="equiponr_1" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>REGISTRAR EQUIPOS Y MATERIALES NUEVOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_equiponr">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_equiponr_1" class="text-center" onclick="addEquipos_equiponr(this);"><i class="icon-plus2 icon-add-row"></i></th>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th>Cantidad</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody  id="tbody_equiponr">
                    <tr id="equiponr_1_fila_1">
                        <td><div id='campo1_tbl_equiponr'><p id="p_num_equiponr1"      class="text-center">1</p></div></td>
                        <td><div id='campo2_tbl_equiponr'><input type="text" id="txt_equiponr_nompro1" name="txt_equiponr_nompro1" class="form-control" /></div></td>
                        <td><div id='campo3_tbl_equiponr'><input type="text" id="txt_equiponr_codpro1" name="txt_equiponr_codpro1" class="form-control" /></div></td>
                        <td><div id='campo4_tbl_equiponr'><input type="text" id="txt_equiponr_modpro1" name="txt_equiponr_modpro1" class="form-control" /></div></td>
                        <td><div id='campo5_tbl_equiponr'><input type="text" id="txt_equiponr_marpro1" name="txt_equiponr_marpro1" class="form-control" /></div></td>
                        <td><div id='campo6_tbl_equiponr'><input type="text" id="txt_equiponr_medpro1" name="txt_equiponr_medpro1" class="form-control" /></div></td>
                        <td><div id='campo7_tbl_equiponr'><input type="text" id="txt_equiponr_canpro1" name="txt_equiponr_canpro1" class="form-control" /></div></td>
                        <td><div id='campo8_tbl_equiponr' class="text-center"><button id="equiponr_1_btn_elim_1" type="button" class="btn btn-sm-delete" onclick="eliminar_fila_tabla_equiposnr(this);"><i class="icon icon-bin"></i></button></div></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin Equipos -->

<!-- JavaScript -->
<%--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>--%>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo.js"></script>
<script>
    var contPrimervez=0;
    var fila=0;
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

        //LISTAR COMBO PRODUCTOS
        $("#cmb_equipo_nompro1").select2({
            ajax: {
                url: "/equipo/busproducto",
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
            placeholder: 'Buscar producto . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoProd,
            templateSelection: formatRepoSelectionProd
        });
        //COMBO PRODUCTOS
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
        /* BuscarSolucionEquipos(repo);*/
        return repo.text || repo.nomempresa + " - " + repo.solucion;
        //alert(JSON.stringify(repo));

    }
    function formatRepoProd (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectequipo2-result-producto'><span class='selectequipo2-span-result'>PRODUCTO: </span>"+repo.nombre+"</div>"+
            "<div class=         'selectequipo2-result-modelo'  ><span class='selectequipo2-span-result'>MODELO: </span>"+repo.modelo+"</span></div>"+
            "<div class=         'selectequipo2-result-marca'   ><span class='selectequipo2-span-result'>MARCA: </span>"+repo.marca+"</span></div>";
        return markup;
    }
    function formatRepoSelectionProd (repo) {
        //alert(JSON.stringify(repo));
        fila=repo._resultId;
        if(fila!=undefined) {
            var pos = fila.indexOf("-");
            fila=fila.substring(pos+1);
            pos = fila.indexOf("-");
            fila=fila.substring(0,pos);
            fila=fila.charAt(fila.length-1);

            //LLENAMOS LOS CAMPOS POR FILAS
            $("#spn_equipo_codpro"+fila).text(repo.codigo);
            $("#spn_equipo_modpro"+fila).text(repo.modelo);
            $("#spn_equipo_marpro"+fila).text(repo.marca);
            $("#spn_equipo_medpro"+fila).text(repo.umedida);
            $("#txt_equipo_idprodo"+fila).val(repo.id);
        }
        return repo.text || repo.nombre;

    }

    function BuscarSolucionEquipos(id){
        /*
                if(contPrimervez===0){
                    contPrimervez++;
                }else {*/

        if(id!="" || id!=undefined){
            $.ajax({
                method: "POST",
                url: "/equipo/buscarequiposol",
                data: {"idsol": id},
                success: function resultado(valor) {

                    var JSONobj = JSON.parse(valor);
                    if(JSONobj.items.length>0){
                        addEquiposUpdate_equipo(valor);
                    }else{
                        conta_filas_equipo=1;
                        $("#tbody_equipo").empty();
                        $("#equipo_1 tbody").append(
                            "<tr id='equipo_1_fila_1'>"+
                            "<td><div><p id='p_num_equipo1' class='text-center'>1</p></div></td>"+
                            "<td><div><select id='cmb_equipo_nompro1' name='cmb_equipo_nompro' class='select_equipo_equipos' style='width: 100%;'></select></div></td>"+
                            "<td><div><span id='spn_equipo_codpro1' name='spn_equipo_codpro'></span></div></td>"+
                            "<td><div><span id='spn_equipo_modpro1' name='spn_equipo_modpro'></span></div></td>"+
                            "<td><div><span id='spn_equipo_marpro1' name='spn_equipo_marpro'></span></div></td>"+
                            "<td><div><span id='spn_equipo_medpro1' name='spn_equipo_medpro'></span></div></td>"+
                            "<td><div><input type='text' id='txt_equipo_canpro1' name='txt_equipo_canpro' type='text' class='form-control' /></div></td>"+
                            "<td><div class='text-center'><button id='equipo_1_fila_btn_elim_1' type='button' class='btn btn-sm-delete' onclick='eliminar_fila_tabla_equipos(this);'><i class='icon icon-bin '></i></button></div></td>"+
                            "<td hidden><div><input type='text' id='txt_equipo_idprodo1' name='txt_equipo_idprodo' type='text' class='form-control' /></div></td>"+
                            "</tr>"
                        );
                        borrar_select2();
                        clonar_select2(1);
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });

        }
    }

    function ReordenarId_tbl_equipo() {
        var r = 1;
        var aux = 0;
        var child;
        var idText;
        var pasoPri = 1;
        var tbody_equipo = document.getElementById(nomBody_equipo);
        var totalColumnas_equipo=8;

        for (var i = 1; i <= conta_filas_equipo; i++) {
            if (pasoPri == 1) {
                for (var j = 1; j <= ((totalColumnas_equipo - 1) * 2) + 1; j += 2) {
                    child = tbody_equipo.childNodes[i].childNodes[j].childNodes[0].firstChild;
                    idText = arrayElem_equipo[aux][1];
                    idText = idText.substring(0, idText.length - 1);
                    child.id = idText + r;
                    child.name = idText + r;
                    aux++;
                }
                //if (childNodo_preempresa == 0) {
                if (i == 1) {
                    i = i + 1;
                }
                // }
                pasoPri = 2;
            }
            else {
                aux = 0;
                for (var j = 0; j <= totalColumnas_equipo - 2; j++) {
                    child = tbody_equipo.childNodes[i].childNodes[j].childNodes[0].firstChild;
                    idText = arrayElem_equipo[aux][1];
                    idText = idText.substring(0, idText.length - 1);
                    child.id = idText + r;
                    child.name = idText + r;
                    aux++;
                }
            }
            r++;
        }
    }


</script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<!-- End JavaScript -->
</body>
</html>