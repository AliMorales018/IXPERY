package com.ixpery.datos.sys;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.entidades.sys.EPerfilUsuario;
import com.ixpery.entidades.sys.EUsuario;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DPerfilUsuario {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DPerfilUsuario() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabPerfilUsuario() { return "43357"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyIdUser() { return "433571"; }
    public static String getKeyIdPerfil() { return "433572"; }


    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EPerfilUsuario> listPerfUser) throws Exception {
        try{
            listPerfUser = addListId(listPerfUser);
            String json = returnJson(listPerfUser);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarPerfilUsuario(json);
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
    public void InsertarPerfilUsuario(String json)
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
    public void ModificarPerfilUsuario(EUsuario oeUsuario, EPerfil oePerfil, Integer idPerfNuevo)  {
        try
        {
            String json = returnJson(oeUsuario);
            String campos = getKeyIdUser()+","+oeUsuario.getIduser()+";"+getKeyIdPerfil()+","+oePerfil.getIdperfil();
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
    public void EliminarPerfilUsuario(EUsuario oeUser, EPerfil oePerfil){
        try
        {
            String campos = getKeyIdUser()+","+oeUser.getIduser()+";"+getKeyIdPerfil()+","+oePerfil.getIdperfil();
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabPerfilUsuario());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*FUNCION LISTAR TODAS LAS APLICACIONES*/
    public List<EPerfilUsuario> ListarPerfilUsuario() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabPerfilUsuario());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE APLICACIONES
        List<EPerfilUsuario> listPerfUsuario = new ArrayList<EPerfilUsuario>();
        return listPerfUsuario;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EPerfilUsuario> BuscarPerfilUsuario(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            //campos = getKeyNombre() + "," + addColumna[0] + ";" + getKeyAbreviatura() + "," + addColumna[1];
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabPerfilUsuario());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EPerfilUsuario> listPerfUsuario = new ArrayList<EPerfilUsuario>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EPerfilUsuario());
            for (int i = 0; i < listObject.size(); i++) {
                EPerfilUsuario operfusu = (EPerfilUsuario) listObject.get(i);
                listPerfUsuario.add(operfusu);
            }
        }
        return listPerfUsuario;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabPerfilUsuario());
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
        parser.addObjectParse(getNomTabPerfilUsuario(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EPerfilUsuario> addListId(List<EPerfilUsuario> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            //  listAddId.get(i).setIdapli(NextId);
            NextId++;
        }
        return listAddId;
    }
}
