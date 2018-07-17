<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Ixpery | Acceso</title>
    <link rel="icon" href="${urlPublic}/img/favicon/ixpery.ico" />
    <link href="${urlPublic}/css/toast.css" rel="stylesheet"/>
    <link href="${urlPublic}/css/login.css" rel="stylesheet"/>
</head>
<body>
<div class="container">
    <div class="card"></div>
    <div class="card">
        <h1 class="title">IXPERY</h1>
        <form id="formLog" name="formLog" action="/validar" method="post">
            <div class="input-container">
                <input type="text" id="txtUser" name="txtUser" required="required"/>
                <label>Usuario</label>
                <div class="bar"></div>
            </div>
            <div class="input-container">
                <input type="password" id="txtPassword" name="txtPassword" required="required" onkeyup="Validar(event,this,1);">
                <label>Password</label>
                <div class="bar"></div>
            </div>
            <div class="input-container">
                <select class="select-log" id="selectApli" name="selectApli" onchange="CargarPerfiles();">
                    <option value="0">Seleccione . . . </option>
                </select>
                <label>Aplicacion</label>
                <div class="bar"></div>
            </div>
            <div class="input-container">
                <select class="select-log" id="selectPerfil" name="selectPerfil">
                    <option value="0">Seleccione . . . </option>
                </select>
                <label>Perfil</label>
                <div class="bar"></div>
            </div>
            <div class="button-container">
                <button type="button" onclick="Validar(null,null,2);"><span>Ingresar</span></button>
            </div>
            <div class="footer"><a href="#" data-toggle="modal" data-target="#modalSendMail"><small>¿Olvidaste tu contraseña?</small></a></div>
        </form>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="modalSendMail" tabindex="-1" role="dialog" aria-labelledby="ModalSendMialLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form action="/recuperar">
                <div class="modal-header">
                    <h5 class="modal-title">Recuperar Contraseña</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p id="txt_msj_title" class="title-body">Ingrese su email o usuario para recuperar sus datos: </p>
                    <input type="text" class="form-control" name="txtEmail" id="txtEmail" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-close" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-dark" onclick="sendMail();">Enviar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="${urlPublic}/js/jquery-3.3.1.js"></script>
<script src="${urlPublic}/js/toast.js"></script>
<script src="${urlPublic}/js/login.js"></script>

<script>
    function Validar(event,obj,mode){
        var estadoValidate;
        if(${access == null}){
            estadoValidate = 1;
        }
        else{
            estadoValidate = 2;
        }
        if(estadoValidate == 1){
            if(mode == 1){
                if(event.keyCode == 13) {
                    if($("#txtUser").val() == "" || $("#txtPassword").val() == ""){
                        messageToast('Ingrese sus credenciales','#e51c23');
                    }
                    else{
                        <c:if test="${access == null}">
                        submitForm();
                        </c:if>
                    }
                }
            }
            if(mode == 2){
                if($("#txtUser").val() == "" || $("#txtPassword").val() == ""){
                    messageToast('Ingrese sus credenciales','#e51c23');
                }
            }
        }
        if(estadoValidate == 2){
            if($("#selectApli").val() == "0"){
                messageToast('Seleccione una aplicación válida','#e51c23');
            }
            else{
                if($("#selectPerfil").val() == "0"){
                    messageToast('Seleccione un perfil válido','#e51c23');
                }
                else{
                    submitForm();
                }
            }
        }
    }

    function submitForm(){
        document.formLog.submit();
    };

    function messageToast(msj,color){
        $.toast({
            heading: 'Mensaje:',
            text : msj,
            position: 'top-left',
            loader: true,        // Change it to false to disable loader
            loaderBg: '#666666',
            bgColor: color,
            showHideTransition: 'plain'
        })
    }

</script>

<c:if test="${mensaje!=null}">
    <script>
        alertaM();
        function alertaM(){
            var msj = '${mensaje}';
            <c:if test="${type == '1'}">
            messageToast(msj,'#e51c23');
            </c:if>
            <c:if test="${type == '3'}">
            messageToast(msj,'#666666');
            </c:if>
        }
        <c:if test="${access!=null}">
        <c:if test="${access!=0}">
        $("#txtUser").val("${user}");
        $("#txtPassword").val("${pass}");

        var select = $("#selectApli");

        CargarAplicaciones();

        function CargarAplicaciones() {
            $.ajax({
                method: "POST",
                url: "/validar/aplicaciones",
                success: function resultado(valor) {
                    select.html(valor);
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }

        function CargarPerfiles() {
            var i = $("#selectApli").val();
            if (i != undefined) {
                $.ajax({
                    method: "POST",
                    url: "/validar/perfil",
                    data: {"i": i},
                    success: function resultado(valor) {
                        $("#selectPerfil").html(valor);
                    },
                    error: function errores(msg) {
                        alert('Error: ' + msg.responseText);
                    }
                });
            }
        }
        </c:if>
        </c:if>
    </script>
</c:if>


<script>
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    x = document.getElementsByClassName("custom-select-log");
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
        except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);
</script>
</body>
</html>
