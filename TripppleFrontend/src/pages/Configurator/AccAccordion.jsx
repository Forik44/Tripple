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
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const AccAccordion = (props) => {
  return (
    <Accordion
      expanded={
        props.expanded === props.id && Number(props.id) >= Number(props.index)
      }
      disabled={props.id > props.index}
      onChange={props.changeExpanded()}
      sx={{ width: "100%", backgroundColor: "#0e151c" }}
    >
      {Number(props.id) >= Number(props.index) && (
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
      )}
      {Number(props.id) < Number(props.index) && (
        <AccordionSummary
          expandIcon={
            <DoneOutlineIcon
              sx={{ color: "green", fontSize: "100%", ml: "0.4rem" }}
            />
          }
          sx={{
            flexDirection: "row-reverse",
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "rotate(-180deg)",
            },
          }}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography color="green" sx={{ mx: "0.5rem" }}>
            {props.title}
          </Typography>
        </AccordionSummary>
      )}
      <AccordionDetails>
        {props.id == 4 && (
          <Typography color="#66FCF1" sx={{ my: "0.5rem" }} align="center">
            Для данной материнской платы можно добавить три накопителя
          </Typography>
        )}
        {props.data.map((item) => (
          <AccessoryConfCard
            type={props.id}
            key={item.title}
            data={item}
            choosen={props.choosen}
            changeChoosen={(id) => props.changeChoosen(id)}
          />
        ))}
        <Button
          color="success"
          size="large"
          disabled={!props.choosen}
          onClick={() => {
            props.changeIndex(props.index + 1);
          }}
          sx={{
            m: "1rem",
            padding: "8px",
            borderRadius: "20px",
            background: "#8300ff",
            borderRadius: "20px",
          }}
        >
          Сохранить
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccAccordion;
