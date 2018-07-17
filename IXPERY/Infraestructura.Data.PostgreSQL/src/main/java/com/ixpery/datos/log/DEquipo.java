package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EEquipo;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DEquipo {
    public static String getNameTable() { return "46702"; }
    public static String getKeyId() { return "467021"; }
    public static String getKeyNombre() { return "467022"; }
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();
    public DEquipo() throws Exception {
    }

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

    public List<EEquipo> AddListId(List<EEquipo> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdEquipo(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public void InsertarEquipo(List<EEquipo> listEquipo) {
        try {
            listEquipo = AddListId(listEquipo);
            String json = ReturnJson(listEquipo);
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public String ConsultarCliente(int idCliente) throws Exception {
        listaParametros.clear();
        SqlParameter pIdCliente = new SqlParameter("@idCliente", idCliente);
        listaParametros.add(pIdCliente);
        String json = com.EjecutaConsultaJson("filtrar_empresa_cliente", listaParametros);
        //CONVERTIR JSON A LISTA DE OBJETOS
        String listMenuPerfil = new String();
        System.out.println(listMenuPerfil);
        return json;
    }

    public String ConsultarProducto(String consulta) throws Exception{
        listaParametros.clear();
        SqlParameter pConsulta = new SqlParameter("@consulta", consulta);
        listaParametros.add(pConsulta);
        String json = com.EjecutaConsultaJson("filtrar_producto", listaParametros);
        System.out.println(json);
        return json;
    }



}
