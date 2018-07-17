package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.log.EContactoEmpresa;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.negocio.log.BContactoEmpresa;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class CContactoEmpresa {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BContactoEmpresa obContactoEmpresa = (BContactoEmpresa) applicationContext.getBean("beanContactoEmpresa");

    @RequestMapping("/contactoempresa")
    public ModelAndView Aplicacion() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/contactoempresa");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/contactoempresa/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarRequerimiento(
            @RequestParam(value = "iE") Integer iE,
            @RequestParam(value = "values") String lisRq
    ) throws Exception{
        String[] array = lisRq.split(",");
        List<EContactoEmpresa> listContactos= new ArrayList<>();
        EContactoEmpresa oeContactoEmpresa;

        for (int i = 0; i < array.length; i++) {
            oeContactoEmpresa = new EContactoEmpresa();
            oeContactoEmpresa.setIdcontacto(0);
            oeContactoEmpresa.setIdempresa(new EEmpresa(iE));
            oeContactoEmpresa.setNomcontacto(array[i]);
            oeContactoEmpresa.setApellpaterno(array[i + 1]);
            oeContactoEmpresa.setApellmaterno(array[i + 2]);
            oeContactoEmpresa.setDni(array[i + 3]);
            oeContactoEmpresa.setCiudad(array[i + 4]);
            oeContactoEmpresa.setTelefono(array[i + 5]);
            oeContactoEmpresa.setCargo(array[i + 6]);
            oeContactoEmpresa.setDireccion(array[i + 7]);
            oeContactoEmpresa.setCorreo(array[i + 8]);
            oeContactoEmpresa.setEstado("1");
            listContactos.add(oeContactoEmpresa);
            i+=8;
        }

        obContactoEmpresa.Insertar(listContactos);
        return "";
    }

    @RequestMapping(value="/contactoempresa/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarContacto(
            @RequestParam(value="iE") Integer iE,
            @RequestParam(value="nom") String nom
            //@RequestParam(value="pat") String pat,
            //@RequestParam(value="mat") String mat,
            //@RequestParam(value="dni") String dni
    ) throws Exception{
        String html;

        /*String campos = "";
        if(nom.equals("") && pat.equals("") && mat.equals("") && dni.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(nom.equals("")){ nom="%";}
            if(pat.equals("")){ pat="%";}
            if(mat.equals("")){ mat="%";}
            if(dni.equals("")){ dni="%";}
            campos = nom+","+pat+","+mat+","+dni;
        }*/

        List<EContactoEmpresa> listContactoEmpresa= obContactoEmpresa.Buscar(iE,nom);

        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listContactoEmpresa.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listContactoEmpresa.size(); i++) {
                String[] row = {
                        listContactoEmpresa.get(i).getIdcontacto().toString(),
                        listContactoEmpresa.get(i).getNomcontacto(),
                        listContactoEmpresa.get(i).getApellpaterno(),
                        listContactoEmpresa.get(i).getApellmaterno(),
                        listContactoEmpresa.get(i).getDni(),
                        listContactoEmpresa.get(i).getCiudad(),
                        listContactoEmpresa.get(i).getTelefono(),
                        listContactoEmpresa.get(i).getCargo(),
                        listContactoEmpresa.get(i).getDireccion(),
                        listContactoEmpresa.get(i).getCorreo(),
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_contactoempresa_id", "text"};
            String[] row2 = {"input", "txt_contactoempresa_nom", "text"};
            String[] row3 = {"input", "txt_contactoempresa_apep", "text"};
            String[] row4 = {"input", "txt_contactoempresa_apem", "text"};
            String[] row5 = {"input", "txt_contactoempresa_dni", "text"};
            String[] row6 = {"input", "txt_contactoempresa_ciudad", "text"};
            String[] row7 = {"input", "txt_contactoempresa_telef", "text"};
            String[] row8 = {"input", "txt_contactoempresa_cargo", "text"};
            String[] row9 = {"input", "txt_contactoempresa_direc", "text"};
            String[] row10 = {"input", "txt_contactoempresa_correo", "text"};

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

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO NINGUNA
            List<List<String[]>> listaSelect = new ArrayList<>();

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_ContactoEmpresa");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/contactoempresa/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarContacto(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="ap") String ap,
            @RequestParam(value="am") String am,
            @RequestParam(value="dni") String dni,
            @RequestParam(value="ciu") String ciu,
            @RequestParam(value="tel") String tel,
            @RequestParam(value="car") String car,
            @RequestParam(value="dir") String dir,
            @RequestParam(value="cor") String cor
    ) throws Exception{
        EContactoEmpresa oeContacto = new EContactoEmpresa();
        oeContacto.setIdcontacto(id);
        oeContacto.setNomcontacto(nom);
        oeContacto.setApellpaterno(ap);
        oeContacto.setApellmaterno(am);
        oeContacto.setDni(dni);
        oeContacto.setCiudad(ciu);
        oeContacto.setTelefono(tel);
        oeContacto.setCargo(car);
        oeContacto.setDireccion(dir);
        oeContacto.setCorreo(cor);
        oeContacto.setEstado("1");
        obContactoEmpresa.Modificar(oeContacto);
        return "";
    }

    @RequestMapping(value="/contactoempresa/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarContacto(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obContactoEmpresa.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/contactoempresa/busempresa", method=RequestMethod.POST)
    public @ResponseBody String BuscarEmpresaCombo(
            @RequestParam(value="var") String var
    ) throws Exception{
        return obContactoEmpresa.BuscarEmpresaCombo(var);
    }
}
