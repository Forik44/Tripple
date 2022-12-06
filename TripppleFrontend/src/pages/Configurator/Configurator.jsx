import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ConfiguratorService from "../../API/ConfiguretorService";
import AccAccordion from "./AccAccordion";

const Configurator = () => {
  const [index, setIndex] = useState(0);
  const title = [
    "Процессор",
    "Видеокарта",
    "Материнская плата",
    "Оперативная память",
    "Накопители",
    "Блок питания",
  ];
  async function fetchData(ind) {
    const response = await ConfiguratorService.getAccess(
      index,
      choosen.slice(0, ind)
    );
    setData((prev) => {
      const arr = [...prev];
      arr[index] = response.data.data;
      return arr;
    });
  }

  const [choosen, setChoosen] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  useEffect(() => {
    try {
      fetchData(index);
    } catch (err) {
      throw err;
    }
  }, [index]);
  const [data, setData] = useState([[], [], [], [], [], []]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        width="80%"
      >
        <Typography
          color="#66FCF1"
          align="center"
          fontSize={"2rem"}
          sx={{ width: "80%", my: "2rem" }}
        >
          Соберите нужный вам набор комплектующих
        </Typography>
        {title.map((item, index) => (
          <AccAccordion
            index={index}
            changeIndex={(i) => setIndex(i)}
            key={item}
            title={item}
            data={data[index]}
            choosen={choosen[index]}
            changeChoosen={(id) =>
              setChoosen((prev) => {
                const arr = [...prev];
                arr[index] = id;
                return arr;
              })
            }
          />
        ))}
        {/* <Accordion sx={{ width: "100%", backgroundColor: "#0e151c" }}>
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
            <Typography color="#66FCF1">Процессор</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {apu.map((item) => (
              <AccessoryConfCard
                key={item.title}
                data={item}
                choosen={choosen}
                changeChoosen={(id) => setChoosen(id)}
              />
            ))}
            <Button disabled={!choosen} onClick={() => setCpuId(choosen)}>
              Сохранить
            </Button>
          </AccordionDetails>
        </Accordion>
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
            <Typography color="#66FCF1">Материнская плата</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {mb.map((item) => (
              <AccessoryConfCard
                key={item.title}
                data={item}
                choosen={choosen1}
                changeChoosen={(id) => setChoosen1(id)}
              />
            ))}
          </AccordionDetails>
        </Accordion> */}
      </Box>
    </Box>
  );
};

export default Configurator;
