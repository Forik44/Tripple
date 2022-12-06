import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import AccessoryConfCard from "./AccessoryConfCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccAccordion = (props) => {
  return (
    <Accordion sx={{ width: "100%", backgroundColor: "#0e151c" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#66FCF1" }} />}
        sx={{
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-90deg)",
          },
        }}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography color="#66FCF1">{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {props.data.map((item) => (
          <AccessoryConfCard
            key={item.title}
            data={item}
            choosen={props.choosen}
            changeChoosen={(id) => props.changeChoosen(id)}
          />
        ))}
        <Button
          disabled={!props.choosen}
          onClick={() => {
            props.changeIndex(props.index + 1);
          }}
        >
          Сохранить
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccAccordion;
