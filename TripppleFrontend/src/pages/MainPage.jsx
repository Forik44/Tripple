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
const MainPage = () => {
  
  //состояние, в котором хранится информация о всех комплектующих
  const [data, setData] = useState([]);
  //состояние, в котором хранится номер выбранной категории комплектующего
  //   const [selectCategory, setSelectCategory] = useState(0);

  //состояние, в котором хранится номер открытой в данный момент страницы в списке мероприятий
  const [actualPage, setActualPage] = useState(1);
  //состояние, в котором хранится общее количество мероприятий
  const [totalCount, setTotalCount] = useState(0);
  //состояние, в котором хранится лимит на количество ивентов на одной странице
  const [limit, setLimit] = useState(4);
  //состояние, в котором хранится общее количество страниц
  const [totalPages, setTotalPages] = useState(0);
  const { store } = useContext(Context);

  const [searchValue, setSearchValue] = useState("");
  const [searchTempValue, setSearchTempValue] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [category, setCategory] = useState(-1);
  const [filterApplied, setFilterApplied] = useState(false);

  async function fetchEvents() {
    let response = {};
    if (localStorage.getItem("token")) {
      response = await AccessoryService.getAllAccessoryByUser(
        limit,
        actualPage,
        searchValue,
        minPrice,
        maxPrice,
        category,
      );
    } else {
      response = await AccessoryService.getAllAccessory(
        limit,
        actualPage,
        searchValue,
        minPrice,
        maxPrice,
        category,
      );
    }
    setData([...response.data]);
    setTotalCount(Number(response.headers["x-total-count"]));
    setTotalPages(
      getPagesCount(Number(response.headers["x-total-count"]), limit)
    );
  }
  useEffect(() => {
    if (actualPage == 1) {
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
    setActualPage(1);
    setSearchTempValue("");
    setSearchValue("");
  }, [store.isAuth]);

  useEffect(() => {
    fetchEvents();
  }, [actualPage, searchValue, filterApplied]);

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
            <SearchPanel
              value={searchTempValue}
              onChange={(str) => setSearchTempValue(str)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // mr: "1rem",
            }}
          >
            <Button
              size="small"
              color="success"
              onClick={() => {
                setSearchValue(searchTempValue);
                setActualPage(1);
              }}
              variant="outlined"
            >
              Найти
            </Button>
          </Grid>
        </Grid>

        <AccessoryList
          data={data}
          actualPage={actualPage}
          setActualPage={setActualPage}
          totalPages={totalPages}
        />
      </Container>
    </>
  );
};

export default observer(MainPage);
