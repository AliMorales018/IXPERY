package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EUbigeo {
    @SerializedName("459851")
    private String idubigeo;
    @SerializedName("459852")
    private String nomubigeo;
    @SerializedName("459853")
    private EProvincia idprovincia;

    public EUbigeo() {

    }

    public EUbigeo(String idubigeo) {
        this.idubigeo = idubigeo;
    }

    public String getIdubigeo() {
        return idubigeo;
    }

    public void setIdubigeo(String idubigeo) {
        this.idubigeo = idubigeo;
    }

    public String getNomubigeo() {
        return nomubigeo;
    }

    public void setNomubigeo(String nomubigeo) {
        this.nomubigeo = nomubigeo;
    }

    public EProvincia getIdprovincia() {
        return idprovincia;
    }

    public void setIdprovincia(EProvincia idprovincia) {
        this.idprovincia = idprovincia;
    }

}
