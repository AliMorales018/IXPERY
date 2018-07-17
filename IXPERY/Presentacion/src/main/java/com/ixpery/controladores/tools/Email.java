package com.ixpery.controladores.tools;

import java.util.Properties;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class Email {
    private String CorreoRemitente = "dantevilla006@gmail.com";
    private String Password = "Danteled246";
    private String Host ="smtp.gmail.com";
    private String Puerto = "587";
    private String dominio = "localhost:8080";

    public void RecuperarCuenta(String correo,String pass) throws Exception{
        Properties props = new Properties();
        props.setProperty("mail.smtp.host", this.Host);
        props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
        props.setProperty("mail.smtp.starttls.enable", "true");
        props.setProperty("mail.smtp.port", this.Puerto);
        props.setProperty("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(props);
        String asunto = "IXPERY SERVICE S.A.C";
        String mensaje = "Su contraseña es: "+pass;

        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(this.CorreoRemitente));
        Address[] receptores = new Address[1];
        receptores[0] = new InternetAddress(correo);
        message.addRecipients(Message.RecipientType.TO, receptores);
        message.setSubject(asunto);
        message.setText(mensaje);
        Transport t = session.getTransport("smtp");
        t.connect(this.Host, Integer.valueOf(this.Puerto), this.CorreoRemitente, this.Password);
        t.sendMessage(message, message.getRecipients(Message.RecipientType.TO));
        t.close();
    }
}
