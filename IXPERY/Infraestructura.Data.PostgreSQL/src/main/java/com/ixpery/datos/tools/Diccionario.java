package com.ixpery.datos.tools;

import java.util.HashMap;
import java.util.Map;

public class Diccionario {

    public Map<String,String> Buscar(String aliasTabla){
        Map<String, String> diccionario;
        switch (aliasTabla){
            case "usr":
            case "16400":
                diccionario = getUsr();
                break;
            case"per":
            case"16403":
                diccionario = getPer();
                break;
            case "pus":
            case "16411":
                diccionario = gerPus();
                break;
            case"app":
            case"16426":
                diccionario = getApp();
                break;
            case "men":
            case "16431":
                diccionario = getMen();
                break;
            case"mep":
            case"16441":
                diccionario = getMep();
                break;
            case "are":
            case "46197":
                diccionario = getAre();
                break;
            case"cal":
            case"46207":
                diccionario = getCal();
                break;
            case"hic":
            case"46217":
                diccionario = getHic();
                break;
            case"epl":
            case"46227":
                diccionario = getEpl();
                break;
            case"fam":
            case"45915":
                diccionario = getFam();
                break;
            case"cat":
            case"45920":
                diccionario = getCat();
                break;
            case"cli":
            case"45965":
                diccionario = getCli();
                break;
            case"dep":
            case"45970":
                diccionario = getDep();
                break;
            case"prv":
            case"45975":
                diccionario = getPrv();
                break;
            case"ubi":
            case"45985":
                diccionario = getUbi();
                break;
            case"prd":
            case"45995":
                diccionario = getPrd();
                break;
            case"emp":
            case"46009":
                diccionario = getEmp();
                break;
            case"cem":
            case"46038":
                diccionario = getCem();
                break;
            case"pro":
            case"46051":
                diccionario = getPro();
                break;
            case"req":
            case"46061":
                diccionario = getReq();
                break;
            case"sol":
            case"46071":
                diccionario = getSol();
                break;
            case"est":
            case"46114":
                diccionario = getEst();
                break;
            case"ume":
            case"46139":
                diccionario = getUme();
                break;
            case"pdt":
            case"46144":
                diccionario = getPdt();
                break;
            case"ser":
            case"46162":
                diccionario = getSer();
                break;
            case"act":
            case"46172":
                diccionario = getAct();
                break;
            case"pet":
            case"46182":
                diccionario = getPet();
                break;
            case"eqi":
            case"46702":
                diccionario = getEqi();
                break;
            case"ppr":
            case"46713":
                diccionario = getPpr();
                break;
            case"pso":
            case"46728":
                diccionario = getPso();
                break;
            case"prp":
            case"46743":
                diccionario = getPrp();
                break;
            case"ose":
            case"46758":
                diccionario = getOse();
                break;
            case"sso":
            case"46771":
                diccionario = getSso();
                break;
            case"spr":
            case"46776":
                diccionario = getSpr();
                break;
            case"ssl":
            case"46791":
                diccionario = getSsl();
                break;
            case"prs":
            case"46806":
                diccionario = getPrs();
                break;
            case"acc":
            case"56063":
                diccionario = getAcc();
                break;
            case"coe":
            case"460381":
                diccionario = getCoe();
                break;
            default:
                diccionario = null;
                break;
        }
        return diccionario;
    }

    private Map<String, String> getUsr(){
        Map <String, String> usr = new HashMap<>();
        //usuario
        usr.put("usr", "16400");
        //iduser
        usr.put("usr1", "164001");
        //login
        usr.put("usr2", "164002");
        //nombres
        usr.put("usr3", "164003");
        //paterno
        usr.put("usr4", "164004");
        //materno
        usr.put("usr5", "164005");
        //estado
        usr.put("usr6", "164006");
        //clave
        usr.put("usr7", "164007");
        //idpersonal
        usr.put("usr8", "164008");
        //correo
        usr.put("usr9", "164009");
        return usr;
    }

