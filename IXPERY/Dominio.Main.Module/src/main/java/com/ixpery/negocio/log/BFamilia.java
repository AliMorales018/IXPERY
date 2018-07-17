package com.ixpery.negocio.log;

import com.ixpery.datos.log.DFamilia;
import com.ixpery.entidades.log.EFamilia;

import java.util.List;

public class BFamilia {
    DFamilia odFamilia = new DFamilia();

    public BFamilia() throws Exception {
    }

    public String ValidarDatosDB(List<EFamilia> listEmpr) throws Exception {
        String result = "";
        result = odFamilia.ValidarDatosDB(listEmpr);
        return result;
    }

    public void Modificar(EFamilia oeFamilia) throws Exception  {
        odFamilia.ModificarFamilia(oeFamilia);
    }

    public void Eliminar(String campos) throws Exception {
        odFamilia.EliminarFamilia(campos);
    }

    public List<EFamilia> Listar() throws Exception {
        return odFamilia.ListarFamilia();
    }

    public List<EFamilia> Buscar(String campos)throws Exception {
        return odFamilia.BuscarFamilia(campos);
    }
    public List<EFamilia> BuscarFamCategoria(String campos)throws Exception {
        return odFamilia.BuscarFamCategoria(campos);
    }

}
