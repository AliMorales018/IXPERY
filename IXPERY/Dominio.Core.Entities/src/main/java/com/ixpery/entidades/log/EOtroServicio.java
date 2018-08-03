package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
public class EOtroServicio {
    @SerializedName("467581")
    private Integer idoserv;

    @SerializedName("467582")
    private ESolucion idsolucion;

    @SerializedName("467583")
    private String nomservicio;

    @SerializedName("467584")
    private String descripcion;

    @SerializedName("467585")
    private Double totalmostrar;

    @SerializedName("467586")
    private String estado;

    @SerializedName("467587")
    private Integer idestado;

    @SerializedName("467588")
    private String fecharegistro;

    @SerializedName("467589")
    private String userregistro;

    public EOtroServicio() {
    }

    public EOtroServicio(Integer idoserv) {
        this.idoserv = idoserv;
    }

    public EOtroServicio(Integer idoserv, ESolucion idsolucion, String nomservicio, String descripcion, Double totalmostrar, String estado, Integer idestado, String fecharegistro, String userregistro) {
        this.idoserv = idoserv;
        this.idsolucion = idsolucion;
        this.nomservicio = nomservicio;
        this.descripcion = descripcion;
        this.totalmostrar = totalmostrar;
        this.estado = estado;
        this.idestado = idestado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
    }

    public Integer getIdoserv() {
        return idoserv;
    }

    public void setIdoserv(Integer idoserv) {
        this.idoserv = idoserv;
    }

    public ESolucion getIdsolucion() {
        return idsolucion;
    }

    public void setIdsolucion(ESolucion idsolucion) {
        this.idsolucion = idsolucion;
    }

    public String getNomservicio() {
        return nomservicio;
    }

    public void setNomservicio(String nomservicio) {
        this.nomservicio = nomservicio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getTotalmostrar() {
        return totalmostrar;
    }

    public void setTotalmostrar(Double totalmostrar) {
        this.totalmostrar = totalmostrar;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getIdestado() {
        return idestado;
    }

    public void setIdestado(Integer idestado) {
        this.idestado = idestado;
    }

    public String getFecharegistro() {
        return fecharegistro;
    }

    public void setFecharegistro(String fecharegistro) {
        this.fecharegistro = fecharegistro;
    }

    public String getUserregistro() {
        return userregistro;
    }

    public void setUserregistro(String userregistro) {
        this.userregistro = userregistro;
    }
}
