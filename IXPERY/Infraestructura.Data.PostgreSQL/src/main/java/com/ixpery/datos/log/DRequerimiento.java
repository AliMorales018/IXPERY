package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;

import com.ixpery.entidades.log.ERequerimiento;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DRequerimiento {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DRequerimiento() throws Exception { }

    public static String getNomTabRequerimiento() { return "46061"; }
    public static String getKeyId() { return "460611"; }
    public static String getKeyNombre() { return "460612"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public void InsertarRequerimiento(List<ERequerimiento> listRq) {
        try {
            listRq = addListId(listRq);
            String json = returnJson(listRq);
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public List<ERequerimiento> BuscarRqProyecto(Integer id, String valor) throws Exception {
        listaParametros.clear();
        SqlParameter pIdProy = new SqlParameter("tabla", id);
        SqlParameter pValor = new SqlParameter("campos", valor);
        listaParametros.add(pIdProy);
        listaParametros.add(pValor);
        String jsonResult = com.EjecutaConsultaJson("filtrar_requerimiento", listaParametros);

        List<ERequerimiento> listReq = new ArrayList<ERequerimiento>();
        if(!jsonResult.equals("0")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new ERequerimiento());
            for (int i = 0; i < listObject.size(); i++) {
                ERequerimiento oaReq = (ERequerimiento) listObject.get(i);
                listReq.add(oaReq);
            }
        }
        return listReq;
    }

    public void ModificarRequerimiento(ERequerimiento oeReque){
        try {
            String json = returnJson(oeReque);
            String campos = getKeyId()+","+oeReque.getIdrequerimiento();
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("data_jason", json);
            SqlParameter pCampos = new SqlParameter("campos",campos);
            listaParametros.add(pValores);
            listaParametros.add(pCampos);
            com.TransUnica("gen_actualizar", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabRequerimiento());
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
        parser.addObjectParse(getNomTabRequerimiento(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<ERequerimiento> addListId(List<ERequerimiento> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdrequerimiento(NextId);
            NextId++;
        }
        return listAddId;
    }

    public void EliminarRequerimiento(String id){
        try {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabRequerimiento());
            SqlParameter pId = new SqlParameter("campos", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    /*public List<String[]> ObtenerEstados() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabRequerimiento());
        listaParametros.add(pTabla);
        return com.EjecutaConsulta("LOG_OBTENER_ESTADO_TIPO", listaParametros);
    }

    public List<String[]> ObtenerRequeProyEmp(EProyecto oProyecto, EEmpresa oEmpresa) throws Exception {
        List<SqlParameter> lista = new ArrayList<SqlParameter>();
        SqlParameter idEmp = new SqlParameter("idempresa",oEmpresa.getIdempresa());
        SqlParameter idProy = new SqlParameter("idproyecto", oProyecto.getIdproyecto());
        lista.add(idEmp);
        lista.add(idProy);
        return com.EjecutaConsulta("LOG_TBC_EMPRESA_PROYECTO_RQ",lista);
    }
*/
}