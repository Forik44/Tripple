import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import AccessoryCard from "./AccessoryCard";
import { FilterMenu } from "./FilterMenu/FilterMenu";
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
            <FilterMenu/>
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
