package com.ixpery.datos.tools;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ADate {
    public static void main(String a[]) throws Exception {

    }
    public Date fecha (String s) throws ParseException {
        Date date1=new SimpleDateFormat("dd/MM/yyyy").parse(s);
        return date1;
    }
}
