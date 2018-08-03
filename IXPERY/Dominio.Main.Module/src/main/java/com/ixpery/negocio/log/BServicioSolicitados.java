package com.ixpery.negocio.log;

import com.ixpery.datos.log.DServicioSolicitados;

public class BServicioSolicitados {
    DServicioSolicitados odServSolic = new DServicioSolicitados();

    public BServicioSolicitados() throws Exception {
    }
    //LUIS 17/07/2018 10:00 AM
    public String BuscarServicioCombo(String var) throws Exception{
        return odServSolic.BuscarServicioCombo(var);
    }
    //FIN LUIS
    //LUIS 02/08/2018 17:00
   /* public String BuscarProductoEquipoCombo(String var) throws Exception{
           return odProducto.BuscarProductoEquipoCombo(var);
    }*/
//FIN LUIS
}
