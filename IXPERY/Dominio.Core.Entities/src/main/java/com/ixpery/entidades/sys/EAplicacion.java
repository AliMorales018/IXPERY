package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EAplicacion {
    @SerializedName("164261")
    private Integer idapli;

    @SerializedName("164262")
    private String aplicacion;

    @SerializedName("164263")
    private String estado;

    @SerializedName("164264")
    private String version;

    @SerializedName("164265")
    private String abreviatura;

    public EAplicacion() {
    }

    public EAplicacion(Integer idapli) {
        this.idapli = idapli;
    }

    public Integer getIdapli() {
        return idapli;
    }

    public void setIdapli(Integer idapli) {
        this.idapli = idapli;
    }

    public String getAplicacion() {
        return aplicacion;
    }

    public void setAplicacion(String aplicacion) {
        this.aplicacion = aplicacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getAbreviatura() {
        return abreviatura;
    }

    public void setAbreviatura(String abreviatura) {
        this.abreviatura = abreviatura;
    }

    public EAplicacion(Integer idapli, String aplicacion, String estado, String version, String abreviatura) {
        this.idapli = idapli;
        this.aplicacion = aplicacion;
        this.estado = estado;
        this.version = version;
        this.abreviatura = abreviatura;
    }
}
