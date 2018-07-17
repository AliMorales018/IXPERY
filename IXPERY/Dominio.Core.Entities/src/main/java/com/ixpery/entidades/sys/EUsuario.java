package com.ixpery.entidades.sys;

import com.google.gson.annotations.SerializedName;

public class EUsuario {
    @SerializedName("164001")
    private Integer iduser;

    @SerializedName("164002")
    private String login;

    @SerializedName("164003")
    private String nombres;

    @SerializedName("164004")
    private String paterno;

    @SerializedName("164005")
    private String materno;

    @SerializedName("164006")
    private String estado;

    @SerializedName("164007")
    private String clave;

    @SerializedName("164008")
    private Integer idpersonal;
    //private EEmpleado idpersonal;

    @SerializedName("164009")
    private String correo;

    public EUsuario() {
    }

    public EUsuario(Integer iduser) {
        this.iduser = iduser;
    }

    public EUsuario(String login, String clave) {
        this.login = login;
        this.clave = clave;
    }

    public Integer getIduser() {
        return iduser;
    }

    public void setIduser(Integer iduser) {
        this.iduser = iduser;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getPaterno() {
        return paterno;
    }

    public void setPaterno(String paterno) {
        this.paterno = paterno;
    }

    public String getMaterno() {
        return materno;
    }

    public void setMaterno(String materno) {
        this.materno = materno;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getClave() {
        return clave;
    }

    public void setClave(String clave) {
        this.clave = clave;
    }

    public Integer getIdpersonal() {
        return idpersonal;
    }

    public void setIdpersonal(Integer idpersonal) {
        this.idpersonal = idpersonal;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public EUsuario(Integer iduser, String login, String nombres, String paterno, String materno, String estado, String clave, Integer idpersonal, String correo) {
        this.iduser = iduser;
        this.login = login;
        this.nombres = nombres;
        this.paterno = paterno;
        this.materno = materno;
        this.estado = estado;
        this.clave = clave;
        this.idpersonal = idpersonal;
        this.correo = correo;
    }
}
