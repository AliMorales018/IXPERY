package com.ixpery.controladores.log;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class COtroServicio {
    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BEquipo obEquipo = (BEquipo) applicationContext.getBean("beanEquipo");
    BProductoSolucion obProductoSolucion = (BProductoSolucion) applicationContext.getBean("beanProductoSolucion");
    BPreRegistroProducto obPreReProducto = (BPreRegistroProducto) applicationContext.getBean("beanPreRegistroProducto");
    BOtroServicio obOtroServ =(BOtroServicio) applicationContext.getBean("beanOtroServicio");
    BServicioSolicitados obServSolic =(BServicioSolicitados) applicationContext.getBean("beanServSolicitados");
    BEmpresa obEmpresa =(BEmpresa) applicationContext.getBean("beanEmpresa");



    @RequestMapping("/otroservicio")
    public ModelAndView Equipo(){
        ModelAndView modelAndView = new ModelAndView("logistica/otroservicio");
        return modelAndView;
    }

    //Busqueda Producto Combo de Tabla
    @RequestMapping(value = "/otroservi/buservsolic", produces = "application/json")
    public @ResponseBody String BuscarServSolic(
            @RequestParam(value="q") String var
    ) throws Exception {
        return obServSolic.BuscarServicioCombo(var);
    }



    @RequestMapping(value="/otroservi/register", method = RequestMethod.POST)
    public @ResponseBody
    String RegistrarOtroServ(@RequestBody Map<String,List<String[]>> values) throws Exception{
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Integer sizeListOtroServ = values.get("values0").size();
        Integer sizeListEqReg = values.get("values1").size();
        Integer sizeListEqNoReg = values.get("values2").size();

        //REGISTRAMOS EN TABLA OTRO SERVICIO
        List<EOtroServicio> listOtroServ = new ArrayList<EOtroServicio>();
        EOtroServicio oeOtroServ;
        String[] rowSol;

        for (int i =0; i < sizeListOtroServ; i++){
            oeOtroServ = new EOtroServicio();
            rowSol = values.get("values0").get(i);
            oeOtroServ.setIdoserv(0);
            oeOtroServ.setIdsolucion(new ESolucion(Integer.parseInt(rowSol[0])));
            oeOtroServ.setEstado("1");
            oeOtroServ.setFecharegistro(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeOtroServ.setUserregistro("LUIS AZALDE LEYVA");
            listOtroServ.add(oeOtroServ);
        }

        //REGISTRAMOS EN TABLA SERVICIO SOLUCION
        List<EServicioSolucion> listServSolucion = new ArrayList<EServicioSolucion>();
        EServicioSolucion oeServSolucion;
        String[] rowServSol;

        for (int i =0; i < sizeListEqReg; i++){
            oeServSolucion = new EServicioSolucion();
            rowServSol = values.get("values1").get(i);
            oeServSolucion.setIdservicsolu(0);
            oeServSolucion.setIdoserv(new EOtroServicio(0));
            oeServSolucion.setNomservicio(rowServSol[1]);
            oeServSolucion.setDescripcion(rowServSol[2]);
            oeServSolucion.setCantidad(Integer.parseInt(rowServSol[3]));
            oeServSolucion.setEstado("1");
            oeServSolucion.setFecharegistro(timestamp.toString());
            //CAMBIAR LUEGO POR LA SESSIÓN
            oeServSolucion.setUserregistro("LUIS AZALDE LEYVA");
            oeServSolucion.setIdservsol(Integer.parseInt(rowServSol[0]));
            oeServSolucion.setEnviadocotizar("1");
            listServSolucion.add(oeServSolucion);
        }

        //REGISTRAMOS EN TABLA PREREGISTRO SERVICIOS
        List<EPreRegistroServicio> listPreRegServicio = new ArrayList<EPreRegistroServicio>();
        EPreRegistroServicio oePreRegServicio;
        String[] rowPreRegServicio;

        if(sizeListEqNoReg==1) {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegServicio = values.get("values2").get(i);

                oePreRegServicio = new EPreRegistroServicio();
                oePreRegServicio.setIdpreregserv(0);
                oePreRegServicio.setIdservicsolu(new EServicioSolucion(0));
                oePreRegServicio.setServsolicitado(rowPreRegServicio[0]);
                oePreRegServicio.setDescripcion(rowPreRegServicio[1]);
                if(rowPreRegServicio[2].equals("")){
                    oePreRegServicio.setCantidad(0);
                }else{
                    oePreRegServicio.setCantidad(Integer.parseInt(rowPreRegServicio[2]));
                }

                oePreRegServicio.setEstado("1");
                oePreRegServicio.setFecharegistro(timestamp.toString());
                //CAMBIAR LUEGO POR LA SESSIÓN
                oePreRegServicio.setUserregistro("LUIS AZALDE LEYVA");
                listPreRegServicio.add(oePreRegServicio);
            }
        }
        else
        {
            for (int i = 0; i < sizeListEqNoReg; i++) {
                rowPreRegServicio = values.get("values2").get(i);

                oePreRegServicio = new EPreRegistroServicio();
                oePreRegServicio.setIdpreregserv(0);
                oePreRegServicio.setIdservicsolu(new EServicioSolucion(0));
                oePreRegServicio.setServsolicitado(rowPreRegServicio[0]);
                oePreRegServicio.setDescripcion(rowPreRegServicio[1]);
                oePreRegServicio.setCantidad(Integer.parseInt(rowPreRegServicio[2]));
                oePreRegServicio.setEstado("1");
                oePreRegServicio.setFecharegistro(timestamp.toString());
                //CAMBIAR LUEGO POR LA SESSIÓN
                oePreRegServicio.setUserregistro("LUIS AZALDE LEYVA");

                listPreRegServicio.add(oePreRegServicio);
            }
        }

        //ENVIAMOS A PONER IDS A CADA LISTA DE OBJETOS
        String msjResult = obOtroServ.PonerIds(listOtroServ,listServSolucion,listPreRegServicio);

        if(msjResult.equals("0")){
            return "";
        }
        else{
            return msjResult;
        }


//return "";
    }

    //Búsqueda de Otros Servicios
    @RequestMapping(value="/otroservi/buscarotroservsol", method=RequestMethod.POST)
    public @ResponseBody String BuscarEquipoSol(
            @RequestParam(value="idsol") String busIdsol
    ) throws Exception{
        String rpta= obOtroServ.BuscarSolucionOtroServ(busIdsol);
        return rpta;
    }

    //COPIA BARATA DE JUAN
    @RequestMapping(value="/otroservi/guardarfull", method = RequestMethod.POST)
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
            if(keyRoot.equals("ose")){
                JsonArray arrayValue = entryRoot.getValue().getAsJsonArray();
                for(JsonElement jsonElement : arrayValue){
                    for(Map.Entry<String, JsonElement> entryChild : jsonElement.getAsJsonObject().entrySet()) {
                        if(entryChild.getKey().equals(keyRoot + "1") && entryChild.getValue().toString().equals("0")){
                            JsonObject objJSON = jsonElement.getAsJsonObject();
                            objJSON.addProperty("ose8", timestamp.toString());
                            objJSON.addProperty("ose9", session.getAttribute("user").toString());
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
                            objJSON.addProperty("ssl10", timestamp.toString());
                            objJSON.addProperty("ssl11", session.getAttribute("user").toString());
                            break;
                        }
                    }
                }
            }
        }

        json = root.toString();
        obOtroServ.GuardarFull(json);

        System.out.println("ENTRE EN REGISTER");
        return "";
    }
    /*//DESDE AQUÍ PARA ABAJO EMPECE LUIS AZALDE
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
    }*/
}
