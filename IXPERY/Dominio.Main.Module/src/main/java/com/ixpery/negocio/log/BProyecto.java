package com.ixpery.negocio.log;

import com.ixpery.datos.log.DProyecto;
import com.ixpery.entidades.log.EEmpresa;
import com.ixpery.entidades.log.EProyecto;

import java.util.List;

public class BProyecto {
    DProyecto odPro = new DProyecto();

    public BProyecto() throws Exception {
    }

    public String Validar(List<EProyecto> listPro) throws Exception{
        String result = "";
        result = odPro.ValidarDatosDB(listPro);
        return result;
    }

    public void Modificar(EProyecto oePro) throws Exception{
        odPro.ModificarProyecto(oePro);
    }

    public void Eliminar(String id) throws Exception{
        odPro.EliminarProyecto(id);
    }

    public List<EProyecto> Buscar(String campos) throws Exception{
        return odPro.BuscarProyecto(campos);
    }

    public String BuscarProyectoPorEmpresa(EEmpresa oeEmpresa)throws Exception {
        return odPro.BuscarProEmpresa(oeEmpresa);
    }

    public String BuscarProyectoPorEmpresaReque(EEmpresa oeEmpresa)throws Exception {
        return odPro.BuscarProEmpresaReque(oeEmpresa);
    }

    public String BuscarEmpresa() throws Exception{
        return odPro.BuscarEmpresa();
    }

    public String BuscarEmpleado() throws Exception {
        return odPro.BuscarEmpleado();
    }

    public String BuscarTipo() throws Exception {
        return odPro.BuscarTipo();
    }

    public String BuscarEmpresas(String var) throws Exception{
        return odPro.BuscarEmpresas(var);
    }



}