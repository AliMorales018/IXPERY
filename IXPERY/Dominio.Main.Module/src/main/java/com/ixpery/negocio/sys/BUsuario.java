package com.ixpery.negocio.sys;

import com.ixpery.datos.sys.DUsuario;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.entidades.sys.EUsuario;

import java.util.List;

public class BUsuario {
    DUsuario odUsuario = new DUsuario();

    public BUsuario() throws Exception {
    }

    public String ValidarDatosDB(List<EUsuario> listUsuario) throws Exception {
        String result = "";
        result = odUsuario.ValidarDatosDB(listUsuario);
        return result;
    }

    public void Modificar(EUsuario oUsuario) throws Exception  {
        odUsuario.ModificarUsuario(oUsuario);
    }

    public void Eliminar(String campos) throws Exception {
        odUsuario.EliminarUsuario(campos);
    }

    public List<EUsuario> Buscar(String campos)throws Exception {
        return odUsuario.BuscarUsuario(campos);
    }

    public int ValidarUsuario(EUsuario oUsuario) throws Exception {
        return odUsuario.ValidarUsuario(oUsuario);
    }

    public List<EAplicacion> VerApliUsuario(EUsuario oUsuario) throws Exception {
        return odUsuario.VerApliUsuario(oUsuario);
    }

    public List<EPerfil> VerPerfApliUsuario(EUsuario oUsuario, EAplicacion oAplicacion) throws Exception {
        return odUsuario.VerPerfApliUsuario(oUsuario, oAplicacion);
    }

    public List<String[]> VerUsuarioPorEmail(String value) throws Exception {
        return odUsuario.VerUsuarioEmail(value);
    }

    /*public List<String[]> BuscarConcatenado(String value) throws Exception  {
        return odUsuario.BuscarConcatenado(value);
    }

    public List<String[]> VerUsuario(EUsuario oUsuario) throws Exception {
        return odUsuario.VerUsuario(oUsuario);
    }
    */
}
