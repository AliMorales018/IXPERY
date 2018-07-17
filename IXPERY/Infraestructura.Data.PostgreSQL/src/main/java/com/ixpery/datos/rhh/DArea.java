package com.ixpery.datos.rhh;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.rhh.EArea;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DArea {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParametros = new ArrayList<SqlParameter>();

    public static  String getNameTable() { return "46197"; }
    public static String getKeyId() {return "461971";}
    public static String getKeyNom() {return "461972";}

    public DArea() throws Exception { }

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
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<EArea> AddListId(List<EArea> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdArea(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public String ValidarDatosDB(List<EArea> listArea) throws Exception{
        try{
            listArea = AddListId(listArea);
            String json;
            Integer size = listArea.size();
            if(size > 1){
                json = ReturnJson(listArea);
            }
            else{
                EArea oeApp = listArea.get(0);
                json = ReturnJson(oeApp);
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
                InsertarArea(json);
                return "0";
            }
            else return mensaje;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void InsertarArea(String json) throws Exception{
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

    public void ModificarArea(EArea oeArea) throws Exception{
        try {
            String json = ReturnJson(oeArea);
            String campos = getKeyId() + "," + oeArea.getIdArea();
            listParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            SqlParameter pCampos = new SqlParameter("@campos", campos);
            listParametros.add(pJson); listParametros.add(pCampos);
            com.TransUnica("gen_actualizar", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void EliminarArea(String id) throws Exception{
        try {
            String campos = getKeyId() + "," + id;
            listParametros.clear();
            SqlParameter parTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter parId = new SqlParameter("@ids", campos);
            listParametros.add(parTabla); listParametros.add(parId);
            com.TransUnica("gen_eliminar", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public List<EArea> BuscarArea(String campos) throws Exception{
        try {
            if(!campos.equals("/")){
                String[] addColumna = campos.split(",");
                Integer length = addColumna.length;
                for(int i = 0; i < length; ++i){
                    if(addColumna[i].equals("%")){
                        addColumna[i] = "";
                    }
                }
                campos = getKeyNom() + "," + addColumna[0];
                System.out.println("Campos: " + campos);
            }
            listParametros.clear();
            SqlParameter parTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter paraCampo = new SqlParameter("campos", campos);
            listParametros.add(parTabla); listParametros.add(paraCampo);
            String json = com.EjecutaConsultaJson("gen_filtrar_like", listParametros);

            List<EArea> listArea = new ArrayList<EArea>();
            if(!json.equals("")){
                JsonParcellable parser = new JsonParcellable();
                List<Object> listObject = parser.getListObjectJson(json, new EArea());
                for(int i = 0; i < listObject.size(); ++i){
                    EArea oeArea = (EArea) listObject.get(i);
                    listArea.add(oeArea);
                }
            }
            System.out.println("LISTA: " + listArea);
            return listArea;
        }
        catch (Exception ex){
            throw ex;
        }
    }
}


