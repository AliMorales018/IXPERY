package com.ixpery.datos.log;

import java.util.*;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.ECliente;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EProveedor;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

public class DEmpresa {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EEmpresa oeEmpresa = new EEmpresa();
    public DEmpresa() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabEmpresa() { return "46009"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "460091"; }
    public static String getKeyRuc() { return "460093"; }
    public static String getKeyNombre() { return "460098"; }
    private static String getKeyEstado() { return "4600919"; }//ESTADO SI ES PREREGISTRO O EMPRESA


    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(List<EEmpresa> listEmpr,Integer tipoReg) throws Exception {
        try{
            listEmpr = addListId(listEmpr,tipoReg);
            String json = returnJson(listEmpr);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();

            if (a.equals("0")) {
                if(tipoReg==1) {
                    ECliente oeCliente;
                    DCliente odCliente = new DCliente();
                    List<ECliente> listCliente = new ArrayList<ECliente>();
                    for (int i = 0; i < listEmpr.size(); i++) {
                        oeCliente = new ECliente();
                        oeCliente.setIdcliente(listEmpr.get(i).getIdempresa());
                        listCliente.add(oeCliente);
                    }
                    String json2 = odCliente.returnJson(listCliente);
                    //INSERTAMOS CLIENTE
                    odCliente.InsertarCliente(json2);
                    //INSERTAMOS LA EMPRESA
                    InsertarEmpresa(json);
                }else if(tipoReg==2){
                    EProveedor oeProveedor;
                    DProveedor odProveedor = new DProveedor();
                    List<EProveedor> listProveedor = new ArrayList<EProveedor>();
                    for (int i = 0; i < listEmpr.size(); i++) {
                        oeProveedor = new EProveedor();
                        oeProveedor.setIdproveedor(listEmpr.get(i).getIdempresa());
                        listProveedor.add(oeProveedor);
                    }
                    String json3 = odProveedor.returnJson(listProveedor);
                    //INSERTAMOS PROVEEDOR
                    odProveedor.InsertarProveedor(json3);
                    //INSERTAMOS LA EMPRESA
                    InsertarEmpresa(json);
                }
            }
            else{
                return a;
            }
            return "0";
        }
        catch (Exception ex){
            throw ex;
        }
    }
//LUIS 17/07/2018 10:00 AM
    public String ValidarDatosUpdate(List<EEmpresa> listEmpr,Integer tipoReg) throws Exception {
        try{
            listEmpr = addListId(listEmpr,tipoReg);
            String json = returnJson(listEmpr);
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();

            if (a.equals("0")) {

            }
            else{
                return a;
            }
            return "0";
        }
        catch (Exception ex){
            throw ex;
        }
    }
//FIN LUIS

