LearnGraph - Plataforma de Aprendizado usando GraphQL
====================================================

![Node.js Version](https://img.shields.io/badge/Node.js-20.3-green) 
![TypeScript Version](https://img.shields.io/badge/TypeScript-5.1-blue) 
![GraphQL Version](https://img.shields.io/badge/GraphQL-16.1-yellow)
![Prisma Version](https://img.shields.io/badge/Prisma-4.16-orange) 
![Prisma Version](https://img.shields.io/badge/Mysql-8.0-brown) 
![Jest Version](https://img.shields.io/badge/Jest-29.6-red)


📖 Descrição
------------

O projeto "LearnGraph" é uma aplicação desenvolvida com o objetivo de explorar os conceitos do GraphQL, Containers, Clean Architecture e sua implementação prática em uma plataforma de aprendizado. Através do uso do GraphQL, estudantes podem acessar informações sobre cursos e matérias, permitindo-lhes personalizar seu próprio caminho de aprendizado de acordo com seus interesses e metas educacionais.

🚀 Tecnologias Utilizadas
-------------------------

*   Node.js
*   TypeScript
*   GraphQL
*   Json Web Token (JWT)
*   Jest
*   Prisma
*   MySQL
*   Docker
*   Docker Compose
*   Git

📁 Estrutura do Projeto
-----------------------

O projeto é composto pelas seguintes pastas:

```
.
├── app
│ ├── dtos
│ └── usecases
├── domain
│ ├── entities
│ └── repositories
├── infra
│ ├── http
│ ├── repositories
│ └── security
├── docker-compose.yml
└── ...
```

### 1. `app`

A pasta `app` contém os Data Transfer Objects (DTOs) e os casos de uso (use cases) da aplicação. 
- Os DTOs são responsáveis por definir a estrutura dos dados que são trocados entre as camadas da aplicação. 
- Os casos de uso implementam as regras de negócio da plataforma de aprendizado.

### 2. `domain`

A pasta `domain` abriga as entidades do domínio da aplicação e os repositórios relacionados. 
- As entidades representam os principais objetos do sistema e encapsulam a lógica de negócio relacionada a eles. 
- Os repositórios definem as interfaces para a persistência e recuperação dos dados.

### 3. `infra`

A pasta `infra` contém a infraestrutura do projeto, incluindo as camadas de acesso à rede (HTTP), repositórios concretos e segurança, se aplicável.

🛠️ Como Executar
-----------------

### 1\. Configuração
Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

### 2\. Clonar o Repositório
```
git clone https://github.com/leocarlos-dias/learn-graph.git
```

### 3\. Executar o Projeto
Acesse a pasta raiz do projeto e execute o seguinte comando para iniciar os containers:
```
docker-compose up
```

### 4\. Configuração da Aplicação
Acesse o container do servidor e execute os seguintes comandos para instalar as depêndencias e criar o banco de dados:
```
docker compose exec app bash
npm install
npx prisma migrate dev
```

### 5\. Executar os Testes
Execute o seguinte comando para executar os testes:
```
npm run test
```

### 6\. Iniciar o Servidor

Acesse o container do servidor e execute o seguinte comando para iniciar o servidor:
```
docker compose exec app bash
npm run dev
```

📝 Utilização
-------------

Para interagir com a API GraphQL, acesse o endpoint `http://localhost:3000/` em um navegador ou utilize ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para executar as consultas e mutações.

A documentação da API estará disponível em `http://localhost:3000/graphql` após o servidor ser iniciado.


📘 Documentação
-----------------

Com esta API, você pode interagir com uma plataforma de educação para gerenciar estudantes, cursos e matérias de forma fácil e intuitiva. Abaixo, você encontrará todas as informações necessárias para começar a usar nossa API.

## 📋 Tipos de Dados

### Estudante (Student)

Representa um estudante na plataforma.

- **id (String!):** Identificador único do estudante.
- **name (String!):** Nome do estudante.
- **email (String!):** Endereço de e-mail do estudante.
- **ra (String!):** Registro Acadêmico do estudante.
- **courses ([Course]!):** Lista de cursos nos quais o estudante está matriculado.

### Curso (Course)

Representa um curso oferecido na plataforma.

- **id (String!):** Identificador único do curso.
- **name (String!):** Nome do curso.
- **description (String!):** Descrição do curso.
- **subjects ([Subject]):** Lista de matérias associadas ao curso.

### Matéria (Subject)

Representa uma matéria oferecida em um curso.

- **id (String!):** Identificador único da matéria.
- **name (String!):** Nome da matéria.
- **workLoad (Int!):** Carga horária da matéria.

## Consultas Disponíveis

### Consultar Todos os Estudantes:

```graphql
query {
  students {
    id
    name
    email
  }
}
```

### Criar um Novo Estudante:

```graphql
mutation {
  signUp(data: {
    name: "Nome do Estudante"
    email: "email@example.com"
    password: "senha123"
  }) {
    id
    name
    email
  }
}
```

### Criar um Novo Curso:

```graphql
mutation {
  createCourse(data: {
    name: "Nome do Curso"
    description: "Descrição do Curso"
  }) {
    id
    name
  }
}
```

### Adicionar uma Nova Matéria a um Curso:

```graphql
mutation {
  addSubject(data: {
    courseId: "ID do Curso"
    subject: {
      name: "Nome da Matéria"
      workLoad: 60
    }
  }) {
    id
    name
    subjects {
      id
      name
      workLoad
    }
  }
}
```

### Matricular um Estudante em um Curso:

```graphql
mutation {
  enrollInCourse(data: {
    courseId: "ID do Curso"
    studentId: "ID do Estudante"
  }) {
    id
    name
    courses {
      id
      name
    }
  }
}
```

## 📌 Rotas

```
/graphql
```

Endpoint principal da API. Todas as consultas e modificações devem ser realizadas através deste endpoint.

🙌 Contribuições
-----------------

Contribuições são bem-vindas! Se você quiser ajudar a melhorar o LearnGraph, sinta-se à vontade para abrir um "pull request" com suas sugestões e correções.





