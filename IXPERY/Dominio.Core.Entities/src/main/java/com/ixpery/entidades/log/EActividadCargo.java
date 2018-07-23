package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import com.ixpery.entidades.rhh.ECargoLaboral;

public class EActividadCargo {

    @SerializedName("560631")
    private EActividad idactividad;

    @SerializedName("560632")
    private ECargoLaboral idcargo;

    @SerializedName("560633")
    private Integer cantidad;

    @SerializedName("560634")
    private Integer horas;

    @SerializedName("560635")
    private Double subtotallaboral;

    @SerializedName("560636")
    private Double totallaboral;

    public EActividadCargo() {
    }

    public EActividadCargo(EActividad idactividad) {
        this.idactividad = idactividad;
    }

    public EActividad getIdactividad() {
        return idactividad;
    }

    public void setIdactividad(EActividad idactividad) {
        this.idactividad = idactividad;
    }

    public ECargoLaboral getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(ECargoLaboral idcargo) {
        this.idcargo = idcargo;
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

    public Double getSubtotallaboral() {
        return subtotallaboral;
    }

    public void setSubtotallaboral(Double subtotallaboral) {
        this.subtotallaboral = subtotallaboral;
    }

    public Double getTotallaboral() {
        return totallaboral;
    }

    public void setTotallaboral(Double totallaboral) {
        this.totallaboral = totallaboral;
    }
}
