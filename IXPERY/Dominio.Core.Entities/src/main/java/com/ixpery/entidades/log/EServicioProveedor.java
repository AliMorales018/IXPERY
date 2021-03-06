package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EServicioProveedor {
    @SerializedName("467761")
    private Integer idservprov;

    @SerializedName("467762")
    private EServiciosSolicitados idservsol;

    @SerializedName("467763")
    private EProveedor idproveedor;

    @SerializedName("467764")
    private Double precio;

    @SerializedName("467765")
    private String estado;

    @SerializedName("467766")
    private String fecharegistro;

    @SerializedName("467767")
    private String userregistro;

    @SerializedName("467768")
    private Double costo;

    @SerializedName("467769")
    private String fechainicio;

    @SerializedName("4677610")
    private String fechafin;

    @SerializedName("4677611")
    private Double precioventaminimo;

    public EServicioProveedor() {
    }

    public EServicioProveedor(Integer idservprov) {
        this.idservprov = idservprov;
    }

    public EServicioProveedor(Integer idservprov, EServiciosSolicitados idservsol, EProveedor idproveedor, Double precio, String estado, String fecharegistro, String userregistro, Double costo, String fechainicio, String fechafin, Double precioventaminimo) {
        this.idservprov = idservprov;
        this.idservsol = idservsol;
        this.idproveedor = idproveedor;
        this.precio = precio;
        this.estado = estado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
        this.costo = costo;
        this.fechainicio = fechainicio;
        this.fechafin = fechafin;
        this.precioventaminimo = precioventaminimo;
    }

    public Integer getIdservprov() {
        return idservprov;
    }

    public void setIdservprov(Integer idservprov) {
        this.idservprov = idservprov;
    }

    public EServiciosSolicitados getIdservsol() {
        return idservsol;
    }

    public void setIdservsol(EServiciosSolicitados idservsol) {
        this.idservsol = idservsol;
    }

    public EProveedor getIdproveedor() {
        return idproveedor;
    }

    public void setIdproveedor(EProveedor idproveedor) {
        this.idproveedor = idproveedor;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
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

    public Double getCosto() {
        return costo;
    }

    public void setCosto(Double costo) {
        this.costo = costo;
    }

    public String getFechainicio() {
        return fechainicio;
    }

    public void setFechainicio(String fechainicio) {
        this.fechainicio = fechainicio;
    }

    public String getFechafin() {
        return fechafin;
    }

    public void setFechafin(String fechafin) {
        this.fechafin = fechafin;
    }

    public Double getPrecioventaminimo() {
        return precioventaminimo;
    }

    public void setPrecioventaminimo(Double precioventaminimo) {
        this.precioventaminimo = precioventaminimo;
    }

}
