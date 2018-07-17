package com.ixpery.datos.sys;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DMenuPerfil {
    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

    public DMenuPerfil() throws Exception {
    }

    public static String getNomTabAplicacion() { return "17381"; }

    public String ConsultarMenuPerfil(int oeMenuPefil) throws Exception {
        listaParametros.clear();
        //SqlParameter pIdPefil = new SqlParameter("@idperfil", oeMenuPefil.getIdperfil());
        SqlParameter pIdPefil = new SqlParameter("@idperfil", oeMenuPefil);
        listaParametros.add(pIdPefil);
        String json = com.EjecutaConsultaJson("sys_lista_menu_padre_hijos", listaParametros);
        //CONVERTIR JSON A LISTA DE OBJETOS
        String listMenuPerfil = new String();
        System.out.println(listMenuPerfil);
        return json;
    }
}
