package com.ixpery.controladores.log;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.EServicioProveedor;
import com.ixpery.entidades.log.EServiciosSolicitados;
import com.ixpery.negocio.log.BProveedor;
import com.ixpery.negocio.log.BServicioSolicitados;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@Controller
public class CHistorialPrecioOtServ {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProveedor obProveedor = (BProveedor) applicationContext.getBean("beanProveedor");
    BServicioSolicitados obServSoli = (BServicioSolicitados) applicationContext.getBean("beanServSolicitados");

    @RequestMapping("/historialpreciootservicio")
    public ModelAndView HistorialPrecio() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/historialpreciootservicio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }



    @RequestMapping("/historialprecioOtServicio/busservsolic")
    public @ResponseBody String BuscarProductoHP(
            @RequestParam(value="idProv") Integer idProv
    ) throws Exception {
        return obServSoli.BuscarServiciosCombo(new EProveedor(idProv));
    }

   @RequestMapping("/historialprecioOtServicio/listar")
    public @ResponseBody String ListarHistorial(
            @RequestParam(value="idProv") Integer idProv,
            @RequestParam(value="idProd") Integer idProd
    ) throws Exception {
        EServicioProveedor eoProProv = new EServicioProveedor();
        eoProProv.setIdproveedor(new EProveedor(idProv));
        eoProProv.setIdservsol(new EServiciosSolicitados(idProd));
        return obServSoli.VerHistorialPrecios(eoProProv);
    }
    @RequestMapping("/historialprecioOtServicio/register")
    public @ResponseBody String Registrar(
            @RequestParam(value="iProv") Integer idProv,
            @RequestParam(value="iP") Integer idProd,
            @RequestParam(value="fI") String fechaIni,
            @RequestParam(value="pre") Double precio
    ) throws Exception {
        EServicioProveedor oeServicioProveedor = new EServicioProveedor();
        oeServicioProveedor.setIdservprov(0);
        oeServicioProveedor.setIdproveedor(new EProveedor(idProv));
        oeServicioProveedor.setIdservsol(new EServiciosSolicitados(idProd));
        oeServicioProveedor.setFechainicio(fechaIni);
        oeServicioProveedor.setPrecio(precio);
        oeServicioProveedor.setEstado("1");
        obServSoli.RegistrarPrecioHistorial(oeServicioProveedor);
        return "";
    }

    //COPIA BARATA DE JUAN
    @RequestMapping(value="/historialprecioOtServicio/guardarfull", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarFullEquipo(
            @RequestParam(value = "json") String json,
            @RequestParam(value = "vals") String vals
    ) throws Exception{


        obServSoli.GuardarFull(json,vals);

        System.out.println("ENTRE EN REGISTER");
        return "";
    }
}
