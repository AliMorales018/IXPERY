package com.ixpery.controladores.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.entidades.log.*;
import com.ixpery.entidades.rhh.ECargoLaboral;
import com.ixpery.negocio.log.BCargoLaboral;
import com.ixpery.negocio.log.BServicio;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CServicios {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BCargoLaboral obCargoLaboral = (BCargoLaboral) applicationContext.getBean("beanCargoLaboral");
    BServicio obServicio = (BServicio) applicationContext.getBean("beanServicio");

    @RequestMapping("/servicios")
    public ModelAndView Servicios() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/servicios");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping("/servicios/listarcargolaboral")
    public @ResponseBody String listarCargoLaboral(
            @RequestParam(value="q") String value
    ) throws  Exception{
        return obCargoLaboral.ListarCargoLaboralCombo(value);
    }

    @RequestMapping(value = "/servicios/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarServicio(
            HttpServletRequest request,
            @RequestBody String json
    ) throws  Exception{
        System.out.println(json);
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        //HttpSession session = request.getSession();
        JsonParser parser = new JsonParser();
        JsonObject root = parser.parse(json).getAsJsonObject();
        for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
            String keyRoot = entryRoot.getKey();
            if(keyRoot.equals("ser")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("ser12", timestamp.toString());
                            //objJSON.addProperty("ser13", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
            if(keyRoot.equals("act")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && Integer.parseInt(entryChild.getValue().toString()) < 0){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("act13", timestamp.toString());
                            //objJSON.addProperty("act14", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
            if(keyRoot.equals("acc")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("acc12", timestamp.toString());
                            //objJSON.addProperty("acc11", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
            if(keyRoot.equals("pet")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("pet8", timestamp.toString());
                            //objJSON.addProperty("pet9", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
        }
        json = root.toString();
        String a = obServicio.GuardarFull(json);
        System.out.println(json);
        if(a.equals("0")){
            return "";
        }
        else{
            return a;
        }
    }

    @RequestMapping("/servicios/cotizacion")
    public ModelAndView ServiciosCotizacion() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/cotizacionservicio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }
    @RequestMapping(value = "/servicios/verservicio", method = RequestMethod.POST)
    public @ResponseBody String VerServicio(
            @RequestParam(value="id") Integer idSolucion
    ) throws  Exception{
        return obServicio.VerServicio(idSolucion);
    }
}
