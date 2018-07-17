package com.ixpery.negocio.sys;

import com.ixpery.datos.sys.DPerfilUsuario;
import com.ixpery.entidades.sys.EPerfilUsuario;

import java.util.List;

public class BPerfilUsuario {
    DPerfilUsuario odPerfilUsuario = new DPerfilUsuario();

    public BPerfilUsuario() throws Exception {
    }

    public void Insertar(String json) throws Exception {
        odPerfilUsuario.InsertarPerfilUsuario(json);
    }

    public String ValidarDatosDB(String json) throws Exception {
        String result = "";
        //result = odPerfilUsuario.ValidarDatosDB(json);
        return result;
    }

    public void Modificar(String json, String campos) throws Exception  {
        //odPerfilUsuario.ModificarPerfilUsuario(json, campos);
    }

    public void Eliminar(String campos) throws Exception {
        //odPerfilUsuario.EliminarPerfilUsuario(campos);
    }

    public List<EPerfilUsuario> Buscar(String campos)throws Exception {
        return odPerfilUsuario.BuscarPerfilUsuario(campos);
    }
}
