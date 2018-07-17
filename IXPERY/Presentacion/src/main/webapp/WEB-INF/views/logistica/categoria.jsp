<form id="fcategoria" >
    <input type="hidden" id="hdn_categoria" />
    <input type="hidden" id="hdn_categoria_isvalid" />
    <div class="grid-x grid-padding-x align-center-middle l-comandos">
        <div class="cell small-12 medium-4 text-white">
            <div class="grid-x align-center-middle">
                <div class="cell large-1 text-center">
                    <div class="icon-object">
                        <i class="icon icon-phone2"></i>
                    </div>
                </div>
                <div class="cell large-11">
                    <p class="main-title">Registro de Categoria</p>
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
                <label class="label">BUSCAR CATEGORIA</label>
            </div>
            <!-- Tabla -->
            <table class="table" id="tbl_categoria">
                <thead class="thead-primary" >
                <tr>
                    <th class="p-3"><p class="text-center">N°</p></th>
                    <th style="display: none;" class="p-3">IdCate</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_categoria_busnomb" name='txt_categoria_busnomb' placeholder='Ingrese Nombre de Categoria' class='form-con txtBus'  />
                            <button type="button" id="btn_categoria_buscate" class="btn btn-sm-search" onclick="buscar_categoria();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th class="p-3">Familia</th>
                    <th id="thEditar_categoria"  class="text-center p-3" style="display: none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>

                <tbody id="tbody_categoria">
                <tr id="firstRowBody_categoria">
                    <td><div id="campo1_tbl_categoria"><p id="p_num_categoria1" class="text-center">1</p></div></td>
                    <td><div id="campo2_tbl_categoria"><input type="text" id="txt_categoria_cate1" name="txt_categoria_cate1" class="form-control" /></div></td>
                    <td><div id="campo3_tbl_categoria"><select id="cmb_categoria_fami1" name="cmb_categoria_fami1" class="custom-select"></select></div></td>
                    <td><div id="campo4_tbl_categoria"><button type="button" class="btn btn-sm-delete" id="btn_categoria_elim1"><i class="icon icon-bin"></i></button></div></td>
                </tr>
                </tbody>

            </table>
            <!-- Fin Tabla -->
        </div>
    </div>
    <input type="hidden" id="hdn_categoria_id" />
</form>
