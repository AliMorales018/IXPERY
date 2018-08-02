package com.ixpery.controladores.log;

import com.ixpery.entidades.log.*;
import com.ixpery.entidades.rhh.ECargoLaboral;
import com.ixpery.negocio.log.BCargoLaboral;
import com.ixpery.negocio.log.BServicio;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CServicios {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BCargoLaboral obCargoLaboral = (BCargoLaboral) applicationContext.getBean("beanCargoLaboral");
    BServicio obServicio = (BServicio) applicationContext.getBean("beanServicio");

    @RequestMapping("/servicios")
    public ModelAndView Servicios() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/servicios");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping("/servicios/listarcargolaboral")
    public @ResponseBody String listarCargoLaboral(
            @RequestParam(value="q") String value
    ) throws  Exception{
        return obCargoLaboral.ListarCargoLaboralCombo(value);
    }

    @RequestMapping(value = "/servicios/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarServicio(
            @RequestBody Map<String,List<List<String[]>>> values
    ) throws  Exception{

        //SERVICIO
        List<String[]> oServicio = values.get("servicio").get(0);
        String[] servicio = oServicio.get(0);
        EServicio oeServicio = new EServicio();
        oeServicio.setNumcuadrillas(Integer.parseInt(servicio[0]));
        oeServicio.setPorcentdepreciacion(Integer.parseInt(servicio[1]));
        oeServicio.setIdsolucion(new ESolucion(10));
        //SERVICIO

        //ACTIVIDADES
        List<EActividad> listActividades = new ArrayList<>();
        Integer sizeListActividades = values.get("actividades").get(0).size();
        EActividad oactividad;
        String[] row;
        for(int i = 0; i < sizeListActividades; i++){
            oactividad = new EActividad();
            row = values.get("actividades").get(0).get(i);
            oactividad.setNomactividad(row[0]);
            oactividad.setDescripcion(row[1]);
            oactividad.setCantidad(Integer.parseInt(row[2]));
            oactividad.setRiesgo(Integer.parseInt(row[3]));
            oactividad.setAdicional(Double.parseDouble(row[4]));
            listActividades.add(oactividad);
        }
        //ACTIVIDADES

        //CARGOS LABORALES
        List<List<EActividadCargo>> listActividadCargoC = new ArrayList<>();
        List<EActividadCargo> listAC;
        List<String[]> tabla;
        Integer sizeTabla;
        Integer sizeListActiCargo = values.get("cargoslab").size();
        EActividadCargo oeActividadCargo;
        String[] rowC;

        for(int i = 0; i < sizeListActiCargo; i++){
            sizeTabla = values.get("cargoslab").get(i).size();
            tabla = values.get("cargoslab").get(i);
            listAC = new ArrayList<>();
            for(int j = 0; j < sizeTabla; j++){
                rowC = tabla.get(j);
                oeActividadCargo = new EActividadCargo();
                oeActividadCargo.setIdcargo(new ECargoLaboral(Integer.parseInt(rowC[0])));
                oeActividadCargo.setCantidad(Integer.parseInt(rowC[1]));
                oeActividadCargo.setHoras(Integer.parseInt(rowC[2]));
                listAC.add(oeActividadCargo);
            }
            listActividadCargoC.add(listAC);
        }
        //CARGOS LABORALES

        //PERSONAL DE TRANSITO
        List<EPersonalTransito> listPersTran = new ArrayList<>();
        Integer sizeListPersTra = values.get("personaltransito").get(0).size();
        EPersonalTransito oePersTran;
        String[] rowPT;
        for(int i = 0; i < sizeListPersTra; i++){
            oePersTran = new EPersonalTransito();
            row = values.get("personaltransito").get(0).get(i);
            oePersTran.setIdcargo(new ECargoLaboral(Integer.parseInt(row[0])));
            oePersTran.setCargolaboral(row[1]);
            oePersTran.setCantidad(Integer.parseInt(row[2]));
            oePersTran.setHoras(Integer.parseInt(row[3]));
            listPersTran.add(oePersTran);
        }
        //PERSONAL DE TRANSITO

        String result = obServicio.ValidarDatosServicio(oeServicio,listActividades,listActividadCargoC,listPersTran);
        if (result.equals("0")){
            return "";
        }
        else{
            return result;
        }
    }

    @RequestMapping("/servicios/cotizacion")
    public ModelAndView ServiciosCotizacion() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/cotizacionservicio");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }
    @RequestMapping(value = "/servicios/verservicio", method = RequestMethod.POST)
    public @ResponseBody String VerServicio(
            @RequestParam(value="id") Integer idSolucion
    ) throws  Exception{
        return obServicio.VerServicio(idSolucion);
    }
}
