package com.ixpery.datos.sys;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.List;

public class DMenu {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listaParametros;
    DMenuPerfil odMePer = new DMenuPerfil();

    public DMenu() throws Exception {
    }

    private List<String> lstMenuRe;

    private List<String> lstMenuAl;

    public List<String> getMenuAl()
    {
        return lstMenuAl;
    }

    public void ActualizarMenuPerfil(EPerfil oePerfil, String lista) throws Exception {
        try
        {
            SqlParameter cadena = new SqlParameter("@lista", lista);
            SqlParameter idPerfil = new SqlParameter("@idperfil", oePerfil.getIdperfil());
            listaParametros.add(cadena); listaParametros.add(idPerfil);
            com.TransUnica("XXX_TBD_MENUPERFIL_ACTUALIZAR", listaParametros);
            listaParametros.clear();
        }
        catch (Exception ex)
        {
            com.DeshaceTransaccion();
            throw new Exception("DB - Error" + ex);
        }
    }

    public String ListarPerfilApli(EAplicacion oeApli) throws Exception {
        try
        {
            listaParametros.clear();
            SqlParameter idApli = new SqlParameter("@idaplicacion", oeApli.getIdapli());
            listaParametros.add(idApli);
            return com.EjecutaConsultaJson("XXX_TBC_PerfilAplicacion", listaParametros);
        }
        catch (Exception ex)
        {
            throw new Exception("DB - Error" + ex);
        }
    }

    public String ListarMePerSys() throws Exception {
        try
        {
            listaParametros.clear();
            SqlParameter idApli = new SqlParameter("@idaplicacion", 1);
            SqlParameter idPerfil = new SqlParameter("@idperfil", 1);
            listaParametros.add(idApli); listaParametros.add(idPerfil);
            return com.EjecutaConsultaJson("XXX_TBC_MENU_POR_APLICACION_PERFIL", listaParametros);
        }
        catch (Exception ex)
        {
            throw new Exception("DB - Error" + ex);
        }
    }

    public String ListarMePerAll() throws Exception {
        try
        {
            listaParametros.clear();
            SqlParameter idApli = new SqlParameter("@idaplicacion", 1);
            SqlParameter idPerfil = new SqlParameter("@idperfil", "");
            listaParametros.add(idApli); listaParametros.add(idPerfil);
            return com.EjecutaConsultaJson("XXX_TBC_MENU_POR_APLICACION_PERFIL", listaParametros);
        }
        catch (Exception ex)
        {
            throw new Exception("DB - Error" +  ex);
        }
    }

    public String ListarMenuesApp() throws Exception {
        try
        {
            listaParametros.clear();
            SqlParameter idApli = new SqlParameter("@idApli", 1);
            listaParametros.add(idApli);
            return com.EjecutaConsultaJson("XXX_TBC_MENUSEGUNIDAPLI", listaParametros);
        }
        catch (Exception ex)
        {
            throw new Exception("DB - Error" +  ex);
        }
    }

}
