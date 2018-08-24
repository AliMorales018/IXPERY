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

    public String BuscarAsociado(String idProv, String idServ) throws Exception {
        return odSerProve.BuscarAsociado(idProv,idServ);
    }

    public String RegistrarAsociado(String json, Integer idServSol)throws Exception {
        return odSerProve.RegistrarAsociado(json,idServSol);
    }

    public String ActualizarHistorialPrecio(String json1, String json2, Integer idServ)throws Exception {
        return odSerProve.ActualizarHistorialPrecio(json1, json2, idServ);
    }

    public void RegistrarHistorialPrecio(String json, String idProd, String fechaFin)throws Exception {
        odSerProve.RegistrarHistorialPrecio(json, idProd, fechaFin);
    }

//FIN LUIS
}
