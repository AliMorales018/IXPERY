package com.ixpery.controladores.sys;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.negocio.sys.BAplicacion;
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
public class CAplicacion {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BAplicacion obAplicacion = (BAplicacion) applicationContext.getBean("beanAplicacion");

    @RequestMapping("/aplicacion")
    public ModelAndView Aplicacion() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("sistema/aplicacion");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/aplicacion/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarAplicacion(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{

        Integer sizeList = values.get("values").size();

        List<EAplicacion> listApli = new ArrayList<EAplicacion>();
        EAplicacion oeAplicacion;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeAplicacion = new EAplicacion();
            row =  values.get("values").get(i);
            oeAplicacion.setIdapli(0);
            oeAplicacion.setAplicacion(row[0]);
            oeAplicacion.setEstado(row[1]);
            oeAplicacion.setVersion(row[2]);
            oeAplicacion.setAbreviatura(row[3]);
            listApli.add(oeAplicacion);
        }

        String msjResult = obAplicacion.ValidarDatosDB(listApli);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value="/aplicacion/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarAplicacion(
            @RequestParam(value="nom") String busNom,
            @RequestParam(value="abr") String busAbrev
    ) throws Exception{
        String html="";
        String campos = "";
        if(busNom.equals("") && busAbrev.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(busNom.equals("")){ busNom="%";}
            if(busAbrev.equals("")){ busAbrev="%";}
            campos = busNom+","+busAbrev+"";
        }

        List<EAplicacion> listApliBus= obAplicacion.Buscar(campos);
        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listApliBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listApliBus.size(); i++) {
                String[] row = {
                        listApliBus.get(i).getIdapli().toString(),
                        listApliBus.get(i).getAplicacion(),
                        listApliBus.get(i).getEstado(),
                        listApliBus.get(i).getVersion(),
                        listApliBus.get(i).getAbreviatura()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_aplicacion_idapli", "text"};
            String[] row2 = {"input", "Vtxt_aplicacion_nombre", "text"};
            String[] row3 = {"select", "cmb_aplicacion_estado", "estado"};
            String[] row4 = {"input", "txt_aplicacion_version", "text"};
            String[] row5 = {"input", "txt_aplicacion_abrevia", "text"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_Aplicacion");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/aplicacion/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarAplicacion(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obAplicacion.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/aplicacion/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarAplicacion(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="est") String est,
            @RequestParam(value="ver") String ver,
            @RequestParam(value="abr") String abr
    ) throws Exception{
        EAplicacion oeAplicacion = new EAplicacion();
        oeAplicacion.setIdapli(id);
        oeAplicacion.setAplicacion(nom);
        oeAplicacion.setEstado(est);
        oeAplicacion.setVersion(ver);
        oeAplicacion.setAbreviatura(abr);
        obAplicacion.Modificar(oeAplicacion);
        return "";
    }
}
