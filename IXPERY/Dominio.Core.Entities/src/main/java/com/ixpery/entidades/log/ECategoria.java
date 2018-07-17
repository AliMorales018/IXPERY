package com.ixpery.entidades.log;

import com.google.gson.annotations.SerializedName;

public class ECategoria {
    @SerializedName("459201")
    private Integer idcategoria;
    @SerializedName("459202")
    private String nomcategoria;
    @SerializedName("459203")
    private EFamilia idfamilia;

    public ECategoria() {
    }

    public ECategoria(Integer idcategoria) {
        this.idcategoria = idcategoria;
    }

    public Integer getIdcategoria() {
        return idcategoria;
    }

    public void setIdcategoria(Integer idcategoria) {
        this.idcategoria = idcategoria;
    }

    public String getNomcategoria() {
        return nomcategoria;
    }

    public void setNomcategoria(String nomcategoria) {
        this.nomcategoria = nomcategoria;
    }

    public EFamilia getIdfamilia() {
        return idfamilia;
    }

    public void setIdfamilia(EFamilia idfamilia) {
        this.idfamilia = idfamilia;
    }
}
