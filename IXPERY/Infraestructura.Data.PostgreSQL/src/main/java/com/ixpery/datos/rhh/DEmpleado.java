package com.ixpery.datos.rhh;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.rhh.EEmpleado;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DEmpleado {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DEmpleado() throws Exception { }

    public static String getNomTabEmpleado() { return "46227"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public String ValidarDatosDB(String json) throws Exception {
        try{
            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verif_campo_xml_con_id", listaParametros);
            String a = paramSalid.Value.toString();
            return a;
        }
        catch (Exception ex){
            throw ex;
        }
    }

    /*FUNCIÓN INSERTAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void InsertarEmpleado(String json)
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
    public void ModificarEmpleado(String json,String campos){
        try
        {
            listaParametros.clear();
            SqlParameter pValores = new SqlParameter("@json", json);
            SqlParameter pCampos = new SqlParameter("@campos",campos);
            listaParametros.add(pValores);
            listaParametros.add(pCampos);
            com.TransUnica("GEN_ACTUALIZAR", listaParametros);
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }
    /*METODO ELIMINAR SEGUN REQUERIMIENTOS DEL PROCEDIMIENTO ALMACENADO*/
    public void EliminarEmpleado(String campos){
        try
        {
            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpleado());
            SqlParameter pId = new SqlParameter("id", campos);
            listaParametros.add(pId); listaParametros.add(pTabla);
            com.TransUnica("GEN_ELIMINAR", listaParametros);
            listaParametros.clear();
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
        }
    }

    /*FUNCION BUSCAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EEmpleado> BuscarEmpleado(String campos){
        try{
            if (!campos.equals("/")) {
                //SEPARAMOS POR COMAS PARA PODER AGREGAR EL NOMBRE DE LA COLUMNA(CODIGO)
                String[] addColumna = campos.split(",");
                for (int i = 0; i < addColumna.length; i++) {
                    if (addColumna[i].equals("%")) {
                        addColumna[i] = "";
                    }
                }
            }

            listaParametros.clear();
            SqlParameter pTabla = new SqlParameter("tabla", getNomTabEmpleado());
            SqlParameter pCampos = new SqlParameter("campos", campos);
            listaParametros.add(pTabla);
            listaParametros.add(pCampos);
            String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

            List<EEmpleado> listEmpl = new ArrayList<EEmpleado>();
            if (!jsonResult.equals("")) {
                //CONVERTIR JSON A LISTA DE ARRAY
                JsonParcellable parser = new JsonParcellable();
                List<Object> listObject = parser.getListObjectJson(jsonResult, new EEmpleado());
                if(listObject.size()>0) {
                    for (int i = 0; i < listObject.size(); i++) {
                        EEmpleado oeEmpleado = (EEmpleado) listObject.get(i);
                        listEmpl.add(oeEmpleado);
                    }
                }
            }
            return listEmpl;
        }
        catch (Exception ex){
            System.out.println("ERROR: "+ex.getMessage());
            return  null;
        }
    }
}