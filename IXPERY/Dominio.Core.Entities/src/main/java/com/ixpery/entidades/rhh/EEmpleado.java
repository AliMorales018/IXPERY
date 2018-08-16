package com.ixpery.entidades.rhh;

import com.google.gson.annotations.SerializedName;

public class EEmpleado {
    @SerializedName("462271")
    private Integer idempleado ;
    @SerializedName("462272")
    private EArea idarea;
    @SerializedName("462273")
    private String dni;
    @SerializedName("462274")
    private String nombre;
    @SerializedName("462275")
    private String apellidopaterno;
    @SerializedName("462276")
    private String apellidomaterno;
    @SerializedName("462277")
    private String telefono;
    @SerializedName("462278")
    private String direccion;
    @SerializedName("462279")
    private String fechanac ;
    @SerializedName("4622710")
    private String sexo;
    @SerializedName("4622711")
    private String estado;

    public EEmpleado() {
    }

    public Integer getIdempleado() {
        return idempleado;
    }

    public void setIdempleado(Integer idempleado) {
        this.idempleado = idempleado;
    }

    public EArea getIdarea() {
        return idarea;
    }

    public void setIdarea(EArea idarea) {
        this.idarea = idarea;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidopaterno() {
        return apellidopaterno;
    }

    public void setApellidopaterno(String apellidopaterno) {
        this.apellidopaterno = apellidopaterno;
    }

    public String getApellidomaterno() {
        return apellidomaterno;
    }

    public void setApellidomaterno(String apellidomaterno) {
        this.apellidomaterno = apellidomaterno;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFechanac() { return fechanac; }

    public void setFechanac(String fechanac) {
        this.fechanac = fechanac;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public EEmpleado(Integer idempleado, EArea idarea, String dni, String nombre, String apellidopaterno, String apellidomaterno, String telefono, String direccion, String fechanac, String sexo, String estado) {     this.idempleado = idempleado;
        this.idarea = idarea;
        this.dni = dni;
        this.nombre = nombre;
        this.apellidopaterno = apellidopaterno;
        this.apellidomaterno = apellidomaterno;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechanac = fechanac;
        this.sexo = sexo;
        this.estado = estado;
    }

    public EEmpleado(Integer idempleado) {
        this.idempleado = idempleado;
    }
}
