package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class EEmpresa {
    @SerializedName("460091")
    private Integer idempresa;
    @SerializedName("460092")
    private EProveedor idproveedor;
    @SerializedName("460093")
    private String ruc;
    @SerializedName("460094")
    private String nomempresa;
    @SerializedName("460095")
    private String direccion;
    @SerializedName("460096")
    private String correo;
    @SerializedName("460097")
    private String telefono;
    @SerializedName("460098")
    private String nomcomercial;
    @SerializedName("460099")
    private String dirfiscal;
    @SerializedName("4600910")
    private String estado;
    @SerializedName("4600911")
    private String codigopostal;
    @SerializedName("4600912")
    private String descripcion;
    @SerializedName("4600913")
    private String referencia;
    @SerializedName("4600914")
    private EUbigeo idubigeo;
    @SerializedName("4600915")
    private String rubro;
    @SerializedName("4600916")
    private String sitioweb;
    @SerializedName("4600917")
    private String logo;
    @SerializedName("4600918")
    private Integer idestado;
    @SerializedName("4600919")
    private String nomsituacion;
    @SerializedName("4600920")
    private ECliente idcliente;
    @SerializedName("4600921")
    private String frpr;
    @SerializedName("4600922")
    private String userregistro;
    @SerializedName("4600923")
    private String empleador;
    @SerializedName("4600924")
    private String empleadopr;
    @SerializedName("4600925")
    private String frr;
    public EEmpresa() {
    }

    public EEmpresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public Integer getIdempresa() {
        return idempresa;
    }

    public void setIdempresa(Integer idempresa) {
        this.idempresa = idempresa;
    }

    public EProveedor getIdproveedor() {
        return idproveedor;
    }

    public void setIdproveedor(EProveedor idproveedor) {
        this.idproveedor = idproveedor;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getNomempresa() {
        return nomempresa;
    }

    public void setNomempresa(String nomempresa) {
        this.nomempresa = nomempresa;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getNomcomercial() {
        return nomcomercial;
    }

    public void setNomcomercial(String nomcomercial) {
        this.nomcomercial = nomcomercial;
    }

    public String getDirfiscal() {
        return dirfiscal;
    }

    public void setDirfiscal(String dirfiscal) {
        this.dirfiscal = dirfiscal;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCodigopostal() {
        return codigopostal;
    }

    public void setCodigopostal(String codigopostal) {
        this.codigopostal = codigopostal;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public EUbigeo getIdubigeo() {
        return idubigeo;
    }

    public void setIdubigeo(EUbigeo idubigeo) {
        this.idubigeo = idubigeo;
    }

    public String getRubro() {
        return rubro;
    }

    public void setRubro(String rubro) {
        this.rubro = rubro;
    }

    public String getSitioweb() {
        return sitioweb;
    }

    public void setSitioweb(String sitioweb) {
        this.sitioweb = sitioweb;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Integer getIdestado() {
        return idestado;
    }

    public void setIdestado(Integer idestado) {
        this.idestado = idestado;
    }

    public String getNomsituacion() {
        return nomsituacion;
    }

    public void setNomsituacion(String nomsituacion) {
        this.nomsituacion = nomsituacion;
    }

    public ECliente getIdcliente() {
        return idcliente;
    }

    public void setIdcliente(ECliente idcliente) {
        this.idcliente = idcliente;
    }

    public String getFrpr() {
        return frpr;
    }

    public void setFrpr(String frpr) {
        this.frpr = frpr;
    }

    public String getUserregistro() {
        return userregistro;
    }

    public void setUserregistro(String userregistro) {
        this.userregistro = userregistro;
    }

    public String getEmpleador() {
        return empleador;
    }

    public void setEmpleador(String empleador) {
        this.empleador = empleador;
    }

    public String getEmpleadopr() {
        return empleadopr;
    }

    public void setEmpleadopr(String empleadopr) {
        this.empleadopr = empleadopr;
    }

    public String getFrr() {
        return frr;
    }

    public void setFrr(String frr) {
        this.frr = frr;
    }

    public EEmpresa(Integer idempresa, EProveedor idproveedor, String ruc, String nomempresa, String direccion, String correo, String telefono, String nomcomercial, String dirfiscal, String estado, String codigopostal, String descripcion, String referencia, EUbigeo idubigeo, String rubro, String sitioweb, String logo, Integer idestado, String nomsituacion, ECliente idcliente, String frpr, String userregistro, String empleador, String empleadopr, String frr) {
        this.idempresa = idempresa;
        this.idproveedor = idproveedor;
        this.ruc = ruc;
        this.nomempresa = nomempresa;
        this.direccion = direccion;
        this.correo = correo;
        this.telefono = telefono;
        this.nomcomercial = nomcomercial;
        this.dirfiscal = dirfiscal;
        this.estado = estado;
        this.codigopostal = codigopostal;
        this.descripcion = descripcion;
        this.referencia = referencia;
        this.idubigeo = idubigeo;
        this.rubro = rubro;
        this.sitioweb = sitioweb;
        this.logo = logo;
        this.idestado = idestado;
        this.nomsituacion = nomsituacion;
        this.idcliente = idcliente;
        this.frpr = frpr;
        this.userregistro = userregistro;
        this.empleador = empleador;
        this.empleadopr = empleadopr;
        this.frr = frr;
    }
}