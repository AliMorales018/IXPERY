package com.ixpery.negocio.sys;

import com.ixpery.datos.sys.DMenuPerfil;

public class BMenuPerfil {
    DMenuPerfil odMenuPerfil = new DMenuPerfil();

    public BMenuPerfil() throws Exception {
    }

    public String MostrarMenu(int oeMenuPerfil) throws Exception {
        return odMenuPerfil.ConsultarMenuPerfil(oeMenuPerfil);
    }
}
