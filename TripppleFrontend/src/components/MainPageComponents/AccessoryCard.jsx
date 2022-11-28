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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { observer } from "mobx-react-lite";

const AccessoryCard = (props) => {
  const inBucket = async () => {
    setSave(true);
    setAmount(1);
    await store.appendBucketItem(props.data.id);
  };
  async function ChangeAmount(count) {
    let new_amount = amount + count;
    setAmount(new_amount);
    await store.changeAmountInBucket(props.data.id, new_amount);
  }
  const RemoveItemFromBucket = async () => {
    setSave(false);
    setAmount(0);
    await store.deleteBucketItem(props.data.id);
  };
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(
    props.data.amount ? props.data.amount : 0
  );
  const { openModal } = useModal();
  const [save, setSave] = useState(props.data.isBucket);
  const [color, setColor] = useState("#66FCF1");
  const router = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "start",
        ml: "1rem",
        mr: "1rem",
        mt: "1rem",
        background: "#1F2833",
        borderRadius: "20px",
      }}
    >
      <Grid container sx={{ alignItems: "center" }}>
        <Grid item xs={12} sm={3}>
          <CardMedia
            sx={{ width: "80%", ml: "2rem", my: "1rem" }}
            component="img"
            image={"http://127.0.0.1:8000" + props.data.photo}
            alt="картинка"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ cursor: "pointer" }}
              color={color}
              onMouseEnter={() => {
                setColor("black");
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
            <Typography variant="body2" color="#45A29E">
              {props.data.content}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={3} display="flex">
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {!save ? (
              <Button
                size="small"
                variant="outlined"
                sx={{}}
                color = "success"
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
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ mb: "0.5rem" }}
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
                  Убрать из корзины
                </Button>
              </Box>
            )}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};
export default observer(AccessoryCard);
