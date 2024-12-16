import React, { useState } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  BlockTitle,
  List,
  ListInput,
  Button,
  Link,
  Block,
  Icon,
} from "framework7-react";

const LoginPage = ({ f7router }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setLocalStorageItem = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting localStorage item ${key}:`, error);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = { message: "Resposta inválida do servidor." };
      }

      if (!response.ok) {
        alert(data.message || "Erro ao fazer login.");
        return;
      }

      if (data.token) {
        setLocalStorageItem("sessionToken", data.token);
        if (data.user && data.user.name) {
          setLocalStorageItem("username", data.user.name);
        }
        f7router.navigate("/");
      } else {
        alert("Nenhum token recebido do servidor.");
      }
    } catch (error) {
      alert(`Ocorreu um erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page name="login">
      <Navbar>
        <NavLeft>
          <Link back>
            <Icon f7="arrow_left" />
          </Link>
        </NavLeft>
        <NavTitle>Entrar no sistema</NavTitle>
      </Navbar>
      <BlockTitle>Digite suas credenciais</BlockTitle>
      <List form noHairlines>
        <ListInput
          label="E-mail"
          type="email"
          placeholder="Insira seu e-mail"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          required
        />
        <ListInput
          label="Senha"
          type="password"
          placeholder="Insira sua senha"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          required
        />
      </List>
      <Block>
        <Button fill color="green" onClick={handleLogin} disabled={loading}>
          <Icon f7="square_arrow_right" className="margin-right" size="20px" />
          {loading ? "Carregando..." : "Entrar"}
        </Button>
      </Block>
    </Page>
  );
};

export default LoginPage;
