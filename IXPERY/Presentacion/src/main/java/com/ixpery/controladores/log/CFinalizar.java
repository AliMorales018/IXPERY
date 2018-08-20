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
public class CFinalizar {
    private ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    private BSolucion obSolucion = (BSolucion) applicationContext.getBean("beanSolucion");
    private SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    private Date date = new Date();
    private String dateParse = sdf.format(date);

    public CFinalizar() throws Exception{
    }

    @RequestMapping("/finalizar")
    public ModelAndView Cotizacion(){
        ModelAndView modelAndView = new ModelAndView("logistica/finalizar");
        modelAndView.addObject("fecha",dateParse);
        return modelAndView;
    }

    @RequestMapping("/finalizar/BuscarSolucionesAprobadas")
    public @ResponseBody
    String BuscarSolucionesPendientes(
    ) throws Exception {
        return obSolucion.BuscarSolucionesAprobadas();
    }










}
