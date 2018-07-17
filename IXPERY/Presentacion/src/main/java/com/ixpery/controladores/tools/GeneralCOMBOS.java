package com.ixpery.controladores.tools;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import java.util.List;

public class GeneralCOMBOS {
    //tipoObj: si es 0:grilla; 1:tabla
    //funcEvento: eventos del combo
    public String LlenaComboDataToHtml(List<String[]> datos,String tipoObj ,String funcEvento,String Combo,String sel,String anidado) throws ScriptException, NoSuchMethodException {
        String select = "";
        if(tipoObj=="0" && anidado=="no" && sel!="")
        {
            select="anidados";
        }else if(tipoObj=="0" && anidado=="no"){
            select = "<option value='sel' selected>Seleccione...</option>";
            for (int k = 0; k < datos.size(); k++) {
                String[] row = datos.get(k);
                select += "<option value='" + row[0] + "'>" + row[1] + "</option>";
            }
        }
        return select;
    }

    public String LlenaCheckDataToHtml(List<String[]> datos, String obj,String idObj){
        String gcheck="";
        if(obj=="checkgroup")
        {
            for (int k = 0; k < datos.size(); k++) {
                int c=k+1;
                String[] row = datos.get(k);
                if(row[3]=="1") {
                    gcheck += "<label style='display:inline-block'><input style='display:inline-block' type ='checkbox' id='check_" + row[2].toLowerCase() + c + "_estadd' name='check_" + row[2].toLowerCase() + c + "_estadd' class='mgc mgc-danger mgc-circle' value='" + row[0] + "' checked>" + row[1] + "</label></br>";
                }else
                {
                    gcheck += "<label style='display:inline-block'><input style='display:inline-block' type ='checkbox' id='check_" + row[2].toLowerCase() + c + "_estadd' name='check_" + row[2].toLowerCase() + c + "_estadd' class='mgc mgc-danger mgc-circle'  value='" + row[0] + "'>" + row[1] + "</label></br>";
                }
            }
        }
        return gcheck;
    }

}
