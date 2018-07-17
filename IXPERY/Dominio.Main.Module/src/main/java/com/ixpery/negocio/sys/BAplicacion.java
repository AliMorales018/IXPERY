package com.ixpery.negocio.sys;

import java.util.List;
import com.ixpery.datos.sys.DAplicacion;
import com.ixpery.entidades.sys.EAplicacion;

public class BAplicacion {
    DAplicacion odAplicacion = new DAplicacion();

    public BAplicacion() throws Exception {
    }

    public String ValidarDatosDB(List<EAplicacion> listApli) throws Exception {
        String result = "";
        result = odAplicacion.ValidarDatosDB(listApli);
        return result;
    }

    public void Modificar(EAplicacion oeAplicacion) throws Exception  {
        odAplicacion.ModificarAplicacion(oeAplicacion);
    }

    public void Eliminar(String campos) throws Exception {
        odAplicacion.EliminarAplicacion(campos);
    }

    public List<EAplicacion> Buscar(String campos)throws Exception {
        return odAplicacion.BuscarAplicacion(campos);
    }

}