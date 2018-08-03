package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EServiciosSolicitados {
    @SerializedName("467711")
    private Integer idservsol;

    @SerializedName("467712")
    private Integer idestado;

    @SerializedName("467713")
    private String servsolicitado;

    @SerializedName("467714")
    private String estado;

    @SerializedName("467715")
    private String fecharegistro;

    @SerializedName("467716")
    private String userregistro;

    public EServiciosSolicitados() {
    }

    public EServiciosSolicitados(Integer idservsol) {
        this.idservsol = idservsol;
    }

    public EServiciosSolicitados(Integer idservsol, Integer idestado, String servsolicitado, String estado, String fecharegistro, String userregistro) {
        this.idservsol = idservsol;
        this.idestado = idestado;
        this.servsolicitado = servsolicitado;
        this.estado = estado;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
    }

    public Integer getIdservsol() {
        return idservsol;
    }

    public void setIdservsol(Integer idservsol) {
        this.idservsol = idservsol;
    }

    public Integer getIdestado() {
        return idestado;
    }

    public void setIdestado(Integer idestado) {
        this.idestado = idestado;
    }

    public String getServsolicitado() {
        return servsolicitado;
    }

    public void setServsolicitado(String servsolicitado) {
        this.servsolicitado = servsolicitado;
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
}
