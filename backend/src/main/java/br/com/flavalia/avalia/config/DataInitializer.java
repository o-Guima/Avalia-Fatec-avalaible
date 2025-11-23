package br.com.flavalia.avalia.config;

import br.com.flavalia.avalia.model.Usuario;
import br.com.flavalia.avalia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existe um usuário admin
        if (!usuarioRepository.existsByLogin("admin")) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setLogin("admin");
            admin.setEmail("admin@fatec.sp.gov.br");
            admin.setSenha(passwordEncoder.encode("admin123"));
            admin.setPerfil(Usuario.Perfil.ADMIN);
            admin.setAtivo(true);
            admin.setCriadoEm(LocalDateTime.now());
            
            usuarioRepository.save(admin);
            System.out.println("✅ Usuário admin criado com sucesso!");
            System.out.println("   Login: admin");
            System.out.println("   Senha: admin123");
        } else {
            System.out.println("ℹ️  Usuário admin já existe no banco de dados");
        }
    }
}
