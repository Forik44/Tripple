import { Box } from "@mui/system";
import React, { useContext } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import FilterAccordions from "./FilterAccordions";


export function FilterMenu(){
    
    return(
        <Box
          sx ={{
              position: "sticky",
              top: "3%",
              //bottom: "0px",
              width: "90%",
              height: "20%",
              display: "flex",
              justifyContent: "start",
              ml: "1rem",
              mr: "1rem",
              mt: "1rem",
              
          }}>            
          <FilterAccordions/>
        </Box>
    )
}