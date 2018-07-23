package com.ixpery.negocio.log;

import com.ixpery.datos.log.DProductoSolucion;
import com.ixpery.entidades.log.EProductoSolucion;

import java.util.List;

public class BProductoSolucion {
    DProductoSolucion odProductoSolucion = new DProductoSolucion();
    public BProductoSolucion() throws Exception {
    }

    public void Insertar(List<EProductoSolucion> listProSol){
        odProductoSolucion.InsertarProductoSolucion(listProSol);
    }
    public List<EProductoSolucion> Buscar(String campos)throws Exception {
        return odProductoSolucion.BuscarProductoSolucion(campos);
    }

}
