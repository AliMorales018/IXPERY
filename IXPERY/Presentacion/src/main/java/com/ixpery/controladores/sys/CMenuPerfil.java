package com.ixpery.controladores.sys;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.ixpery.negocio.sys.BMenuPerfil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.FileReader;

@Controller
public class CMenuPerfil {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BMenuPerfil obMenuPerfil = (BMenuPerfil) applicationContext.getBean("beanMenuPerfil");

    @RequestMapping(value = "/sistema")
    public JsonObject get() throws Exception {

        String path = "C:/Users/ingdi_000/Desktop/jsonMenu.js";
        BufferedReader bufferedReader = new BufferedReader(new FileReader(path));

        Gson gson = new Gson();
        JsonArray ja = gson.fromJson(bufferedReader, JsonArray.class);



        JsonObject data = new JsonObject();
        //JsonArray ja = new JsonArray();
        data.add("data", ja);

        System.out.println(data.getClass());
        System.out.println(data.toString());

        //ja.getAsJsonObject();
        return data;
    }


    @RequestMapping(value = "/SistemaIntegral")
    public ModelAndView SistemaIntegral(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        HttpSession session = request.getSession();
        if (session.getAttribute("access")!= null) {
            ModelAndView m = new ModelAndView("sistema/SistemaIntegral");
            return m;
        }
        else{
            response.sendRedirect("/");
            return null;
        }
    }

    @RequestMapping(value = "/SistemaIntegral/menu", method=RequestMethod.POST)
    public @ResponseBody
    String mostrar(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception {
        HttpSession session = request.getSession();
        if (session.getAttribute("access")!= null) {
            Integer app = (Integer) session.getAttribute("aplicacion");
            Integer perfil = (Integer) session.getAttribute("perfil");
            Integer usuario = (Integer) session.getAttribute("access");
            System.out.println(app + ";" + perfil + ";" + usuario);
            String data = obMenuPerfil.MostrarMenu(perfil);

            System.out.println(data.getClass());
            System.out.println(data.toString());
            return data;
        }

        else{
            response.sendRedirect("/");
            return null;
        }
    }

}
