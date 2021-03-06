package com.ixpery.negocio.log;

import com.ixpery.datos.log.DServicioSolicitados;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.EServicioProveedor;
import com.ixpery.entidades.log.ESolucion;

public class BServicioSolicitados {
    DServicioSolicitados odServSolic = new DServicioSolicitados();

    public BServicioSolicitados() throws Exception {
    }
    //LUIS 17/07/2018 10:00 AM
    public String BuscarServicioCombo(String var) throws Exception{
        return odServSolic.BuscarServicioCombo(var);
    }

    public String BuscarServiciosCombo(EProveedor oeProv)throws Exception {
        return odServSolic.BuscarServiciosCombo(oeProv);
    }
    public String BuscarServiciosCombo2(String var)throws Exception {
        return odServSolic.BuscarServiciosCombo2(var);
    }

    public String VerHistorialPrecios(EServicioProveedor oeProvProd)throws Exception {
        return odServSolic.VerHistorialPrecios(oeProvProd);
    }

    public String RegistrarPrecioHistorial(EServicioProveedor oeProdProv)throws Exception {
        return odServSolic.RegistrarPrecioHistorial(oeProdProv);
    }

    public String GuardarFull(String json, String idsersoli,String fecfin) throws Exception{
        String result = "";
        odServSolic.GuardarFull(json,idsersoli,fecfin);
        return result;
    }

    public String Buscar(String campos) throws Exception{
        return odServSolic.BuscarServSolic(campos);
    }

    public String Guardar(String json) throws Exception{
        String result = "";
        odServSolic.Guardar(json);
        return result;
    }

    public String ListarServNOBBDDSolucion(ESolucion oeSolucion)throws Exception {
        return odServSolic.ListarServNOBBDDSolucion(oeSolucion);
    }

    public String ListarServInsumo(String valor)throws Exception {
        return odServSolic.ListarServInsumo(valor);
    }

    public String  RegistrarServicioAsociado(String cadena)throws Exception {
        return odServSolic.RegistrarSerAsociado(cadena);
    }
    //FIN LUIS
    //LUIS 02/08/2018 17:00
   /* public String BuscarProductoEquipoCombo(String var) throws Exception{
           return odProducto.BuscarProductoEquipoCombo(var);
    }*/
//FIN LUIS
}
