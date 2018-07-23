package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EEstado;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DEstado {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DEstado() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabEstado() { return "46114"; }
    public String RetornaTB(){ return "46114"; }


    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "461141"; }
    public static String getKeyCodTabla() { return "461145"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EEstado> listEsta) throws Exception {
        try{
            listEsta = addListId(listEsta);
            String json = returnJson(listEsta);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {

                InsertarEstado(json);
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
    public void InsertarEstado(String json)
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
            throw ex;
        }
    }

    /*METODO MODIFICAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void ModificarEstado(EEstado oeEstado)  {
        try
        {
            String json = returnJson(oeEstado);
            String campos = getKeyId()+","+oeEstado.getIdestado();
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("data_json", json);
            SqlParameter pCampos = new SqlParameter("campos",campos);
            listaParametros.add(pValores);
            listaParametros.add(pCampos);
            com.TransUnica("gen_actualizar", listaParametros);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
    /*METODO ELIMINAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void EliminarEstado(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabEstado());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /*FUNCION LISTAR TODAS LAS ESTADOS*/
    public List<EEstado> ListarEstado() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabEstado());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE ESTADOS
        List<EEstado> listEsta = new ArrayList<EEstado>();
        return listEsta;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EEstado> BuscarEstado(String campos) throws Exception {
        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");

            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyCodTabla() + "," + addColumna[0];
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabEstado());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listaParametros);

        List<EEstado> listEsta = new ArrayList<EEstado>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EEstado());
            for (int i = 0; i < listObject.size(); i++) {
                EEstado oEsta  = (EEstado) listObject.get(i);
                listEsta.add(oEsta);
            }
        }
        return listEsta;
    }

    //DANTE
    //ESTADOS TABLA REQUERMIENTO
    public List<EEstado> BuscarEstado2() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", "46061");
        listaParametros.add(pTabla);
        List<String[]> listResult = com.EjecutaConsultaTabla("log_obtener_estado_tipo", listaParametros);
        String[] row;
        List<EEstado> listEstados = new ArrayList<>();
        EEstado oeEstado;
        for (int i = 0; i < listResult.size(); i++){
            row = listResult.get(i);
            oeEstado = new EEstado();
            oeEstado.setIdestado(Integer.parseInt(row[0]));
            oeEstado.setNomestado(row[1]);
            listEstados.add(oeEstado);
        }
        return listEstados;
    }

    //DANTE

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabEstado());
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
        parser.addObjectParse(getNomTabEstado(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EEstado> addListId(List<EEstado> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdestado(NextId);
            NextId++;
        }
        return listAddId;
    }

}
