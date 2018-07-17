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
    <link rel="icon" href="${urlPublic}/css/Iconos/ixpery.ico" />
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
                    <ul id="tabBar" class="container-tabs"></ul>
                </div>
            </div>
        </div>
    </nav>
</header>
<main id="main" class="main"></main>
<footer>
    <p></p>
</footer>
<!-- JavaScript -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>


<script language="JavaScript" src="${urlPublic}/js/Sistema/ScriptSistemaIntegral.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script >
<!-- End JavaScript -->
</body>
</html>

