package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EProvincia {
    @SerializedName("459751")
    private String idprovincia;
    @SerializedName("459752")
    private String nomprovincia;
    @SerializedName("459753")
    private EDepartamento iddepartamento;

    public String getIdprovincia() {
        return idprovincia;
    }

    public void setIdprovincia(String idprovincia) {
        this.idprovincia = idprovincia;
    }

    public String getNomprovincia() {
        return nomprovincia;
    }

    public void setNomprovincia(String nomprovincia) {
        this.nomprovincia = nomprovincia;
    }

    public EDepartamento getIddepartamento() {
        return iddepartamento;
    }

    public void setIddepartamento(EDepartamento iddepartamento) {
        this.iddepartamento = iddepartamento;
    }

}
