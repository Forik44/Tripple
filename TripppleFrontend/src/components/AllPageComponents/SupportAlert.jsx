import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";

const SupportAlert = () => {
  const { store } = useContext(Context);
  return (
    <>
      {store.alertVariant ? (
        <Snackbar
          open={store.supportAlertIsOpen}
          autoHideDuration={5000}
          onClose={() => {
            store.setAlertIsOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              store.setAlertIsOpen(false);
            }}
            severity="success"
            sx={{ width: "100%" }}
          >
            {store.supportAlertMessage}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={store.supportAlertIsOpen}
          autoHideDuration={5000}
          onClose={() => {
            store.setAlertIsOpen(false);
          }}
        >
          <Alert
            onClose={() => {
              store.setAlertIsOpen(false);
            }}
            severity="error"
            sx={{ width: "100%" }}
          >
            {store.supportAlertMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default observer(SupportAlert);
