import React, { useState } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  BlockTitle,
  List,
  ListInput,
  Block,
  Link,
  NavLeft,
  Button,
  Icon,
} from "framework7-react";

const SignupPage = ({ f7router }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (password.length < 5) {
      alert("A senha deve ter pelo menos 5 caracteres.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Resposta inválida do servidor." };
      }

      if (!response.ok) {
        alert(data.message || "Falha no cadastro.");
        return;
      }
      alert("Usuário cadastrado com sucesso!");
      f7router.navigate("/");
    } catch (error) {
      alert("Ocorreu um erro: " + error.message);
    }
  };

  return (
    <Page name="signup">
      <Navbar>
        <NavLeft>
          <Link back>
            <Icon f7="arrow_left" />
          </Link>
        </NavLeft>
        <NavTitle>Criar conta</NavTitle>
      </Navbar>
      <BlockTitle>Insira seus dados para criar uma conta</BlockTitle>
      <List form noHairlinesMd>
        <ListInput
          label="Nome"
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onInput={(e) => setName(e.target.value)}
        />
        <ListInput
          label="E-mail"
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />
        <ListInput
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />
      </List>
      <Block>
        <Button fill onClick={handleSignup} disabled={loading}>
          <Icon f7="person_badge_plus" className="margin-right" size="20px" />
          {loading ? "Carregando..." : "Criar conta"}
        </Button>
      </Block>
    </Page>
  );
};

export default SignupPage;
