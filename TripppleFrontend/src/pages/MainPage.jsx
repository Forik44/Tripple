import React, { useContext, useEffect } from "react";
import "../App.css";
import { Container, Button, Grid } from "@mui/material";
import { useState } from "react";
// import { CategoryNavigation } from "../components/MainPageComponents/CategoryNavigation";
import Welcome from "../components/MainPageComponents/Welcome";
import { getPagesCount } from "../components/utils/getPagesCount";
import AccessoryList from "../components/MainPageComponents/AccessoryList";
import { observer } from "mobx-react-lite";
import AccessoryService from "../API/AccessoryService";
import SearchPanel from "../components/MainPageComponents/SearchPanel";
import { Context } from "../App";
import Loader from "../components/AllPageComponents/Loader";
import { Box } from "@mui/material";
const MainPage = () => {
  const [data, setData] = useState([]);

  const [totalCount, setTotalCount] = useState(0);

  const [limit, setLimit] = useState(4);

  const [totalPages, setTotalPages] = useState(0);
  const { store } = useContext(Context);

  async function fetchAccessByCategory() {
    try {
      store.setLoader(true);
      let response = {};
      if (localStorage.getItem("token")) {
        response = await AccessoryService.getCategoryByUser(
          limit,
          store.page,
          store.actualSearch,
          store.minPrice,
          store.maxPrice,
          store.category
        );
      } else {
        response = await AccessoryService.getCategory(
          limit,
          store.page,
          store.actualSearch,
          store.minPrice,
          store.maxPrice,
          store.category
        );
      }
      setData([...response.data]);
      setTotalCount(Number(response.headers["x-total-count"]));
      setTotalPages(
        getPagesCount(Number(response.headers["x-total-count"]), limit)
      );
    } catch (err) {
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    } finally {
      store.setLoader(false);
    }
  }
  async function fetchEvents() {
    try {
      store.setLoader(true);
      let response = {};
      if (localStorage.getItem("token")) {
        response = await AccessoryService.getAllAccessoryByUser(
          limit,
          store.page,
          store.actualSearch,
          store.minPrice,
          store.maxPrice
        );
      } else {
        response = await AccessoryService.getAllAccessory(
          limit,
          store.page,
          store.actualSearch,
          store.minPrice,
          store.maxPrice
        );
      }
      setData([...response.data]);
      setTotalCount(Number(response.headers["x-total-count"]));
      setTotalPages(
        getPagesCount(Number(response.headers["x-total-count"]), limit)
      );
    } catch (err) {
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    } finally {
      store.setLoader(false);
    }
  }
  useEffect(() => {
    if (store.page == 1) {
      if (!store.isAuth) {
        setData(
          data.map((item) => {
            return { ...item, isBucket: false, amount: 0 };
          })
        );
      } else {
        fetchEvents();
      }
    }
    store.setPage(1);
    store.setActualSearch("");
    store.setTempSearch("");
    store.setCategory(0);
    store.setMaxPrice(99999);
    store.setMinPrice(0);
  }, [store.isAuth]);

  useEffect(() => {
    if (store.category == 0) {
      fetchEvents();
    } else {
      fetchAccessByCategory();
    }
  }, [
    store.page,
    store.actualSearch,
    store.maxPrice,
    store.minPrice,
    store.category,
  ]);

  return (
    <>
      <Container
        disableGutters
        sx={{
          px: "1rem",
          mb: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Welcome />
        <Grid container sx={{ mx: "1rem" }}>
          <Grid
            item
            xs={12}
            md={11}
            display="flex"
            alignItems="center"
            sx={{ my: "1rem" }}
          >
            <SearchPanel />
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              size="small"
              color="success"
              onClick={() => {
                store.setActualSearch(store.tempSearch);
                store.setPage(1);
              }}
              variant="outlined"
            >
              Найти
            </Button>
          </Grid>
        </Grid>
        {store.loader ? (
          <Loader />
        ) : (
          <AccessoryList data={data} totalPages={totalPages} />
        )}
      </Container>
    </>
  );
};

export default observer(MainPage);
