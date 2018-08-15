package com.ixpery.controladores.log;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CReportes {

    public CReportes() throws Exception {
    }

    @RequestMapping("/reporteoperaciones")
    public ModelAndView ReporteOperaciones(){
        ModelAndView modelAndView = new ModelAndView("/logistica/reporteoperaciones");
        return modelAndView;
    }




}
