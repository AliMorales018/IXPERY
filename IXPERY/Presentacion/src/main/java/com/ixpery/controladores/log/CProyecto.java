package com.ixpery.controladores.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EFamilia;
import com.ixpery.entidades.log.EProyecto;
import com.ixpery.negocio.log.BEmpresa;
import com.ixpery.negocio.log.BProyecto;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class CProyecto {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProyecto obProyecto = (BProyecto) applicationContext.getBean("beanProyecto");

    @RequestMapping("/proyecto")
    public ModelAndView Proyecto() throws Exception{
        ModelAndView modelAndView = new ModelAndView("/logistica/proyecto");
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        modelAndView.addObject("fecha",dateParse);
        return modelAndView;
    }

    @RequestMapping(value="/proyecto/GuardarProyecto", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarProyecto(
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
                        objJSON.addProperty("pro9", 1);
                        objJSON.addProperty("pro13", timestamp.toString());
                        objJSON.addProperty("pro14", session.getAttribute("user").toString());
                        break;
                    }
                }
            }
        }
        json = root.toString();
        String mensaje = obProyecto.GuardarProyecto(json);
        return mensaje;
    }

    //Busqueda de Completa Proyecto.
    @RequestMapping(value="/proyecto/buscarProyecto", method=RequestMethod.POST)
    public @ResponseBody String BuscarProyecto(
            @RequestParam(value="pro") String pro,
            @RequestParam(value="emp") String emp
    ) throws Exception {
        String campos = "";
        if(pro.equals("") && emp.equals("")){
            campos="/";
        }
        else{
            if(pro.equals("")){ pro = "%"; }
            if(emp.equals("")){ emp = "%"; }
//            campos = "pro3," + pro + ";" + "pro2," + emp;
            campos = "pro3," + pro + ";" + "emp4," + emp;
        }
        String jsonReturn = obProyecto.Buscar(campos);
        return jsonReturn;
    }


    //Busqueda de Empresa.
    @RequestMapping(value = "/proyecto/buscarEmpresaRuc", produces = "application/json")
    public @ResponseBody String BuscarEmpresasRuc(
            @RequestParam(value="emp") String value
    ) throws Exception {
        String campo = "emp4," + value;
        return obProyecto.BuscarEmpresaRuc(campo);
    }

    //Busqueda de Empleado.
    @RequestMapping(value = "/proyecto/buscarEmpleado", produces = "application/json")
    public @ResponseBody String BuscarEmpleado(
            @RequestParam(value="epl") String value
    ) throws Exception {
        String a =  obProyecto.BuscarEmpleado(value);
        return a;
    }

    //Busqueda de Tipo de Proyecto
    @RequestMapping("/proyecto/buscartipo")
    public @ResponseBody String BuscarTipo(
    ) throws Exception {
        return obProyecto.BuscarTipo();
    }



}
