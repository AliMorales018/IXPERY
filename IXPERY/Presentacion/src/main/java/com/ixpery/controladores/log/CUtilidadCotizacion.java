package com.ixpery.controladores.log;

import com.ixpery.negocio.log.BEquipo;
import com.ixpery.negocio.log.BUtilidadCotizacion;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller

public class CUtilidadCotizacion {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BUtilidadCotizacion obUtiCoti = (BUtilidadCotizacion) applicationContext.getBean("beanUtilidadCotizacion");

    @RequestMapping("/utilcoti")
    public ModelAndView Utilidadcotizacion(){
        ModelAndView modelAndView = new ModelAndView("logistica/utilidadcotizacion");
        return modelAndView;
    }

    @RequestMapping(value="/utilidadcotizacion/buscarutilidadsol", method=RequestMethod.POST)
    public @ResponseBody
    String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obUtiCoti.BuscarSolucionUtiCoti(busIdsol);
        return rpta;
    }

    @RequestMapping(value="/utilidadcotizacion/calTotalCotiUtilidad", method=RequestMethod.POST)
    public @ResponseBody
    String CalculaTotalCoti(
            @RequestParam(value="cadena") String cadena
    ) throws Exception{
        String rpta= obUtiCoti.CalTotalCotiUtilidad(cadena);
        return rpta;
    }

    @RequestMapping(value="/utilidadcotizacion/register", method=RequestMethod.POST)
    public @ResponseBody
    String RegisterUtilidadCoti(
            @RequestParam(value="cadena") String cadena
    ) throws Exception{
        obUtiCoti.RegisterUtiCoti(cadena);
        return "";
    }

}
