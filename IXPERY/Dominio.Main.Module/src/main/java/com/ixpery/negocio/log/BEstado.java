package com.ixpery.negocio.log;

import com.ixpery.datos.log.DEstado;
import com.ixpery.entidades.log.EEstado;

import java.util.List;

public class BEstado {
    DEstado odEstado = new DEstado();

    public BEstado() throws Exception {
    }

    public String ValidarDatosDB(List<EEstado> listEsta) throws Exception {
        String result = "";
        result = odEstado.ValidarDatosDB(listEsta);
        return result;
    }

    public void Modificar(EEstado oeEstado) throws Exception  {
        odEstado.ModificarEstado(oeEstado);
    }

    public void Eliminar(String campos) throws Exception {
        odEstado.EliminarEstado(campos);
    }

    public List<EEstado> Listar() throws Exception {
        return odEstado.ListarEstado();
    }

    public List<EEstado> Buscar(String campos)throws Exception {
        return odEstado.BuscarEstado(campos);
    }

    public  String RetornaTB() throws  Exception{
        return odEstado.RetornaTB();

    }

    //DANTE 11-07-2018
    public List<EEstado> Buscar2()throws Exception {
        return odEstado.BuscarEstado2();
    }
    //DANTE

}
