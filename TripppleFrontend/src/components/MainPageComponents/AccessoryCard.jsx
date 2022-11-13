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

export default function AccessoryCard(props) {
  const inBucket = () => {
    setSave(true);
    setAmount(1);
  };
  const RemoveItemFromBucket = () => {
    setSave(false);
    setAmount(0);
  };
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(0);
  const { openModal } = useModal();
  const [save, setSave] = useState(props.data.save);
  const [color, setColor] = useState("white");
  const router = useNavigate();

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "start",
        ml: "1rem",
        mr: "1rem",
        mt: "1rem",
        background: "#2C427375",
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
                setColor("white");
              }}
              onClick={() => {
                router(`/shop/${props.data.id}`);
                window.scrollTo(0, 0);
              }}
            >
              {props.data.title}
            </Typography>
            <Typography variant="body2" color="#0BFD71">
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
                color="inherit"
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
                    onClick={() => {
                      amount == 1
                        ? RemoveItemFromBucket()
                        : setAmount(amount - 1);
                    }}
                  >
                    <RemoveIcon sx={{ color: "white" }} />
                  </Button>
                  <span>{amount}</span>
                  <Button
                    disableRipple
                    onClick={() => {
                      if (amount < 9) {
                        setAmount(amount + 1);
                      }
                    }}
                  >
                    <AddIcon sx={{ color: "white" }} />
                  </Button>
                </Stack>
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  onClick={() => {
                    setSave(false);
                  }}
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
}
