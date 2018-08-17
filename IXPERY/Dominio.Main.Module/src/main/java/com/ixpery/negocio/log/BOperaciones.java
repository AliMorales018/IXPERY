package com.ixpery.negocio.log;

import com.ixpery.datos.log.DOperaciones;

public class BOperaciones {
    DOperaciones odOpera = new DOperaciones();

    public BOperaciones() throws Exception {
    }
    public void RegisterOperaciones(Integer idEmp,Integer idPro,Integer idSol,String cadena,String cond) throws Exception{
        odOpera.RegisterOperaciones(idEmp,idPro,idSol,cadena,cond);
    }

    public String BuscarSolucionOpera(Integer sol) throws Exception{
        return odOpera.BuscarSolucionOpera(sol);
    }

    public String BuscarSolucionesPendientes() throws Exception{
        return odOpera.BuscarSolucionesPendientes();
    }

    public String BuscarSolucionPendiente(String value) throws Exception{
        return odOpera.BuscarSolucionPendiente(value);
    }


}
