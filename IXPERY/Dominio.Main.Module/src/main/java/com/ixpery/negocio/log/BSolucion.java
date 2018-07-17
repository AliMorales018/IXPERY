package com.ixpery.negocio.log;

import com.ixpery.datos.log.DSolucion;
import com.ixpery.entidades.log.ESolucion;

import java.util.List;

public class BSolucion {
    DSolucion odSol = new DSolucion();

    public BSolucion() throws Exception {
    }

    public String Insertar(List<ESolucion> listSol) throws Exception{
        String result = "";
        result = odSol.ValidarDatosDB(listSol);
        return result;
    }

    public String BuscarSolucionPorRequerimiento(Integer req) throws Exception{
        return odSol.BuscarSolucionPorRequerimiento(req);
    }


}
