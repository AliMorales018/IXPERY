<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OtrosServicios</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
    <link rel="stylesheet" href="${urlPublic}/css/checkmulti.css">
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

        .selectotroservi2-result-producto{
            font-size: 9.55px;
            padding: 5px 15px 10px;
        }
        .selectotroservi2-result-modelo{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectotroservi2-result-marca{
            font-size: 9.55px;
            padding: 0px 15px 5px;
        }
        .selectotroservi2-span-result{
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
                <p class="main-title">Item3</p>
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
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_otroservi_fecha">17/07/2018</label>
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
                    <select id="selectEmpresaOtroServi_Proyecto" onchange="BuscarSolucionOtroServis($(this).val())"></select>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Combo -->

<!-- otroservis Regitrados-->
<div id="container_otroservi" style="margin-top: 15px;">
    <div id="otroservi_1" class="actividad grid-container">
        <label id="lbl_otroservi_ideq"></label>
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONAR SERVICIOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table">
                    <thead class="thead-primary">
                    <tr>
                        <th id="add_row_otroservi_1" class="text-center" onclick="addOtroServ_otroservi(this);"><i class="icon-plus2 icon-add-row"></i></th>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th style="width: 20px;">Cantidad</th>
                        <th style="display: none">IdProducto</th>
                        <th style="display: none">IdProdSolucion</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody id="tbody_otroservi">
                    <tr id="otroservi_1_fila_1" class="otroservi-insert">
                        <td><div><p class="text-center">1</p></div></td>
                        <td><div><select   id="cmb_otroservi_nompro1" name="cmb_otroservi_nompro1" class="select_otroservi_otroservis" onchange="selCmbProd(this)" style="width: 100%;"></select></div></td>
                        <td><div><span id="spn_otroservi_codpro"></span></div></td>
                        <td><div><span id="spn_otroservi_modpro"></span></div></td>
                        <td><div><span id="spn_otroservi_marpro"></span></div></td>
                        <td><div><span id="spn_otroservi_umepro"></span></div></td>
                        <td><div><input id="txt_otroservi_canpro" type="text" class="form-control" required/></div></td>
                        <td hidden><div><span id="spn_otroservi_idprod"></span></div></td>
                        <td hidden><div><span id="spn_otroservi_idprodsol"></span></div></td>
                        <td><div class="text-center"><button type="button" onclick="eliminar_fila_tabla_otroservis(`otroservi_1_fila_1`);"><i class="icon-cross icon-hp-desh"></i></button></div></td>
                    </tr>
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
                        <th>Producto</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th>Cantidad</th>
                        <th style="display: none">IdPreRegProd</th>
                        <th class="text-center"><i class="icon icon-bin"></i></th>
                    </tr>
                    </thead>
                    <tbody  id="tbody_otroservinr">
                    <tr id="otroservinr_1_fila_1">
                        <td><div><p class="text-center">1</p></div></td>
                        <td><div><input id="txt_otroservinr_nompro" type="text" class="form-control" /></div></td>
                        <td><div><input id="txt_otroservinr_modpro" type="text" class="form-control" /></div></td>
                        <td><div><input id="txt_otroservinr_marpro" type="text" class="form-control" /></div></td>
                        <td><div><input id="txt_otroservinr_umepro" type="text" class="form-control" /></div></td>
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptOtroServicio.js"></script>
<script>
    $(document).ready(function () {
        $("#selectEmpresaOtroServi_Proyecto").select2({
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
            templateResult: formatRepoOtroServ,
            templateSelection: formatRepoSelectionOtroServ
        });

        //LISTAR COMBO PRODUCTOS
        $("#cmb_otroservi_nompro1").select2({
            ajax: {
                url: "/otroservi/buservsolic",
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
            placeholder: 'Buscar por servicio . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: formatRepoProd,
            templateSelection: formatRepoSelectionProd
        });
        //COMBO PRODUCTOS
    });

    function formatRepoOtroServ (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectempresa2-result-empresa'><span class='selectempresa2-span-result'>EMPRESA: </span>"+repo.nomempresa+" - " + repo.ruc +"</div>"+
            "<div class='selectempresa2-result-proyecto'><span class='selectempresa2-span-result'>PROYECTO: </span>"+repo.nomproyecto+"</span></div>"+
            "<div class='selectempresa2-result-solucion'><span class='selectempresa2-span-result'>SOLUCION: </span>"+repo.solucion+"</span></div>";
        return markup;
    }

    function formatRepoSelectionOtroServ (repo) {
        return repo.text || repo.nomempresa + " - " + repo.solucion;
    }

    function formatRepoProd (repo) {
        if (repo.loading) {
            return repo.text;
        }
        var markup = "<div class='selectotroservi2-result-producto'><span class='selectotroservi2-span-result'>PRODUCTO: </span>"+repo.nombre+"</div>"+
            "<div class=         'selectotroservi2-result-modelo'  ><span class='selectotroservi2-span-result'>MODELO: </span>"+repo.modelo+"</span></div>"+
            "<div class=         'selectotroservi2-result-marca'   ><span class='selectotroservi2-span-result'>MARCA: </span>"+repo.marca+"</span></div>";
        return markup;
    }

    function formatRepoSelectionProd (repo) {
        return repo.text || repo.nombre;
    }

    function BuscarSolucionOtroServis(id){
        if(id!="" || id!=undefined){
            $.ajax({
                method: "POST",
                url: "/equipo/buscarequiposol",
                data: {"idsol": id},
                success: function resultado(valor) {
                    JSONobjGeneralOtSer = JSON.parse(valor);
                    if(JSONobjGeneralOtSer.items.length>0){
                        estOperaOtSer=1;
                        addOtroServisUpdate_otroservi(valor);
                    }else{
                        estOperaOtSer=0;
                        conta_filas_otroservi=1;
                        $("#tbody_otroservi").empty();
                        $("#otroservi_1 tbody").append(
                            "<tr id='otroservi_1_fila_1' class='otroservi-insert'>"+
                            "<td><div><p class='text-center'>1</p></div></td>"+
                            "<td><div><select id='cmb_otroservi_nompro1' name='cmb_otroservi_nompro' class='select_otroservi_otroservis' onchange='selCmbProd(this);' style='width: 100%;'></select></div></td>"+
                            "<td><div><span id='spn_otroservi_codpro'></span></div></td>"+
                            "<td><div><span id='spn_otroservi_modpro'></span></div></td>"+
                            "<td><div><span id='spn_otroservi_marpro'></span></div></td>"+
                            "<td><div><span id='spn_otroservi_umepro'></span></div></td>"+
                            "<td><div><input id='txt_otroservi_canpro' type='text' type='text' class='form-control' required/></div></td>"+
                            "<td hidden><div><span id='spn_otroservi_idprod'></span></div></td>"+
                            "<td hidden><div><span id='spn_otroservi_idprodsol'></span></div></td>"+
                            "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservis(`otroservi_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
                            "</tr>"
                        );
                        borrar_select2();
                        clonar_select2(1);

                        //otroserviS NO REGISTRADOS
                        conta_filas_otroservinr=1;
                        $("#tbody_otroservinr").empty();
                        $("#otroservinr_1 tbody").append(
                            "<tr id='otroservinr_1_fila_1' class='otroservinr-insert'>"+
                            "<td><div><p class='text-center'>1</p></div></td>"+
                            "<td><div><input id='txt_otroservinr_nompro' type='text' class='form-control' /></div></td>"+
                            "<td><div><input id='txt_otroservinr_modpro' type='text' class='form-control' /></div></td>"+
                            "<td><div><input id='txt_otroservinr_marpro' type='text' class='form-control' /></div></td>"+
                            "<td><div><input id='txt_otroservinr_umepro' type='text' class='form-control' /></div></td>"+
                            "<td><div><input id='txt_otroservinr_canpro' type='text' class='form-control' /></div></td>"+
                            "<td hidden><div><span id='spn_otroservinr_idpreg'></span></div></td>"+
                            "<td><div class='text-center'><button type='button' onclick='eliminar_fila_tabla_otroservisnr(`otroservinr_1_fila_1`);'><i class='icon-cross icon-hp-desh'></i></button></div></td>"+
                            "</tr>"
                        );
                    }
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