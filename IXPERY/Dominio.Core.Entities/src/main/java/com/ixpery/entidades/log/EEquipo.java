package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EEquipo {
    @SerializedName("467021")
    private Integer idEquipo;

    @SerializedName("467022")
    private ESolucion idSolucion;

    @SerializedName("467023")
    private String nomEquipo;

    @SerializedName("467024")
    private String total;

    @SerializedName("467025")
    private String totalMostrar;

    @SerializedName("467026")
    private Integer estado;

    @SerializedName("467027")
    private String idEstado;

    @SerializedName("467028")
    private String fechaReg;

    @SerializedName("467029")
    private String userReg;

    public Integer getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(Integer idEquipo) {
        this.idEquipo = idEquipo;
    }

    public ESolucion getIdSolucion() {
        return idSolucion;
    }

    public void setIdSolucion(ESolucion idSolucion) {
        this.idSolucion = idSolucion;
    }

    public String getNomEquipo() {
        return nomEquipo;
    }

    public void setNomEquipo(String nomEquipo) {
        this.nomEquipo = nomEquipo;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getTotalMostrar() {
        return totalMostrar;
    }

    public void setTotalMostrar(String totalMostrar) {
        this.totalMostrar = totalMostrar;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public String getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(String idEstado) {
        this.idEstado = idEstado;
    }

    public String getFechaReg() {
        return fechaReg;
    }

    public void setFechaReg(String fechaReg) {
        this.fechaReg = fechaReg;
    }

    public String getUserReg() {
        return userReg;
    }

    public void setUserReg(String userReg) {
        this.userReg = userReg;
    }

    public EEquipo() {
    }

    public EEquipo(Integer idEquipo) {
        this.idEquipo = idEquipo;
    }

    public EEquipo(Integer idEquipo, ESolucion idSolucion, String nomEquipo, String total, String totalMostrar, Integer estado, String idEstado, String fechaReg, String userReg) {
        this.idEquipo = idEquipo;
        this.idSolucion = idSolucion;
        this.nomEquipo = nomEquipo;
        this.total = total;
        this.totalMostrar = totalMostrar;
        this.estado = estado;
        this.idEstado = idEstado;
        this.fechaReg = fechaReg;
        this.userReg = userReg;
    }
}
