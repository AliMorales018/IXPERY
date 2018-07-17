package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EMenu {
    @SerializedName("173711")
    private Integer idmenu;

    @SerializedName("173712")
    private String descripcion;

    @SerializedName("173713")
    private Integer idpadre;

    @SerializedName("173714")
    private Integer posicion;

    @SerializedName("173715")
    private String icono;

    @SerializedName("173716")
    private Boolean habilitado;

    @SerializedName("173717")
    private String url;

    @SerializedName("173718")
    private EAplicacion idapli;



    public Integer getIdmenu() {
        return idmenu;
    }

    public void setIdmenu(Integer idmenu) {
        this.idmenu = idmenu;
    }

    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getIdpadre() {
        return idpadre;
    }

    public void setIdpadre(Integer idpadre) {
        this.idpadre = idpadre;
    }

    public Integer getPosicion() {
        return posicion;
    }

    public void setPosicion(Integer posicion) {
        this.posicion = posicion;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public Boolean getHabilitado() {
        return habilitado;
    }

    public void setHabilitado(Boolean habilitado) {
        this.habilitado = habilitado;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public EAplicacion getIdapli() {
        return idapli;
    }

    public void setIdapli(EAplicacion idapli) {
        this.idapli = idapli;
    }

    public EMenu(Integer idmenu, String descripcion, Integer idpadre, Integer posicion,
                 String icono, Boolean habilitado, String url, EAplicacion idapli) {

        this.idmenu = idmenu;
        this.descripcion = descripcion;
        this.idpadre = idpadre;
        this.posicion = posicion;
        this.icono = icono;
        this.habilitado = habilitado;
        this.url = url;
        this.idapli = idapli;
    }
}
