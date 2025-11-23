package br.com.flavalia.avalia.controller;

import br.com.flavalia.avalia.model.Usuario;
import br.com.flavalia.avalia.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"}, allowCredentials = "true")
public class AdminController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/professores")
    public ResponseEntity<List<Usuario>> listarProfessores() {
        return ResponseEntity.ok(usuarioService.listarProfessores());
    }
    
    @GetMapping("/professores/{id}")
    public ResponseEntity<Usuario> buscarProfessor(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(usuarioService.buscarPorId(id));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/professores")
    public ResponseEntity<Usuario> criarProfessor(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario novoProfessor = usuarioService.criarProfessor(usuario);
            return ResponseEntity.status(HttpStatus.CREATED).body(novoProfessor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/professores/{id}")
    public ResponseEntity<Usuario> atualizarProfessor(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        try {
            Usuario professorAtualizado = usuarioService.atualizarProfessor(id, usuario);
            return ResponseEntity.ok(professorAtualizado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/professores/{id}")
    public ResponseEntity<Void> deletarProfessor(@PathVariable Long id) {
        try {
            usuarioService.deletarProfessor(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
