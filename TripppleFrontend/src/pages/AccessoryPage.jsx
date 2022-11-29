import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import AccessoryService from "../API/AccessoryService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Context } from "../App";
import { useModal } from "../hooks/useModal";

const AccessoryPage = () => {
  const { openModal } = useModal();
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(0);
  const [save, setSave] = useState(false);
  const { id } = useParams();
  const [accessory, setAccessory] = useState({});
  const [config, setConfig] = useState({});
  const inBucket = async () => {
    setSave(true);
    setAmount(1);
    await store.appendBucketItem(accessory.id);
  };
  async function ChangeAmount(count) {
    let new_amount = amount + count;
    setAmount(new_amount);
    await store.changeAmountInBucket(accessory.id, new_amount);
  }
  const RemoveItemFromBucket = async () => {
    setSave(false);
    setAmount(0);
    await store.deleteBucketItem(accessory.id);
  };
  async function fetchAccessory(id) {
    const response = await AccessoryService.getAccessoryById(id);
    setAccessory(response.data);
    setSave(response.data.isBucket);
    setAmount(response.data.amount);
    const response2 = await AccessoryService.getConfiguration(
      response.data.category_id,
      response.data.accessory_id
    );
    setConfig(response2.data);
  }
  useEffect(() => {
    fetchAccessory(id);
  }, []);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          my: "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "85%",
        }}
      >
        <Typography color="#66FCF1" fontSize={"2rem"} sx={{ mb: "1rem" }}>
          {accessory.title}
        </Typography>
        <Grid container sx={{ width: "80%" }}>
          <Grid item xs={12} md={6}>
            <img
              style={{ maxWidth: "300px" }}
              src={"http://127.0.0.1:8000" + accessory.photo}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "#0e151c",
                borderRadius: "10px",
                height: "100%",
                px: "1.5rem",
                py: "0.5rem",
              }}
            >
              <ul>
                {Object.keys(config).map((oneKey, i) => {
                  return (
                    <li style={{ color: "#66FCF1" }} key={i}>
                      <Typography color="#66FCF1">
                        {config[oneKey]["verbose_name"]} :{" "}
                        {config[oneKey]["value"]}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <Typography color="white" fontSize="120%">
                    Цена: {accessory.price}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  display="flex"
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  {!save ? (
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ my: "1rem" }}
                      color="success"
                      onClick={() => {
                        store.isAuth ? inBucket() : openModal();
                      }}
                    >
                      Добавить в корзину
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ mt: "0.5rem" }}
                      >
                        <Button
                          disableRipple
                          variant="raised"
                          onClick={() => {
                            amount == 1
                              ? RemoveItemFromBucket()
                              : ChangeAmount(-1);
                          }}
                        >
                          <RemoveIcon sx={{ color: "#66FCF1" }} />
                        </Button>
                        <span style={{ color: "#66FCF1" }}>{amount}</span>
                        <Button
                          disableRipple
                          variant="raised"
                          onClick={() => {
                            if (amount < 9) {
                              ChangeAmount(1);
                            }
                          }}
                        >
                          <AddIcon sx={{ color: "#66FCF1" }} />
                        </Button>
                      </Stack>
                      <Button
                        size="small"
                        variant="raised"
                        sx={{ color: "red" }}
                        onClick={() => RemoveItemFromBucket()}
                      >
                        Убрать из корзины
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AccessoryPage;
