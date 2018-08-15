<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>C. Cotización de servicio</title>
    <style>
        .btn-icon-salario{
            background-color: #D34539;
            padding: 3px;
            color: white;
            outline: none;
            cursor: pointer;
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
                    <p class="main-title">C. Servicios</p>
                </div>
            </div>
        </div>
        <div class="cell small-12 medium-4">
            <div class="grid-x align-center-middle">
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button type="button" class="btn btn-secondary" onclick="servicio_enviar_a_operaciones();">Enviar a operaciones</button>
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
                <label class="text-f" id="lbl_servicio_fecha">${fecha}</label>
            </div>
        </div>
    </div>
    <!-- End Date -->

    <div id="contenedor_cotizacion_servicio">

    </div>

    <script src="${urlPublic}/js/jquery-3.3.1.js"></script>
    <script>
        $(document).ready(function(){
            $.ajax({
                method: "POST",
                url: "/servicios/verservicio",
                data: {"id":1},
                success: function resultado(valor) {
                    let JsonObj = JSON.parse(valor);
                    let elements;
                    console.log(JsonObj);
                    if(JsonObj.items.length > 0){
                        console.log("%cNO NOS INTENTES JAKIAR WEY :v", "color: red; font-size: x-large");
                        let JsonServicio = JsonObj.items[0].SERVICIO[0];
                        let count = 1;
                        let countActividades = 1;
                        let countCargosLab = 1;
                        elements = "<div class='grid-container'>"+
                                        "<div class='grid-x grid-padding-x'>"+
                                                "<div class='cell large-3'>"+
                                                    "<div class='form-group'>"+
                                                        "<label class='label text-primary'><b>Depreciación de Herramientas (%):</b></label>"+
                                                        "<p type='number' class='form-control'><b>"+JsonServicio.porcentdepre+"</b></p>"+
                                                    "</div>"+
                                                "</div>"+
                                                "<div class='cell large-3'>"+
                                                    "<div class='form-group'>"+
                                                        "<label class='label text-primary'><b>Prorrateo tránsito:</b></label>"+
                                                        "<p type='number' class='form-control'><b>"+JsonServicio.porcenttrans+"</b></p>"+
                                                    "</div>"+
                                                "</div>"+
                                                "<div class='cell large-3'>"+
                                                    "<div class='form-group'>"+
                                                        "<label class='label text-primary'><b>Total de servicio e instalación:</b></label>"+
                                                        "<p type='number' class='form-control'><b>"+JsonServicio.costototal+"</b></p>"+
                                                    "</div>"+
                                                "</div>"+
                                                "<div class='cell large-3'>"+
                                                    "<div class='form-group'>"+
                                                        "<label class='label text-primary'><b>Total (incluido prorrateo tránsito):</b></label>"+
                                                        "<p type='number' class='form-control'><b>"+JsonServicio.costototalm+"</b></p>"+
                                                    "</div>"+
                                                "</div>"+
                                        "</div>"+
                                    "</div>";


                        elements += "<div style='margin-top: 15px;'>"+
                                        "<div class='grid-container'>"+
                                            "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                                                "<div class='cell large-12'>"+
                                                    "<label class='text-primary' style='font-size: 12px'><b>Personal en tránsito: </b></label>"+
                                                "</div>"+
                                            "</div>"+
                                            "<div class='grid-x grid-padding-x'>"+
                                                "<div class='cell large-10'>"+
                                                    "<table class='table'>"+
                                                        "<thead style='background-color: #E6E6E6'>"+
                                                            "<tr>"+
                                                                "<td>N°</td>"+
                                                                "<td class='text-center' style='width: 370px'>Cargo Laboral</td>"+
                                                                "<td class='text-center'>Cantidad</td>"+
                                                                "<td class='text-center'>Días pago</td>"+
                                                                "<td class='text-center'>Salario día</td>"+
                                                                "<td>Sub Total</td>"+
                                                                "<td>Total</td>"+
                                                            "</tr>"+
                                                        "</thead>"+
                                                        "<tbody style='background-color: #ffffffb5'>";
                                                        $.each(JsonObj.items[2].PERSONALTRANSITO, function (obj, item) {
                                                            elements += "<tr>"+
                                                                            "<td><p style='font-size:11px;'>"+count+"</p></td>"+
                                                                            "<td><span>"+item.cargolaboral+"</span></td>"+
                                                                            "<td class='text-center'><span>"+item.cantidad+"</span></td>"+
                                                                            "<td class='text-center'><span>"+item.diaspago+"</span></td>"+
                                                                            "<td><span><b>S/ "+item.salarioxdia+"</b></span></td>"+
                                                                            "<td><span><b>S/ "+item.subtotal+"</b></span></td>"+
                                                                            "<td><span><b>S/ "+item.total+"</b></span></td>"+
                                                                        "</tr>"
                                                            count++;
                                                        });
                                            elements += "</tbody>"+
                                                    "</table>"+
                                                "</div>"+
                                            "</div>"+
                                        "</div>"+
                                    "</div>";

                        $.each(JsonObj.items[1].ACTIVIDAD, function (obj, item) {
                            elements +=   "<div style='margin-top: 25px;'>"+
                                                "<div class='grid-container'>"+
                                                    "<div class='grid-x grid-padding-x' style='margin-bottom:10px'>"+
                                                        "<div class='cell large-12'>"+
                                                            "<label class='text-primary title_actividad' style='font-size: 20px'><b>Actividad "+countActividades+"</b></label>"+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='grid-x grid-padding-x'>"+
                                                        "<div class='cell large-4'><div class='form-group'><label class='label text-primary'><b>Nombre de actividad:</b></label><p class='form-control'>"+item.actividad+"</p></div></div>"+
                                                        "<div title='"+item.descripcion+"' class='cell large-4'><div class='form-group'><label class='label text-primary'><b>Descripción:</b></label><p class='form-control'>"+item.descripcion+"</p></div></div>"+
                                                        "<div class='cell large-1'><div class='form-group text-center'><label class='label text-primary'><b>Cantidad:</b></label><p class='form-control'>"+item.cantidad+"</p></div></div>"+
                                                        "<div class='cell large-1'><div class='form-group text-center'><label class='label text-primary'><b>Riesgo:</b></label><p class='form-control'>"+item.riesgo+"</p></div></div>"+
                                                        "<div class='cell large-2'><div class='form-group'><label class='label text-primary'><b>Adicionales:</b></label><p class='form-control'>S/ "+item.adicional+"</p></div></div>"+
                                                        "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Servicio Unitario (Mostrar):</b></label><p class='form-control'><b>S/ "+item.costunitm+"</b></p></div></div>"+
                                                        "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Servicio Unitario:</b></label><p class='form-control'><b>S/ "+item.costunit+"</b></p></div></div>"+
                                                        "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Total Servicio (Mostrar):</b></label><p class='form-control'><b>S/ "+item.costtotalm+"</b></p></div></div>"+
                                                        "<div class='cell large-3'><div class='form-group'><label class='label text-primary'><b>Total Servicio:</b></label><p class='form-control'><b>S/ "+item.costtotal+"</b></p></div></div>"+
                                                    "</div>"+
                                                    "<div class='grid-x grid-padding-x'>"+
                                                        "<div class='cell large-12'>"+
                                                            "<table class='table'>"+
                                                                "<thead class='thead-primary'>"+
                                                                    "<tr>"+
                                                                        "<th class='text-center'>N°</th>"+
                                                                        "<th>Cargo Laboral</th>"+
                                                                        "<th class='text-center'>Cantidad</th>"+
                                                                        "<th class='text-center'>Días laborables</th>"+
                                                                        "<th class='text-center'>Días pago</th>"+
                                                                        "<th>Salario día</th>"+
                                                                        "<th>Subtotal Laboral</th>"+
                                                                        "<th>Total Laboral</th>"+
                                                                        "<th class='text-center'>AS</th>"+
                                                                    "</tr>"+
                                                                "</thead>"+
                                                                "<tbody style='background-color: #ffffffb5'>";
                                                                 $.each(item.cargoslaborales, function (obj, item) {
                                                                     elements +=  "<tr>"+
                                                                                     "<td style='font-size: 11px;'><p class='text-center'>"+countCargosLab+"</p></td>"+
                                                                                     "<td style='width: 280px'><span>"+item.nomcargo+" - "+item.nomarea+"</span></td>"+
                                                                                     "<td class='text-center'><span>"+item.cantidad+"</span></td>"+
                                                                                     "<td class='text-center'><span>"+item.diaslaboral+"</span></td>"+
                                                                                     "<td class='text-center'><span>"+item.diaspago+"</span></td>"+
                                                                                     "<td><span><b>S/ "+item.salarioxdia+"</b></span></td>"+
                                                                                     "<td><span><b>S/ "+item.subtotallaboral+"</b></span></td>"+
                                                                                     "<td><span><b>S/ "+item.totallaboral+"</b></span></td>"+
                                                                                     "<td title='Actualizar salario' class='text-center'><button class='btn-icon-salario' onclick='actualizar_salario_cl("+item.idcargo+");'>S/.</button></td>"+
                                                                                  "</tr>"
                                                                     countCargosLab++;
                                                                 });
                                                    elements += "</tbody>"+
                                                            "</table>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</div>"+
                                          "</div>";
                            countActividades++;
                            countCargosLab = 1;
                        });
                        $("#contenedor_cotizacion_servicio").append(elements);
                    }
                    else{
                        $("#contenedor_cotizacion_servicio").append(
                            "<div class='grid-container'>"+
                                "<div class='grid-x grid-margin-x align-center-middle'>"+
                                    "<div class='cell text-center'>"+
                                        "<p style='margin-left: 40px;'>No se encontraron resultados.</p>"+
                                    "</div>"+
                                "</div>"+
                            "</div>"
                        );
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        });
        
        function actualizar_salario_cl(idCargo) {
            var r = confirm("ID CARGO: "+idCargo);
            if (r == true) {
                alert("SI");
            } else {
                alert("NO");
            }
        }

        function servicio_enviar_a_operaciones(){
            alert("Enviado a Operaciones.");
        }
    </script>
</body>
</html>
