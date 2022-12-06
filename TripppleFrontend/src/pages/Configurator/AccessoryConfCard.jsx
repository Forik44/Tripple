import React, { useContext, useState } from "react";
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
import { Context } from "../../App";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { observer } from "mobx-react-lite";
import Checkbox from "@mui/material/Checkbox";
const AccessoryConfCard = (props) => {
  const { store } = useContext(Context);
  const [amount, setAmount] = useState(1);
  const [color, setColor] = useState("#66FCF1");
  const [data, setData] = useState(props.data);
  const [choose, setChoose] = useState(false);
  function ChangeAmount(count) {
    let new_amount = amount + count;
    setAmount(new_amount);
    props.changeChoosen([
      ...props.choosen.filter((i) => i[0] != data.id),
      [data.id, new_amount],
    ]);
  }

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
        <Grid item xs={12} md={2} display="flex" justifyContent={"center"}>
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
              disabled={
                (props.type != 4 &&
                  props.type != 3 &&
                  props.choosen &&
                  !choose) ||
                (props.type == 4 && props.choosen.length > 2 && !choose) ||
                (props.type == 3 && props.choosen.length > 0 && !choose)
              }
              checked={choose}
              onChange={() => {
                if (props.type != 4 && props.type != 3) {
                  if (choose) {
                    props.changeChoosen(false);
                    setChoose((prev) => !prev);
                  } else {
                    props.changeChoosen(data.id);
                    setChoose((prev) => !prev);
                  }
                } else {
                  if (choose) {
                    props.changeChoosen(
                      props.choosen.filter((i) => i[0] != data.id)
                    );
                    setChoose((prev) => !prev);
                    setAmount(1);
                  } else {
                    props.changeChoosen([...props.choosen, [data.id, amount]]);
                    setChoose((prev) => !prev);
                  }
                }
              }}
            />
          </CardActions>
        </Grid>
        <Grid item xs={12} md={7}>
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
                window.open(`http://127.0.0.1:3000/shop/${data.id}`);
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
              {props.type == 3 && choose && (
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ mb: "0.5rem" }}
                >
                  <Button
                    disableRipple
                    variant="raised"
                    onClick={() => {
                      if (amount != 1) {
                        ChangeAmount(-1);
                      }
                    }}
                  >
                    <RemoveIcon sx={{ color: "#66FCF1" }} />
                  </Button>
                  <span style={{ color: "#66FCF1" }}>{amount}</span>
                  <Button
                    disableRipple
                    variant="raised"
                    onClick={() => {
                      if (amount < data.amount) {
                        ChangeAmount(1);
                      }
                    }}
                  >
                    <AddIcon sx={{ color: "#66FCF1" }} />
                  </Button>
                </Stack>
              )}
            </Box>
          </CardContent>
        </Grid>

        <Grid item xs={12} md={3}>
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
