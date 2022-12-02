import React, { useContext, useState } from "react";
import { useModal } from "../../hooks/useModal";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";

const AccessoryBusketCard = (props) => {
  const inBucket = async () => {
    setSave(true);
    setAmount(1);
    await store.appendBucketItem(props.data.id);
  };
  async function ChangeAmount(count) {
    let new_amount = amount + count;
    setAmount(new_amount);
    if (choose) {
      props.onChange(data.id, "upd", new_amount, props.data.price);
    }
    await store.changeAmountInBucket(props.data.id, new_amount);
  }
  const RemoveItemFromBucket = async () => {
    setSave(false);
    setAmount(0);
    props.onChange(data.id, false, 0, 0);
    props.onDel(data.id);
    await store.deleteBucketItem(props.data.id);
  };
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(
    props.data.amount ? props.data.amount : 0
  );
  const { openModal } = useModal();
  const [save, setSave] = useState(props.data.isBucket);
  const [color, setColor] = useState("#66FCF1");
  const [data, setData] = useState(props.data);
  const router = useNavigate();
  const [choose, setChoose] = useState(false);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "start",
        ml: "1rem",
        mr: "1rem",
        mt: "1rem",
        background: "#0e151c",
        borderRadius: "20px",
      }}
    >
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={2} display="flex" justifyContent={"center"}>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Checkbox
              sx={{ color: "#66FCF1" }}
              color="success"
              checked={choose}
              onChange={() => {
                props.onChange(data.id, !choose, data.amount, data.price);
                setChoose((prev) => !prev);
              }}
            />
          </CardActions>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ cursor: "pointer", mb: "0.5rem" }}
              color={color}
              onMouseEnter={() => {
                setColor("#45A29E");
              }}
              onMouseLeave={() => {
                setColor("#66FCF1");
              }}
              onClick={() => {
                router(`/shop/${props.data.id}`);
                window.scrollTo(0, 0);
              }}
            >
              {props.data.title}
            </Typography>
            {!save ? (
              <Button
                size="small"
                variant="outlined"
                color="success"
                onClick={() => {
                  store.isAuth ? inBucket() : openModal();
                }}
              >
                В корзину
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="white">Цена: {data.price}</Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  // sx={{ mb: "0.5rem" }}
                >
                  <Button
                    disableRipple
                    variant="raised"
                    onClick={() => {
                      amount == 1 ? RemoveItemFromBucket() : ChangeAmount(-1);
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
                  Удалить
                </Button>
              </Box>
            )}
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={3}>
          <CardMedia
            sx={{ width: "80%", ml: "2rem", my: "1rem" }}
            component="img"
            image={"http://127.0.0.1:8000" + props.data.photo}
            alt="картинка"
          />
        </Grid>
      </Grid>
    </Card>
  );
};
export default observer(AccessoryBusketCard);
