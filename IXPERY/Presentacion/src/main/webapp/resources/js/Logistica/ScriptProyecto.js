var JSONpro;
var idRowPro;
var rowProObjIn = {};
var rowProObjOut = {};

var objJsonTipo = {};

var arrProDel = [];
var rowProArrIn = [];
var arrayDatos = [];
var contPro = 0;
var contPro2 = 0;
var ant = [];
var nin = 0;
var pre = [];
var actualizarJSON = {};
var eliminarJSON = {};
var arrIdEdit = [];
var arrProEditFinal = [];

var jsonGuardarProyecto = {};
var arrGuardarProyecto = [];


var result = {};
var final = {};
var arrProEdit = [];

var iRowPro = 1;
var dollyRowPro = '';
dollyRowPro += '<tr class="project-insert">';
dollyRowPro += '<td><div style="width: 5px"><span name="spn-proyecto-num" class="text-center"></span></div></td>';
dollyRowPro += '<td><div style="width: 180px"><input name="txt-proyecto-nom" class="form-control pro-count" type="text" /></div></td>';
dollyRowPro += '<td><div style="width: 140px"><select name="cmb-proyecto-emp" class="proyecto-select2"></select></div></td>';
dollyRowPro += '<td><div style="width: 130px"><select name="cmb-proyecto-jef" class="proyecto-select2"></select></div></td>';
dollyRowPro += '<td><div style="width: 130px"><input name="txt-proyecto-ini" class="form-control unstyled" type="date" /></div></td>';
dollyRowPro += '<td><div style="width: 130px"><input name="txt-proyecto-pfn" class="form-control unstyled" type="date" /></div></td>';
dollyRowPro += '<td><div style="width: 90px"><select name="cmb-proyecto-est" class="custom-select"></select></div></td>';
dollyRowPro += '<td><div style="width: 40px"><input name="txt-proyecto-req" class="form-control" type="text" /></div></td>';
dollyRowPro += '<td><div style="width: 60px"><input name="txt-proyecto-tmp" class="form-control" type="text" /></div></td>';
dollyRowPro += '<td><div style="width: 100px"><input name="txt-proyecto-inv" class="form-control" type="text" /></div></td>';
dollyRowPro += '<td><div style="width: 5px" class="text-center"><center><button  name="btn_proyecto_elim" type="button"><i class="icon-cross icon-hp-desh"></i></button></center></div></td>';
dollyRowPro += '</tr>';

var dollyRowProHTML = $.parseHTML(dollyRowPro);



var rowClone;






