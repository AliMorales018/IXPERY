<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Equipos2</title>
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
                <p class="main-title">C. Equipo</p>
            </div>
        </div>
    </div>
    <div class="cell large-2"></div>
    <div class="cell large-6">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo2_save" class="btn btn-secondary" onclick="InsUpdDelEquipo2();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo2_regprovee" class="btn btn-light" onclick="abrir_equipo2_regprove()">Reg. Proveedor</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_equipo2_regprod" class="btn btn-secondary"  onclick="abrir_equipo2_regprod();">Reg. Productos</button>
            </div>
        </div>
    </div>


    <div class="cell small-12 medium-4">
        <!-- Notifyfdfdggg -->
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
                    <div style="margin-bottom: 5px"><span class="spn-equipo2-emp text-primary" style="font-size:14px;font-weight:bold"></span></div>
                    <div style="margin-bottom: 5px"><span class="spn-equipo2-pro text-primary" style="font-size:14px;font-weight:bold"></span></div>
                    <div><span class="spn-equipo2-req text-primary" style="font-size:12px;font-weight:bold"></span></div>
                </div>
            </div>
        </div>
        <div class="cell large-2"></div>
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
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin Equipos -->

<!-- JavaScript -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptEquipo2.js"></script>
<script>
  /*  var conta_filas_equipo2;
    var conta_filas_equiponr2;*/
    function BuscarSesionSol(){
        /*conta_filas_equipo2=0;
        conta_filas_equiponr2=0;*/
        let id = "";
        $.ajax({
            method: "POST",
            async: false,
            url: "/solucion/VerificarSesionSolucion",
            success: function(valor) {
                console.log('valor');
                console.log(valor);
                id = valor;
                sSolucionEq2=id;
                //id = 1;
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
        ++countsc;


       //  console.log("id");
       //  console.log(id);
        $.ajax({
            method: "POST",
            url: "/equipo2/buscarequiposol",
            data: {"idsol": id},
            success: function resultado(valor) {
                conta_filas_equipo2=0;
                conta_filas_equiponr2=0;
                console.log('ACAAAAAAAAAAA');
                console.log(valor);

                JSONobjGeneralEq2 = JSON.parse(valor);
                // alert(JSON.stringify(JSONobj));
                $("#tbody_equipo2").empty();
                $("#tbody_equiponr2").empty();

                $('.spn-equipo2-emp').html($(".spn-cotizacion-emp").text());
                $('.spn-equipo2-pro').html($(".spn-cotizacion-pro").text());
                $('.spn-equipo2-req').html($(".spn-cotizacion-req").text());

                //RECORREMOS EQUIPO PRODUCTOS REGISTRADOS
                if (JSONobjGeneralEq2.items.length > 0) {
                    if (JSONobjGeneralEq2.items[1].items2.length > 0) {
                        $.each(JSONobjGeneralEq2.items[1].items2, function (obj, item) {
                            conta_filas_equipo2++;
                            let cosUnit = "";
                            let subUnit = "";
                            let prodprov = "";
                            if (item.costounitario === 0) {
                                cosUnit = "";
                            } else {
                                cosUnit = item.costounitario
                            }
                            if (item.costosubtotal === 0) {
                                subUnit = "";
                            } else {
                                subUnit = item.costosubtotal
                            }
                            if (item.idprodprov === null) {
                                prodprov = "";
                            } else {
                                prodprov = item.idprodprov
                            }
                            //falta total luego agregar si es necesario
                            var trvaleq2="equipo_2_fila_"+conta_filas_equipo2;
                            $("#equipo_2 tbody").append(
                                "<tr id='equipo_2_fila_" + conta_filas_equipo2 + "' class='equipo2-edit'>" +
                                "<td><div><p class='text-center'>" + conta_filas_equipo2 + "</p></div></td>" +
                                "<td><div><span id='spn_equipo2_nompro'>" + item.producto + "</span></div></td>" +
                                "<td><div><span id='spn_equipo2_codpro'>" + item.codigo + "</span></div></td>" +
                                "<td><div><span id='spn_equipo2_modpro'>" + item.modelo + "</span></div></td>" +
                                "<td hidden><div><span id='spn_equipo2_idprovee'>" + item.idproveedor + "</span></div></td>" +
                                "<td><div><select id='cmb_equipo2_provee" + conta_filas_equipo2 + "' name='cmb_equipo2_provee' class='select_equipo_equipos' style='width: 100%;' onchange='selCmbProveeEq2(this);'><option value='"+item.idproveedor+"' selected='selected'>"+item.nomempresa+"</option></select>" +
                                "<td><div><span id='spn_equipo2_marpro'>" + item.marca + "</span></div></td>" +
                                "<td><div><span id='spn_equipo2_medpro'>" + item.nomumedida + "</span></div></td>" +
                                "<td><div><span id='spn_equipo2_canpro'>" + item.cantidad + "</div></td>" +
                                "<td><div><span id='spn_equipo2_prepro'>" + cosUnit + "</span></div></td>" +
                                "<td><div><span id='spn_equipo2_subtot'></span>" + subUnit + "</div></td>" +
                                "<td><div><button id='btn_equipo2_actpre" + conta_filas_equipo2 + "' class='btn-icon-salario' name='btn_equipo2_actpre1' onclick='crearSesProvProd(`"+trvaleq2+"`);'>Actualizar Precio</button></div></td>" +
                                "<td hidden><div><span id='spn_equipo2_idprodsol'>" + item.idprodsol + "</span></div></td>" +
                                "<td hidden><div><span id='spn_equipo2_idequipo'>" + item.idequipo + "</span></div></td>" +
                                "<td hidden><div><span id='spn_equipo2_idprprov'>" + prodprov + "</span></div></td>" +
                                "<td hidden><div><span id='spn_equipo2_idproduc'>" + item.idproducto + "</span></div></td>" +
                                "</tr>"
                            );
                            // borrar_select3();
                            clonar_selectEq2(conta_filas_equipo2, item.idproducto);

                            console.log('item.idproveedor');
                            console.log(item.idproveedor);
                            // $("#select2-cmb_equipo2_provee" + conta_filas_equipo2 + "-container").text(item.nomempresa);
                            // $("#select2-cmb_equipo2_provee" + conta_filas_equipo2 + "-container").value = item.idproveedor;

                        });
                   }


                //NO REGISTRADOS SI EXISTEN MOSTRARr


                if(JSONobjGeneralEq2.items[2].items3.length>0){
                    $.each(JSONobjGeneralEq2.items[2].items3, function (obj, item) {
                    conta_filas_equiponr2++;

                    $("#equiponr_2 tbody").append(
                        "<tr id='equiponr_2_fila_" + conta_filas_equipo2 + "'>" +
                        "<td><div><p class='text-center'>" + conta_filas_equiponr2 + "</p></div></td>" +
                        "<td><div><span id='spn_equiponr2_nompro'>" + item.nomproducto + "</span></div></td>" +
                        "<td><div><span id='spn_equiponr2_modpro'>" + item.modelo + "</span></div></td>" +
                        "<td><div><span id='spn_equiponr2_marpro'>" + item.marca + "</span></div></td>" +
                        "<td><div><span id='spn_equiponr2_medpro'>" + item.umedida + "</span></div></td>" +
                        "<td><div><span id='spn_equiponr2_canpro'>" + item.cantidad + "</span></div></td>" +
                        "</tr>"
                    );
                });
            }
        }
            },
            error: function errores(msg) {
                //alert('Error: ' + msg.responseText);
            }
        });
    }


    $(document).ready(function () {
        BuscarSesionSol();
    });


    function llenar_combo_proveedor_equipo2(id, text){
        //COMBO DE SOLUCION
        let data = {id: id , text: text};
        let newOption = new Option(data.text, data.id, false, false);
        $('#selectCargoLaboral_histsal').empty().append(newOption);
        $('#selectCargoLaboral_histsal').attr("disabled",true);
    }

</script>
<!-- End JavaScript -->
</body>
</html>