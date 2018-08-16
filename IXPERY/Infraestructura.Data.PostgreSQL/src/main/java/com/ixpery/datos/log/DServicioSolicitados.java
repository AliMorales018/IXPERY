package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.EServicioProveedor;
import com.ixpery.entidades.log.EServiciosSolicitados;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicioSolicitados {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();
    JsonGeneral jsonGeneral = new JsonGeneral();

    public static String getNomTabSerSolicita() { return "46771"; }
    public static String getNomTabServProveedor() { return "46776"; }

    public static String getKeyId() { return "467711"; }
    public static String getKeyNombre() { return "467713"; }
    public String RetornaTB(){ return "46771"; }

    public DServicioSolicitados() throws Exception {
    }

    //LUIS 03/08/18 12:15 am -- PARA LLENAR COMBO EN FILAS
    public String BuscarServicioCombo(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_serviciossolicitados", listParameter);
    }

    public String BuscarServiciosCombo(EProveedor oePro) throws Exception {
        listParameter.clear();
        SqlParameter pId = new SqlParameter("campos", oePro.getIdproveedor());
        listParameter.add(pId);
        String jsonResult = com.EjecutaConsultaJson("filtrar_serviciosolicitado_proveedor", listParameter);
        System.out.println(jsonResult);
        return jsonResult;
    }

    public String VerHistorialPrecios(EServicioProveedor oeProvProd) throws Exception {
        listParameter.clear();
        SqlParameter pIdProv = new SqlParameter("idProv", oeProvProd.getIdproveedor().getIdproveedor());
        SqlParameter pIdProd = new SqlParameter("idProd", oeProvProd.getIdservsol().getIdservsol());
        listParameter.add(pIdProv);
        listParameter.add(pIdProd);
        return com.EjecutaConsultaJson("filtrar_historial_precio_item3", listParameter);
    }

    public String RegistrarPrecioHistorial(EServicioProveedor oeProd) throws Exception {
        oeProd = addListId(oeProd);
        String json = returnJson2(oeProd);
        listParameter.clear();
        SqlParameter pId = new SqlParameter("json",json);
        listParameter.add(pId);
        return com.EjecutaConsultaJson("gen_insertar_historialprecio", listParameter);
    }

    public EServicioProveedor addListId(EServicioProveedor oeProProv){
        Integer NextId =  NextId();
        oeProProv.setIdservprov(NextId);
        return oeProProv;
    }

    public Integer NextId(){
        try {
            listParameter.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabServProveedor());
            listParameter.add(nameTbl);
            String Id = com.EjecutaConsultaJson("gen_retornaid",listParameter);
            return Integer.parseInt(Id);
        }
        catch(Exception ex) {
            System.out.println("ERROR: "+ ex.getMessage());
            return null;
        }
    }

    public String returnJson2(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNomTabServProveedor(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public void GuardarFull(String json, String vals) {
        try{
            listParameter.clear();
            json = jsonGeneral.JsonConvert(json);
//            json = jsonGeneral.JsonConvertId(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramVals = new SqlParameter("@json", json);
            listParameter.add(paramJson);
//            com.TransUnica("gen_insertar_json", listParametros);
            com.TransUnica("gen_insertar_historial_precio", listParameter);
        }
        catch (Exception e){
            throw e;
        }
    }
//FIN LUIS
}