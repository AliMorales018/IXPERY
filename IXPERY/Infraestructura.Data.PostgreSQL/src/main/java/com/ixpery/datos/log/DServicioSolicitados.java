package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.EServicioProveedor;
import com.ixpery.entidades.log.EServiciosSolicitados;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicioSolicitados {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();
    JsonGeneral jsonGeneral = new JsonGeneral();

    public static String getNomTabSerSolicita() { return "467762"; }
    public static String getNomTabSerSolicita2() { return "46771"; }
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
        String jsonResult = com.EjecutaConsultaJson("filtrar_empresa_proveedor_2", listParameter);
        System.out.println(jsonResult);
        return jsonResult;
    }
    public String BuscarServiciosCombo2(String var) throws Exception {
        listParameter.clear();
        SqlParameter pId = new SqlParameter("campos", var);
        listParameter.add(pId);
        String jsonResult = com.EjecutaConsultaJson("filtrar_serviciosolicitado_proveedor2", listParameter);
        System.out.println(jsonResult);
        return jsonResult;
    }

    /*ESTA FUNCION FUE CREADA ANTES DE HACER LOS CAMBIOS PARA HISTORIAL PRECIO*/
    public String VerHistorialPrecios(EServicioProveedor oeProvProd) throws Exception {
        listParameter.clear();
        SqlParameter pIdProv = new SqlParameter("idProv", oeProvProd.getIdproveedor().getIdproveedor());
        SqlParameter pIdProd = new SqlParameter("idServ", oeProvProd.getIdservsol().getIdservsol());
        listParameter.add(pIdProv);
        listParameter.add(pIdProd);
        String a= com.EjecutaConsultaJson("filtrar_historial_precio_item3", listParameter);
        a=jsonGeneral.JsonConvertInvert(a);
        return a;
    }
   /*NUEVA FUNCION QUE USA DANTE PARA HISTORIAL PRECIOS*/
    /*public String VerHistorialPrecios(EServicioProveedor oeProvProd) throws Exception {
        listParameter.clear();
        SqlParameter pIdProv = new SqlParameter("idProv", oeProvProd.getIdproveedor().getIdproveedor());
        SqlParameter pIdProd = new SqlParameter("idProd", oeProvProd.getIdservsol().getIdservsol());
        listParameter.add(pIdProv);
        listParameter.add(pIdProd);
        return com.EjecutaConsultaJson("filtrar_historial_precio", listParameter);
    }*/

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

    public void GuardarFull(String json, String idsersoli,String fecfin) {
        try{
            listParameter.clear();
            String vals=getNomTabSerSolicita()+","+idsersoli+","+fecfin;
            json = jsonGeneral.JsonConvert(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramVals = new SqlParameter("@vals", vals);
            listParameter.add(paramJson);
            listParameter.add(paramVals);
            com.TransUnica("gen_insertar_historial_precio", listParameter);
        }
        catch (Exception e){
            throw e;
        }
    }

    public String BuscarServSolic(String campos) throws Exception{
        String value = jsonGeneral.StringConvert(campos);

        if(value.equals("/")){
            value = "467713,%";
        }
        else{
            value = value + ";467714,1";
        }
//        value = "460513,%;460094,JUA;460519,1";

        listParameter.clear();
        SqlParameter pTab = new SqlParameter("tab", getNomTabSerSolicita2());
        SqlParameter pValue = new SqlParameter("value", value);
        SqlParameter pCamTab1 = new SqlParameter("campTab1", "467711,467713,467714");
        SqlParameter pCamTab2 = new SqlParameter();

        listParameter.add(pTab);
        listParameter.add(pValue);
        listParameter.add(pCamTab1);
        listParameter.add(pCamTab2);
        String json = com.EjecutaConsultaJson("gen_buscar", listParameter);
        json =  jsonGeneral.JsonConvertInvert(json);
        return json;
    }

    public void Guardar(String json) {
        try{
            listParameter.clear();
            json = jsonGeneral.JsonConvert(json);
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParameter.add(paramJson);
            com.TransUnica("gen_guardar", listParameter);
        }
        catch (Exception e){
            throw e;
        }
    }

    public String ListarServNOBBDDSolucion(ESolucion oeSolucion) throws Exception {
        listParameter.clear();
        SqlParameter pIdSol = new SqlParameter("idSolucion",oeSolucion.getIdSolucion());
        listParameter.add(pIdSol);
        return com.EjecutaConsultaJson("filtrar_servicio_nobbdd_solucion", listParameter);
    }

    public String ListarServInsumo(String valor) throws Exception {
        listParameter.clear();
        SqlParameter pValor = new SqlParameter("valor",valor);
        listParameter.add(pValor);
        return com.EjecutaConsultaJson("filtrar_servicio_insumo", listParameter);
    }

    public String RegistrarSerAsociado(String cadena){
        listParameter.clear();
        SqlParameter pValor = new SqlParameter("valor",cadena);
        SqlParameter paramSalid = new SqlParameter("@reporte", "");
        paramSalid.Direction = ParameterDirection.Output;
        listParameter.add(pValor);
        listParameter.add(paramSalid);
        com.TransUnica("actualizar_preregistro_servicsolic", listParameter);
        String a  = paramSalid.Value.toString();
        return a;
    }
//FIN LUISfdfdf
}