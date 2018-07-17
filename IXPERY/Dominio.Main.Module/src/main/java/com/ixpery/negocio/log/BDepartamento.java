package com.ixpery.negocio.log;

import com.ixpery.datos.log.DDepartamento;
import com.ixpery.entidades.log.EDepartamento;

import java.util.List;

public class BDepartamento {
    DDepartamento odDpto = new DDepartamento();

    public BDepartamento() throws Exception {
    }

    public List<EDepartamento> Buscar(String campos)throws Exception {
        return odDpto.BuscarDpto(campos);
    }
}
