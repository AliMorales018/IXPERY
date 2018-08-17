package com.ixpery.controladores.log;

import com.google.gson.*;
import com.ixpery.entidades.log.*;
import com.ixpery.negocio.log.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
public class CEquipo {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEquipo obEquipo = (BEquipo) applicationContext.getBean("beanEquipo");
    BProductoSolucion obProductoSolucion = (BProductoSolucion) applicationContext.getBean("beanProductoSolucion");
    BPreRegistroProducto obPreReProducto = (BPreRegistroProducto) applicationContext.getBean("beanPreRegistroProducto");
    BProducto obProducto =(BProducto) applicationContext.getBean("beanProducto");
    BEmpresa obEmpresa =(BEmpresa) applicationContext.getBean("beanEmpresa");

    @RequestMapping("/equipo")
    public ModelAndView Equipo(){
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        String dateParse = sdf.format(date);
        ModelAndView modelView = new ModelAndView("logistica/equipo");
        modelView.addObject("fecha",dateParse);
        return modelView;
    }

    /*
     * guardarfull*/
    @RequestMapping(value="/equipo/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarEquipo(HttpServletRequest request,@RequestBody Map<String,List<String[]>> values) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        HttpSession session = request.getSession();

        Integer sizeListEqSol = values.get("values0").size();
        Integer sizeListEqReg = values.get("values1").size();
        Integer sizeListEqNoReg = values.get("values2").size();

        //REGISTRAMOS EN TABLA EQUIPOS
        List<EEquipo> listEquipo = new ArrayList<EEquipo>();
        EEquipo oeEquipo;
        String[] rowSol;

        for (int i =0; i < sizeListEqSol; i++){
            oeEquipo = new EEquipo();
            rowSol = values.get("values0").get(i);
            oeEquipo.setIdEquipo(0);
            oeEquipo.setIdSolucion(new ESolucion(Integer.parseInt(rowSol[0])));
            oeEquipo.setEstado("1");
            oeEquipo.setFechaReg(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeEquipo.setUserReg(session.getAttribute("user").toString());
            listEquipo.add(oeEquipo);
        }

        //REGISTRAMOS EN TABLA PRODUCTO SOLUCION
        List<EProductoSolucion> listProdSolucion = new ArrayList<EProductoSolucion>();
        EProductoSolucion oeProdSolucion;
        String[] rowProdSol;

        for (int i =0; i < sizeListEqReg; i++){
            oeProdSolucion = new EProductoSolucion();
            rowProdSol = values.get("values1").get(i);
            oeProdSolucion.setIdprodsol(0);
            oeProdSolucion.setIdequipo(new EEquipo(0));
            oeProdSolucion.setCantidad(Integer.parseInt(rowProdSol[5]));
            oeProdSolucion.setEstado("1");
            oeProdSolucion.setFecharegistro(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeProdSolucion.setUserregistro(session.getAttribute("user").toString());
            oeProdSolucion.setIdproducto(Integer.parseInt(rowProdSol[0]));
            oeProdSolucion.setEnviadocotizar("1");
            listProdSolucion.add(oeProdSolucion);
        }

        //REGISTRAMOS EN TABLA PREREGISTRO PRODUCTOS
        List<EPreRegistroProducto> listPreRegProducto = new ArrayList<EPreRegistroProducto>();
        EPreRegistroProducto oePreRegProducto;
        String[] rowPreRegProducto;

        if(sizeListEqNoReg==1) {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegProducto = values.get("values2").get(i);

                oePreRegProducto = new EPreRegistroProducto();
                oePreRegProducto.setIdprereg(0);
                oePreRegProducto.setIdprodsol(new EProductoSolucion(0));
                oePreRegProducto.setNomproducto(rowPreRegProducto[0]);
                oePreRegProducto.setUmedida(rowPreRegProducto[3]);
                if(rowPreRegProducto[4].equals("")){
                    oePreRegProducto.setCantidad(0);
                }else{
                    oePreRegProducto.setCantidad(Integer.parseInt(rowPreRegProducto[4]));
                }

                oePreRegProducto.setEstado("1");
                oePreRegProducto.setModelo(rowPreRegProducto[1]);
                oePreRegProducto.setMarca(rowPreRegProducto[2]);

                listPreRegProducto.add(oePreRegProducto);
            }
        }
        else
        {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegProducto = values.get("values2").get(i);

                oePreRegProducto = new EPreRegistroProducto();
                oePreRegProducto.setIdprereg(0);
                oePreRegProducto.setIdprodsol(new EProductoSolucion(0));
                oePreRegProducto.setNomproducto(rowPreRegProducto[0]);
                oePreRegProducto.setUmedida(rowPreRegProducto[3]);
                oePreRegProducto.setCantidad(Integer.parseInt(rowPreRegProducto[4]));
                oePreRegProducto.setEstado("1");
                oePreRegProducto.setModelo(rowPreRegProducto[1]);
                oePreRegProducto.setMarca(rowPreRegProducto[2]);

                listPreRegProducto.add(oePreRegProducto);
            }
        }

        //ENVIAMOS A PONER IDS A CADA LISTA DE OBJETOS
        String msjResult = obEquipo.PonerIds(listEquipo,listProdSolucion,listPreRegProducto);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }
    }

    //DESDE AQUÍ PARA ABAJO EMPECE LUIS AZALDE
    //Busqueda Solución por Empresa.
    @RequestMapping(value = "/equipo/busempresa", produces = "application/json")
    public @ResponseBody String BuscarEmpresasReq(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obEmpresa.BuscarEmpresaSolucionCombo(var);
    }
    //Busqueda Producto Combo de Tabla
    @RequestMapping(value = "/equipo/busproducto", produces = "application/json")
    public @ResponseBody String BuscarProducto(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obProducto.BuscarProductoEquipoCombo(var);
    }

    //Búsqueda de Equipos Solución
    @RequestMapping(value="/equipo/buscarequiposol", method=RequestMethod.POST)
    public @ResponseBody String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obEquipo.BuscarSolucionEquipo(busIdsol);
        return rpta;
    }

    //COPIA BARATA DE JUAN
    @RequestMapping(value="/equipo/guardarfull", method = RequestMethod.POST)
    public @ResponseBody
    String GuardarFullEquipo(
            HttpServletRequest request,
            @RequestBody String json
    ) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        HttpSession session = request.getSession();
        JsonParser parser = new JsonParser();
        JsonObject root = parser.parse(json).getAsJsonObject();
        for(Map.Entry<String, JsonElement> entryRoot : root.entrySet()){
            String keyRoot = entryRoot.getKey();
            if(keyRoot.equals("eqi")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("eqi8", timestamp.toString());
                            objJSON.addProperty("eqi9", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
            if(keyRoot.equals("pso")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("pso9", timestamp.toString());
                            objJSON.addProperty("pso10", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
        }

        json = root.toString();
        obEquipo.GuardarFull(json);

        System.out.println("ENTRE EN REGISTER");
        return "";
    }
}