package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
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
    public List<EProducto> ListarProducto() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabProducto());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE ProductoES
        List<EProducto> listApli = new ArrayList<EProducto>();
        return listApli;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EProducto> BuscarProducto(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            for (int i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            campos = getKeyNombre() + "," + addColumna[0];
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabProducto());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EProducto> listProd = new ArrayList<EProducto>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EProducto());
            for (int i = 0; i < listObject.size(); i++) {
                EProducto oprod= (EProducto) listObject.get(i);
                listProd.add(oprod);
            }
        }
        return listProd;
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


}
