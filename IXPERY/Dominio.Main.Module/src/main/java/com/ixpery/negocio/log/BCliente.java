package com.ixpery.negocio.log;

import com.ixpery.datos.log.DCliente;
import com.ixpery.entidades.log.ECliente;

import java.util.List;

public class BCliente {
    DCliente odCliente = new DCliente();

    public BCliente() throws Exception {
    }

    public String ValidarDatosDB(List<ECliente> listClie) throws Exception {
        String result = "";
        result = odCliente.ValidarDatosDB(listClie);
        return result;
    }

    public void Modificar(ECliente oeCliente) throws Exception  {
        odCliente.ModificarCliente(oeCliente);
    }

    public void Eliminar(String campos) throws Exception {
        odCliente.EliminarCliente(campos);
    }

    /*public List<ECliente> Listar() throws Exception {
        return odCliente.ListarCliente();
    }*/
}
