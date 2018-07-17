package com.ixpery.controladores.sys;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.negocio.sys.BAplicacion;
import com.ixpery.negocio.sys.BPerfil;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class CPerfil {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BAplicacion obAplicacion = (BAplicacion) applicationContext.getBean("beanAplicacion");

    ApplicationContext applicationContext2 = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BPerfil obPerfil = (BPerfil) applicationContext.getBean("beanPerfil");

    @RequestMapping("/perfil")
    public ModelAndView Usuario() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("sistema/perfil");

        //GENERAMOS LA LISTA DE EMPLEADOS PARA LA VISTA
        List<EAplicacion> listAplicacion = AllAplicaciones();
        modelView.addObject("fecha",dateParse);
        modelView.addObject("listApli",listAplicacion);
        return modelView;
    }

    public List<EAplicacion> AllAplicaciones() throws Exception{
        List<EAplicacion> listApli = obAplicacion.Buscar("/");
        return listApli;
    }

    @RequestMapping(value="/perfil/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarPerfil(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{

        Integer sizeList = values.get("values").size();

        List<EPerfil> listPerfil = new ArrayList<>();
        EPerfil oePerfil;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oePerfil = new EPerfil();
            row =  values.get("values").get(i);
            oePerfil.setIdperfil(0);
            oePerfil.setIdapli(Integer.parseInt(row[0]));
            oePerfil.setPerfil(row[1]);
            oePerfil.setEstado(row[2]);
            oePerfil.setUsuariocreacion("Dante");
            listPerfil.add(oePerfil);
        }

        String msjResult = obPerfil.ValidarDatosDB(listPerfil);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value="/perfil/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarPerfil(
            @RequestParam(value="nom") String busNom
    ) throws Exception{
        String html="";
        String campos = "";
        if(busNom.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            campos = busNom;
        }

        List<EPerfil> listPerfil= obPerfil.Buscar(campos);
        //CONVERTIMOS LA LISTA DE PERFILES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listPerfil.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listPerfil.size(); i++) {
                String[] row = {
                        listPerfil.get(i).getIdperfil().toString(),
                        listPerfil.get(i).getIdapli().toString(),
                        listPerfil.get(i).getPerfil(),
                        listPerfil.get(i).getEstado()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_perfil_idperf", "text"};
            String[] row2 = {"select", "cmb_perfil_idapli", ""};
            String[] row3 = {"input", "Vtxt_perfil_nombre", "text"};
            String[] row4 = {"select", "cmb_perfil_estado", "estado"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL
            List<List<String[]>> listaSelect = new ArrayList<>();

            List<EAplicacion> listApli =  obAplicacion.Buscar("/");

            List<String[]> lisApliString = new ArrayList<>();

            for (int i = 0; i < listApli.size(); i++){
                String[] row = {
                      listApli.get(i).getIdapli().toString(),
                      listApli.get(i).getAplicacion()
                };
                lisApliString.add(row);
            }

            listaSelect.add(lisApliString);

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_Perfil");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/perfil/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarPerfil(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obPerfil.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/perfil/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarPerfil(
            @RequestParam(value="i") Integer i,
            @RequestParam(value="ia") String ia,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="est") String est
    ) throws Exception{
        EPerfil oePerfil = new EPerfil();
        oePerfil.setIdperfil(i);
        oePerfil.setIdapli(Integer.parseInt(ia));
        oePerfil.setPerfil(nom);
        oePerfil.setEstado(est);
        oePerfil.setUsuariomodificacion("Dante Modifico");
        obPerfil.Modificar(oePerfil);
        return "";
    }

}