    private Map<String, String> getPer(){
        Map <String, String> per = new HashMap<>();
        //perfil
        per.put("per", "16403");
        //idperfil
        per.put("per1", "164031");
        //idapli
        per.put("per2", "164032");
        //perfil
        per.put("per3", "164033");
        //estado
        per.put("per4", "164034");
        //fechacreacion
        per.put("per5", "164035");
        //usuariocreacion
        per.put("per6", "164036");
        //fechamodificacion
        per.put("per7", "164037");
        //usuariomodificacion
        per.put("per8", "164038");
        return per;
    }

    private Map<String, String> gerPus(){
        Map <String, String> pus = new HashMap<>();
        //perfiluser
        pus.put("pus", "16411");
        //iduser
        pus.put("pus1", "164111");
        //idperfil
        pus.put("pus2", "164112");
        //estado
        pus.put("pus3", "164113");
        return pus;
    }

    private Map<String, String> getApp(){
        Map <String, String> app = new HashMap<>();
        //aplicacion
        app.put("app", "16426");
        //idapli
        app.put("app1", "164261");
        //aplicacion
        app.put("app2", "164262");
        //estado
        app.put("app3", "164263");
        //version
        app.put("app4", "164264");
        //abreviatura
        app.put("app5", "164265");
        return app;
    }

    private Map<String, String> getMen(){
        Map <String, String> men = new HashMap<>();
        //menu
        men.put("men", "16431");
        //idmenu
        men.put("men1", "164311");
        //descripcion
        men.put("men2", "164312");
        //idpadre
        men.put("men3", "164313");
        //posicion
        men.put("men4", "164314");
        //icono
        men.put("men5", "164315");
        //habilitado
        men.put("men6", "164316");
        //url
        men.put("men7", "164317");
        //idapli
        men.put("men8", "164318");
        return men;
    }

    private Map<String, String> getMep(){
        Map <String, String> mep = new HashMap<>();
        //menuperfil
        mep.put("mep", "16441");
        //idmenu
        mep.put("mep1", "164411");
        //idperfil
        mep.put("mep2", "164412");
        //visible
        mep.put("mep3", "164413");
        //estado
        mep.put("mep4", "164414");
        return mep;
    }

    private Map<String, String> getAre(){
        Map <String, String> are = new HashMap<>();
        //area
        are.put("are", "46197");
        //idarea
        are.put("are1", "461971");
        //nomarea
        are.put("are2", "461972");
        //estado
        are.put("are3", "461973");
        //idestado
        are.put("are4", "461974");
        //fecharegistro
        are.put("are5", "461975");
        //userregistro
        are.put("are6", "461976");
        return are;
    }

    private Map<String, String> getCal(){
        Map <String, String> cal = new HashMap<>();
        //cargolaboral
        cal.put("cal", "46207");
        //idcargo
        cal.put("cal1", "462071");
        //idarea
        cal.put("cal2", "462072");
        //nomcargo
        cal.put("cal3", "462073");
        //salario
        cal.put("cal4", "462074");
        //estado
        cal.put("cal5", "462075");
        //idestado
        cal.put("cal6", "462076");
        //fecharegistro
        cal.put("cal7", "462077");
        //userregistro
        cal.put("cal8", "462078");
        return cal;
    }

    private Map<String, String> getHic(){
        Map <String, String> hic = new HashMap<>();
        //historialcargo
        hic.put("hic", "46217");
        //idcargo
        hic.put("hic1", "462171");
        //fechainicio
        hic.put("hic2", "462172");
        //fechafin
        hic.put("hic3", "462173");
        //salario
        hic.put("hic4", "462174");
        //estado
        hic.put("hic5", "462175");
        return hic;
    }

