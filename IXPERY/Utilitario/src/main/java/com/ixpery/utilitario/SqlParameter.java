package com.ixpery.utilitario;

public class SqlParameter {
    public String nomParam;
    public Object valParam;
    public Object Value;

    /**
     *
     */
    public ParameterDirection Direction;
    
    public SqlParameter() {
    }

    public SqlParameter(String nomParam, Object valParam) {
        this.nomParam = nomParam;
        this.valParam = valParam;
    }
       
    public SqlParameter(String nomParam, Object valParam, ParameterDirection Direction) {
        this.nomParam = nomParam;
        this.valParam = valParam;
        this.Direction = Direction;
    }
 
    public String getNomParam() {
        return nomParam;
    }

    public void setNomParam(String nomParam) {
        this.nomParam = nomParam;
    }

    public Object getValParam() {
        return valParam;
    }

    public void setValParam(Object valParam) {
        this.valParam = valParam;
    }
    
    public ParameterDirection getDirection() {
        if(Direction == null){
            return ParameterDirection.Input;
        }
        else{
            return Direction;
        }
    }

    public void setDirection(ParameterDirection Direction) {
        this.Direction = Direction;
    }

    public Object getValue() {
        return Value;
    }

    public void setValue(Object Value) {
        this.Value = Value;
    }
    
}
