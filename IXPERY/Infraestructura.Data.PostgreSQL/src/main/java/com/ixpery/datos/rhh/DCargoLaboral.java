package com.ixpery.datos.rhh;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.rhh.ECargoLaboral;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;
import com.sun.org.apache.bcel.internal.generic.RETURN;

import java.util.ArrayList;
import java.util.List;

public class DCargoLaboral {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    JsonGeneral jg = new JsonGeneral();

    public DCargoLaboral() throws Exception {}

    public static String getNomTabCargoLaboral() { return "46207"; }
    public static String getKeyId() { return "462071"; }
    public static String getKeyNombre() { return "462073"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ListarCargosLaboralesCombo(String value) throws Exception{
        try{
            listaParametros.clear();
            SqlParameter pValue = new SqlParameter("value",value);
            listaParametros.add(pValue);
            return com.EjecutaConsultaJson("filtrar_area_cargo",listaParametros);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    public String ListarHistorialSalario(Integer idCL) throws Exception{
        try{
            listaParametros.clear();
            SqlParameter pValue = new SqlParameter("value",idCL);
            listaParametros.add(pValue);
            String a = com.EjecutaConsultaJson("filtrar_historialcargo",listaParametros);
            return jg.JsonConvertInvert(a);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    public void RegistrarHistorialSalario(String json, String idCargo, String fechFin) throws  Exception{
        try{
            System.out.println(json);
            listaParametros.clear();
            json = jg.JsonConvert(json);
            System.out.println(json);
            System.out.println("462172"+","+idCargo+","+fechFin);
            SqlParameter pJson = new SqlParameter("json",json);
            SqlParameter pValues = new SqlParameter("values", "462172"+","+idCargo+","+fechFin+","+"2");
            listaParametros.add(pJson);
            listaParametros.add(pValues);
            com.TransUnica("gen_insertar_historial_precio",listaParametros);
        }
        catch(Exception ex){
            throw ex;
        }
    }

    public String ValidarDatosDB(List<ECargoLaboral> listCargoLaboral) throws Exception {
        try{
            listCargoLaboral = addListId(listCargoLaboral);
            String json;
            if(listCargoLaboral.size()>1) {
                json = returnJson(listCargoLaboral);
            }
            else{
                ECargoLaboral oCargoLaboral = listCargoLaboral.get(0);
                json = returnJson(oCargoLaboral);
            }
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarCargoLaboral(json);
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

    /*FUNCIÓN INSERTAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void InsertarCargoLaboral(String json)
    {
        try
        {
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*METODO MODIFICAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void ModificarCargoLaboral(ECargoLaboral oeCargoLaboral)
    {
        try
        {
            String json = returnJson(oeCargoLaboral);
            String campos = getKeyId()+","+oeCargoLaboral.getIdcargo();
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("data_jason", json);
            SqlParameter pCampos = new SqlParameter("campos",campos);
            listaParametros.add(pValores);
            listaParametros.add(pCampos);

            com.TransUnica("gen_actualizar", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*METODO ELIMINAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void EliminarCargoLaboral(String id)
    {
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabCargoLaboral());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("GEN_ELIMINAR", listaParametros);
            listaParametros.clear();
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }


    /*FUNCION BUSCAR POR CAMPO ESPECÍFICO
     campos=nomColumna,valorBuscado;
     nomColumna2,valorBuscado*/
    public List<ECargoLaboral> BuscarCargoLaboral(String campos) throws Exception {
        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyNombre() + "," + addColumna[0];
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabCargoLaboral());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);
        String jsonResult =  com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<ECargoLaboral> listCargoLaboral = new ArrayList<>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new ECargoLaboral());
            for (int i = 0; i < listObject.size(); i++) {
                ECargoLaboral ocargo = (ECargoLaboral) listObject.get(i);
                listCargoLaboral.add(ocargo);
            }
        }
        return listCargoLaboral;
    }



    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabCargoLaboral());
            listaParametros.add(nameTbl);
            String Id = com.EjecutaConsultaJson("gen_retornaid",listaParametros);
            return Integer.parseInt(Id);
        }
        catch(Exception ex) {
            System.out.println("ERROR: "+ ex.getMessage());
            return null;
        }
    }


    public String returnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNomTabCargoLaboral(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<ECargoLaboral> addListId(List<ECargoLaboral> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdcargo(NextId);
            NextId++;
        }
        return listAddId;
    }

}
