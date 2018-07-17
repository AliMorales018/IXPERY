package com.ixpery.negocio.log;

import com.ixpery.datos.log.DProvincia;
import com.ixpery.entidades.log.EProvincia;

import java.util.List;

public class BProvincia {
    DProvincia odProv = new DProvincia();

    public BProvincia() throws Exception {
    }

    public List<EProvincia> Buscar(String campos)throws Exception {
        return odProv.BuscarProv(campos);
    }
}
