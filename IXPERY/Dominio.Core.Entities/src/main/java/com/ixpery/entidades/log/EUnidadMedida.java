package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EUnidadMedida {
    @SerializedName("461391")
    private Integer idumedida;
    @SerializedName("461392")
    private String nomumedida;

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

    public EUnidadMedida(Integer idumedida, String nomumedida) {
        this.idumedida = idumedida;
        this.nomumedida = nomumedida;
    }
}
