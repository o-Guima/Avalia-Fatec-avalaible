# 🔒 Medidas de Segurança - Sistema Avalia FATEC

## Resumo
Este documento descreve todas as medidas de segurança implementadas no sistema para proteger contra acessos não autorizados.

---

## 🛡️ Backend (Spring Boot)

### 1. **Spring Security**
- ✅ Configuração completa de segurança em `SecurityConfig.java`
- ✅ Autenticação stateless (sem sessões)
- ✅ CSRF desabilitado (apropriado para APIs REST)

### 2. **Proteção de Endpoints**
```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**").permitAll()           // Apenas login público
    .requestMatchers("/api/admin/**").hasAuthority("ADMIN") // Apenas ADMIN
    .requestMatchers("/api/professor/**").hasAnyAuthority("PROFESSOR", "ADMIN")
    .anyRequest().authenticated()                          // Tudo mais requer autenticação
)
```

### 3. **JWT (JSON Web Token)**
- ✅ Tokens assinados com chave secreta
- ✅ Validação de token em cada requisição via `JwtAuthenticationFilter`
- ✅ Extração automática de username e authorities
- ✅ Tokens incluem perfil do usuário (ADMIN/PROFESSOR)

### 4. **Filtro de Autenticação JWT**
- ✅ `JwtAuthenticationFilter` intercepta todas as requisições
- ✅ Valida token antes de permitir acesso
- ✅ Adiciona autenticação ao SecurityContext
- ✅ Tratamento de erros para tokens inválidos/expirados

### 5. **Senha Criptografada**
- ✅ BCrypt para hash de senhas
- ✅ Senhas nunca armazenadas em texto plano
- ✅ Validação automática via `DaoAuthenticationProvider`

### 6. **CORS Configurado**
- ✅ Apenas origens específicas permitidas
- ✅ Credenciais habilitadas
- ✅ Headers de autorização expostos

---

## 🔐 Frontend (React)

### 1. **ProtectedRoute Component**
Proteção em três camadas:

```javascript
// 1. Verifica se há token válido
if (!isAuthenticated()) {
    logout();
    return <Navigate to="/login" />;
}

// 2. Verifica se usuário existe no contexto
if (!user) {
    logout();
    return <Navigate to="/login" />;
}

// 3. Verifica se o perfil corresponde
if (requiredRole && user.perfil !== requiredRole) {
    // Redireciona para página apropriada
    return <Navigate to={redirectPath} />;
}
```

### 2. **LoginRoute Component**
- ✅ Impede acesso à página de login quando já autenticado
- ✅ Redireciona automaticamente para dashboard apropriado

### 3. **AuthContext com Validação Periódica**
- ✅ Verifica validade do token ao carregar
- ✅ Validação automática a cada 1 minuto
- ✅ Logout automático se token expirar
- ✅ Estado de loading para evitar flashes de conteúdo

### 4. **Interceptor Axios**
```javascript
// Request Interceptor
- Adiciona token JWT em todas as requisições automaticamente

// Response Interceptor
- Detecta erros 401/403
- Remove token e dados do usuário
- Redireciona para login automaticamente
```

### 5. **Armazenamento Seguro**
- ✅ Token armazenado em `localStorage`
- ✅ Dados do usuário armazenados em `localStorage`
- ✅ Limpeza completa no logout

### 6. **Logout Seguro**
```javascript
const handleLogout = () => {
    logout();                              // Limpa contexto
    navigate('/login', { replace: true }); // Remove histórico
    window.location.href = '/login';       // Força reload completo
};
```

---

## 🚫 Proteções Implementadas

### ❌ Tentativas de Acesso Bloqueadas:

1. **Digitar URL diretamente sem login**
   - `/admin/professores` → Redireciona para `/login`
   - `/professor/avaliacoes` → Redireciona para `/login`

2. **Professor tentando acessar área de Admin**
   - `/admin/professores` → Redireciona para `/professor/avaliacoes`

3. **Admin tentando acessar área de Professor**
   - Permitido (Admin tem acesso total)

4. **Token expirado**
   - Frontend: Logout automático + redirecionamento
   - Backend: Retorna 401 Unauthorized

5. **Token inválido/manipulado**
   - Backend: Rejeita requisição
   - Frontend: Interceptor força logout

6. **Usuário já logado tentando acessar /login**
   - Redireciona para dashboard apropriado

7. **Manipulação de localStorage**
   - Token validado no backend em cada requisição
   - Token inválido = acesso negado

---

## 🔍 Fluxo de Autenticação

### Login:
1. Usuário envia credenciais
2. Backend valida via Spring Security
3. Backend gera JWT com perfil do usuário
4. Frontend armazena token e dados do usuário
5. Frontend redireciona para dashboard apropriado

### Requisições Protegidas:
1. Frontend adiciona token no header `Authorization: Bearer {token}`
2. Backend valida token via `JwtAuthenticationFilter`
3. Backend verifica authorities (ADMIN/PROFESSOR)
4. Se válido: processa requisição
5. Se inválido: retorna 401/403

### Logout:
1. Frontend remove token e dados do localStorage
2. Frontend limpa contexto de autenticação
3. Frontend redireciona para login
4. Frontend força reload da página

---

## ✅ Checklist de Segurança

- [x] Autenticação JWT implementada
- [x] Tokens validados em cada requisição
- [x] Senhas criptografadas com BCrypt
- [x] Rotas protegidas no backend por perfil
- [x] Rotas protegidas no frontend por perfil
- [x] Interceptor para tokens expirados
- [x] Validação periódica de token
- [x] Logout completo e seguro
- [x] CORS configurado corretamente
- [x] Redirecionamento baseado em perfil
- [x] Proteção contra acesso direto via URL
- [x] Limpeza de estado no logout
- [x] Tratamento de erros de autenticação

---

## 🎯 Resultado Final

O sistema está **completamente protegido** contra:
- ✅ Acesso não autenticado
- ✅ Acesso com token expirado
- ✅ Acesso com token inválido
- ✅ Acesso a recursos sem permissão
- ✅ Manipulação de dados no frontend
- ✅ Acesso direto via URL

**Não é possível acessar nenhuma página protegida sem estar devidamente autenticado e autorizado!**
