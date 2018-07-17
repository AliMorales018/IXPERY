package com.ixpery.negocio.log;


import com.ixpery.datos.log.DProveedor;
import com.ixpery.entidades.log.EProveedor;

import java.util.List;

public class BProveedor {
    DProveedor odProveedor = new DProveedor();

    public BProveedor() throws Exception {
    }

    public String ValidarDatosDB(List<EProveedor> listProvee) throws Exception {
        String result = "";
        result = odProveedor.ValidarDatosDB(listProvee);
        return result;
    }

    public void Modificar(EProveedor oeProveedor) throws Exception  {
        odProveedor.ModificarProveedor(oeProveedor);
    }

    public void Eliminar(String campos) throws Exception {
        odProveedor.EliminarProveedor(campos);
    }

    public List<EProveedor> Listar() throws Exception {
        return odProveedor.ListarProveedor();
    }

    public String BuscarProveedorCombo(String var) throws Exception {
        return odProveedor.BuscarProveedorCombo(var);
    }

    /*public List<EEmpresa> Buscar(String campos)throws Exception {
        return odEmpresa.BuscarEmpresa(campos);
    }*/

}
