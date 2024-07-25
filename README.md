# 🎯 Projeto de Gestão Financeira

## 📜 Descrição

Bem-vindo ao projeto de **Gestão Financeira**! Este sistema é uma aplicação front/backend desenvolvida com **Node.js**, **TypeScript** e **TypeORM**, utilizando **MySQL** como banco de dados. O objetivo é fornecer uma solução para controlar receitas, despesas e gerenciar informações de usuários de forma eficiente e segura.

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js com TypeScript
- **Banco de Dados**: MySQL
- **ORM**: TypeORM
- **Bibliotecas**: Express, bcryptjs, jsonwebtoken

## 📁 Estrutura do Projeto

- **`src/`**: Código fonte do projeto
  - **`controllers/`**: Lógica para as rotas da API
  - **`entity/`**: Definições das entidades do banco de dados
  - **`routes/`**: Definição das rotas da API
  - **`services/`**: Regras de negócio e manipulação de dados
  - **`database.ts`**: Configuração e conexão com o banco de dados
  - **`app.ts`**: Inicialização do servidor Express

## 🔧 Funcionalidades da API

### Usuários 👤

- **GET** `/api/usuarioComum/:id`
  - **Descrição**: Retorna um usuário específico pelo ID.
  
- **POST** `/api/usuarioComum/`
  - **Descrição**: Cria um novo usuário.
  - **Parâmetros**: `nome`, `email`, `senha`, `foto` (opcional), `saldo`.

### Despesas 💸

- **POST** `/api/despesa/`
  - **Descrição**: Cria uma nova despesa.
  - **Parâmetros**: `descricao`, `valor`, `categoria`, `usuarioId`.

- **DELETE** `/api/despesa/:id`
  - **Descrição**: Deleta uma despesa pelo ID.

- **GET** `/api/despesa/:id`
  - **Descrição**: Retorna uma despesa específica pelo ID.

- **PUT** `/api/despesa/:id`
  - **Descrição**: Atualiza uma despesa pelo ID.
  - **Parâmetros**: `descricao`, `valor`, `categoria`.

### Receitas 💰

- **POST** `/api/receita/`
  - **Descrição**: Cria uma nova receita.
  - **Parâmetros**: `descricao`, `valor`, `categoria`, `usuarioId`.

- **POST** `/api/receita/:idReceita/operacao/:idUsuarioComum`
  - **Descrição**: Realiza uma operação com uma receita específica.

- **DELETE** `/api/receita/:id`
  - **Descrição**: Deleta uma receita pelo ID.

- **GET** `/api/receita/:id`
  - **Descrição**: Retorna uma receita específica pelo ID.

- **PUT** `/api/receita/:id`
  - **Descrição**: Atualiza uma receita pelo ID.
  - **Parâmetros**: `descricao`, `valor`, `categoria`.

## 🚀 Como Começar

1. **Clone o Repositório**: `git clone <URL_DO_REPOSITORIO>`
2. **Instale as Dependências**: `npm install`
3. **Configure o Banco de Dados**: Edite o arquivo de configuração `database.ts` com suas credenciais MySQL.
4. **Inicie o Servidor**: `npm start`

## 📊 Exemplo de Dados

- **Usuário**:
  - Nome: João Silva
  - Email: joao.silva@example.com
  - Saldo: 1500.00

- **Despesa**:
  - Descrição: Compra de supermercado
  - Valor: 200.00
  - Categoria: Alimentação

- **Receita**:
  - Descrição: Salário de junho
  - Valor: 3000.00
  - Categoria: Salário


