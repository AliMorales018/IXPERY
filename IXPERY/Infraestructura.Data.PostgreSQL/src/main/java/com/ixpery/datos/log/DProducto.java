package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EProducto;
import com.ixpery.entidades.log.EProductoProveedor;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.entidades.log.ESolucion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProducto {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    JsonGeneral jsonGeneral = new JsonGeneral();

    public DProducto() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabProducto() { return "46144"; }
    public static String getNomTabProductoProveedor() { return "46713"; }

    public String RetornaTB(){ return "46144"; }
    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "461441"; }
    public static String getKeyNombre() { return "461447"; }
    public static String getKeyCategoria() { return "461442"; }


    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EProducto> listProd) throws Exception {
        try{
            listProd = addListId(listProd);
            String json = returnJson(listProd);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarProducto(json);
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
    public void InsertarProducto(String json)
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
    public void ModificarProducto(EProducto oeProducto)  {
        try
        {
            String json = returnJson(oeProducto);
            String campos = getKeyId()+","+oeProducto.getIdproducto();
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
    public void EliminarProducto(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabProducto());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*FUNCION LISTAR TODAS LAS ProductoES*/
    public String BuscarProducto(String campos) throws Exception{
        String value = jsonGeneral.StringConvert(campos);

        if(value.equals("/")){
            value = "461447,%";
        }
        else{
            value = value;
//            value = value + ";461448,1";
        }
//        value = "460513,%;460094,JUA;460519,1";

        listaParametros.clear();
        SqlParameter pTab = new SqlParameter("tab", getNomTabProducto());
        SqlParameter pValue = new SqlParameter("value", value);
        SqlParameter pCamTab1 = new SqlParameter("campTab1", "461441,461443,461444,461446,461447,461448,461449,4614410,4614411,4614412,4614413,4614414,4614415,4614416,4614417,4614418");
        SqlParameter pCamTab2 = new SqlParameter("campTab2", "461442:459201,459202,459203");

        listaParametros.add(pTab);
        listaParametros.add(pValue);
        listaParametros.add(pCamTab1);
        listaParametros.add(pCamTab2);
        String json = com.EjecutaConsultaJson("gen_buscar", listaParametros);
        json =  jsonGeneral.JsonConvertInvert(json);
        return json;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabProducto());
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
        parser.addObjectParse(getNomTabProducto(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EProducto> addListId(List<EProducto> listAddId){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdproducto(NextId);
            NextId++;
        }
        return listAddId;
    }


    public String BuscarProductoCombo(EProveedor oePro) throws Exception {
        listaParametros.clear();
        SqlParameter pId = new SqlParameter("campos", oePro.getIdproveedor());
        listaParametros.add(pId);
        String jsonResult = com.EjecutaConsultaJson("filtrar_producto_proveedor2", listaParametros);
        System.out.println(jsonResult);
        return jsonResult;
    }
    //LUIS 18/07/18 23:16 -- PARA LLENAR COMBO EN FILAS
    public String BuscarProductoEquipoCombo(String var) throws Exception{
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_producto", listaParametros);
    }
    //FIN LUIS
    // LUIS 23/07/18 10:00 am -- PARA LLENAR COMBO EN FILAS
    public String BuscarProveProductoCombo(String var) throws Exception{
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_precio_proveedor", listaParametros);
    }
    //FIN LUIS
    public String VerHistorialPrecios(EProductoProveedor oeProvProd) throws Exception {
        listaParametros.clear();
        SqlParameter pIdProv = new SqlParameter("idProv", oeProvProd.getIdProveedor().getIdproveedor());
        SqlParameter pIdProd = new SqlParameter("idProd", oeProvProd.getIdProducto().getIdproducto());
        listaParametros.add(pIdProv);
        listaParametros.add(pIdProd);
        return com.EjecutaConsultaJson("filtrar_historial_precio", listaParametros);
    }

    public String RegistrarPrecioHistorial(EProductoProveedor oeProd) throws Exception {
        oeProd = addListId(oeProd);
        String json = returnJson2(oeProd);
        listaParametros.clear();
        SqlParameter pId = new SqlParameter("json",json);
        listaParametros.add(pId);
        return com.EjecutaConsultaJson("gen_insertar_historialprecio", listaParametros);
    }

    public String ListarProdNOBBDDSolucion(ESolucion oeSolucion) throws Exception {
        listaParametros.clear();
        SqlParameter pIdSol = new SqlParameter("idSolucion",oeSolucion.getIdSolucion());
        listaParametros.add(pIdSol);
        return com.EjecutaConsultaJson("filtrar_producto_nobbdd_solucion", listaParametros);
    }

    public String ListarProdInsumo(String valor) throws Exception {
        listaParametros.clear();
        SqlParameter pValor = new SqlParameter("valor",valor);
        listaParametros.add(pValor);
        return com.EjecutaConsultaJson("filtrar_producto_insumo", listaParametros);
    }

    public Integer NextId2(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabProductoProveedor());
            listaParametros.add(nameTbl);
            String Id = com.EjecutaConsultaJson("gen_retornaid",listaParametros);
            return Integer.parseInt(Id);
        }
        catch(Exception ex) {
            System.out.println("ERROR: "+ ex.getMessage());
            return null;
        }
    }


    public String returnJson2(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNomTabProductoProveedor(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public EProductoProveedor addListId(EProductoProveedor oeProProv){
        Integer NextId =  NextId2();
        oeProProv.setIdProProv(NextId);
        return oeProProv;
    }
//DANTE
public String RegistrarProAsociado(String cadena){
    listaParametros.clear();
    SqlParameter pValor = new SqlParameter("valor",cadena);
    SqlParameter paramSalid = new SqlParameter("@reporte", "");
    paramSalid.Direction = ParameterDirection.Output;
    listaParametros.add(pValor);
    listaParametros.add(paramSalid);
    com.TransUnica("actualizar_preregistroproducto", listaParametros);
    String a  = paramSalid.Value.toString();
    return a;
}
    //DANTE

}
