package com.ixpery.controladores.log;

import com.ixpery.entidades.log.EProducto;
import com.ixpery.entidades.log.EProductoProveedor;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.negocio.log.BProducto;
import com.ixpery.negocio.log.BProveedor;
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
public class CHistorialPrecio {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProveedor obProveedor = (BProveedor) applicationContext.getBean("beanProveedor");
    BProducto obProducto = (BProducto) applicationContext.getBean("beanProducto");

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
            @RequestParam(value="var") String var
    ) throws Exception {
        return obProveedor.BuscarProveedorCombo(var);
    }

    @RequestMapping("/historialprecio/busproducto")
    public @ResponseBody String BuscarProductoHP(
            @RequestParam(value="idProv") Integer idProv
    ) throws Exception {
        return obProducto.BuscarProductoCombo(new EProveedor(idProv));
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
            @RequestParam(value="iProv") Integer idProv,
            @RequestParam(value="iP") Integer idProd,
            @RequestParam(value="fI") String fechaIni,
            @RequestParam(value="pre") Double precio
    ) throws Exception {
        EProductoProveedor oeProductoProveedor = new EProductoProveedor();
        oeProductoProveedor.setIdProProv(0);
        oeProductoProveedor.setIdProveedor(new EProveedor(idProv));
        oeProductoProveedor.setIdProducto(new EProducto(idProd));
        oeProductoProveedor.setFechaInicio(fechaIni);
        oeProductoProveedor.setPrecioCompra(precio);
        oeProductoProveedor.setEstado("1");
        obProducto.RegistrarPrecioHistorial(oeProductoProveedor);
        return "";
    }
}

