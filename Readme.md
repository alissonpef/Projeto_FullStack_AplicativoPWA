# **Projeto FullStack Aplicativo PWA - Cadastro de QR-Codes**

Este projeto consiste em um **aplicativo PWA** (Progressive Web App) para cadastro e gerenciamento de **QR-Codes**, desenvolvido para atender as necessidades de uma empresa de biscoitos. Clientes podem registrar QR-Codes de embalagens, acompanhar os códigos cadastrados e receber **notificações push** com promoções e sorteios.

---

## **Sumário**

1. [Visão Geral](#visão-geral)  
2. [Equipe Responsável](#equipe-responsável)  
3. [Principais Funcionalidades](#principais-funcionalidades)  
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)  
5. [Estrutura do Repositório](#estrutura-do-repositório)  
6. [Como Executar](#como-executar)  
7. [Conclusão](#conclusão)  

---

## **Visão Geral**

O **Projeto FullStack Aplicativo PWA** aborda o processo completo de criação de uma aplicação **frontend** (PWA) em conjunto com um **backend** (API RESTful), integrando **MongoDB** como banco de dados. O objetivo é permitir que usuários cadastrem diversos QR-Codes, visualizem o histórico de códigos cadastrados e recebam notificações push em tempo real acerca de promoções e prêmios.

---

## **Equipe Responsável**

- **Alisson Pereira Ferreira**  
- **Dennis Paul Paz Lopez**

**Universidade Federal de Santa Catarina (UFSC) – Campus Araranguá**  
Caixa Postal 88.905-120 – Araranguá – SC – Brasil  

---

## **Principais Funcionalidades**

1. **Cadastro de QR-Codes**  
   - Leitura de QR-Codes pela câmera do dispositivo.  
   - Vinculação dos códigos cadastrados à conta de cada cliente.  

2. **Consulta de QR-Codes**  
   - Listagem dos QR-Codes armazenados, exibindo histórico e detalhes.  

3. **Notificações Push**  
   - Envio de alertas promocionais e informações de sorteios aos clientes cadastrados.  

4. **Funcionamento Offline (PWA)**  
   - Permite a interação básica do usuário mesmo sem conexão com a internet.  

---

## **Tecnologias Utilizadas**

### **Frontend**
- **Framework7**: Framework para criação de interfaces mobile-first responsivas.
- **html5-qrcode**: Biblioteca para leitura de QR-Codes via câmera do dispositivo.
- **React**: Utilizado para componentização e renderização dinâmica da interface.
- **PWA**: Configuração de manifesto e service workers para suporte offline.

### **Backend**
- **Node.js & Express**: Criação de APIs RESTful para gerenciamento de usuários e QR-Codes.
- **Web Push Notifications**: Envio de notificações push aos dispositivos cadastrados.

### **Banco de Dados**
- **MongoDB**: Armazenamento das informações de usuários e QR-Codes de forma escalável.

---

## **Estrutura do Repositório**

```bash
/Projeto_FullStack_AplicativoPWA
├── /backend           # Código do servidor backend (Node.js, Express)
└── /frontend          # Aplicativo PWA (Framework7, React, html5-qrcode)
```

---

## **Como Executar**

### 1. Clonar o Repositório

```bash
git clone https://github.com/alissonpef/Projeto_FullStack_AplicativoPWA.git
```

### 2. Configurar o Banco de Dados (MongoDB)

1. Instale e inicie o **MongoDB** localmente.  
2. Crie uma base de dados chamada `pwa_qrcode`.  

### 3. Executar o Backend

1. Acesse a pasta `/backend`:  
   ```bash
   cd backend
   ```
2. Instale as dependências:  
   ```bash
   npm install
   ```
3. Inicie o servidor:  
   ```bash
   node index.js
   ```
4. O backend estará acessível em `http://localhost:3000`.

### 4. Executar o Frontend

1. Acesse a pasta `/frontend`:  
   ```bash
   cd ../frontend
   ```
2. Instale as dependências:  
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:  
   ```bash
   npm run dev
   ```
4. A aplicação estará disponível em `http://localhost:8080`.

### 5. Testar o Sistema

- Cadastre-se como usuário na aplicação.
- Escaneie QR-Codes via **html5-qrcode**.
- Acompanhe o histórico de códigos cadastrados e aguarde notificações push sobre promoções.

#### CLI para envio de notificações
O backend conta com uma ferramenta CLI para envio de notificações:
```bash
node manda_msg <codigo_qrcode> "Mensagem de notificação"
```
Exemplo:
```bash
node manda_msg ABCD1234 "Parabéns! Você foi sorteado!"
```

---

## **Conclusão**

O **Projeto FullStack Aplicativo PWA** proporciona uma solução completa de **cadastramento e gerenciamento de QR-Codes**, integrando frontend (PWA) e backend (Node.js & Express) com **MongoDB**. A aplicação oferece usabilidade **online e offline**, notificações em tempo real e escalabilidade para diferentes volumes de usuários. Futuras melhorias incluem relatórios personalizados, integração com sistemas de terceiros e aplicação de análise de dados para campanhas promocionais.

Em caso de dúvidas ou sugestões, fique à vontade para **abrir uma issue** ou enviar um **pull request**.

---
