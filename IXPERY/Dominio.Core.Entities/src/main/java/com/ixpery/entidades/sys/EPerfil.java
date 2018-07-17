package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EPerfil {
    @SerializedName("164031")
    private Integer idperfil;

    @SerializedName("164032")
    //private EAplicacion idapli;
    private Integer idapli;

    @SerializedName("164033")
    private String perfil;

    @SerializedName("164034")
    private String estado;

    @SerializedName("164035")
    private String fechacreacion;

    @SerializedName("164036")
    private String usuariocreacion;

    @SerializedName("164037")
    private String fechamodificacion;

    @SerializedName("164038")
    private String usuariomodificacion;

    public EPerfil() {
    }

    public Integer getIdperfil() {
        return idperfil;
    }

    public void setIdperfil(Integer idperfil) {
        this.idperfil = idperfil;
    }

    public Integer getIdapli() {
        return idapli;
    }

    public void setIdapli(Integer idapli) {
        this.idapli = idapli;
    }

    public String getPerfil() {
        return perfil;
    }

    public void setPerfil(String perfil) {
        this.perfil = perfil;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
    public String getFechacreacion() {
        return fechacreacion;
    }

    public void setFechacreacion(String fechacreacion) {
        this.fechacreacion = fechacreacion;
    }

    public String getUsuariocreacion() {
        return usuariocreacion;
    }

    public void setUsuariocreacion(String usuariocreacion) {
        this.usuariocreacion = usuariocreacion;
    }

    public String getFechamodificacion() {
        return fechamodificacion;
    }

    public void setFechamodificacion(String fechamodificacion) {
        this.fechamodificacion = fechamodificacion;
    }

    public String getUsuariomodificacion() {
        return usuariomodificacion;
    }

    public void setUsuariomodificacion(String usuariomodificacion) {
        this.usuariomodificacion = usuariomodificacion;
    }

    public EPerfil(Integer idperfil, Integer idapli, String perfil, String estado, String fechacreacion, String usuariocreacion, String fechamodificacion, String usuariomodificacion) {
        this.idperfil = idperfil;
        this.idapli = idapli;
        this.perfil = perfil;
        this.estado = estado;
        this.fechacreacion = fechacreacion;
        this.usuariocreacion = usuariocreacion;
        this.fechamodificacion = fechamodificacion;
        this.usuariomodificacion = usuariomodificacion;

    }
}