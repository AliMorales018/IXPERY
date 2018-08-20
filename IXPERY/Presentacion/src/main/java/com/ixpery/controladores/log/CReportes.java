package com.ixpery.controladores.log;

import com.ixpery.negocio.log.BSolucion;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CReportes {
    private ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    private BSolucion obSolucion = (BSolucion) applicationContext.getBean("beanSolucion");

    public CReportes() throws Exception {
    }

    @RequestMapping("/reportes/ReporteOperaciones")
    public ModelAndView ReporteOperaciones(){
        ModelAndView modelAndView = new ModelAndView("/logistica/reporteoperaciones");
        return modelAndView;
    }

    @RequestMapping(value="/reportes/GuardarReporteOperaciones", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarReporteOperaciones(
            @RequestBody String json
    ) throws Exception{
        String mensaje = obSolucion.GuardarSolucion(json);
        return mensaje;
    }


    @RequestMapping("/reportes/ReporteGerencia")
    public ModelAndView ReporteGerencia(){
        ModelAndView modelAndView = new ModelAndView("/logistica/reportegerencia");
        return modelAndView;
    }




}
