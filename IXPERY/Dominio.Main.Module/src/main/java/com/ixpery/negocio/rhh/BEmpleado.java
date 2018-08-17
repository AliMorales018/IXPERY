package com.ixpery.negocio.rhh;

import com.ixpery.datos.rhh.DEmpleado;
import com.ixpery.entidades.rhh.EEmpleado;

import java.util.List;

public class BEmpleado {

    DEmpleado odEmpleado = new DEmpleado();

    public BEmpleado() throws Exception {
    }

  /*  public void Insertar(String json) throws Exception {
        odEmpleado.InsertarEmpleado(json);
    }*/

    public String ValidarDatosDB(List<EEmpleado> listApli) throws Exception {
        String result = "";
        result = odEmpleado.ValidarDatosDB(listApli);
        return result;
    }

    public void Modificar(EEmpleado oeEmpleado) throws Exception  {
        odEmpleado.ModificarEmpleado(oeEmpleado);
    }

    public void Eliminar(String campos) throws Exception {
        odEmpleado.EliminarEmpleado(campos);
    }

    public List<EEmpleado> Buscar(String campos)throws Exception {
        return odEmpleado.BuscarEmpleado(campos);
    }

}