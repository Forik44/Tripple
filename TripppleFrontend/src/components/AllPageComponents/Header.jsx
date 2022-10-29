import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Toolbar, Grid, Typography, Box } from "@mui/material";
import { Context } from "../../App";
import { useModal } from "../../hooks/useModal";

const Header = () => {
  const router = useNavigate();
  const { openModal } = useModal();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={6} sm={7} md={9}>
            <Box sx={{ textAlign: "left", m: 1, mt: 1.5 }}>
              {/* кнопка-логотип */}
              <Button
                color="inherit"
                size="large"
                sx={{ ml: "3rem" }}
                onClick={() => {
                  router("/");
                }}
              >
                Tripple
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sm={5}
            md={3}
            display="flex"
            justifyContent={"center"}
          >
            {/* кнопка входа */}
            <Button color="inherit" size="large" onClick={openModal}>
              Войти
            </Button>
            <Button
              color="inherit"
              size="large"
              onClick={() => {
                router("/sign-up");
              }}
            >
              Регистрация
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
