package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;
import java.util.Date;
public class EContactoEmpresa {
    @SerializedName("460381")
    private Integer idcontacto;

    @SerializedName("460382")
    private EEmpresa idempresa;

    @SerializedName("460383")
    private String nomcontacto;

    @SerializedName("460384")
    private String apellpaterno;

    @SerializedName("460385")
    private String apellmaterno;

    @SerializedName("460386")
    private String direccion;

    @SerializedName("460387")
    private String telefono;

    @SerializedName("460388")
    private String estado;

    @SerializedName("460389")
    private String ciudad;

    @SerializedName("4603810")
    private String cargo;

    @SerializedName("4603811")
    private String dni;

    @SerializedName("4603812")
    private String correo;

    @SerializedName("4603813")
    private Date fecharegistro;

    @SerializedName("4603814")
    private String userregistro;

    public EContactoEmpresa() {
    }

    public EContactoEmpresa(Integer idcontacto) {
        this.idcontacto = idcontacto;
    }

    public Integer getIdcontacto() {
        return idcontacto;
    }
    public void setIdcontacto(Integer idcontacto) {
        this.idcontacto = idcontacto;
    }

    public EEmpresa getIdempresa() {
        return idempresa;
    }
    public void setIdempresa(EEmpresa idempresa) {
        this.idempresa = idempresa;
    }

    public String getNomcontacto() {
        return nomcontacto;
    }
    public void setNomcontacto(String nomcontacto) {
        this.nomcontacto = nomcontacto;
    }

    public String getApellpaterno() {
        return apellpaterno;
    }
    public void setApellpaterno(String apellpaterno) {
        this.apellpaterno = apellpaterno;
    }

    public String getApellmaterno() {
        return apellmaterno;
    }
    public void setApellmaterno(String apellmaterno) {
        this.apellmaterno = apellmaterno;
    }

    public String getDireccion() {
        return direccion;
    }
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getDni() {
        return dni;
    }
    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Date getFecharegistro() {
        return fecharegistro;
    }
    public void setFecharegistro(Date fecharegistro) {
        this.fecharegistro = fecharegistro;
    }

    public String getUserregistro() {
        return userregistro;
    }
    public void setUserregistro(String userregistro) {
        this.userregistro = userregistro;
    }

    public EContactoEmpresa(Integer idcontacto, EEmpresa idempresa, String nomcontacto,
                            String apellpaterno, String apellmaterno, String direccion,
                            String telefono, String estado, String ciudad, String cargo,
                            String dni, String correo, Date fecharegistro, String userregistro) {

        this.idcontacto = idcontacto;
        this.idempresa = idempresa;
        this.nomcontacto = nomcontacto;
        this.apellpaterno = apellpaterno;
        this.apellmaterno = apellmaterno;
        this.direccion = direccion;
        this.telefono = telefono;
        this.estado = estado;
        this.ciudad = ciudad;
        this.cargo = cargo;
        this.dni = dni;
        this.correo = correo;
        this.fecharegistro = fecharegistro;
        this.userregistro = userregistro;
    }
}
