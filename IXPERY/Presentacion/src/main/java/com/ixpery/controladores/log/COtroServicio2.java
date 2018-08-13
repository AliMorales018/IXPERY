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

import java.sql.Timestamp;
import java.util.ArrayList;
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
        ModelAndView modelAndView = new ModelAndView("logistica/otroservicio2");
        return modelAndView;
    }

 /*   @RequestMapping(value="/otroservicio2/register", method = RequestMethod.POST)
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
    }*/

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
}
