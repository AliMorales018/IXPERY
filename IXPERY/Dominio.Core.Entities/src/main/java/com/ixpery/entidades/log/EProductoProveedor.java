package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EProductoProveedor {

    @SerializedName("467131")
    private Integer idProProv;

    @SerializedName("467132")
    private EProducto idProducto;

    @SerializedName("467133")
    private EProveedor idProveedor;

    @SerializedName("467134")
    private Double PrecioCompra;

    @SerializedName("467135")
    private Double PrecioVenta;

    @SerializedName("467136")
    private String FechaInicio;

    @SerializedName("467137")
    private String FechaFin;

    @SerializedName("467138")
    private String Estado;

    @SerializedName("467139")
    private Double PrecVentaMinimo;

    @SerializedName("4671310")
    private String FechaRegistro;

    @SerializedName("4671311")
    private String UsuarioRegistro;

    public EProductoProveedor() {
    }

    public EProductoProveedor(Integer idProProv) {
        this.idProProv = idProProv;
    }

    public EProductoProveedor(Integer idProProv, EProducto idProducto, EProveedor idProveedor, Double precioCompra, Double precioVenta, String fechaInicio, String fechaFin, String estado, Double precVentaMinimo, String fechaRegistro, String usuarioRegistro) {
        this.idProProv = idProProv;
        this.idProducto = idProducto;
        this.idProveedor = idProveedor;
        PrecioCompra = precioCompra;
        PrecioVenta = precioVenta;
        FechaInicio = fechaInicio;
        FechaFin = fechaFin;
        Estado = estado;
        PrecVentaMinimo = precVentaMinimo;
        FechaRegistro = fechaRegistro;
        UsuarioRegistro = usuarioRegistro;
    }

    public Integer getIdProProv() {
        return idProProv;
    }

    public void setIdProProv(Integer idProProv) {
        this.idProProv = idProProv;
    }

    public EProducto getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(EProducto idProducto) {
        this.idProducto = idProducto;
    }

    public EProveedor getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(EProveedor idProveedor) {
        this.idProveedor = idProveedor;
    }

    public Double getPrecioCompra() {
        return PrecioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        PrecioCompra = precioCompra;
    }

    public Double getPrecioVenta() {
        return PrecioVenta;
    }

    public void setPrecioVenta(Double precioVenta) {
        PrecioVenta = precioVenta;
    }

    public String getFechaInicio() {
        return FechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        FechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return FechaFin;
    }

    public void setFechaFin(String fechaFin) {
        FechaFin = fechaFin;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

    public Double getPrecVentaMinimo() {
        return PrecVentaMinimo;
    }

    public void setPrecVentaMinimo(Double precVentaMinimo) {
        PrecVentaMinimo = precVentaMinimo;
    }

    public String getFechaRegistro() {
        return FechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        FechaRegistro = fechaRegistro;
    }

    public String getUsuarioRegistro() {
        return UsuarioRegistro;
    }

    public void setUsuarioRegistro(String usuarioRegistro) {
        UsuarioRegistro = usuarioRegistro;
    }
}
