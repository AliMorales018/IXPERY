
function agregar_nuevo_SalarioCL() {
    if ($("#contenedor_nuevo_precio_cl_hs").css("visibility") !== "visible") {
        if ($("#selectCargoLaboral_histsal").val() !== "") {
            $("#btn_historialsal_save").removeAttr("disabled");
            $("#contenedor_nuevo_precio_cl_hs").css("visibility", "visible");
        }
    }
}

function ocultar_precio_nuevo_hscl() {
    $("#btn_historialsal_save").attr("disabled",true);
    $("#contenedor_nuevo_precio_cl_hs").css("visibility", "hidden");
    $("#new_date_hs_cl").val("");
    $("#new_precio_hs_cl").val("");
}

function ListarHistorial_SalariosCL(idCargo){
    if(idCargo !== "") {
        $("#btn_historialsal_nue").removeAttr("disabled");
        ocultar_precio_nuevo_hscl();
        //console.log("IDCARGO: " + idCargo);
        $.ajax({
            method: "POST",
            url: "/verhistorialcargolab",
            data: {"idCL":idCargo},
            success: function resultado(data) {
                //console.log(data);
                let JSONobj = JSON.parse(data);
                //console.log(JSONobj);
                if(JSONobj.hic.length > 0) {
                    $("#tbody_historialsalariocl").empty();
                    let estado;
                    let contador;
                    contador = 1;
                    $.each(JSONobj.hic, function (obj, item) {
                        let estado = item.hic5 === "1"? "<i class='icon-checkmark icon-hp-habil'></i>":"<i class='icon-cross icon-hp-desh'></i>";
                        //let claseUltReg = item.hic3 === "0"? "class='ult_reg_cl'":"";
                        let row = "<tr>" +
                            "<td class='text-center'><p class='text-center' style='font-size: 11px'>" + contador + "</p></td>" +
                            "<td class='text-center'><span>" + item.hic2 + "</span></td>" +
                            "<td class='text-center'><span>" + item.hic3 + "</span></td>" +
                            "<td class='text-center text-primary'><span><b>S/ " + parseFloat(item.hic4) + "</b></span></td>" +
                            "<td class='text-center'><span>" + estado + "</span></td>" +
                            "</tr>";

                        $("#tbody_historialsalariocl").append(row);
                        contador++;
                    });
                }
                else{
                    $("#tbody_historialsalariocl").html("<tr><td colspan='5' class='text-center'><div style='padding: 4px; font-size: 10px'>No se encontraron resultados.</div></td></tr>");
                }
            },
            error: function errores(msg) {
                alert('Error: ' + msg.responseText);
            }
        });
    }
}

function guardar_nuevo_SalarioCL(){
    let idCargo = $("#selectCargoLaboral_histsal").val();
    if ($("#new_date_hs_cl").val() !== "" && $("#new_precio_hs_cl").val() !== "") {
        let data = {
            "hic": [
                {
                    "hic1": 0,
                    "hic2": {
                        "cal1": parseInt(idCargo)
                    },
                    "hic3": $("#new_date_hs_cl").val(),
                    "hic5": parseFloat($("#new_precio_hs_cl").val()),
                    "hic6": "1"
                }
            ]
        };
        let FechaIni = new Date($("#new_date_hs_cl").val());
        let FechaFin = sumOresDias_HS(FechaIni, -1);
        FechaFin = convertDate_HS(FechaFin);
        //console.log(FechaFin);

        let ultimaFecha = $("#tbody_historialsalariocl tr:last-child td").eq(1).find("span").text();

        function compararFechas(){
            if(Date.parse(FechaIni) <= Date.parse(ultimaFecha)){
                return false;
            }
            else{
                return true;
            }
        }

        if (compararFechas()) {
            $.ajax({
                method: "POST",
                url: "/historialsalariocl/register",
                data: {"json": JSON.stringify(data), "idCargo": idCargo, "fechafin": FechaFin},
                success: function resultado(data) {
                    if (data === "") {
                        //Cargar otra vez la tabla
                        ListarHistorial_SalariosCL(idCargo);
                    }
                },
                error: function errores(msg) {
                    alert('Error: ' + msg.responseText);
                }
            });
        }
        else{
            alert("La Fecha de inicio debe ser mayor a la última fecha de registro.");
        }
    }else{
        alert("Complete los campos necesarios para registrar un nuevo salario.");
    }
}

function sumOresDias_HS(fecha,dias) {
    fecha.setDate(fecha.getDate() + dias + 1);
    return fecha;
}

function convertDate_HS(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }

    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
}