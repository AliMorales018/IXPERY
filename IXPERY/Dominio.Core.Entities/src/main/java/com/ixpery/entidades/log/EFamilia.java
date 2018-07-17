package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EFamilia {
    @SerializedName("459151")
    private Integer idfamilia;
    @SerializedName("459152")
    private String nomfamilia;

    public EFamilia() {
    }

    public Integer getIdfamilia() {
        return idfamilia;
    }

    public void setIdfamilia(Integer idfamilia) {
        this.idfamilia = idfamilia;
    }

    public String getNomfamilia() {
        return nomfamilia;
    }

    public void setNomfamilia(String nomfamilia) {
        this.nomfamilia = nomfamilia;
    }
}
