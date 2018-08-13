package com.ixpery.negocio.log;

import com.ixpery.datos.log.DServicioProveedor;

public class BServicioProveedor {
    DServicioProveedor odSerProve = new DServicioProveedor();

    public BServicioProveedor() throws Exception {
    }
    // LUIS 23/07/2018 10:00 AM
    public String BuscarProveServicioCombo(String var) throws Exception{
        return odSerProve.BuscarProveServicioCombo(var);
    }
//FIN LUIS
}
