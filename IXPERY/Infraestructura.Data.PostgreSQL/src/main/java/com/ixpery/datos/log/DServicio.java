package com.ixpery.datos.log;

import com.ixpery.datos.tools.DConexion;
import com.ixpery.datos.tools.JsonParcellable;
import com.ixpery.entidades.log.EActividad;
import com.ixpery.entidades.log.EActividadCargo;
import com.ixpery.entidades.log.EEquipo;
import com.ixpery.entidades.log.EServicio;
import com.ixpery.utilitario.Datacnx;
import com.ixpery.utilitario.DtUtilitario;
import com.ixpery.utilitario.ParameterDirection;
import com.ixpery.utilitario.SqlParameter;

import java.util.ArrayList;
import java.util.List;

public class DServicio {

    List<SqlParameter> listaParametros = new ArrayList<SqlParameter>();
    Datacnx dataCnx = new DConexion().ConectarBD();
    DtUtilitario com = new DtUtilitario(dataCnx);
    DActividad odactividad = new DActividad();

    public static String getNameTable() { return "46162"; }
    public String NameTableActividad = odactividad.getNameTable();
    public String NameTableActividadCargo = "56063";
    public DServicio() throws Exception {
    }

    public String ValidarDatosDB(EServicio oservicio, List<EActividad> lisActividades , List<List<EActividadCargo>> listAC) throws Exception{
        try{
            //SERVICIO
            oservicio = AddId(oservicio);
            Integer idServicio = oservicio.getIdservicio();
            //SERVICIO

            //ACTIVIDADES
            lisActividades = odactividad.addListId(lisActividades,idServicio);
            //ACTIVIDADES

            //CARGOSLABORALES
            List<EActividadCargo> listaCLConId = new ArrayList<>();
            List<EActividadCargo> listCL;
            Integer idNextActividad = lisActividades.get(0).getIdactividad();
            for(int i = 0; i < lisActividades.size(); i++){
                listCL = listAC.get(i);
                for(int j = 0; j < listCL.size(); j++){
                    listCL.get(j).setIdactividad(new EActividad(idNextActividad));
                    listaCLConId.add(listCL.get(j));
                }
                idNextActividad++;
            }
            //CARGOSLABORALES

            String json = ReturnJson(oservicio,lisActividades,listaCLConId);

            listaParametros.clear();
            SqlParameter paramJson = new SqlParameter("@json", json);
            SqlParameter paramSalid = new SqlParameter("@reporte", "");
            paramSalid.Direction = ParameterDirection.Output;
            listaParametros.add(paramJson);
            listaParametros.add(paramSalid);
            com.TransUnica("gen_verificar_json", listaParametros);
            String a = paramSalid.Value.toString();
            if (a.equals("0")) {
                InsertarDatosServicio(json);
                return "0";
            }
            else{
                return a;
            }
        }
        catch (Exception ex){
            throw ex;
        }

    }

    public void InsertarDatosServicio(String json){
        try {
            listaParametros.clear();
            SqlParameter pJson = new SqlParameter("@json", json);
            listaParametros.add(pJson);
            com.TransUnica("gen_insertar_json", listaParametros);
        }
        catch (Exception ex) {
            throw ex;
        }
    }

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

    public EServicio AddId(EServicio oeServicio){
        Integer nextId = NextId();
        oeServicio.setIdservicio(nextId);
        return oeServicio;
    }

    public String ReturnJson(Object objectS, Object objectA, Object objectCL){
        JsonParcellable parser = new JsonParcellable();
        parser.addObjectParse(getNameTable(), objectS);
        parser.addObjectParse(NameTableActividad, objectA);
        parser.addObjectParse(NameTableActividadCargo, objectCL);
        String jsonParse = parser.getJsonParcellable(1);
        System.out.println(jsonParse);
        return jsonParse;
    }
}
