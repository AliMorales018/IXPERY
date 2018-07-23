package com.ixpery.entidades.rhh;

import com.google.gson.annotations.SerializedName;

public class ECargoLaboral {

    @SerializedName("462071")
    private Integer idcargo;

    @SerializedName("462072")
    private EArea idarea;

    @SerializedName("462073")
    private String nomcargo;

    @SerializedName("462074")
    private Double salario;

    @SerializedName("462075")
    private String estado;

    @SerializedName("462076")
    private Integer idestado;

    @SerializedName("462077")
    private String fecharegistro;

    @SerializedName("462078")
    private String userregistro;

    public ECargoLaboral() {
    }

    public ECargoLaboral(Integer idcargo) {
        this.idcargo = idcargo;
    }

    public Integer getIdcargo() {
        return idcargo;
    }

    public void setIdcargo(Integer idcargo) {
        this.idcargo = idcargo;
    }

    public EArea getIdarea() {
        return idarea;
    }

    public void setIdarea(EArea idarea) {
        this.idarea = idarea;
    }

    public String getNomcargo() {
        return nomcargo;
    }

    public void setNomcargo(String nomcargo) {
        this.nomcargo = nomcargo;
    }

    public Double getSalario() {
        return salario;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getIdestado() {
        return idestado;
    }

    public void setIdestado(Integer idestado) {
        this.idestado = idestado;
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
}
