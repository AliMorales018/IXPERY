package com.ixpery.negocio.log;
import com.ixpery.datos.log.DContactoEmpresa;
import com.ixpery.entidades.log.EContactoEmpresa;

import java.util.List;

public class BContactoEmpresa {
    DContactoEmpresa odContactoEmpresa = new DContactoEmpresa();

    public BContactoEmpresa() throws Exception {
    }

    public void Insertar(List<EContactoEmpresa> listContEmpresa) throws Exception {
        odContactoEmpresa.InsertarContactoEmpresa(listContEmpresa);
    }

    public List<EContactoEmpresa> Buscar(Integer iE, String nom)throws Exception {
        return odContactoEmpresa.BuscarContactoEmpresa(iE, nom);
    }

    public void Eliminar(String id) throws Exception {
        odContactoEmpresa.EliminarContactoEmpresa(id);
    }

    public void Modificar(EContactoEmpresa oeContacto) throws Exception  {
        odContactoEmpresa.ModificarContactoEmpresa(oeContacto);
    }

    public String BuscarEmpresaCombo(String var) throws Exception  {
        return odContactoEmpresa.BuscarEmpresaCombo(var);
    }

    /*public String ValidarDatosDB(String json) throws Exception {
        String result = "";
        result = odContactoEmpresa.ValidarDatosDB(json);
        return result;
    }
 */
}
