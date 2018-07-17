package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EUMedida;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DUmedida {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EUMedida oeUmedida = new EUMedida();
    public DUmedida() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabUmedida() { return "46139"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "461391"; }
    public static String getKeyNombre() { return "461392"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EUMedida> listUmedi) throws Exception {
        try{
            listUmedi = addListId(listUmedi);
            String json = returnJson(listUmedi);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();

            if (a.equals("0")) {
                //INSERTAMOS LA Familia
                InsertarUmedida(json);
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
    public void InsertarUmedida(String json)
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
    public void ModificarUmedida(EUMedida oeUmedida)  {
        try
        {
            String json = returnJson(oeUmedida);
            String campos = getKeyId()+","+oeUmedida.getIdumedida();
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("data_json", json);
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
    public void EliminarUmedida(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabUmedida());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*FUNCION LISTAR TODAS LAS UMEDIDA*/
    public List<EUMedida> ListarUmedida() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabUmedida());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE FamiliaS
        List<EUMedida> listUmed = new ArrayList<EUMedida>();
        return listUmed;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EUMedida> BuscarUmedida(String campos) throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabUmedida());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EUMedida> listUmed = new ArrayList<EUMedida>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EUMedida());
            for (int i = 0; i < listObject.size(); i++) {
                EUMedida oUmed  = (EUMedida) listObject.get(i);
                listUmed.add(oUmed);
            }
        }
        return listUmed;
    }
    public List<EUMedida> BuscarUmedProducto(String campos) throws Exception {
        campos = getKeyId() + "," + campos;
        System.out.println("Campos: " + campos);

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabUmedida());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listaParametros);

        List<EUMedida> listUmed = new ArrayList<EUMedida>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EUMedida());
            for (int i = 0; i < listObject.size(); i++) {
                EUMedida oUmed  = (EUMedida) listObject.get(i);
                listUmed.add(oUmed);
            }
        }
        return listUmed;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabUmedida());
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
        parser.addObjectParse(getNomTabUmedida(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EUMedida> addListId(List<EUMedida> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdumedida(NextId);
            NextId++;
        }
        return listAddId;
    }
}
