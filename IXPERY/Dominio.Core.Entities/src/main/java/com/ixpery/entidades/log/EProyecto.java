package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import java.util.Date;

public class EProyecto {
    @SerializedName("460511")
    private Integer idProyecto;

    @SerializedName("460512")
    private EEmpresa idEmpresa;

    @SerializedName("460513")
    private String nomProyecto;

    @SerializedName("460514")
    private String jefeProyecto;

    @SerializedName("460515")
    private String fechaInicio;

    @SerializedName("460516")
    private String fechaFin;

    @SerializedName("460517")
    private String fechapFinal;

    @SerializedName("460518")
    private String tmpEstimCoti;

    @SerializedName("460519")
    private String estado;

    @SerializedName("4605110")
    private String inverEstim;

    @SerializedName("4605111")
    private String idEstado;

    @SerializedName("4605112")
    private String cantReq;

    @SerializedName("4605113")
    private String fechaReg;

    @SerializedName("4605114")
    private String userReg;

    public Integer getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(Integer idProyecto) {
        this.idProyecto = idProyecto;
    }

    public EEmpresa getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(EEmpresa idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getNomProyecto() {
        return nomProyecto;
    }

    public void setNomProyecto(String nomProyecto) {
        this.nomProyecto = nomProyecto;
    }

    public String getJefeProyecto() {
        return jefeProyecto;
    }

    public void setJefeProyecto(String jefeProyecto) {
        this.jefeProyecto = jefeProyecto;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getFechapFinal() {
        return fechapFinal;
    }

    public void setFechapFinal(String fechapFinal) {
        this.fechapFinal = fechapFinal;
    }

    public String getTmpEstimCoti() {
        return tmpEstimCoti;
    }

    public void setTmpEstimCoti(String tmpEstimCoti) {
        this.tmpEstimCoti = tmpEstimCoti;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getInverEstim() {
        return inverEstim;
    }

    public void setInverEstim(String inverEstim) {
        this.inverEstim = inverEstim;
    }

    public String getIdEstado() {
        return idEstado;
    }

    public void setIdEstado(String idEstado) {
        this.idEstado = idEstado;
    }

    public String getCantReq() {
        return cantReq;
    }

    public void setCantReq(String cantReq) {
        this.cantReq = cantReq;
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

    public EProyecto() {
    }

    public EProyecto(Integer idProyecto) {
        this.idProyecto = idProyecto;
    }

    public EProyecto(Integer idProyecto, EEmpresa idEmpresa, String nomProyecto, String jefeProyecto, String fechaInicio, String fechaFin, String fechapFinal, String tmpEstimCoti, String estado, String inverEstim, String idEstado, String cantReq, String fechaReg, String userReg) {
        this.idProyecto = idProyecto;
        this.idEmpresa = idEmpresa;
        this.nomProyecto = nomProyecto;
        this.jefeProyecto = jefeProyecto;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.fechapFinal = fechapFinal;
        this.tmpEstimCoti = tmpEstimCoti;
        this.estado = estado;
        this.inverEstim = inverEstim;
        this.idEstado = idEstado;
        this.cantReq = cantReq;
        this.fechaReg = fechaReg;
        this.userReg = userReg;
    }

}
