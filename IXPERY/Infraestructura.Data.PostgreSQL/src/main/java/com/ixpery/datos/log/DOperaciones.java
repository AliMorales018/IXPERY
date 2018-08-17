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

    public String BuscarSolucionOpera(Integer sol) throws Exception{
        listParameter.clear();
        SqlParameter pValue = new SqlParameter("value", sol);
        listParameter.add(pValue);
        String mensaje = com.EjecutaConsultaJson("filtrar_cotizacion_j", listParameter);
        return mensaje;
    }


    public String BuscarSolucionesPendientes() throws Exception{
        listParameter.clear();
        SqlParameter pValue = new SqlParameter("value", "/");
        listParameter.add(pValue);
        String json = com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_o", listParameter);
        return json;
    }

    public String BuscarSolucionPendiente(String value) throws Exception{
        listParameter.clear();
        SqlParameter pValue = new SqlParameter("value", value);
        listParameter.add(pValue);
        String json = com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_o", listParameter);
        return json;
    }




}
