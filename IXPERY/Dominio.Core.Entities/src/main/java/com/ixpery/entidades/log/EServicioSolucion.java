package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EServicioSolucion {

    @SerializedName("467911")
    private Integer idservicsolu;

    @SerializedName("467912")
    private EOtroServicio idoserv;

    @SerializedName("467913")
    private EServicioProveedor idservprov;

    @SerializedName("467914")
    private String nomservicio;

    @SerializedName("467915")
    private String descripcion;

    @SerializedName("467916")
    private Integer cantidad;

    @SerializedName("467917")
    private Double subtotal;

    @SerializedName("467918")
    private Double total;

    @SerializedName("467919")
    private String estado;

    @SerializedName("4679110")
    private String fecharegistro;

    @SerializedName("4679111")
    private String userregistro;

    @SerializedName("4679112")
    private Integer idservsol;

    @SerializedName("4679113")
    private String enviadocotizar;

    @SerializedName("4679114")
    private String cotizado;

    @SerializedName("4679115")
    private Integer idpreregserv;

    @SerializedName("4679116")
    private String fechasolucion;

    public EServicioSolucion() {
    }

    public EServicioSolucion(Integer idservicsolu) {
        this.idservicsolu = idservicsolu;
    }

    public EServicioSolucion(Integer idservicsolu, EOtroServicio idoserv, EServicioProveedor idservprov, String nomservicio, String descripcion, Integer cantidad, Double subtotal, Double total, String estado, String fecharegistro, String userregistro, Integer idservsol, String enviadocotizar, String cotizado, Integer idpreregserv, String fechasolucion) {
        this.idservicsolu = idservicsolu;
        this.idoserv = idoserv;
        this.idservprov = idservprov;
        this.nomservicio = nomservicio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.total = total;
        this.estado = estado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
        this.idservsol = idservsol;
        this.enviadocotizar = enviadocotizar;
        this.cotizado = cotizado;
        this.idpreregserv = idpreregserv;
        this.fechasolucion = fechasolucion;
    }

    public Integer getIdservicsolu() {
        return idservicsolu;
    }

    public void setIdservicsolu(Integer idservicsolu) {
        this.idservicsolu = idservicsolu;
    }

    public EOtroServicio getIdoserv() {
        return idoserv;
    }

    public void setIdoserv(EOtroServicio idoserv) {
        this.idoserv = idoserv;
    }

    public EServicioProveedor getIdservprov() {
        return idservprov;
    }

    public void setIdservprov(EServicioProveedor idservprov) {
        this.idservprov = idservprov;
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

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
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

    public Integer getIdservsol() {
        return idservsol;
    }

    public void setIdservsol(Integer idservsol) {
        this.idservsol = idservsol;
    }

    public String getEnviadocotizar() {
        return enviadocotizar;
    }

    public void setEnviadocotizar(String enviadocotizar) {
        this.enviadocotizar = enviadocotizar;
    }

    public String getCotizado() {
        return cotizado;
    }

    public void setCotizado(String cotizado) {
        this.cotizado = cotizado;
    }

    public Integer getIdpreregserv() {
        return idpreregserv;
    }

    public void setIdpreregserv(Integer idpreregserv) {
        this.idpreregserv = idpreregserv;
    }

    public String getFechasolucion() {
        return fechasolucion;
    }

    public void setFechasolucion(String fechasolucion) {
        this.fechasolucion = fechasolucion;
    }
}