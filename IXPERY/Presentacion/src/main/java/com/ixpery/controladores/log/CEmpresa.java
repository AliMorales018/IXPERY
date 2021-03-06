package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralCOMBOS;
import com.ixpery.controladores.tools.GeneralHTMLOPC;
import com.ixpery.controladores.tools.GeneralRUC;
import com.ixpery.entidades.log.*;
import com.ixpery.negocio.log.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
@Controller
public class CEmpresa {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEmpresa obEmpresa= (BEmpresa) applicationContext.getBean("beanEmpresa");
    BCliente obCliente = (BCliente) applicationContext.getBean("beanCliente");
    BEstado obEstado = (BEstado) applicationContext.getBean("beanEstado");
    BDepartamento obDepartamento = (BDepartamento) applicationContext.getBean("beanDepartamento");
    BProvincia obProvincia = (BProvincia) applicationContext.getBean("beanProvincia");
    BUbigeo obUbigeo = (BUbigeo) applicationContext.getBean("beanUbigeo");
    @RequestMapping("/empresa")
    public ModelAndView Empresa() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("/logistica/empresa");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/empresa/guardar", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarEmpresa(@RequestBody Map<String,List<String[]>> values) throws Exception{
        String msjResult="";
        Integer tipoReg=1;
        List<EEmpresa> listEmpr = new ArrayList<EEmpresa>();
        EEmpresa oeEmpresa=new EEmpresa();
        String[] row;
        oeEmpresa = new EEmpresa();
        row =  values.get("values").get(0);
        String tipoTrans=row[14];
        if(tipoTrans==null){
            tipoTrans="0";
        }
        oeEmpresa.setRuc(row[0]);
        oeEmpresa.setNomempresa(row[1]);
        oeEmpresa.setDireccion(row[2]);
        oeEmpresa.setDirfiscal(row[3]);
        oeEmpresa.setNomcomercial(row[4]);
        oeEmpresa.setRubro(row[5]);
        oeEmpresa.setReferencia(row[6]);
        oeEmpresa.setDescripcion(row[7]);
        oeEmpresa.setIdubigeo(new EUbigeo(row[8]));
        oeEmpresa.setTelefono(row[9]);
        oeEmpresa.setCorreo(row[10]);
        oeEmpresa.setSitioweb(row[11]);
        oeEmpresa.setCodigopostal(row[12]);
        oeEmpresa.setLogo(row[13]);
        oeEmpresa.setEstado("1");
        oeEmpresa.setIdestado(1);
        oeEmpresa.setNomsituacion("APROBADO");
        oeEmpresa.setUserregistro("LURIAS");
        oeEmpresa.setEmpleador("LURIASEMPLEA");
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        oeEmpresa.setFrr(dateFormat.format(date));

        if(Integer.parseInt(tipoTrans)<1){
            oeEmpresa.setIdempresa(0);
            listEmpr.add(oeEmpresa);
            msjResult = obEmpresa.ValidarDatosDB(listEmpr,tipoReg);
        }else{
            oeEmpresa.setIdempresa(Integer.parseInt(row[14]));
            listEmpr.add(oeEmpresa);
            obEmpresa.Modificar(oeEmpresa);
            msjResult="0";//Update
        }