    private Map<String, String> getEpl(){
        Map <String, String> epl = new HashMap<>();
        //empleado
        epl.put("epl", "46227");
        //idempleado
        epl.put("epl1", "462271");
        //idarea
        epl.put("epl2", "462272");
        //dni
        epl.put("epl3", "462273");
        //nombre
        epl.put("epl4", "462274");
        //apellidopaterno
        epl.put("epl5", "462275");
        //apellidomaterno
        epl.put("epl6", "462276");
        //telefono
        epl.put("epl7", "462277");
        //direccion
        epl.put("epl8", "462278");
        //fechanac
        epl.put("epl9", "462279");
        //sexo
        epl.put("epl10", "4622710");
        //estado
        epl.put("epl11", "4622711");
        return epl;
    }


    private Map<String, String> getFam(){
        Map <String, String> fam = new HashMap<>();
        //familia
        fam.put("pro", "45915");
        //idfamilia
        fam.put("pro1", "459151");
        //nomfamilia
        fam.put("pro2", "459152");
        return fam;
    }

    private Map<String, String> getCat(){
        Map <String, String> cat = new HashMap<>();
        //categoria
        cat.put("cat", "45920");
        //idcategoria
        cat.put("cat1", "459201");
        //nomcategoria
        cat.put("cat2", "459202");
        //idfamilia
        cat.put("cat3", "459203");
        return cat;
    }

    private Map<String, String> getCli(){
        Map <String, String> cli = new HashMap<>();
        //cliente
        cli.put("cli", "45965");
        //idcliente
        cli.put("cli1", "459651");
        //totalcompras
        cli.put("cli2", "459652");
        //cantpy
        cli.put("cli3", "459653");
        return cli;
    }

    private Map<String, String> getDep(){
        Map <String, String> dep = new HashMap<>();
        //departamento
        dep.put("dep", "45970");
        //iddepartamento
        dep.put("dep1", "459701");
        //nomdepartamento
        dep.put("dep2", "459702");
        return dep;
    }

    private Map<String, String> getPrv(){
        Map <String, String> prv = new HashMap<>();
        //provincia
        prv.put("prv", "45975");
        //idprovincia
        prv.put("prv1", "459751");
        //nomprovincia
        prv.put("prv2", "459752");
        //iddepartamento
        prv.put("prv3", "459753");
        return prv;
    }

    private Map<String, String> getUbi(){
        Map <String, String> ubi = new HashMap<>();
        //ubigeo
        ubi.put("ubi", "45985");
        //idubigeo
        ubi.put("ubi1", "459851");
        //nomubigeo
        ubi.put("ubi2", "459852");
        //idprovincia
        ubi.put("ubi3", "459853");
        return ubi;
    }

    private Map<String, String> getPrd(){
        Map <String, String> prd = new HashMap<>();
        //proveedor
        prd.put("prd", "45995");
        //idproveedor
        prd.put("prd1", "459951");
        //totalventas
        prd.put("prd2", "459952");
        //cantpy
        prd.put("prd3", "459953");
        return prd;
    }

    private Map<String, String> getEmp(){
        Map <String, String> emp = new HashMap<>();
        //empresa
        emp.put("emp", "46009");
        //idempresa
        emp.put("emp1", "460091");
        //idproveedor
        emp.put("emp2", "460092");
        //ruc
        emp.put("emp3", "460093");
        //nomempresa
        emp.put("emp4", "460094");
        //direccion
        emp.put("emp5", "460095");
        //correo
        emp.put("emp6", "460096");
        //telefono
        emp.put("emp7", "460097");
        //nomcomercial
        emp.put("emp8", "460098");
        //dirfiscal
        emp.put("emp9", "460099");
        //estado
        emp.put("emp10", "4600910");
        //codigopostal
        emp.put("emp11", "4600911");
        //descripcion
        emp.put("emp12", "4600912");
        //referencia
        emp.put("emp13", "4600913");
        //idubigeo
        emp.put("emp14", "4600914");
        //rubro
        emp.put("emp15", "4600915");
        //sitioweb
        emp.put("emp16", "4600916");
        //logo
        emp.put("emp17", "4600917");
        //idestado
        emp.put("emp18", "4600918");
        //nomsituacion
        emp.put("emp19", "4600919");
        //idcliente
        emp.put("emp20", "4600920");
        //frpr
        emp.put("emp21", "4600921");
        //userregistro
        emp.put("emp22", "4600922");
        //empleador
        emp.put("emp23", "4600923");
        //empleadopr
        emp.put("emp24", "4600924");
        //frr
        emp.put("emp25", "4600925");
        return emp;
    }

