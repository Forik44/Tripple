import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useContext, useEffect } from "react";
import { useModal } from "../../../hooks/useModal";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useFormState } from "react-hook-form";
import {
  buttonContainer,
  cancelButtonStyle,
  inputStyle,
  loginButtonStyle,
  modalBoxStyle,
} from "./styles";
import { emailValidation, passwordValidation } from "./validation";
import { Context } from "../../../App";
import jwt_decode from "jwt-decode";

export default function AuthModal() {
  const { modalOpened, closeModal } = useModal();
  async function handleCallbackResponse(response) {
    try{
    let userObject = jwt_decode(response.credential);
    await store.login(userObject.email, userObject.name, true);
    router("/");
    window.scrollTo(0, 0);
    closeModal();
    reset();
    store.setAlertMessage("Аутентификация прошла успешно");
    store.setAlertVariant(true);
    store.setAlertIsOpen(true);}
    catch(err){
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      /*global google */
      google.accounts.id.initialize({
        client_id:
          "670366378627-q5kh797v88plqiqe8gl21g50d0p521d4.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        {
          theme: "filled_black",
          shape: "pill",
        },
        0
      );
    });
  }, [modalOpened]);
  const { store } = useContext(Context);
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const { errors } = useFormState({ control });

  const router = useNavigate();
  const onSubmit = async (data) => {
    try {
      await store.login(data.email, data.password, false);
      router("/");
      window.scrollTo(0, 0);
      closeModal();
      reset();
      store.setAlertMessage("Аутентификация прошла успешно");
      store.setAlertVariant(true);
      store.setAlertIsOpen(true);
    } catch (err) {
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    }
  };
  return (
    <>
      <Modal
        open={modalOpened}
        onClose={() => {
          closeModal();
          reset();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={modalBoxStyle}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
        >
          <Typography
            id="modal-modal-title"
            color="#66FCF1"
            variant="h6"
            component="h2"
            align="center"
            marginBottom={"1rem"}
          >
            Вход в систему
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Controller
              control={control}
              name="email"
              rules={emailValidation}
              render={({ field }) => (
                <TextField
                  sx={inputStyle}
                  placeholder="email..."
                  size="small"
                  margin="none"
                  fullWidth={true}
                  variant="outlined"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={passwordValidation}
              render={({ field }) => (
                <TextField
                  sx={inputStyle}
                  variant="outlined"
                  type="password"
                  placeholder="пароль..."
                  size="small"
                  margin="normal"
                  fullWidth={true}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Container sx={buttonContainer}>
              <Button
                disabled={!isValid}
                sx={loginButtonStyle}
                type="submit"
                color="success"
                size="large"
              >
                Войти
              </Button>
              <Button
                onClick={() => {
                  closeModal();
                  reset();
                }}
                sx={cancelButtonStyle}
                color="success"
                size="large"
              >
                Отмена
              </Button>
            </Container>
            <Button
              onClick={() => {
                closeModal();
                router("/sign-up");
              }}
              color="success"
              size="medium"
            >
              Регистрация
            </Button>
            <div id="googleButton" style={{ marginTop: "1rem" }}></div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
