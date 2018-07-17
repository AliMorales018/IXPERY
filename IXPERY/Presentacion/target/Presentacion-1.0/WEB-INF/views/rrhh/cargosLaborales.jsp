<form id="fcargolaboral" >
    <input type="hidden" id="hdn_cargolaboral" />
    <input type="hidden" id="hdn_cargolaboral_isvalid" />
    <div class="grid-x grid-padding-x align-center-middle l-comandos">
        <div class="cell small-12 medium-4 text-white">
            <div class="grid-x align-center-middle">
                <div class="cell large-1 text-center">
                    <div class="icon-object">
                        <i class="icon icon-phone2"></i>
                    </div>
                </div>
                <div class="cell large-11">
                    <p class="main-title">Registro de Cargo Laboral</p>
                </div>
            </div>
        </div>
        <div class="cell small-12 medium-4">
            <div class="grid-x">
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button class="btn btn-light">Nuevo</button>
                </div>
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button id="BtnGuardar" class="btn btn-primary" onclick="BtnGuardar_Click" >Guardar</button>
                </div>
                <div class="cell small-4 medium-4 large-4 text-center">
                    <button id="BtnEliminar"  class="btn btn-secondary" onclick="BtnEliminar_Click">Eliminar</button>
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
        <div class="cell large-12">
            <div>
                <label class="label">BUSCAR CARGO LABORAL</label>
            </div>
            <!-- Tabla -->
            <table class="table" id="tbl_cargolaboral">
                <thead class="thead-primary" >
                <tr>
                    <th class="p-3">
                        <p class="text-center">N°</p>
                    </th>
                    <th style="display: none;" class="p-3">Idlaboral</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_cargolaboral_busnomb" name='txt_cargolaboral_busnomb' placeholder='Ingrese Nombre de Cargo Laboral' class='form-con txtBus'  />
                            <button type="button" id="btn_cargolaboral_busnomb" class="btn btn-sm-search" onclick="buscar_cargolaboral();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th class="p-3">Área</th>
                    <th class="p-3">Salario</th>
                    <th class="p-3">Estado</th>
                    <th class="p-3">Fecha Registro</th>
                    <th class="p-3">Usuario Registro</th>
                    <th id="thEditar_cargolaboral"  class="text-center p-3" style="display: none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>

                <tbody id="tbody_cargolaboral" >
                <tr id="firstRowBody_cargolaboral">
                    <td><div id="campo1_tbl_cargolaboral"><p id="p_num_cargolaboral1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_cargolaboral"><input type="text" id="txt_cargolaboral_nomb1" name="txt_cargolaboral_nomb1" class="form-control" /></div></td>
                    <td><div id="campo3_tbl_cargolaboral"><select id="cmb_cargolaboral_area1" name="cmb_cargolaboral_area1" class="custom-select"></select></div></td>
                    <td><div id="campo4_tbl_cargolaboral"><input type="text" id="txt_cargolaboral_salar1" name="txt_cargolaboral_salar1" class="form-control" /></div></td>
                    <td><div id="campo5_tbl_cargolaboral"><select id="cmb_cargolaboral_esta1" name="cmb_cargolaboral_esta1" class="custom-select"></select></div></td>
                    <td><div id="campo6_tbl_cargolaboral"><input type="date" id="date_cargolaboral_fechareg1" name="date_cargolaboral_fechareg1" class="form-control" /></div></td>
                    <td><div id="campo7_tbl_cargolaboral"><input type="text" id="txt_cargolaboral_userreg1" name="txt_cargolaboral_userreg1" class="form-control" /></div></td>
                    <td><div id="campo8_tbl_cargolaboral"><button type="button" class="btn btn-sm-delete" id="btn_cargolaboral_elim1"><i class="icon icon-bin"></i></button></div></td>
                </tr>
                </tbody>

            </table>
            <!-- Fin Tabla -->
        </div>
    </div>
    <input type="hidden" id="hdn_cargolaboral_id" />
</form>
