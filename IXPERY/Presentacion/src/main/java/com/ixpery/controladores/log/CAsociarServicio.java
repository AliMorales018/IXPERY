package com.ixpery.controladores.log;

import com.ixpery.entidades.log.ESolucion;
import com.ixpery.negocio.log.BServicioSolicitados;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
//comentario
public class CAsociarServicio {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BServicioSolicitados obServSolici = (BServicioSolicitados) applicationContext.getBean("beanServSolicitados");

    @RequestMapping("/asociarservicio")
    public ModelAndView AsociarServicio() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/asociarservicio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping("/asociarservicio/verservicionbsolucion")
    public @ResponseBody String ListarProNB(
            @RequestParam(value = "i") Integer idSolucion
    ) throws Exception{
        return obServSolici.ListarServNOBBDDSolucion(new ESolucion(idSolucion));
    }

    @RequestMapping("/asociarservicio/listservinsumo")
    public @ResponseBody String ListarProInsumo(
            @RequestParam(value="q") String valor
    ) throws Exception{
        return obServSolici.ListarServInsumo(valor);
    }

    @RequestMapping("/asociarservicio/register")
    public @ResponseBody String RegistrarServAso(
            @RequestParam(value="value") String valorCadena
    ) throws Exception{
        String a = obServSolici.RegistrarServicioAsociado(valorCadena);
        if(a.equals("actualizados")){
            return "";
        }
        else{
            return "ERROR: No se pudo Asociar los servicios";
        }
    }
}
