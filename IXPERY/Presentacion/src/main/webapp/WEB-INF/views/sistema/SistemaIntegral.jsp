<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <!--meta http-equiv="Content-Type" content="text/html; charset=utf-8" /-->
    <title>IXPERY</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css" />
    <link rel="stylesheet" href="${urlPublic}/css/select2.css" />
    <link rel="stylesheet" href="${urlPublic}/css/toast.css" />
    <link rel="icon" href="${urlPublic}/css/Iconos/ixpery.ico" />
    <style>

        .logo-fondo{
            opacity: .4;
            position: absolute;
            left: 20%;
            top: 40%;
        }

        .menu-permanente {
            overflow: hidden;
        }
        .menu-permanente li {
            float: left;
            display: block;
        }

        .sticky {
            position: fixed;
            top: 0;
            width: 100%;
        }
        .sticky + .main {
            padding-top: 500px;
        }
    </style>
</head>

<body>
<header>
    <div id="prueba">${prueba}</div>
    <nav id="nav">
        <div class="grid-x align-center-middle claseul">
            <div class="cell small-0 medium-1 large-1"></div>
            <div class="cell small-12 medium-10 large-10">
                <div>
                    <ul id="MenuPrincipal" class="grid-x grid-padding align-center-middle claseul"></ul>
                </div>
            </div>
            <div class="cell small-0 medium-1 large-1 grid-padding-x">
                <div class="icon-noti">
                    <!--a href=""><i class="notificacion icon-bell2"></i></a-->
                    <form action="/logout">
                        <button><i class="notificacion icon-switch2"></i></button>
                    </form>
                </div>
            </div>
        </div>

        <div class="grid-x">
            <div class="cell small-0 medium-1 large-1"></div>
            <div class="cell small-12 medium-10 large-10">
                <div>
                    <ul id="MenuSecundario" class="grid-x align-center-middle ulimg"></ul>
                </div>
            </div>
            <div class="cell small-0 medium-1 large-1"></div>
        </div>

        <div class="bg_tab">
            <div class="grid-x grid-padding-x">
                <div class="cell medium-12">
                    <ul id="tabBar" class="container-tabs menu-permanente"></ul>
                </div>
            </div>
        </div>
    </nav>
</header>
<main id="main" class="main">
    <div id="panel__0" class="logo-fondo">
        <img src="${urlPublic}/img/logo.svg" height="400" width="800" />
    </div>
</main>
<footer>
    <p></p>
</footer>

<!-- JavaScript -->
<script src="${urlPublic}/js/jquery-3.3.1.js"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Sistema/ScriptSistemaIntegral.js"></script>
<!-- End JavaScript -->

</body>
</html>