    /*FUNCIÓN INSERTAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void InsertarEmpresa(String json)
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
    public void ModificarEmpresa(EEmpresa oeEmpresa)  {
        try
        {
            String json = returnJson(oeEmpresa);
            String campos = getKeyId()+","+oeEmpresa.getIdempresa();
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
    public void EliminarEmpresa(String id){
        try
        {
            String campos = getKeyId()+","+id;
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpresa());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pTabla);listaParametros.add(pId);
            com.TransUnica("gen_eliminar", listaParametros);
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }

    /*FUNCION LISTAR TODAS LAS EMPRESAS*/
    public List<EEmpresa> ListarEmpresa() throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("@tabla", getNomTabEmpresa());
        listaParametros.add(pTabla);
        String json = com.EjecutaConsultaJson("gen_listar", listaParametros);
        //CONVERTIR JSON A LISTA DE EMPRESAS
        List<EEmpresa> listEmpr = new ArrayList<EEmpresa>();
        return listEmpr;
    }

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EEmpresa> BuscarEmpresa(String campos) throws Exception {

        if(!campos.equals("/")) {
            //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
            String[] addColumna = campos.split(",");
            Integer i;
            for (i = 0; i < addColumna.length; i++){
                if (addColumna[i].equals("%")) {
                    addColumna[i] = "";
                }
            }
            //RECUPERO VALOR DEL ULTIMO VALOR DE LA CADENA CAMPOS(1=Registro;2=Pre-Registro; 3=Proveedor)
            Integer opc=Integer.parseInt(addColumna[i-1]);
            //Luis
            if(opc==2){
                campos = "2;" + getKeyRuc() + "," + addColumna[0] + ";" + getKeyNombre()+ "," + addColumna[1] + ";" + getKeyEstado() + "," + "DESAPROBADO";
                //campos = getKeyRuc() + "," + addColumna[0] + ";" + getKeyNombre()+ "," + addColumna[1] + ";" + getKeyEstado() + "," + "DESAPROBADO;2";
            }else if(opc==1){
                campos = "1;" + getKeyRuc() + "," + addColumna[0] + ";" + getKeyNombre()+ "," + addColumna[1] + ";" + getKeyEstado() + "," + "APROBADO";
                //campos = getKeyRuc() + "," + addColumna[0] + ";" + getKeyNombre()+ "," + addColumna[1] + ";" + getKeyEstado() + "," + "APROBADO"+ ";1";
            }else if(opc==3){
                campos = "3;" + getKeyRuc() + "," + addColumna[0] + ";" + getKeyNombre()+ "," + addColumna[1] + ";" + getKeyEstado() + "," + "APROBADO";
            }
            //Fin luis
            //Juan 11/0 - 4:30
            else if(opc==4){
                campos = "1;" + getKeyId() + "," + addColumna[0] + ";" + getKeyEstado() + "," + "APROBADO";
            }
            //-----
            System.out.println("Campos: " + campos);
        }

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpresa());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like_empresa", listaParametros);

        List<EEmpresa> listEmpr = new ArrayList<EEmpresa>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EEmpresa());
            for (int i = 0; i < listObject.size(); i++) {
                EEmpresa oEmpr  = (EEmpresa) listObject.get(i);
                listEmpr.add(oEmpr);
            }
        }
        return listEmpr;
    }

    public Integer NextId(){
        try {
            listaParametros.clear();
            SqlParameter nameTbl = new SqlParameter("naneTbl", getNomTabEmpresa());
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
        parser.addObjectParse(getNomTabEmpresa(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }


    public List<EEmpresa> addListId(List<EEmpresa> listAddId,Integer tipoReg){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdempresa(NextId);
            if(tipoReg==1) {
                listAddId.get(i).setIdcliente(new ECliente(NextId));
            }else if(tipoReg==2){
                listAddId.get(i).setIdproveedor(new EProveedor(NextId));
            }
            NextId++;
        }
        return listAddId;
    }

    public String BuscarEmpresaConcatenado(String valor) throws Exception {
        listaParametros.clear();
        SqlParameter pCampo = new SqlParameter("valor",valor);
        listaParametros.add(pCampo);
        return com.EjecutaConsultaJson("filtrar_empresa_cliente", listaParametros);
    }

    public String BuscarProyectoPorEmpresa(Integer empresa, String proyecto) throws Exception {
        listaParametros.clear();
        SqlParameter pEmpresa = new SqlParameter("emp",empresa);
        SqlParameter pProyecto = new SqlParameter("pro",proyecto);
        listaParametros.add(pEmpresa); listaParametros.add(pProyecto);
        return com.EjecutaConsultaJson("filtrar_proyecto_empresa", listaParametros);
    }

    public String BuscarRequerimientoPorProyecto(Integer proyecto, String requerimiento) throws Exception {
        listaParametros.clear();
        SqlParameter pProyecto = new SqlParameter("pro",proyecto);
        SqlParameter pRequerimiento = new SqlParameter("req",requerimiento);
        listaParametros.add(pProyecto); listaParametros.add(pRequerimiento);
        return com.EjecutaConsultaJson("filtrar_requerimiento_proyecto", listaParametros);
    }

    //COMBO
    //DANTE
    public String BuscarEmpresaProyectoCombo(String var) throws Exception {
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_empresa_proyecto", listaParametros);
    }
    //DANTE

    // LUIS 17/07/2018 14:37
    public String BuscarEmpresaSolucionCombo(String var) throws Exception {
        listaParametros.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", var);
        listaParametros.add(pValorLike);
        return com.EjecutaConsultaJson("filtrar_empresa_proyecto_requerimiento_solucion", listaParametros);
    }
    // FIN LUIS

}