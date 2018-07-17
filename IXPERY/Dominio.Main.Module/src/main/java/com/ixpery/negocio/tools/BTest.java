package com.ixpery.negocio.tools;
import com.ixpery.datos.tools.DTest;

public class BTest {
    public String bMensaje() throws Exception{
        //return "Hola desde Negocio";
        DTest dTest = new DTest();
        return dTest.DMensaje();
    }
}

