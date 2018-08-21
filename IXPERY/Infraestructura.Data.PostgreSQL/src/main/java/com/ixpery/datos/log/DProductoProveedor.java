package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProductoProveedor {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    JsonGeneral jg = new JsonGeneral();
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();
    public static String getNameTable() { return "46713"; }
    public static String getIdProducto() { return "467132"; }
    public static String getIdProveedor() { return "467133"; }

    public DProductoProveedor() throws Exception {
    }

    public String BuscarAsociado(String idProv, String idProd) throws Exception{
        listaParametros.clear();
        SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
        SqlParameter values = new SqlParameter("nomTbl", getIdProveedor()+","+idProv+";"+getIdProducto()+","+idProd);
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
            System.out.println("467132"+","+idProd+","+fechFin+","+"1");
            SqlParameter pJson = new SqlParameter("json",json);
            SqlParameter pValues = new SqlParameter("values", "467132"+","+idProd+","+fechFin+","+"1");
            listaParametros.add(pJson);
            listaParametros.add(pValues);
            com.TransUnica("gen_insertar_historial_precio",listaParametros);
        }
        catch(Exception ex){
            throw ex;
        }
    }
}
