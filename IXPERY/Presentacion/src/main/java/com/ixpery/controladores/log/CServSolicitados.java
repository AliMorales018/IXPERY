package com.ixpery.controladores.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.negocio.log.BServicioSolicitados;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Controller

public class CServSolicitados {ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BServicioSolicitados obServSolic =(BServicioSolicitados) applicationContext.getBean("beanServSolicitados");
//fdfdf
    @RequestMapping("/servsolic")
    public ModelAndView ServSolic(){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/servsolicitados");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/servsolic/buservsolic", method=RequestMethod.POST)
    public @ResponseBody
    String BuscarProyecto(
            @RequestParam(value="bus") String bus
    ) throws Exception {
        String campos = "";
        if(bus.equals("")){
            campos="/";
        }
        else{
            if(bus.equals("")){ bus = "%"; }
            campos = "sso3," + bus;
        }
        String jsonReturn = obServSolic.Buscar(campos);
        return jsonReturn;
    }

    @RequestMapping(value="/servsolic/guardarfull", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarFullServSolic(
            HttpServletRequest request,
            @RequestBody String json
    ) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        HttpSession session = request.getSession();
        JsonParser parser = new JsonParser();
        JsonObject root = parser.parse(json).getAsJsonObject();
        for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
            String keyRoot = entryRoot.getKey();
            if(keyRoot.equals("sso")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("sso5", timestamp.toString());
                            objJSON.addProperty("sso6", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
        }

        json = root.toString();
        obServSolic.Guardar(json);

        System.out.println("ENTRE EN REGISTER");
        return "";
    }
}
