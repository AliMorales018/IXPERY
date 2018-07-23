package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.entidades.log.EActividad;
import com.ixpery.entidades.log.EServicio;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DActividad {
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);

    public DActividad() throws Exception {
    }

    public String getNameTable() { return "46172"; }

    public Integer NextId(){
        try{
            listaParametros.clear();
            SqlParameter nomTbl = new SqlParameter("nomTbl", getNameTable());
            listaParametros.add(nomTbl);
            String id = com.EjecutaConsultaJson("gen_retornaid", listaParametros);
            return Integer.parseInt(id);

        }
        catch (Exception e) {
            e.printStackTrace();
            System.out.println("ERROR: " + e.getMessage());
            return null;
        }
    }

    public List<EActividad> addListId(List<EActividad> listAddId, Integer idServicio){
        Integer NextId =  NextId();
        for (int i = 0; i < listAddId.size();i++){
            listAddId.get(i).setIdactividad(NextId);
            listAddId.get(i).setIdservicio(new EServicio(idServicio));
            NextId++;
        }
        return listAddId;
    }
}
