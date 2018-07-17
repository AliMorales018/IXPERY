package com.ixpery.negocio.sys;

import com.ixpery.datos.sys.DMenu;
import com.ixpery.entidades.sys.EAplicacion;

public class BMenu {
    DMenu odMenu = new DMenu();

    public BMenu() throws Exception {
    }

    public String ListarMenuesApp(int oeMenuPerfil) throws Exception {
        return odMenu.ListarMenuesApp();
    }

    public String ListarMePerAll(int oeMenuPerfil) throws Exception {
        return odMenu.ListarMePerAll();
    }

    public String ListarPerfilApli(EAplicacion oeApli) throws Exception {
        return odMenu.ListarPerfilApli(oeApli);
    }
}
