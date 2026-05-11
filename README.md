# EmployeeFlow Web

EmployeeFlow Web é o frontend da plataforma EmployeeFlow, desenvolvido em **React + TypeScript** com arquitetura modular baseada em features, integração com API REST e autenticação JWT.

A aplicação simula um sistema corporativo de gestão de funcionários, departamentos, cargos e empresas, consumindo a API backend do ecossistema EmployeeFlow.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![ESLint](https://img.shields.io/badge/ESLint-10-yellow)

---

## 🚀 Tecnologias utilizadas

- React 19
- TypeScript
- Vite
- React Router DOM
- Axios
- React Toastify
- CSS modularizado por tema/layout
- JWT Authentication
- ESLint

---

## 🧱 Arquitetura

O projeto segue uma organização baseada em **features/domínios**, visando escalabilidade e separação de responsabilidades.

### Estrutura principal

```bash
src/
├── api/
├── app/
├── features/
├── layouts/
├── shared/
└── styles/
```

### Organização por feature

Cada domínio possui:

- **pages** → páginas da feature
- **components** → componentes reutilizáveis
- **services** → comunicação com API
- **types** → contratos TypeScript

Exemplo:

```bash
features/employees/
├── components/
├── pages/
├── services/
└── types/
```

---

## 📦 Funcionalidades

### Autenticação

- Login com JWT
- Persistência de token
- Rotas protegidas

### Empresas

- Cadastro de empresas
- Visualização de perfil

### Departamentos

- CRUD completo
- Associação com empresas

### Funcionários

- CRUD completo
- Filtros por departamento e cargo

### Cargos

- Gerenciamento de cargos/permissões

### Dashboard

- Área central da aplicação
- Métricas

---

## 🔐 Autenticação JWT

A aplicação utiliza autenticação baseada em JWT integrada à API backend.

Fluxo:

1. Usuário realiza login
2. Token JWT é armazenado localmente
3. Requisições autenticadas utilizam:

```http
Authorization: Bearer {token}
```

4. Rotas protegidas validam autenticação automaticamente

---

## ⚙️ Destaques técnicos

- Estrutura modular baseada em domínio
- Separação clara entre UI, serviços e contratos
- Requisições centralizadas com Axios
- Controle de autenticação via JWT
- Rotas privadas com proteção de acesso
- Componentização reutilizável
- Organização escalável para crescimento do sistema

---

## ▶️ Executando o projeto localmente

1. Clonar o repositório

```bash
git clone https://github.com/VStorch/employeeflow-web.git
```

2. Instalar dependências

```bash
npm install
```

3. Executar a aplicação

```bash
npm run dev
```

---

## 📁 Estrutura principal

```bash
src/
├── api/
│   └── api.ts
│
├── app/
│   └── routes/
│
├── features/
│   ├── auth/
│   ├── companies/
│   ├── dashboard/
│   ├── departments/
│   ├── employees/
│   └── roles/
│
├── layouts/
├── shared/
└── styles/
```

---

## 📌 Boas práticas aplicadas

- Organização por domínio/features
- Componentização reutilizável
- Separação entre lógica e apresentação
- Tipagem forte com TypeScript
- Serviços desacoplados da interface
- Rotas protegidas para autenticação
- Estrutura preparada para escalabilidade
- Conventional Commits

---

## 🔗 Backend da aplicação

O frontend consome a API do projeto EmployeeFlow Backend:

[EmployeeFlow API](https://github.com/VStorch/employeeflow-api.git)

---

## 👨‍💻 Autor

Vinícius Storch.

Projeto desenvolvido para fins de estudo e portfólio full stack.
