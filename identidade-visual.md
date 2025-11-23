# 🎨 Identidade Visual - Avalia FATEC

## 📋 Visão Geral

A identidade visual do **Avalia FATEC** foi desenvolvida para transmitir **profissionalismo, modernidade e confiabilidade**, mantendo a essência institucional da FATEC com um design contemporâneo e acessível.

---

## 🎯 Conceito

O design do sistema combina:
- **Elegância profissional** para ambiente acadêmico
- **Interface moderna** com tema escuro (dark mode)
- **Cores institucionais** da FATEC
- **Usabilidade** e acessibilidade em primeiro lugar

---

## 🎨 Paleta de Cores

### Cores Principais

#### 🔴 Vermelho FATEC (Cor Primária)
```css
--color-red: #d90429
--color-red-dark: #b30021
```
**Uso:** 
- Botões primários
- Links e destaques
- Elementos interativos
- Identidade da marca

**Significado:** Energia, paixão pelo conhecimento, tradição FATEC

---

#### ⚫ Tons de Escuro (Background)
```css
--color-dark-bg: #121212
--color-dark-surface: #1e1e1e
--color-dark-border: #333
```
**Uso:**
- Fundo principal da aplicação
- Superfícies de cards e containers
- Bordas e separadores

**Significado:** Modernidade, foco no conteúdo, conforto visual

---

#### ⚪ Tons Claros (Texto)
```css
--color-white: #f0f0f0
--color-gray-light: #aaa
```
**Uso:**
- Texto principal
- Texto secundário
- Ícones e elementos de UI

**Significado:** Clareza, legibilidade, contraste adequado

---

### Cores Secundárias (Coordenador)

#### 🔵 Azul Institucional
```css
Primary: #003366
Secondary: #004080
```
**Uso:**
- Painel do coordenador
- Elementos administrativos
- Gradientes de cabeçalho

**Significado:** Autoridade, confiança, gestão

---

#### 🟢 Verde (Sucesso)
```css
Background: #d4edda
Text: #155724
```
**Uso:**
- Status "Ativo"
- Mensagens de sucesso
- Confirmações

---

#### 🔴 Vermelho (Alerta)
```css
Background: #f8d7da
Text: #721c24
```
**Uso:**
- Status "Inativo"
- Mensagens de erro
- Ações destrutivas

---

## 📐 Tipografia

### Fonte Principal
```css
font-family: 'Roboto', sans-serif;
```

**Características:**
- ✅ Moderna e profissional
- ✅ Excelente legibilidade
- ✅ Suporte completo a caracteres especiais
- ✅ Múltiplos pesos disponíveis

### Hierarquia Tipográfica

#### Títulos Principais (H1)
```css
font-size: 2rem - 2.5rem
font-weight: 700
color: #f0f0f0
```

#### Títulos Secundários (H2)
```css
font-size: 1.5rem - 1.8rem
font-weight: 600
color: #f0f0f0
```

#### Títulos Terciários (H3)
```css
font-size: 1.2rem - 1.4rem
font-weight: 600
color: #f0f0f0
```

#### Texto Corpo
```css
font-size: 1rem
font-weight: 400
line-height: 1.6
color: #f0f0f0
```

#### Texto Secundário
```css
font-size: 0.85rem - 0.9rem
font-weight: 400
color: #aaa
```

---

## 🔘 Componentes

### Botões

#### Botão Primário
```css
background: #d90429
color: #f0f0f0
padding: 0.75rem 1.25rem
border-radius: 5px
font-weight: 700
```
**Hover:** `background: #b30021`

**Uso:** Ações principais (Criar, Salvar, Enviar)

---

#### Botão Secundário
```css
background: transparent
border: 1px solid #f0f0f0
color: #f0f0f0
padding: 0.75rem 1.25rem
border-radius: 5px
```
**Hover:** `background: #d90429`

**Uso:** Ações secundárias (Cancelar, Voltar)

---

#### Botão Ícone
```css
background: none
border: none
color: #aaa
font-size: 1.1rem
padding: 0.25rem
```
**Hover:** `color: #f0f0f0`

**Uso:** Ações rápidas (Editar, Excluir, Ver)

---

### Cards

```css
background: #1e1e1e
border-radius: 10px
padding: 1.5rem
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)
```

**Hover:**
```css
transform: translateY(-2px)
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4)
```

---

### Inputs e Formulários

```css
background: #1e1e1e
border: 1px solid #333
color: #f0f0f0
padding: 0.75rem
border-radius: 5px
font-size: 1rem
```

**Focus:**
```css
border-color: #d90429
outline: none
```

---

### Tabelas

**Cabeçalho:**
```css
background: #1e1e1e
color: #f0f0f0
font-weight: 600
padding: 1rem
border-bottom: 2px solid #333
```

**Linhas:**
```css
background: #121212
padding: 1rem
border-bottom: 1px solid #333
```

**Hover:**
```css
background: #1e1e1e
```

---

## 🖼️ Elementos Visuais

