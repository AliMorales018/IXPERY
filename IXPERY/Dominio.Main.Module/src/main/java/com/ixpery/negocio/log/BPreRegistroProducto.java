package com.ixpery.negocio.log;

import com.ixpery.datos.log.DPreRegistroProducto;
import com.ixpery.entidades.log.EPreRegistroProducto;

import java.util.List;

public class BPreRegistroProducto {
    DPreRegistroProducto obPreReProd = new DPreRegistroProducto();

    public BPreRegistroProducto() throws Exception{
    }

    public void Insertar(List<EPreRegistroProducto> listProSol){
        obPreReProd.InsertarProductoSolucion(listProSol);
    }



}
