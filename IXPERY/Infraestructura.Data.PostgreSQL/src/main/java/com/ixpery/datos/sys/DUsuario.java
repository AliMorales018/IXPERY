package com.ixpery.datos.sys;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.entidades.sys.EUsuario;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DUsuario {

    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();

    public static String getNameTable(){
        return "16400";
    }

    public static String getKeyId() { return "164001"; }
    public static String getKeyUser() { return "164002"; }
    public static String getKeyNom() { return "164003"; }
    public static String getKeyApep() { return "164004"; }
    public static String getKeyApem() { return "164005"; }

    public DUsuario() throws Exception {
    }

    public void InsertarUsuario(String json) throws Exception {
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

    public String ValidarDatosDB(List<EUsuario> listUsuario) throws Exception {
        try{
            listUsuario = addListId(listUsuario);
            String json;
            if(listUsuario.size()>1) {
                json = returnJson(listUsuario);
            }
            else{
                EUsuario oUsuario = listUsuario.get(0);
                json = returnJson(oUsuario);
            }
            listParameter.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listParameter.add(paramJson);
            listParameter.add(paramSalid);
            com.TransUnica("gen_verificar_json", listParameter);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarUsuario(json);
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

    public void ModificarUsuario(EUsuario oUsuario) throws Exception{
        try {
            String json = returnJson(oUsuario);
            String campos = getKeyId()+","+oUsuario.getIduser();
            listParameter.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            SqlParameter pCampos = new SqlParameter("@campos", campos);
            listParameter.add(pJson); listParameter.add(pCampos);
            com.TransUnica("gen_actualizar", listParameter);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    public void EliminarUsuario(String id) throws Exception{
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

    public List<EUsuario> BuscarUsuario(String campos) throws Exception{
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
    }

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


    public String returnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EUsuario> addListId(List<EUsuario> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIduser(NextId);
            NextId++;
        }
        return listAddId;
    }

    public Integer ValidarUsuario(EUsuario oUsuario) throws Exception{
        try {
            listParameter.clear();
            Integer Acceso = 0;
            SqlParameter paramLog = new SqlParameter("@Login",oUsuario.getLogin());
            SqlParameter paramPass = new SqlParameter("@Clave",oUsuario.getClave());
            listParameter.add(paramLog);listParameter.add(paramPass);
            List<String[]> listValue = com.EjecutaConsultaTabla("sys_tbc_user_ingresar",listParameter);
            String[] value = listValue.get(0);
            Acceso = Integer.parseInt(value[0].toString());
            return Acceso;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public List<EAplicacion> VerApliUsuario(EUsuario oUsuario) throws Exception {
        try{
            listParameter.clear();
            SqlParameter paramIdUsuario = new SqlParameter("@IdUsuario", oUsuario.getIduser());
            listParameter.add(paramIdUsuario);
            List<String[]> listApli = com.EjecutaConsultaTabla("sys_tbd_aplicacion_user_buscar", listParameter);

            List<EAplicacion> listAplicaciones = new ArrayList<>();
            EAplicacion oeAplicacion;
            String[] row;
            for (int i = 0; i < listApli.size(); i++){
                row = listApli.get(i);
                oeAplicacion = new EAplicacion();
                oeAplicacion.setIdapli(Integer.parseInt(row[0]));
                oeAplicacion.setAplicacion(row[1]);
                listAplicaciones.add(oeAplicacion);
            }
            return listAplicaciones;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public List<EPerfil> VerPerfApliUsuario(EUsuario oUsuario, EAplicacion oAplicacion) throws Exception{
        try{
            listParameter.clear();
            SqlParameter paramIdUsu = new SqlParameter("@iduser", oUsuario.getIduser());
            SqlParameter paramIdApli = new SqlParameter("@idaplicacion", oAplicacion.getIdapli());
            listParameter.add(paramIdUsu); listParameter.add(paramIdApli);
            List<String[]> listPerfil = com.EjecutaConsultaTabla("sys_tbd_perfil_aplicacion_usuario_buscar", listParameter);

            List<EPerfil> listPerfiles = new ArrayList<>();
            EPerfil oePerfil;
            String[] row;
            for (int i = 0; i < listPerfil.size(); i++){
                row = listPerfil.get(i);
                oePerfil = new EPerfil();
                oePerfil.setIdperfil(Integer.parseInt(row[0]));
                oePerfil.setPerfil(row[1]);
                listPerfiles.add(oePerfil);
            }
            return listPerfiles;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public List<String[]> VerUsuarioEmail(String value) throws Exception {
        try {
            listParameter.clear();
            SqlParameter valor = new SqlParameter("@valor", value);
            listParameter.add(valor);
            return com.EjecutaConsultaTabla("sys_tbc_user_correologin_buscar", listParameter);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

    /*public List<String[]> BuscarConcatenado(String value) throws Exception {
        try{
            listParameter.clear();
            SqlParameter paramValue = new SqlParameter("@concatenar", value);
            listParameter.add(paramValue);
            return com.EjecutaConsulta("xxx_tbc_user_buscar", listParameter);
        }
        catch (Exception ex){
            throw ex;
        }
    }
    */


    /*public List<String[]> VerUsuario(EUsuario oUsuario) throws Exception {
        try{
            listParameter.clear();
            SqlParameter id = new SqlParameter("@valor", oUsuario.getIduser());
            listParameter.add(id);
            return com.EjecutaConsulta("XXX_TBC_USER_BUSCAR_ID", listParameter);
        }
        catch (Exception ex) {
            throw ex;
        }
    }
    */

    /*
     */
}