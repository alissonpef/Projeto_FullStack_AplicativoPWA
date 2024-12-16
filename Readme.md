# Projeto FullStack Aplicativo PWA - Cadastro de QR-Codes

## 📖 Introdução

Este projeto consiste no desenvolvimento de um **aplicativo PWA** (Progressive Web App) para cadastro e gerenciamento de **QR-Codes**. O sistema foi projetado para atender às necessidades de uma empresa de biscoitos, permitindo que os clientes registrem os QR-Codes das embalagens dos produtos, acompanhem os códigos cadastrados e recebam **notificações push** sobre promoções e sorteios.

### Cenário

- Os clientes podem cadastrar diversos QR-Codes diretamente no aplicativo.
- Os QR-Codes são vinculados a uma conta de usuário e armazenados no **MongoDB**.
- Ao final da promoção, os clientes sorteados receberão uma notificação push informando o prêmio.

### Tecnologias e Funcionalidades

1. **Frontend**
   - Desenvolvido em **Framework7** para criar uma interface responsiva e moderna.
   - **Leitura de QR-Codes** utilizando a biblioteca [html5-qrcode](https://github.com/mebjas/html5-qrcode).
   - PWA configurado para funcionamento offline.

2. **Backend**
   - Desenvolvido com **Node.js** e **Express**.
   - Gerenciamento de contas e QR-Codes dos clientes.
   - Integração com **Web Push Notifications** para envio de mensagens promocionais.

3. **Banco de Dados**
   - **MongoDB** para armazenamento de QR-Codes, contas de clientes e códigos de notificações.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Framework7**: Framework para criação de aplicações web modernas e responsivas.
- **html5-qrcode**: Biblioteca para leitura de QR-Codes diretamente pela câmera do dispositivo.
- **React**: Biblioteca para desenvolvimento de componentes dinâmicos.

### Backend
- **Node.js**: Ambiente de execução para criação do servidor backend.
- **Express**: Framework para criação de APIs RESTful.
- **Web Push Notifications**: Biblioteca para envio de notificações push aos dispositivos.

### Banco de Dados
- **MongoDB**: Banco de dados NoSQL para armazenamento dos códigos cadastrados.

---

## 📂 Estrutura do Repositório

```
/Projeto_FullStack_AplicativoPWA
├── /backend           # Código do servidor backend
├── /frontend          # Código do aplicativo PWA
└── /docs              # Documentação do projeto
```

---

## ⚙️ Funcionalidades

1. **Cadastro de QR-Codes**:
   - O cliente pode escanear QR-Codes utilizando a câmera do dispositivo.
   - Os códigos são vinculados à conta do usuário e armazenados no banco de dados.

2. **Consulta de QR-Codes**:
   - O cliente pode visualizar a lista de códigos cadastrados e acompanhar o histórico.

3. **Notificações Push**:
   - Notificações enviadas aos clientes com informações sobre sorteios e prêmios.

4. **Ferramenta CLI no Backend**:
   - Comando para notificar clientes de QR-Codes sorteados:
     ```bash
     node manda_msg <codigo_qrcode> "Mensagem de notificação"
     ```

---

## 🚀 Como Executar

### 1. Clonar o Repositório

```bash
git clone https://github.com/alissonpef/Projeto_FullStack_AplicativoPWA.git
```

### 2. Configurar o Banco de Dados

1. Certifique-se de ter o **MongoDB** instalado e em execução.
2. Crie um banco de dados chamado `pwa_qrcode`.

### 3. Executar o Backend

1. Navegue até a pasta `/backend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   node index.js
   ```

O backend estará acessível em `http://localhost:3000`.

### 4. Executar o Frontend

1. Navegue até a pasta `/frontend`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor do frontend:
   ```bash
   npm run dev
   ```

A aplicação estará acessível em `http://localhost:8080`.

### 5. Testar o Sistema

- Acesse a aplicação pelo navegador.
- Cadastre-se como cliente e inicie o processo de leitura de QR-Codes.

---

## 📊 Diagramas

### Modelo de Dados
O banco de dados MongoDB possui as seguintes coleções:

- **usuarios**: Armazena informações dos clientes, como nome, e-mail e token de notificação.
- **qrcodes**: Armazena os QR-Codes cadastrados e vinculados a cada cliente.

---

## 🌟 Conclusão

O **Projeto FullStack Aplicativo PWA** é uma solução completa que combina tecnologias modernas para oferecer uma experiência responsiva e funcional. Ele permite o gerenciamento eficiente de QR-Codes, além de ser escalável e intuitivo. Este projeto demonstra a aplicação prática de conceitos de PWA, notificções push e integração fullstack.

