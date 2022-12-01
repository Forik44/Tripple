import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import UserService from "../API/UserService";
import { Box, Typography, Button, Grid } from "@mui/material";
import AccessoryCard from "../components/MainPageComponents/AccessoryCard";
const Basket = () => {
  const [data, setData] = useState([]);
  async function fetchBasket() {
    try {
      const response = await UserService.getBasket();
      setData(response.data);
    } catch (err) {}
  }
  useEffect(() => {
    fetchBasket();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        color="#66FCF1"
        align="center"
        fontSize={"2rem"}
        sx={{ width: "80%", my: "1rem" }}
      >
        Выберите товары, которые собираетесь приобрести
      </Typography>
      <Box sx={{ width: "80%" }}>
        {data.map((dat) => (
          <AccessoryCard key={dat.amount + "id" + dat.id} data={dat} />
        ))}
      </Box>
    </Box>
  );
};

export default observer(Basket);
