package com.ixpery.negocio.log;

import com.ixpery.datos.log.DPreRegistroProducto;
import com.ixpery.entidades.log.EPreRegistroProducto;

import java.util.List;

public class BPreRegistroProducto {
    DPreRegistroProducto odPreReProd = new DPreRegistroProducto();

    public BPreRegistroProducto() throws Exception{
    }

    public void Insertar(List<EPreRegistroProducto> listProSol){
        odPreReProd.InsertarProductoSolucion(listProSol);
    }
    public List<EPreRegistroProducto> Buscar(String campos)throws Exception {
        return odPreReProd.BuscarPreRegProducto(campos);
    }



}
