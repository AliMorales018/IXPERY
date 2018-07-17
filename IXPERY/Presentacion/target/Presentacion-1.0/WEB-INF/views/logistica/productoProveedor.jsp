<!-- Formulario -->
<form id="fprodproveedor" >
    <input type="hidden" id="hdn_prodproveedor" />
    <input type="hidden" id="hdn_prodproveedor_isvalid" />
    <div class="grid-x grid-padding-x align-center-middle l-comandos">
        <div class="cell small-12 medium-4 text-white">
            <div class="grid-x align-center-middle">
                <div class="cell large-1 text-center">
                    <div class="icon-object">
                        <i class="icon icon-phone2"></i>
                    </div>
                </div>
                <div class="cell large-11">
                    <p class="main-title">Registro de Producto Proveedor</p>
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
            <div class="l-container">
                <div class="grid-x grid-padding-x">

                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Producto</label>
                            <select id="cmb_prodproveedor_produ" name="cmb_prodproveedor_produ" class="custom-select"></select>
                        </div>
                    </div>

                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Proveedor</label>
                            <select id="cmb_prodproveedor_prove" name="cmb_prodproveedor_prove" class="custom-select"></select>
                        </div>
                    </div>

                    <div class="cell large-1">
                        <div class="form-group">
                            <label class="label text-primary">P. Compra</label>
                            <input id="txt_prodproveedor_compra" class="form-control" type="text" />
                        </div>
                    </div>

                    <div class="cell large-1">
                        <div class="form-group">
                            <label class="label text-primary">P. Venta</label>
                            <input id="txt_prodproveedor_venta" class="form-control" type="text" />
                        </div>
                    </div>

                    <div class="cell large-1">
                        <div class="form-group">
                            <label class="label text-primary">P.V Mínimo</label>
                            <input id="txt_prodproveedor_ventamin" class="form-control" type="text" />
                        </div>
                    </div>
                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Fecha Inicio</label>
                            <input type="date" class="form-control" id="date_prodproveedor_inicio" name="date_prodproveedor_inicio">
                        </div>
                    </div>

                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Fecha Fin</label>
                            <input type="date" class="form-control" id="date_prodproveedor_fin" name="date_prodproveedor_fin">
                        </div>
                    </div>
                </div>

                <div class="grid-x grid-padding-x">
                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Fecha Registro</label>
                            <input type="date" class="form-control" id="date_prodproveedor_registro" name="date_prodproveedor_registro">
                        </div>
                    </div>
                    <div class="cell large-2">
                        <div class="form-group">
                            <label class="label text-primary">Usuario Registro</label>
                            <input id="txt_prodproveedor_userreg" class="form-control" type="text" >
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="cell large-12">
            <div>
                <label class="label">BUSCAR PRODUCTO PROVEEDOR</label>
            </div>
            <!-- Tabla -->
            <table class="table" id="tbl_prodproveedor">
                <thead class="thead-primary" >
                <tr>
                    <th class="p-3">
                        <p class="text-center">N°</p>
                    </th>
                    <th style="display: none;" class="p-3">IdProdProveedor</th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_prodproveedor_busprod" name='txt_prodproveedor_busprod' placeholder='Ingrese Nombre de Producto' class='form-con txtBus'  />
                            <button type="button" id="btn_prodproveedor_busprod" class="btn btn-sm-search" onclick="buscar_prodproveedor_prod();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th>
                        <div class="input-group" >
                            <input type="text" id="txt_prodproveedor_busprove" name='txt_prodproveedor_busprod' placeholder='Ingrese Nombre de Proveedor' class='form-con txtBus'  />
                            <button type="button" id="btn_prodproveedor_busprove" class="btn btn-sm-search" onclick="buscar_prodproveedor_prove();"><i class="icon icon-search4"></i></button>
                        </div>
                    </th>
                    <th class="p-3">P. Compra</th>
                    <th class="p-3">P. Venta</th>
                    <th class="p-3">F. Inicio</th>
                    <th class="p-3">F. Fin</th>
                    <th class="p-3">Precio Min</th>
                    <th class="p-3">F. Registro</th>
                    <th class="p-3">User Registro</th>
                    <th id="thEditar_prodproveedor"  class="text-center p-3" style="display: none"><i class="icon icon-pencil"></i></th>
                    <th  class="text-center p-3"><i class="icon icon-bin"></i></th>
                </tr>
                </thead>

                <tbody id="tbody_prodproveedor" >
                <tr id="firstRowBody_prodproveedor">
                    <td colspan="10" class="text-center font-weight-light">
                        <div id="campoprodproveedor1">NO SE HA BUSCADO PRODUCTO</div>
                    </td>
                </tr>
                </tbody>

            </table>
            <!-- Fin Tabla -->
        </div>
    </div>
    <input type="hidden" id="hdn_prodproveedor_id" />
</form>

