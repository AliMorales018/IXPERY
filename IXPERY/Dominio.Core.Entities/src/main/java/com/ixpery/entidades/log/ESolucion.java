package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import com.ixpery.entidades.log.EEstado;
import com.ixpery.entidades.log.ERequerimiento;

import java.util.Date;

public class ESolucion {
    @SerializedName("460711")
    private Integer idsolucion;

    @SerializedName("460712")
    private ERequerimiento idrequerimiento;

    @SerializedName("460713")
    private String nomsolucion;

    @SerializedName("460714")
    private String descripcion;

    @SerializedName("460715")
    private String encargadosol;

    @SerializedName("460716")
    private Date fechacreacion;

    @SerializedName("460717")
    private Date fechaenvio;

    @SerializedName("460718")
    private Float totalsolucion;

    @SerializedName("460719")
    private Float totalmostrar;

    @SerializedName("4607110")
    private String estado;

    @SerializedName("4607111")
    private Integer idestado;

    @SerializedName("4607112")
    private Date fecharegistro;

    @SerializedName("4607113")
    private String userregistro;

    public ESolucion(Integer idsolucion) {
        this.idsolucion = idsolucion;
    }

    public ESolucion() {
    }

    public Integer getIdSolucion() {
        return idsolucion;
    }

    public void setIdsolucion(Integer idsolucion) {
        this.idsolucion = idsolucion;
    }

    public ERequerimiento getIdrequerimiento() {
        return idrequerimiento;
    }

    public void setIdrequerimiento(ERequerimiento idrequerimiento) {
        this.idrequerimiento = idrequerimiento;
    }

    public String getNomsolucion() {
        return nomsolucion;
    }
    public void setNomsolucion(String nomsolucion) {
        this.nomsolucion = nomsolucion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEncargadosol() {
        return encargadosol;
    }

    public void setEncargadosol(String encargadosol) {
        this.encargadosol = encargadosol;
    }

    public Date getFechacreacion() {
        return fechacreacion;
    }

    public void setFechacreacion(Date fechacreacion) {
        this.fechacreacion = fechacreacion;
    }

    public Date getFechaenvio() {
        return fechaenvio;
    }

    public void setFechaenvio(Date fechaenvio) {
        this.fechaenvio = fechaenvio;
    }

    public Float getTotalsolucion() {
        return totalsolucion;
    }

    public void setTotalsolucion(Float totalsolucion) {
        this.totalsolucion = totalsolucion;
    }

    public Float getTotalmostrar() {
        return totalmostrar;
    }
    public void setTotalmostrar(Float totalmostrar) {
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

    public Date getFecharegistro() {
        return fecharegistro;
    }

    public void setFecharegistro(Date fecharegistro) {
        this.fecharegistro = fecharegistro;
    }

    public String getUserregistro() {
        return userregistro;
    }

    public void setUserregistro(String userregistro) {
        this.userregistro = userregistro;
    }

    public ESolucion(Integer idsolucion, ERequerimiento idrequerimiento, String nomsolucion,
                     String descripcion, String encargadosol, Date fechacreacion, Date fechaenvio,
                     Float totalsolucion, Float totalmostrar, String estado, Integer idestado,
                     Date fecharegistro, String userregistro) {

        this.idsolucion = idsolucion;
        this.idrequerimiento = idrequerimiento;
        this.nomsolucion = nomsolucion;
        this.descripcion = descripcion;
        this.encargadosol = encargadosol;
        this.fechacreacion = fechacreacion;
        this.fechaenvio = fechaenvio;
        this.totalsolucion = totalsolucion;
        this.totalmostrar = totalmostrar;
        this.estado = estado;
        this.idestado = idestado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
    }
}
