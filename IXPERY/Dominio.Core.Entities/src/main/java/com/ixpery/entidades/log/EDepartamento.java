package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EDepartamento {
    @SerializedName("459701")
    private String iddepartamento;
    @SerializedName("459702")
    private String nomdepartamento;

    public EDepartamento() {
    }

    public String getIddepartamento() {
        return iddepartamento;
    }

    public void setIddepartamento(String iddepartamento) {
        this.iddepartamento = iddepartamento;
    }

    public String getNomdepartamento() {
        return nomdepartamento;
    }

    public void setNomdepartamento(String nomdepartamento) {
        this.nomdepartamento = nomdepartamento;
    }

    public EDepartamento(String iddepartamento, String nomdepartamento) {
        this.iddepartamento = iddepartamento;
        this.nomdepartamento = nomdepartamento;
    }

}
