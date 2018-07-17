package com.ixpery.controladores.rhh;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.rhh.EArea;
import com.ixpery.negocio.rhh.BArea;
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
public class CArea {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BArea obArea = (BArea) applicationContext.getBean("beanArea");
//    BEstado obEstado = (BEstado) applicationContext.getBean("beanEstado");

//    public List<EArea> ListarArea() throws Exception{
//        List<EArea> listArea = new ArrayList<EArea>();
//        listArea = obArea.Buscar("/");
//        return listArea;
//    }

    @RequestMapping("/area")
    public ModelAndView Area() throws Exception{
        ModelAndView modelAndView = new ModelAndView("rrhh/area");
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);

//        List<EArea> listArea = ListarArea();
//        modelAndView.addObject("fecha", dateParse);
//        modelAndView.addObject("listArea", listArea);

        return modelAndView;
    }

    @RequestMapping(value="/area/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarArea(@RequestBody Map<String, List<String[]>> values
    ) throws Exception{
        Integer size = values.get("values").size();
        List<EArea> listArea = new ArrayList<>();
        EArea oeArea;
        String[] row;

        for(int i = 0; i < size; ++i){
            oeArea = new EArea();
            row = values.get("values").get(i);
            oeArea.setIdArea(0);
            oeArea.setNomArea(row[0]);
            //oeArea.setEstado(row[1]);
            //oeArea.setFechaRegistro(row[2]);
            //oeArea.setUserRegistro(row[2]);
            listArea.add(oeArea);
            System.out.println("listArea: " + listArea);
        }
        String mensaje = obArea.Validar(listArea);
        if(mensaje.equals("0")) {
            return "";
        }
        else {
            return mensaje;
        }
    }

    @RequestMapping(value="/area/search", method = RequestMethod.POST)
    public @ResponseBody String BuscarArea(
            @RequestParam(value = "nom") String busNom
    ) throws Exception{
        String html = "";
        String campos = "";
        if(busNom.equals("")){
            busNom="%";
        }
        campos = busNom;

        List<EArea> listBusArea = obArea.Buscar(campos);
        Integer size = listBusArea.size();

        if(size!=0){
            List<String[]> list = new ArrayList<>();

            for(int i = 0; i < size; ++i){
                String[] row = {
                        listBusArea.get(i).getIdArea().toString(),
                        listBusArea.get(i).getNomArea(),
                        //listBusArea.get(i).getEstado(),
                        //listBusArea.get(i).getFechaRegistro(),
                        //listBusArea.get(i).getUserRegistro()
                };
                list.add(row);
            }
            System.out.println("Lista Controlador: " + list);

            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_area_idarea", "text"};
            String[] row2 = {"input", "Vtxt_area_nomarea", "text"};
            //String[] row3 = {"input", "txt_area_estado", "text"};
            //String[] row4 = {"input", "txt_area_fechRegistro", "text"};
            //String[] row4 = {"input", "txt_area_usreg", "text"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            //listTipoDato.add(row3);
            //listTipoDato.add(row4);
            //listTipoDato.add(row5);

//            List<List<String[]>> listSelect = new ArrayList<>();
//            List<EArea> listArea = ListarArea();
//            List<String[]> listStringArea = new ArrayList<>();
//            Integer sizeList = listArea.size();
//
//            for(int i = 0; i < sizeList; ++i){
//                EArea oeArea =
//
//            }

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(list, listTipoDato, null, "_Area");

            return html;
        }
        else {
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }

    }

    @RequestMapping(value = "/area/delete", method = RequestMethod.POST)
    public @ResponseBody String EliminarArea(
            @RequestParam(value = "i") Integer id
    ) throws Exception{
        obArea.Eliminar(id.toString());
        return "";
    }

    @RequestMapping(value = "/area/edit", method = RequestMethod.POST)
    public @ResponseBody String EditarArea(
            @RequestParam(value = "i") Integer id,
            @RequestParam(value = "nom") String nomArea
    /*      @RequestParam(value = "est") String est,
            @RequestParam(value = "fchReg") String fchReg,
            @RequestParam(value = "usreg") String usrReg */
    ) throws Exception{
        EArea oeArea = new EArea();
        oeArea.setIdArea(id);
        oeArea.setNomArea(nomArea);
        //oeArea.setEstado(est);
        //oeArea.setFechaRegistro(fchReg);
        //oeArea.setUserRegistro(usrReg);
        obArea.Modificar(oeArea);
        return "";
    }

}
