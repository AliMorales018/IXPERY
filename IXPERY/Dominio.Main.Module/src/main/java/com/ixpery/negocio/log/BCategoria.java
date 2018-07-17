package com.ixpery.negocio.log;

import com.ixpery.datos.log.DCategoria;
import com.ixpery.entidades.log.ECategoria;

import java.util.List;

public class BCategoria {
    DCategoria odCategoria = new DCategoria();

    public BCategoria() throws Exception {
    }

    public String ValidarDatosDB(List<ECategoria> listCate) throws Exception {
        String result = "";
        result = odCategoria.ValidarDatosDB(listCate);
        return result;
    }

    public void Modificar(ECategoria oeCategoria) throws Exception  {
        odCategoria.ModificarCategoria(oeCategoria);
    }

    public void Eliminar(String campos) throws Exception {
        odCategoria.EliminarCategoria(campos);
    }

    /*public List<ECategoria> Listar() throws Exception {
        return odCategoria.ListarCategoria();
    }*/

    public List<ECategoria> Buscar(String campos)throws Exception {
        return odCategoria.BuscarCategoria(campos);
    }

    public List<ECategoria> BuscarCategoriaFam(String campos)throws Exception {
        return odCategoria.BuscarCateFamilia(campos);
    }
}
