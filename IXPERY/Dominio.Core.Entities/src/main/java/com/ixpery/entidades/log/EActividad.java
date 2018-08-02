package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EActividad {

    @SerializedName("461721")
    private Integer idactividad;

    @SerializedName("461722")
    private EServicio idservicio;

    @SerializedName("461723")
    private String nomactividad;

    @SerializedName("461724")
    private String descripcion;

    @SerializedName("461725")
    private Integer cantidad;

    @SerializedName("461726")
    private Integer riesgo;

    @SerializedName("461727")
    private Integer subtotal;

    @SerializedName("461728")
    private Integer porcenttransito;

    @SerializedName("461729")
    private Integer total;

    @SerializedName("4617210")
    private Integer totalmostrar;

    @SerializedName("4617211")
    private String estado;

    @SerializedName("4617212")
    private Integer idestado;

    @SerializedName("4617213")
    private String fecharegistro;

    @SerializedName("4617214")
    private String userregistro;

    @SerializedName("4617215")
    private Double adicional;

    public EActividad() {
    }

    public EActividad(Integer idactividad) {
        this.idactividad = idactividad;
    }

    public Integer getIdactividad() {
        return idactividad;
    }

    public void setIdactividad(Integer idactividad) {
        this.idactividad = idactividad;
    }

    public EServicio getIdservicio() {
        return idservicio;
    }

    public void setIdservicio(EServicio idservicio) {
        this.idservicio = idservicio;
    }

    public String getNomactividad() {
        return nomactividad;
    }

    public void setNomactividad(String nomactividad) {
        this.nomactividad = nomactividad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(Integer riesgo) {
        this.riesgo = riesgo;
    }

    public Integer getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Integer subtotal) {
        this.subtotal = subtotal;
    }

    public Integer getPorcenttransito() {
        return porcenttransito;
    }

    public void setPorcenttransito(Integer porcenttransito) {
        this.porcenttransito = porcenttransito;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getTotalmostrar() {
        return totalmostrar;
    }

    public void setTotalmostrar(Integer totalmostrar) {
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

    public Double getAdicional() {
        return adicional;
    }

    public void setAdicional(Double adicional) {
        this.adicional = adicional;
    }
}
