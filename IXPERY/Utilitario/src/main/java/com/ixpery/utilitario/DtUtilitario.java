package com.ixpery.utilitario;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public final class DtUtilitario {
    
    private Connection cn = null;
    private final Datacnx dataCnx;

    //Variables de Ejecuta Consulta
    List<String[]> listaStrArray = new ArrayList<>();
    String jsonResult =  "";

    public DtUtilitario(Datacnx dataCnx) throws Exception {
        this.dataCnx = dataCnx;
    }
    
    public Connection Conectar() throws Exception{  
        try {
            if(cn == null || cn.isClosed()){
                Class.forName ("org.postgresql.Driver");
                cn = DriverManager.getConnection(dataCnx.getStringConexion(),dataCnx.getUserserver(),dataCnx.getPassserver());
                System.out.println("Connection Success");          
            }

        } catch (SQLException ex) {
            System.out.println("Connection Failed: " + ex.getMessage());
            System.out.println(dataCnx.getStringConexion());
            throw ex;
        }
        return cn;
    }
        
    public void Desconectar() throws Exception{
        try {
            if(!cn.isClosed()){
                cn.close();
                System.out.println("Connection Closed");
            }
        } catch (SQLException ex) {
            System.out.println("Error when closing connection: "+ ex.getMessage());
            throw  ex;
        }
    }

    public void ExecuteConsulta(String nombre, List<SqlParameter> listParam, String Type, Integer TypeExecute) throws Exception{
        try {
            Conectar();
            List<String[]> list = new ArrayList<String[]>();
            Integer sizeList = listParam.size();
            String parameters = GenerateParameter(listParam);
            String statement = "";
            if (TypeExecute == 1) {
                statement = "{call "+nombre+" "+parameters+"}";
            }

            if (TypeExecute == 2) {
                statement = "select * from "+nombre+" "+parameters;
            }

            CallableStatement sp = Conectar().prepareCall(statement);
            
            if(listParam.size() > 0){
                Integer index = 1;
                for (SqlParameter parameter: listParam) {
                    if(parameter.getDirection() == ParameterDirection.Input){
                       sp.setObject(index,parameter.getValParam());
                    }
                    if(parameter.getDirection() == ParameterDirection.Output){
                       sp.registerOutParameter(index,java.sql.Types.VARCHAR);
                    }
                    index++;
                }
            }
            
            ResultSet rs = sp.executeQuery();
            
            for (int i = 0; i < sizeList; i++) {
                if(listParam.get(i).getDirection() == ParameterDirection.Output){
                    listParam.get(i).setValue(sp.getObject(i));
                }
            }
            
            ResultSetMetaData rsmd = rs.getMetaData();
            
            while(rs.next()){
                String[] filaRS;
                filaRS = new String[rsmd.getColumnCount()];
                for (int i = 1; i <= rsmd.getColumnCount(); i++) {
                    filaRS[i-1] = rs.getString(i);
                }
                list.add(filaRS);
            }
            if (Type.equals("json")) {
                 String[] row = list.get(0);
                 this.jsonResult = row[0];
            }
            if (Type.equals("tabla")) {
                this.listaStrArray = list;
            }

            rs.close();
            Desconectar();

        } catch (SQLException ex) {
            System.out.println("Error when executing query: " + ex.getMessage());
            throw  ex;
        }
    }

    public String EjecutaConsultaJson(String nombre, List<SqlParameter> listParam) throws Exception{
        ExecuteConsulta(nombre, listParam, "json",1);
        return this.jsonResult;
    }

    public List<String[]> EjecutaConsultaTabla(String nombre, List<SqlParameter> listParam) throws Exception{
        ExecuteConsulta(nombre, listParam, "tabla" , 2);
        return this.listaStrArray;
    }

    public void IniciaTransaccion(){
        try {
            Conectar().setAutoCommit(false);
        } catch (Exception ex) {
            System.out.println("Error when starting transaction: " + ex.getMessage());
        }
    }

    public void FinalizaTransaccion(){
        try {
            cn.commit();
            Desconectar();
        } catch (Exception ex) {
            System.out.println("Error at the end of the transaction: " + ex.getMessage());
        }
    }
    
    public void DeshaceTransaccion(){
        try {
            cn.rollback();
            System.out.println("Execute Rollback OK");
            Desconectar();         
        } catch (Exception ex) {
            System.out.println("Error when undoing transaction: " + ex.getMessage());
        }
    }
    
    public void EjecutaTransaccion(String nombre, List<SqlParameter> listParam) throws SQLException, Exception{
        if (!cn.isClosed()) {
            try {
                Conectar();
                Integer sizeList = listParam.size();
                String parameters = GenerateParameter(listParam);

                CallableStatement sp = Conectar().prepareCall("{call "+nombre+" "+parameters+"}");   

                if(listParam.size() > 0){
                    Integer index = 1;
                    for (SqlParameter parameter: listParam) {
                        if(parameter.getDirection() == ParameterDirection.Input){
                           sp.setObject(index,parameter.getValParam());
                        }
                        if(parameter.getDirection() == ParameterDirection.Output){
                           sp.registerOutParameter(index,Types.VARCHAR);
                        }
                        index++;
                    }
                }

                sp.execute();
               
                for (int i = 0; i < sizeList; i++) {
                    if(listParam.get(i).getDirection() == ParameterDirection.Output){
                        listParam.get(i).setValue(sp.getString(i+1));
                    }
                }
            
            } catch (SQLException ex) {
                System.out.println("Error when executing transaction: " + ex.getMessage());
                throw  ex;
            }       
        }
    }
     
    public void TransUnica(String nombre, List<SqlParameter> listParam){	
        IniciaTransaccion();
        try {
            EjecutaTransaccion(nombre, listParam);
            FinalizaTransaccion();
        } catch (Exception ex) {
            DeshaceTransaccion();
            System.out.println("Error when executing transaction unique: " + ex.getMessage());
        }
    }

    public String GenerateParameter(List<SqlParameter> listParameter){
        String parameters = "";
        if(listParameter.size() > 0){
            parameters += "(";
            for (int i = 0; i < listParameter.size(); i++) {
                parameters+=",?";
            }
            parameters += ")";
            parameters=parameters.replaceFirst(",","");
        }
        else{
            parameters += "()";
        }
        return parameters;
    }
}
