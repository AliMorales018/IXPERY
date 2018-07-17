package com.ixpery.utilitario;

public class Datacnx {
    
    public String servername = "";
    public String portserver = "";
    public String dataserver = "";
    public String userserver = "";
    public String passserver = "";
    
    public String StringConexion;

    public Datacnx() {
    }

    public Datacnx(String servername, String portserver, String dataserver, String userserver, String passerver ) {
        this.servername = servername;
        this.portserver = portserver;
        this.dataserver = dataserver;
        this.userserver = userserver;
        this.passserver = passerver;
    }

    public void setServername(String servername) {
        this.servername = servername;
    }

    public void setPortserver(String portserver) {
        this.portserver = portserver;
    }

    public void setDataserver(String dataserver) {
        this.dataserver = dataserver;
    }

    public void setUserserver(String userserver) {
        this.userserver = userserver;
    }

    public void setPassserver(String passserver) {
        this.passserver = passserver;
    } 
    
    public String getStringConexion(){
        StringConexion = "jdbc:postgresql://"+this.servername+":"+this.portserver+"/"+this.dataserver;
        return StringConexion; 
    }

    public String getUserserver() {
        return userserver;
    }

    public String getPassserver() {
        return passserver;
    }
    
}
