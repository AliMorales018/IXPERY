package com.ixpery.controladores.log;

import com.ixpery.negocio.log.BOperaciones;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class COperaciones {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BOperaciones obOperaciones = (BOperaciones) applicationContext.getBean("beanOperaciones");

    @RequestMapping("/operaciones")
    public ModelAndView Operaciones(){
        ModelAndView modelAndView = new ModelAndView("logistica/operaciones");
        return modelAndView;
    }

    @RequestMapping(value="/operaciones/register", method=RequestMethod.POST)
    public @ResponseBody
    String RegisterOperaciones(
            @RequestParam(value="idEmp") Integer idEmp,
            @RequestParam(value="idPro") Integer idPro,
            @RequestParam(value="idSol") Integer idSol,
            @RequestParam(value="cadena") String cadena,
            @RequestParam(value="cond") String cond

    ) throws Exception{
       obOperaciones.RegisterOperaciones(idEmp,idPro,idSol,cadena,cond);
        return "";
    }

    @RequestMapping(value="/operaciones/buscaroperacionsol", method=RequestMethod.POST)
    public @ResponseBody
    String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obOperaciones.BuscarSolucionOpera();
        return rpta;
    }
}
