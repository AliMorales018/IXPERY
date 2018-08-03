package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.DtUtilitario;

public class DServicioSolicitados {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DServicioSolicitados() throws Exception { }
}
