package com.ixpery.datos.rhh;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.rhh.EEmpleado;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DEmpleado {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DEmpleado() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabEmpleado() { return "46227"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "462271"; }
    public static String getKeyDni() { return "462273"; }
    public static String getKeyNombre() { return "462274"; }
    public static String getKeyApaterno() { return "462275"; }
    public static String getKeyAmaterno() { return "462276"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EEmpleado> listEmpleado) throws Exception {
        try{
            listEmpleado = addListId(listEmpleado);
            String json = returnJson(listEmpleado);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarEmpleado(json);
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
    public void InsertarEmpleado(String json)
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
    public void ModificarEmpleado(EEmpleado oeEmpleado)  {
        try
        {
            String json = returnJson(oeEmpleado);
            String campos = getKeyId()+","+oeEmpleado.getIdempleado();
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
    public void EliminarEmpleado(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpleado());
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
    public List<EEmpleado> BuscarEmpleado(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyDni() + "," + addColumna[0] + ";" +
                    getKeyNombre() + "," + addColumna[1] + ";" +
                    getKeyApaterno() + "," + addColumna[2] + ";" +
                    getKeyAmaterno() + "," + addColumna[3]
            ;
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpleado());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EEmpleado> listEmpleado = new ArrayList<EEmpleado>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EEmpleado());
            for (int i = 0; i < listObject.size(); i++) {
                EEmpleado oempleado = (EEmpleado) listObject.get(i);
                listEmpleado.add(oempleado);
            }
        }
        return listEmpleado;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabEmpleado());
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
        parser.addObjectParse(getNomTabEmpleado(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<EEmpleado> addListId(List<EEmpleado> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdempleado(NextId);
            NextId++;
        }
        return listAddId;
    }
}