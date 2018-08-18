package com.ixpery.controladores.log;

import com.ixpery.controladores.tools.GeneralCOMBOS;
import com.ixpery.controladores.tools.GeneralHTMLOPC;
import com.ixpery.entidades.log.*;
import com.ixpery.negocio.log.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CProducto {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BProducto obProducto= (BProducto) applicationContext.getBean("beanProducto");
    BFamilia obFamilia = (BFamilia) applicationContext.getBean("beanFamilia");
    BCategoria obCategoria = (BCategoria) applicationContext.getBean("beanCategoria");
    BUmedida obUmedida = (BUmedida) applicationContext.getBean("beanUmedida");
    BEstado obEstado = (BEstado) applicationContext.getBean("beanEstado");
    @RequestMapping("/producto")
    public ModelAndView Producto() throws Exception{
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("/logistica/producto");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    @RequestMapping(value="/producto/guardar", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarProducto(@RequestBody Map<String,List<String[]>> values) throws Exception{
        String msjResult="";
        List<EProducto> listProd = new ArrayList<EProducto>();
        EProducto oeProducto=new EProducto();
        String[] row;
        oeProducto = new EProducto();
        row =  values.get("values").get(0);
        String tipoTrans=row[14];
        if(tipoTrans==null){
            tipoTrans="0";
        }
        Date date = new Date();
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        oeProducto.setIdcategoria(new ECategoria(Integer.parseInt(row[0])));
        oeProducto.setIdumedida(new EUMedida(Integer.parseInt(row[1])));
        oeProducto.setNomumed(row[2]);
        oeProducto.setCodigo(row[3]);
        oeProducto.setNomproducto(row[4]);
        oeProducto.setEstado(row[5]);
        oeProducto.setSaldo(Double.parseDouble(row[6]));//equivale al stock real
        oeProducto.setStockminimo(Double.parseDouble(row[7]));
        oeProducto.setModelo(row[8]);
        oeProducto.setMarca(row[9]);
        oeProducto.setInsumo(Integer.parseInt(row[10]));
        oeProducto.setPfinal(Integer.parseInt(row[11]));
        oeProducto.setEstadoinsumo(Integer.parseInt(row[12]));
        oeProducto.setEstadopfinal(Integer.parseInt(row[13]));

        if(Integer.parseInt(tipoTrans)<1){
            oeProducto.setIdproducto(0);
            oeProducto.setFecharegistro(dateFormat.format(date));
            oeProducto.setUserregistro("LUIS");
            listProd.add(oeProducto);
            msjResult = obProducto.ValidarDatosDB(listProd);
        }else{
            oeProducto.setIdproducto(Integer.parseInt(row[14]));
            listProd.add(oeProducto);
            obProducto.Modificar(oeProducto);
            msjResult="0";//update
        }
        return  msjResult;
    }

    @RequestMapping(value ="/producto/listarfami", method=RequestMethod.POST)
    public @ResponseBody String ListarFamiProducto(
            @RequestParam(value="combo") String combo,
            @RequestParam(value="famil") String famil
    ) throws Exception{
        String campos="/";
        String html="";
        List<EFamilia> listFamiBus= obFamilia.Buscar(campos);
        if (listFamiBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listFamiBus.size(); i++) {
                String[] row = {
                        listFamiBus.get(i).getIdfamilia().toString(),
                        listFamiBus.get(i).getNomfamilia(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","llenarCate()",combo,famil,"no");
        }
        return html;
    }
    @RequestMapping(value ="/producto/listarcate", method=RequestMethod.POST)
    public @ResponseBody String ListarCateProducto(
            @RequestParam(value="idfami") String idfami
    ) throws Exception{
        String campos="/";
        String html="";
        if(idfami.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(idfami.equals("")){ idfami="%";}

            campos = idfami+"";
        }

        List<ECategoria> listCateBus= obCategoria.Buscar(campos);
        if (listCateBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listCateBus.size(); i++) {
                String[] row = {
                        listCateBus.get(i).getIdcategoria().toString(),
                        listCateBus.get(i).getNomcategoria(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","","","","no");
        }
        return html;
    }

    @RequestMapping(value ="/producto/listarumed", method=RequestMethod.POST)
    public @ResponseBody String ListarUmedProducto(
            @RequestParam(value="combo") String combo,
            @RequestParam(value="umed") String umed
    ) throws Exception{
        String campos="/";
        String html="";
        List<EUMedida> listUmedBus= obUmedida.Buscar(campos);
        if (listUmedBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listUmedBus.size(); i++) {
                String[] row = {
                        listUmedBus.get(i).getIdumedida().toString(),
                        listUmedBus.get(i).getNomumedida(),
                };
                lista.add(row);
            }
            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaComboDataToHtml(lista,"0","",combo,umed,"no");
        }
        return html;
    }


    @RequestMapping(value ="/producto/listaresta", method=RequestMethod.POST)
    public @ResponseBody String ListarEstaProducto(
            @RequestParam(value="divcheck") String divcheck
    ) throws Exception{
        String html="";
        String tablaProd= obProducto.RetornaTB();
        String campos=tablaProd+"";
        List<EEstado> listEstaBus= obEstado.Buscar(campos);
        if (listEstaBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            for (int i = 0; i < listEstaBus.size(); i++) {
                String[] row = {
                        listEstaBus.get(i).getIdestado().toString(),
                        listEstaBus.get(i).getNomestado(),
                        listEstaBus.get(i).getNomtabla(),
                        "0",
                };
                lista.add(row);
            }

            //ORDENAR LISTA



            GeneralCOMBOS genOption = new GeneralCOMBOS();
            html=genOption.LlenaCheckDataToHtml(lista,"checkgroup",divcheck);
        }
        return html;
    }


    @RequestMapping(value="/producto/search", method=RequestMethod.POST)
    public @ResponseBody String BuscarProducto(
            @RequestParam(value="prod") String busProd
            // @RequestParam(value="cate") String busCate
    ) throws Exception{
        String html="";
        String campos = "";
        if(busProd.equals("")){
            // (/) BUSCA TODOS
            campos = "/";
        }
        else{
            if(busProd.equals("")){ busProd="%";}
            campos = busProd+"";
        }

        List<EProducto> listProdBus= obProducto.Buscar(campos);
        //CONVERTIMOS LA LISTA DE EMPRESAS A LISTA DE STRING[] PARA QUE FUNQUE EL GENERALHTML PARA TODOS
        //SIESQUE HAY RESULTADOS
        if (listProdBus.size()!=0) {
            List<String[]> lista = new ArrayList<>();

            List<List<String[]>> listaSelect = new ArrayList<>();
            List<String[]> listaStringCategoria = new ArrayList<>();
            List<String[]> listaStringFamilia = new ArrayList<>();
            List<String[]> listaStringUmedida = new ArrayList<>();
            List<String[]> listaStringEstado = new ArrayList<>();
            String camposcat="";
            String camposfam="";
            String camposesta="";
            String nomFam="";
            String nomCate="";

            Integer estado=0;


            for (int i = 0; i < listProdBus.size(); i++) {

                camposcat = listProdBus.get(i).getIdcategoria().getIdcategoria().toString() + "";
                List<ECategoria> listCateBus = obCategoria.BuscarCategoriaFam(camposcat);
                List<EFamilia> listFamiBus= new ArrayList<EFamilia>();
                for (int j = 0; j < listCateBus.size(); j++) {
                    nomCate= listCateBus.get(j).getNomcategoria();

                    camposfam = listCateBus.get(j).getIdfamilia().getIdfamilia().toString() + "";
                    listFamiBus = obFamilia.BuscarFamCategoria(camposfam);

                    for (int k = 0; k < listFamiBus.size(); k++) {
                        nomFam= listFamiBus.get(k).getNomfamilia();
                    }
                }
                camposesta =listProdBus.get(i).getEstado();
                if(Integer.parseInt(camposesta)==1){
                    estado= 1;
                }else
                {
                    estado=0;
                }

                String[] row = {
                        listProdBus.get(i).getIdproducto().toString(),
                        listProdBus.get(i).getNomproducto(),
                        nomFam,
                        nomCate,
                        listProdBus.get(i).getNomumed(),
                        listProdBus.get(i).getCodigo(),
                        estado.toString(),
                        listProdBus.get(i).getSaldo().toString(),
                        listProdBus.get(i).getStockminimo().toString(),
                        listProdBus.get(i).getModelo(),
                        listProdBus.get(i).getMarca(),
                        listProdBus.get(i).getFecharegistro(),
                        listProdBus.get(i).getUserregistro(),
                        listProdBus.get(i).getInsumo().toString(),
                        listProdBus.get(i).getPfinal().toString(),
                        listProdBus.get(i).getEstadoinsumo().toString(),
                        listProdBus.get(i).getEstadopfinal().toString()

                };
                lista.add(row);
            }

            //GENERAMOS LA LISTA CON LOS TIPOS DE DATOS IGUAL QUE EN ASP
            List<String[]> listTipoDato = new ArrayList<>();

            String[] row1 = {"input", "txt_producto_idpro", "text", ""};
            String[] row2 = {"input", "txt_producto_nombre", "text", ""};
            String[] row3 = {"input", "txt_producto_famil", "text", ""};
            String[] row4 = {"input", "txt_producto_categ", "text", ""};
            String[] row5 = {"input", "txt_producto_umedi", "text", ""};
            String[] row6 = {"input", "txt_producto_codig", "text", ""};
            String[] row7 = {"input", "txt_producto_estad", "text", "style=\"display: none\""};
            String[] row8 = {"input", "txt_producto_sreal", "text", "style=\"display: none\""};
            String[] row9 = {"input", "txt_producto_smini", "text", "style=\"display: none\""};
            String[] row10 = {"input","txt_producto_model", "text", ""};
            String[] row11 = {"input","txt_producto_marca", "text", ""};
            String[] row12 = {"input","txt_producto_fregi", "text", "style=\"display: none\""};
            String[] row13 = {"input","txt_producto_uregi", "text", "style=\"display: none\""};
            String[] row14 = {"input","txt_producto_insum", "text", "style=\"display: none\""};
            String[] row15 = {"input","txt_producto_pfina", "text", "style=\"display: none\""};
            String[] row16 = {"input","txt_producto_einsu", "text", "style=\"display: none\""};
            String[] row17 = {"input","txt_producto_epfin", "text", "style=\"display: none\""};

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

            GeneralHTMLOPC gHTML = new GeneralHTMLOPC();
            //GENERAMOS LA LISTA MULTIDIMENSIONAL EN ESTE CASO ES VACIA PORQUE NO TIENE COMBOS
            html = gHTML.ConvertDataToHtmlOpc(lista, listTipoDato, listaSelect, "_producto","producto");
            return html;
        }
        else{
            return "<tr><td colspan='11' class='text-center'><div class='p-3'>No se encontraron resultados.</div></td></tr>";
        }
    }

    public List<ECategoria> AllCategorias() throws Exception{
        List<ECategoria> listCategoria = new ArrayList<ECategoria>();
        listCategoria = obCategoria.Buscar("/");
        return listCategoria;
    }
    @RequestMapping(value="/producto/delete", method=RequestMethod.POST)
    public @ResponseBody String EliminarProducto(
            @RequestParam(value="i") Integer ID
    ) throws Exception{
        obProducto.Eliminar(ID.toString());
        return "";
    }



    @RequestMapping(value="/producto/edit", method=RequestMethod.POST)
    public @ResponseBody String EditarProducto(
            @RequestParam(value="i") Integer id,
            @RequestParam(value="ruc") String ruc,
            @RequestParam(value="dir") String dir,
            @RequestParam(value="ema") String ema,
            @RequestParam(value="tel") String tel,
            @RequestParam(value="nom") String nom
    ) throws Exception{

        return "";
    }


    @RequestMapping("/producto/DestruirSesionProducto")
    public @ResponseBody
    void EliminarSesionSolucion(
            HttpServletRequest request
    ) throws Exception {
        HttpSession session = request.getSession();
        session.setAttribute("producto", 0);
    }


}