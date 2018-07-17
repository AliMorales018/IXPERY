package com.ixpery.controladores.sys;

import com.ixpery.controladores.tools.Email;
import com.ixpery.entidades.sys.EAplicacion;
import com.ixpery.entidades.sys.EPerfil;
import com.ixpery.entidades.sys.EUsuario;
import com.ixpery.negocio.sys.BUsuario;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
public class CIndex {

    ApplicationContext applicationContext = new ClassPathXmlApplicationContext("beansBusiness.xml");
    BUsuario obUsuario = (BUsuario) applicationContext.getBean("beanUsuario");

    @RequestMapping(value = "/")
    public ModelAndView Index(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception{
        HttpSession session = request.getSession();
        ModelAndView modelView = new ModelAndView("index");
        modelView = Mensaje(session, modelView);
        Integer Acceso = (Integer)session.getAttribute("access");
        if(Acceso != null){
            modelView.addObject("user",session.getAttribute("user"));
            modelView.addObject("pass",session.getAttribute("pass"));
        }
        else {
            session.removeAttribute("access");
            session.invalidate();
        }
        return modelView;
    }

    private Integer ValidarUsuario(HttpSession session){
        Integer acceso = (Integer)session.getAttribute("access");
        if(acceso!=null){
            return acceso;
        }else{
            return null;
        }
    }

    @RequestMapping(value="/validar",method = RequestMethod.POST)
    public void Login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(value="txtUser") String User,
            @RequestParam(value="txtPassword") String Pass,
            @RequestParam(value="selectApli") Integer ida,
            @RequestParam(value="selectPerfil") Integer idp
    )throws Exception{
        System.out.println(User);
        System.out.println(Pass);
        System.out.println(ida);
        System.out.println(idp);
        Integer access = obUsuario.ValidarUsuario(new EUsuario(User,Pass));
        User = User.trim();
        Pass = Pass.trim();
        HttpSession session = request.getSession(true);
        //Pass = Encriptacion.encrypt(Pass);
        System.out.println(Pass);
        if(access != 0){
            if(ida != 0 && idp != 0) {
                session.setAttribute("aplicacion", ida);
                session.setAttribute("perfil", idp);
                response.sendRedirect("/SistemaIntegral");
            }
            else{
                session.setAttribute("access", access);
                session.setAttribute("user", User);
                session.setAttribute("pass", Pass);
                session.setAttribute("mensaje", "Seleccione Aplicación");
                session.setAttribute("type", "3");
                response.sendRedirect("/");
            }

        }else{
            session.setAttribute("mensaje", "Usuario no Encontrado o Inactivo");
            session.setAttribute("type", "1");
            session.removeAttribute("access");
            response.sendRedirect("/");
        }
    }

    private ModelAndView Mensaje(HttpSession session,ModelAndView model){
        //Type 1: Error, Type 2: Success, Type 3: Info, Type 4:Warning
        if(session.getAttribute("mensaje")!=null){
            model.addObject("mensaje", session.getAttribute("mensaje"));
            model.addObject("type", session.getAttribute("type"));
            session.removeAttribute("mensaje");
            session.removeAttribute("type");
        }
        return model;
    }

    @RequestMapping("/validar/aplicaciones")
    private @ResponseBody String VerAPlicaciones(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws Exception{
        HttpSession session = request.getSession();
        Integer acceso = ValidarUsuario(session);
        if(acceso == null){
            return null;
        }
        else{
            String html= "";
            List<EAplicacion> listApli = obUsuario.VerApliUsuario(new EUsuario(acceso));
            html += "<option value='0'>Seleccione ...</option>";
            for (int i = 0; i < listApli.size(); i++){
                html += "<option value='"+listApli.get(i).getIdapli()+"'>"+listApli.get(i).getAplicacion()+"</option>";
            }
            return html;
        }
    }

    @RequestMapping("/validar/perfil")
    private @ResponseBody String VerPerfilesApliUser(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(value="i") Integer id
    ) throws Exception{
        HttpSession session = request.getSession();
        Integer acceso = ValidarUsuario(session);
        if(acceso == null){
            return null;
        }
        else{
            String html= "";
            List<EPerfil> listPerfil = obUsuario.VerPerfApliUsuario(new EUsuario(acceso), new EAplicacion(id));
            html += "<option value='0'>Seleccione ...</option>";
            for (int i = 0; i < listPerfil.size(); i++){
                html += "<option value='"+listPerfil.get(i).getIdperfil()+"'>"+listPerfil.get(i).getPerfil()+"</option>";
            }
            return html;
        }
    }

    @RequestMapping("/recuperar")
    private @ResponseBody String RecuperarDatos(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam(value="value") String value
    ) throws Exception{
        String msj = "";
        List<String[]> User = obUsuario.VerUsuarioPorEmail(value);
        if(User.size() > 0){
            String[] row = User.get(0);
            Email email = new Email();
            email.RecuperarCuenta(row[7],row[5]);
            return "Se enviaron sus datos a " + row[7];
        }
        else{
            return "No se encontró una cuenta enlazada";
        }
    }

    //Dante
    @RequestMapping(value="/logout",method = RequestMethod.GET)
    public void Logout(
            HttpServletRequest request,
            HttpServletResponse response
    )throws Exception{
        HttpSession session = request.getSession();
        session.invalidate();
        System.out.println("Sesion Invalidada.");
        response.sendRedirect("/");
    }
    //Dante
}
