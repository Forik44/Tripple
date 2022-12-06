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

const AccessoryConfCard = (props) => {
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(0);
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
              disabled={props.choosen && !choose}
              checked={choose}
              onChange={() => {
                if (choose) {
                  props.changeChoosen(false);
                  setChoose((prev) => !prev);
                } else {
                  props.changeChoosen(data.id);
                  setChoose((prev) => !prev);
                }
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
            <Box
              sx={{
                display: "flex",

                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="white">Цена: {data.price}</Typography>
            </Box>
          </CardContent>
        </Grid>

        <Grid item xs={12} sm={3}>
          <CardMedia
            sx={{ width: "80%", ml: "2rem", my: "1rem" }}
            component="img"
            style={{ width: "150px" }}
            image={"http://127.0.0.1:8000" + props.data.photo}
            alt="картинка"
          />
        </Grid>
      </Grid>
    </Card>
  );
};
export default observer(AccessoryConfCard);
