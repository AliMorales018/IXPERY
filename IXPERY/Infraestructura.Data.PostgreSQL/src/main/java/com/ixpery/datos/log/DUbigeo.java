package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EUbigeo;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DUbigeo {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EUbigeo oeUbigeo = new EUbigeo();
    public DUbigeo() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabDist() { return "45985"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "459851"; }
    public static String getKeyProv() { return "459853"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EUbigeo> BuscarDist(String campos) throws Exception {

        campos = getKeyProv() + "," + campos;
        System.out.println("Campos: " + campos);

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabDist());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar_like", listaParametros);

        List<EUbigeo> listProv = new ArrayList<EUbigeo>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EUbigeo());
            for (int i = 0; i < listObject.size(); i++) {
                EUbigeo oUbig  = (EUbigeo) listObject.get(i);
                listProv.add(oUbig);
            }
        }
        return listProv;
    }
}