        return  msjResult;
    }

    @RequestMapping(value="/empresa/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarEmpresa(@RequestBody Map<String,List<String[]>> values) throws Exception{
        Integer sizeList = values.get("values").size();
        List<EEmpresa> listEmpr = new ArrayList<EEmpresa>();
        EEmpresa oeEmpresa;
        String[] row;
        Integer tipoReg=1;

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
            oeEmpresa.setIdubigeo(new EUbigeo("140120"));
            oeEmpresa.setIdestado(2);
            oeEmpresa.setNomsituacion("DESAPROBADO");
            oeEmpresa.setIdcliente(new ECliente(0));
            oeEmpresa.setEmpleadopr("luis");
            listEmpr.add(oeEmpresa);
        }

        String msjResult = obEmpresa.ValidarDatosDB(listEmpr,tipoReg);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    @RequestMapping(value ="/empresa/listardpto", method=RequestMethod.POST)
    public @ResponseBody String ListarDptoEmpresa(
            @RequestParam(value="combo") String combo,
            @RequestParam(value="ubigeo") String ubigeo
    ) throws Exception{
        String campos="/";
        String html="";
        List<EDepartamento> listDptoBus= obDepartamento.Buscar(campos);
        if (listDptoBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listDptoBus.size(); i++) {
                String[] row = {
                        listDptoBus.get(i).getIddepartamento(),
                        listDptoBus.get(i).getNomdepartamento(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","llenarProv()",combo,ubigeo,"no");
        }
        return html;
    }
    @RequestMapping(value ="/empresa/listarprov", method=RequestMethod.POST)
    public @ResponseBody String ListarProvEmpresa(
            @RequestParam(value="iddpto") String iddpto
    ) throws Exception{
        String campos="/";
        String html="";
        if(iddpto.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(iddpto.equals("")){ iddpto="%";}

            campos = iddpto+"";
        }

        List<EProvincia> listProvBus= obProvincia.Buscar(campos);
        if (listProvBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listProvBus.size(); i++) {
                String[] row = {
                        listProvBus.get(i).getIdprovincia(),
                        listProvBus.get(i).getNomprovincia(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","llenarUbig()","","","no");
        }
        return html;
    }
    @RequestMapping(value ="/empresa/listardist", method=RequestMethod.POST)
    public @ResponseBody String ListarDistEmpresa(
            @RequestParam(value="idprov") String idprov
    ) throws Exception{
        String campos="/";
        String html="";
        if(idprov.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(idprov.equals("")){ idprov="%";}

            campos = idprov+"";
        }

        List<EUbigeo> listUbigBus= obUbigeo.Buscar(campos);
        if (listUbigBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listUbigBus.size(); i++) {
                String[] row = {
                        listUbigBus.get(i).getIdubigeo(),
                        listUbigBus.get(i).getNomubigeo(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","","","","no");
        }
        return html;
    }

    @RequestMapping(value="/empresa/search", method=RequestMethod.POST)
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
                        listEmprBus.get(i).getNomempresa(),
                        listEmprBus.get(i).getDireccion(),
                        listEmprBus.get(i).getCorreo(),
                        listEmprBus.get(i).getTelefono(),
                        listEmprBus.get(i).getNomcomercial(),
                        listEmprBus.get(i).getDirfiscal(),
                        listEmprBus.get(i).getCodigopostal(),
                        listEmprBus.get(i).getDescripcion(),
                        listEmprBus.get(i).getReferencia(),
                        listEmprBus.get(i).getIdubigeo().getIdubigeo(),
                        listEmprBus.get(i).getRubro(),
                        listEmprBus.get(i).getSitioweb(),
                        listEmprBus.get(i).getLogo(),
                        //listEmprBus.get(i).getIdcliente().getIdcliente().toString(),
                        listEmprBus.get(i).getFrpr(),
                        listEmprBus.get(i).getUserregistro(),
                        listEmprBus.get(i).getEmpleador(),
                        listEmprBus.get(i).getEmpleadopr(),
                        listEmprBus.get(i).getFrr()
                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_empresa_idpre", "text",""};
            String[] row2 = {"input", "txt_empresa_ruc", "text",""};
            String[] row3 = {"input", "txt_empresa_nombre", "text","style=\"display: none\""};
            String[] row4 = {"input", "txt_empresa_dire", "text",""};
            String[] row5 = {"input", "txt_empresa_emai", "text",""};
            String[] row6 = {"input", "txt_empresa_tele", "text",""};
            String[] row7 = {"input", "txt_empresa_nomcom", "text",""};
            String[] row8  = {"input", "txt_empresa_dirfis", "text","style=\"display: none\""};
            String[] row9  = {"input", "txt_empresa_codpos", "text","style=\"display: none\""};
            String[] row10 = {"input", "txt_empresa_desc", "text","style=\"display: none\""};
            String[] row11 = {"input", "txt_empresa_refe", "text","style=\"display: none\""};
            String[] row12 = {"input", "txt_empresa_ubig", "text","style=\"display: none\""};
            String[] row13 = {"input", "txt_empresa_rubr", "text","style=\"display: none\""};
            String[] row14 = {"input", "txt_empresa_web", "text","style=\"display: none\""};
            String[] row15 = {"input", "txt_empresa_logo", "text","style=\"display: none\""};
            //String[] row16 = {"input", "txt_empresa_clie", "text","style=\"display: none\""};
            String[] row16 = {"input", "txt_empresa_fpre", "text","style=\"display: none\""};
            String[] row17 = {"input", "txt_empresa_usreg", "text","style=\"display: none\""};
            String[] row18 = {"input", "txt_empresa_emplr", "text","style=\"display: none\""};
            String[] row19 = {"input", "txt_empresa_emplpr", "text","style=\"display: none\""};
            String[] row20 = {"input", "txt_empresa_freg", "text","style=\"display: none\""};

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
            listTipoDato.add(row12);
            listTipoDato.add(row13);
            listTipoDato.add(row14);
            listTipoDato.add(row15);
            listTipoDato.add(row16);
            listTipoDato.add(row17);
            listTipoDato.add(row18);
            listTipoDato.add(row19);
            listTipoDato.add(row20);
            //listTipoDato.add(row21);

            GeneralRUC obtenruc = new GeneralRUC();
            // String result=obtenruc.ObtenerDatos("10464762782");
            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            List<List<String[]>> listaSelect = new ArrayList<>();

            GeneralHTMLOPC gHTML = new GeneralHTMLOPC();
            html = gHTML.ConvertDataToHtmlOpc(lista, listTipoDato, listaSelect, "_empresa","preempresa");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    @RequestMapping(value="/empresa/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarEmpresa(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obEmpresa.Eliminar(ID.toString());
        return "";
    }

    @RequestMapping(value="/empresa/edit", method=RequestMethod.POST)
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
}