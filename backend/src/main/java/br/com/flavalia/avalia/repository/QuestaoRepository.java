package br.com.flavalia.avalia.repository;

import br.com.flavalia.avalia.model.Questao;
import br.com.flavalia.avalia.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestaoRepository extends JpaRepository<Questao, Long> {
    List<Questao> findByProfessor(Usuario professor);
    List<Questao> findByProfessorId(Long professorId);
    List<Questao> findByMateria(String materia);
    List<Questao> findByNivelDificuldade(Questao.NivelDificuldade nivelDificuldade);
}
