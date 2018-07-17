package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EProyecto;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProyecto {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listParametros = new ArrayList<>();

    public static String getNameTable() { return "46051"; }
    public static String getKeyId() {return "460511";}
    public static String getKeyPro() {return "460513";}
    public static String getKeyEmp() {return "460512";}
    public static String getKeyJef() {return "460514";}

    public DProyecto() throws Exception { }

    public String ReturnJson(Object object){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), object);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }

    public Integer NextId(){
        try{
            listParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
            listParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listParametros);
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<EProyecto> AddListId(List<EProyecto> listAddId){
        Integer nextId = NextId();
        Integer size = listAddId.size();
        for(int i = 0; i < size; ++i){
            listAddId.get(i).setIdProyecto(nextId);
            ++nextId;
        }
        return listAddId;
    }

    public String ValidarDatosDB(List<EProyecto> listPro) throws Exception{
        try{
            listPro = AddListId(listPro);
            String json;
            Integer size = listPro.size();
            if(size > 1){
                json = ReturnJson(listPro);
            }
            else{
                EProyecto oePro = listPro.get(0);
                json = ReturnJson(oePro);
            }
            listParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalida = new SqlParameter("@reporte", "");
            paramSalida.Direction = ParameterDirection.Output;
            listParametros.add(paramJson);
            listParametros.add(paramSalida);
            com.TransUnica("gen_verificar_json", listParametros);
            String mensaje = paramSalida.Value.toString();
            if (mensaje.equals("0")){
                InsertarProyecto(json);
                return "0";
            }
            else return mensaje;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void InsertarProyecto(String json) throws Exception{
        try{
            listParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            listParametros.add(paramJson);
            com.TransUnica("gen_insertar_json", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void ModificarProyecto(EProyecto oePro) throws Exception{
        try {
            String json = ReturnJson(oePro);
            String campos = getKeyId() + "," + oePro.getIdProyecto();
            listParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            SqlParameter pCampos = new SqlParameter("@campos", campos);
            listParametros.add(pJson); listParametros.add(pCampos);
            com.TransUnica("gen_actualizar", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }

    public void EliminarProyecto(String id) throws Exception{
        try {
            String campos = getKeyId() + "," + id;
            listParametros.clear();
            SqlParameter parTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter parId = new SqlParameter("@ids", campos);
            listParametros.add(parTabla); listParametros.add(parId);
            com.TransUnica("gen_eliminar", listParametros);
        }
        catch (Exception ex){
            throw ex;
        }
    }


    public List<EProyecto> BuscarProyecto(String campos) throws Exception{
        try {
            if(!campos.equals("/")){
                String[] addColumna = campos.split(",");
                Integer length = addColumna.length;
                for(int i = 0; i < length; ++i){
                    if(addColumna[i].equals("%")){
                        addColumna[i] = "";
                    }
                }
                campos = getKeyPro() + "," + addColumna[0];
                System.out.println("Campos: " + campos);
            }
            listParametros.clear();
            SqlParameter parTabla = new SqlParameter("@tabla", getNameTable());
            SqlParameter paraCampo = new SqlParameter("campos", campos);
            listParametros.add(parTabla); listParametros.add(paraCampo);
            String json = com.EjecutaConsultaJson("gen_filtrar_like", listParametros);

            List<EProyecto> listArea = new ArrayList<EProyecto>();
            if(!json.equals("")){
                JsonParcellable parser = new JsonParcellable();
                List<Object> listObject = parser.getListObjectJson(json, new EProyecto());
                for(int i = 0; i < listObject.size(); ++i){
                    EProyecto oePro = (EProyecto) listObject.get(i);
                    listArea.add(oePro);
                }
            }
            System.out.println("LISTA: " + listArea);
            return listArea;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    /*FUNCION BUSCAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public String BuscarProEmpresa(EEmpresa oEmpresa) throws Exception {
        listParametros.clear();
        SqlParameter pIdEmpresa = new SqlParameter("empresa", oEmpresa.getIdempresa());
        listParametros.add(pIdEmpresa);
        return com.EjecutaConsultaJson("log_proyecto_listarporempresayestado", listParametros);
    }


    //Dante
    public String BuscarProEmpresaReque(EEmpresa oEmpresa) throws Exception {
        listParametros.clear();
        SqlParameter pIdEmpresa = new SqlParameter("idempresa", oEmpresa.getIdempresa());
        listParametros.add(pIdEmpresa);
        return com.EjecutaConsultaJson("filtrar_proyectoporempresa", listParametros);
    }
    //Dante



    public String BuscarEmpresa() throws Exception{
        listParametros.clear();
//        SqlParameter pNomTabla = new SqlParameter("nomTabla", getNameTable());
//        SqlParameter pCampos = new SqlParameter("campos", "/");
//        listParametros.add(pNomTabla); listParametros.add(pCampos);
        List<SqlParameter> listParametrosBusEmp = new ArrayList<>();
        String json1 = com.EjecutaConsultaJson("listar_empresa", listParametrosBusEmp);
        System.out.println("ACA1: " + json1);
        return json1;
    }

    //log_obtener_estado_tipo

    public String BuscarEmpleado() throws Exception{
        listParametros.clear();
        List<SqlParameter> listParametrosBusEpl = new ArrayList<>();
        String json2 = com.EjecutaConsultaJson("listar_empleado", listParametrosBusEpl);
        System.out.println("ACA2: " + json2);
        return json2;
    }

    public String BuscarTipo() throws Exception{
        listParametros.clear();
        List<SqlParameter> listParametrosBusTip = new ArrayList<>();
        SqlParameter pNomTabla = new SqlParameter("nomTabla", getNameTable());
        listParametrosBusTip.add(pNomTabla);
        String json3 = com.EjecutaConsultaJson("log_obtener_estado_tipo_json", listParametrosBusTip);
        System.out.println("ACA3: " + json3);
        return json3;
    }

    public String BuscarEmpresas(String var) throws Exception{
        listParametros.clear();
//        SqlParameter pNomTabla = new SqlParameter("nomTabla", getNameTable());
        SqlParameter pVar = new SqlParameter("var", var);
        listParametros.add(pVar);
        String json1 = com.EjecutaConsultaJson("filtrar_empresa_cliente", listParametros);
        System.out.println("ACA4: " + json1);
        return json1;
    }



}