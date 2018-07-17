package com.ixpery.datos.sys;

import java.util.*;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;
import com.ixpery.utilitario.ParameterDirection;


public class DAplicacion {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DAplicacion() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabAplicacion() { return "16426"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "164261"; }
    public static String getKeyNombre() { return "164262"; }
    public static String getKeyAbreviatura() { return "164265"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EAplicacion> listApli) throws Exception {
        try{
            listApli = addListId(listApli);
            String json = returnJson(listApli);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
                if (a.equals("0")) {
                    InsertarAplicacion(json);
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
    public void InsertarAplicacion(String json)
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
    public void ModificarAplicacion(EAplicacion oeAplicacion)  {
        try
            {
                String json = returnJson(oeAplicacion);
                String campos = getKeyId()+","+oeAplicacion.getIdapli();
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
        public void EliminarAplicacion(String id){
            try
            {
                String campos = getKeyId()+","+id;
                listaParametros.clear();
                SqlParameter pTabla = new SqlParameter("tabla", getNomTabAplicacion());
                SqlParameter pId = new SqlParameter("id", campos);
                listaParametros.add(pTabla);listaParametros.add(pId);
                com.TransUnica("gen_eliminar", listaParametros);
            }
            catch (Exception ex)
            {
                com.DeshaceTransaccion();
            }
        }

        /*FUNCION LISTAR POR CAMPO ESPECÍFICO
          campos=nomColumna,valorBuscado;
          nomColumna2,valorBuscado*/
        public List<EAplicacion> BuscarAplicacion(String campos) throws Exception {

            if(!campos.equals("/")) {
                //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
                String[] addColumna = campos.split(",");
                for (int i = 0; i < addColumna.length; i++){
                    if (addColumna[i].equals("%")) {
                        addColumna[i] = "";
                    }
                }
                campos = getKeyNombre() + "," + addColumna[0] + ";" + getKeyAbreviatura() + "," + addColumna[1];
                System.out.println("Campos: " + campos);
            }

            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabAplicacion());
            SqlParameter pCampos = new SqlParameter("campos", campos);
            listaParametros.add(pTabla);
            listaParametros.add(pCampos);

            String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

            List<EAplicacion> listApli = new ArrayList<EAplicacion>();
            if(!jsonResult.equals("")) {
                //CONVERTIR JSON A LISTA DE ARRAY
                JsonParcellable parser = new JsonParcellable();
                List<Object> listObject = parser.getListObjectJson(jsonResult, new EAplicacion());
                for (int i = 0; i < listObject.size(); i++) {
                    EAplicacion oapli = (EAplicacion) listObject.get(i);
                    listApli.add(oapli);
                }
            }
            return listApli;
        }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabAplicacion());
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
        parser.addObjectParse(getNomTabAplicacion(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<EAplicacion> addListId(List<EAplicacion> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdapli(NextId);
            NextId++;
        }
        return listAddId;
    }
}