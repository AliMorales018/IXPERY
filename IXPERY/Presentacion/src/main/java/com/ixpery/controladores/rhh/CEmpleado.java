package com.ixpery.controladores.rhh;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.rhh.EArea;
import com.ixpery.entidades.rhh.EEmpleado;
import com.ixpery.negocio.rhh.BArea;
import com.ixpery.negocio.rhh.BEmpleado;
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
public class CEmpleado {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEmpleado obEmpleado = (BEmpleado) applicationContext.getBean("beanEmpleado");
    BArea obArea = (BArea) applicationContext.getBean("beanArea");

    @RequestMapping("/empleado")
    public ModelAndView Empleado() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("rrhh/empleado");

        //Lista de Areas
        List<EArea> listArea = obArea.Buscar("/");

        modelView.addObject("fecha",dateParse);
        modelView.addObject("areas",listArea);
        return modelView;
    }

    @RequestMapping(value="/empleado/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarEmpleado(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{

        Integer sizeList = values.get("values").size();

        List<EEmpleado> listEmpleado = new ArrayList<EEmpleado>();
        EEmpleado oeEmpleado;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeEmpleado = new EEmpleado();
            row =  values.get("values").get(i);
            oeEmpleado.setIdempleado(0);
            oeEmpleado.setIdarea(new EArea(Integer.parseInt(row[0])));
            oeEmpleado.setDni(row[1]);
            oeEmpleado.setNombre(row[2]);
            oeEmpleado.setApellidopaterno(row[3]);
            oeEmpleado.setApellidomaterno(row[4]);
            oeEmpleado.setTelefono(row[5]);
            oeEmpleado.setDireccion(row[6]);
            oeEmpleado.setFechanac(row[7]);
            oeEmpleado.setSexo(row[8]);
            oeEmpleado.setEstado(row[9]);
            listEmpleado.add(oeEmpleado);
        }

        String msjResult = obEmpleado.ValidarDatosDB(listEmpleado);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }


    @RequestMapping(value="/empleado/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarEmpleado(
            /*@RequestParam(value="nom") String busNom,*/
            /*@RequestParam(value="abr") String busAbrev*/
            @RequestParam(value="dni") String busDni,
            @RequestParam(value="nom") String busNom,
            @RequestParam(value="pat") String busPat,
            @RequestParam(value="mat") String busMat
    ) throws Exception{
        String html="";
        String campos = "";
        if(busDni.equals("") && busNom.equals("") && busPat.equals("") && busMat.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(busDni.equals("")){ busDni="%";}
            if(busNom.equals("")){ busNom="%";}
            if(busPat.equals("")){ busPat="%";}
            if(busMat.equals("")){ busMat="%";}
            campos = busDni+","+busNom+","+busPat+","+busMat+"";
        }

        List<EEmpleado> listEmpleadoBus= obEmpleado.Buscar(campos);
        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listEmpleadoBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listEmpleadoBus.size(); i++) {
                String[] row = {
                        listEmpleadoBus.get(i).getIdempleado().toString(),
                        listEmpleadoBus.get(i).getIdarea().toString(),
                        listEmpleadoBus.get(i).getDni(),
                        listEmpleadoBus.get(i).getNombre(),
                        listEmpleadoBus.get(i).getApellidopaterno(),
                        listEmpleadoBus.get(i).getApellidomaterno(),
                        listEmpleadoBus.get(i).getTelefono(),
                        listEmpleadoBus.get(i).getDireccion(),
                        listEmpleadoBus.get(i).getFechanac(),
                        listEmpleadoBus.get(i).getSexo(),
                        listEmpleadoBus.get(i).getEstado(),
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_empleado_idempleado", "text"};
            String[] row2 = {"input", "txt_empleado_idarea", "text"};
            String[] row3 = {"input", "Vtxt_empleado_dni", "text"};
            String[] row4 = {"input", "Vtxt_empleado_nombre", "text"};
            String[] row5 = {"input", "Vtxt_empleado_apaterno", "text"};
            String[] row6 = {"input", "Vtxt_empleado_amaterno", "text"};
            String[] row7 = {"input", "txt_empleado_telefono", "text"};
            String[] row8 = {"input", "txt_empleado_direccion", "text"};
            String[] row9 = {"input", "txt_empleado_fechanac", "date"};
            String[] row10 = {"select", "cmb_empleado_sexo", "sexo"};
            String[] row11 = {"select", "cmb_empleado_estado", "estado"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);
            listTipoDato.add(row6);
            listTipoDato.add(row7);
            listTipoDato.add(row8);
            listTipoDato.add(row9);
            listTipoDato.add(row10);
            listTipoDato.add(row11);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_Empleado");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/empleado/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarEmpleado(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obEmpleado.Eliminar(ID.toString());
        return "";
    }
    @RequestMapping(value="/empleado/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarEmpleado(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="area") Integer area,
            @RequestParam(value="dni") String dni,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="pat") String pat,
            @RequestParam(value="mat") String mat,
            @RequestParam(value="tel") String tel,
            @RequestParam(value="dir") String dir,
            @RequestParam(value="fec") String fec,
            @RequestParam(value="sex") String sex,
            @RequestParam(value="est") String est

    ) throws Exception{
        EEmpleado oeEmpleado = new EEmpleado();
        oeEmpleado.setIdempleado(id);
        oeEmpleado.setIdarea(new EArea(area));
        oeEmpleado.setDni(dni);
        oeEmpleado.setNombre(nom);
        oeEmpleado.setApellidopaterno(pat);
        oeEmpleado.setApellidomaterno(mat);
        oeEmpleado.setTelefono(tel);
        oeEmpleado.setDireccion(dir);
        oeEmpleado.setFechanac(fec);
        oeEmpleado.setSexo(sex);
        oeEmpleado.setEstado(est);

        obEmpleado.Modificar(oeEmpleado);
        return "";
    }
}
