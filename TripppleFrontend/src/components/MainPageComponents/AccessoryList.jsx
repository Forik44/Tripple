import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";
import Typography from "@mui/material/Typography";
import AccessoryCard from "./AccessoryCard";
import { FilterMenu } from "./FilterMenu/FilterMenu";
import MyPagination from "./MyPagination";
import { Button } from "@mui/material";

export function AccessoryList(props) {
  const { store } = useContext(Context);

  //const [currentHeight, setCurrentHeight] = useState(0);

  return props.data.length ? (
    <>
      <Grid container>
        <Grid item xs={9}>
          {props.data.map((dat) => (
            <AccessoryCard key={dat.amount + "id" + dat.id} data={dat} />
          ))}
        </Grid>
        <Grid item xs={3}>
          <FilterMenu />
        </Grid>
      </Grid>

      <MyPagination count={props.totalPages} />
    </>
  ) : (
    <Box display={"flex"} flexDirection="column" alignItems={"center"}>
      <Typography
        align="center"
        color="#66FCF1"
        fontSize={"2rem"}
        sx={{ mt: 5, mb: 1 }}
      >
        {" "}
        Ничего не найдено
      </Typography>
      <Button
        color="success"
        sx={{ background: "#45A29E", borderRadius: "20px" }}
        onClick={() => {
          store.setCategory(0);
          store.setTempSearch("");
          store.setActualSearch("");
          store.setMaxPrice(99999);
          store.setMinPrice(0);
          store.setPage(1);
        }}
      >
        {" "}
        Сброс фильтров
      </Button>
    </Box>
  );
}

export default observer(AccessoryList);
