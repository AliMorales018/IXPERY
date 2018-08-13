var JSONobjGeneralOpera;

function Registrar_Operaciones() {
    if($("#selectEmpresa_Proyecto_Sol_Opera").val()!==null){

        let data = $("#selectEmpresa_Proyecto_Sol_Opera").select2('data');

        let idEmp=data[0].idempresa;
        let idPro=data[0].idproyecto;
        let idSol=data[0].id;

        let txtOfer=$("#txt_validezofer_opera").val();
        let txtEntre=$("#txt_timeentre_opera").val();
        let txtEjecu=$("#txt_timeejecu_opera").val();

        let cadena=txtOfer+":-)"+txtEntre+":-)"+txtEjecu;
        let txtCond=$("#txt_condcomer_opera").val();

        if(verificaCajas(txtOfer,"txt_validezofer_opera") === true &&
           verificaCajas(txtEntre,"txt_timeentre_opera")  === true &&
           verificaCajas(txtEjecu,"txt_timeejecu_opera")  === true &&
           verificaCajas(txtCond,"txt_condcomer_opera")   === true
        ){
            //alert("Todos Ok");
            $.ajax({
                method: "POST",
                url: "/operaciones/register",
                data: {"idEmp":idEmp,"idPro":idPro,"idSol":idSol,"cadena":cadena,"cond":txtCond},
                success: function resultado(valor) {

                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }else{
            alert("Faltan completar campos");
        }



    }else{
        alert("Selecione una Solución o Empresa por favor...");
    }
}
function verificaCajas(valCaja,id){
    if(valCaja!==""){
       $("#"+id).removeClass('is-invalid');
        return true;
    }else{
        $("#"+id).addClass('is-invalid');
        return false;
    }
}


