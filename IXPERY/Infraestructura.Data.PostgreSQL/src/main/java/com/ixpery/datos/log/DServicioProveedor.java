package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicioProveedor {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public DServicioProveedor() throws Exception {
    }

    // LUIS 23/07/18 10:00 am -- PARA LLENAR COMBO EN FILAS
    public String BuscarProveServicioCombo(String var) throws Exception {
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_precio_otroservicio", listaParametros);
    }
//FIN LUIS
}