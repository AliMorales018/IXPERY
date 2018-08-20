package com.ixpery.negocio.log;

import com.ixpery.datos.log.DUmedida;
import com.ixpery.entidades.log.EUMedida;

import java.util.List;

public class BUmedida {
    DUmedida odUmedida = new DUmedida();

    public BUmedida() throws Exception {
    }

    public String ValidarDatosDB(List<EUMedida> listUmed) throws Exception {
        String result = "";
        result = odUmedida.ValidarDatosDB(listUmed);
        return result;
    }

    public void Modificar(EUMedida oeUmedida) throws Exception  {
        odUmedida.ModificarUmedida(oeUmedida);
    }

    public void Eliminar(String campos) throws Exception {
        odUmedida.EliminarUmedida(campos);
    }

    public List<EUMedida> Listar() throws Exception {
        return odUmedida.ListarUmedida();
    }


    public String BuscarUmedida(String var) throws Exception{
        return odUmedida.BuscarUmedida(var);
    }
    public List<EUMedida> BuscarUmedProducto(String campos)throws Exception {
        return odUmedida.BuscarUmedProducto(campos);
    }
}