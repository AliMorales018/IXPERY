package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EServicio {

    @SerializedName("461621")
    private Integer idservicio;

    @SerializedName("461622")
    private ESolucion idsolucion;

    @SerializedName("461623")
    private String nomservicio;

    @SerializedName("461624")
    private Double subtotal;

    @SerializedName("461625")
    private Integer numcuadrillas;

    @SerializedName("461626")
    private Double unitactividad;

    @SerializedName("461627")
    private Integer porcentdepreciacion;

    @SerializedName("461628")
    private Double aumento;

    @SerializedName("461629")
    private Double total;

    @SerializedName("4616210")
    private String estado;

    @SerializedName("4616211")
    private Integer idestado;

    @SerializedName("4616212")
    private String fecharegistro;

    @SerializedName("4616213")
    private String userregistro;

    public EServicio() {
    }

    public EServicio(Integer idservicio) {
        this.idservicio = idservicio;
    }

    public Integer getIdservicio() {
        return idservicio;
    }

    public void setIdservicio(Integer idservicio) {
        this.idservicio = idservicio;
    }

    public ESolucion getIdsolucion() {
        return idsolucion;
    }

    public void setIdsolucion(ESolucion idsolucion) {
        this.idsolucion = idsolucion;
    }

    public String getNomservicio() {
        return nomservicio;
    }

    public void setNomservicio(String nomservicio) {
        this.nomservicio = nomservicio;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Integer getNumcuadrillas() {
        return numcuadrillas;
    }

    public void setNumcuadrillas(Integer numcuadrillas) {
        this.numcuadrillas = numcuadrillas;
    }

    public Double getUnitactividad() {
        return unitactividad;
    }

    public void setUnitactividad(Double unitactividad) {
        this.unitactividad = unitactividad;
    }

    public Integer getPorcentdepreciacion() {
        return porcentdepreciacion;
    }

    public void setPorcentdepreciacion(Integer porcentdepreciacion) {
        this.porcentdepreciacion = porcentdepreciacion;
    }

    public Double getAumento() {
        return aumento;
    }

    public void setAumento(Double aumento) {
        this.aumento = aumento;
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
}
