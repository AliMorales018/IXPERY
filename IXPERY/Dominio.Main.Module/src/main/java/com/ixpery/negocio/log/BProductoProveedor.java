package com.ixpery.negocio.log;

import com.ixpery.datos.log.DProductoProveedor;

public class BProductoProveedor {
    DProductoProveedor odProductoProveedor = new DProductoProveedor();
    public BProductoProveedor() throws Exception {
    }

    public String BuscarAsociado(String idProv, String idProd)throws Exception {
        return odProductoProveedor.BuscarAsociado(idProv,idProd);
    }

    public String RegistrarAsociado(String json, Integer idProdSol)throws Exception {
        return odProductoProveedor.RegistrarAsociado(json,idProdSol);
    }

    public void RegistrarHistorialPrecio(String json, String idProd, String fechaFin)throws Exception {
        odProductoProveedor.RegistrarHistorialPrecio(json, idProd, fechaFin);
    }

    public String ActualizarHistorialPrecio(String json1, String json2 ,Integer idProd)throws Exception {
        return odProductoProveedor.ActualizarHistorialPrecio(json1,json2, idProd);
    }
}
