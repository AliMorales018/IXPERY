package com.ixpery.datos.tools;

import com.ixpery.utilitario.Datacnx;

public class DConexion {
    public DConexion() {
    }

    public Datacnx ConectarBD(){
        return new Datacnx("192.168.0.18", "5432", "IXPERY2", "postgres", "admin");
    }
}
