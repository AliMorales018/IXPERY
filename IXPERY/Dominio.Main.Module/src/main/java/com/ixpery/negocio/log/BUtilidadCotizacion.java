package com.ixpery.negocio.log;

import com.ixpery.datos.log.DUtilidadCotizacion;

public class BUtilidadCotizacion {
    DUtilidadCotizacion odUtiCoti = new DUtilidadCotizacion();

    public BUtilidadCotizacion() throws Exception {
    }

    //LUIS 17/07/2018 10:00 AM
    public String BuscarSolucionUtiCoti(String var) throws Exception{
        return odUtiCoti.BuscarSolucionUtiCoti(var);
    }

    public String CalTotalCotiUtilidad(String cadena) throws Exception{
        return odUtiCoti.CalTotalCotiUtilidad(cadena);
    }

    public void RegisterUtiCoti(String cadena) throws Exception{
        odUtiCoti.RegisterUtiCoti(cadena);
    }
    //FIN LUIS
}
