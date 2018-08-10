package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicioSolicitados {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();

    public static String getNameTable() { return "46771"; }
    public static String getKeyId() { return "467711"; }
    public static String getKeyNombre() { return "467713"; }
    public String RetornaTB(){ return "46771"; }

    public DServicioSolicitados() throws Exception {
    }

    //LUIS 03/08/18 12:15 am -- PARA LLENAR COMBO EN FILAS
    public String BuscarServicioCombo(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_serviciossolicitados", listParameter);
    }
//FIN LUIS
}