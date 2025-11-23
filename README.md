# 🎓 FLAVALIA - Sistema de Avaliações FATEC

Sistema completo para criação e gerenciamento de avaliações acadêmicas, desenvolvido para instituições de ensino.

## 📋 Sobre o Projeto

O **FLAVALIA** é uma plataforma web que permite:
- **Coordenadores**: Gerenciar professores do sistema
- **Professores**: Cadastrar questões e criar avaliações em PDF

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.4.12**
- **Spring Security** (autenticação JWT)
- **Spring Data JPA** (persistência)
- **MySQL** (banco de dados)
- **OpenPDF** (geração de PDFs)
- **Lombok** (redução de boilerplate)

### Frontend
- **React 19.2**
- **React Router DOM** (navegação)
- **Axios** (requisições HTTP)
- **Font Awesome** (ícones)
- **CSS3** (estilização com tema dark)

## 🚀 Como Executar o Projeto

### Pré-requisitos

1. **Java 17** ou superior
2. **Node.js 18** ou superior
3. **MySQL** (via XAMPP ou instalação local)
4. **Maven** (geralmente incluído na IDE)

### 1️⃣ Configurar o Banco de Dados

1. Inicie o **XAMPP** e ative o MySQL
2. O banco de dados `avalia_db` será criado automaticamente na primeira execução
3. Um usuário admin será criado automaticamente:
   - **Login**: `admin`
   - **Senha**: `admin123`

### 2️⃣ Executar o Backend

```bash
# Navegue até a pasta do backend
cd backend

# Execute o projeto com Maven
./mvnw spring-boot:run

# Ou no Windows
mvnw.cmd spring-boot:run
```

O backend estará rodando em: `http://localhost:8080`

### 3️⃣ Executar o Frontend

```bash
# Navegue até a pasta do frontend
cd frontend

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

O frontend estará rodando em: `http://localhost:5173`

## 👤 Credenciais de Acesso

### Administrador (Coordenador)
- **Login**: `admin`
- **Senha**: `admin123`

### Professores
Devem ser criados pelo administrador através do sistema.

## 📱 Funcionalidades

### Para Coordenadores (Admin)
- ✅ Criar novos professores
- ✅ Editar informações de professores
- ✅ Ativar/desativar professores
- ✅ Deletar professores

### Para Professores
- ✅ Cadastrar questões de múltipla escolha
- ✅ Definir matéria, tópico, nível de dificuldade e pontuação
- ✅ Adicionar múltiplas alternativas (mínimo 2)
- ✅ Marcar alternativa correta
- ✅ Visualizar banco de questões
- ✅ Editar e deletar questões
- ✅ Criar avaliações selecionando questões
- ✅ Gerar PDF da avaliação
- ✅ Gerenciar avaliações criadas

## 🎨 Identidade Visual

O sistema segue a identidade visual da FATEC com:
- **Tema Dark** moderno e profissional
- **Cor Primária**: Vermelho FATEC (#d90429)
- **Fonte**: Roboto
- **Design**: Responsivo e acessível

## 📁 Estrutura do Projeto

```
DEFINITIVO-avalia/
├── backend/
│   ├── src/main/java/br/com/flavalia/avalia/
│   │   ├── controller/      # Controllers REST
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── model/           # Entidades JPA
│   │   ├── repository/      # Repositórios
│   │   ├── security/        # Configuração de segurança
│   │   └── service/         # Lógica de negócio
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql         # Script de inicialização
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── context/         # Context API (Auth)
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços de API
│   │   └── styles/          # Estilos globais
│   └── index.html
│
├── prd.md                   # Documento de requisitos
├── identidade-visual.md     # Guia de identidade visual
└── README.md               # Este arquivo
```

## 🔒 Segurança

- Autenticação via **JWT (JSON Web Token)**
- Senhas criptografadas com **BCrypt**
- Rotas protegidas por perfil de usuário
- CORS configurado para desenvolvimento

## 📊 Modelo de Dados

### Entidades Principais

1. **Usuario**
   - Perfis: ADMIN ou PROFESSOR
   - Autenticação e autorização

2. **Questao**
   - Matéria, tópico, enunciado
   - Nível de dificuldade e pontuação
   - Relacionada ao professor criador

3. **Alternativa**
   - Texto da alternativa
   - Letra (A, B, C, D...)
   - Flag de correta

4. **Avaliacao**
   - Título e turma
   - Lista de questões selecionadas
   - Relacionada ao professor

## 🐛 Solução de Problemas

### Backend não inicia
- Verifique se o MySQL está rodando
- Confirme as credenciais em `application.properties`
- Verifique se a porta 8080 está livre

### Frontend não conecta ao backend
- Confirme que o backend está rodando
- Verifique a URL da API em `src/services/api.js`
- Limpe o cache do navegador

### Erro ao gerar PDF
- Verifique se a avaliação tem questões selecionadas
- Confirme que as questões têm alternativas cadastradas

## 📝 Próximas Melhorias

- [ ] Edição de avaliações existentes
- [ ] Filtros e busca de questões
- [ ] Estatísticas de uso
- [ ] Exportação de questões
- [ ] Temas personalizáveis
- [ ] Questões dissertativas

## 👨‍💻 Desenvolvimento

Desenvolvido seguindo as melhores práticas:
- Clean Code
- SOLID Principles
- RESTful API
- Component-Based Architecture
- Responsive Design

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido com ❤️ para FATEC**  
*Mantendo a tradição, abraçando a inovação*
