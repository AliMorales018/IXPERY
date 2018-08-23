package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EEquipo;
import com.ixpery.entidades.log.EPreRegistroProducto;
import com.ixpery.entidades.log.EProductoSolucion;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class DEquipo {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();
    JsonGeneral jsonGeneral = new JsonGeneral();

    public static String getNameTable() { return "46702"; }
    public static String getKeyId() { return "467021"; }
    public static String getKeyIdSolucion() { return "467022"; }
    public static String getKeyNombre() { return "467022"; }
    public String RetornaTB(){ return "46702"; }

    public DEquipo() throws Exception {
    }

    public String PonerIds(List<EEquipo> listEquipo, List<EProductoSolucion> listProdSolucion, List<EPreRegistroProducto> listPreRegProducto) throws Exception {
        String json = addListId(listEquipo,listProdSolucion,listPreRegProducto);
        InsertarEquipo(json);

        return "";
    }
    public String ValidarDatosDB(List<EEquipo> listEquipo) throws Exception {
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

    public void InsertarEquipo(String json) throws Exception {
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

    //List<EEquipo> listAddIdEquipo, List<EProductoSolucion> listProdSolucion, List<EPreRegistroProducto> listPreRegProducto
    public String returnJson(Object objectEquipo, Object objectProdSolucion,List<EPreRegistroProducto> listPreRegProducto){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), objectEquipo);
        parser.addObjectParse(DProductoSolucion.getNameTable(), objectProdSolucion);
        if(listPreRegProducto.size()==1) {
            if (listPreRegProducto.get(0).getNomproducto() == "" ||
                    listPreRegProducto.get(0).getModelo() == "" ||
                    listPreRegProducto.get(0).getMarca() == "" ||
                    listPreRegProducto.get(0).getUmedida() == "" ||
                    listPreRegProducto.get(0).getCantidad() == 0)
            {

            }
            else
            {
                Object objectPreRegProducto;
                objectPreRegProducto=listPreRegProducto;
                parser.addObjectParse(DPreRegistroProducto.getNameTable(), objectPreRegProducto);
            }
        }
        else
        {
            Object objectPreRegProducto;
            objectPreRegProducto=listPreRegProducto;
            parser.addObjectParse(DPreRegistroProducto.getNameTable(), objectPreRegProducto);
        }

        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public String addListId(List<EEquipo> listAddIdEquipo, List<EProductoSolucion> listProdSolucion, List<EPreRegistroProducto> listPreRegProducto) throws Exception {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Integer NextIdEquipo =  NextId();
        Integer contaProdSolucion=0;
        String json="";
        for (int i = 0; i < listAddIdEquipo.size();i++){
            listAddIdEquipo.get(i).setIdEquipo(NextIdEquipo);
        }

        DProductoSolucion odProdSolucion = new DProductoSolucion();
        listProdSolucion = odProdSolucion.AddListId(listProdSolucion);

        for (int i = 0; i < listProdSolucion.size();i++){
            listProdSolucion.get(i).setIdequipo(new EEquipo(NextIdEquipo));
        }

        if(listPreRegProducto.size()==1) {
            if (listPreRegProducto.get(0).getNomproducto() == "" ||
                    listPreRegProducto.get(0).getModelo() == "" ||
                    listPreRegProducto.get(0).getMarca() == "" ||
                    listPreRegProducto.get(0).getUmedida() == "" ||
                    listPreRegProducto.get(0).getCantidad() == 0 )
            {
                json = returnJson(listAddIdEquipo,listProdSolucion,listPreRegProducto);
            }
            else
            {
                contaProdSolucion=listProdSolucion.size() -1;
                Integer NextProdSolucion=listProdSolucion.get(contaProdSolucion).getIdprodsol();

                DPreRegistroProducto odPreRegProducto = new DPreRegistroProducto();
                listPreRegProducto = odPreRegProducto.AddListId(listPreRegProducto);

                EProductoSolucion oeProdSolucion;

                for (int i = 0; i < listPreRegProducto.size();i++){
                    NextProdSolucion++;
                    listPreRegProducto.get(i).setIdprodsol(new EProductoSolucion(NextProdSolucion));

                    oeProdSolucion = new EProductoSolucion();
                    oeProdSolucion.setIdprodsol(NextProdSolucion);
                    oeProdSolucion.setIdequipo(new EEquipo(NextIdEquipo));
                    oeProdSolucion.setCantidad(listPreRegProducto.get(i).getCantidad());
                    oeProdSolucion.setEstado("1");
                    oeProdSolucion.setFecharegistro(timestamp.toString());
                    //CAMBIAR LUEGO POR LA SESSIÓN
                    oeProdSolucion.setUserregistro("LUIS AZALDE LEYVA");
                    oeProdSolucion.setEnviadocotizar("1");
                    oeProdSolucion.setIdprereg(listPreRegProducto.get(i).getIdprereg());

                    listProdSolucion.add(oeProdSolucion);
                }
                json = returnJson(listAddIdEquipo,listProdSolucion,listPreRegProducto);

            }
        }
        else
        {
            contaProdSolucion=listProdSolucion.size() -1;
            Integer NextProdSolucion=listProdSolucion.get(contaProdSolucion).getIdprodsol();

            DPreRegistroProducto odPreRegProducto = new DPreRegistroProducto();
            listPreRegProducto = odPreRegProducto.AddListId(listPreRegProducto);

            EProductoSolucion oeProdSolucion;

            for (int i = 0; i < listPreRegProducto.size();i++){
                NextProdSolucion++;
                listPreRegProducto.get(i).setIdprodsol(new EProductoSolucion(NextProdSolucion));

                oeProdSolucion = new EProductoSolucion();
                oeProdSolucion.setIdprodsol(NextProdSolucion);
                oeProdSolucion.setIdequipo(new EEquipo(NextIdEquipo));
                oeProdSolucion.setCantidad(listPreRegProducto.get(i).getCantidad());
                oeProdSolucion.setEstado("1");
                oeProdSolucion.setFecharegistro(timestamp.toString());
                //CAMBIAR LUEGO POR LA SESSIÓN
                oeProdSolucion.setUserregistro("LUIS AZALDE LEYVA");
                oeProdSolucion.setEnviadocotizar("1");
                oeProdSolucion.setIdprereg(listPreRegProducto.get(i).getIdprereg());

                listProdSolucion.add(oeProdSolucion);
            }
            json = returnJson(listAddIdEquipo,listProdSolucion,listPreRegProducto);
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
    public String BuscarProductoEquipoCombo(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", Integer.parseInt(var));
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_equipo_item1_json", listParameter);
    }


    
    //FIN LUIS
    //FIN LUIS

    //LUIS 26/07/18 15:27
    public void GuardarFull(String json) {
        try{
            listParameter.clear();
            json = jsonGeneral.JsonITEM1(json);
//            json = jsonGeneral.JsonConvertId(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParameter.add(paramJson);
//            com.TransUnica("gen_insertar_json", listParametros);
            com.TransUnica("gen_guardar", listParameter);
        }
        catch (Exception e){
            throw e;
        }
    }

    //FIN LUIS
}
