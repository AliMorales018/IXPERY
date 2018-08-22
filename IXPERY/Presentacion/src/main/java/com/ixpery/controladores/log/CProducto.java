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
            msjResult="1";//update
        }
        return  msjResult;
    }

    @RequestMapping(value ="/producto/listarfami", produces = "application/json")
    public @ResponseBody String ListarFamiProducto(
            @RequestParam(value="q") String famil
    ) throws Exception{
        return obFamilia.BuscarFamilia(famil);
    }
    @RequestMapping(value ="/producto/listarcate", produces = "application/json")
    public @ResponseBody String ListarCateProducto(
            @RequestParam(value="q") Integer idfami
    ) throws Exception{

        String  listCateBus= obCategoria.BuscarCategoria(idfami);
        return listCateBus;
    }

    @RequestMapping(value ="/producto/listarumed", produces = "application/json")
    public @ResponseBody String ListarUmedProducto(
            @RequestParam(value="q") String umed
    ) throws Exception{

        return obUmedida.BuscarUmedida(umed);

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
        String campos = "";
        if(busProd.equals("")){
            campos="/";
        }
        else{
            if(busProd.equals("")){ busProd = "%"; }
            campos = "pdt7," + busProd;
        }

        String jsonReturn = obProducto.BuscarProducto(campos);

        return jsonReturn;
    }


   /* public List<ECategoria> AllCategorias() throws Exception{
        List<ECategoria> listCategoria = new ArrayList<ECategoria>();
        listCategoria = obCategoria.Buscar("/");
        return listCategoria;
    }*/
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
        session.setAttribute("productop", 0);
    }


}