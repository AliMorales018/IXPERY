package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DCargoLaboral {

    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());
    List<SqlParameter> listParameter = new ArrayList<SqlParameter>();

    public DCargoLaboral() throws Exception { }

    public String ListarCargosLaboralesCombo(String value) throws Exception{
        try{
            listParameter.clear();
            SqlParameter pValue = new SqlParameter("value",value);
            listParameter.add(pValue);
            return com.EjecutaConsultaJson("filtrar_area_cargo",listParameter);
        }
        catch (Exception ex) {
            throw ex;
        }
    }
}
