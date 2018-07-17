package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

import java.sql.Timestamp;

public class EProductoSolucion {
    @SerializedName("467281")
    private Integer idProductoSolucion;

    @SerializedName("467282")
    private EEquipo idEquipo;

    @SerializedName("467283")
    private EProductoProveedor idProdProv;

    @SerializedName("467284")
    private Integer cantidad;

    @SerializedName("467285")
    private Integer preciounit;

    @SerializedName("467286")
    private Integer total;

    @SerializedName("467287")
    private Integer subtotal;

    @SerializedName("467288")
    private Integer estado;

    @SerializedName("467289")
    private Timestamp fechaReg;

    @SerializedName("4672810")
    private String userReg;

    @SerializedName("4672811")
    private Integer idProducto;

    @SerializedName("4672812")
    private Integer envCotizar;

    @SerializedName("4672813")
    private Integer cotizado;

    @SerializedName("4672814")
    private Integer idprereg;

    @SerializedName("4672815")
    private Integer fchsolucion;

    public EProductoSolucion() {
    }

    public EProductoSolucion(Integer idProductoSolucion) {
        this.idProductoSolucion = idProductoSolucion;
    }

    public EProductoSolucion(Integer idProductoSolucion, EEquipo idEquipo, Integer cantidad, Integer estado, Timestamp fechaReg, String userReg, Integer idProducto, Integer envCotizar) {
        this.idProductoSolucion = idProductoSolucion;
        this.idEquipo = idEquipo;
        this.cantidad = cantidad;
        this.estado = estado;
        this.fechaReg = fechaReg;
        this.userReg = userReg;
        this.idProducto = idProducto;
        this.envCotizar = envCotizar;
    }

    public Integer getIdProductoSolucion() {
        return idProductoSolucion;
    }

    public void setIdProductoSolucion(Integer idProductoSolucion) {
        this.idProductoSolucion = idProductoSolucion;
    }

    public EEquipo getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(EEquipo idEquipo) {
        this.idEquipo = idEquipo;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public Timestamp getFechaReg() {
        return fechaReg;
    }

    public void setFechaReg(Timestamp fechaReg) {
        this.fechaReg = fechaReg;
    }

    public String getUserReg() {
        return userReg;
    }

    public void setUserReg(String userReg) {
        this.userReg = userReg;
    }

    public Integer getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(Integer idProducto) {
        this.idProducto = idProducto;
    }

    public Integer getEnvCotizar() {
        return envCotizar;
    }

    public void setEnvCotizar(Integer envCotizar) {
        this.envCotizar = envCotizar;
    }
}
