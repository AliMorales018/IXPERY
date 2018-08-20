package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProyecto {
    private DConexion c = new DConexion();
    private DtUtilitario com = new DtUtilitario(c.ConectarBD());
    private List<SqlParameter> listParametros = new ArrayList<>();
    private JsonGeneral jsonGeneral = new JsonGeneral();
    private static String getTableTipo() { return "46051"; }
    private static String getTableEmpresa() { return "46009"; }
    private static String getTableEmpleado() { return "46227"; }
    private static String getTableProyecto() { return "46051"; }

    public DProyecto() throws Exception { }

    public String GuardarProyecto(String json) throws Exception{
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


    public String BuscarTipo() throws Exception{
        listParametros.clear();
        SqlParameter pNomTabla = new SqlParameter("nomTabla", getTableTipo());
        listParametros.add(pNomTabla);
        return com.EjecutaConsultaJson("log_obtener_estado_tipo_json", listParametros);
    }


//    public String BuscarEmpresaRuc(String campos) throws Exception{
//        listParametros.clear();
//        String value = jsonGeneral.StringConvert(campos);
//        SqlParameter pNomTabla = new SqlParameter("nomTabla", getTableEmpresa());
//        SqlParameter pValue = new SqlParameter("value", value);
//        listParametros.add(pNomTabla);
//        listParametros.add(pValue);
//        String cadena = com.EjecutaConsultaJson("", listParametros);
//        return jsonGeneral.JsonConvertInvert(cadena);
//    }

    public String BuscarEmpresaRuc(String campos) throws Exception{
        listParametros.clear();
//        String value = jsonGeneral.StringConvert(campos);
//        SqlParameter pNomTabla = new SqlParameter("nomTabla", getTableEmpresa());
        SqlParameter pValue = new SqlParameter("value", campos);
//        listParametros.add(pNomTabla);
        listParametros.add(pValue);
        String cadena = com.EjecutaConsultaJson("filtrar_empresa_cliente_j", listParametros);
//        return jsonGeneral.JsonConvertInvert(cadena);
        return cadena;
    }

    public String BuscarEmpleado(String value) throws Exception{
        listParametros.clear();
        SqlParameter pNomTabla = new SqlParameter("nomTabla", getTableEmpleado());
        SqlParameter pValue = new SqlParameter("value", "/,"+value);
        listParametros.add(pNomTabla);
        listParametros.add(pValue);
        String cadena = com.EjecutaConsultaJson("gen_filtrar_like", listParametros);
        return jsonGeneral.JsonConvertInvert(cadena);
    }

    public String BuscarProyecto(String campos) throws Exception{
        String value = jsonGeneral.StringConvert(campos);
//        sol = jsonGeneral.StringConvert(sol);

        if(value.equals("/")){
            value = "460519,1";
        }
        else{
            value = value + ";460519,1";
        }
//        value = "460513,%;460094,JUA;460519,1";

        listParametros.clear();
        SqlParameter pTab = new SqlParameter("tab", getTableProyecto());
        SqlParameter pValue = new SqlParameter("value", value);
        SqlParameter pCamTab1 = new SqlParameter("campTab1", "460511,460513,460514,460515,460517,460518,4605110,4605111,4605112,4605115");
        SqlParameter pCamTab2 = new SqlParameter("campTab2", "460512:460091,460094");
        listParametros.add(pTab);
        listParametros.add(pValue);
        listParametros.add(pCamTab1);
        listParametros.add(pCamTab2);
        String json = com.EjecutaConsultaJson("gen_buscar", listParametros);
        json =  jsonGeneral.JsonConvertInvert(json);
        return json;
    }


    //****************************** Dante ******************************//

    public String BuscarProEmpresaReque(EEmpresa oEmpresa) throws Exception {
        listParametros.clear();
        SqlParameter pIdEmpresa = new SqlParameter("idempresa", oEmpresa.getIdempresa());
        listParametros.add(pIdEmpresa);
        return com.EjecutaConsultaJson("filtrar_proyectoporempresa", listParametros);
    }

    //****************************** Dante ******************************//


}