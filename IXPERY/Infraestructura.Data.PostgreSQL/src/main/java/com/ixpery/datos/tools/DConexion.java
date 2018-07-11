package com.ixpery.datos.tools;

import com.ixpery.utilitario.Datacnx;

public class DConexion {
    public DConexion() {
    }

    public Datacnx ConectarBD() throws Exception{
        return new Datacnx("192.168.0.22", "5432", "IXPERY2", "postgres", "admin");
    }






}
