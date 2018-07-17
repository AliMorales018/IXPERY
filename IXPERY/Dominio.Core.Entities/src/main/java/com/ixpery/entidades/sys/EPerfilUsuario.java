package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EPerfilUsuario {
    @SerializedName("164111")
    private EUsuario iduser;

    @SerializedName("164112")
    private EPerfil idperfil;

    @SerializedName("164113")
    private Boolean estado;

    public EUsuario getIduser() {
        return iduser;
    }

    public void setIduser(EUsuario iduser) {
        this.iduser = iduser;
    }

    public EPerfil getIdperfil() {
        return idperfil;
    }

    public void setIdperfil(EPerfil idperfil) {
        this.idperfil = idperfil;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public EPerfilUsuario() {
    }

    public EPerfilUsuario(EUsuario iduser, EPerfil idperfil, Boolean estado) {
        this.iduser = iduser;
        this.idperfil = idperfil;
        this.estado = estado;
    }
}
