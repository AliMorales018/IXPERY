package com.ixpery.negocio.log;

import com.ixpery.datos.log.DProyecto;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EProyecto;

import java.util.List;

public class BProyecto {
    DProyecto odPro = new DProyecto();

    public BProyecto() throws Exception {
    }

    public String BuscarTipo() throws Exception {
        return odPro.BuscarTipo();
    }

    public String BuscarEmpresaRuc(String campos) throws Exception {
        return odPro.BuscarEmpresaRuc(campos);
    }

    public String BuscarEmpleado(String campos) throws Exception {
        return odPro.BuscarEmpleado(campos);
    }

    public String GuardarProyecto(String json) throws Exception{
        String mensaje = odPro.GuardarProyecto(json);
        return mensaje;
    }

    public String Buscar(String campos) throws Exception{
        return odPro.BuscarProyecto(campos);
    }

    //****************************** Dante ******************************//

    public String BuscarProyectoPorEmpresaReque(EEmpresa oeEmpresa)throws Exception {
        return odPro.BuscarProEmpresaReque(oeEmpresa);
    }

    //****************************** Dante ******************************//

}