import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";

import AccessoryCard from "./AccessoryCard";

import MyPagination from "./MyPagination";

export function AccessoryList(props) {
  const { store } = useContext(Context);

  //const [currentHeight, setCurrentHeight] = useState(0);

  return (
    <>
      <Grid container>
        <Grid item xs ={9}>
            {props.data.map((dat) => (
              <AccessoryCard key={dat.amount + "id" + dat.id} data={dat} />
            ))}
        </Grid>
        <Grid item xs = {3}>
            <Box
            sx = {{
              position: "sticky",
              top: "30px",
              width: "100%",
              height: "20%",
              background: "white",
              display: "flex",
              justifyContent: "start",
              ml: "1rem",
              mr: "1rem",
              mt: "1rem",
              borderRadius: "20px",
            }}
            >
            </Box>
        </Grid>
      </Grid>

      <MyPagination
        onChange={(num) => {
          props.setActualPage(num);
        }}
        default={props.actualPage}
        count={props.totalPages}
      />
    </>
  );
}

export default observer(AccessoryList);
