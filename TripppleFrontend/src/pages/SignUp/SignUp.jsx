import { Box, Button, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import {
  buttonBoxStyle,
  cancelButtonStyle,
  continueButtonStyle,
  inputStyle,
  mainBoxStyle,
} from "./styles";
import {
  nameValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  lastNameValidation,
} from "./validation";

const SignUp = () => {
  const { store } = useContext(Context);
  const acceptPasswordValidation = {
    required: "Обязательно для заполнения",
    validate: (val) => {
      if (watch("password") !== val) {
        return "Пароли не совпадают";
      }
    },
  };

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const { errors } = useFormState({ control });
  const router = useNavigate();
  const onSubmit = async (data) => {
    try {
      store.registration(
        data.email,
        data.password,
        data.name,
        data.lastName,
        data.phone
      );
      store.setUser({
        name: data.name,
        lastName: data.lastName,
      });

      router("/");
      reset();
    } catch (err) {}
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={mainBoxStyle}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
      >
        <Typography
          width="100%"
          id="modal-modal-title"
          color="#66FCF1"
          variant="h5"
          component="h2"
          marginBottom={"2rem"}
        >
          Регистрация
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
            name="name"
            rules={nameValidation}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                placeholder="Имя..."
                size="small"
                margin="normal"
                fullWidth={true}
                variant="outlined"
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.name?.message}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={lastNameValidation}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                variant="outlined"
                placeholder="Фамилия..."
                size="small"
                margin="normal"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.lastName?.message}
                helperText={errors.lastName?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            rules={phoneValidation}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                variant="outlined"
                placeholder="Номер телефона..."
                size="small"
                margin="normal"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={emailValidation}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                variant="outlined"
                placeholder="Email..."
                size="small"
                margin="normal"
                fullWidth={true}
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
                placeholder="Пароль..."
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
          <Controller
            control={control}
            name="acceptPassword"
            rules={acceptPasswordValidation}
            render={({ field }) => (
              <TextField
                sx={inputStyle}
                variant="outlined"
                type="password"
                placeholder="Подтверждение пароля..."
                size="small"
                margin="normal"
                fullWidth={true}
                onChange={(e) => field.onChange(e)}
                value={field.value}
                error={!!errors.acceptPassword?.message}
                helperText={errors.acceptPassword?.message}
              />
            )}
          />
          <Box sx={buttonBoxStyle}>
            <Button
              disabled={!isValid}
              sx={continueButtonStyle}
              type="submit"
              color="success"
              size="large"
            >
              Продолжить
            </Button>
            <Button
              onClick={() => {
                router("/");
                reset();
                window.scrollTo(0, 0);
              }}
              sx={cancelButtonStyle}
              color="success"
              size="large"
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default observer(SignUp);
