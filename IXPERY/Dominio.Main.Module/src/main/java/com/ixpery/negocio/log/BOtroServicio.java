package com.ixpery.negocio.log;

import com.ixpery.datos.log.DOtroServicio;
import com.ixpery.entidades.log.*;

import java.util.List;

public class BOtroServicio {
    DOtroServicio odOtroServicio = new DOtroServicio();

    public BOtroServicio() throws Exception {
    }

//    public void Insetar(List<EEquipo> listEquipo){
//        odEquipo.InsertarEquipo(listEquipo);
//    }

    /*public String ConsultarCliente(int idCliente) throws Exception {
        return odEquipo.ConsultarCliente(idCliente);
    }*/

    /*public String ConsultarProducto(String consulta) throws Exception{
        return odEquipo.ConsultarProducto(consulta);
    }*/
    public String ValidarDatosDB(List<EOtroServicio> listOtroServicio) throws Exception {
        String result = "";
        result = odOtroServicio.ValidarDatosDB(listOtroServicio);
        return result;
    }
    /*public String PonerIds(List<EOtroServicio> listOtroServicio, List<EServicioSolucion> listServSolucion, List<EPreRegistroServicio> listPreRegServicio) throws Exception {
        String result = "";
        result = odOtroServicio.PonerIds(listOtroServicio,listServSolucion,listPreRegServicio);
        return result;
    }*/
    public List<EEquipo> Buscar(String campos)throws Exception {
        return odOtroServicio.BuscarEquipoSolucion(campos);
    }
    //LUIS 17/07/2018 10:00 AM
    public String BuscarSolucionOtroServ(String var) throws Exception{
        return odOtroServicio.BuscarSolucionOtroServ(var);
    }
    //FIN LUIS

    public  String RetornaTB() throws  Exception{
        return odOtroServicio.RetornaTB();

    }

    public String PonerIds(List<EOtroServicio> listOtroServ, List<EServicioSolucion> listServSolucion, List<EPreRegistroServicio> listPreRegServicio) throws Exception {
        String result = "";
        result = odOtroServicio.PonerIds(listOtroServ,listServSolucion,listPreRegServicio);
        return result;
    }

    //LUIS 06/08 18:32

    public String GuardarFull(String json) throws Exception{
        String result = "";
        odOtroServicio.GuardarFull(json);
        return result;
    }

    //FIN LUIS
    //LUIS 17/07/2018 10:00 AM
    public String BuscarSolucionOtroServicio(String var) throws Exception{
        return odOtroServicio.BuscarServiOtroCombo(var);
    }
    //FIN LUIS
}
