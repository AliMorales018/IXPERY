package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonGeneral;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DUtilidadCotizacion {
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();
    JsonGeneral jsonGeneral = new JsonGeneral();

    public DUtilidadCotizacion() throws Exception {
    }
    //LUIS 21/07/18 10:49 --
    public String BuscarSolucionUtiCoti(String var) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", Integer.parseInt(var));
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("mostrarcostositem", listParameter);
    }

    public String CalTotalCotiUtilidad(String cadena) throws Exception{
        listParameter.clear();
        SqlParameter pValorLike = new SqlParameter("varLike", cadena);
        listParameter.add(pValorLike);
        return com.EjecutaConsultaJson("previos_calculos", listParameter);
    }

    public void RegisterUtiCoti(String cadena) throws Exception{
            listParameter.clear();
            SqlParameter paramCadena = new SqlParameter("@json", cadena);
            listParameter.add(paramCadena);
            com.TransUnica("actualizar_cotizaciondetalle_l", listParameter);
    }


    //FIN LUIS





}







