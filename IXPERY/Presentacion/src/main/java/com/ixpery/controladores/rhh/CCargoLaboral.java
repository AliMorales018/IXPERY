package com.ixpery.controladores.rhh;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.rhh.EArea;
import com.ixpery.entidades.rhh.ECargoLaboral;
import com.ixpery.negocio.rhh.BArea;
import com.ixpery.negocio.rhh.BCargoLaboral;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class CCargoLaboral {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BCargoLaboral obCargoLaboral = (BCargoLaboral) applicationContext.getBean("beanCargoLaboral");
    BArea obArea = (BArea) applicationContext.getBean("beanArea");

    @RequestMapping("/cargolaboral/sesioncl")
    public @ResponseBody void SesionCl(
            HttpServletRequest request,
            @RequestParam(value="idCargo") Integer idCargo
    )throws Exception{
        HttpSession session = request.getSession();
        session.setAttribute("cargolaboral", idCargo);
    }

    @RequestMapping("/cargolaboral/getsesioncl")
    public @ResponseBody Integer VerifSesionCl(
            HttpServletRequest request
    )throws Exception{
        HttpSession session = request.getSession();
        Integer idCargo = (Integer) session.getAttribute("cargolaboral");
        if (idCargo == null){
            return 0;
        }else{
            return idCargo;
        }
    }

    @RequestMapping("/cargolaboral")
    public ModelAndView CargoLaboral() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("rrhh/cargoLaboral");
        modelView.addObject("fecha",dateParse);

        //Lista de Areas
        List<EArea> listArea = AllAreas();
        modelView.addObject("areas",listArea);

        return modelView;
    }

    @RequestMapping("/verhistorialcargolab")
    public @ResponseBody String verHistorialSalarioCL(
            @RequestParam(value="idCL") Integer idCL
    ) throws Exception{
        String a = obCargoLaboral.ListarHistorialSalario(idCL);
        System.out.println("LISTA DE CONTROLADOR: "+a);
        return a;
    }

    @RequestMapping("/historialsalario")
    public ModelAndView HistorialSalario() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/historialsalario");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/historialsalariocl/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarHistorialSalario(
            @RequestParam(value="json") String json,
            @RequestParam(value="idCargo") String idCargo,
            @RequestParam(value="fechafin") String fecha
    ) throws Exception{
        obCargoLaboral.RegistrarHistorialSalario(json,idCargo,fecha);
        return "";
    }

    public List<EArea> AllAreas() throws Exception{
        List<EArea> listArea = obArea.Buscar("/");
        return listArea;
    }

    @RequestMapping(value="/cargolaboral/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarCargoLaboral(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{

        Integer sizeList = values.get("values").size();

        List<ECargoLaboral> listCargoLaboral = new ArrayList<ECargoLaboral>();
        ECargoLaboral oeCargoLaboral;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeCargoLaboral = new ECargoLaboral();
            row =  values.get("values").get(i);
            oeCargoLaboral.setIdcargo(0);
            oeCargoLaboral.setIdarea(new EArea(Integer.parseInt(row[0])));
            oeCargoLaboral.setNomcargo(row[1]);
            oeCargoLaboral.setSalario(Integer.parseInt(row[2]));
            oeCargoLaboral.setEstado(row[3]);
            listCargoLaboral.add(oeCargoLaboral);
        }

        String msjResult = obCargoLaboral.ValidarDatosDB(listCargoLaboral);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value="/cargolaboral/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarCargoLaboral(
            @RequestParam(value="nom") String busNom
    ) throws Exception{
        String html="";
        String campos = "";
        if(busNom.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(busNom.equals("")){ busNom="%";}
            campos = busNom;
        }

        List<ECargoLaboral> listUMedBus= obCargoLaboral.Buscar(campos);
        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listUMedBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listUMedBus.size(); i++) {
                String[] row = {
                        listUMedBus.get(i).getIdcargo().toString(),
                        listUMedBus.get(i).getIdarea().getIdArea().toString(),
                        listUMedBus.get(i).getNomcargo(),
                        listUMedBus.get(i).getSalario().toString(),
                        listUMedBus.get(i).getEstado()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_cargolaboral_idcargo", "text"};
            String[] row2 = {"select", "cmb_cargolaboral_idarea", ""};
            String[] row3 = {"input", "Vtxt_cargolaboral_nomcargo", "text"};
            String[] row4 = {"input", "txt_cargolaboral_salario", "number"};
            String[] row5 = {"select", "cmb_cargolaboral_estado", "estado"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            //Generamos la lista de area
            List<EArea> listArea = AllAreas();
            List<String[]> listString = new ArrayList<>();

            for (int i=0; i < listArea.size(); i++){
                String [] row = {
                        listArea.get(i).getIdArea().toString(),
                        listArea.get(i).getNomArea()
                };
                listString.add(row);
            }
            //Añadimos lalista

            listaSelect.add(listString);

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_CargoLaboral");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/cargolaboral/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarCargoLaboral(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obCargoLaboral.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/cargolaboral/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarCargoLaboral(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="area") Integer area,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="sal") Double sal,
            @RequestParam(value="est") String estado

    ) throws Exception{
        ECargoLaboral oeCargoLaboral = new ECargoLaboral();

        oeCargoLaboral.setIdcargo(id);
        oeCargoLaboral.setIdarea(new EArea(area));
        oeCargoLaboral.setNomcargo(nom);
        oeCargoLaboral.setSalario(sal);
        oeCargoLaboral.setEstado(estado);
        obCargoLaboral.Modificar(oeCargoLaboral);
        return "";
    }


    @RequestMapping("/cargolaboral/DestruirSesionCargoLaboral")
    public @ResponseBody
    void EliminarSesionSolucion(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("cargolaboral", 0);
    }





}