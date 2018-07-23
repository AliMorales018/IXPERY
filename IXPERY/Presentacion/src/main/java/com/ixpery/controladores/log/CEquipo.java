package com.ixpery.controladores.log;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.ixpery.datos.tools.JsonParcellable;
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
import java.util.LinkedList;
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

    @RequestMapping(value="/equipo/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarEquipo(@RequestBody Map<String,List<String[]>> values) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Integer sizeListEqSol = values.get("values0").size();
        Integer sizeListEqReg = values.get("values1").size();
        Integer sizeListEqNoReg = values.get("values2").size();

        //REGISTRAMOS EN TABLA EQUIPOS
        List<EEquipo> listEquipo = new ArrayList<EEquipo>();
        EEquipo oeEquipo;
        String[] rowSol;

        for (int i =0; i < sizeListEqSol; i++){
            oeEquipo = new EEquipo();
            rowSol = values.get("values0").get(i);
            oeEquipo.setIdEquipo(0);
            oeEquipo.setIdSolucion(new ESolucion(Integer.parseInt(rowSol[0])));
            oeEquipo.setEstado("1");
            oeEquipo.setFechaReg(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeEquipo.setUserReg("LUIS AZALDE LEYVA");
            listEquipo.add(oeEquipo);
        }

        //REGISTRAMOS EN TABLA PRODUCTO SOLUCION
        List<EProductoSolucion> listProdSolucion = new ArrayList<EProductoSolucion>();
        EProductoSolucion oeProdSolucion;
        String[] rowProdSol;

        for (int i =0; i < sizeListEqReg; i++){
            oeProdSolucion = new EProductoSolucion();
            rowProdSol = values.get("values1").get(i);
            oeProdSolucion.setIdprodsol(0);
            oeProdSolucion.setIdequipo(new EEquipo(0));
            oeProdSolucion.setCantidad(Integer.parseInt(rowProdSol[5]));
            oeProdSolucion.setEstado("1");
            oeProdSolucion.setFecharegistro(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeProdSolucion.setUserregistro("LUIS AZALDE LEYVA");
            oeProdSolucion.setIdproducto(Integer.parseInt(rowProdSol[0]));
            oeProdSolucion.setEnviadocotizar("1");
            listProdSolucion.add(oeProdSolucion);
        }

        //REGISTRAMOS EN TABLA PREREGISTRO PRODUCTOS
        List<EPreRegistroProducto> listPreRegProducto = new ArrayList<EPreRegistroProducto>();
        EPreRegistroProducto oePreRegProducto;
        String[] rowPreRegProducto;

        if(sizeListEqNoReg==1) {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegProducto = values.get("values2").get(i);

                oePreRegProducto = new EPreRegistroProducto();
                oePreRegProducto.setIdprereg(0);
                oePreRegProducto.setIdprodsol(new EProductoSolucion(0));
                oePreRegProducto.setNomproducto(rowPreRegProducto[0]);
                oePreRegProducto.setUmedida(rowPreRegProducto[4]);
                if(rowPreRegProducto[5].equals("")){
                    oePreRegProducto.setCantidad(0);
                }else{
                    oePreRegProducto.setCantidad(Integer.parseInt(rowPreRegProducto[5]));
                }

                oePreRegProducto.setEstado("1");
                oePreRegProducto.setModelo(rowPreRegProducto[2]);
                oePreRegProducto.setMarca(rowPreRegProducto[3]);

                listPreRegProducto.add(oePreRegProducto);
            }
        }
        else
        {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegProducto = values.get("values2").get(i);

                oePreRegProducto = new EPreRegistroProducto();
                oePreRegProducto.setIdprereg(0);
                oePreRegProducto.setIdprodsol(new EProductoSolucion(0));
                oePreRegProducto.setNomproducto(rowPreRegProducto[0]);
                oePreRegProducto.setUmedida(rowPreRegProducto[4]);
                oePreRegProducto.setCantidad(Integer.parseInt(rowPreRegProducto[5]));
                oePreRegProducto.setEstado("1");
                oePreRegProducto.setModelo(rowPreRegProducto[2]);
                oePreRegProducto.setMarca(rowPreRegProducto[3]);

                listPreRegProducto.add(oePreRegProducto);
            }
        }

        //ENVIAMOS A PONER IDS A CADA LISTA DE OBJETOS
        String msjResult = obEquipo.PonerIds(listEquipo,listProdSolucion,listPreRegProducto);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

//DESDE AQUÍ PARA ABAJO EMPECE LUIS AZALDE
      //Busqueda Solución por Empresa.
    @RequestMapping(value = "/equipo/busempresa", produces = "application/json")
    public @ResponseBody String BuscarEmpresasReq(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obEmpresa.BuscarEmpresaSolucionCombo(var);
    }
    //Busqueda Producto Combo de Tabla
    @RequestMapping(value = "/equipo/busproducto", produces = "application/json")
    public @ResponseBody String BuscarProducto(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obProducto.BuscarProductoEquipoCombo(var);
    }

    //Búsqueda de Equipos Solución
    @RequestMapping(value="/equipo/buscarequiposol", method=RequestMethod.POST)
    public @ResponseBody String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{

         String rpta= obEquipo.BuscarSolucionEquipo(busIdsol);

             return rpta;


    }
}