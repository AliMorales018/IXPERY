package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DSolucion {
    private DConexion c = new DConexion();
    private DtUtilitario com = new DtUtilitario(c.ConectarBD());
    private List<SqlParameter> listParametros = new ArrayList<>();
    private static String getNameTableSolucion() { return "46071"; }
    private static String getTableSolucion() { return "sol"; }
    private static String getNameTableEmpleado() { return "46227"; }

    private JsonGeneral jsonGeneral = new JsonGeneral();

    public DSolucion() throws Exception { }


    public String BuscarReqProEmp(String value, Integer perfil) throws Exception {
        listParametros.clear();
        SqlParameter pCampo = new SqlParameter("value", value);
//        SqlParameter pPerfil = new SqlParameter("perfil", perfil);
        listParametros.add(pCampo);
//        listParametros.add(pPerfil);
        return com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_s", listParametros);
    }


    public String GuardarSolucion(String json) throws Exception{
        try{
            listParametros.clear();
            json = jsonGeneral.JsonConvert(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParametros.add(paramJson);
            String mensaje = com.EjecutaConsultaJson("gen_guardar", listParametros);
            return mensaje;
        }
        catch (Exception e){
            throw e;
        }
    }



    public String BuscarRequerimientos(Integer perfil) throws Exception {
//        select gen_buscar('46061', '460611,', '460611,460613', '460612:460511,460513');
        listParametros.clear();
        SqlParameter pValue = new SqlParameter("value", "/");
        SqlParameter pPerfil = new SqlParameter("perfil", perfil);
        listParametros.add(pValue);
        listParametros.add(pPerfil);
        String json = com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_s", listParametros);
//        json =  jsonGeneral.JsonConvertInvert(json);
        return json;
    }




    public String BuscarSolucion(String sol) throws Exception {
        sol = jsonGeneral.StringConvert(sol);
        listParametros.clear();
        SqlParameter pTab = new SqlParameter("tab", getNameTableSolucion());
        SqlParameter pValue = new SqlParameter("value", sol);
        SqlParameter pCamTab1 = new SqlParameter("campTab1", "460711,460712,460713,460714,460715,460716");
        SqlParameter pCamTab2 = new SqlParameter("campTab2", "");
        listParametros.add(pTab);
        listParametros.add(pValue);
        listParametros.add(pCamTab1);
        listParametros.add(pCamTab2);
        String json = com.EjecutaConsultaJson("gen_buscar", listParametros);
        if(!json.equals("0")){
            json =  jsonGeneral.JsonConvertInvert(json);
        }
        return json;
    }


    public String BuscarEmpleado(String value) throws Exception {
//        select gen_filtrar_concatenado('46227', '462274,462275,462276;A')
//        sol = jsonGeneral.StringConvert(sol);
        listParametros.clear();
        SqlParameter pTab = new SqlParameter("tab", getNameTableEmpleado());
        SqlParameter pValue = new SqlParameter("value", "462273,462274,462275,462276;" + value);
        listParametros.add(pTab);
        listParametros.add(pValue);
        String json = com.EjecutaConsultaJson("gen_filtrar_concatenado", listParametros);
        json =  jsonGeneral.JsonConvertInvert(json);
        return json;
    }


    public String BuscarSolPenC() throws Exception {
        listParametros.clear();
        SqlParameter pValue = new SqlParameter("value", "/");
        listParametros.add(pValue);
        String json = com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_c", listParametros);
        return json;
    }

    public String ReporteOperaciones(Integer sol) throws Exception {
        listParametros.clear();
        SqlParameter pValue = new SqlParameter("value", sol);
        listParametros.add(pValue);
        String json = com.EjecutaConsultaJson("generarreportesp", listParametros);
        return json;
    }

    public String ReporteGerencia(Integer sol) throws Exception {
        listParametros.clear();
        SqlParameter pValue = new SqlParameter("value", sol);
        listParametros.add(pValue);
        String json = com.EjecutaConsultaJson("generarreporte", listParametros);
        return json;
    }

    public String BuscarSolucionesAprobadas() throws Exception {
        listParametros.clear();
        SqlParameter pValue = new SqlParameter("value", "/");
        listParametros.add(pValue);
        String json = com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion_sa", listParametros);
        return json;
    }

    public Integer LastId(){
        try{
            listParametros.clear();
            SqlParameter nomTbl = new SqlParameter("tabla", getNameTableSolucion());
            listParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listParametros);
            Integer lastId = Integer.parseInt(id) - 1;
            return lastId;

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public String VerificarCampoSolucion(String id, String campo) throws Exception {
        id = jsonGeneral.StringConvert(id);
        listParametros.clear();
        SqlParameter pTab = new SqlParameter("tab", getTableSolucion());
        SqlParameter pValue = new SqlParameter("value", id);
        SqlParameter pCamTab1 = new SqlParameter("campTab1", campo);
        SqlParameter pCamTab2 = new SqlParameter("campTab2", "");
        listParametros.add(pTab);
        listParametros.add(pValue);
        listParametros.add(pCamTab1);
        listParametros.add(pCamTab2);
        String json = com.EjecutaConsultaJson("gen_buscar", listParametros);
        if(!json.equals("0")){
            json =  jsonGeneral.JsonConvertInvert(json);
        }
        return json;
    }











}
