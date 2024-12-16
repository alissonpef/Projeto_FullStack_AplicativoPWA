### **Backend**
1. Certifique-se de estar na pasta do backend:
   ```bash
   cd backend
   ```
2. Inicie o servidor backend:
   ```bash
   npm run start
   ```
3. Para enviar uma mensagem para um usuário específico, execute o comando:
   ```bash
   node manda_msg.js código "Parabéns! Você é o ganhador do sorteio do QR Code!"
   ```
---

## **Iniciando o MongoDB**
Certifique-se de que o MongoDB está rodando localmente:
```bash
mongod
```

---

## **Rodando o ngrok**
Para expor o backend para a internet usando ngrok:
1. Certifique-se de estar na pasta do backend:
   ```bash
   cd "C:\Users\Alisson\Downloads\Trabalho_Final_Web\backend"
   ```
2. Execute o comando para iniciar o ngrok na porta 3000:
   ```bash
   ngrok http 3000
   ```
