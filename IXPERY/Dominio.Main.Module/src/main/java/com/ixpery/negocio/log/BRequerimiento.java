package com.ixpery.negocio.log;

import com.ixpery.datos.log.DRequerimiento;
import com.ixpery.entidades.log.ERequerimiento;

import java.util.List;

public class BRequerimiento {
    DRequerimiento odRequerimiento = new DRequerimiento();

    public BRequerimiento() throws Exception {
    }

    public void Insertar(List<ERequerimiento> listRq) throws Exception {
        odRequerimiento.InsertarRequerimiento(listRq);
    }

    public List<ERequerimiento> Buscar(Integer id, String value)throws Exception {
        return odRequerimiento.BuscarRqProyecto(id,value);
    }

    public void Modificar(ERequerimiento oeReque) throws Exception  {
        odRequerimiento.ModificarRequerimiento(oeReque);
    }

    public void Eliminar(String id) throws Exception {
        odRequerimiento.EliminarRequerimiento(id);
    }
}
