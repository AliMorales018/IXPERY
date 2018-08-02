package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import com.ixpery.entidades.rhh.ECargoLaboral;

public class EPersonalTransito {
    @SerializedName("461821")
    private Integer idperstran;

    @SerializedName("461822")
    private EServicio idservicio;

    @SerializedName("461823")
    private String cargolaboral;

    @SerializedName("461824")
    private Integer cantidad;

    @SerializedName("461825")
    private Integer horas;

    @SerializedName("461826")
    private Double subtotal;

    @SerializedName("461827")
    private Double total;

    @SerializedName("461828")
    private String fecharegistro;

    @SerializedName("461829")
    private String userregistro;

    @SerializedName("4618210")
    private ECargoLaboral idcargo;

    public EPersonalTransito() {
    }

    public EPersonalTransito(Integer idperstran) {
        this.idperstran = idperstran;
    }

    public Integer getIdperstran() {
        return idperstran;
    }

    public void setIdperstran(Integer idperstran) {
        this.idperstran = idperstran;
    }

    public EServicio getIdservicio() {
        return idservicio;
    }

    public void setIdservicio(EServicio idservicio) {
        this.idservicio = idservicio;
    }

    public String getCargolaboral() {
        return cargolaboral;
    }

    public void setCargolaboral(String cargolaboral) {
        this.cargolaboral = cargolaboral;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Integer getHoras() {
        return horas;
    }

    public void setHoras(Integer horas) {
        this.horas = horas;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getFecharegistro() {
        return fecharegistro;
    }

    public void setFecharegistro(String fecharegistro) {
        this.fecharegistro = fecharegistro;
    }

    public String getUserregistro() {
        return userregistro;
    }

    public void setUserregistro(String userregistro) {
        this.userregistro = userregistro;
    }

    public ECargoLaboral getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(ECargoLaboral idcargo) {
        this.idcargo = idcargo;
    }
}
