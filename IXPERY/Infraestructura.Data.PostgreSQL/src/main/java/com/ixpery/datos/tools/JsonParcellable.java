package com.ixpery.datos.tools;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.List;

public class JsonParcellable {
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson gsonTwo = new Gson();
    JsonObject jsonObject = new JsonObject();
    JsonParser parser = new JsonParser();
    List<JsonElement> listJsonElement = new ArrayList<JsonElement>();
    List<String> listNames = new ArrayList<String>();

    public JsonParcellable() {
    }
    
    public void addObjectParse(String nameObject, Object object){
        JsonElement jsonElement = gson.toJsonTree(object);
        listJsonElement.add(jsonElement);
        this.listNames.add(nameObject);
    }
    
    public String getJsonParcellable(Integer type){   
        String json;
        for (int i = 0; i < this.listJsonElement.size(); i++) {
            jsonObject.add(listNames.get(i),listJsonElement.get(i));
        }
        if(type == 1){
            json = gson.toJson(this.jsonObject);      
        }
        else{
            json = gsonTwo.toJson(this.jsonObject); 
        }
        return json;
    }
    
    public Object getObjectJson(String json, Object objClase){
        try { 
            
            JsonObject jsonObj = parser.parse(json).getAsJsonObject();

            String Key = jsonObj.keySet().toString();

            Key = Key.substring(1,Key.length()-1);

            System.out.println("Key: "+ Key);

            JsonObject gsonObject = jsonObj.get(Key).getAsJsonObject();

            System.out.println("JsonObject: " + gsonObject);
              
            Object objectClass = gson.fromJson(gsonObject, objClase.getClass());
                              
            return objectClass;
        } 
        catch (JsonParseException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public List<Object> getListObjectJson(String json, Object objClase){
        try { 
            
            //List Objects
            
            List<Object> listObject = new ArrayList<Object>();
            
            JsonObject jsonObj = parser.parse(json).getAsJsonObject();

            String Key = jsonObj.keySet().toString();

            Key = Key.substring(1,Key.length()-1);

            System.out.println("Key: "+ Key);
            
            //Gson Array
            
            JsonArray array = jsonObj.get(Key).getAsJsonArray();
            
            Integer Index = 1;
            for (JsonElement jsonElement : array) {
                System.out.println("JsonElement "+Index+": " + jsonElement);
                listObject.add(gson.fromJson(jsonElement,objClase.getClass()));
                Index ++;
            }
                             
            return listObject;
        } 
        catch (JsonParseException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }
}
