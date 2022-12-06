import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import ConfiguratorService from "../../API/ConfiguretorService";
import AccAccordion from "./AccAccordion";

const Configurator = () => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (id) => (event, newExpanded) =>
    [
      setExpanded((prev) => {
        if (!newExpanded) {
          return false;
        } else {
          return id;
        }
      }),
      console.log(expanded),
    ];
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

  const [choosen, setChoosen] = useState([false, false, false, [], [], false]);
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
        {title.map((item, ind) => (
          <AccAccordion
            index={index}
            changeIndex={(i) => setIndex(i)}
            key={ind}
            id={ind}
            expanded={expanded}
            changeExpanded={() => handleChange(ind)}
            title={item}
            data={data[ind]}
            choosen={choosen[ind]}
            changeChoosen={(id) =>
              setChoosen((prev) => {
                const arr = [...prev];
                arr[ind] = id;
                return arr;
              })
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default Configurator;
