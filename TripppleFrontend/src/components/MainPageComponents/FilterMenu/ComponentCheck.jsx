import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

const ComponentCheck = (props) => {
  useEffect(() => {
    setState(() => {
      const arr = {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
      };
      arr[props.category] = true;
      return arr;
    });
  }, [props.category]);
  const [state, setState] = React.useState({
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
  });

  const handleChange = (event) => {
    if (event.target.id === props.category) {
      setState({
        ...state,
      });
    } else {
      setState({
        ...state,
        [props.category]: false,
        [event.target.id]: event.target.checked,
      });
      props.onChange(event.target.id);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        component="fieldset"
        sx={{
          m: 3,
          margin: "0px",
        }}
        variant="standard"
      >
        <FormGroup sx={{ color: "#66FCF1" }}>
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["0"]}
                onChange={handleChange}
                name="All"
                id="0"
              />
            }
            label="Все"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["1"]}
                onChange={handleChange}
                name="CPU"
                id="1"
              />
            }
            label="Процессор"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["2"]}
                onChange={handleChange}
                name="GPU"
                id="2"
              />
            }
            label="Видеокарта"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["3"]}
                onChange={handleChange}
                name="MotherBoard"
                id="3"
              />
            }
            label="Материнская плата"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["4"]}
                onChange={handleChange}
                name="RAM"
                id="4"
              />
            }
            label="Оперативная память"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["5"]}
                onChange={handleChange}
                name="HDD"
                id="5"
              />
            }
            label="HDD"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["6"]}
                onChange={handleChange}
                name="SSD"
                id="6"
              />
            }
            label="SSD"
            sx={{ color: "#66FCF1" }}
          />

          <FormControlLabel
            control={
              <Checkbox
                color="success"
                sx={{ color: "#66FCF1" }}
                checked={state["7"]}
                onChange={handleChange}
                name="PowerBlock"
                id="7"
              />
            }
            label="Блок питания"
            sx={{ color: "#66FCF1" }}
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
};
export default observer(ComponentCheck);
