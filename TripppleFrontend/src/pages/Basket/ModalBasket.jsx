import { Box, Button, Container, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import React from "react";
import { useNavigate } from "react-router-dom";

const ModalBasket = (props) => {
  const router = useNavigate();
  return (
    <>
      <Modal
        open={props.modalOpened}
        onClose={() => {
          props.close();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 400,
            width: "80%",
            bgcolor: "#0e151c",
            p: 4,
            borderRadius: "20px",
          }}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Typography
            id="modal-modal-title"
            color="white"
            fontSize={"1rem"}
            component="h2"
            align="center"
            marginBottom={"1rem"}
          >
            Оформление прошло успешно, письмо с информацией о заказе и
            дальнейших действиях отправлено на почту, указунную при регистрации.
          </Typography>
          <Container
            sx={{
              marginTop: "1rem",
              marginBottom: "0.5rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              sx={{
                background: "#8300ff",
                borderRadius: "20px",
              }}
              color="success"
              size="large"
              onClick={() => {
                props.close();
              }}
            >
              В корзину
            </Button>

            <Button
              sx={{
                background: "#8300ff",
                borderRadius: "20px",
              }}
              color="success"
              size="large"
              onClick={() => {
                router("/");
                window.scrollTo(0, 0);
                props.close();
              }}
            >
              На главную
            </Button>
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export default ModalBasket;
