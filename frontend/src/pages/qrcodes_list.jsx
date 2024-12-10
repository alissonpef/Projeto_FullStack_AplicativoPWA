import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Link,
  List,
  ListItem,
  Card,
  CardContent,
  Block,
  Icon,
  BlockTitle,
} from "framework7-react";

const ListQRCodesPage = ({ f7router }) => {
  const [qrCodes, setQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRCodes = async () => {
      const token = localStorage.getItem("sessionToken");
      if (!token) {
        alert("Você precisa estar logado para ver seus QR codes.");
        f7router.navigate("/login/");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/account/qrcodes/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          const sortedQRCodes = (data.qrCodes || []).sort((a, b) => a.code.localeCompare(b.code));
          setQRCodes(sortedQRCodes);
        } else {
          alert(data.message || "Erro ao listar QR codes");
        }
      } catch (error) {
        console.error("Erro ao listar QR codes:", error.message);
        alert("Erro ao listar QR codes");
      } finally {
        setLoading(false);
      }
    };

    fetchQRCodes();
  }, [f7router]);

  return (
    <Page name="qrcodes-list">
      <Navbar>
        <NavLeft>
          <Link back>
            <Icon f7="arrow_left" />
          </Link>
        </NavLeft>
        <NavTitle>Meus QR Codes</NavTitle>
      </Navbar>
      <BlockTitle>QR Codes cadastrados</BlockTitle>
      <Card raised>
        <CardContent>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              {qrCodes.length === 0 ? (
                <p>Nenhum QR Code cadastrado.</p>
              ) : (
                <List dividersIos outlineIos strongIos>
                  {qrCodes.map((qr) => (
                    <ListItem key={qr._id} title={qr.code}>
                      <Icon slot="media" f7="qrcode" size="25px" />
                    </ListItem>
                  ))}
                </List>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <Block className="text-align-center">
        <Link onClick={() => f7router.navigate("/qrcodes/add/")} color="green">
          <Icon f7="qrcode_viewfinder" className="margin-right" size="30px" />
          Adicionar QR Code
        </Link>
      </Block>
    </Page>
  );
};

export default ListQRCodesPage;
