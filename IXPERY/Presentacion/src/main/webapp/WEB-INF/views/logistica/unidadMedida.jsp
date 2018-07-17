<form id="fUnidadMedida" >
    <input type="hidden" id="hdn_unidadmedida" />
    <input type="hidden" id="hdn_unidadmedida_isvalid" />
    <div class="grid-x grid-padding-x align-center-middle l-comandos">
        <div class="cell small-12 medium-4 text-white">
            <div class="grid-x align-center-middle">
                <div class="cell large-1 text-center">
                    <div class="icon-object">
                        <i class="icon icon-phone2"></i>
                    </div>
                </div>
                <div class="cell large-11">
                    <p class="main-title">Registro de Unidad Medida</p>
                </div>
            </div>
        </div>
        <div class="cell small-12 medium-4">
            <div class="grid-x">
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button class="btn btn-light">Nuevo</button>
                </div>
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button id="BtnGuardar" class="btn btn-primary" onclick="BtnGuardar_Click">Guardar</button>
                </div>
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button id="BtnEliminar" class="btn btn-primary" onclick="BtnEliminar_Click">Eliminar</button>
                </div>
            </div>
        </div>
        <div class="cell small-12 medium-4">
            <!--Icono de Notificaciones-->
        </div>
    </div>
    <!-- Fin Principal -->

    <!-- Fecha -->
    <div class="l-container-sm">
        <div class="grid-x grid-padding-x">
            <div class="cell large-12">
                <label class="text-f">2 de Junio del 2018</label>
            </div>
        </div>
    </div>
    <!-- Fin Fecha -->
    <!-- Formulario -->

    <div class="grid-x grid-padding-x l-container">
        <div class="cell large-6">
            <div>
                <label class="label">BUSCAR UNIDAD DE MEDIDA</label>
            </div>
            <!-- Tabla -->
            <table class="table" id="tbl_unidadmedida">
                <thead class="thead-primary" >
                <tr>
                    <th class="p-3"><p class="text-center">N°</p></th>
                    <th style="display: none;" class="p-3">IdMedi</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_unidadmedida_busnomb" name='txt_unidadmedida_busnomb' placeholder='Ingrese Nombre de Unidad de Medida' class='form-con txtBus'  />
                            <button type="button" id="btn_unidadmedida_busmedi" class="btn btn-sm-search" onclick="buscar_UnidadMedida();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th id="thEditar_unidadmedida"  class="text-center p-3" style="display: none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>

                <tbody id="tbody_unidadmedida" >
                <tr id="firstRowBody_unidadmedida">
                    <td><div id="campo1_tbl_unidadmedida"><p id="p_num_unidadmedida1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_unidadmedida"><input type="text" id="txt_unidadmedida_nomb1" name="txt_unidadmedida_nomb1" class="form-control" /></div></td>
                    <td><div id="campo3_tbl_unidadmedida"><button type="button" class="btn btn-sm-delete" id="btn_unidadmedida_elim1"><i class="icon icon-bin"></i></button></div></td>
                </tr>
                </tbody>

            </table>
            <!-- Fin Tabla -->
        </div>
    </div>
    <input type="hidden" id="hdn_unidadmedida_id" />
</form>

