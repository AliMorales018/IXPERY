package com.ixpery.negocio.log;

import com.ixpery.datos.log.DEmpresa;
import com.ixpery.entidades.log.EEmpresa;

import java.util.List;

public class BEmpresa {
    DEmpresa odEmpresa = new DEmpresa();

    public BEmpresa() throws Exception {
    }

    public String ValidarDatosDB(List<EEmpresa> listEmpr,Integer tipoReg) throws Exception {
        String result = "";
        result = odEmpresa.ValidarDatosDB(listEmpr,tipoReg);
        return result;
    }
    //LUIS 17/07/2018 10:00 AM
    public String ValidarDatosUpdate(List<EEmpresa> listEmpr,Integer tipoReg) throws Exception {
        String result = "";
        result = odEmpresa.ValidarDatosUpdate(listEmpr,tipoReg);
        return result;
    }
    //END LUIS
    public void Modificar(EEmpresa oeEmpresa) throws Exception  {
        odEmpresa.ModificarEmpresa(oeEmpresa);
    }

    public void Eliminar(String campos) throws Exception {
        odEmpresa.EliminarEmpresa(campos);
    }

    public List<EEmpresa> Listar() throws Exception {
        return odEmpresa.ListarEmpresa();
    }

    public List<EEmpresa> Buscar(String campos)throws Exception {
        return odEmpresa.BuscarEmpresa(campos);
    }

    public String BuscarEmpresaConcatenado(String valor)throws Exception {
        return odEmpresa.BuscarEmpresaConcatenado(valor);
    }

    public String BuscarProyectoPorEmpresa(Integer empresa, String proyecto) throws Exception{
        return odEmpresa.BuscarProyectoPorEmpresa(empresa, proyecto);
    }

    public String BuscarRequerimientoPorProyecto(Integer proyecto, String requerimiento) throws Exception{
        return odEmpresa.BuscarRequerimientoPorProyecto(proyecto, requerimiento);
    }

    public String BuscarEmpresaProyectoCombo(String var) throws Exception{
        return odEmpresa.BuscarEmpresaProyectoCombo(var);
    }

    //LUIS 17/07/2018 10:00 AM
    public String BuscarEmpresaSolucionCombo(String var) throws Exception{
        return odEmpresa.BuscarEmpresaSolucionCombo(var);
    }
//FIN LUIS
}