import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function ComponentCheck() {
  const [state, setState] = React.useState({
    All: true,
    CPU: false,
    GPU: false,
    MotherBoard: false,
    PowerBlock: false,
    SSD: false,
    HDD: false,
    RAM: false,
    });
    const [currentChecked, setCurrentChecked] = React.useState("All")
    

  const handleChange = (event) => {
    if (event.target.name === currentChecked) {
        setState({
            ...state,
            [All] : true,
        })
    }
    else{
        setState({
            ...state,
            [currentChecked]: false,
            [event.target.name]: event.target.checked,
        });
        setCurrentChecked(event.target.name);
    }
  };

  const { All, CPU, GPU, MotherBoard, PowerBlock, SSD, HDD, RAM } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <FormControl
        required
        //error={error}
        component="fieldset"
        sx={{ 
            m: 3 ,
            margin: "0px",    
        }}
        variant="standard"
      >
        <FormGroup>
            <FormControlLabel
            control={
              <Checkbox checked={All} onChange={handleChange} name="All" id = "0"/>
            }
            label="Все"
          />
          <FormControlLabel
            control={
              <Checkbox checked={CPU} onChange={handleChange} name="CPU" id ="1"/>
            }
            label="Процессор"
          />
          <FormControlLabel
            control={
              <Checkbox checked={GPU} onChange={handleChange} name="GPU" id = "2"/>
            }
            label="Видеокарта"
          />
          <FormControlLabel
            control={
              <Checkbox checked={MotherBoard} onChange={handleChange} name="MotherBoard" id = "3"/>
            }
            label="Материнская плата"
          />
          <FormControlLabel
            control={
              <Checkbox checked={RAM} onChange={handleChange} name="RAM" id = "4"/>
            }
            label="Оперативная память"
          />
          <FormControlLabel
            control={
              <Checkbox checked={HDD} onChange={handleChange} name="HDD" id = "5"/>
            }
            label="HDD"
          />
          <FormControlLabel
            control={
              <Checkbox checked={SSD} onChange={handleChange} name="SSD" id = "6"/>
            }
            label="SSD"
          />
          
          <FormControlLabel
            control={
              <Checkbox checked={PowerBlock} onChange={handleChange} name="PowerBlock" id = "7"/>
            }
            label="Блок питания"
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
      </FormControl>
    </Box>
  );
}