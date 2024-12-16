import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Block,
  Button,
  Icon,
  BlockTitle,
} from "framework7-react";

const HomePage = ({ f7router }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);

  const getLocalStorageItem = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error.message);
      return null;
    }
  };

  useEffect(() => {
    const token = getLocalStorageItem("sessionToken");
    const storedName = getLocalStorageItem("username");
    if (token && storedName) {
      setIsLoggedIn(true);
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const { title, body } = event.data || {};
        if (title && body) {
          setIncomingMessage({ title, body });
        }
      });
    }
  }, []);

  const handleLogoutClick = async () => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      setIsLoggedIn(false);
      setUserName("");
      return;
    }
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("sessionToken");
        setIsLoggedIn(false);
        setUserName("");
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("User granted permission.");
      await subscribeUserToPush();
    } else {
      console.log("User denied or closed the permission prompt.");
    }
  }

  async function subscribeUserToPush() {
    if (!("serviceWorker" in navigator)) {
      alert("Service workers are not supported by your browser.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const vapidPublicKey =
      "BJLOfwj8iZi_e1SBX5tOp0l5FZ1NBvvWSvJdWIEVXQUONLywv65I7zl8UxfB8pYyZS6adHU6UxtQxxv8xpeJ_OU";
    const convertedKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedKey,
    });

    const token = localStorage.getItem("sessionToken");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    const response = await fetch("/api/account/push/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subscription }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Push subscription registered successfully!");
    } else {
      alert("Failed to register push subscription: " + (data.message || "Unknown error"));
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <Page name="home">
      <Navbar large>
        <NavTitle className="text-align-center">
          <strong>Biscoitos X</strong>
        </NavTitle>
        <NavTitleLarge className="text-align-center">
          <strong>Biscoitos X</strong>
        </NavTitleLarge>
      </Navbar>
      <Block>
        <BlockTitle className="text-align-center">
          Trabalho final da disciplina de Programação Web
        </BlockTitle>
        <Block strong>
          <p>
            <strong>Integrantes:</strong>
          </p>
          <p>- Alisson Pereira</p>
          <p>- Dennis Paz</p>
        </Block>
        {isLoggedIn && (
          <Block>
            <p>
              Bem-vindo, <strong>{userName}</strong>!
            </p>
          </Block>
        )}

        {incomingMessage && (
          <Block strong className="notification-banner">
            <Button onClick={() => setIncomingMessage(null)} className="close-button">
              <Icon f7="multiply" size="20px" />
            </Button>
            <p>
              <strong>{incomingMessage.title}</strong>
            </p>
            <p className="margin-bottom">{incomingMessage.body}</p>
          </Block>
        )}

        {isLoggedIn ? (
          <>
            <Button
              fill
              color="green"
              onClick={() => f7router.navigate("/qrcodes/add/")}
              className="margin-bottom"
            >
              <Icon f7="qrcode_viewfinder" className="margin-right" size="20px" />
              Adicionar QR Code
            </Button>
            <Button
              fill
              onClick={() => f7router.navigate("/qrcodes/list/")}
              className="margin-bottom"
            >
              <Icon f7="list_bullet" className="margin-right" size="20px" />
              Meus QR Codes
            </Button>
            <Button fill color="red" onClick={handleLogoutClick} className="margin-bottom">
              <Icon f7="square_arrow_left" className="margin-right" size="20px" />
              Logout
            </Button>
            <Block>
              <Button onClick={requestNotificationPermission}>
                <Icon f7="bell" className="margin-right" size="20px" />
                Permitir notificações
              </Button>
            </Block>
          </>
        ) : (
          <>
            <Button
              fill
              color="green"
              onClick={() => f7router.navigate("/login/")}
              className="margin-bottom"
            >
              <Icon f7="square_arrow_right" className="margin-right" size="20px" />
              Entrar
            </Button>
            <Button fill onClick={() => f7router.navigate("/signup/")}>
              <Icon f7="person_badge_plus" className="margin-right" size="20px" />
              Cadastrar-se
            </Button>
          </>
        )}
      </Block>
    </Page>
  );
};

export default HomePage;
