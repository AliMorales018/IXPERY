function validaEmail(idText,idRpta,e){

    document.getElementById(idText).addEventListener('input', function() {
        campo = event.target;
        texto= document.getElementById(idText);
        valido = document.getElementById(idRpta);
        emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (emailRegex.test(campo.value)) {
            valido.innerHTML = "<span id='sp_"+idText+"' style='color: green; display: inline'>**Correcto</span>";
        }else{
            valido.innerHTML="<span style='color: red;'>**Incorrecto</span>";
        }
        console.log(valido);
    });
}