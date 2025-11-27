## 🍽️ FoodExpress — Sistema de Delivery com Node.js, Express, Prisma e PostgreSQL

Bem-vindo ao FoodExpress, um sistema completo de delivery com autenticação, painel administrativo, gerenciamento de produtos, restaurantes e usuários.
O projeto utiliza:

Node.js + Express (EJS no front-end)

Prisma ORM + PostgreSQL

Autenticação com bcrypt + JWT (sessão)

Sistema de carrinho e pedidos

Interface Admin para CRUD de restaurantes, produtos e usuários

--

## 🚀 Tecnologias Utilizadas

Backend

Node.js

Express

Prisma ORM

PostgreSQL

bcrypt (hash de senhas)

express-session

JWT (autenticação)

Frontend

EJS

CSS customizado

Layout responsivo (menu fixo, navegação dinâmica)

--

⚙️ Configuração do Ambiente
1️⃣ Instale as dependências
npm install

2️⃣ Configure o arquivo .env

Crie o arquivo .env
siga o examplo do .env.example

3️⃣ Configure o Prisma
Gerar cliente:
npx prisma generate

Criar as tabelas no banco:
npx prisma migrate dev

Abrir o Prisma Studio:
npx prisma studio

▶️ Rodar o Projeto
npm run dev

Servidor rodará em:

👉 http://localhost:4000

--

## 🔑 Recursos do Sistema

👤 Autenticação

Login / Cadastro

Sessões com express-session

Logout global

Proteção de rotas

Controle de usuários CLIENTE / ADMIN

🛒 Área do Cliente

Listagem de restaurantes

Listagem de produtos

Carrinho persistente na sessão

Finalização de pedido

--

## 🛠️ Painel Admin

CRUD de Restaurantes

CRUD de Produtos

CRUD de Usuários

Layout personalizado

Botão global “Voltar”

Menu fixo no topo

--

## 💾 Banco de Dados (Prisma)

O schema inclui:

Usuários

Restaurantes

Produtos

Pedidos

Itens do pedido

Com relações totalmente configuradas.

--

## 📸 Imagens e Assets

![Logo](https://raw.githubusercontent.com/andrewSouza-dev/Eccomerce-ExpressFood/main/public/images/logo.png)

![Tela Inicial](https://raw.githubusercontent.com/andrewSouza-dev/Eccomerce-ExpressFood/main/public/images/TelaInicial.png)

![Login](https://raw.githubusercontent.com/andrewSouza-dev/Eccomerce-ExpressFood/main/public/images/pedido.png)

![Home(cliente)](https://raw.githubusercontent.com/andrewSouza-dev/Eccomerce-ExpressFood/main/public/images/logo.png)

![Admin](https://raw.githubusercontent.com/andrewSouza-dev/Eccomerce-ExpressFood/main/public/images/logo.png)

--

## 🧑‍💻 Como criar um usuário admin manualmente

Via Terminal Node:

const bcrypt = require("bcrypt");
bcrypt.hash("suaSenha", 10).then(console.log);

Cole o hash no banco.

## 🤝 Contribuição

Pull requests são bem-vindos!
Abra uma issue se quiser sugerir melhorias.

## 📄 Licença

MIT - livre para uso e modificação.