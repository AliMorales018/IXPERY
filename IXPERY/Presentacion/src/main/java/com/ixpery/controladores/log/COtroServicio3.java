package com.ixpery.controladores.log;

import com.ixpery.entidades.log.EEquipo;
import com.ixpery.entidades.log.EPreRegistroProducto;
import com.ixpery.entidades.log.EProductoSolucion;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.negocio.log.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class COtroServicio3 {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BOtroServicio obOtroServ = (BOtroServicio) applicationContext.getBean("beanOtroServicio");
    BProductoSolucion obProductoSolucion = (BProductoSolucion) applicationContext.getBean("beanProductoSolucion");
    BPreRegistroProducto obPreReProducto = (BPreRegistroProducto) applicationContext.getBean("beanPreRegistroProducto");
    BProducto obProducto =(BProducto) applicationContext.getBean("beanProducto");
    BEmpresa obEmpresa =(BEmpresa) applicationContext.getBean("beanEmpresa");
    BServicioProveedor obServProve =(BServicioProveedor) applicationContext.getBean("beanServicioProveedor");



    @RequestMapping("/otroservicio3")
    public ModelAndView Equipo(){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/otroservicio3");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    //Busqueda Producto Combo de Tabla
    @RequestMapping(value = "/otroservicio3/busprovserv", produces = "application/json")
    public @ResponseBody String BuscarProveServicio(
            @RequestParam(value="q") String var
    ) throws Exception {
        String proveprod= obServProve.BuscarProveServicioCombo(var);
        return  proveprod;
    }



    //Búsqueda de Equipos Solución
    @RequestMapping(value="/otroservicio3/buscarotroserviciosol", method=RequestMethod.POST)
    public @ResponseBody String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obOtroServ.BuscarSolucionOtroServicio(busIdsol);
        return rpta;
    }

    @RequestMapping("/otroservicio3/sesproverod")
    public @ResponseBody  String CrearSesProvSoli(
            @RequestParam(value = "prove") String prove,
            @RequestParam(value = "soli") String soli,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("proveedor", prove);
        session.setAttribute("sersolicitado", soli);

        String proveedor = session.getAttribute("proveedor").toString();
        String servicio = session.getAttribute("sersolicitado").toString();
        return "proveedor: "+proveedor+" sersolicitado: "+servicio;
    }

    @RequestMapping("/otroservicio3/getsesionpp")
    public @ResponseBody  String GetSesionSesServProv(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();

        Integer idProv = (Integer) session.getAttribute("proveedorpot");
        Integer idServ = (Integer) session.getAttribute("otroserv");

        if (idServ == null || idProv == null){
            return "0";
        }else{
            return idProv+"@"+idServ;
        }
    }
    //nuevo enviar a juan
    @RequestMapping("/otroservicio3/SesionServSol")
    public @ResponseBody
    String SesionProdSol(
            @RequestParam(value = "servsol") String servsol,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("servsol", servsol);
        servsol = session.getAttribute("servsol").toString();
        return servsol;
    }
}
