package com.ixpery.datos.tools;
import com.google.gson.*;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class JsonGeneral {
    private DConexion c = new DConexion();
    private DtUtilitario com = new DtUtilitario(c.ConectarBD());
    private List<SqlParameter> listParametros = new ArrayList<>();
    private Diccionario diccionarioMap = new Diccionario();

    public JsonGeneral() throws Exception{
    }


    public String JsonConvert(String jsonString){
        String json = "";
        Boolean jsonInsert = false;
        if(!jsonString.equals("")){
            JsonParser parser = new JsonParser();
            JsonObject root = parser.parse(jsonString).getAsJsonObject();
            JsonObject newRoot = new JsonObject();

            for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
                String keyRoot = entryRoot.getKey();
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);

                String newKeyRoot = diccionario.get(keyRoot);
                Integer id = NextId(newKeyRoot);


                JsonArray newArrayValue = new JsonArray();
                for(JsonElement jsonElement : arrayValue){
                    JsonObject newObjectChild = new JsonObject();
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        String keyChild = entryChild.getKey();

                        String newKeyChild = diccionario.get(keyChild);
                        if(entryChild.getValue().isJsonObject()) {
                            JsonObject lastObject = new JsonObject();
                            for(Map.Entry<String, JsonElement> entryLast : entryChild.getValue().getAsJsonObject().entrySet()) {
                                String keyLast = entryLast.getKey().substring(0,3);
                                Map<String, String> dic = diccionarioMap.Buscar(keyLast);
                                String newKeyLast = dic.get(entryLast.getKey());
                                lastObject.add(newKeyLast, entryLast.getValue());
                            }
                            newObjectChild.add(newKeyChild, lastObject);

                        }
                        else{
                            if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                                newObjectChild.addProperty(newKeyRoot + "1", id);
                                jsonInsert = true;
                            }
                            else{
                                newObjectChild.add(newKeyChild, entryChild.getValue());
                            }
                        }

                    }
                    newArrayValue.add(newObjectChild);

                    if(jsonInsert){
                        ++id;
                    }
                }
                newRoot.add(newKeyRoot, newArrayValue);
            }

            json = newRoot.toString();

        }

        return  json;
    }




    public String JsonConvertInvert(String jsonString){
        String json = "";
        if(!jsonString.equals("0")){
            if(!jsonString.equals("")){
                JsonParser parser = new JsonParser();
                JsonObject root = parser.parse(jsonString).getAsJsonObject();
                JsonObject newRoot = new JsonObject();

                for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
                    String keyRoot = entryRoot.getKey();
                    JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                    Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);
                    Map<String, String> diccionarioInversed = diccionario.entrySet().stream()
                            .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));

                    String newKeyRoot = diccionarioInversed.get(keyRoot);


                    JsonArray newArrayValue = new JsonArray();
                    for(JsonElement jsonElement : arrayValue){
                        JsonObject newObjectChild = new JsonObject();

                        for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                            String keyChild = entryChild.getKey();

                            String newKeyChild = diccionarioInversed.get(keyChild);
                            if(entryChild.getValue().isJsonObject()) {
                                JsonObject lastObject = new JsonObject();
                                for(Map.Entry<String, JsonElement> entryLast : entryChild.getValue().getAsJsonObject().entrySet()) {
                                    String keyLast = entryLast.getKey().substring(0,5);
                                    Map<String, String> dic = diccionarioMap.Buscar(keyLast);
                                    Map<String, String> dicInversed = dic.entrySet().stream()
                                            .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));

                                    String newKeyLast = dicInversed.get(entryLast.getKey());
                                    lastObject.add(newKeyLast, entryLast.getValue());
                                }
                                newObjectChild.add(newKeyChild, lastObject);

                            }
                            else{
                                newObjectChild.add(newKeyChild, entryChild.getValue());
                            }

                        }
                        newArrayValue.add(newObjectChild);

                    }
                    newRoot.add(newKeyRoot, newArrayValue);

                    JsonObject a = newRoot;


                }

                json = newRoot.toString();
            }

        }
        else {
            json = jsonString;
        }

        return  json;

    }




    public String FusionarJson(String jsonString){
        String json = "";
        String keyRoot = "";
        if(!jsonString.equals("")){
            JsonArray arrayJsonFusion = new JsonArray();

            String[] objJsonSlipt = jsonString.split("//");
            for (String objJson: objJsonSlipt) {
                JsonParser parser = new JsonParser();
                JsonObject root = parser.parse(objJson).getAsJsonObject();

                for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
                    keyRoot = entryRoot.getKey();
                    JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();

                    for(JsonElement jsonElement : arrayValue){
                        arrayJsonFusion.add(jsonElement);
                    }
                }
            }

            JsonObject jsonFusion = new JsonObject();
            jsonFusion.add(keyRoot, arrayJsonFusion);
            json = jsonFusion.toString();
        }

        return  json;
    }





//    public String StringConvert(String cadena){
//        String retorno = "";
//
//        if(!cadena.equals("/")){
//
//
//
//            String[] parts = cadena.split(";");
//
//
//            for(String part : parts){
//                String keyRoot = part.substring(0,3);
//                Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);
//                String[] element = part.split(",");
//                String key = element[0];
//                String value = element[1];
//                String newKey = diccionario.get(key);
//                if(retorno.equals("")){
//                    retorno += newKey + "," + value;
//                }
//                else {
//                    retorno += ";" + newKey + "," + value;
//
//                }
//            }
//        }
//        else{
//            retorno = "/";
//        }
//        return retorno;
//    }


    public String StringConvert(String cadena) throws Exception {
        String retorno = "";

        if(!cadena.equals("/")){



            String[] parts = cadena.split(";");


            for(String part : parts){
                String keyRoot = part.substring(0,3);
                Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);
                String[] element = part.split(",");
                String key = element[0];
                String value = element[1];
                String newKey = diccionario.get(key);
                if(retorno.equals("")){
                    if(value.equals("%")){
                        retorno += newKey + ",";
                    }
                    else{


                        retorno += newKey + "," + value;
                    }
                }
                else {
                    if(value.equals("%")){
                        retorno += ";" + newKey + ",";
                    }
                    else{

//                        if(key.equals("pro2")){
//                            listParametros.clear();
//                            SqlParameter pTab = new SqlParameter("tab", "46009");
//                            SqlParameter pValue = new SqlParameter("value", "460094," + value);
//                            SqlParameter pCamTab1 = new SqlParameter("campTab1", "460091");
//                            SqlParameter pCamTab2 = new SqlParameter("campTab2", "");
//                            listParametros.add(pTab);
//                            listParametros.add(pValue);
//                            listParametros.add(pCamTab1);
//                            listParametros.add(pCamTab2);
//                            String idEmp = com.EjecutaConsultaJson("gen_buscar", listParametros);
//                            value = idEmp;
//                        }

                        retorno += ";" + newKey + "," + value;
                    }

                }
            }
        }
        else{
            retorno = "/";
        }
        return retorno;
    }






    private Integer NextId(String tabla){
        try{
            listParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", tabla);
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



    public String BuscarTabla(String tabla) throws Exception{
        listParametros.clear();
        SqlParameter pNomTabla = new SqlParameter("nomTabla", tabla);
        SqlParameter pValue = new SqlParameter("value", "/");
        listParametros.add(pNomTabla);
        listParametros.add(pValue);
        return com.EjecutaConsultaJson("gen_filtrar_like", listParametros);
//        return jsonGeneral.JsonConvertInvert(cadena,"/");
    }


}
