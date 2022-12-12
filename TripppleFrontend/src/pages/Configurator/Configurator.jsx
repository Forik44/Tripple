import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import ConfiguratorService from "../../API/ConfiguretorService";
import AccAccordion from "./AccAccordion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../App";

const Configurator = () => {
  const { store } = useContext(Context);
  const router = useNavigate();
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
  async function postData() {
    try {
      await ConfiguratorService.postAccess(choosen);
      store.setAlertMessage("Комплектующие успешно добавлены в корзину");
      store.setAlertVariant(true);
      store.setAlertIsOpen(true);
    } catch (err) {
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    }
  }
  async function fetchData(ind) {
    try {
      store.setLoader(true);
      const response = await ConfiguratorService.getAccess(
        index,
        choosen.slice(0, ind)
      );
      setData((prev) => {
        const arr = [...prev];
        arr[index] = response.data.data;
        return arr;
      });
    } catch (err) {
      store.setAlertMessage(String(err.response.data));
      store.setAlertVariant(false);
      store.setAlertIsOpen(true);
    } finally {
      store.setLoader(false);
    }
  }

  const [choosen, setChoosen] = useState([false, false, false, [], [], false]);
  useEffect(() => {
    fetchData(index);
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
        <Box display="flex">
          <Button
            onClick={async () => {
              await postData();
              router("/");
              window.scrollTo(0, 0);
            }}
            disabled={!choosen[5]}
            color="success"
            size="large"
            sx={{
              m: "1rem",
              padding: "8px",
              borderRadius: "20px",
              background: "#45A29E",
              borderRadius: "20px",
            }}
          >
            Сохранить сборку
          </Button>
          <Button
            onClick={() => {
              setData([[], [], [], [], [], []]);
              setChoosen([false, false, false, [], [], false]);
              setExpanded(false);
              setIndex(0);
            }}
            color="success"
            size="large"
            sx={{
              m: "1rem",
              padding: "8px",
              borderRadius: "20px",
              background: "#8300ff",
              borderRadius: "20px",
            }}
          >
            Сбросить сборку
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Configurator;
