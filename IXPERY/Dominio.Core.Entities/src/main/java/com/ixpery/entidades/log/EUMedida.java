package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EUMedida {
    @SerializedName("461391")
    private Integer idumedida;
    @SerializedName("461392")
    private String nomumedida;

    public EUMedida() {
    }

    public EUMedida(Integer idumedida) {
        this.idumedida = idumedida;
    }

    public Integer getIdumedida() {
        return idumedida;
    }

    public void setIdumedida(Integer idumedida) {
        this.idumedida = idumedida;
    }

    public String getNomumedida() {
        return nomumedida;
    }

    public void setNomumedida(String nomumedida) {
        this.nomumedida = nomumedida;
    }

}
