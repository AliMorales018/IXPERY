package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EEstado{
    @SerializedName("461141")
    private Integer idestado;
    @SerializedName("461142")
    private String nomestado;
    @SerializedName("461143")
    private String nomtabla;
    @SerializedName("461144")
    private String estado;
    @SerializedName("461145")
    private String cod;
    @SerializedName("461146")
    private String ckeck;
    @SerializedName("461147")
    private String combo;

    public EEstado() {
    }

    public Integer getIdestado() {
        return idestado;
    }

    public void setIdestado(Integer idestado) {
        this.idestado = idestado;
    }

    public String getNomestado() {
        return nomestado;
    }

    public void setNomestado(String nomestado) {
        this.nomestado = nomestado;
    }

    public String getNomtabla() {
        return nomtabla;
    }

    public void setNomtabla(String nomtabla) {
        this.nomtabla = nomtabla;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCod() {
        return cod;
    }

    public void setCod(String cod) {
        this.cod = cod;
    }

    public String getCkeck() {
        return ckeck;
    }

    public void setCkeck(String ckeck) {
        this.ckeck = ckeck;
    }

    public String getCombo() {
        return combo;
    }

    public void setCombo(String combo) {
        this.combo = combo;
    }
}
