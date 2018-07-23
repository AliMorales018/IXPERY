package com.ixpery.negocio.log;

import com.ixpery.datos.log.DServicio;
import com.ixpery.entidades.log.EActividad;
import com.ixpery.entidades.log.EActividadCargo;
import com.ixpery.entidades.log.EServicio;

import java.util.List;

public class BServicio{
    DServicio odservicio = new DServicio();

    public BServicio() throws Exception {
    }

    public String ValidarDatosServicio(EServicio oservicio, List<EActividad> lisActividades ,List<List<EActividadCargo>> listAC) throws Exception {
        String a = odservicio.ValidarDatosDB(oservicio,lisActividades,listAC);
        return a;
    }
}
