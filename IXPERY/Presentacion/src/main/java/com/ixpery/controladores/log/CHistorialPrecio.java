package com.ixpery.controladores.log;

import com.ixpery.entidades.log.EProducto;
import com.ixpery.entidades.log.EProductoProveedor;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.negocio.log.BProducto;
import com.ixpery.negocio.log.BProductoProveedor;
import com.ixpery.negocio.log.BProveedor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class CHistorialPrecio {
    //Controlador
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProveedor obProveedor = (BProveedor) applicationContext.getBean("beanProveedor");
    BProducto obProducto = (BProducto) applicationContext.getBean("beanProducto");
    BProductoProveedor obProductoProv = (BProductoProveedor) applicationContext.getBean("beanProductoProveedor");

    @RequestMapping("/historialprecio")
    public ModelAndView HistorialPrecio() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/historialprecio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    //Busqueda según valor del combo seleccionado.
    @RequestMapping("/historialprecio/busproveedor")
    public @ResponseBody String BuscarProveedorHP(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obProveedor.BuscarProveedorCombo(var);
    }

    @RequestMapping("/historialprecio/busproducto")
    public @ResponseBody String BuscarProductoHP(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obProducto.BuscarProductoCombo(var);
    }

    @RequestMapping("/historialprecio/consultarasociados")
    public @ResponseBody String BuscarAsociado(
            @RequestParam(value="idProv") String idProv,
            @RequestParam(value="idProd") String iProd
    ) throws Exception {
        return obProductoProv.BuscarAsociado(idProv,iProd);
    }

    @RequestMapping("/historialprecio/registrarasociado")
    public @ResponseBody String RegistrarAsociado(
            @RequestBody String json,
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        Integer idProdSol = (Integer) session.getAttribute("prodsol");
        return obProductoProv.RegistrarAsociado(json,idProdSol);
    }

    @RequestMapping("/historialprecio/listar")
    public @ResponseBody String ListarHistorial(
            @RequestParam(value="idProv") Integer idProv,
            @RequestParam(value="idProd") Integer idProd
    ) throws Exception {
        EProductoProveedor eoProProv = new EProductoProveedor();
        eoProProv.setIdProveedor(new EProveedor(idProv));
        eoProProv.setIdProducto(new EProducto(idProd));
        return obProducto.VerHistorialPrecios(eoProProv);
    }

    @RequestMapping("/historialprecio/register")
    public @ResponseBody String Registrar(
            @RequestParam(value="json") String json,
            @RequestParam(value="idProd") String idProd,
            @RequestParam(value="fechafin") String fechaFin
    ) throws Exception {
        obProductoProv.RegistrarHistorialPrecio(json,idProd,fechaFin);
        return "";
    }

    @RequestMapping("/historialprecio/actualizarprecio")
    public @ResponseBody String ActualizarPrecio(
            @RequestParam(value="json1") String json1,
            @RequestParam(value="json2") String json2,
            @RequestParam(value="idProd") Integer idProd
    ) throws Exception {
        return obProductoProv.ActualizarHistorialPrecio(json1,json2,idProd);
    }
}