    private Map<String, String> getCem(){
        Map <String, String> cem = new HashMap<>();
        //contactoempresa
        cem.put("cem", "46038");
        //idcontacto
        cem.put("cem1", "460381");
        //idempresa
        cem.put("cem2", "460382");
        //nomcontacto
        cem.put("cem3", "460383");
        //apellpaterno
        cem.put("cem4", "460384");
        //apellmaterno
        cem.put("cem5", "460385");
        //direccion
        cem.put("cem6", "460386");
        //telefono
        cem.put("cem7", "460387");
        //estado
        cem.put("cem8", "460388");
        //ciudad
        cem.put("cem9", "460389");
        //cargo
        cem.put("cem10", "4603810");
        //correo
        cem.put("cem11", "4603812");
        //fecharegistro
        cem.put("cem13", "4603813");
        //userregistro
        cem.put("cem14", "4603814");
        return cem;
    }

    private Map<String, String> getPro(){
        Map <String, String> pro = new HashMap<>();
        //proyecto
        pro.put("pro", "46051");
        //idproyecto
        pro.put("pro1", "460511");
        //idempresa
        pro.put("pro2", "460512");
        //nomproyecto
        pro.put("pro3", "460513");
        //jefeproyecto
        pro.put("pro4", "460514");
        //fechainicio
        pro.put("pro5", "460515");
        //fechafin
        pro.put("pro6", "460516");
        //fechapfinal
        pro.put("pro7", "460517");
        //tiempoestimcoti
        pro.put("pro8", "460518");
        //estado
        pro.put("pro9", "460519");
        //inverestim
        pro.put("pro10", "4605110");
        //idestado
        pro.put("pro11", "4605111");
        //cantrq
        pro.put("pro12", "4605112");
        //fecharegistro
        pro.put("pro13", "4605113");
        //userregistro
        pro.put("pro14", "4605114");
        //idempleado
        pro.put("pro15", "4605115");
        return pro;
    }

    private Map<String, String> getReq(){
        Map <String, String> req = new HashMap<>();
        //requerimiento
        req.put("req", "46061");
        //idrequerimiento
        req.put("req1", "460611");
        //idproyecto
        req.put("req2", "460612");
        //nomrequerimiento
        req.put("req3", "460613");
        //nivel
        req.put("req4", "460614");
        //estado
        req.put("req5", "460615");
        //idestado
        req.put("req6", "460616");
        //fecharegistro
        req.put("req7", "460617");
        //userregistro
        req.put("req8", "460618");
        return req;
    }

    private Map<String, String> getSol(){
        Map <String, String> sol = new HashMap<>();
        //solucion
        sol.put("sol", "46071");
        //idsolucion
        sol.put("sol1", "460711");
        //idrequerimiento
        sol.put("sol2", "460712");
        //nomsolucion
        sol.put("sol3", "460713");
        //descripcion
        sol.put("sol4", "460714");
        //encargadosol
        sol.put("sol5", "460715");
        //fechacreacion
        sol.put("sol6", "460716");
        //fechaenvio
        sol.put("sol7", "460717");
        //totalsolucion
        sol.put("sol8", "460718");
        //totalmostrar
        sol.put("sol9", "460719");
        //estado
        sol.put("sol10", "460710");
        //idestado
        sol.put("sol11", "460711");
        //fecharegistro
        sol.put("sol12", "460712");
        //userregistro
        sol.put("sol13", "460713");
        return sol;
    }

