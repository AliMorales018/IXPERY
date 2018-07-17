package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EDepartamento;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DDepartamento {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EDepartamento oeDepartamento = new EDepartamento();
    public DDepartamento() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabDpto() { return "45970"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "459701"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EDepartamento> BuscarDpto(String campos) throws Exception {
        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabDpto());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EDepartamento> listDpto = new ArrayList<EDepartamento>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EDepartamento());
            for (int i = 0; i < listObject.size(); i++) {
                EDepartamento oDpto  = (EDepartamento) listObject.get(i);
                listDpto.add(oDpto);
            }
        }
        return listDpto;
    }
}