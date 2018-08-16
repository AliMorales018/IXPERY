package com.ixpery.negocio.log;

import com.ixpery.datos.log.DOperaciones;

public class BOperaciones {
    DOperaciones odOpera = new DOperaciones();

    public BOperaciones() throws Exception {
    }
    public void RegisterOperaciones(Integer idEmp,Integer idPro,Integer idSol,String cadena,String cond) throws Exception{
        odOpera.RegisterOperaciones(idEmp,idPro,idSol,cadena,cond);
    }

    //LUIS 17/07/2018 10:00 AM
    public String BuscarSolucionOpera() throws Exception{
        return odOpera.BuscarSolucionOpera();
    }

    public String BuscarSolucionesPendientes() throws Exception{
        return odOpera.BuscarSolucionesPendientes();
    }




}
