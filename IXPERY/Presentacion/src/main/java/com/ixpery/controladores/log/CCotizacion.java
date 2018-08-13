package com.ixpery.controladores.log;

import com.ixpery.negocio.log.BSolucion;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class CCotizacion {
    private ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    private BSolucion obSolucion = (BSolucion) applicationContext.getBean("beanSolucion");
    private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private Date date = new Date();
    private String dateParse = sdf.format(date);

    public CCotizacion() throws Exception{
    }

    @RequestMapping("/cotizacion")
    public ModelAndView Cotizacion(){
        ModelAndView modelAndView = new ModelAndView("logistica/cotizacion");
        modelAndView.addObject("fecha",dateParse);
        return modelAndView;
    }

    @RequestMapping("/cotizacion/BuscarSolucionesPendientes")
    public @ResponseBody
    String BuscarSolucionesPendientes(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
//        Integer perfil = Integer.parseInt(session.getAttribute("perfil").toString());
        Integer perfil = 1;
        return obSolucion.BuscarRequerimientos(perfil);
    }










}
