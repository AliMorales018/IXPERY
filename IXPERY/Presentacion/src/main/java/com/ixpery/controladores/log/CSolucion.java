package com.ixpery.controladores.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.negocio.log.BSolucion;
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
public class CSolucion {
    private ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    private BSolucion obSolucion = (BSolucion) applicationContext.getBean("beanSolucion");
    private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private Date date = new Date();
    private String dateParse = sdf.format(date);


    public CSolucion() throws Exception {
    }

    @RequestMapping("/solucion")
    public ModelAndView Solucion(){
        ModelAndView modelAndView = new ModelAndView("/logistica/solucion");
        modelAndView.addObject("fecha",dateParse);
        return modelAndView;
    }

    @RequestMapping(value="/solucion/GuardarSolucion", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarSolucion(
            HttpServletRequest request,
            @RequestBody String json
    ) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        HttpSession session = request.getSession();
        JsonParser parser = new JsonParser();
        JsonObject root = parser.parse(json).getAsJsonObject();
        for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
            String keyRoot = entryRoot.getKey();
            JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
            for(JsonElement jsonElement : arrayValue){
                for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                    if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                        JsonObject objJSON = jsonElement.getAsJsonObject();
                        objJSON.addProperty("sol10", 1);
                        objJSON.addProperty("sol12", timestamp.toString());
                        objJSON.addProperty("sol13", session.getAttribute("user").toString());
                        break;
                    }
                }
            }

        }
        json = root.toString();
        String mensaje = obSolucion.GuardarSolucion(json);
        return mensaje;
    }


    @RequestMapping("/solucion/BuscarRequerimiento")
    public @ResponseBody
    String BuscarRequerimiento(
            @RequestParam(value = "value") String value,
            HttpServletRequest request
    ) throws Exception {
        Integer perfil = 1;
        return obSolucion.BuscarReqProEmp(value, perfil);
    }

    @RequestMapping("/solucion/BuscarRequerimientos")
    public @ResponseBody
    String BuscarRequerimientos(
            HttpServletRequest request
            ) throws Exception {
        HttpSession session = request.getSession();
//        Integer perfil = Integer.parseInt(session.getAttribute("perfil").toString());
        Integer perfil = 1;
        return obSolucion.BuscarRequerimientos(perfil);
    }

    @RequestMapping("/solucion/BuscarSolucion")
    public @ResponseBody
    String BuscarSolucion(
            @RequestParam(value = "sol") Integer sol
    ) throws Exception {
        return obSolucion.BuscarSolucion("sol2," + sol);
    }

    @RequestMapping("/solucion/BuscarEmpleado")
    public @ResponseBody
    String BuscarEmpleado(
            @RequestParam(value = "value") String value
    ) throws Exception {
//        String a = obSolucion.BuscarEmpleado("epl1," + value);
        return obSolucion.BuscarEmpleado(value);
    }



    @RequestMapping("/solucion/SesionSolucion")
    public @ResponseBody
    String CrearSessionSolucion(
            @RequestParam(value = "sol") String sol,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("solucion", sol);

//        Ejemplo para llamar la sesion de la solucion
//        Integer solucion = Integer.parseInt(session.getAttribute("solucion").toString());
        String solucion = session.getAttribute("solucion").toString();
        return solucion;
    }

    @RequestMapping("/solucion/VerificarSesionSolucion")
    public @ResponseBody
    String VerificarSesionSolucion(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        return session.getAttribute("solucion").toString();
    }









}
