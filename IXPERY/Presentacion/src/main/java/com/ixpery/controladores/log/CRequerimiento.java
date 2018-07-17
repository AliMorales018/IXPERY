package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EEstado;
import com.ixpery.entidades.log.EProyecto;
import com.ixpery.entidades.log.ERequerimiento;
import com.ixpery.negocio.log.BEmpresa;
import com.ixpery.negocio.log.BEstado;
import com.ixpery.negocio.log.BProyecto;
import com.ixpery.negocio.log.BRequerimiento;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CRequerimiento {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEmpresa obEmpresa = (BEmpresa) applicationContext.getBean("beanEmpresa");
    BProyecto obProyecto = (BProyecto) applicationContext.getBean("beanProyecto");
    BEstado obEstado = (BEstado) applicationContext.getBean("beanEstado");
    BRequerimiento obRequerimiento = (BRequerimiento) applicationContext.getBean("beanRequerimiento");

    @RequestMapping("/requerimiento")
    public ModelAndView Requerimiento() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/requerimiento");
        modelView.addObject("fecha",dateParse);

        //Estados de Requerimiento
        List<EEstado> listEstado = AllEstado();
        modelView.addObject("listEstados",listEstado);
        return modelView;
    }

    public List<EEstado> AllEstado() throws Exception{
        List<EEstado> listEstado = obEstado.Buscar2();
        return listEstado;
    }

    @RequestMapping(value="/requerimiento/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarRequerimiento(
            @RequestParam(value = "iP") Integer iP,
            @RequestParam(value = "values") String lisRq
    ) throws Exception{
        String[] array = lisRq.split(",");
        List<ERequerimiento> listRQ= new ArrayList<>();
        ERequerimiento oeRequerimiento;

        for (int i = 0; i < array.length; i++){
            oeRequerimiento = new ERequerimiento();
            oeRequerimiento.setIdrequerimiento(0);
            oeRequerimiento.setIdproyecto(new EProyecto(iP));
            oeRequerimiento.setNomrequerimiento(array[i]);
            oeRequerimiento.setIdestado(Integer.parseInt(array[i+1]));
            oeRequerimiento.setEstado(array[i+2]);
            listRQ.add(oeRequerimiento);
            i+=2;
        }
        obRequerimiento.Insertar(listRQ);
        return "";
    }

    @RequestMapping(value="/requerimiento/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarRequerimiento(
            @RequestParam(value="iP") Integer iP,
            @RequestParam(value="nom") String busNom
    ) throws Exception{
        String html;
        List<ERequerimiento> listRq= obRequerimiento.Buscar(iP,busNom);
        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listRq.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listRq.size(); i++) {
                String[] row = {
                        listRq.get(i).getIdrequerimiento().toString(),
                        listRq.get(i).getNomrequerimiento(),
                        listRq.get(i).getIdestado().toString(),
                        listRq.get(i).getEstado()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_requerimiento_idreq", "text"};
            String[] row2 = {"input", "Vtxt_requerimiento_nombre", "text"};
            String[] row3 = {"select", "cmb_requerimiento_idnivel", ""};
            String[] row4 = {"select", "cmb_requerimiento_estado", "estado"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO DE NIVEL
            List<List<String[]>> listaSelect = new ArrayList<>();
            List<EEstado> listEstado = AllEstado();

            List<String[]> listSelectNivel = new ArrayList<>();
            for (int i=0; i < listEstado.size(); i++){
                String[] row = {
                        listEstado.get(i).getIdestado().toString(),
                        listEstado.get(i).getNomestado()
                };
                listSelectNivel.add(row);
            }

            listaSelect.add(listSelectNivel);

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_Requerimiento");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/requerimiento/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarAplicacion(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="niv") String niv,
            @RequestParam(value="est") String est
    ) throws Exception{
        ERequerimiento oeRequerimiento = new ERequerimiento();
        oeRequerimiento.setIdrequerimiento(id);
        oeRequerimiento.setNomrequerimiento(nom);
        oeRequerimiento.setIdestado(Integer.parseInt(niv));
        oeRequerimiento.setEstado(est);
        obRequerimiento.Modificar(oeRequerimiento);
        return "";
    }

    @RequestMapping(value="/requerimiento/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarUsuario(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obRequerimiento.Eliminar(ID.toString());
        return "";
    }

    //Busqueda Proyectos por Empresa.
    @RequestMapping(value = "/requerimiento/busempresa", produces = "application/json")
    public @ResponseBody String BuscarEmpresasReq(
           @RequestParam(value="q") String var
    ) throws Exception {
        return obEmpresa.BuscarEmpresaProyectoCombo(var);
    }
}
