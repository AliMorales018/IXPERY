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
public class COtroServicio2 {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BOtroServicio obOtroServ = (BOtroServicio) applicationContext.getBean("beanOtroServicio");
    BProductoSolucion obProductoSolucion = (BProductoSolucion) applicationContext.getBean("beanProductoSolucion");
    BPreRegistroProducto obPreReProducto = (BPreRegistroProducto) applicationContext.getBean("beanPreRegistroProducto");
    BProducto obProducto =(BProducto) applicationContext.getBean("beanProducto");
    BEmpresa obEmpresa =(BEmpresa) applicationContext.getBean("beanEmpresa");
    BServicioProveedor obServProve =(BServicioProveedor) applicationContext.getBean("beanServicioProveedor");



    @RequestMapping("/otroservicio2")
    public ModelAndView Equipo(){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/otroservicio2");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    //Busqueda Producto Combo de Tabla
    @RequestMapping(value = "/otroservicio2/busprovserv", produces = "application/json")
    public @ResponseBody String BuscarProveServicio(
            @RequestParam(value="q") String var
    ) throws Exception {
        String proveprod= obServProve.BuscarProveServicioCombo(var);
        return  proveprod;
    }



    //Búsqueda de Equipos Solución
    @RequestMapping(value="/otroservicio2/buscarotroserviciosol", method=RequestMethod.POST)
    public @ResponseBody String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obOtroServ.BuscarSolucionOtroServicio(busIdsol);
        return rpta;
    }

    @RequestMapping("/otroservicio2/sesproverod")
    public @ResponseBody  String CrearSesProvSoli(
            @RequestParam(value = "prove") Integer prove,
            @RequestParam(value = "soli") Integer soli,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("proveedors", prove);
        session.setAttribute("sersolicitados", soli);

        String proveedor = session.getAttribute("proveedors").toString();
        String servicio = session.getAttribute("sersolicitados").toString();
        return "proveedors: "+proveedor+" sersolicitados: "+servicio;
    }

    @RequestMapping("/otroservicio2/getsesionpp")
    public @ResponseBody  String GetSesionSesServProv(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();

        Integer idProv = (Integer) session.getAttribute("proveedors");
        Integer idServ = (Integer) session.getAttribute("sersolicitados");

        if (idServ == null || idProv == null){
            return "0";
        }else{
            return idProv+"@"+idServ;
        }
    }

//nuevo enviar a juan
    @RequestMapping("/otroservicio2/SesionServSol")
    public @ResponseBody
    Integer SesionProdSol(
            @RequestParam(value = "servsol") Integer servsol,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("servsol", servsol);
        servsol = (Integer) session.getAttribute("servsol");
        return servsol;
    }
}
