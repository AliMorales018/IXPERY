package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.entidades.log.EServicio;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.entidades.log.EPersonalTransito;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DPersonalTransito {

    DConexion c = new DConexion();
    DtUtilitario com = new DtUtilitario(c.ConectarBD());

    public DPersonalTransito() throws Exception {

    }

    public static String getNameTable() { return "46182"; }
    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();

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

    public List<EPersonalTransito> AddListId(List<EPersonalTransito> oePersTran, Integer idServicio){
        Integer nextId = NextId();
        for(int i = 0; i < oePersTran.size(); i++){
            oePersTran.get(i).setIdperstran(nextId);
            oePersTran.get(i).setIdservicio(new EServicio(idServicio));
            nextId++;
        }
        return oePersTran;
    }
}
