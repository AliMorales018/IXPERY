package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class EProducto {
    @SerializedName("461441")
    private Integer idproducto;
    @SerializedName("461442")
    private ECategoria idcategoria;
    @SerializedName("461443")
    private EUMedida idumedida;
    @SerializedName("461444")
    private String nomumed;
    @SerializedName("461446")
    private String codigo;
    @SerializedName("461447")
    private String nomproducto;
    @SerializedName("461448")
    private String estado;
    @SerializedName("461449")
    private Double saldo;
    @SerializedName("4614410")
    private Double stockminimo;
    @SerializedName("4614411")
    private String modelo;
    @SerializedName("4614412")
    private String marca;
    @SerializedName("4614413")
    private String fecharegistro;
    @SerializedName("4614414")
    private String userregistro;
    @SerializedName("4614415")
    private Integer insumo;
    @SerializedName("4614416")
    private Integer pfinal;
    @SerializedName("4614417")
    private Integer estadoinsumo;
    @SerializedName("4614418")
    private Integer estadopfinal;
    public EProducto() {
    }

    public EProducto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    public Integer getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(Integer idproducto) {
        this.idproducto = idproducto;
    }

    public ECategoria getIdcategoria() {
        return idcategoria;
    }

    public void setIdcategoria(ECategoria idcategoria) {
        this.idcategoria = idcategoria;
    }

    public EUMedida getIdumedida() {
        return idumedida;
    }

    public void setIdumedida(EUMedida idumedida) {
        this.idumedida = idumedida;
    }

    public String getNomumed() {
        return nomumed;
    }

    public void setNomumed(String nomumed) {
        this.nomumed = nomumed;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNomproducto() {
        return nomproducto;
    }

    public void setNomproducto(String nomproducto) {
        this.nomproducto = nomproducto;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Double getSaldo() {
        return saldo;
    }

    public void setSaldo(Double saldo) {
        this.saldo = saldo;
    }

    public Double getStockminimo() {
        return stockminimo;
    }

    public void setStockminimo(Double stockminimo) {
        this.stockminimo = stockminimo;
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

    public Integer getInsumo() {
        return insumo;
    }

    public void setInsumo(Integer insumo) {
        this.insumo = insumo;
    }

    public Integer getPfinal() {
        return pfinal;
    }

    public void setPfinal(Integer pfinal) {
        this.pfinal = pfinal;
    }

    public Integer getEstadoinsumo() {
        return estadoinsumo;
    }

    public void setEstadoinsumo(Integer estadoinsumo) {
        this.estadoinsumo = estadoinsumo;
    }

    public Integer getEstadopfinal() {
        return estadopfinal;
    }

    public void setEstadopfinal(Integer estadopfinal) {
        this.estadopfinal = estadopfinal;
    }

    public EProducto(Integer idproducto, ECategoria idcategoria, EUMedida idumedida, String nomumed, String codigo, String nomproducto, String estado, Double saldo, Double stockminimo, String modelo, String marca, String fecharegistro, String userregistro, Integer insumo, Integer pfinal, Integer estadoinsumo, Integer estadopfinal) {
        this.idproducto = idproducto;
        this.idcategoria = idcategoria;
        this.idumedida = idumedida;
        this.nomumed = nomumed;
        this.codigo = codigo;
        this.nomproducto = nomproducto;
        this.estado = estado;
        this.saldo = saldo;
        this.stockminimo = stockminimo;
        this.modelo = modelo;
        this.marca = marca;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
        this.insumo = insumo;
        this.pfinal = pfinal;
        this.estadoinsumo = estadoinsumo;
        this.estadopfinal = estadopfinal;
    }
}
