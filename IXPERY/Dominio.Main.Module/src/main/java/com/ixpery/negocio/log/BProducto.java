package com.ixpery.negocio.log;


import com.ixpery.datos.log.DProducto;
import com.ixpery.entidades.log.*;

import java.util.List;

public class BProducto {
    DProducto odProducto = new DProducto();

    public BProducto() throws Exception {
    }

    public String ValidarDatosDB(List<EProducto> listApli) throws Exception {
        String result = "";
        result = odProducto.ValidarDatosDB(listApli);
        return result;
    }

    public void Modificar(EProducto oeProducto) throws Exception  {
        odProducto.ModificarProducto(oeProducto);
    }

    public void Eliminar(String campos) throws Exception {
        odProducto.EliminarProducto(campos);
    }

   /* public List<EProducto> Listar() throws Exception {
        return odProducto.ListarProducto();
    }*/

    public String BuscarProducto(String campos) throws Exception{
        return odProducto.BuscarProducto(campos);
    }

    public  String RetornaTB() throws  Exception{
        return odProducto.RetornaTB();
    }

    public String BuscarProductoCombo(String var)throws Exception {
        return odProducto.BuscarProductoCombo(var);
    }

    public String VerHistorialPrecios(EProductoProveedor oeProvProd)throws Exception {
        return odProducto.VerHistorialPrecios(oeProvProd);
    }

    public String RegistrarPrecioHistorial(EProductoProveedor oeProdProv)throws Exception {
        return odProducto.RegistrarPrecioHistorial(oeProdProv);
    }

    public String ListarProdNOBBDDSolucion(ESolucion oeSolucion)throws Exception {
        return odProducto.ListarProdNOBBDDSolucion(oeSolucion);
    }

    public String ListarProInusmo(String valor)throws Exception {
        return odProducto.ListarProdInsumo(valor);
    }
    //LUIS 17/07/2018 10:00 AM
    public String BuscarProductoEquipoCombo(String var) throws Exception{
        return odProducto.BuscarProductoEquipoCombo(var);
    }
    //FIN LUIS
// LUIS 23/07/2018 10:00 AM
    public String BuscarProveProductoCombo(String var) throws Exception{
        return odProducto.BuscarProveProductoCombo(var);
    }
//FIN LUIS
//DANTE
public String  RegistrarProductoAsociado(String cadena)throws Exception {
    return odProducto.RegistrarProAsociado(cadena);
}
    //DANTE

}

