<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Viaticos</title>
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
                <p class="main-title">C. Viáticos</p>
            </div>
        </div>
    </div>
    <div class="cell large-2"></div>
    <div class="cell large-6">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_otroservicio2_save" class="btn btn-secondary" onclick="InsUpdDelOtroServ2();">Guardar</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_otroservicio2_regprovee" class="btn btn-light" onclick="abrir_prove_ot2();">Reg. Proveedor</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_otroservicio2_regserv" class="btn btn-secondary" onclick="abrir_asociar_ots2();">Reg. Servicios</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notifyfdfd -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_otroservicio2_fecha">${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->

<!-- otroservicios Regitrados-->
<div id="container_otroservicios" style="margin-top: 15px;">
    <div id="otroservicio_2" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <span class="spn-otroservicio2-emp text-primary" style="font-size:14px;font-weight:bold"></span></br>
                            <span class="spn-otroservicio2-pro text-primary" style="font-size:14px;font-weight:bold"></span></br>
                            <span class="spn-otroservicio2-req text-primary" style="font-size:14px;font-weight:bold"></span>
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
                <table class="table" id="tbl_otroservicio2">
                    <thead class="thead-primary">
                    <tr>
                        <th class="text-center">N°</th>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <%--<th>Modelo</th>--%>
                        <th>Proveedor</th>
                        <%-- <th>Marca</th>
                         <th>U. Medida</th>--%>
                        <th style="width: 20px;">Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th>Actualizar Precio</th>

                    </tr>
                    </thead>
                    <tbody id="tbody_otroservicio2">
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin otroservicios -->

<!-- otroservicios no Registrados-->
<div id="container_otroservicionr2" style="margin-top: 15px;">
    <div id="otroservicionr_2" class="actividad grid-container">
        <!-- Table -->
        <div class="grid-x grid-padding-x">
            <div class="cell large-9">
                <div class="grid-x grid-margin-x">
                    <div class="cell large-6 container-combo">
                        <div class="form-group">
                            <label class="label text-primary" style="line-height: 1.5;"><b>LISTA DE SERVICIOS NUEVOS</b></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell large-12">
                <table class="table" id="tbl_otroservicionr2">
                    <thead class="thead-primary">
                    <tr>
                        <th class="text-center">N°</th>
                        <th>Servicio</th>
                        <th>Descripción</th>
                        <%--                        <th>Marca</th>
                                                <th>U. Medida</th>--%>
                        <th>Cantidad</th>
                    </tr>
                    </thead>
                    <tbody  id="tbody_otroservicionr2">
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Table -->
    </div>
</div>
<!-- Fin otroservicios -->
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptOtroServicio2.js"></script>
<script>


    $(document).ready(function () {
        BuscarOtroServicio();
    });
    function BuscarOtroServicio(){
        /* conta_filas_otroservicio2=0;
         conta_filas_otroservicionr2=0;*/
        let id = "";
        $.ajax({
            method: "POST",
            async: false,
            url: "/solucion/VerificarSesionSolucion",
            success: function(valor) {
                console.log('valor');
                console.log(valor);
                id = valor;
                sSolucionOtSer2=id;
                //id = 1;
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
        ++countso;

        //  console.log("id");
        //  console.log(id);
        $.ajax({
            method: "POST",
            url: "/otroservicio2/buscarotroserviciosol",
            data: {"idsol": id},
            success: function resultado(valor) {
                conta_filas_otroservicio2=0;
                conta_filas_otroservicionr2=0;
                JSONobjGeneralServ2 = JSON.parse(valor);
                // alert(JSON.stringify(JSONobj));
                $("#tbody_otroservicio2").empty();
                $("#tbody_otroservicionr2").empty();

                $('.spn-otroservicio2-emp').html($(".spn-cotizacion-emp").text());
                $('.spn-otroservicio2-pro').html($(".spn-cotizacion-pro").text());
                $('.spn-otroservicio2-req').html($(".spn-cotizacion-req").text());
                //RECORREMOS otroservicio PRODUCTOS REGISTRADOS
                if (JSONobjGeneralServ2.items.length > 0) {
                    if (JSONobjGeneralServ2.items[1].items2.length > 0) {
                        $.each(JSONobjGeneralServ2.items[1].items2, function (obj, item) {
                            conta_filas_otroservicio2++;
                            let cosUnit = "";
                            let subUnit = "";
                            let servprov = "";
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
                            if (item.idservprov === null) {
                                servprov = "";
                            } else {
                                servprov = item.idservprov
                            }
                            //falta total luego agregar si es necesario
                            var trvalos2 = "otroservicio_2_fila_" + conta_filas_otroservicio2;
                            $("#otroservicio_2 tbody").append(
                                "<tr id='otroservicio_2_fila_" + conta_filas_otroservicio2 + "' class='otroservicio2-edit'>" +
                                "<td><div><p class='text-center'>" + conta_filas_otroservicio2 + "</p></div></td>" +
                                "<td><div><span id='spn_otroservicio2_nomserv'>" + item.servsolicitado + "</span></div></td>" +
                                "<td><div><span id='spn_otroservicio2_desserv'>" + item.descripcion + "</span></div></td>" +
                                // "<td><div><span id='spn_otroservicio2_modpro'>"+item.modelo+"</span></div></td>"+
                                "<td hidden><div><span id='spn_otroservicio2_idprovee'>" + item.idproveedor + "</span></div></td>" +
                                "<td><div><select id='cmb_otroservicio2_provee" + conta_filas_otroservicio2 + "' name='cmb_otroservicio2_provee' class='select_otroservicio_otroservicios' style='width: 100%;' onchange='selCmbProveeOtS2(this);'><option value='" + item.idproveedor + "' selected='selected'>" + item.nomempresa + "</option></select>" +
                                /*                        "<td><div><span id='spn_otroservicio2_marpro'>"+item.marca+"</span></div></td>"+
                                                        "<td><div><span id='spn_otroservicio2_medpro'>"+item.nomumedida+"</span></div></td>"+*/
                                "<td><div><span id='spn_otroservicio2_canser'>" + item.cantidad + "</div></td>" +
                                "<td><div><span id='spn_otroservicio2_preser'>" + cosUnit + "</span></div></td>" +
                                "<td><div><span id='spn_otroservicio2_subtot'></span>" + subUnit + "</div></td>" +
                                "<td><div><button id='btn_otroservicio2_actser" + conta_filas_otroservicio2 + "' name='btn_otroservicio2_actser" + conta_filas_otroservicio2 + "' onclick='crearSesProvSoli(`" + trvalos2 + "`);'>Actualizar Precio</button></div></td>" +
                                "<td hidden><div><span id='spn_otroservicio2_idservicsolu'>" + item.idservicsolu + "</span></div></td>" +
                                "<td hidden><div><span id='spn_otroservicio2_idotroservi'>" + item.idoserv + "</span></div></td>" +
                                "<td hidden><div><span id='spn_otroservicio2_idserprov'>" + servprov + "</span></div></td>" +
                                "<td hidden><div><span id='spn_otroservicio2_idsersoli'>" + item.idservsol + "</span></div></td>" +
                                "</tr>"
                            );
                            // borrar_select4();
                            clonar_selectOtroSer2(conta_filas_otroservicio2, item.idservsol);

                            // $("#select2-cmb_otroservicio2_provee" + conta_filas_otroservicio2 + "-container").text(item.nomempresa);
                        });
                    }

                    //NO REGISTRADOS SI EXISTEN MOSTRARr


                    if (JSONobjGeneralServ2.items[2].items3.length > 0) {
                        $.each(JSONobjGeneralServ2.items[2].items3, function (obj, item) {
                            conta_filas_otroservicionr2++;

                            $("#otroservicionr_2 tbody").append(
                                "<tr id='otroservicionr_2_fila_" + conta_filas_otroservicio2 + "'>" +
                                "<td><div><p class='text-center'>" + conta_filas_otroservicionr2 + "</p></div></td>" +
                                "<td><div><span id='spn_otroservicionr2_nomserv'>" + item.servsolicitado + "</span></div></td>" +
                                "<td><div><span id='spn_otroservicionr2_desserv'>" + item.descripcion + "</span></div></td>" +
                                /*  "<td><div><span id='spn_otroservicionr2_marpro'>"+item.marca+"</span></div></td>"+
                                  "<td><div><span id='spn_otroservicionr2_medpro'>"+item.umedida+"</span></div></td>"+*/
                                "<td><div><span id='spn_otroservicionr2_canserv'>" + item.cantidad + "</span></div></td>" +
                                "</tr>"
                            );
                        });
                    }
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
</script>
<!-- End JavaScript -->
</body>
</html>