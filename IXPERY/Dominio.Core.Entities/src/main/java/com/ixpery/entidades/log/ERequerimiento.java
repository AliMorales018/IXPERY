package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import java.util.Date;

public class ERequerimiento {
    @SerializedName("460611")
    private Integer idrequerimiento;

    @SerializedName("460612")
    private EProyecto idproyecto;

    @SerializedName("460613")
    private String nomrequerimiento;

    @SerializedName("460614")
    private String nivel;

    @SerializedName("460615")
    private String estado;

    @SerializedName("460616")
    private Integer idestado;

    @SerializedName("460617")
    private Date  fecharegistro;

    @SerializedName("460618")
    private String userregistro;

    public ERequerimiento() {
    }

    public Integer getIdrequerimiento() {
        return idrequerimiento;
    }

    public void setIdrequerimiento(Integer idrequerimiento) {
        this.idrequerimiento = idrequerimiento;
    }

    public EProyecto getIdproyecto() {
        return idproyecto;
    }

    public void setIdproyecto(EProyecto idproyecto) {
        this.idproyecto = idproyecto;
    }

    public String getNomrequerimiento() {
        return nomrequerimiento;
    }

    public void setNomrequerimiento(String nomrequerimiento) {
        this.nomrequerimiento = nomrequerimiento;
    }

    public String getNivel() {
        return nivel;
    }

    public void setNivel(String nivel) {
        this.nivel = nivel;
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

    public ERequerimiento(Integer idrequerimiento, EProyecto idproyecto, String nomrequerimiento,
                          String nivel, String estado, Integer idestado, Date fecharegistro,
                          String userregistro) {

        this.idrequerimiento = idrequerimiento;
        this.idproyecto = idproyecto;
        this.nomrequerimiento = nomrequerimiento;
        this.nivel = nivel;
        this.estado = estado;
        this.idestado = idestado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
    }

    public ERequerimiento(Integer idrequerimiento) {
        this.idrequerimiento = idrequerimiento;
    }
}
