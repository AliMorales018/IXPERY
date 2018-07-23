package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class EProductoSolucion {
    @SerializedName("467281")
    private Integer idprodsol;

    @SerializedName("467282")
    private EEquipo idequipo;

    @SerializedName("467283")
    private EProductoProveedor idprodprov;

    @SerializedName("467284")
    private Integer cantidad;

    @SerializedName("467285")
    private Integer preciounit;

    @SerializedName("467286")
    private Integer total;

    @SerializedName("467287")
    private Integer subtotal;

    @SerializedName("467288")
    private String estado;

    @SerializedName("467289")
    private String fecharegistro;

    @SerializedName("4672810")
    private String userregistro;

    @SerializedName("4672811")
    private Integer idproducto;

    @SerializedName("4672812")
    private String enviadocotizar;

    @SerializedName("4672813")
    private Integer cotizado;

    @SerializedName("4672814")
    private Integer idprereg;

    @SerializedName("4672815")
    private Integer fechasolucion;

    public EProductoSolucion() {
    }

    public EProductoSolucion(Integer idprodsol) {
        this.idprodsol = idprodsol;
    }

    public Integer getIdprodsol() {
        return idprodsol;
    }

    public void setIdprodsol(Integer idprodsol) {
        this.idprodsol = idprodsol;
    }

    public EEquipo getIdequipo() {
        return idequipo;
    }

    public void setIdequipo(EEquipo idequipo) {
        this.idequipo = idequipo;
    }

    public EProductoProveedor getIdprodprov() {
        return idprodprov;
    }

    public void setIdprodprov(EProductoProveedor idprodprov) {
        this.idprodprov = idprodprov;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getPreciounit() {
        return preciounit;
    }

    public void setPreciounit(Integer preciounit) {
        this.preciounit = preciounit;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Integer subtotal) {
        this.subtotal = subtotal;
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

    public Integer getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    public String getEnviadocotizar() {
        return enviadocotizar;
    }

    public void setEnviadocotizar(String enviadocotizar) {
        this.enviadocotizar = enviadocotizar;
    }

    public Integer getCotizado() {
        return cotizado;
    }

    public void setCotizado(Integer cotizado) {
        this.cotizado = cotizado;
    }

    public Integer getIdprereg() {
        return idprereg;
    }

    public void setIdprereg(Integer idprereg) {
        this.idprereg = idprereg;
    }

    public Integer getFechasolucion() {
        return fechasolucion;
    }

    public void setFechasolucion(Integer fechasolucion) {
        this.fechasolucion = fechasolucion;
    }

    public EProductoSolucion(Integer idprodsol, EEquipo idequipo, EProductoProveedor idprodprov, Integer cantidad, Integer preciounit, Integer total, Integer subtotal, String estado, String fecharegistro, String userregistro, Integer idproducto, String enviadocotizar, Integer cotizado, Integer idprereg, Integer fechasolucion) {
        this.idprodsol = idprodsol;
        this.idequipo = idequipo;
        this.idprodprov = idprodprov;
        this.cantidad = cantidad;
        this.preciounit = preciounit;
        this.total = total;
        this.subtotal = subtotal;
        this.estado = estado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
        this.idproducto = idproducto;
        this.enviadocotizar = enviadocotizar;
        this.cotizado = cotizado;
        this.idprereg = idprereg;
        this.fechasolucion = fechasolucion;
    }
}
