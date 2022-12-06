import * as React from 'react';
import Box from '@mui/material/Box';
import Slider, { SliderValueLabel } from '@mui/material/Slider';
import { Grid, Input, TextField } from '@mui/material';

function valuetext(value) {
  return value;
}

const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

const minDistance = 100;
const minValue = 0;
const maxValue = 99999;

export default function PriceSlider(props) {
  const [inputValue, setInputValue] = React.useState([minValue, maxValue]);
  const [sliderValue, setSliderValue] = React.useState([minValue, maxValue]);
  
  const handleSliderChange = (event, newValue, activeThumb, checkInput) => {
    if (!Array.isArray(newValue)) {
      console.log(event);
      return;
    }
    if (activeThumb === 0) {
      if (checkInput) {
        if(newValue[0]>sliderValue[1]){
          console.log("error");
        }
        else{
          props.onChange(true,false);
          setSliderValue(()=>{
            console.log(newValue);
            return [Math.min(newValue[0], newValue[1] - minDistance), newValue[1]]
          });
        }
      }
      else{
        handleInputChange(0,0,newValue);
        setSliderValue(()=>{
          return [Math.min(newValue[0], sliderValue[1] - minDistance), sliderValue[1]]
        });
      }
    } else {
      if (checkInput) {
        if(newValue[1]<sliderValue[0]){
          console.log("error");
        }
        else{
          props.onChange(false,false);
          setSliderValue(()=>{
            console.log(newValue);
            return [newValue[0], Math.max(newValue[1], newValue[0] + minDistance)];
          });
        }
      }
      else{
      setSliderValue(()=>{
        handleInputChange(0,0,newValue);
        return[sliderValue[0], Math.max(newValue[1], sliderValue[0] + minDistance)];
        })
      }
    }
  };

  function handleInputChange (event, index, valueFromSlider) {
    
    if (Array.isArray(valueFromSlider)) {
      props.onChange(false,false);
      props.onChange(true,false);
      setInputValue(()=>[valueFromSlider[0],valueFromSlider[1]]);
      return
    }
    
    if (index){setInputValue((prev)=>{
        //const newValue = event.target.value === '' || event.target.value>maxValue ? maxValue : Number(event.target.value);
        const newValue =  event.target.value.length===0? "": !isNaN(event.target.value)? Number(event.target.value): prev[0];
        
        console.log(newValue);
        if (newValue<prev[0] || newValue>maxValue || newValue < minValue) {
          props.onChange(false,true);
          return[prev[0], newValue]
        }
        else{
          console.log(`prev = ${prev}`);
          handleSliderChange(1,[prev[0], newValue] ,index, true);
          return [prev[0],newValue];  
        }})
    }else{
        setInputValue((prev)=>{
          console.log(event.target.value)
          const newValue =  event.target.value.length===0? "": !isNaN(event.target.value)? Number(event.target.value): prev[0];
          console.log(newValue);
          if (newValue>prev[1] || newValue>maxValue || newValue < minValue) {
            
            props.onChange(true,true);
            
            return[newValue, prev[1]];  
          }
          else{
            console.log(`prev = ${prev}`);
            handleSliderChange(1,[newValue, prev[1]],index, true);
            return[newValue, prev[1]];
          }})}
    }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} display="flex" justifyContent={"center"}>
            <Slider
                getAriaLabel={() => 'Minimum distance'}
                value={sliderValue}
                onChange={handleSliderChange}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
                disableSwap
                min={minValue}
                max={maxValue}
                name = "slider"
                sx ={{
                   color: "#66FCF1",
                }}
            />
        </Grid>
        <Grid item xs={12} sm={6} display="flex">
            <TextField
                focused
                name = "min"
                value={inputValue[0]}
                size="small"
                onChange={(e)=>handleInputChange(e,0,0)}
                inputProps={{
                  
                  name: "min",
                  step: 10,
                  min: minValue,
                  max: inputValue[1],
                  'aria-labelledby': 'input-min-slider',
                }}
                
                sx = {{
                  input: { color: "#66FCF1" },
                  "& fieldset": { 
                    border: "1px solid #66FCF1",
                    borderRadius: "6px",
                    //borderColor: "#66FCF1",

                  },
                  color: "white",
                  
                }}

                color = "success"
                error = {props.minInvalidate}
                helperText =  {props.minInvalidate ? "Некорректное значение" : ""}
            />
        </Grid>

        <Grid item xs={12} sm={6} display="flex">
            <TextField
                focused
                name = "max"
                value={inputValue[1]}
                size="small"
                onChange={(e)=> handleInputChange(e,1,0)}
                inputProps={{
                  'aria-invalid':"true",
                  min: inputValue[0],
                  max: maxValue,
                  'aria-labelledby': 'input-max-slider',
                }}
                sx = {{
                  input: { color: "#66FCF1" },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#66FCF1',
                    },
                  },
                  '&:hover fieldset': {
                    borderColor: 'yellow',
                  },
                }}
                color = "success"
                error = {props.maxInvalidate}
                helperText =  {props.maxInvalidate ? "Некорректное значение" : ""}
            />
        </Grid>
      </Grid>
      
      
      
    </Box>
  );
}