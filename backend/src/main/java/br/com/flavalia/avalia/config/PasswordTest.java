package br.com.flavalia.avalia.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class PasswordTest implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String senhaTexto = "admin123";
        String senhaHash = passwordEncoder.encode(senhaTexto);
        
        System.out.println("\n========== TESTE DE SENHA ==========");
        System.out.println("Senha em texto: " + senhaTexto);
        System.out.println("Senha hash gerada: " + senhaHash);
        System.out.println("Teste de validação: " + passwordEncoder.matches(senhaTexto, senhaHash));
        System.out.println("====================================\n");
    }
}
