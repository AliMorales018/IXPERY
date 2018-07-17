package com.ixpery.datos.tools;

import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DTest {
    DConexion conexion = new DConexion();
    DtUtilitario u = new DtUtilitario(conexion.ConectarBD());

    public DTest() throws Exception {
    }

    public String DMensaje() throws Exception{
        //return "Mensaje desde datos";

        //List<SqlParameter> lista = new ArrayList<SqlParameter>();
        //List<String[]> list = u.EjecutaConsulta("pruebalo",lista);
        //String[] fila = list.get(0);
        return "HolA";
    }
}
