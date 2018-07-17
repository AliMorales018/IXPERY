package com.ixpery.controladores.tools;

import com.ixpery.negocio.tools.BTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CTest {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BTest test = (BTest) applicationContext.getBean("prueba");

    @RequestMapping("/test")
    public ModelAndView Mensaje() throws Exception
    {
        ModelAndView m = new ModelAndView("tools/test");
        String msj = test.bMensaje();
        m.addObject("msj",msj);
        return m;
    }
}
