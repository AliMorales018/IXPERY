package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EProvincia;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DProvincia {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    EProvincia oeProvincia = new EProvincia();
    public DProvincia() throws Exception { }

    //CAMBIAR ESTE CODIGO PORQUE AL RESTAURAR LA BASE CAMBIA DE CODIGO
    //UTILIZEN LA FUNCION select tabla_general()
    public static String getNomTabProv() { return "45975"; }

    //TAMBIEN DEFINIMOS AQUI LOS PARAMETROS DE BUSQUEDA DE LAS ENTIDADES
    public static String getKeyId() { return "459751"; }
    public static String getKeyDpto() { return "459753"; }

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    /*FUNCION LISTAR POR CAMPO ESPECÍFICO
      campos=nomColumna,valorBuscado;
      nomColumna2,valorBuscado*/
    public List<EProvincia> BuscarProv(String campos) throws Exception {

        campos = getKeyDpto() + "," + campos;
        System.out.println("Campos: " + campos);

        listaParametros.clear();
        SqlParameter pTabla = new SqlParameter("tabla", getNomTabProv());
        SqlParameter pCampos = new SqlParameter("campos", campos);
        listaParametros.add(pTabla);
        listaParametros.add(pCampos);

        String jsonResult = com.EjecutaConsultaJson("gen_filtrar", listaParametros);

        List<EProvincia> listProv = new ArrayList<EProvincia>();
        if(!jsonResult.equals("")) {
            //CONVERTIR JSON A LISTA DE ARRAY
            JsonParcellable parser = new JsonParcellable();
            List<Object> listObject = parser.getListObjectJson(jsonResult, new EProvincia());
            for (int i = 0; i < listObject.size(); i++) {
                EProvincia oProv  = (EProvincia) listObject.get(i);
                listProv.add(oProv);
            }
        }
        return listProv;
    }
}