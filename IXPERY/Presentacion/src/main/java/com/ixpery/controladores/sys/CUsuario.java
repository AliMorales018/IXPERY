package com.ixpery.controladores.sys;

import com.ixpery.controladores.tools.GeneralHTML;
import com.ixpery.entidades.rhh.EEmpleado;
import com.ixpery.entidades.sys.EUsuario;
import com.ixpery.negocio.rhh.BEmpleado;
import com.ixpery.negocio.sys.BUsuario;
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
public class CUsuario {

    //PARA LISTAR EL COMBO EMPLEADO O PERSONAL
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEmpleado obEmpleado = (BEmpleado) applicationContext.getBean("beanEmpleado");

    ApplicationContext applicationContext2 = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BUsuario obUsuario = (BUsuario) applicationContext2.getBean("beanUsuario");

    @RequestMapping("/usuario")
    public ModelAndView Usuario() throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("sistema/usuario");

        //GENERAMOS LA LISTA DE EMPLEADOS PARA LA VISTA
        List<EEmpleado> listEmpleado = AllEmpleados();
        modelView.addObject("fecha",dateParse);
        modelView.addObject("listEmpleados",listEmpleado);
        return modelView;
    }

    public List<EEmpleado> AllEmpleados() throws Exception{
        List<EEmpleado> listEmpleado = new ArrayList<EEmpleado>();
        listEmpleado = obEmpleado.Buscar("/");
        return listEmpleado;
    }

    @RequestMapping(value="/usuario/register", method = RequestMethod.POST)
    public @ResponseBody String RegistrarUsuario(
            @RequestBody Map<String,List<String[]>> values
    ) throws Exception{

        Integer sizeList = values.get("values").size();

        List<EUsuario> listUsuario = new ArrayList<EUsuario>();
        EUsuario oeUsuario;
        String[] row;

        for(int i = 0; i < sizeList; i++){
            oeUsuario = new EUsuario();
            row =  values.get("values").get(i);
            oeUsuario.setIduser(0);
            oeUsuario.setLogin(row[0]);
            oeUsuario.setNombres(row[1]);
            oeUsuario.setPaterno(row[2]);
            oeUsuario.setMaterno(row[3]);
            oeUsuario.setEstado(row[4]);
            //String clave = Encriptacion.encrypt(row[5]);
            oeUsuario.setClave(row[5]);
            oeUsuario.setIdpersonal(Integer.parseInt(row[6]));
            oeUsuario.setCorreo(row[7]);
            listUsuario.add(oeUsuario);
        }

        String msjResult = obUsuario.ValidarDatosDB(listUsuario);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value="/usuario/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarUsuario(
            @RequestParam(value="user") String busUser,
            @RequestParam(value="nom") String busNom,
            @RequestParam(value="apep") String busApep,
            @RequestParam(value="apem") String busApem
    ) throws Exception{
        String html="";
        String campos = "";
        if(busUser.equals("") && busNom.equals("") && busApep.equals("") && busApem.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(busUser.equals("")){ busUser="%";}
            if(busNom.equals("")){ busNom="%";}
            if(busApep.equals("")){ busApep="%";}
            if(busApem.equals("")){ busApem="%";}
            campos = busUser+","+busNom+","+busApep+","+busApem;
        }

        List<EUsuario> listUserBus= obUsuario.Buscar(campos);
        //CONVERTIMOS LA LISTA DE APLICACIONES A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listUserBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listUserBus.size(); i++) {
                String[] row = {
                        listUserBus.get(i).getIduser().toString(),
                        listUserBus.get(i).getLogin(),
                        listUserBus.get(i).getNombres(),
                        listUserBus.get(i).getPaterno(),
                        listUserBus.get(i).getMaterno(),
                        listUserBus.get(i).getEstado(),
                        listUserBus.get(i).getClave(),
                        listUserBus.get(i).getIdpersonal().toString(),
                        listUserBus.get(i).getCorreo()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_usuario_idusu", "text"};
            String[] row2 = {"input", "Vtxt_usuario_user", "text"};
            String[] row3 = {"input", "txt_usuario_nombre", "text"};
            String[] row4 = {"input", "txt_usuario_apep", "text"};
            String[] row5 = {"input", "txt_usuario_apem", "text"};
            String[] row6 = {"select", "cmb_usuario_estado", "estado"};
            String[] row7 = {"input", "txt_usuario_clave", "password"};
            String[] row8 = {"select", "cmb_usuario_empleado", ""};
            String[] row9 = {"input", "txt_usuario_correo", "text"};

            listTipoDato.add(row1);
            listTipoDato.add(row2);
            listTipoDato.add(row3);
            listTipoDato.add(row4);
            listTipoDato.add(row5);
            listTipoDato.add(row6);
            listTipoDato.add(row7);
            listTipoDato.add(row8);
            listTipoDato.add(row9);

            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO DE EMPLEADOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            List<EEmpleado> listEmpleado = AllEmpleados();
            List<String[]> listaStringEmpleado = new ArrayList<>();

            for(int i = 0; i < listEmpleado.size(); i++ ){
                EEmpleado oEmpl = listEmpleado.get(i);
                String[] row = {
                        oEmpl.getIdempleado().toString(),
                        oEmpl.getNombre()+" "+oEmpl.getApellidopaterno()+" "+oEmpl.getApellidomaterno()+" - "+oEmpl.getDni()
                };
                listaStringEmpleado.add(row);
            }
            //AGREGAMOS LA LISTA STRING DE EMPLEADOS A LA LISTA MULTIDIMENSIONAL
            listaSelect.add(listaStringEmpleado);

            GeneralHTML gHTML = new GeneralHTML();
            html = gHTML.ConvertDataToHtml(lista, listTipoDato, listaSelect, "_Usuario");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/usuario/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarUsuario(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obUsuario.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/usuario/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarUsuario(
            @RequestParam(value="i") Integer i,
            @RequestParam(value="usr") String usr,
            @RequestParam(value="nom") String nom,
            @RequestParam(value="ap") String ap,
            @RequestParam(value="am") String am,
            @RequestParam(value="est") String est,
            @RequestParam(value="cla") String cla,
            @RequestParam(value="idp") Integer idp,
            @RequestParam(value="ema") String ema
    ) throws Exception{
        EUsuario oeUsuario = new EUsuario();
        oeUsuario.setIduser(i);
        oeUsuario.setLogin(usr);
        oeUsuario.setNombres(nom);
        oeUsuario.setPaterno(ap);
        oeUsuario.setMaterno(am);
        oeUsuario.setEstado(est);
        //String pass = Encriptacion.encrypt(cla);
        oeUsuario.setClave(cla);
        oeUsuario.setIdpersonal(idp);
        oeUsuario.setCorreo(ema);
        obUsuario.Modificar(oeUsuario);
        return "";
    }
}