package com.ixpery.negocio.log;

import com.ixpery.datos.log.DEquipo;
import com.ixpery.entidades.log.EEquipo;
import com.ixpery.entidades.log.EPreRegistroProducto;
import com.ixpery.entidades.log.EProductoSolucion;

import java.util.List;

public class BEquipo {
    DEquipo odEquipo = new DEquipo();

    public BEquipo() throws Exception {
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
    public String ValidarDatosDB(List<EEquipo> listEquipo) throws Exception {
        String result = "";
        result = odEquipo.ValidarDatosDB(listEquipo);
        return result;
    }
    public String PonerIds(List<EEquipo> listEquipo, List<EProductoSolucion> listProdSolucion, List<EPreRegistroProducto> listPreRegProducto) throws Exception {
        String result = "";
        result = odEquipo.PonerIds(listEquipo,listProdSolucion,listPreRegProducto);
        return result;
    }
    public List<EEquipo> Buscar(String campos)throws Exception {
        return odEquipo.BuscarEquipoSolucion(campos);
    }
    //LUIS 17/07/2018 10:00 AM
    public String BuscarSolucionEquipo(String var) throws Exception{
        return odEquipo.BuscarProductoEquipoCombo(var);
    }
    //FIN LUIS
    public  String RetornaTB() throws  Exception{
        return odEquipo.RetornaTB();

    }
    //LUIS 26/07 15:25

    public String GuardarFull(String json) throws Exception{
        String result = "";
        odEquipo.GuardarFull(json);
        return result;
    }

    //FIN LUIS

}