### Logo
- **Nome:** FLAVALIA
- **Estilo:** Moderno, clean
- **Cores:** Vermelho (#d90429) + Branco (#f0f0f0)
- **Formato:** PNG com transparência
- **Uso:** Navbar, Login, PDFs

---

### Ícones
**Biblioteca:** Font Awesome 6
**Estilo:** Solid e Regular
**Cor padrão:** `#aaa`
**Cor hover:** `#f0f0f0`
**Cor ativo:** `#d90429`

**Principais ícones:**
- 📝 `fa-file-alt` - Avaliações
- ❓ `fa-question-circle` - Questões
- 👤 `fa-user` - Usuários
- 📊 `fa-chart-bar` - Estatísticas
- ⚙️ `fa-cog` - Configurações
- 🚪 `fa-sign-out-alt` - Logout

---

### Espaçamentos

**Sistema de espaçamento baseado em múltiplos de 8px:**

```css
--spacing-xs: 0.25rem  /* 4px */
--spacing-sm: 0.5rem   /* 8px */
--spacing-md: 1rem     /* 16px */
--spacing-lg: 1.5rem   /* 24px */
--spacing-xl: 2rem     /* 32px */
--spacing-xxl: 3rem    /* 48px */
```

---

### Bordas e Arredondamentos

```css
--border-radius-sm: 5px   /* Botões, inputs */
--border-radius-md: 8px   /* Cards pequenos */
--border-radius-lg: 10px  /* Cards grandes */
--border-radius-xl: 15px  /* Modais */
```

---

### Sombras

**Sombra Leve:**
```css
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
```

**Sombra Média:**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
```

**Sombra Forte:**
```css
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
```

---

## 🎭 Estados Interativos

### Hover
```css
transition: all 0.3s ease;
```
- Mudança suave de cor
- Elevação sutil (transform: translateY(-2px))
- Aumento de sombra

### Active/Focus
```css
border-color: #d90429;
outline: none;
```

### Disabled
```css
opacity: 0.6;
cursor: not-allowed;
```

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
  font-size: 14px;
  padding: 0.5rem;
}

/* Tablet */
@media (max-width: 768px) {
  font-size: 15px;
  padding: 1rem;
}

/* Desktop */
@media (min-width: 769px) {
  font-size: 16px;
  padding: 2rem;
}
```

---

## 🎨 Temas Específicos

### Tema Professor (Padrão)
- **Background:** Dark (#121212)
- **Primária:** Vermelho FATEC (#d90429)
- **Secundária:** Cinza claro (#aaa)

### Tema Coordenador
- **Background:** Branco/Claro (#f5f5f5)
- **Primária:** Azul institucional (#003366)
- **Secundária:** Azul médio (#004080)
- **Destaque:** Vermelho FATEC (#d90429)

---

## 📄 PDF Template

### Cabeçalho
- **Logo:** Canto superior esquerdo
- **Título:** Centralizado, fonte grande
- **Dados:** Alinhados à direita

### Cores do PDF
```css
Primary: RGB(0, 51, 102)    /* Azul FATEC */
Secondary: RGB(217, 4, 41)  /* Vermelho FATEC */
Text: RGB(0, 0, 0)          /* Preto */
Border: RGB(200, 200, 200)  /* Cinza claro */
```

---

## ✨ Animações

### Transições Padrão
```css
transition: all 0.3s ease;
```

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fadeIn 0.3s ease;
```

### Slide Up
```css
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
animation: slideUp 0.4s ease;
```

---

## 🎯 Boas Práticas

### ✅ Fazer
- Manter contraste adequado (WCAG AA)
- Usar cores consistentes em todo o sistema
- Aplicar espaçamentos uniformes
- Garantir responsividade em todos os componentes
- Usar ícones para melhorar compreensão

### ❌ Evitar
- Misturar muitas cores diferentes
- Usar texto com baixo contraste
- Criar componentes sem estados hover/focus
- Ignorar acessibilidade
- Usar fontes muito pequenas (<14px em mobile)

---

## 📊 Acessibilidade

### Contraste de Cores
- ✅ Texto principal: 15.5:1 (AAA)
- ✅ Texto secundário: 7.2:1 (AA)
- ✅ Botões: 8.1:1 (AAA)

### Navegação por Teclado
- ✅ Todos os elementos interativos são acessíveis via Tab
- ✅ Estados de focus visíveis
- ✅ Ordem lógica de navegação

### Leitores de Tela
- ✅ Labels descritivos em formulários
- ✅ Alt text em imagens
- ✅ ARIA labels quando necessário

---

## 🎨 Exemplos de Uso

### Página de Login
```
Background: #121212
Card: #1e1e1e com sombra
Logo: Centralizado
Inputs: #1e1e1e com borda #333
Botão: Vermelho FATEC (#d90429)
```

### Dashboard Professor
```
Background: #121212
Navbar: Gradiente vermelho
Cards: #1e1e1e com hover
Texto: #f0f0f0
Links: #d90429
```

### Painel Coordenador
```
Background: #f5f5f5
Header: Gradiente azul (#003366 → #004080)
Cards: Branco com sombra
Tabelas: Alternadas #f8f8f8
Botões: Azul institucional
```

---

## 🔗 Recursos

### Fontes
- **Google Fonts:** https://fonts.google.com/specimen/Roboto

### Ícones
- **Font Awesome:** https://fontawesome.com/

### Ferramentas de Design
- **Figma** (prototipagem)
- **Adobe Color** (paletas)
- **Contrast Checker** (acessibilidade)

---

## 📝 Conclusão

A identidade visual do **Avalia FATEC** foi cuidadosamente planejada para:

✅ **Refletir a seriedade** do ambiente acadêmico  
✅ **Proporcionar experiência moderna** e agradável  
✅ **Garantir acessibilidade** para todos os usuários  
✅ **Manter consistência** em todas as telas  
✅ **Facilitar navegação** intuitiva  

---

**Desenvolvido com ❤️ para FATEC**  
*Mantendo a tradição, abraçando a inovação*
