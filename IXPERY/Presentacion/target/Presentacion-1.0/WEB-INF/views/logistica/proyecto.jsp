<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<spring:url value="/resources" var="urlPublic"></spring:url>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Proyecto</title>
    <link rel="stylesheet" href="${urlPublic}/css/styles.css">
    <link rel="stylesheet" href="${urlPublic}/css/select2.css">
    <style>
        #tbody_proyecto tr:hover {
            background-color: #E6E6E6;
        }
    </style>

</head>

<body>
<input type="hidden" id="hdn_proyecto" />
<input type="hidden" id="hdn_proyecto_isvalid"/>

<!-- Buttons -->
<div class="grid-x grid-padding-x align-center-middle l-comandos">
    <div class="cell small-12 medium-4 text-white">
        <div class="grid-x align-center-middle">
            <div class="cell large-1 text-center">
                <div class="icon-object">
                    <i class="icon icon-list2"></i>
                </div>
            </div>
            <div class="cell large-11">
                <p class="main-title">Proyecto</p>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <div class="grid-x align-center-middle">
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" class="btn btn-light" id="btn_proyecto_nue" >Nuevo</button>
                <button type="button" class="btn btn-light" id="btn_proyecto_nue_reload"  onclick="CargarJS_proyecto(0,1,1);" style="display:none">Nuevo</button>
            </div>
            <div class="cell small-4 medium-4 large-4 text-center">
                <button type="button" id="btn_proyecto_save" class="btn btn-secondary" onclick="ValidarCampos_tbl_proyecto();">Guardar</button>
            </div>
        </div>
    </div>
    <div class="cell small-12 medium-4">
        <!-- Notify -->
    </div>
</div>
<!-- End Buttons -->

<!-- Date -->
<div class="l-container-sm">
    <div class="grid-x grid-padding-x">
        <div class="cell large-12">
            <label class="text-f" id="lbl_proyecto_fecha" >${fecha}</label>
        </div>
    </div>
</div>
<!-- End Date -->




<!-- Formulario -->
<div class="l-container">
    <div class="grid-x grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary" style="line-height: 1.5">Empresa: </label>
                <select >
                    <option></option>
                </select>
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Jefe Proyecto: </label>
                <input id="txt_proyecto_jef" class="form-control" type="text" placeholder="Jefe Proyecto">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Tiempo Estimado: </label>
                <input class="form-control" type="text" placeholder="Tiempo Estimado">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Fecha Registro: </label>
                <span type="date" class="form-control">dd-mm-yyyy</span>
            </div>
        </div>
    </div>




    <div class="grid-x grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Codigo: </label>
                <input class="form-control" type="text" placeholder="Codigo">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Fecha Inicio: </label>
                <input type="date" class="form-control">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Inversion Estimada: </label>
                <input class="form-control" type="text" placeholder="Inversion Estimado">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Hora Registro: </label>
                <span type="date" class="form-control">00:00:00</span>
            </div>
        </div>
    </div>


    <div class="grid-x grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Proyecto: </label>
                <input class="form-control" type="text" placeholder="Proyecto">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Fecha Probable Final: </label>
                <input type="date" class="form-control">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group ">
                <label class="label text-primary">Requerimientos: </label>
                <input class="form-control" type="text" placeholder="Requerimientos">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Rango Fechas: </label>
                <input type="date" class="form-control">
            </div>
        </div>
    </div>




    <div class="grid-x grid-padding-x">
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Estado: </label>
                <input class="form-control" type="text" >
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Fecha Fin: </label>
                <input type="date" class="form-control">
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Usuario Registro: </label>
                <span type="date" class="form-control">Usuario de Registro</span>
            </div>
        </div>
        <div class="cell large-3">
            <div class="form-group">
                <label class="label text-primary">Rango Fecha: </label>
                <input type="date" class="form-control">
            </div>
        </div>
    </div>
</div>
<!-- Fin Formulario -->



