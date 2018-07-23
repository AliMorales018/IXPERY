package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EPreRegistroProducto;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DPreRegistroProducto {

    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DPreRegistroProducto() throws Exception {
    }

    public static String getNameTable() { return "46743"; }
    public static String getKeyId() { return "467431"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ReturnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        String a = getNameTable();
        parser.addObjectParse(getNameTable(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public Integer NextId(){
        try{
            listaParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
            listaParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listaParametros);
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<EPreRegistroProducto> AddListId(List<EPreRegistroProducto> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdprereg(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public void InsertarProductoSolucion(List<EPreRegistroProducto> listProSol) {
        try {
            listProSol = AddListId(listProSol);
            String json = ReturnJson(listProSol);
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            com.DeshaceTransaccion();
        }
    }

    public List<EPreRegistroProducto> BuscarPreRegProducto(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyId() + "," + addColumna[0];
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNameTable());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listaParametros);

        List<EPreRegistroProducto> listPreRegProd = new ArrayList<EPreRegistroProducto>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EPreRegistroProducto());
            for (int i = 0; i < listObject.size(); i++) {
                EPreRegistroProducto oprod= (EPreRegistroProducto) listObject.get(i);
                listPreRegProd.add(oprod);
            }
        }
        return listPreRegProd;
    }

}
