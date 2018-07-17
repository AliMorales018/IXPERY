package com.ixpery.controladores.log;

import com.ixpery.entidades.log.EEstado;
import com.ixpery.entidades.log.ERequerimiento;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.negocio.log.BEmpresa;
import com.ixpery.negocio.log.BSolucion;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class CSolucion {
    BEmpresa obEmpresa = new BEmpresa();
    BSolucion obSolucion = new BSolucion();

    //SimpleDateFormat sdf = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
    Timestamp timestamp = new Timestamp(System.currentTimeMillis());

    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    Date date = new Date();
    String dateParse = sdf.format(date);
//    Date date = new Date();
//    String dateParse = sdf.format(date);

    public CSolucion() throws Exception {
    }

    @RequestMapping("/solucion")
    public ModelAndView Solucion(){
        ModelAndView modelAndView = new ModelAndView("/logistica/solucion");
        modelAndView.addObject("fecha",dateParse);

        return modelAndView;
    }

    @RequestMapping(value="/solucion/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarSolucion(
            HttpServletRequest request,
            @RequestParam(value = "iR") Integer iR,
            @RequestParam(value = "values") String lisSol
    ) throws Exception{
        HttpSession session = request.getSession();


        String[] array = lisSol.split(",");
        List<ESolucion> listSOL= new ArrayList<>();
        ESolucion oeSolucion;

        for (int i = 0; i < 1; i++){
            oeSolucion = new ESolucion();
            oeSolucion.setIdsolucion(0);
            oeSolucion.setIdrequerimiento(new ERequerimiento(iR));
            oeSolucion.setNomsolucion(array[i]);
//            oeSolucion.setFechaCreacion(array[i+1]);
            oeSolucion.setEncargadosol(array[i+1]);
            oeSolucion.setDescripcion(array[i+2]);
            oeSolucion.setEstado("1");
            oeSolucion.setIdestado(7);
            oeSolucion.setFecharegistro(timestamp);
            oeSolucion.setUserregistro("pepito");
            listSOL.add(oeSolucion);
//            i+=2;
            System.out.println(oeSolucion);
        }

        String sol = obSolucion.Insertar(listSOL);

        session.setAttribute("solucion", Integer.parseInt(sol));
        System.out.println("SESSION: " + session.getAttribute("solucion").toString());
        return "";
    }

    @RequestMapping("/solucion/empresa")
    public @ResponseBody
    String BuscarEmpresa(
            @RequestParam(value="emp") String emp
    ) throws Exception {
        return obEmpresa.BuscarEmpresaConcatenado(emp);
    }

    @RequestMapping("/solucion/proyecto")
    public @ResponseBody
    String BuscarProyecto(
            @RequestParam(value = "emp") Integer emp,
            @RequestParam(value = "pro") String pro
    ) throws Exception {
        System.out.println("aca");
        return obEmpresa.BuscarProyectoPorEmpresa(emp, pro);
    }

    @RequestMapping("/solucion/requerimiento")
    public @ResponseBody
    String BuscarRequerimiento(
            @RequestParam(value = "pro") Integer pro,
            @RequestParam(value = "req") String req
    ) throws Exception {
        System.out.println("aca");
        return obEmpresa.BuscarRequerimientoPorProyecto(pro, req);
    }

    @RequestMapping("/solucion/solucion")
    public @ResponseBody
    String BuscarSolucion(
            @RequestParam(value = "sol") Integer sol
    ) throws Exception {
        System.out.println("aca");
        return obSolucion.BuscarSolucionPorRequerimiento(sol);
    }

}