    private Map<String, String> getEst(){
        Map <String, String> est = new HashMap<>();
        //estado
        est.put("est", "46114");
        //idestado
        est.put("est1", "461141");
        //nomestado
        est.put("est2", "461142");
        //nomtabla
        est.put("est3", "461143");
        //estado
        est.put("est4", "461144");
        //cod
        est.put("est5", "461145");
        //check
        est.put("est6", "461146");
        //combo
        est.put("est7", "461147");
        return est;
    }

    private Map<String, String> getUme(){
        Map <String, String> ume = new HashMap<>();
        //umedida
        ume.put("ume", "46139");
        //idumedida
        ume.put("ume1", "461391");
        //nomumedida
        ume.put("ume2", "461392");
        return ume;
    }

    private Map<String, String> getPdt(){
        Map <String, String> pdt = new HashMap<>();
        //producto
        pdt.put("pdt", "46144");
        //idproducto
        pdt.put("pdt1", "461441");
        //idcategoria
        pdt.put("pdt2", "461442");
        //idumedida
        pdt.put("pdt3", "461443");
        //nomumed
        pdt.put("pdt4", "461444");
        //
        pdt.put("pdt5", "");
        //codigo
        pdt.put("pdt6", "461446");
        //nomproducto
        pdt.put("pdt7", "461447");
        //estado
        pdt.put("pdt8", "461448");
        //saldo
        pdt.put("pdt9", "461449");
        //stockminimo
        pdt.put("pdt10", "4614410");
        //modelo
        pdt.put("pdt11", "4614411");
        //marca
        pdt.put("pdt12", "4614412");
        //fecharegistro
        pdt.put("pdt13", "4614413");
        //userregistro
        pdt.put("pdt14", "4614414");
        //insumo
        pdt.put("pdt15", "4614415");
        //pfinal
        pdt.put("pdt16", "4614416");
        //estadoinsumo
        pdt.put("pdt17", "4614417");
        //estadopfinal
        pdt.put("pdt18", "4614418");
        return pdt;
    }

    private Map<String, String> getSer(){
        Map <String, String> ser = new HashMap<>();
        //servicio
        ser.put("ser", "46162");
        //idservicio
        ser.put("ser1", "461621");
        //idsolucion
        ser.put("ser2", "461622");
        //nomservicio
        ser.put("ser3", "461623");
        //subtotal
        ser.put("ser4", "461624");
        //numcuadrillas
        ser.put("ser5", "461625");
        //unitactividad
        ser.put("ser6", "461626");
        //porcentdepreciacion
        ser.put("ser7", "461627");
        //aumento
        ser.put("ser8", "461628");
        //total
        ser.put("ser9", "461629");
        //estado
        ser.put("ser10", "4616210");
        //idestado
        ser.put("ser11", "4616211");
        //fecharegistro
        ser.put("ser12", "4616212");
        //userregistro
        ser.put("ser13", "4616213");
        return ser;
    }

    private Map<String, String> getAct(){
        Map <String, String> act = new HashMap<>();
        //actividad
        act.put("act", "46172");
        //idactividad
        act.put("act1", "461721");
        //idservicio
        act.put("act2", "461722");
        //nomactividad
        act.put("act3", "461723");
        //descripcion
        act.put("act4", "461724");
        //cantidad
        act.put("act5", "461725");
        //riesgo
        act.put("act6", "461726");
        //subtotal
        act.put("act7", "461727");
        //porcenttransito
        act.put("act8", "461728");
        //total
        act.put("act9", "461729");
        //totalmostrar
        act.put("act10", "4617210");
        //estado
        act.put("act11", "4617211");
        //idestado
        act.put("act12", "4617212");
        //fecharegistro
        act.put("act13", "4617213");
        //userregistro
        act.put("act14", "4617214");
        return act;
    }

