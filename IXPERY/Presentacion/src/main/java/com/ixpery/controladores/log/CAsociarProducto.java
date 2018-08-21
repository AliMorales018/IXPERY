package com.ixpery.controladores.log;


import com.ixpery.entidades.log.ESolucion;
import com.ixpery.negocio.log.BProducto;
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
public class CAsociarProducto {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProducto obProducto = (BProducto) applicationContext.getBean("beanProducto");

    @RequestMapping("/asociarproducto")
    public ModelAndView AsociarProducto() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/asociarproducto");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping("/asociarproducto/verproductosnbsolucion")
    public @ResponseBody String ListarProNB(
            @RequestParam(value = "i") Integer idSolucion
    ) throws Exception{
        return obProducto.ListarProdNOBBDDSolucion(new ESolucion(idSolucion));
    }

    @RequestMapping("/asociarproducto/listproinsumo")
    public @ResponseBody String ListarProInsumo(
            @RequestParam(value="value") String valor
    ) throws Exception{
        return obProducto.ListarProInusmo(valor);
    }

    @RequestMapping("/asociarproducto/register")
    public @ResponseBody String RegistrarProAso(
            @RequestParam(value="value") String valorCadena
    ) throws Exception{
        String a = obProducto.RegistrarProductoAsociado(valorCadena);
        if(a.equals("actualizados")){
            return "";
        }

        else{
            return "ERROR: No se pudo Asociar los productos";
        }
    }
}

