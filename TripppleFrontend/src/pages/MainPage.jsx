import React, { useContext, useEffect } from "react";
import "../App.css";
import { Container } from "@mui/material";
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

  async function fetchEvents() {
    let response = {};
    if (localStorage.getItem("token")) {
      response = await AccessoryService.getAllAccessoryByUser(
        limit,
        actualPage
      );
    } else {
      response = await AccessoryService.getAllAccessory(limit, actualPage);
    }
    setData([...response.data]);
    setTotalCount(Number(response.headers["x-total-count"]));
    setTotalPages(
      getPagesCount(Number(response.headers["x-total-count"]), limit)
    );
  }
  useEffect(() => {
    setActualPage(1);
  }, [store.isAuth]);

  useEffect(() => {
    fetchEvents();
  }, [actualPage, store.isAuth]);

  return (
    <>
      <Container
        disableGutters
        sx={{
          mb: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Welcome />
        {/* <CategoryNavigation
          value={selectCategory}
          onChange={(num) => setSelectCategory(num)}
        /> */}
        <SearchPanel />
        <AccessoryList
          data={data}
          //   category={selectCategory}
          actualPage={actualPage}
          setActualPage={setActualPage}
          totalPages={totalPages}
        />
      </Container>
    </>
  );
};

export default observer(MainPage);
