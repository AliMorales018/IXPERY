<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipos2</title>
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
        .selectequipo2-result-empresa{
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
                <button type="button" id="btn_equipo2_save" class="btn btn-secondary" onclick="addEquiposUpdate_equipo2();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo2_regprovee" class="btn btn-secondary" onclick="">Reg. Proveedor</button>
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

<!-- Equipos Regitrados-->
<div id="container_equipos" style="margin-top: 15px;">
    <div id="equipo_2" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>SOLUCION 1</b></label>
                            <div hidden><label hidden id="lblidSol">1</label></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>SELECCIONAR PROVEEDOR PARA ASIGNAR PRECIOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_equipo2">
                    <thead class="thead-primary">
                    <tr>
                        <th class="text-center">N°</th>
                        <th>Producto</th>
                        <th>Código</th>
                        <th>Modelo</th>
                        <th>Proveedor</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th style="width: 20px;">Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th>Actualizar Precio</th>

                    </tr>
                    </thead>
                    <tbody id="tbody_equipo2">
                    <tr id="equipo_2_fila_1">
                        <td><div id='campo1_tbl_equipo2'><p id="p_num_equipo2"      class="text-center">1</p></div></td>
                        <td><div id='campo2_tbl_equipo2'><span id="spn_equipo2_nompro1" ></span></div></td>
                        <td><div id='campo3_tbl_equipo2'><span id="spn_equipo2_codpro1" name="spn_equipo2_codpro1"></span></div></td>
                        <td><div id='campo4_tbl_equipo2'><span id="spn_equipo2_modpro1" name="spn_equipo2_modpro1"></span></div></td>
                        <td><div id='campo5_tbl_equipo2'><select id="cmb_equipo2_provee1" name="cmb_equipo2_provee1" class="select_equipo_equipos" style="width: 100%;"></select>
                        <td><div id='campo6_tbl_equipo2'><span id="spn_equipo2_marpro1" name="spn_equipo2_marpro1"></span></div></td>
                        <td><div id='campo7_tbl_equipo2'><span id="spn_equipo2_medpro1" name="spn_equipo2_medpro1"></span></div></td>
                        <td><div id='campo8_tbl_equipo2'><input type="text" id="txt_equipo2_canpro1" name="txt_equipo2_canpro1" class="form-control" /></div></td>
                        <td><div id='campo9_tbl_equipo2'><span id="spn_equipo2_prepro1" name="spn_equipo2_prepro1"></span></div></td>
                        <td><div id='campo10_tbl_equipo2'><span id="spn_equipo2_subtot1" name="spn_equipo2_subtot1"></span></div></td>
                        <td><div id='campo11_tbl_equipo2'><button id="btn_equipo2_actpre1" name="btn_equipo2_actpre1">Actualizar Precio</button></div></td>
                        <td hidden><div id='campo12_tbl_equipo2'><input type="text" id="txt_equipo2_idprodsol1" name="txt_equipo2_idprodsol1" class="form-control" /></div></td>
                        <td hidden><div id='campo13_tbl_equipo2'><input type="text" id="txt_equipo2_idequipo1" name="txt_equipo2_idequipo1" class="form-control" /></div></td>
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
<div id="container_equiposnr2" style="margin-top: 15px;">
    <div id="equiponr_2" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>LISTA DE EQUIPOS Y MATERIALES NUEVOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_equiponr2">
                    <thead class="thead-primary">
                    <tr>
                        <th class="text-center">N°</th>
                        <th>Producto</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>U. Medida</th>
                        <th>Cantidad</th>
                    </tr>
                    </thead>
                    <tbody  id="tbody_equiponr2">
                    <tr id="equiponr_2_fila_1">
                        <td><div id='campo1_tbl_equiponr2_1'><p id="p_num_equiponr1"      class="text-center">1</p></div></td>
                        <td><div id='campo2_tbl_equiponr2_1'><input type="text" id="txt_equiponr2_nompro1" name="txt_equiponr2_nompro1" class="form-control" /></div></td>
                        <td><div id='campo3_tbl_equiponr2_1'><input type="text" id="txt_equiponr2_modpro1" name="txt_equiponr2_modpro1" class="form-control" /></div></td>
                        <td><div id='campo4_tbl_equiponr2_1'><input type="text" id="txt_equiponr2_marpro1" name="txt_equiponr2_marpro1" class="form-control" /></div></td>
                        <td><div id='campo5_tbl_equiponr2_1'><input type="text" id="txt_equiponr2_medpro1" name="txt_equiponr2_medpro1" class="form-control" /></div></td>
                        <td><div id='campo6_tbl_equiponr2_1'><input type="text" id="txt_equiponr2_canpro1" name="txt_equiponr2_canpro1" class="form-control" /></div></td>
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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo2.js"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script>
    var contPrimervez=0;
    var fila=0;
    var id=1;
    var conta_filas_equipo2=0;
    var conta_filas_equiponr2=0;
    $(document).ready(function () {
        $.ajax({
            method: "POST",
            url: "/equipo2/buscarequiposol",
            data: {"idsol": id},
            success: function resultado(valor) {

                var JSONobj = JSON.parse(valor);
               // alert(JSON.stringify(JSONobj));
                    $("#tbody_equipo2").empty();

                    //RECORREMOS EQUIPO PRODUCTOS REGISTRADOS

                    $.each(JSONobj.items[1].items2, function (obj, item) {
                        conta_filas_equipo2++;

                        $("#equipo_2 tbody").append(
                            "<tr id='equipo_2_fila_"+conta_filas_equipo2+"'>"+
                                "<td id='td_equipo2_parpro"+conta_filas_equipo2+"'><div id='campo1_tbl_equipo2_"+conta_filas_equipo2+"'><p id='p_num_equipo2_"+conta_filas_equipo2+"' class='text-center'>"+conta_filas_equipo2+"</p></div></td>"+
                                "<td id='td_equipo2_nompro"+conta_filas_equipo2+"'><div id='campo2_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_nompro"+conta_filas_equipo2+"' >"+item.producto+"</span></div></td>"+
                                "<td id='td_equipo2_codpro"+conta_filas_equipo2+"'><div id='campo3_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_codpro"+conta_filas_equipo2+"' name='spn_equipo2_codpro1'>"+item.codigo+"</span></div></td>"+
                                "<td id='td_equipo2_modpro"+conta_filas_equipo2+"'><div id='campo4_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_modpro"+conta_filas_equipo2+"' name='spn_equipo2_modpro1'>"+item.modelo+"</span></div></td>"+
                                "<td id='td_equipo2_provee"+conta_filas_equipo2+"'><div id='campo5_tbl_equipo2_"+conta_filas_equipo2+"'><select id='cmb_equipo2_provee"+conta_filas_equipo2+"' name='cmb_equipo2_provee1' class='select_equipo_equipos' style='width: 100%;'></select>"+
                                "<td id='td_equipo2_marpro"+conta_filas_equipo2+"'><div id='campo6_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_marpro"+conta_filas_equipo2+"' name='spn_equipo2_marpro1'>"+item.marca+"</span></div></td>"+
                                "<td id='td_equipo2_medpro"+conta_filas_equipo2+"'><div id='campo7_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_medpro"+conta_filas_equipo2+"' name='spn_equipo2_medpro1'>"+item.nomumedida+"</span></div></td>"+
                                "<td id='td_equipo2_canpro"+conta_filas_equipo2+"'><div id='campo8_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_canpro"+conta_filas_equipo2+"' name='spn_equipo2_canpro1'>"+item.cantidad+"</div></td>"+
                                "<td id='td_equipo2_prepro"+conta_filas_equipo2+"'><div id='campo9_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_prepro"+conta_filas_equipo2+"' name='spn_equipo2_prepro1'></span></div></td>"+
                                "<td id='td_equipo2_subtot"+conta_filas_equipo2+"'><div id='campo10_tbl_equipo2_"+conta_filas_equipo2+"'><span id='spn_equipo2_subtot"+conta_filas_equipo2+"' name='spn_equipo2_subtot1'></span></div></td>"+
                                "<td id='td_equipo2_actpro"+conta_filas_equipo2+"'><div id='campo11_tbl_equipo2_"+conta_filas_equipo2+"'><button id='btn_equipo2_actpre"+conta_filas_equipo2+"' name='btn_equipo2_actpre1'>Actualizar Precio</button></div></td>"+
                      "<td hidden id='td_equipo2_idprodsol"+conta_filas_equipo2+"'><div id='campo12_tbl_equipo2_"+conta_filas_equipo2+"'><input type='text' id='txt_equipo2_idprodsol"+conta_filas_equipo2+"' name='txt_equipo2_idprodsol"+conta_filas_equipo2+"' value='"+item.idprodsol+"' class='form-control'/></div></td>"+
                      "<td hidden id='td_equipo2_idequipo"+conta_filas_equipo2+"'><div id='campo13_tbl_equipo2_"+conta_filas_equipo2+"'><input type='text' id='txt_equipo2_idequipo"+conta_filas_equipo2+"'  name='txt_equipo2_idequipo"+conta_filas_equipo2+"'  value='"+item.idequipo+"' class='form-control'/></div></td>"+
                            "</tr>"
                        );
                        borrar_select3();
                        clonar_select3(conta_filas_equipo2);
                    });

                    //NO REGISTRADOS SI EXISTEN MOSTRAR

                $( "#tbody_equiponr2" ).empty();
                $.each(JSONobj.items[2].items3, function (obj, item) {
                    conta_filas_equiponr2++;

                    $("#equiponr_2 tbody").append(
                    "<tr id='equiponr_2_fila_"+conta_filas_equipo2+"'>"+
                        "<td id='td_equiponr2_parpro"+conta_filas_equiponr2+"'><div id='campo1_tbl_equiponr2_"+conta_filas_equiponr2+"'><p id='p_num_equiponr2_"+conta_filas_equipo2+"' class='text-center'>"+conta_filas_equiponr2+"</p></div></td>"+
                        "<td id='td_equiponr2_nompro"+conta_filas_equiponr2+"'><div id='campo2_tbl_equiponr2_"+conta_filas_equiponr2+"'><span id='txt_equiponr2_nompro"+conta_filas_equiponr2+"' name='txt_equiponr2_nompro1'>"+item.nomproducto+"</span></div></td>"+
                        "<td id='td_equiponr2_modpro"+conta_filas_equiponr2+"'><div id='campo3_tbl_equiponr2_"+conta_filas_equiponr2+"'><span id='txt_equiponr2_modpro"+conta_filas_equiponr2+"' name='txt_equiponr2_modpro1'>"+item.modelo+"</span></div></td>"+
                        "<td id='td_equiponr2_marpro"+conta_filas_equiponr2+"'><div id='campo4_tbl_equiponr2_"+conta_filas_equiponr2+"'><span id='txt_equiponr2_marpro"+conta_filas_equiponr2+"' name='txt_equiponr2_marpro1'>"+item.marca+"</span></div></td>"+
                        "<td id='td_equiponr2_medpro"+conta_filas_equiponr2+"'><div id='campo5_tbl_equiponr2_"+conta_filas_equiponr2+"'><span id='txt_equiponr2_medpro"+conta_filas_equiponr2+"' name='txt_equiponr2_medpro1'>"+item.umedida+"</span></div></td>"+
                        "<td id='td_equiponr2_canpro"+conta_filas_equiponr2+"'><div id='campo6_tbl_equiponr2_"+conta_filas_equiponr2+"'><span id='txt_equiponr2_canpro"+conta_filas_equiponr2+"' name='txt_equiponr2_canpro1'>"+item.cantidad+"</span></div></td>"+
                    "</tr>"
                    );
                });
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
        //LISTAR COMBO PRODUCTOS
  /*      $("#cmb_equipo_nompro1").select2({
            ajax: {
                url: "/equipo2/busproducto",
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
        });*/
        //COMBO PRODUCTOS
    });

 /*   function formatRepoProd (repo) {
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

    }*/

</script>
<!-- End JavaScript -->
</body>
</html>