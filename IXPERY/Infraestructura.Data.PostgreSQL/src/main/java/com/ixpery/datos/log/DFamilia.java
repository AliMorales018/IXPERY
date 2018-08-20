package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EFamilia;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DFamilia {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EFamilia oeFamilia = new EFamilia();
    public DFamilia() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabFamilia() { return "45915"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "459151"; }
    public static String getKeyNombre() { return "459152"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EFamilia> listFami) throws Exception {
        try{
            listFami = addListId(listFami);
            String json = returnJson(listFami);
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
                InsertarFamilia(json);
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
    public void InsertarFamilia(String json)
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
    public void ModificarFamilia(EFamilia oeFamilia)  {
        try
        {
            String json = returnJson(oeFamilia);
            String campos = getKeyId()+","+oeFamilia.getIdfamilia();
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
    public void EliminarFamilia(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabFamilia());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /*FUNCION LISTAR TODAS LAS FamiliaS*/
    public List<EFamilia> ListarFamilia() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabFamilia());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE FamiliaS
        List<EFamilia> listFami = new ArrayList<EFamilia>();
        return listFami;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public String BuscarFamilia(String campos) throws Exception {
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", campos);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_familias", listaParametros);
    }
    public List<EFamilia> BuscarFamCategoria(String campos) throws Exception {
        campos = getKeyId() + "," + campos;
        System.out.println("Campos: " + campos);

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabFamilia());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listaParametros);

        List<EFamilia> listFami = new ArrayList<EFamilia>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EFamilia());
            for (int i = 0; i < listObject.size(); i++) {
                EFamilia oCate  = (EFamilia) listObject.get(i);
                listFami.add(oCate);
            }
        }
        return listFami;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabFamilia());
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
        parser.addObjectParse(getNomTabFamilia(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<EFamilia> addListId(List<EFamilia> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdfamilia(NextId);
            NextId++;
        }
        return listAddId;
    }
}