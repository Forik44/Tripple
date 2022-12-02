import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import UserService from "../../API/UserService";
import { Box, Typography, Button, Grid } from "@mui/material";
import AccessoryBasketCard from "./AccessoryBusketCard";
const Basket = () => {
  function delCard(id) {
    setData((prev) => prev.filter((item) => item.id != id));
  }
  const [data, setData] = useState([]);
  const [sum, setSum] = useState(0);
  const [addedList, setAddedList] = useState([0]);
  async function fetchBasket() {
    try {
      const response = await UserService.getBasket();
      setData(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    fetchBasket();
  }, []);
  useEffect(() => {
    let summ = 0;
    console.log(addedList);
    if (addedList.length > 1) {
      addedList.forEach((item, i) => {
        if (i !== 0) {
          summ += item.count * item.price;
        }
      });
    }
    setSum(summ);
  }, [addedList, addedList[0]]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {data.length && (
        <Typography
          color="#66FCF1"
          align="center"
          fontSize={"2rem"}
          sx={{ width: "80%", my: "1rem" }}
        >
          Выберите товары, которые собираетесь приобрести
        </Typography>
      )}
      {!data.length && (
        <Typography
          color="#66FCF1"
          align="center"
          fontSize={"2rem"}
          sx={{ width: "80%", my: "1rem" }}
        >
          {" "}
          Корзина пустая
        </Typography>
      )}
      {data.length && (
        <Box sx={{ width: "80%" }}>
          {data.map((dat) => (
            <AccessoryBasketCard
              key={dat.amount + "id" + dat.id}
              data={dat}
              value={dat.choose}
              onChange={(id, move, count, price) => {
                if (move) {
                  setAddedList((prev) => [
                    ...prev,
                    { id: id, count: count, price: price },
                  ]);
                }
                if (!move) {
                  setAddedList((prev) => prev.filter((item) => item.id != id));
                }
                if (move == "upd") {
                  let arr = [...addedList];
                  arr[0] = arr[0] + 1;
                  let index = arr.findIndex((item) => item.id == id);
                  arr[index].count = count;
                  setAddedList(arr);
                }
              }}
              onDel={(id) => delCard(id)}
            />
          ))}
          <Grid container>
            <Grid item xs={6} sx={{ my: "1.5rem" }}>
              <Typography color="#66FCF1" fontSize={"2rem"} sx={{ ml: "1rem" }}>
                Стоимость заказа: {sum}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                my: "1.5rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                color="success"
                sx={{ mr: "1.1rem" }}
              >
                Оформить заказ
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default observer(Basket);
