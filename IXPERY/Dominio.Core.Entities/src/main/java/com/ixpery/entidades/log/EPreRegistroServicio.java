package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EPreRegistroServicio {
    @SerializedName("468061")
    private Integer idpreregserv;

    @SerializedName("468062")
    private EServiciosSolicitados idservsol;

    @SerializedName("468063")
    private EServicioSolucion idservicsolu;

    @SerializedName("468064")
    private  String servsolicitado;

    @SerializedName("468065")
    private  Integer cantidad;

    @SerializedName("468066")
    private  String estado;

    @SerializedName("468067")
    private  String fecharegistro;

    @SerializedName("468068")
    private  String userregistro;

    @SerializedName("468069")
    private  String descripcion;

    public EPreRegistroServicio() {
    }

    public EPreRegistroServicio(Integer idpreregserv, EServiciosSolicitados idservsol, EServicioSolucion idservicsolu, String servsolicitado, Integer cantidad, String estado, String fecharegistro, String userregistro, String descripcion) {
        this.idpreregserv = idpreregserv;
        this.idservsol = idservsol;
        this.idservicsolu = idservicsolu;
        this.servsolicitado = servsolicitado;
        this.cantidad = cantidad;
        this.estado = estado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
        this.descripcion = descripcion;
    }

    public Integer getIdpreregserv() {
        return idpreregserv;
    }

    public void setIdpreregserv(Integer idpreregserv) {
        this.idpreregserv = idpreregserv;
    }

    public EServiciosSolicitados getIdservsol() {
        return idservsol;
    }

    public void setIdservsol(EServiciosSolicitados idservsol) {
        this.idservsol = idservsol;
    }

    public EServicioSolucion getIdservicsolu() {
        return idservicsolu;
    }

    public void setIdservicsolu(EServicioSolucion idservicsolu) {
        this.idservicsolu = idservicsolu;
    }

    public String getServsolicitado() {
        return servsolicitado;
    }

    public void setServsolicitado(String servsolicitado) {
        this.servsolicitado = servsolicitado;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
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

    public String getDescripcion() { return descripcion; }

    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}
