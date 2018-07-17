<form id="fparametro" >
    <input type="hidden" id="hdn_parametro" />
    <input type="hidden" id="hdn_parametro_isvalid" />
    <div class="grid-x grid-padding-x align-center-middle l-comandos">
        <div class="cell small-12 medium-4 text-white">
            <div class="grid-x align-center-middle">
                <div class="cell large-1 text-center">
                    <div class="icon-object">
                        <i class="icon icon-phone2"></i>
                    </div>
                </div>
                <div class="cell large-11">
                    <p class="main-title">Registro de Parametros</p>
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
                    <button id="BtnEliminar"  class="btn btn-secondary" onclick="BtnEliminar_Click" >Eliminar</button>
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
                <label class="label">BUSCAR PARAMETRO</label>
            </div>
            <!-- Tabla -->
            <table class="table" id="tbl_parametro">
                <thead class="thead-primary" >
                <tr>
                    <th class="p-3"><p class="text-center">N°</p></th>
                    <th style="display: none;" class="p-3">IdPara</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_parametro_buspara" name='txt_parametro_buspara' placeholder='Ingrese Nombre de Parametro' class='form-con txtBus'  />
                            <button type="button" id="btn_parametro_buspara" class="btn btn-sm-search" onclick="buscar_parametro();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th class="p-3">Valor</th>
                    <th id="thEditar_parametro"  class="text-center p-3" style="display: none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>

                <tbody id="tbody_parametro" >
                <tr id="firstRowBody_parametro">
                    <td><div id="campo1_tbl_parametro"><p id="p_num_parametro1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_parametro"><input type="text" id="txt_parametro_nomb1" name="txt_parametro_nomb1" class="form-control" /></div></td>
                    <td><div id="campo4_tbl_parametro"><input type="text" id="txt_parametro_valor1" name="txt_parametro_valor11" class="form-control" /></div></td>
                    <td><div id="campo5_tbl_parametro"><button type="button" class="btn btn-sm-delete" id="btn_parametro_elim1"><i class="icon icon-bin"></i></button></div></td>
                </tr>
                </tbody>

            </table>
            <!-- Fin Tabla -->
        </div>
    </div>
    <input type="hidden" id="hdn_parametro_id" />
</form>

