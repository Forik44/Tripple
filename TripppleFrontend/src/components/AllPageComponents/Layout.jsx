import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Context } from "../../App";
import AuthModal from "./AuthModal/AuthModal";
import { Footer } from "./Footer";
import Header from "./Header";

const Layout = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token") && Object.keys(store.user).length === 0) {
      store.getUser();
    }
  }, [store.isAuth]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AuthModal />
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default observer(Layout);
