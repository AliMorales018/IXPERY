package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicioProveedor {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();
    JsonGeneral jg = new JsonGeneral();

    public static String getNameTable() { return "46776"; }
    public static String getIdServicio() { return "467762"; }
    public static String getIdProveedor() { return "467763"; }
    public DServicioProveedor() throws Exception {
    }

    // LUIS 23/07/18 10:00 am -- PARA LLENAR COMBO EN FILAS
    public String BuscarProveServicioCombo(String var) throws Exception {
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_precio_otroservicio", listaParametros);
    }

    public String BuscarAsociado(String idProv, String idServ) throws  Exception{
        listaParametros.clear();
        SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
        SqlParameter values = new SqlParameter("nomTbl", getIdProveedor()+","+idProv+";"+getIdServicio()+","+idServ);
        listaParametros.add(nomTbl);
        listaParametros.add(values);
        String a =  com.EjecutaConsultaJson("gen_filtrar",listaParametros);
        if (a.equals("")) {
            return ("0");
        }
        else{
            return ("1");
        }
    }

    public String RegistrarAsociado(String json) throws Exception{
        json = jg.JsonConvert(json);
        listaParametros.clear();
        SqlParameter pjson = new SqlParameter("json", json);
        listaParametros.add(pjson);
        return com.EjecutaConsultaJson("gen_verificar_insertar_json",listaParametros);
    }

    public String ActualizarHistorialPrecio(String json) throws Exception{
        json = jg.JsonConvert(json);
        listaParametros.clear();
        SqlParameter pjson = new SqlParameter("json", json);
        listaParametros.add(pjson);
        return com.EjecutaConsultaJson("gen_guardar",listaParametros);
    }

    public void RegistrarHistorialPrecio(String json, String idProd, String fechFin) throws  Exception{
        try{
            System.out.println(json);
            listaParametros.clear();
            json = jg.JsonConvert(json);
            System.out.println(json);
            System.out.println("467762"+","+idProd+","+fechFin+","+"3");
            SqlParameter pJson = new SqlParameter("json",json);
            SqlParameter pValues = new SqlParameter("values", "467762"+","+idProd+","+fechFin+","+"3");
            listaParametros.add(pJson);
            listaParametros.add(pValues);
            com.TransUnica("gen_insertar_historial_precio",listaParametros);
        }
        catch(Exception ex){
            throw ex;
        }
    }
//FIN LUIS
}