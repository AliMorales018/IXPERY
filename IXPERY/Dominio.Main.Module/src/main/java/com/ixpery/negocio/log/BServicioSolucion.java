package com.ixpery.negocio.log;

import com.ixpery.datos.log.DServicioSolucion;
import com.ixpery.entidades.log.EServicioSolucion;

import java.util.List;

public class BServicioSolucion {
    DServicioSolucion odServicioSolucion = new DServicioSolucion();
    public BServicioSolucion() throws Exception {
    }

    public void Insertar(List<EServicioSolucion> listProSol){
        odServicioSolucion.InsertarServicioSolucion(listProSol);
    }
    public List<EServicioSolucion> Buscar(String campos)throws Exception {
        return odServicioSolucion.BuscarServicioSolucion(campos);
    }
}
