package com.ixpery.controladores.tools;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import static org.apache.commons.codec.binary.Base64.decodeBase64;
import static org.apache.commons.codec.binary.Base64.encodeBase64;

public class Encriptacion {

    private static String key = "92AE31A79FEEB2A3";
    private static String iv = "0123456789ABCDEF";

    public static String NuevaPass(){
        String Letras = "aZbYcXdWeVfUgThSiRjQkPlOmÑnNñMoLpKqJrIsHtGuFvEwDxCyBzA";
        int n = Letras.length();
        int aleatorio;
        String pass = "";
        for (int i = 0; i < 10; i++) {
            aleatorio = (int) (Math.random() * n);
            if(aleatorio == n){
                aleatorio--;
            }
            pass = pass + Letras.substring(aleatorio, aleatorio+1);
        }
        return pass;
    }

    private final static String alg = "AES";
    private final static String cI = "AES/CBC/PKCS5Padding";

    public static String encrypt(String cleartext) throws Exception {
        Cipher cipher = Cipher.getInstance(cI);
        SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), alg);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, skeySpec, ivParameterSpec);
        byte[] encrypted = cipher.doFinal(cleartext.getBytes());
        return new String(Base64.encodeBase64(encrypted));
    }

    public static String decrypt(String encrypted) throws Exception {
        Cipher cipher = Cipher.getInstance(cI);
        SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes(), alg);
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes());
        byte[] enc = Base64.decodeBase64(encrypted);
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, ivParameterSpec);
        byte[] decrypted = cipher.doFinal(enc);
        return new String(decrypted);
    }

    public static void main(String[] args) throws Exception {
        String codigo = "8";
        String codigo2 = "8";

        codigo = encrypt(codigo);
        codigo2 = encrypt(codigo2);
        //String cleartext = "k4MYtCKA+3OecPc80T8dOQ==";
        //cleartext = decrypt(cleartext);
        System.out.println(codigo);
        System.out.println(codigo2);
    }
}