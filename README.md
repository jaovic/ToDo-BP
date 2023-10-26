# Projeto Todo

  

Bem-vindo ao Projeto Todo! Este é um guia rápido sobre como configurar e executar o projeto localmente.

  

## Pré-requisitos

  

Certifique-se de que você tenha as seguintes ferramentas instaladas no seu sistema:

  

- [Node.js](https://nodejs.org/) - Node.js é necessário para o backend.

- [Docker](https://www.docker.com/) - Docker é necessário para o banco de dados PostgreSQL.

- [Git](https://git-scm.com/) - O Git é usado para clonar o repositório.

- Um navegador da web moderno.

  

## Configurando o Banco de Dados

  

Certifique-se de que o Docker esteja instalado, com e em execução. Em seguida, execute os seguintes comandos para configurar o banco de dados PostgreSQL:

  

```bash

docker  run  --name  postgres-db  -e  POSTGRES_PASSWORD=suaSenha  -p  5432:5432  -d  postgres:latest

```

  

## Configurando o Backend

  

Agora, você pode configurar e executar o backend. Siga estas etapas:

  

1 - Clone este repositório:
```bash
git clone git@github.com:jaovic/ToDo-BP.git
```
2 - Acesse a pasta do backend:
```bash
cd todo-list-backend
```
3 - Instale as dependências:
```bash
npm install
```
4 - Crie um arquivo `.env` na pasta `todo-list-backend` e configure as variáveis de ambiente, como as credenciais do banco de dados. Aqui está um exemplo de `.env`:
```bash
DATABASE_URL=

TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```
5 - Execute o servidor:
```bash
npm run start:dev
```
O backend estará disponível em `http://localhost:3000`
### Documentação
Abra seu navegador da web e acesse `http://localhost:3000/docs/` para acessar a documentação.

Agora, você pode configurar e executar o frontend. Siga estas etapas:
1 - Acesse a pasta do frontend:
```bash
cd todo-list-frontend
```
2 -Instale as dependências:
```bash
npm install
```
3 - Execute o aplicativo frontend:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

### Acessando o Aplicativo
Abra seu navegador da web e acesse `http://localhost:5173` ou `http://127.0.0.1:5173` para acessar o aplicativo.
Agora você deve ter o projeto ToDo em execução localmente. Divirta-se explorando o aplicativo!
## Contribuições

Se desejar contribuir para este projeto, siga as diretrizes do projeto e envie solicitações de pull