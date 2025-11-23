import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import api from '../../../services/api';
import './Professores.css';

const Professores = () => {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [professor, setProfessor] = useState({
    nome: '',
    login: '',
    email: '',
    senha: '',
    ativo: true,
  });

  useEffect(() => {
    carregarProfessores();
  }, []);

  const carregarProfessores = async () => {
    try {
      const response = await api.get('/admin/professores');
      setProfessores(response.data);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setProfessor({
      ...professor,
      [e.target.name]: value,
    });
  };

  const abrirModal = (prof = null) => {
    if (prof) {
      setEditando(prof.id);
      setProfessor({
        nome: prof.nome,
        login: prof.login,
        email: prof.email || '',
        senha: '',
        ativo: prof.ativo,
      });
    } else {
      setEditando(null);
      setProfessor({
        nome: '',
        login: '',
        email: '',
        senha: '',
        ativo: true,
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
        await api.put(`/admin/professores/${editando}`, professor);
      } else {
        await api.post('/admin/professores', professor);
      }
      carregarProfessores();
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
      alert('Erro ao salvar professor');
    }
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este professor?')) {
      try {
        await api.delete(`/admin/professores/${id}`);
        carregarProfessores();
      } catch (error) {
        console.error('Erro ao deletar professor:', error);
        alert('Erro ao deletar professor');
      }
    }
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
      <div className="container professores-container">
        <div className="professores-header">
          <h1>Gerenciar Professores</h1>
          <button 
            className="btn btn-primary"
            onClick={() => abrirModal()}
          >
            <i className="fas fa-plus"></i> Novo Professor
          </button>
        </div>

        <div className="professores-table-container card">
          <table className="table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Login</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map((prof) => (
                <tr key={prof.id}>
                  <td>{prof.nome}</td>
                  <td>{prof.login}</td>
                  <td>{prof.email || '-'}</td>
                  <td>
                    <span className={`status-badge ${prof.ativo ? 'ativo' : 'inativo'}`}>
                      {prof.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => abrirModal(prof)}
                        title="Editar"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDeletar(prof.id)}
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

        {showModal && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{editando ? 'Editar Professor' : 'Novo Professor'}</h2>
                <button className="modal-close" onClick={fecharModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label htmlFor="nome">Nome *</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    className="input"
                    value={professor.nome}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login">Login *</label>
                  <input
                    type="text"
                    id="login"
                    name="login"
                    className="input"
                    value={professor.login}
                    onChange={handleChange}
                    disabled={editando}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    value={professor.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="senha">
                    Senha {editando ? '(deixe em branco para não alterar)' : '*'}
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    className="input"
                    value={professor.senha}
                    onChange={handleChange}
                    required={!editando}
                  />
                </div>

                <div className="form-group-checkbox">
                  <input
                    type="checkbox"
                    id="ativo"
                    name="ativo"
                    checked={professor.ativo}
                    onChange={handleChange}
                  />
                  <label htmlFor="ativo">Professor ativo</label>
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
      </div>
    </>
  );
};

export default Professores;
