package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EProductoSolucion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProductoSolucion {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DProductoSolucion() throws Exception {
    }

    public static String getNameTable() { return "46728"; }
    public static String getKeyId() { return "467281"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ReturnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public Integer NextId(){
        try{
            listaParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
            listaParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listaParametros);
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<EProductoSolucion> AddListId(List<EProductoSolucion> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdProductoSolucion(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public void InsertarProductoSolucion(List<EProductoSolucion> listProSol) {
        try {
            listProSol = AddListId(listProSol);
            String json = ReturnJson(listProSol);
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }






}
