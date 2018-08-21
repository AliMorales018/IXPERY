package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.*;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class DOtroServicio {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();
    JsonGeneral jsonGeneral = new JsonGeneral();

    public static String getNameTable() { return "46758"; }
    public static String getKeyId() { return "467581"; }
    public static String getKeyIdSolucion() { return "467582"; }
    public static String getKeyNombre() { return "467583"; }
    public String RetornaTB(){ return "46758"; }

    public DOtroServicio() throws Exception {
    }

    /*public String PonerIds(List<EOtroServicio> listOtroServicio, List<EServicioSolucion> listServSolucion, List<EPreRegistroServicio> listPreRegServicio) throws Exception {
        String json = addListId(listOtroServicio,listServSolucion,listPreRegServicio);
        InsertarEquipo(json);

        return "";
    }*/
    public String ValidarDatosDB(List<EOtroServicio> listOtroServicio) throws Exception {
        try{

            listParameter.clear();
            // SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            //listParameter.add(paramJson);
            listParameter.add(paramSalid);
            com.TransUnica("gen_verificar_json", listParameter);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                //      InsertarEquipo(json);
                return "0";
            }
            else{
                return a;
            }
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void InsertarOtroServicio(String json) throws Exception {
        try{
            listParameter.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParameter.add(paramJson);
            com.TransUnica("gen_insertar_json", listParameter);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void ModificarEquipo(EEquipo oEquipo) throws Exception{
        try {
            /*String json = returnJson(oEquipo);
            String campos = getKeyId()+","+oEquipo.getIdEquipo();
            listParameter.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            SqlParameter pCampos = new SqlParameter("@campos", campos);
            listParameter.add(pJson); listParameter.add(pCampos);
            com.TransUnica("gen_actualizar", listParameter);*/
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    public void EliminarEquipo(String id) throws Exception{
        try {
            String campos = getKeyId()+","+id;
            listParameter.clear();
            SqlParameter pTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter pId = new SqlParameter("@ids", campos);
            listParameter.add(pTabla); listParameter.add(pId);
            com.TransUnica("gen_eliminar", listParameter);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

   /* public List<EEquipo> BuscarEquipo(String campos) throws Exception{
        try {
            if(!campos.equals("/")) {
                //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
                String[] addColumna = campos.split(",");
                for (int i = 0; i < addColumna.length; i++){
                    if (addColumna[i].equals("%")) {
                        addColumna[i] = "";
                    }
                }
                campos = getKeyUser()+","+addColumna[0]+";"+getKeyNom()+","+addColumna[1]+";"+getKeyApep()+","+addColumna[2]+";"+getKeyApem()+","+addColumna[3];
                System.out.println("Campos: " + campos);
            }
            listParameter.clear();
            SqlParameter pTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter pCampos = new SqlParameter("@campos", campos);
            listParameter.add(pTabla);
            listParameter.add(pCampos);
            String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listParameter);

            List<EUsuario> listUsuarios = new ArrayList<EUsuario>();
            if(!jsonResult.equals("")) {
                //CONVERTIR JSON A LISTA DE ARRAY
                JsonParcellable parser = new JsonParcellable();
                List<Object> listObject = parser.getListObjectJson(jsonResult, new EUsuario());
                for (int i = 0; i < listObject.size(); i++) {
                    EUsuario oaUser = (EUsuario) listObject.get(i);
                    listUsuarios.add(oaUser);
                }
            }
            return listUsuarios;
        }
        catch (Exception ex) {
            throw ex;
        }
    }*/

    public Integer NextId(){
        try {
            listParameter.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNameTable());
            listParameter.add(nameTbl);
            String Id = com.EjecutaConsultaJson("gen_retornaid",listParameter);
            return Integer.parseInt(Id);
        }
        catch(Exception ex) {
            System.out.println("ERROR: "+ ex.getMessage());
            return null;
        }
    }

    public String returnJson(Object objectOtroServ, Object objectServSolucion,List<EPreRegistroServicio> listPreRegServicio){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), objectOtroServ);
        parser.addObjectParse(DServicioSolucion.getNameTable(), objectServSolucion);
        if(listPreRegServicio.size()==1) {
            if (listPreRegServicio.get(0).getServsolicitado() == "" ||
                    listPreRegServicio.get(0).getDescripcion() == "" ||
                    listPreRegServicio.get(0).getCantidad() == 0)
            {

            }
            else
            {
                Object objectPreRegServicio;
                objectPreRegServicio=listPreRegServicio;
                parser.addObjectParse(DPreRegistroServicio.getNameTable(), objectPreRegServicio);
            }
        }
        else
        {
            Object objectPreRegServicio;
            objectPreRegServicio=listPreRegServicio;
            parser.addObjectParse(DPreRegistroServicio.getNameTable(), objectPreRegServicio);
        }

        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


     public String addListId(List<EOtroServicio> listAddIdOtroServicio, List<EServicioSolucion> listServicioSolucion, List<EPreRegistroServicio> listPreRegServicio) throws Exception {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Integer NextIdOtroServ =  NextId();
        Integer contaServSolucion=0;
        String json="";
        for (int i = 0; i < listAddIdOtroServicio.size();i++){
            listAddIdOtroServicio.get(i).setIdoserv(NextIdOtroServ);
        }

        DServicioSolucion odServSolucion = new DServicioSolucion();
        listServicioSolucion = odServSolucion.AddListId(listServicioSolucion);

        for (int i = 0; i < listServicioSolucion.size();i++){
            listServicioSolucion.get(i).setIdoserv(new EOtroServicio(NextIdOtroServ));
        }

        if(listPreRegServicio.size()==1) {
            if (listPreRegServicio.get(0).getServsolicitado() == "" ||
                    listPreRegServicio.get(0).getDescripcion() == "" ||
                    listPreRegServicio.get(0).getCantidad() == 0 )
            {

                json = returnJson(listAddIdOtroServicio,listServicioSolucion,listPreRegServicio);
            }
            else
            {
                contaServSolucion=listServicioSolucion.size() -1;
                Integer NextServSolucion=listServicioSolucion.get(contaServSolucion).getIdservicsolu();

                DPreRegistroServicio odPreRegServicio = new DPreRegistroServicio();
                listPreRegServicio = odPreRegServicio.AddListId(listPreRegServicio);

                EServicioSolucion oeServSolucion;

                for (int i = 0; i < listPreRegServicio.size();i++){
                    NextServSolucion++;
                    listPreRegServicio.get(i).setIdservicsolu(new EServicioSolucion(NextServSolucion));

                    oeServSolucion = new EServicioSolucion();
                    oeServSolucion.setIdservicsolu(NextServSolucion);
                    oeServSolucion.setIdoserv(new EOtroServicio(NextIdOtroServ));
                    oeServSolucion.setNomservicio(listPreRegServicio.get(i).getServsolicitado());
                    oeServSolucion.setDescripcion(listPreRegServicio.get(i).getDescripcion());
                    oeServSolucion.setCantidad(listPreRegServicio.get(i).getCantidad());
                    oeServSolucion.setEstado("1");
                    oeServSolucion.setFecharegistro(timestamp.toString());
                    //CAMBIAR LUEGO POR LA SESSIÓN
//                    oeServSolucion.setUserregistro("LUIS AZALDE LEYVA");
                    oeServSolucion.setUserregistro(listPreRegServicio.get(i).getUserregistro());
                    oeServSolucion.setEnviadocotizar("1");
                    oeServSolucion.setIdpreregserv(listPreRegServicio.get(i).getIdpreregserv());

                    listServicioSolucion.add(oeServSolucion);
                }
                json = returnJson(listAddIdOtroServicio,listServicioSolucion,listPreRegServicio);

            }
        }
        else
        {
            contaServSolucion=listServicioSolucion.size() -1;
            Integer NextServSolucion=listServicioSolucion.get(contaServSolucion).getIdservicsolu();

            DPreRegistroServicio odPreRegServicio = new DPreRegistroServicio();
            listPreRegServicio = odPreRegServicio.AddListId(listPreRegServicio);

            EServicioSolucion oeServSolucion;

            for (int i = 0; i < listPreRegServicio.size();i++){
                NextServSolucion++;
                listPreRegServicio.get(i).setIdservicsolu(new EServicioSolucion(NextServSolucion));

                oeServSolucion = new EServicioSolucion();
                oeServSolucion.setIdservicsolu(NextServSolucion);
                oeServSolucion.setIdoserv(new EOtroServicio(NextIdOtroServ));
                oeServSolucion.setNomservicio(listPreRegServicio.get(i).getServsolicitado());
                oeServSolucion.setDescripcion(listPreRegServicio.get(i).getDescripcion());
                oeServSolucion.setCantidad(listPreRegServicio.get(i).getCantidad());
                oeServSolucion.setEstado("1");
                oeServSolucion.setFecharegistro(timestamp.toString());
                //CAMBIAR LUEGO POR LA SESSIÓN
                oeServSolucion.setUserregistro(listPreRegServicio.get(i).getUserregistro());
                oeServSolucion.setEnviadocotizar("1");
                oeServSolucion.setIdpreregserv(listPreRegServicio.get(i).getIdpreregserv());

                listServicioSolucion.add(oeServSolucion);
            }
            json = returnJson(listAddIdOtroServicio,listServicioSolucion,listPreRegServicio);
        }



        return json;
    }








    //LUIS 18/07/2018 02:30 AM
    public List<EEquipo> BuscarEquipoSolucion(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyIdSolucion() + "," + addColumna[0];
            System.out.println("Campos: " + campos);
        }

        listParameter.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNameTable());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listParameter.add(pTabla);
        listParameter.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listParameter);

        List<EEquipo> listProd = new ArrayList<EEquipo>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EEquipo());
            for (int i = 0; i < listObject.size(); i++) {
                EEquipo oprod= (EEquipo) listObject.get(i);
                listProd.add(oprod);
            }
        }
        return listProd;
    }

    //LUIS 21/07/18 10:49 --
    public String BuscarSolucionOtroServ(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", Integer.parseInt(var));
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_equipo_item3_json", listParameter);
    }



    //FIN LUIS
    //FIN LUIS
    public String PonerIds(List<EOtroServicio> listOtroServ, List<EServicioSolucion> listServSolucion, List<EPreRegistroServicio> listPreRegServicio) throws Exception {
        String json = addListId(listOtroServ,listServSolucion,listPreRegServicio);
        InsertarOtroServicio(json);

        return "";
    }

    //LUIS 26/07/18 15:27
    public void GuardarFull(String json) {
        try{
            listParameter.clear();
            json = jsonGeneral.JsonITEM3(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParameter.add(paramJson);
            com.TransUnica("gen_guardar", listParameter);
        }
        catch (Exception e){
            throw e;
        }
    }

    //FIN LUIS
    //LUIS 21/07/18 10:49 --
    public String BuscarServiOtroCombo(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", Integer.parseInt(var));
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_equipo_item3_json", listParameter);
    }


    //FIN LUIS
}
