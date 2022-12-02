import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/AllPageComponents/Layout";
import AccessoryPage from "./pages/AccessoryPage";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp/SignUp";
import "./App.css";
import { ModalProvider } from "./hoc/ModalProvider";
import Store from "./store/store";
import { createContext } from "react";
import { observer } from "mobx-react-lite";
import Basket from "./pages/Basket/Basket";

const store = new Store();
export const Context = createContext({
  store,
});

function App() {
  return (
    <BrowserRouter>
      <Context.Provider value={{ store }}>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<MainPage />} />
              <Route path="shop/:id" element={<AccessoryPage />} />
              <Route path="/sign-up" element={<SignUp />} />
              {store.isAuth && <Route path="/basket" element={<Basket />} />}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ModalProvider>
      </Context.Provider>
    </BrowserRouter>
  );
}

export default observer(App);
