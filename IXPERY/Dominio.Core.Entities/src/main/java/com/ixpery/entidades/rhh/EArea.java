package com.ixpery.entidades.rhh;

import com.google.gson.annotations.SerializedName;

public class EArea {
    @SerializedName("461971")
    private Integer idArea;
    @SerializedName("461972")
    private String nomArea;
    @SerializedName("461973")
    private String estado;
    @SerializedName("461974")
    private String idEstado;
    @SerializedName("461975")
    private String fechaRegistro;
    @SerializedName("461976")
    private String userRegistro;

    public Integer getIdArea() {
        return idArea;
    }

    public void setIdArea(Integer idArea) {
        this.idArea = idArea;
    }

    public String getNomArea() {
        return nomArea;
    }

    public void setNomArea(String nomArea) {
        this.nomArea = nomArea;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(String idEstado) {
        this.idEstado = idEstado;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getUserRegistro() {
        return userRegistro;
    }

    public void setUserRegistro(String userRegistro) {
        this.userRegistro = userRegistro;
    }

    public EArea(){}

    public EArea(Integer idArea) {
        this.idArea = idArea;
    }

    public EArea(Integer idArea, String nomArea, String estado, String idEstado, String fechaRegistro, String userRegistro) {
        this.idArea = idArea;
        this.nomArea = nomArea;
        this.estado = estado;
        this.idEstado = idEstado;
        this.fechaRegistro = fechaRegistro;
        this.userRegistro = userRegistro;
    }

}