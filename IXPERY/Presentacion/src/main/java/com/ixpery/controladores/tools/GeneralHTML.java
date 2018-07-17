package com.ixpery.controladores.tools;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class GeneralHTML {
    public String ConvertDataToHtml(List<String[]> datos, List<String[]> tipoDatoId, List<List<String[]>> dsSelect, String Tabla) {
        String html = "";
        int cont;
        String tag;
        String id;
        String tipo;
        String valor;
        int nSelect;
        int columnas = datos.get(0).length;
        int filas = datos.size();

        for (int i = 0; i < filas; i++)
        {
            String[] rowTipoDatos = tipoDatoId.get(0);
            String[] rowDato = datos.get(i);
            nSelect = 0;
            cont = i + 1;
            html += "<tr id='fila"+ Tabla + cont + "'>";

            html += "<td>";
            html += "<div>";
            html += "<p class='text-center' id='" + cont + "'>" + cont + "</p>";
            html += "</div>";
            html += "</td>";

            html += "<td style='display:none'>";
            html += "<div class='input-group input-group-sm'>";
            html += "<input type ='text' runat='server' id='" + rowTipoDatos[1] + "" + cont + "' name='" + rowTipoDatos[1] + "" + cont + "' class='form-control' value='" + rowDato[0] + "'/></div></td>";
            html += "</div>";
            html += "</td>";

            for (int j = 1; j < columnas; j++)
            {
                String[] row = tipoDatoId.get(j);
                tag = row[0];
                id = row[1];
                tipo = row[2];

                String[] datosFila = datos.get(i);
                valor = datosFila[j];

                if(valor == null){
                    valor = "";
                }

                switch(tag){
                    case "input":
                        html += RetornaInputHtml(id, valor, tipo, cont);
                        break;

                    case "select":
                        if (tipo.equals("sexo"))
                        {
                            html += RetornaComboSexo(valor, id, cont);
                        }
                        else
                        {
                            if (tipo.equals("estado"))
                            {
                                html += RetornaComboEstado(valor, id, cont);
                            }
                            else
                            {
                                html += RetornaComboHtml(id, valor, dsSelect.get(nSelect), cont, tipo);
                                nSelect++;
                            }
                        }
                        break;
                    case "span": html+= RetornaSpanHtml(id,valor,cont);
                                break;
                    default:
                        html += "<td><div>Elemento no Soportado</div></td>";
                        break;
                }
            }
            html += "<td>";
            html += "<div class='text-center'>";
            html += "<button type='button' class='btn btn-sm-edit' id='btnE" + Tabla + "" + cont + "' runat='server' onclick='editRegistro" + Tabla + "(" + cont + ");'>";
            html += "<i class='icon icon-pencil5'></i>";
            html += "</button>";
            html += "</div>";
            html += "</td>";

            html += "<td>";
            html += "<div class='text-center'>";
            html += "<button type='button' class='btn btn-sm-delete' id='btnA"+Tabla+"" + cont + "' runat='server' onclick='elimRegistro" + Tabla + "(" + cont + ");'>";
            html += "<i class='icon icon-bin'></i>";
            html += "</button>";
            html += "</div>";
            html += "</td>";

            html += "</tr>";
        }
        return html;
    }

    public String RetornaSpanHtml(String Id, String Valor, int cont){
        String span = "";
        span += "<td>";
        span += "<div class='input-group input-group-sm'>";
        span += "<span id='"+Id+cont+"'>"+Valor+"</span>";
        span += "</div>";
        span += "</td>";
        return span;
    }

    public String RetornaComboHtml(String id, String valueSelect, List<String[]> dtSelect, int cont, String tipo) {
        String select = "";
        select += "<td>";
        select += "<div class='input-group input-group-sm'>";
        select += "<select runat='server' class='custom-select' id='" + id + cont + "' name='" + id + cont + "'>";
        if (valueSelect.equals("") || valueSelect.equals("0")) {
            select += "<option value=''>Seleccione . . . </option>";
        }
        for (int k = 0; k < dtSelect.size(); k++) {
            String[] row = dtSelect.get(k);
            if (valueSelect.equals(row[0])) {
                select += "<option value='" + row[0] + "' selected>" + row[1] + "</option>";
            }
            else {
                select += "<option value='" + row[0] + "'>" + row[1] + "</option>";
            }
        }
        select += "</select>";
        select += "</div>";
        select += "</td>";
        return select;
    }

    public String RetornaInputHtml(String Id, String Valor, String Tipo, int cont) {
        String attr = "";
        if (Tipo.equals("date") && !Valor.equals("")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Valor = sdf.format(Valor);
        }
        if (Tipo.equals("password")) {
            //attr = "style='display:none'";
        }
        if (Valor == "") {
            Valor = "";
        }
        String input = "";
        input += "<td " + attr + ">";
        input += "<div>";
        input += "<input type='" + Tipo + "' runat='server' id='" + Id + cont + "' name='" + Id + cont + "' class='form-control' value='" + Valor + "'/>";
        input += "</div>";
        input += "</td>";
        return input;
    }

    public String RetornaComboSexo(String valueSelect, String id, int cont) {
        List<String[]> dtSexo = new ArrayList<String[]>();
        String[] row1 = {"M","M"};
        String[] row2 = {"F","F"};
        dtSexo.add(row1);
        dtSexo.add(row2);

        String select = "";
        select += "<td>";
        select += "<div class='input-group input-group-sm'>";
        select += "<select runat='server' class='form-control' id='" + id + cont + "' name='" + id + cont + "'>";
        for (int k = 0; k < dtSexo.size(); k++) {
            String[] row = dtSexo.get(k);
            if (valueSelect.equals(row[0])) {
                select += "<option value='" + row[0] + "' selected>" + row[1] + "</option>";
            }
            else {
                select += "<option value='" + row[0] + "'>" + row[1] + "</option>";
            }
        }
        select += "</select>";
        select += "</div>";
        select += "</td>";
        return select;
    }

    public String RetornaComboEstado(String valueSelect, String id, int cont) {
        List<String[]> dtHabil = new ArrayList<String[]>();
        String[] row1 = {"1","Habilitado"};
        String[] row2 = {"0","Deshabilitado"};
        dtHabil.add(row1);
        dtHabil.add(row2);

        String select = "";
        select += "<td>";
        select += "<div class='input-group input-group-sm'>";
        select += "<select runat='server' class='custom-select' id='" + id + cont + "' name='" + id + cont + "'>";
        for (int k = 0; k < dtHabil.size(); k++) {
            String[] row = dtHabil.get(k);
            if (valueSelect.equals(row[0])) {
                select += "<option value='" + row[0] + "' selected>" + row[1] + "</option>";
            }
            else {
                select += "<option value='" + row[0] + "'>" + row[1] + "</option>";
            }
        }
        select += "</select>";
        select += "</div>";
        select += "</td>";
        return select;
    }
}