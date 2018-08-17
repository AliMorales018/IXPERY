<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <title>Reporte</title>
    <link rel="icon" href="${urlPublic}/css/Iconos/ixpery.ico"/>

    <style>
        .reporte-body{
            background-color: white;
            font-size: 9px;
        }
        .reporte{
            padding-top: 35px;
            padding-left: 35px;
        }
        .reporte-botones{
            margin-top: 150px;
            text-align: center;
        }
        .reporte-presentacion{
            font-size: 4px;
        }
        .tabla-reporte{
            border-collapse: collapse;
            width: 100%;
            max-width: 100%;
            background-color: transparent;
        }
        .tabla-reporte th{
            font-family: "Lato-Regular", cursive;
            padding: .2rem;
            vertical-align: top;
            line-height: 1.2;
            text-align: center;
            font-size: 10px;
        }
        .tabla-reporte td{
            font-family: "Lato-Regular", cursive;
            padding: .2rem;
            vertical-align: top;
            border-top: 1px solid #DEE2E6;
        }
        .reporte-item{
            background-color: #DEE2E6;
            text-align: center;
        }
        .reporte-resaltar{
            background-color: #D34539;
            color: #FFFFFF;
        }
        .reporte-resaltar-sec{
            background-color: #FDBDB7;
        }
        .reporte-color-primary{
            margin-top: .2rem;
            margin-bottom: .05rem;
            color: #D34539;
        }
        .reporte-color-black{
            margin-top: .2rem;
            /*margin-bottom: .05rem;*/
        }
        /*.reporte-sub{*/
        /*border-bottom: 1px solid #D34539;*/
        /*text-align: center;*/
        /*color: #D34539;*/
        /*}*/

        .reporte-cabecera{
            border-bottom: 2px solid #D34539;
            padding-bottom: .2rem;
            margin-bottom: .5rem;

        }

        .reporte-tabla-cabecera{
            border-bottom: 1px solid black;
            border-right: 1px solid black;
            border-left: 1px solid black;
            padding: .1rem .3rem;
            font-size: 8px;
        }

        .reporte-piepagina{
            border-top: 2px solid #D34539;
            padding-top: .3rem;
        }

        .reporte-totales{
            vertical-align:middle;
            text-align:center;
            background-color: #DEE2E6;
        }

        .reporte-ocultar{
            display: none;
        }

        .reporte-vertical{
            /*width:20px;*/
            /*word-wrap: break-word;*/
            /*text-align:center;*/
            /*color: #696969;*/

            font-size: 1.5rem;
            margin: .3rem;

        }
        .logo-gris:hover{
            fill: black;
        }

        .boton-reporte {
            cursor:pointer;
            display: inline-block;
            font-weight: 400;
            font-family: "Lato-Regular", cursive;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            padding: .3rem 1.5rem;
            font-size: 11px;
            line-height: 1.3;
            border-radius: .25rem;
            -webkit-transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
            outline: 0;
            color: #FFFFFF;
            border-color: #D34539;
            background-color: #D34539;
        }
        .boton-reporte:hover {
            color: #FFFFFF;
            background-color: #B3002A;
            border-color: #B3002A;
        }

    </style>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css" />


</head>
<body class="reporte-body">

<div class="grid-x">
    <!--REPORTE-->
    <div class="cell large-5 reporte">

        <!--CABECERA-->
        <div class="grid-x reporte-cabecera">
            <div class="cell large-6">
                <img src="${urlPublic}/img/logo.svg" height="30" width="230"/>
            </div>
            <div class="cell large-3" style="padding-top:.5rem;padding-left:.5rem;">
                <button class="boton-reporte" onclick="GenerarReporte();">REPORTE</button>
            </div>
            <div class="cell large-3">
                <div class="text-right">
                    <table id="tabla-cabecera" class="text-center"></table>
                </div>
            </div>
        </div>
        <!--FIN CABECERA-->

        <!--DATOS-->
        <div class="grid-x grid-padding-x">
            <div id="reporte-datos-cliente" class="cell large-6"></div>
            <div id="reporte-datos-cotizacion" class="cell large-6"></div>
        </div>
        <!--FIN DATOS-->

        <!--TABLA-->
        <div style="margin-top: .3rem">
            <table class="tabla-reporte">
                <thead>
                <tr class="reporte-resaltar">
                    <th>ITEM</th>
                    <th>CODIGO</th>
                    <th>MARCA - MODELO</th>
                    <th>DESCRIPCION</th>
                    <th>CANT</th>
                    <th>PREC UNIT</th>
                    <th>TOTAL</th>
                </tr>
                </thead>
                <tbody id="reporte-ITEM1">
                <tr class="reporte-item">
                    <td colspan="3"></td>
                    <td><div>EQUIPOS</div></td>
                    <td></td>
                    <td><center><input id="item1-check-prunitario" type="checkbox" /></center></td>
                    <td><center><input id="item1-check-prsubtotal" type="checkbox" /></center></td>
                </tr>

                </tbody>
                <tbody id="reporte-ITEM2">
                <tr class="reporte-item">
                    <td colspan="3"></td>
                    <td><div>SERVICIOS E INSTALACIONES</div></td>
                    <td></td>
                    <td><center><input id="item2-check-prunitario" type="checkbox" /></center></td>
                    <td><center><input id="item2-check-prsubtotal" type="checkbox" /></center></td>
                </tr>
                </tbody>
                <tbody id="reporte-ITEM3">
                <tr class="reporte-item">
                    <td colspan="3"></td>
                    <td><div>OTROS</div></td>
                    <td></td>
                    <td><center><input id="item3-check-prunitario" type="checkbox" /></center></td>
                    <td><center><input id="item3-check-prsubtotal" type="checkbox" /></center></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--TABLA-->

        <!--MEMO-->
        <div id="reporte-memo"></div>
        <!--FIN MEMO-->

        <!--PIE PAGINA-->
        <div id="reporte-piepagina" class="grid-x">
            <div class="cell large-6"></div>
            <div class="cell large-6 text-center">
                <img class="" src="${urlPublic}/img/firma.svg" height="10" width="100"/>
            </div>
            <div class="cell large-6 reporte-piepagina">
                <div>IXPERY&nbsp;SERVICE&nbsp;S.A.C</div>
                <div style="margin:.2rem auto">Lima: Av.San Pedro 845 Int 501, Surquillo</div>
                <div><div style="display:inline;color:#D34539">Chiclayo :</div> Av.Alfonso Ugarte 665, 4to piso</div>
            </div>
            <div class="cell large-6 reporte-piepagina">
                <div class="text-center">
                    <div class="text-center" style="font-weight:bold">Yannick&nbsp;Morales&nbsp;Mio</div>
                    <div class="text-center reporte-color-black">Gerente</div>
                    <div class="text-center reporte-color-black">Celular: 962500511</div>
                </div>
            </div>
        </div>
        <!--FIN PIE PAGINA-->
    </div>
    <!--FIN REPORTE-->


    <!--PDF-->
    <div id="reporte-pdf" class="cell large-7"></div>
    <!--FIN PDF-->
</div>


<script src="${urlPublic}/js/jquery-3.3.1.js"></script>
<script src="${urlPublic}/js/jspdf.debug.js"></script>
<script src="${urlPublic}/js/html2pdf.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptReportesOperaciones.js"></script>



</body>
</html>