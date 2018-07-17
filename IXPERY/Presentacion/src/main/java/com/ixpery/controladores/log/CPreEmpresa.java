package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.log.ECliente;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.negocio.log.BCliente;
import com.ixpery.negocio.log.BEmpresa;
import com.ixpery.negocio.log.BEstado;
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
public class CPreEmpresa {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEmpresa obEmpresa= (BEmpresa) applicationContext.getBean("beanEmpresa");
    BCliente obCliente = (BCliente) applicationContext.getBean("beanCliente");
    BEstado obEstado = (BEstado) applicationContext.getBean("beanEstado");

    @RequestMapping("/preempresa")
    public ModelAndView Preempresa() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("/logistica/preempresa");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/preempresa/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarPreempresa(@RequestBody Map<String,List<String[]>> values) throws Exception{
        Integer tipoReg=1;
        Integer sizeList = values.get("values").size();

        List<EEmpresa> listPreEmpr = new ArrayList<EEmpresa>();
        EEmpresa oeEmpresa;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeEmpresa = new EEmpresa();
            row =  values.get("values").get(i);
            oeEmpresa.setIdempresa(0);
            oeEmpresa.setRuc(row[0]);
            oeEmpresa.setDireccion(row[2]);
            oeEmpresa.setCorreo(row[3]);
            oeEmpresa.setTelefono(row[4]);
            oeEmpresa.setNomcomercial(row[1]);
            oeEmpresa.setEstado("1");
            oeEmpresa.setIdestado(2);
            oeEmpresa.setNomsituacion("DESAPROBADO");
            oeEmpresa.setIdcliente(new ECliente(0));
            oeEmpresa.setEmpleadopr("luis");
            listPreEmpr.add(oeEmpresa);
        }

        String msjResult = obEmpresa.ValidarDatosDB(listPreEmpr,tipoReg);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value="/preempresa/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarEmpresa(
            @RequestParam(value="ruc") String busRuc,
            @RequestParam(value="nom") String busNom,
            @RequestParam(value="opc") String busOpc
    ) throws Exception{
        String html="";
        String campos = "";
        campos = busRuc+","+busNom+","+busOpc+"";

        List<EEmpresa> listEmprBus= obEmpresa.Buscar(campos);
        //CONVERTIMOS LA LISTA DE EMPRESAS A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listEmprBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listEmprBus.size(); i++) {
                String[] row = {
                        listEmprBus.get(i).getIdempresa().toString(),
                        listEmprBus.get(i).getRuc(),
                        listEmprBus.get(i).getNomcomercial(),
                        listEmprBus.get(i).getDireccion(),
                        listEmprBus.get(i).getCorreo(),
                        listEmprBus.get(i).getTelefono(),
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_preempresa_idpre", "text"};
            String[] row2 = {"input", "Vtxt_preempresa_ruc", "text"};
            String[] row3 = {"input", "txt_preempresa_nombre", "text"};
            String[] row4 = {"input", "txt_preempresa_dire", "text"};
            String[] row5 = {"input", "txt_preempresa_emai", "text"};
            String[] row6 = {"input", "txt_preempresa_tele", "text"};
            //String[] row7 = {"input", "txt_preempresa_ubig", "text"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);
            listTipoDato.add(row6);
            //listTipoDato.add(row7);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_preempresa");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/preempresa/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarEmpresa(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obEmpresa.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/preempresa/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarEmpresa(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="ruc") String ruc,
            @RequestParam(value="dir") String dir,
            @RequestParam(value="ema") String ema,
            @RequestParam(value="tel") String tel,
            @RequestParam(value="nom") String nom
    ) throws Exception{
        EEmpresa oeEmpresa = new EEmpresa();
        oeEmpresa.setIdempresa(id);
        oeEmpresa.setRuc(ruc);
        oeEmpresa.setDireccion(dir);
        oeEmpresa.setCorreo(ema);
        oeEmpresa.setTelefono(tel);
        oeEmpresa.setNomcomercial(nom);

        obEmpresa.Modificar(oeEmpresa);
        return "";
    }

    @RequestMapping(value="/preempresa/editbloque", method = RequestMethod.POST)
    public @ResponseBody String EditarBloquePreempresa(@RequestBody Map<String,List<String[]>> values) throws Exception{
        Integer tipoReg=1;
        Integer sizeList = values.get("values").size();

        List<EEmpresa> listPreEmpr = new ArrayList<EEmpresa>();
        EEmpresa oeEmpresa;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeEmpresa = new EEmpresa();
            row =  values.get("values").get(i);
            oeEmpresa.setIdempresa(Integer.parseInt(row[0]));
            oeEmpresa.setRuc(row[1]);
            oeEmpresa.setNomcomercial(row[2]);
            oeEmpresa.setDireccion(row[3]);
            oeEmpresa.setCorreo(row[4]);
            oeEmpresa.setTelefono(row[5]);
            listPreEmpr.add(oeEmpresa);
        }

        String msjResult = obEmpresa.ValidarDatosUpdate(listPreEmpr,tipoReg);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }
}