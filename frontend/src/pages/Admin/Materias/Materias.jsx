import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import api from '../../../services/api';
import './Materias.css';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showAssocModal, setShowAssocModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [materiaAtual, setMateriaAtual] = useState(null);
  const [materia, setMateria] = useState({
    nome: '',
    descricao: '',
    ativa: true,
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [materiasRes, professoresRes] = await Promise.all([
        api.get('/admin/materias'),
        api.get('/admin/professores')
      ]);
      setMaterias(materiasRes.data);
      setProfessores(professoresRes.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setMateria({
      ...materia,
      [e.target.name]: value,
    });
  };

  const abrirModal = (mat = null) => {
    if (mat) {
      setEditando(mat.id);
      setMateria({
        nome: mat.nome,
        descricao: mat.descricao || '',
        ativa: mat.ativa,
      });
    } else {
      setEditando(null);
      setMateria({
        nome: '',
        descricao: '',
        ativa: true,
      });
    }
    setShowModal(true);
  };

  const fecharModal = () => {
    setShowModal(false);
    setEditando(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/admin/materias/${editando}`, materia);
      } else {
        await api.post('/admin/materias', materia);
      }
      carregarDados();
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar matéria:', error);
      alert('Erro ao salvar matéria');
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta matéria?')) {
      try {
        await api.delete(`/admin/materias/${id}`);
        carregarDados();
      } catch (error) {
        console.error('Erro ao deletar matéria:', error);
        alert('Erro ao deletar matéria');
      }
    }
  };

  const abrirModalAssociacao = (mat) => {
    setMateriaAtual(mat);
    setShowAssocModal(true);
  };

  const fecharModalAssociacao = () => {
    setShowAssocModal(false);
    setMateriaAtual(null);
  };

  const handleAssociar = async (professorId) => {
    try {
      await api.post(`/admin/materias/${materiaAtual.id}/professores/${professorId}`);
      carregarDados();
    } catch (error) {
      console.error('Erro ao associar professor:', error);
      alert('Erro ao associar professor');
    }
  };

  const handleDesassociar = async (professorId) => {
    try {
      await api.delete(`/admin/materias/${materiaAtual.id}/professores/${professorId}`);
      carregarDados();
    } catch (error) {
      console.error('Erro ao desassociar professor:', error);
      alert('Erro ao desassociar professor');
    }
  };

  const getProfessoresAssociados = (materia) => {
    return materia?.professores || [];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Carregando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container materias-container">
        <div className="materias-header">
          <h1>Gerenciar Matérias</h1>
          <button 
            className="btn btn-primary"
            onClick={() => abrirModal()}
          >
            <i className="fas fa-plus"></i> Nova Matéria
          </button>
        </div>

        <div className="materias-table-container card">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Professores</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((mat) => (
                <tr key={mat.id}>
                  <td><strong>{mat.nome}</strong></td>
                  <td>{mat.descricao || '-'}</td>
                  <td>
                    <span className="badge badge-info">
                      {getProfessoresAssociados(mat).length} professor(es)
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${mat.ativa ? 'ativo' : 'inativo'}`}>
                      {mat.ativa ? 'Ativa' : 'Inativa'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-icon btn-secondary"
                        onClick={() => abrirModalAssociacao(mat)}
                        title="Gerenciar Professores"
                      >
                        <i className="fas fa-users"></i>
                      </button>
                      <button 
                        className="btn-icon"
                        onClick={() => abrirModal(mat)}
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDeletar(mat.id)}
                        title="Deletar"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Criar/Editar Matéria */}
        {showModal && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editando ? 'Editar Matéria' : 'Nova Matéria'}</h2>
                <button className="modal-close" onClick={fecharModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome da Matéria *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="input"
                    value={materia.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descricao">Descrição</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    className="input"
                    rows="3"
                    value={materia.descricao}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-checkbox">
                  <input
                    type="checkbox"
                    id="ativa"
                    name="ativa"
                    checked={materia.ativa}
                    onChange={handleChange}
                  />
                  <label htmlFor="ativa">Matéria ativa</label>
                </div>

                <div className="modal-actions">
                  <button type="button" className="btn btn-secondary" onClick={fecharModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editando ? 'Atualizar' : 'Criar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de Associação de Professores */}
        {showAssocModal && materiaAtual && (
          <div className="modal-overlay" onClick={fecharModalAssociacao}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Professores - {materiaAtual.nome}</h2>
                <button className="modal-close" onClick={fecharModalAssociacao}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="professores-list">
                {professores.map((prof) => {
                  const isAssociado = prof.materias?.some(m => m.id === materiaAtual.id);
                  return (
                    <div key={prof.id} className="professor-item">
                      <div className="professor-info">
                        <i className="fas fa-user-circle"></i>
                        <div>
                          <strong>{prof.nome}</strong>
                          <span className="professor-login">{prof.login}</span>
                        </div>
                      </div>
                      <button
                        className={`btn ${isAssociado ? 'btn-danger' : 'btn-primary'}`}
                        onClick={() => isAssociado ? handleDesassociar(prof.id) : handleAssociar(prof.id)}
                      >
                        {isAssociado ? (
                          <><i className="fas fa-minus-circle"></i> Remover</>
                        ) : (
                          <><i className="fas fa-plus-circle"></i> Adicionar</>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Materias;
