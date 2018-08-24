package com.ixpery.controladores.log;

import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.EServicioProveedor;
import com.ixpery.entidades.log.EServiciosSolicitados;
import com.ixpery.negocio.log.BProveedor;
import com.ixpery.negocio.log.BServicioProveedor;
import com.ixpery.negocio.log.BServicioSolicitados;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class CHistorialPrecioOtServ {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProveedor obProveedor = (BProveedor) applicationContext.getBean("beanProveedor");
    BServicioSolicitados obServSoli = (BServicioSolicitados) applicationContext.getBean("beanServSolicitados");
    BServicioProveedor obServicioProv = (BServicioProveedor) applicationContext.getBean("beanServicioProveedor");
    @RequestMapping("/hpviaticos")
    public ModelAndView HistorialPrecio() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/historialpreciootservicio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

//    @RequestMapping("/historialprecioOtServicio/busservsolic")
//    public @ResponseBody String BuscarProductoHP(
//            @RequestParam(value="idProv") Integer idProv
//    ) throws Exception {
//        return obServSoli.BuscarServiciosCombo(new EProveedor(idProv));
//    }

/*
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
    */
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

    @RequestMapping(value="/historialprecioOtServicio/guardarfull", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarFullEquipo(
            @RequestParam(value = "json") String json,
            @RequestParam(value = "idsersoli") String idsersoli,
            @RequestParam(value = "fecfin") String fecfin
    ) throws Exception{

        obServSoli.GuardarFull(json,idsersoli,fecfin);

        System.out.println("ENTRE EN REGISTER");
        return "";
    }



    //Busqueda según valor del combo seleccionado.
    @RequestMapping("/historialprecioOtServicio/busproveedor")
    public @ResponseBody String BuscarProveedorHPOTS(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obProveedor.BuscarProveedorCombo(var);
    }


    @RequestMapping("/historialprecioOtServicio/busservsolic")
    public @ResponseBody String BuscarServicioHP(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obServSoli.BuscarServiciosCombo2(var);
    }

    @RequestMapping("/historialprecioOtServicio/consultarasociados")
    public @ResponseBody String BuscarAsociado(
            @RequestParam(value="idProv") String idProv,
            @RequestParam(value="idServ") String idServ
    ) throws Exception {
        return obServicioProv.BuscarAsociado(idProv,idServ);
    }
    @RequestMapping("/historialprecioOtServicio/listar")
    public @ResponseBody String ListarHistorial(
            @RequestParam(value="idProv") Integer idProv,
            @RequestParam(value="idServ") Integer idServ
    ) throws Exception {
        EServicioProveedor eoProProv = new EServicioProveedor();
        eoProProv.setIdproveedor(new EProveedor(idProv));
        eoProProv.setIdservsol(new EServiciosSolicitados(idServ));
        return obServSoli.VerHistorialPrecios(eoProProv);
    }
    @RequestMapping("/historialprecioOtServicio/registrarasociado")
    public @ResponseBody String RegistrarAsociado(
            @RequestBody String json,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        Integer idServSol = (Integer) session.getAttribute("servsol");
        return obServicioProv.RegistrarAsociado(json,idServSol);
    }

    @RequestMapping("/historialprecioOtServicio/actualizarprecio")
    public @ResponseBody String ActualizarPrecio(
            @RequestParam(value="json1") String json1,
            @RequestParam(value="json2") String json2,
            @RequestParam(value="idServ") Integer idServ
    ) throws Exception {
        return obServicioProv.ActualizarHistorialPrecio(json1,json2,idServ);
    }
    @RequestMapping("/historialprecioOtServicio/register2")
    public @ResponseBody String Registrar2(
            @RequestParam(value="json") String json,
            @RequestParam(value="idProd") String idProd,
            @RequestParam(value="fechafin") String fechaFin
    ) throws Exception {
        obServicioProv.RegistrarHistorialPrecio(json,idProd,fechaFin);
        return "";
    }
}