    private Map<String, String> getPet(){
        Map <String, String> pet = new HashMap<>();
        //personaltransito
        pet.put("pet", "46182");
        //idperstran
        pet.put("pet1", "461821");
        //idservicio
        pet.put("pet2", "461822");
        //cargolaboral
        pet.put("pet3", "461823");
        //cantidad
        pet.put("pet4", "461824");
        //horas
        pet.put("pet5", "461825");
        //subtotal
        pet.put("pet6", "461826");
        //total
        pet.put("pet7", "461827");
        //fecharegistro
        pet.put("pet8", "461828");
        //userregistro
        pet.put("pet9", "461829");
        return pet;
    }

    private Map<String, String> getEqi(){
        Map <String, String> eqi = new HashMap<>();
        //equipo
        eqi.put("eqi", "46702");
        //idequipo
        eqi.put("eqi1", "467021");
        //idsolucion
        eqi.put("eqi2", "467022");
        //nomequipo
        eqi.put("eqi3", "467023");
        //total
        eqi.put("eqi4", "467024");
        //totalmostrar
        eqi.put("eqi5", "467025");
        //estado
        eqi.put("eqi6", "467026");
        //idestado
        eqi.put("eqi7", "467027");
        //fecharegistro
        eqi.put("eqi8", "467028");
        //userregistro
        eqi.put("eqi9", "467029");
        return eqi;
    }

    private Map<String, String> getPpr(){
        Map <String, String> ppr = new HashMap<>();
        //productoproveedor
        ppr.put("ppr", "46713");
        //idprodprov
        ppr.put("ppr1", "467131");
        //idproducto
        ppr.put("ppr2", "467132");
        //idproveedor
        ppr.put("ppr3", "467133");
        //preciocompra
        ppr.put("ppr4", "467134");
        //precioventa
        ppr.put("ppr5", "467135");
        //fechoinicio
        ppr.put("ppr6", "467136");
        //fechafin
        ppr.put("ppr7", "467137");
        //estado
        ppr.put("ppr8", "467138");
        //precioventaminimo
        ppr.put("ppr9", "467139");
        //fecharegistro
        ppr.put("ppr10", "4671310");
        //userregistro
        ppr.put("ppr11", "4671311");
        return ppr;
    }

    private Map<String, String> getPso(){
        Map <String, String> pso = new HashMap<>();
        //productosolucion
        pso.put("pso", "46728");
        //idprodsol
        pso.put("pso1", "467281");
        //idequipo
        pso.put("pso2", "467282");
        //idprodprov
        pso.put("pso3", "467283");
        //cantidad
        pso.put("pso4", "467284");
        //preciounit
        pso.put("pso5", "467285");
        //total
        pso.put("pso6", "467286");
        //subtotal
        pso.put("pso7", "467287");
        //estado
        pso.put("pso8", "467288");
        //fecharegistro
        pso.put("pso9", "467289");
        //userregistro
        pso.put("pso10", "4672810");
        //idproducto
        pso.put("pso11", "4672811");
        //enviadocotizar
        pso.put("pso12", "4672812");
        //cotizado
        pso.put("pso13", "4672813");
        //idprereg
        pso.put("pso14", "4672814");
        //fechasolucion
        pso.put("pso15", "4672815");
        return pso;
    }

    private Map<String, String> getPrp(){
        Map <String, String> prp = new HashMap<>();
        //preregistroproducto
        prp.put("prp", "46743");
        //idprereg
        prp.put("prp1", "467431");
        //idprodsol
        prp.put("prp2", "467432");
        //idproducto
        prp.put("prp3", "467433");
        //nomproducto
        prp.put("prp4", "467434");
        //umedida
        prp.put("prp5", "467435");
        //cantidad
        prp.put("prp6", "467436");
        //estado
        prp.put("prp7", "467437");
        //modelo
        prp.put("prp8", "467438");
        //marca
        prp.put("prp9", "467439");
        return prp;
    }

