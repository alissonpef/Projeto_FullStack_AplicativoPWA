// src/pages/AddQRCodePage.jsx
import React, { useEffect } from "react";
import { Page, Navbar, NavTitle, Block, Link, NavLeft, Icon, BlockTitle } from "framework7-react";
import { Html5QrcodeScanner } from "html5-qrcode";

const AddQRCodePage = ({ f7router }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear().catch((err) => console.error("Failed to clear QR scanner.", err));
    };
  }, []);

  const onScanSuccess = async (decodedText) => {
    console.log("QR Code scanned: ", decodedText);
    try {
      await sendCodeToBackend(decodedText);
    } catch (error) {
      console.error("Failed to handle scanned QR code:", error);
    }
  };

  const onScanFailure = (errorMessage) => {
    console.warn("QR Code scan error:", errorMessage);
  };

  const sendCodeToBackend = async (code) => {
    const token = localStorage.getItem("sessionToken");
    if (!token) {
      alert("You must be logged in to add a QR code.");
      f7router.navigate("/login/");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/account/qrcodes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("QR code adicionado com sucesso!");
        f7router.navigate("/");
      } else {
        alert(data.message || "Falha ao adicionar QR code");
      }
    } catch (error) {
      console.error("Error adding QR code:", error.message);
      alert("Erro ao adicionar QR code");
    }
  };

  return (
    <Page name="qrcode-add">
      <Navbar>
        <NavLeft>
          <Link back>
            <Icon f7="arrow_left" />
          </Link>
        </NavLeft>
        <NavTitle>Adicionar QR Code</NavTitle>
      </Navbar>
      <BlockTitle>Aponte a câmera para um QR Code para adicioná-lo</BlockTitle>
      <Block>
        <div id="qr-reader" style={{ width: "100%" }} />
      </Block>
    </Page>
  );
};

export default AddQRCodePage;
