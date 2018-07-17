package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EProveedor {
    @SerializedName("459951")
    private Integer idproveedor;

    @SerializedName("459952")
    private Integer totalventas;

    @SerializedName("459953")
    private Integer cantpy;

    public EProveedor() {
    }

    public Integer getIdproveedor() {
        return idproveedor;
    }

    public void setIdproveedor(Integer idproveedor) {
        this.idproveedor = idproveedor;
    }

    public Integer getTotalventas() {
        return totalventas;
    }

    public void setTotalventas(Integer totalventas) {
        this.totalventas = totalventas;
    }

    public Integer getCantpy() {
        return cantpy;
    }

    public void setCantpy(Integer cantpy) {
        this.cantpy = cantpy;
    }

    public EProveedor(Integer idproveedor) {
        this.idproveedor = idproveedor;
    }

    public EProveedor(Integer idproveedor, Integer totalventas, Integer cantpy) {
        this.idproveedor = idproveedor;
        this.totalventas = totalventas;
        this.cantpy = cantpy;
    }
}
