package com.ixpery.controladores.log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ixpery.entidades.log.*;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.negocio.log.*;
import com.sun.deploy.net.HttpResponse;
import com.sun.javafx.collections.ElementObservableListDecorator;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class CEquipo {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEquipo obEquipo = (BEquipo) applicationContext.getBean("beanEquipo");
    BProductoSolucion obProductoSolucion = (BProductoSolucion) applicationContext.getBean("beanProductoSolucion");
    BPreRegistroProducto obPreReProducto = (BPreRegistroProducto) applicationContext.getBean("beanPreRegistroProducto");
    BProducto obProducto =(BProducto) applicationContext.getBean("beanProducto");
    BEmpresa obEmpresa =(BEmpresa) applicationContext.getBean("beanEmpresa");
    @RequestMapping("/equipo")
    public ModelAndView Equipo(){
        ModelAndView modelAndView = new ModelAndView("logistica/equipo");
        return modelAndView;
    }

    @RequestMapping(value="equipo/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarEquipo(
            HttpServletRequest request,
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        HttpSession session = request.getSession();
        Integer sizeList = values.get("values").size();

        List<EEquipo> listEE = new ArrayList<>();
        List<EProductoSolucion> listProSol = new ArrayList<>();

        EEquipo oeEquipo = new EEquipo();
        oeEquipo.setIdEquipo(0);
//        oeEquipo.setIdSolucion(new ESolucion(Integer.parseInt(session.getAttribute("solucion").toString())));
        oeEquipo.setIdSolucion(new ESolucion(1));

        oeEquipo.setEstado(1);
        listEE.add(oeEquipo);

        EProductoSolucion oeProductoSolucion;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeProductoSolucion = new EProductoSolucion();
            row =  values.get("values").get(i);
            oeProductoSolucion.setIdProductoSolucion(0);
            oeProductoSolucion.setIdEquipo(new EEquipo(1));
            oeProductoSolucion.setIdProducto(Integer.parseInt(row[0]));
            oeProductoSolucion.setCantidad(Integer.parseInt(row[1]));
            oeProductoSolucion.setEstado(1);
            oeProductoSolucion.setFechaReg(timestamp);
            oeProductoSolucion.setUserReg("1");
            oeProductoSolucion.setEnvCotizar(1);
            listProSol.add(oeProductoSolucion);
            System.out.println("a "+listProSol);
        }
        System.out.println("b"+listProSol);


//        for(int i = 0; i < array.length; ++i){
//            oeProductoSolucion = new EProductoSolucion();
//            oeProductoSolucion.setIdProductoSolucion(0);
//            oeProductoSolucion.setIdEquipo(new EEquipo(1));
////            oeProductoSolucion.setIdProductoProveedor(0);
//            oeProductoSolucion.setIdProducto(Integer.parseInt(array[0]));
//            oeProductoSolucion.setCantidad(Integer.parseInt(array[1]));
//            oeProductoSolucion.setEstado(1);
//            oeProductoSolucion.setFechaReg(timestamp);
////            oeProductoSolucion.setUserReg(session.getAttribute("access").toString());
//            oeProductoSolucion.setUserReg("1");
//            oeProductoSolucion.setEnvCotizar(1);
//            listProSol.add(oeProductoSolucion);
//        }

        obEquipo.Insetar(listEE);
        obProductoSolucion.Insertar(listProSol);
        return "";
    }

    @RequestMapping(value="equipo/preregister", method = RequestMethod.POST)
    public @ResponseBody String PreRegistrarProducto(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
//        HttpSession session = request.getSession();
        Integer sizeList = values.get("values").size();

        List<EPreRegistroProducto> listPreProd = new ArrayList<>();
        List<EProductoSolucion> listProSol = new ArrayList<>();

//        EEquipo oeEquipo = new EEquipo();
//        oeEquipo.setIdEquipo(0);
////        oeEquipo.setIdSolucion(new ESolucion(Integer.parseInt(session.getAttribute("solucion").toString())));
//        oeEquipo.setIdSolucion(new ESolucion(1));
//
//        oeEquipo.setEstado(1);
//        listEE.add(oeEquipo);

        EProductoSolucion oeProductoSolucion;
        EPreRegistroProducto oePreReProd;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeProductoSolucion = new EProductoSolucion();
            row =  values.get("values").get(i);
            oeProductoSolucion.setIdProductoSolucion(0);
            oeProductoSolucion.setIdEquipo(new EEquipo(1));
            oeProductoSolucion.setIdProducto(1);
            oeProductoSolucion.setCantidad(Integer.parseInt(row[2]));
            oeProductoSolucion.setEstado(1);
            oeProductoSolucion.setFechaReg(timestamp);
            oeProductoSolucion.setUserReg("1");
            oeProductoSolucion.setEnvCotizar(1);
            listProSol.add(oeProductoSolucion);
            System.out.println("a "+listProSol);
        }
        System.out.println("b"+listProSol);

        for(int i = 0; i < sizeList; i++){
            oePreReProd = new EPreRegistroProducto();
            row =  values.get("values").get(i);
            oePreReProd.setIdprereg(0);
            oePreReProd.setIdprodsol(new EProductoSolucion(1));
            oePreReProd.setIdproducto(new EProducto(1));
            oePreReProd.setNomproducto(row[0]);
            oePreReProd.setUmedida(row[1]);
            oePreReProd.setCantidad(Integer.parseInt(row[2]));
            oePreReProd.setEstado(1);

            listPreProd.add(oePreReProd);

            System.out.println("a "+listProSol);
        }
        obProductoSolucion.Insertar(listProSol);
        obPreReProducto.Insertar(listPreProd);
        return "";
    }


    @RequestMapping(value = "/equipo/clientes", method=RequestMethod.POST)
    public @ResponseBody
    String Clientes() throws Exception {
        String data = obEquipo.ConsultarCliente(1);
        System.out.println(data.getClass());
        System.out.println(data.toString());
        return data;
    }

    /*@RequestMapping(value = "/equipo/productos", method = RequestMethod.POST)
    public @ResponseBody String Productos(
            @RequestParam(value = "prod") String prod
    ) throws Exception{
        String data = obEquipo.ConsultarProducto(prod);
        System.out.println(data);
        return data;
    }*/
//DESDE AQUÍ PARA ABAJO EMPECE LUIS AZALDE
    @RequestMapping(value="/equipo/productos", method=RequestMethod.POST)
    public @ResponseBody String BuscarProductos(
            @RequestParam(value="prod") String busProd
    ) throws Exception{
        String campos = "";
        campos = busProd+"";

        List<EProducto> listProdBus= obProducto.Buscar(campos);

        List<String[]> lista = new ArrayList<>();
        //SI EXISTEN RESULTADOS
        if (listProdBus.size()!=0) {
            for (int i = 0; i < listProdBus.size(); i++) {
                String[] row = {
                        listProdBus.get(i).getIdproducto().toString(),
                        listProdBus.get(i).getNomumed(),
                        listProdBus.get(i).getCodigo(),
                        listProdBus.get(i).getNomproducto(),
                        listProdBus.get(i).getModelo(),
                        listProdBus.get(i).getMarca()
                };
                lista.add(row);
            }
        }
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String json = gson.toJson(lista);
        //System.out.println(json);
        return json;
    }

    //Busqueda Solución por Empresa.
    @RequestMapping(value = "/equipo/busempresa", produces = "application/json")
    public @ResponseBody String BuscarEmpresasReq(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obEmpresa.BuscarEmpresaSolucionCombo(var);
    }
}