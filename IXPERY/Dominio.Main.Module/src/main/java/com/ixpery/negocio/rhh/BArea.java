package com.ixpery.negocio.rhh;

import com.ixpery.datos.rhh.DArea;
import com.ixpery.entidades.rhh.EArea;

import java.util.List;

public class BArea {
    DArea odArea = new DArea();

    public BArea() throws Exception {
    }

    public String Validar(List<EArea> listArea) throws Exception{
        String result = "";
        result = odArea.ValidarDatosDB(listArea);
        return  result;
    }

    public void Modificar(EArea oeArea) throws Exception{
        odArea.ModificarArea(oeArea);
    }

    public void Eliminar(String id) throws Exception{
        odArea.EliminarArea(id);
    }

    public List<EArea> Buscar(String campos) throws Exception{
        return odArea.BuscarArea(campos);
    }
}
