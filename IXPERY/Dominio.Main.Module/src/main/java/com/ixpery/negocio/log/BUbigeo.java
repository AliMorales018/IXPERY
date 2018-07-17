package com.ixpery.negocio.log;

import com.ixpery.datos.log.DUbigeo;
import com.ixpery.entidades.log.EUbigeo;

import java.util.List;

public class BUbigeo {
    DUbigeo odUbig = new DUbigeo();

    public BUbigeo() throws Exception {
    }

    public List<EUbigeo> Buscar(String campos)throws Exception {
        return odUbig.BuscarDist(campos);
    }
}
