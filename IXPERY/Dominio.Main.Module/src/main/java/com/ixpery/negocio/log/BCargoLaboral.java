package com.ixpery.negocio.log;

import com.ixpery.datos.log.DCargoLaboral;

public class BCargoLaboral {

    public BCargoLaboral() throws Exception {
    }

    DCargoLaboral odCargoLaboral = new DCargoLaboral();

    public String ListarCargoLaboralCombo(String value) throws Exception{
        return odCargoLaboral.ListarCargosLaboralesCombo(value);
    }
}
