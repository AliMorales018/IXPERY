package com.ixpery.negocio.rhh;

import com.ixpery.datos.rhh.DCargoLaboral;
import com.ixpery.entidades.rhh.ECargoLaboral;

import java.util.List;

public class BCargoLaboral {

    DCargoLaboral odCargoLaboral = new DCargoLaboral();

    public BCargoLaboral() throws Exception {
    }

    public void Insertar(String json) throws Exception {
        odCargoLaboral.InsertarCargoLaboral(json);
    }
    public String ValidarDatosDB(List<ECargoLaboral> listCargoLaboral) throws Exception {
        String result = "";
        result = odCargoLaboral.ValidarDatosDB(listCargoLaboral);
        return result;
    }
    public void Modificar(ECargoLaboral oeCargoLaboral) throws Exception  {
        odCargoLaboral.ModificarCargoLaboral(oeCargoLaboral);
    }

    public void Eliminar(String campos) throws Exception {
        odCargoLaboral.EliminarCargoLaboral(campos);
    }

    public List<ECargoLaboral> Buscar(String campos)throws Exception {
        return odCargoLaboral.BuscarCargoLaboral(campos);
    }
    public String ListarCargoLaboralCombo(String value) throws Exception{
        return odCargoLaboral.ListarCargosLaboralesCombo(value);
    }
    public String ListarHistorialSalario(Integer idCL) throws Exception{
        return odCargoLaboral.ListarHistorialSalario(idCL);
    }

    public void RegistrarHistorialSalario(String json, String idCargo, String fechaFin) throws Exception{
        odCargoLaboral.RegistrarHistorialSalario(json,idCargo,fechaFin);
    }

}
