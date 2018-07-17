package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DSolucion {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listParametros = new ArrayList<>();
    String myId = "";
    public static String getNameTable() { return "46071"; }
    public static String getKeyIdSol() {return "460711";}
    public static String getKeyIdReq() {return "460712";}
    public static String getKeyNomSol() {return "460713";}

    public DSolucion() throws Exception { }

    public String ReturnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public Integer NextId(){
        try{
            listParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
            listParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listParametros);
            System.out.println(id);
            myId = id;
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<ESolucion> AddListId(List<ESolucion> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdsolucion(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public String ValidarDatosDB(List<ESolucion> listSol) throws Exception{
        try{
            listSol = AddListId(listSol);
            String json;
            Integer size = listSol.size();
            if(size > 1){
                json = ReturnJson(listSol);
            }
            else{
                ESolucion oeSol = listSol.get(0);
                json = ReturnJson(oeSol);
            }
            listParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalida = new SqlParameter("@reporte", "");
            paramSalida.Direction = ParameterDirection.Output;
            listParametros.add(paramJson);
            listParametros.add(paramSalida);
            com.TransUnica("gen_verificar_json", listParametros);
            String mensaje = paramSalida.Value.toString();
            if (mensaje.equals("0")){
                InsertarSolucion(json);
                mensaje = myId;
                return mensaje;
            }
            else return "ACA: " + mensaje;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void InsertarSolucion(String json) throws Exception{
        try{
            listParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParametros.add(paramJson);
            com.TransUnica("gen_insertar_json", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public String BuscarSolucionPorRequerimiento(Integer req) throws Exception {
        listParametros.clear();
        SqlParameter pCampo = new SqlParameter("req", req);
        listParametros.add(pCampo);
        return com.EjecutaConsultaJson("filtrar_empresa_cliente", listParametros);
    }







}
