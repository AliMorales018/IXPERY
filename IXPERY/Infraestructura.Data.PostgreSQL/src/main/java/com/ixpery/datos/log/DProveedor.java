package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProveedor {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EEmpresa oeEmpresa = new EEmpresa();
    public DProveedor() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabProveedor() { return "45995"; }
    public static String getNomTabEmpresa() { return "46009"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "459951"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EProveedor> listProve) throws Exception {
        try{
            listProve = addListId(listProve);
            String json = returnJson(listProve);
            listaParametros.clear();
                /*SqlParameter paramJson = new SqlParameter("@json", json);
                SqlParameter paramSalid = new SqlParameter("@reporte", "");
                paramSalid.Direction = ParameterDirection.Output;
                listaParametros.add(paramJson);
                listaParametros.add(paramSalid);
                com.TransUnica("gen_verificar_json", listaParametros);
                String a = paramSalid.Value.toString();
                if (a.equals("0")) {*/
            InsertarProveedor(json);
            return "0";
                /*}
                else{
                    return a;
                }*/
        }
        catch (Exception ex){
            throw ex;
        }
    }

    /*FUNCIÓN INSERTAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void InsertarProveedor(String json)
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
    public void ModificarProveedor(EProveedor oeProveedor)  {
        try
        {
            String json = returnJson(oeProveedor);
            String campos = getKeyId()+","+oeProveedor.getIdproveedor();
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
    public void EliminarProveedor(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabProveedor());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /*FUNCION LISTAR TODAS LOS CLIENTES*/
    public List<EProveedor> ListarProveedor() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabProveedor());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE CLIENTES
        List<EProveedor> listProvee = new ArrayList<EProveedor>();
        return listProvee;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabProveedor());
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
        parser.addObjectParse(getNomTabProveedor(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<EProveedor> addListId(List<EProveedor> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdproveedor(NextId);
            NextId++;
        }
        return listAddId;
    }

    public String BuscarProveedorCombo(String value) throws Exception{
        listaParametros.clear();
        SqlParameter pIdEmpresa = new SqlParameter("value",value);
        listaParametros.add(pIdEmpresa);
        String mensaje = com.EjecutaConsultaJson("filtrar_empresa_proveedor", listaParametros);
        return mensaje;
    }
}