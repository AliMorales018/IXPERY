package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EContactoEmpresa;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DContactoEmpresa {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DContactoEmpresa() throws Exception { }

    public static String getNomTabContactoEmpresa() { return "46038"; }
    public static String getKeyId() { return "460381"; }
    public static String getKeyNom() { return "460383"; }
    public static String getKeyPat() { return "460384"; }
    public static String getKeyMat() { return "460385"; }
    public static String getKeyDni() { return "4603811"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    /*FUNCIÓN INSERTAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void InsertarContactoEmpresa(List<EContactoEmpresa> listCont) {
        try {
            listCont = addListId(listCont);
            String json = returnJson(listCont);
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public List<EContactoEmpresa> BuscarContactoEmpresa(Integer iE, String nom) throws Exception {
        /*if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyNom()+","+addColumna[0]+";"+getKeyPat()+","+addColumna[1]+";"+getKeyMat()+","+addColumna[2]+";"+getKeyDni()+","+addColumna[3];
            System.out.println("Campos: " + campos);
        }*/

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("id", iE);
        SqlParameter pCampos = new SqlParameter("campos", nom);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);
        String jsonResult =  com.EjecutaConsultaJson("filtrar_contacto", listaParametros);

        List<EContactoEmpresa> listContacto = new ArrayList<EContactoEmpresa>();
        if(!jsonResult.equals("0")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EContactoEmpresa());
            for (int i = 0; i < listObject.size(); i++) {
                EContactoEmpresa oaUser = (EContactoEmpresa) listObject.get(i);
                listContacto.add(oaUser);
            }
        }
        return listContacto;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabContactoEmpresa());
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
        parser.addObjectParse(getNomTabContactoEmpresa(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public List<EContactoEmpresa> addListId(List<EContactoEmpresa> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdcontacto(NextId);
            NextId++;
        }
        return listAddId;
    }

    public void EliminarContactoEmpresa(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabContactoEmpresa());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
            listaParametros.clear();
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    public void ModificarContactoEmpresa(EContactoEmpresa oeContacto) {
        try {
            String json = returnJson(oeContacto);
            String campos = getKeyId()+","+oeContacto.getIdcontacto();
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("data_json", json);
            SqlParameter pCampos = new SqlParameter("campos",campos);
            listaParametros.add(pValores);
            listaParametros.add(pCampos);
            com.TransUnica("gen_actualizar", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public String BuscarEmpresaCombo(String var) {
        try {
            listaParametros.clear();
            SqlParameter pEmpresaLike = new SqlParameter("varLike", var);
            listaParametros.add(pEmpresaLike);
            return com.EjecutaConsultaJson("filtrar_empresa_cliente", listaParametros);
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }
}

