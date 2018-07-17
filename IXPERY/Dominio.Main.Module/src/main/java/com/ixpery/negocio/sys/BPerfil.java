package com.ixpery.negocio.sys;

import com.ixpery.datos.sys.DPerfil;
import com.ixpery.entidades.sys.EPerfil;

import java.util.List;

public class BPerfil {
    DPerfil odPerfil = new DPerfil();

    public BPerfil() throws Exception {
    }

    public void Insertar(String json) throws Exception {
        odPerfil.InsertarPerfil(json);
    }

    public String ValidarDatosDB(List<EPerfil> listPerfil) throws Exception {
        String result = "";
        result = odPerfil.ValidarDatosDB(listPerfil);
        return result;
    }

    public void Modificar(EPerfil oePerfil) throws Exception  {
        odPerfil.ModificarPerfil(oePerfil);
    }

    public void Eliminar(String campos) throws Exception {
        odPerfil.EliminarPerfil(campos);
    }

    public List<EPerfil> Buscar(String campos)throws Exception {
        return odPerfil.BuscarPerfil(campos);
    }
}