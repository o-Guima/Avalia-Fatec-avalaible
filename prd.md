Aqui está uma proposta de **Documento de Requisitos de Produto (PRD)** para o Projeto Flavalia, estruturado de forma profissional para orientar o desenvolvimento.

---

# Documento de Requisitos de Produto (PRD)
**Projeto:** Flavalia - Sistema de Avaliações  
**Versão:** 1.0  
**Status:** Rascunho Inicial

## 1. Introdução e Objetivo
O **Projeto Flavalia** é uma plataforma web destinada a instituições de ensino, com o objetivo de facilitar o processo de elaboração de provas. O sistema permite que coordenadores gerenciem o acesso dos docentes e que professores cadastrem questões de múltipla escolha para gerar avaliações em formato PDF de forma automatizada e padronizada.

## 2. Personas (Atores do Sistema)
O sistema possuirá dois perfis de usuário distintos:

1.  **Coordenador (Admin):** Responsável pela administração dos usuários do sistema.
2.  **Professor:** Responsável pelo conteúdo (questões) e pela geração das provas.

## 3. Tecnologias e Arquitetura (Stack)
Conforme definido, o projeto utilizará a seguinte pilha tecnológica:
*   **Frontend:** React JS (Interface do usuário).
*   **Backend:** Java Spring (API REST e Lógica de negócio).
*   **Banco de Dados:** MySQL (Hospedado localmente via XAMPP).
*   **Geração de Arquivos:** Biblioteca OpenPDF (Java).

## 4. Requisitos Funcionais (RF)

### Módulo de Autenticação e Administração
*   **[RF-001] Login de Usuários:** O sistema deve permitir o login diferenciado para Coordenadores e Professores.
*   **[RF-002] Gestão de Professores:** O Coordenador deve ser capaz de criar contas para novos professores (cadastrando nome, email/usuário e senha inicial).

### Módulo de Questões (Professor)
*   **[RF-003] Cadastro de Questões:** O professor poderá cadastrar novas questões contendo:
    *   Enunciado da questão (texto).
    *   Alternativas de resposta.
*   **[RF-004] Validação de Alternativas:** O sistema deve obrigar o cadastro de, no mínimo, **duas alternativas** por questão.
    *   *Critério de Aceite:* O botão de "Salvar" deve ficar desabilitado ou retornar erro caso haja apenas 0 ou 1 alternativa inserida.
*   **[RF-005] Listagem de Questões:** O professor deve visualizar as questões cadastradas para poder selecioná-las.

### Módulo de Geração de Prova
*   **[RF-006] Seleção de Questões:** O professor deve poder selecionar múltiplas questões cadastradas para compor uma prova específica.
*   **[RF-007] Geração de PDF:** O sistema deve compilar as questões selecionadas e gerar um arquivo PDF para download.
*   **[RF-008] Personalização do PDF:** O documento gerado deve seguir um template obrigatório contendo:
    *   Cabeçalho com a **Logo da Instituição**.
    *   Nome do **Professor** responsável (recuperado do login).
    *   As questões numeradas com suas respectivas alternativas.

## 5. Regras de Negócio (RN)

*   **[RN-001] Hierarquia de Acesso:** Professores não podem criar contas de outros professores; apenas o Coordenador tem essa permissão.
*   **[RN-002] Integridade da Questão:** Uma questão não pode existir sem alternativas viáveis (mínimo 2) para garantir a lógica de múltipla escolha.

## 6. Detalhamento da Interface (Sugestão UX/UI)

### Frontend (React JS)
1.  **Tela de Login:** Campos simples de Usuário/Senha.
2.  **Dashboard do Coordenador:** Tabela listando professores com botão "Novo Professor".
3.  **Dashboard do Professor:**
    *   Botão "Nova Questão".
    *   Lista de questões com `checkbox` ao lado de cada uma para seleção.
    *   Botão flutuante ou fixo "Gerar Prova" (ativado após selecionar questões).
4.  **Formulário de Questão:**
    *   `Textarea` para o Enunciado.
    *   Lista dinâmica de `inputs` para Alternativas (Botão "Adicionar Alternativa").

### Backend (Java Spring + OpenPDF)
*   **Endpoint `/auth`:** Para validação de login e roles (Admin/User).
*   **Endpoint `/users`:** POST para criar professores (Apenas Admin).
*   **Endpoint `/questions`:** POST e GET para gerenciar questões.
*   **Endpoint `/exam/pdf`:** Recebe uma lista de IDs de questões -> Utiliza o **OpenPDF** para desenhar o documento -> Retorna um `byte[]` ou `Blob` com o PDF application/pdf.

## 7. Modelo de Dados (Sugestão Simples MySQL)

*   **Tabela `usuarios`:** id, nome, login, senha, perfil (ADMIN/PROFESSOR).
*   **Tabela `questoes`:** id, enunciado, id_professor_criador.
*   **Tabela `alternativas`:** id, texto_alternativa, id_questao.

---

### Próximos Passos
1.  Configurar ambiente XAMPP e criar o banco de dados.
2.  Iniciar projeto Spring Boot e configurar conexão JPA/Hibernate.
3.  Criar a entidade de Usuário e a lógica de Login.
4.  Implementar o CRUD de Questões com a validação de 2 alternativas.
5.  Desenvolver o serviço de geração de PDF com OpenPDF.
6.  Construir o Frontend em React e integrar com a API.