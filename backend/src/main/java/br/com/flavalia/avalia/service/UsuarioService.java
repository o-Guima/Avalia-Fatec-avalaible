package br.com.flavalia.avalia.service;

import br.com.flavalia.avalia.model.Usuario;
import br.com.flavalia.avalia.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
    
    public List<Usuario> listarProfessores() {
        return usuarioRepository.findByPerfil(Usuario.Perfil.PROFESSOR);
    }
    
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
    
    public Usuario criarProfessor(Usuario usuario) {
        if (usuarioRepository.existsByLogin(usuario.getLogin())) {
            throw new RuntimeException("Login já existe");
        }
        
        if (usuario.getEmail() != null && usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já existe");
        }
        
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setPerfil(Usuario.Perfil.PROFESSOR);
        usuario.setAtivo(true);
        
        return usuarioRepository.save(usuario);
    }
    
    public Usuario atualizarProfessor(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);
        
        usuario.setNome(usuarioAtualizado.getNome());
        
        if (usuarioAtualizado.getEmail() != null && !usuarioAtualizado.getEmail().equals(usuario.getEmail())) {
            if (usuarioRepository.existsByEmail(usuarioAtualizado.getEmail())) {
                throw new RuntimeException("Email já existe");
            }
            usuario.setEmail(usuarioAtualizado.getEmail());
        }
        
        if (usuarioAtualizado.getSenha() != null && !usuarioAtualizado.getSenha().isEmpty()) {
            usuario.setSenha(passwordEncoder.encode(usuarioAtualizado.getSenha()));
        }
        
        if (usuarioAtualizado.getAtivo() != null) {
            usuario.setAtivo(usuarioAtualizado.getAtivo());
        }
        
        return usuarioRepository.save(usuario);
    }
    
    public void deletarProfessor(Long id) {
        Usuario usuario = buscarPorId(id);
        if (usuario.getPerfil() == Usuario.Perfil.ADMIN) {
            throw new RuntimeException("Não é possível deletar um administrador");
        }
        usuarioRepository.deleteById(id);
    }
}
