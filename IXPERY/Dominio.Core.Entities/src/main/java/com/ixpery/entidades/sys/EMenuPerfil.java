package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EMenuPerfil {
    @SerializedName("173811")
    private EMenu idmenu;

    @SerializedName("173812")
    private EPerfil idperfil;

    @SerializedName("173813")
    private Boolean visible;

    @SerializedName("173814")
    private Boolean estado;

    public EMenu getIdmenu() {
        return idmenu;
    }

    public void setIdmenu(EMenu idmenu) {
        this.idmenu = idmenu;
    }

    public EPerfil getIdperfil() {
        return idperfil;
    }

    public void setIdperfil(EPerfil idperfil) {
        this.idperfil = idperfil;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public EMenuPerfil(EMenu idmenu, EPerfil idperfil, Boolean visible,
                       Boolean estado) {

        this.idmenu = idmenu;
        this.idperfil = idperfil;
        this.visible = visible;
        this.estado = estado;
    }
}
