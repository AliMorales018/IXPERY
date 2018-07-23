package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EPreRegistroProducto {

    @SerializedName("467431")
    private Integer idprereg;

    @SerializedName("467432")
    private EProductoSolucion idprodsol;

    @SerializedName("467433")
    private EProducto idproducto;

    @SerializedName("467434")
    private String nomproducto;

    @SerializedName("467435")
    private String umedida;

    @SerializedName("467436")
    private Integer cantidad;

    @SerializedName("467437")
    private String estado;

    @SerializedName("467438")
    private String modelo;

    @SerializedName("467439")
    private String marca;

    public EPreRegistroProducto() {
    }

    public EPreRegistroProducto(Integer idprereg) {
        this.idprereg = idprereg;
    }

     public Integer getIdprereg() {
        return idprereg;
    }

    public void setIdprereg(Integer idprereg) {
        this.idprereg = idprereg;
    }

    public EProductoSolucion getIdprodsol() {
        return idprodsol;
    }

    public void setIdprodsol(EProductoSolucion idprodsol) {
        this.idprodsol = idprodsol;
    }

    public EProducto getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(EProducto idproducto) {
        this.idproducto = idproducto;
    }

    public String getNomproducto() {
        return nomproducto;
    }

    public void setNomproducto(String nomproducto) {
        this.nomproducto = nomproducto;
    }

    public String getUmedida() {
        return umedida;
    }

    public void setUmedida(String umedida) {
        this.umedida = umedida;
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

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public EPreRegistroProducto(Integer idprereg, EProductoSolucion idprodsol, EProducto idproducto, String nomproducto, String umedida, Integer cantidad, String estado, String modelo, String marca) {
        this.idprereg = idprereg;
        this.idprodsol = idprodsol;
        this.idproducto = idproducto;
        this.nomproducto = nomproducto;
        this.umedida = umedida;
        this.cantidad = cantidad;
        this.estado = estado;
        this.modelo = modelo;
        this.marca = marca;
    }
}