<!-- Table -->
<div class="grid-x grid-padding-x align-center-middle l-container">
    <div class="cell large-12">
        <table class="table" id="tbl_proyecto">
            <thead class="thead-primary">
            <tr>
                <th class="p-3"><p class="text-center">N</p></th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_proyecto_busnom" name='txt_proyecto_busnomapli' placeholder='Proyecto' class="form-con txtBus" />
                        <button type="button" id="btn_proyecto_busnom" class="btn btn-sm-search" onclick="buscar_proyecto();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th>
                    <div class="input-group" >
                        <input type="text" id="txt_proyecto_emp" name='txt_proyecto_emp' placeholder='Empresa' class="form-con txtBus" />
                        <button type="button" id="btn_proyecto_emp" class="btn btn-sm-search" onclick="buscar_empresa();"><i class="icon icon-search4"></i></button>
                    </div>
                </th>
                <th class="p-3">Jefe Proyecto</th>
                <th class="p-3">F. Inicio</th>
                <th class="p-3">F. Prob. Fin</th>
                <th class="p-3">Estado</th>
                <th class="p-3">Tiempo Estimado</th>
                <th class="p-3">Inversion Estimada</th>
                <th id="thEditar_proyecto"  class="text-center p-3" style="display:none"><i class="icon icon-pencil"></i></th>
                <th class="text-center p-3"><i class="icon icon-bin"></i></th>
            </tr>
            </thead>
            <tbody id="tbody_proyecto" >
            <tr id="firstRowBody_proyecto">
                <td><div id="campo1_tbl_proyecto"><p id="p_num_proyecto1" class="text-center">1</p></div></td>
                <td><div id="campo2_tbl_proyecto"><input type="text" id="txt_proyecto_nombre1" name="txt_proyecto_nombre1" class="form-control" /></div></td>
                <td><div id="campo3_tbl_proyecto"><select id="cmb_proyecto_emp1" name="cmb_proyecto_emp1" class="custom-select"></select></div></td>
                <td><div id="campo4_tbl_proyecto"><select id="cmb_proyecto_jef1" name="cmb_proyecto_jef1" class="custom-select"></select></div></td>

                <td><div id="campo5_tbl_proyecto"><input type="date" id="txt_proyecto_ini1" name="txt_proyecto_nombre1" class="form-control" /></div></td>
                <td><div id="campo6_tbl_proyecto"><input type="date" id="txt_proyecto_pfin1" name="txt_proyecto_nombre1" class="form-control" /></div></td>
                <td><div id="campo7_tbl_proyecto"><select id="cmb_proyecto_est1" name="cmb_proyecto_est1" class="custom-select"></select></div></td>

                <td><div id="campo8_tbl_proyecto"><input type="text" id="txt_proyecto_tmp1" name="txt_proyecto_tmp1" class="form-control" /></div></td>
                <td><div id="campo9_tbl_proyecto"><input type="text" id="txt_proyecto_inv1" name="txt_proyecto_inv1" class="form-control" /></div></td>

                <td><div class="text-center" id="campo10_tbl_proyecto"><button type="button" class="btn btn-sm-delete" id="btn_proyecto_elim1"><i class="icon icon-bin"></i></button></div></td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<!-- End Table -->

<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script type="text/javascript" src="${urlPublic}/js/select2.js"></script>
<script language="JavaScript" src="${urlPublic}/js/Logistica/ScriptProyecto.js"></script>

<script>
    $(document).ready(function() {
        setOptions("txt_select_busempresa","onkeyup='select_buscar_empresa(event,this);'");
        $('#selectEmpresa').select2({placeholder : "Buscar . . ."});

        setOptions("txt_select_busProyecto","");
        $('#selectProyecto').select2({placeholder : "Buscar . . ."});
    });

    function select_buscar_empresa(event,obj){
        obj.value = obj.value.toUpperCase();
        if(event.keyCode == 16) {
            if (obj.value != "") {
                searchEmpresa(obj.value);
                $(".select2-search__field").trigger({type: "keydown", which: 9});
            }
        }
    }

    function searchProject() {
        var iEmpresa = $("#selectEmpresa").val();
        if(iEmpresa != ""){
            searchProyectoEmpresa(iEmpresa);
        }
    }

</script>
</body>
</html>
