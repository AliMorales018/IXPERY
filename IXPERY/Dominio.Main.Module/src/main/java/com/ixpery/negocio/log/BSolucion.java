package com.ixpery.negocio.log;

import com.ixpery.datos.log.DSolucion;
import com.ixpery.entidades.log.ESolucion;

import java.util.List;

public class BSolucion {
    DSolucion odSol = new DSolucion();

    public BSolucion() throws Exception {
    }

    public String GuardarSolucion(String value) throws Exception{
        String mensaje = odSol.GuardarSolucion(value);
        return mensaje;
    }

    public String BuscarReqProEmp(String value, Integer perfil) throws Exception{
        return odSol.BuscarReqProEmp(value, perfil);
    }

    public String BuscarRequerimientos(Integer perfil) throws Exception{
        return odSol.BuscarRequerimientos(perfil);
    }

    public String BuscarSolucion(String sol) throws Exception{
        return odSol.BuscarSolucion(sol);
    }

    public String BuscarEmpleado(String value) throws Exception{
        return odSol.BuscarEmpleado(value);
    }

    public String BuscarSolPenC() throws Exception{
        return odSol.BuscarSolPenC();
    }


    public String ReporteOperaciones(Integer sol) throws Exception{
        return odSol.ReporteOperaciones(sol);
    }

    public String ReporteGerencia(Integer sol) throws Exception{
        return odSol.ReporteGerencia(sol);
    }

    public String BuscarSolucionesAprobadas() throws Exception{
        return odSol.BuscarSolucionesAprobadas();
    }


}
