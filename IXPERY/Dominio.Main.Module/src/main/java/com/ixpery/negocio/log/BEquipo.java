package com.ixpery.negocio.log;

import com.ixpery.datos.log.DEquipo;
import com.ixpery.entidades.log.EEquipo;

import java.util.List;

public class BEquipo {
    DEquipo odEquipo = new DEquipo();

    public BEquipo() throws Exception {
    }

    public void Insetar(List<EEquipo> listEquipo){
        odEquipo.InsertarEquipo(listEquipo);
    }

    public String ConsultarCliente(int idCliente) throws Exception {
        return odEquipo.ConsultarCliente(idCliente);
    }

    public String ConsultarProducto(String consulta) throws Exception{
        return odEquipo.ConsultarProducto(consulta);
    }



}