$(document).ready(function () {
    buscarTipo();
    console.log('dollyRowProHTML');
    console.log(dollyRowProHTML);
    rowClone = $(dollyRowProHTML).clone().prop({id: 'row-proyecto-' + iRowPro});
    rowClone.find('span').html(1);

    console.log('rowClone');
    console.log(rowClone);

    $('table #tbody_proyecto')
        .html(rowClone).find('tr:last-child')
        .find('select[name=cmb-proyecto-emp]')
        .select2({
            ajax: {
                url: "/proyecto/buscarEmpresaRuc",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        emp: params.term
                    };
                },
                processResults: function (data) {
                    $.each(data.ITEMS, function(i, d) {
                        data.ITEMS[i]['id'] = d.idempresa;
                    });
                    console.log('data.items');
                    console.log(data.items);
                    return {
                        results: data.ITEMS,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empresa . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatRepoEmp,
            templateSelection: FormatRepoSelectionEmp
        })
        .closest('tr').find('select[name=cmb-proyecto-jef]')
        .select2({
            ajax: {
                url: "/solucion/BuscarEmpleado",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        value: params.term
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    $.each(data.epl, function(i, d) {
                        data.epl[i]['id'] = d.epl1;
                        data.epl[i]['text'] = d.epl4 + " " + d.epl5 + " " + d.epl6;

                    });
                    return {
                        results: data.epl,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empleado . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatEmpleado,


        });








    let nomPro;
    let empPro;
    let jefPro;
    let iniPro;
    let pfnPro;
    let estPro;
    let reqPro;
    let tmpPro;
    let invPro;




    $('thead').find('i[name=pro-del]').on('click', function(){
        $('#tbody_proyecto').find('tr').each(function(){
            if($(this).find('input[type=checkbox]').is(':checked')) {
                let objJsonDel = {};
                $(this).closest('tr').find('span[name=spn-proyecto-id]').each(function(){
                    objJsonDel.pro1 = parseInt($(this).html());
                    objJsonDel.pro9 = "0";
                });
                arrProDel.push(objJsonDel);

            }



        });
        eliminarJSON.pro = arrProDel;
        console.log("ELIMINAR");
        console.log(eliminarJSON);
        // ActualizarProyecto(eliminarJSON);
    });


    $('#tbody_proyecto')
        .on('focusin', 'tr[class=project-edit]', function () {
            idRowPro = parseInt($(this).find('span[name = spn-proyecto-id]').html());
            nomPro = $(this).find('input[name = txt-proyecto-nom]').val();
            empPro = $(this).find('select[name = cmb-proyecto-emp]').val();
            jefPro = $(this).find('input[name = txt-proyecto-jef]').val();
            iniPro = $(this).find('input[name = txt-proyecto-ini]').val();
            pfnPro = $(this).find('input[name = txt-proyecto-pfn]').val();
            estPro = $(this).find('select[name = cmb-proyecto-est]').val();
            reqPro = $(this).find('input[name = txt-proyecto-req]').val();
            tmpPro = $(this).find('input[name = txt-proyecto-tmp]').val();
            invPro = $(this).find('input[name = txt-proyecto-inv]').val();

            rowProObjIn['pro1'] = idRowPro;
            rowProObjIn['pro3'] = nomPro;
            rowProObjIn['pro2'] = empPro;
            rowProObjIn['pro4'] = jefPro;
            rowProObjIn['pro5'] = iniPro;
            rowProObjIn['pro7'] = pfnPro;
            rowProObjIn['pro11'] = estPro;
            rowProObjIn['pro12'] = reqPro;
            rowProObjIn['pro8'] = tmpPro;
            rowProObjIn['pro10'] = invPro;

            console.log(rowProObjIn);


        })
        .on('focusout', 'tr[class=project-edit]', function () {
            let objProEdit = {};

            nomPro = $(this).find('input[name = txt-proyecto-nom]').val();
            empPro = $(this).find('select[name = cmb-proyecto-emp]').val();
            jefPro = $(this).find('input[name = txt-proyecto-jef]').val();
            iniPro = $(this).find('input[name = txt-proyecto-ini]').val();
            pfnPro = $(this).find('input[name = txt-proyecto-pfn]').val();
            estPro = $(this).find('select[name = cmb-proyecto-est]').val();
            reqPro = $(this).find('input[name = txt-proyecto-req]').val();
            tmpPro = $(this).find('input[name = txt-proyecto-tmp]').val();
            invPro = $(this).find('input[name = txt-proyecto-inv]').val();

            rowProObjOut['pro1'] = idRowPro;
            rowProObjOut['pro3'] = nomPro;
            rowProObjOut['pro2'] = empPro;
            rowProObjOut['pro4'] = jefPro;
            rowProObjOut['pro5'] = iniPro;
            rowProObjOut['pro7'] = pfnPro;
            rowProObjOut['pro11'] = estPro;
            rowProObjOut['pro12'] = reqPro;
            rowProObjOut['pro8'] = tmpPro;
            rowProObjOut['pro10'] = invPro;

            console.log(rowProObjOut);

            //Objeto resultado de la comparacion del focusin y focusout
            objProEdit["pro1"] = rowProObjOut.pro1;

            let length = arrProEdit.length;
            console.log(length);


            if (rowProObjIn.pro3 !== rowProObjOut.pro3) {
                objProEdit["pro3"] = rowProObjOut.pro3;
            }
            if (rowProObjIn.pro2 !== rowProObjOut.pro2) {
                objProEdit["pro2"] = rowProObjOut.pro2;
            }
            if (rowProObjIn.pro4 !== rowProObjOut.pro4) {
                objProEdit["pro4"] = rowProObjOut.pro4;
            }
            if (rowProObjIn.pro5 !== rowProObjOut.pro5) {
                objProEdit["pro5"] = rowProObjOut.pro5;
            }
            if (rowProObjIn.pro7 !== rowProObjOut.pro7) {
                objProEdit["pro7"] = rowProObjOut.pro7;
            }
            if (rowProObjIn.pro11 !== rowProObjOut.pro11) {
                objProEdit["pro11"] = rowProObjOut.pro11;
            }
            if (rowProObjIn.pro12 !== rowProObjOut.pro12) {
                objProEdit["pro12"] = rowProObjOut.pro12;
            }
            if (rowProObjIn.pro8 !== rowProObjOut.pro8) {
                objProEdit["pro8"] = rowProObjOut.pro8;
            }
            if (rowProObjIn.pro10 !== rowProObjOut.pro10) {
                objProEdit["pro10"] = rowProObjOut.pro10;
            }


            let countKeys = Object.keys(objProEdit).length;
            if(countKeys > 1){
                arrProEdit.push(objProEdit);
            }






            arrGuardarProyecto = arrProEdit.slice();




            // actualizarJSON.pro = arrProEdit;
            //
            // console.log("ARRAY EDITAR");
            // console.log(arrProEdit);
            // console.log("JSON EDITAR");
            // console.log(actualizarJSON);
            // console.log("arrGuardarProyecto");
            // console.log(arrGuardarProyecto);


        });



    $('footer').show();
});










function GuardarProyecto() {

    // final["items"] = arrProEdit;
    //
    // final.items.forEach(function (item) { //1
    //     Object.keys(item).forEach(function(key) { //2
    //         if (!result[item.pro1]) result[item.pro1] = {}; //3
    //         result[item.pro1][key] = item[key]; //4
    //     });
    // });
    //
    // console.log("FINAL");
    // console.log(final);


    $('#tbody_proyecto').find('tr[class=project-edit]').each(function(){
        console.log('Entre en delete');

        if($(this).find('input[type=checkbox]').is(':checked')) {
            let objJsonDel = {};
            $(this).closest('tr').find('span[name=spn-proyecto-id]').each(function(){
                objJsonDel.pro1 = parseInt($(this).html());
                objJsonDel.pro9 = "0";
            });
            arrGuardarProyecto.push(objJsonDel);
            console.log("ELIMINAR");
            console.log(arrGuardarProyecto);
        }
    });
    $('#tbody_proyecto').find('tr[class=project-insert]').each(function () {
        console.log('Entre en la fila');
        //Objeto de principal de tabla
        let objFilaProyecto = {};
        //Objecto de llave foranea
        let objEmpProyecto = {};

        //Objeto foraneo de la tabla
        objEmpProyecto.emp1 = $(this).find('select[name = cmb-proyecto-emp]').val();
        //
        objFilaProyecto.pro1 = 0;
        objFilaProyecto.pro2 = objEmpProyecto;
        objFilaProyecto.pro3 = $(this).find('input[name = txt-proyecto-nom]').val();
        objFilaProyecto.pro4 = $(this).find('select[name = cmb-proyecto-jef]').text();
        objFilaProyecto.pro5 = $(this).find('input[name = txt-proyecto-ini]').val();
        objFilaProyecto.pro7 = $(this).find('input[name = txt-proyecto-pfn]').val();
        objFilaProyecto.pro8 = parseInt($(this).find('input[name = txt-proyecto-tmp]').val());
        objFilaProyecto.pro11 = $(this).find('select[name = cmb-proyecto-est]').val();
        objFilaProyecto.pro10 = parseInt($(this).find('input[name = txt-proyecto-inv]').val());
        objFilaProyecto.pro12 = parseInt($(this).find('input[name = txt-proyecto-req]').val());
        objFilaProyecto.pro15 = $(this).find('select[name = cmb-proyecto-jef]').val();
        arrGuardarProyecto.push(objFilaProyecto);
    });



    jsonGuardarProyecto.pro = arrGuardarProyecto;
    console.log("Json A Guardar");
    console.log(jsonGuardarProyecto);

    $.ajax({
        method: "POST",
        url: "/proyecto/GuardarProyecto",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(jsonGuardarProyecto),
        success: function resultado(valor) {
            if (valor === '0') {
                alert("Los resgistros fueron guardados correctamente.");
                jsonGuardarProyecto = {};
                arrGuardarProyecto = [];
                arrProEdit = [];
                console.log("jsonGuardarProyecto");
                console.log(jsonGuardarProyecto);
                console.log("arrGuardarProyecto");
                console.log(arrGuardarProyecto);
                console.log("arrProEdit");
                console.log(arrProEdit);
            }
            else {
                console.log("Entro en ELSE");
                // alert(valor);
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}


function BuscarProyecto() {
    let pro = $('table thead').find('#txt_proyecto_busnom').val();
    let emp = $('table thead').find('#txt_proyecto_busemp').val();
    console.log(pro);
    console.log(emp);
    $.ajax({
        method: "POST",
        url: "/proyecto/buscarProyecto",
        data: {"pro":pro,"emp":emp},
        success: function (data) {
            if (data !== "0") {
                console.log(data);
                JSONpro = JSON.parse(data);
                let arrayData = JSONpro.pro;
                const length = arrayData.length;
                let html = '';
                for (let i = 0; i < length; ++i) {
                    if(arrayData[i].pro5 === null){
                        arrayData[i].pro5 = "";
                    }
                    if(arrayData[i].pro7=== null){
                        arrayData[i].pro7 = "";
                    }
                    if(arrayData[i].pro8 === null){
                        arrayData[i].pro8 = "";
                    }
                    if(arrayData[i].pro10 === null){
                        arrayData[i].pro10 = "";
                    }
                    if(arrayData[i].pro12 === null){
                        arrayData[i].pro12 = "";
                    }
                    html += `<tr class="project-edit">'`;
                    html += `<td><div style="width: 5px"><span name="spn-proyecto-num" class="text-center">${i + 1}</span></div></td>`;
                    html += `<td style="display: none"><div><span name="spn-proyecto-id">${arrayData[i].pro1}</span></div></td>`;
                    html += `<td><div style="width: 180px"><input name="txt-proyecto-nom" class="form-control pro-count" type="text" value="${arrayData[i].pro3}" /></div></td>`;
                    html += `<td><div style="width: 140px"><select name="cmb-proyecto-emp"><option selected="selected" >${arrayData[i].pro2.emp4}</option></select></div></td>`;
                    html += `<td><div style="width: 130px"><select name="cmb-proyecto-jef"><option selected="selected" >${arrayData[i].pro4}</option></select></div></td>`;
                    html += `<td><div style="width: 130px"><input name="txt-proyecto-ini" class="form-control unstyled" type="date" value="${arrayData[i].pro5}" /></div></td>`;
                    html += `<td><div style="width: 130px"><input name="txt-proyecto-pfn" class="form-control unstyled" type="date" value="${arrayData[i].pro7}" /></div></td>`;
                    html += `<td><div style="width: 90px"><select name="cmb-proyecto-est" class="custom-select">`;
                    // for (let j = 0; j < lengthEst; ++j) {
                    //     if (arrayData[i].pro11 === JSONest[j].idestado) {
                    //         html += `<option value="${JSONest[j].idestado}" selected>${JSONest[j].nomestado}</option>`
                    //     }
                    //     else {
                    //         html += `<option value="${JSONest[j].idestado}">${JSONest[j].nomestado}</option>`
                    //     }
                    // }

                    $.each(objJsonTipo, function (key, value) {
                        if(arrayData[i].pro11 === value.idestado){
                            html += `<option value="${value.idestado}" selected>${value.nomestado}</option>`;
                        }
                        else{
                            html += `<option value="${value.idestado}">${value.nomestado}</option>`;
                        }
                    });

                    html += `</select></div></td>`;
                    html += `<td><div style="width: 40px"><input name="txt-proyecto-req" class="form-control" type="text"  value="${arrayData[i].pro12}" /></div></td>`;
                    html += `<td><div style="width: 60px"><input name="txt-proyecto-tmp" class="form-control" type="text"  value="${arrayData[i].pro8}" /></div></td>`;
                    html += `<td><div style="width: 100px"><input name="txt-proyecto-inv" class="form-control" type="text"  value="${arrayData[i].pro10}" /></div></td>`;
                    html += `<td><div><center><input id='txt-proyecto-del' type='checkbox' class='mgc mgc-danger mgc-circle' /></center></div></td>`;
                    html += `</tr>`;

                }

                // let dollyRowProEditHTML = $.parseHTML(dollyRowPro);




                $('tbody#tbody_proyecto')
                    .html(html).find('select[name=cmb-proyecto-emp]')
                    .select2({
                        ajax: {
                            url: "/proyecto/buscarEmpresaRuc",
                            dataType: 'json',
                            delay: 250,
                            data: function (params) {
                                return {
                                    emp: params.term
                                };
                            },
                            processResults: function (data) {
                                $.each(data.emp, function(i, d) {
                                    data.emp[i]['id'] = d.emp1;
                                });
                                return {
                                    results: data.emp,
                                };
                            },
                            cache: true
                        },
                        placeholder: 'Buscar empresa . . .',
                        escapeMarkup: function (markup) { return markup; },
                        minimumInputLength: 3,
                        templateResult: FormatRepoEmp,
                        templateSelection: FormatRepoSelectionEmp
                    })
                    .closest('tr').find('select[name=cmb-proyecto-jef]')
                    .select2({
                        ajax: {
                            url: "/solucion/BuscarEmpleado",
                            dataType: 'json',
                            delay: 250,
                            data: function (params) {
                                return {
                                    value: params.term
                                };
                            },
                            processResults: function (data) {
                                console.log(data);
                                $.each(data.epl, function(i, d) {
                                    data.epl[i]['id'] = d.epl1;
                                    data.epl[i]['text'] = d.epl4 + " " + d.epl5 + " " + d.epl6;
                                });
                                return {
                                    results: data.epl,
                                };
                            },
                            cache: true
                        },
                        placeholder: 'Buscar empleado . . .',
                        escapeMarkup: function (markup) { return markup; },
                        minimumInputLength: 3,
                        templateResult: FormatEmpleado,

                    });



            }
            else {
                // $('tbody#tbody_proyecto').html("No se encontraron registros");
                alert("No se encontraron registros para esta busqueda.");
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });




}













function NuevoProyecto() {
    let iEmpPro = 1;
    let cRowPro;


    // let dollyRowProHTML = $.parseHTML(dollyRowPro);
    console.log($(dollyRowProHTML)[0].outerHTML);
    console.log(dollyRowProHTML);


    // $('table #tbody_proyecto').find('tr[class=edit-pro]').remove();

    ++iRowPro;

    cRowPro = $('table #tbody_proyecto tr').find('span[name=spn-proyecto-num]').length;

    ++cRowPro;


    let rowClone = $(dollyRowProHTML).clone().prop({id: 'row-proyecto-' + iRowPro});
    rowClone.find('span').html(cRowPro);
    // rowClone.find('.proyecto-select2').select2();

    // $('table #tbody_proyecto').append(rowClone).find('tr:last-child').find('.proyecto-select2').select2();

    $('table #tbody_proyecto').append(rowClone)
        .find('tr:last-child').find('select[name=cmb-proyecto-emp]')
        .select2({
            ajax: {
                url: "/proyecto/buscarEmpresaRuc",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        emp: params.term
                    };
                },
                processResults: function (data) {
                    $.each(data.emp, function(i, d) {
                        data.emp[i]['id'] = d.emp1;
                    });
                    return {
                        results: data.emp,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empresa . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatRepoEmp,
            templateSelection: FormatRepoSelectionEmp
        })
        .closest('tr').find('select[name=cmb-proyecto-jef]')
        .select2({
            ajax: {
                url: "/solucion/BuscarEmpleado",
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        value: params.term
                    };
                },
                processResults: function (data) {
                    console.log(data);
                    $.each(data.epl, function(i, d) {
                        data.epl[i]['id'] = d.epl1;
                        data.epl[i]['text'] = d.epl4 + " " + d.epl5 + " " + d.epl6;

                    });
                    return {
                        results: data.epl,
                    };
                },
                cache: true
            },
            placeholder: 'Buscar empleado . . .',
            escapeMarkup: function (markup) { return markup; },
            minimumInputLength: 3,
            templateResult: FormatEmpleado,

        });


    $('table #tbody_proyecto').find('button').each(function () {
        $(this).on('click', function () {
            let rRowPro = 1;
            $(this).closest('tr').remove();
            $('table #tbody_proyecto tr').find('span[name=spn-proyecto-num]').each(function () {
                $(this).html(rRowPro);
                ++rRowPro;
            });
        });
    });


}

function buscarTipo() {
    $.ajax({
        method: "POST",
        url: "/proyecto/buscartipo",
        async:false,
        success: function (data) {
            if (data !== "0") {
                objJsonTipo = JSON.parse(data);
                $(dollyRowProHTML).find('select[name = cmb-proyecto-est]')
                    .empty()
                    .append("<option value=0>Seleccione . . .</option>")
                    .append(function () {
                        let html = '';
                        $.each(objJsonTipo, function (key, value) {
                            html += `<option value="${value.idestado}">${value.nomestado}</option>`;
                        });
                        return html;
                    });
            }
            else {
                $('#cmb-proyecto-est').html('<option>No se encontraron registros</option>');
            }

        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}






function ActualizarProyecto(value) {
    $.ajax({
        method: "POST",
        url: "/proyecto/actualizar",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(value),
        success: function resultado(valor) {
            if (valor == "") {
                alert("Entro en IF");

            }
            else {
                console.log("Entro en ELSE");
                // alert(valor);
            }
        },
        error: function errores(msg) {
            alert('Error: ' + msg.responseText);
        }
    });
}









function FormatRepoEmp (repo) {
    if (repo.loading) {
        return repo.text;
    }
    let markup = `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Empresa: ${repo.nomempresa}</div>`+
        `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>RUC: ${repo.ruc}</div>`;
    return markup;
}


function FormatRepoSelectionEmp (repo) {
    return  repo.text || repo.nomempresa;
}






function FormatEmpleado (repo) {
    if (repo.loading) {
        return repo.text;
    }
    let markup = `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>Nombre: ${repo.epl4} ${repo.epl5} ${repo.epl6}</div>`+
        `<div class='select2-result-reqproemp'><span class='select2-span-result'></span>DNI: ${repo.epl3}</div>`;
    return markup;
}


