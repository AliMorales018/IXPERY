package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DOperaciones {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();

    public DOperaciones() throws Exception { }

    public void RegisterOperaciones(Integer idEmp,Integer idPro,Integer idSol,String cadena,String cond) throws Exception{
        listParameter.clear();
        SqlParameter paramIdEmp = new SqlParameter("@json", idEmp);
        SqlParameter paramidPro = new SqlParameter("@json", idPro);
        SqlParameter paramidSol = new SqlParameter("@json", idSol);
        SqlParameter paramcadena= new SqlParameter("@json", cadena);
        SqlParameter paramcond  = new SqlParameter("@json", cond);

        listParameter.add(paramIdEmp);
        listParameter.add(paramidPro);
        listParameter.add(paramidSol);
        listParameter.add(paramcadena);
        listParameter.add(paramcond);

        com.TransUnica("crear_reg_cotizacion", listParameter);
    }

    //LUIS 21/07/18 10:49 --
    public String BuscarSolucionOpera() throws Exception{
        listParameter.clear();
  /*      SqlParameter pValorLike = new SqlParameter();
        listParameter.add(pValorLike);*/
        return com.EjecutaConsultaJson("retornar_condicion", listParameter);
    }
}
