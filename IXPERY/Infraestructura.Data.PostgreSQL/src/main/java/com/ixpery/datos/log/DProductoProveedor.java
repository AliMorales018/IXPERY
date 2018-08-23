package com.ixpery.datos.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;
import com.sun.deploy.net.HttpRequest;


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

    public String RegistrarAsociado(String json, Integer idProdSol) throws Exception{
        json = jg.JsonConvert(json);
        listaParametros.clear();
        SqlParameter pjson = new SqlParameter("json", json);
        listaParametros.add(pjson);
        String a = com.EjecutaConsultaJson("gen_verificar_insertar_json",listaParametros);
        //Regostrar Id ProductoSolucion - Registrar Id ProductoProveedor
        if (idProdSol != null) {
            listaParametros.clear();

            JsonParser parser = new JsonParser();
            JsonObject root = parser.parse(json).getAsJsonObject();
            Integer idProdProveedor = root.get("46713").getAsJsonArray().get(0).getAsJsonObject().get("467131").getAsInt();

            SqlParameter idProdSolu = new SqlParameter("idProSol", idProdSol);
            SqlParameter idProdProv = new SqlParameter("idProdProv", idProdProveedor);
            listaParametros.add(idProdSolu);
            listaParametros.add(idProdProv);
            com.TransUnica("historialprecio_prodsol",listaParametros);
        }
        return a;
    }

    public String ActualizarHistorialPrecio(String json1,String json2, Integer idProd) throws Exception{
        json1 = jg.JsonConvert(json1);
        json2 = jg.JsonConvert(json2);
        listaParametros.clear();
        SqlParameter pjson = new SqlParameter("json", json1);
        listaParametros.add(pjson);
        String a = com.EjecutaConsultaJson("gen_guardar",listaParametros);
        //Recalcular
        listaParametros.clear();
        SqlParameter pJson = new SqlParameter("json",json2);
        System.out.println("JSON ENVIADO: "+json2);
        System.out.println("CADENA ENVIADA: "+"467132"+","+idProd+",0,1");
        SqlParameter pValues = new SqlParameter("values", "467132"+","+idProd+",0,1");
        listaParametros.add(pJson);
        listaParametros.add(pValues);
        com.TransUnica("gen_insertar_historial_precio",listaParametros);
        return a;
    }

    public void RegistrarHistorialPrecio(String json, String idProd, String fechFin) throws  Exception{
        try{
            System.out.println(json);
            listaParametros.clear();
            json = jg.JsonConvert(json);
            System.out.println("JSON REGISTER: "+json);
            System.out.println("CADENA REGISTER: "+"467132"+","+idProd+","+fechFin+","+"1");
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
