package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class ECliente {
    @SerializedName("459651")
    private Integer idcliente;
    @SerializedName("459652")
    private Integer totalcompras;
    @SerializedName("459653")
    private Integer cantpy;
    public ECliente() {
    }

    public ECliente(Integer idcliente) {
        this.idcliente = idcliente;
    }

    public Integer getIdcliente() {
        return idcliente;
    }

    public void setIdcliente(Integer idcliente) {
        this.idcliente = idcliente;
    }

    public Integer getTotalcompras() {
        return totalcompras;
    }

    public void setTotalcompras(Integer totalcompras) {
        this.totalcompras = totalcompras;
    }

    public Integer getCantpy() {
        return cantpy;
    }

    public void setCantpy(Integer cantpy) {
        this.cantpy = cantpy;
    }

}
