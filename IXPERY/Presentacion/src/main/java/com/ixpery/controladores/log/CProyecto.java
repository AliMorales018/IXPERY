package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EFamilia;
import com.ixpery.entidades.log.EProyecto;
import com.ixpery.negocio.log.BEmpresa;
import com.ixpery.negocio.log.BProyecto;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class CProyecto {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProyecto obPro = (BProyecto) applicationContext.getBean("beanProyecto");
    BEmpresa obEmp = (BEmpresa) applicationContext.getBean("beanEmpresa");
    @RequestMapping("/proyecto")
    public ModelAndView Proyecto() throws Exception{
        ModelAndView modelAndView = new ModelAndView("/logistica/proyecto");
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        modelAndView.addObject("fecha",dateParse);
        //List<EEmpleado> listEmpleado = AllEmpleados();
        //modelView.addObject("listEmpleados",listEmpleado);
        return modelAndView;
    }

    @RequestMapping(value="/proyecto/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarProyecto(
            HttpServletRequest request,
            @RequestBody Map<String, List<String[]>> values
    ) throws Exception{
        HttpSession session = request.getSession();
        Integer size = values.get("values").size();
        List<EProyecto> listPro = new ArrayList<>();
        EProyecto oePro;
        String[] row;

        for(int i = 0; i < size; ++i){
            oePro = new EProyecto();
            row = values.get("values").get(i);
            oePro.setIdProyecto(0);
            oePro.setIdEmpresa(new EEmpresa(Integer.parseInt(row[1])));
            oePro.setNomProyecto(row[0].toString());
            oePro.setJefeProyecto(row[2].toString());
            oePro.setFechaInicio(row[3].toString());
            oePro.setFechapFinal(row[4].toString());
            oePro.setIdEstado(row[5]);
            oePro.setTmpEstimCoti(row[6]);
            oePro.setInverEstim(row[7]);
            oePro.setEstado("1");

            oePro.setUserReg(session.getAttribute("access").toString());
            listPro.add(oePro);
            System.out.println("listArea: " + listPro);
        }
        String mensaje = obPro.Validar(listPro);
        if(mensaje.equals("0")) {
            return "";
        }
        else {
            return mensaje;
        }
    }

    @RequestMapping(value="/proyecto/search", method = RequestMethod.POST)
    public @ResponseBody String BuscarProyecto(
            @RequestParam(value = "pro") String busPro,
            @RequestParam(value = "emp") String busEmp,
            @RequestParam(value = "jef") String busJef
    ) throws Exception{
        String html = "";
        String campos = "";
        if(busPro.equals("") && busEmp.equals("") && busJef.equals("")){
            campos="/";
        }
        else{
            if(busPro.equals("")){ busPro = "%"; }
            if(busEmp.equals("")){ busEmp = "%"; }
            if(busJef.equals("")){ busJef = "%"; }
            campos = busPro + "," + busEmp +"," + busJef;
        }

        List<EProyecto> listBusPro = obPro.Buscar(campos);
        Integer size = listBusPro.size();

        if(size!=0){
            List<String[]> list = new ArrayList<>();

            for(int i = 0; i < size; ++i){
                String var = listBusPro.get(i).getIdEmpresa().getIdempresa().toString() + ",4";
                List<EEmpresa> listEmp= obEmp.Buscar(var);

                String[] row = {
                        listBusPro.get(i).getIdProyecto().toString(),
                        listBusPro.get(i).getNomProyecto().toString(),
//                        listBusPro.get(i).getIdEmpresa().getIdempresa().toString(),
                        listEmp.get(0).getNomempresa(),
                        listBusPro.get(i).getJefeProyecto(),
                        listBusPro.get(i).getFechaInicio(),
//                        listBusPro.get(i).getFechapFinal(),
                        listBusPro.get(i).getFechaFin(),
                        listBusPro.get(i).getEstado(),
                        listBusPro.get(i).getTmpEstimCoti(),
                        listBusPro.get(i).getInverEstim()
//                        listBusPro.get(i).getCantReq(),
//                        listBusPro.get(i).getUserReg(),
//                        listBusPro.get(i).getFechaReg()
                };
                list.add(row);
            }
            System.out.println("Lista Controlador: " + list);

            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_area_idpro", "text"};
            String[] row2 = {"input", "Vtxt_area_nompro", "text"};
            String[] row3 = {"input", "txt_area_idemp", "text"};
            String[] row4 = {"input", "txt_area_jef", "text"};
            String[] row5 = {"input", "txt_area_fchini", "text"};
            String[] row6 = {"input", "txt_area_fchpfin", "text"};
            String[] row7 = {"input", "txt_area_est", "text"};
            String[] row8 = {"input", "txt_area_tmpcot", "text"};
            String[] row9 = {"input", "txt_area_invest", "text"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);
            listTipoDato.add(row6);
            listTipoDato.add(row7);
            listTipoDato.add(row8);
            listTipoDato.add(row9);


            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(list, listTipoDato, null, "_Proyecto");

            return html;
        }
        else {
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }

    }

    @RequestMapping(value="/proyecto/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarProyecto(
            @RequestParam(value="i") Integer id
    ) throws Exception{
        obPro.Eliminar(id.toString());
        return "";
    }

    @RequestMapping(value="/proyecto/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarProyecto(
            @RequestParam(value="i") Integer i,
            @RequestParam(value="pro") String pro,
            @RequestParam(value="emp") Integer emp,
            @RequestParam(value="jef") String jef,
            @RequestParam(value="est") String est,
            @RequestParam(value="tmp") String tmp,
            @RequestParam(value="inv") String inv
    ) throws Exception{
        EProyecto oePro = new EProyecto();
        oePro.setIdProyecto(i);
        oePro.setNomProyecto(pro);
        oePro.setIdEmpresa(new EEmpresa(emp));
        oePro.setJefeProyecto(jef);
        oePro.setIdEstado(est);
        oePro.setTmpEstimCoti(tmp);
        oePro.setInverEstim(inv);
        obPro.Modificar(oePro);
        return "";
    }


    @RequestMapping("/proyecto/buscarempresa")
    public @ResponseBody String BuscarEmpresa(
    ) throws Exception {
        return obPro.BuscarEmpresa();
    }


    @RequestMapping("/proyecto/buscarempleado")
    public @ResponseBody String BuscarEmpleado(
    ) throws Exception {
        return obPro.BuscarEmpleado();
    }

    @RequestMapping("/proyecto/buscartipo")
    public @ResponseBody String BuscarTipo(
    ) throws Exception {
        return obPro.BuscarTipo();
    }

    @RequestMapping("/proyecto/buscarempresas")
    public @ResponseBody String BuscarEmpresas(
            @RequestParam(value="var") String var
    ) throws Exception {
        return obPro.BuscarEmpresas(var);
    }

}
