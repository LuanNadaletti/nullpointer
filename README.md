# Nullpointer

![Licença: MIT](https://img.shields.io/badge/License-GPL3.0-blue.svg) ![Status da Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

## Características

- Autenticação de Usuário
- Sistema de Perguntas e Respostas
- Votação e Comentários
- Busca e Tags
- Design Responsivo

## Tecnologias

- **Frontend**: React
- **Backend**: Java Spring Boot
- **Banco de Dados**: PostgreSQL
- **Infraestrutura**: Docker, AWS

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 14.0.0 ou superior)
- npm (geralmente vem com o Node.js)
- Docker
- Docker Compose

## Configuração do Ambiente de Desenvolvimento

Siga estes passos para configurar e rodar o projeto em ambiente de desenvolvimento:

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/nullpointer.git
   cd nullpointer
   ```

2. Configuração do Frontend:
   ```
   cd frontend/nullpointer
   npm install
   ```

3. Configuração do Backend:
   (Assumindo que o backend está em uma pasta separada)
   ```
   cd ../../backend/nullpointer
   ./mvnw clean install
   ```

4. Configuração do Banco de Dados:
   O banco de dados PostgreSQL será configurado automaticamente pelo Docker Compose.

5. Iniciar os serviços com Docker Compose:
   Na raiz do projeto, execute:
   ```
   docker-compose up -d
   ```

6. Iniciar o Frontend em modo de desenvolvimento:
   ```
   cd frontend/nullpointer
   npm start
   ```

7. Iniciar o Backend em modo de desenvolvimento:
   ```
   cd backend/nullpointer
   ./mvnw spring-boot:run
   ```

## Acessando a Aplicação

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Banco de Dados PostgreSQL: localhost:5432

## Comandos Úteis

- Parar todos os serviços Docker:
  ```
  docker-compose down
  ```

- Visualizar logs dos contêineres:
  ```
  docker-compose logs
  ```

- Reconstruir e reiniciar serviços:
  ```
  docker-compose up -d --build
  ```

## Desenvolvimento

Para desenvolvimento, você pode executar o frontend e o backend separadamente:

- Frontend (modo de desenvolvimento com hot-reload):
  ```
  cd frontend/nullpointer
  npm start
  ```

- Backend (modo de desenvolvimento com hot-reload):
  ```
  cd backend/nullpointer
  ./mvnw spring-boot:run
  ```

## Testes

- Executar testes do Frontend:
  ```
  cd frontend/nullpointer
  npm test
  ```

- Executar testes do Backend:
  ```
  cd backend/nullpointer
  ./mvnw test
  ```

## Contribuição

Por favor, leia o arquivo CONTRIBUTING.md para detalhes sobre nosso código de conduta e o processo para enviar pull requests.

## Licença

Este projeto está licenciado sob a Licença GPL 3.0 - veja o arquivo LICENSE.md para detalhes.
