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

    public String JsonConvertId(String jsonString){
        String json = "";
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
                        newObjectChild.addProperty(newKeyRoot + "1", id);


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
                            newObjectChild.add(newKeyChild, entryChild.getValue());
                        }

                    }
                    newArrayValue.add(newObjectChild);
                    ++id;


                }


                newRoot.add(newKeyRoot, newArrayValue);

                JsonObject a = newRoot;


            }

            json = newRoot.toString();


        }

        return  json;
    }



    public String JsonConvert(String jsonString){
        String json = "";
        if(!jsonString.equals("")){
            JsonParser parser = new JsonParser();
            JsonObject root = parser.parse(jsonString).getAsJsonObject();
            JsonObject newRoot = new JsonObject();

            for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
                String keyRoot = entryRoot.getKey();
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);

                String newKeyRoot = diccionario.get(keyRoot);


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

        return  json;
    }












//    public String JsonConvertInvert(String jsonString){
//        String json = "";
//        if(!jsonString.equals("")){
//            JsonParser parser = new JsonParser();
//            JsonObject root = parser.parse(jsonString).getAsJsonObject();
//            JsonObject newRoot = new JsonObject();
//
//            for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
//                String keyRoot = entryRoot.getKey();
//                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
//                Map<String, String> diccionario = diccionarioMap.Buscar(keyRoot);
//                Map<String, String> diccionarioInversed = diccionario.entrySet().stream()
//                        .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));
//
//                String newKeyRoot = diccionarioInversed.get(keyRoot);
//
//
//                JsonArray newArrayValue = new JsonArray();
//                for(JsonElement jsonElement : arrayValue){
//                    JsonObject newObjectChild = new JsonObject();
//
//                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
//                        String keyChild = entryChild.getKey();
//                        String newKeyChild = diccionarioInversed.get(keyChild);
//
//                        if(entryChild.getValue().isJsonObject()) {
//                            JsonObject lastObject = new JsonObject();
//                            for(Map.Entry<String, JsonElement> entryLast : entryChild.getValue().getAsJsonObject().entrySet()) {
//                                String keyLast = entryLast.getKey().substring(0,5);
//                                Map<String, String> dic = diccionarioMap.Buscar(keyLast);
//                                Map<String, String> dicInversed = dic.entrySet().stream()
//                                        .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));
//
//                                String newKeyLast = dicInversed.get(entryLast.getKey());
//                                lastObject.add(newKeyLast, entryLast.getValue());
//                            }
//                            newObjectChild.add(newKeyChild, lastObject);
//
//                        }
//                        else{
//                            newObjectChild.add(newKeyChild, entryChild.getValue());
//                        }
//
//                    }
//                    newArrayValue.add(newObjectChild);
//
//
//                }
//
//
//                newRoot.add(newKeyRoot, newArrayValue);
//
//                JsonObject a = newRoot;
//
//
//            }
//
//            json = newRoot.toString();
//
//
//        }
//
//        return  json;
//
//    }



    public String JsonConvertInvert(String jsonString, String campos){
        String json = "";
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

                        if(!campos.equals("/")){
                            String[] idCampo = campos.split(",");
                            for (String id: idCampo) {
                                if(keyChild.substring(5).equals(id)){

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



                            }
                        }

                        else{
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


                    }
                    newArrayValue.add(newObjectChild);


                }


                newRoot.add(newKeyRoot, newArrayValue);

                JsonObject a = newRoot;


            }

            json = newRoot.toString();


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




}