    private Map<String, String> getOse(){
        Map <String, String> ose = new HashMap<>();
        //otroservicio
        ose.put("ose", "46758");
        //idoserv
        ose.put("ose1", "467581");
        //idsolucion
        ose.put("ose2", "467582");
        //nomservicio
        ose.put("ose3", "467583");
        //descripcion
        ose.put("ose4", "467584");
        //totalmostrar
        ose.put("ose5", "467585");
        //estado
        ose.put("ose6", "467586");
        //idestado
        ose.put("ose7", "467587");
        //fecharegistro
        ose.put("ose8", "467588");
        //userregistro
        ose.put("ose9", "467589");
        return ose;
    }

    private Map<String, String> getSso(){
        Map <String, String> sso = new HashMap<>();
        //serviciossolicitados
        sso.put("sso", "46771");
        //idservsol
        sso.put("sso1", "467711");
        //idestado
        sso.put("sso2", "467712");
        //nomactividad
        sso.put("sso3", "467713");
        //estado
        sso.put("sso4", "467714");
        //fecharegistro
        sso.put("sso5", "467715");
        //userregistro
        sso.put("sso6", "467716");
        return sso;
    }

    private Map<String, String> getSpr(){
        Map <String, String> spr = new HashMap<>();
        //servicioproveedor
        spr.put("spr", "46776");
        //idservprov
        spr.put("spr1", "467761");
        //idservsol
        spr.put("spr2", "467762");
        //idproveedor
        spr.put("spr3", "467763");
        //precio
        spr.put("spr4", "467764");
        //estado
        spr.put("spr5", "467765");
        //fecharegistro
        spr.put("spr6", "467766");
        //userregistro
        spr.put("spr7", "467767");
        return spr;
    }

    private Map<String, String> getSsl(){
        Map <String, String> ssl = new HashMap<>();
        //serviciosolucion
        ssl.put("ssl", "46791");
        //idservicsolu
        ssl.put("ssl1", "467911");
        //idoserv
        ssl.put("ssl2", "467912");
        //idservprov
        ssl.put("ssl3", "467913");
        //nomservicio
        ssl.put("ssl4", "467914");
        //descripcion
        ssl.put("ssl5", "467915");
        //cantidad
        ssl.put("ssl6", "467916");
        //subtotal
        ssl.put("ssl7", "467917");
        //total
        ssl.put("ssl8", "467918");
        //estado
        ssl.put("ssl9", "467919");
        //fecharegistro
        ssl.put("ssl10", "4679110");
        //userregistro
        ssl.put("ssl11", "4679111");
        return ssl;
    }

    private Map<String, String> getPrs(){
        Map <String, String> prs = new HashMap<>();
        //preregistroservicio
        prs.put("prs", "46806");
        //idpreregserv
        prs.put("prs1", "468061");
        //idservsol
        prs.put("prs2", "468062");
        //idservicsolu
        prs.put("prs3", "468063");
        //servsolicitado
        prs.put("prs4", "468064");
        //cantidad
        prs.put("prs5", "468065");
        //estado
        prs.put("prs6", "468066");
        //fecharegistro
        prs.put("prs7", "468067");
        //userregistro
        prs.put("prs8", "468068");
        //descripcion
        prs.put("prs9", "468069");
        return prs;
    }

    private Map<String, String> getAcc(){
        Map <String, String> acc = new HashMap<>();
        //actividadcargo
        acc.put("acc", "56063");
        //idactividad
        acc.put("acc1", "560631");
        //idcargo
        acc.put("acc2", "560632");
        //cantidad
        acc.put("acc3", "560633");
        //horas
        acc.put("acc4", "560634");
        //subtotallaboral
        acc.put("acc5", "560635");
        //totallaboral
        acc.put("acc6", "560636");
        return acc;
    }

    private Map<String, String> getCoe(){
        Map <String, String> coe = new HashMap<>();
        //contactoempresa
        coe.put("coe", "460381");
        //dni
        coe.put("coe1", "4603811");
        return coe;
    }


}
