import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriceSlider from './PriceSlider';
import ComponentSelector from './ComponentSelector';
import ComponentCheck from './ComponentCheck';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Context } from '../../../App';

export default function FilterAccordions(props) {
  const {store} = React.useContext(Context)
  const [expanded, setExpanded] = React.useState(false);
  const [minInvalidate, setMinInvalidate] = React.useState(false);
  const [maxInvalidate, setMaxInvalidate] = React.useState(false);
  const [filterPrice, setFilterPrice] = React.useState([0,99999]);
  const [category, setCategory] = React.useState("0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        //disableGutters 
        square
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
        sx ={{
          borderRadius : "20px",
          background: "#0e151c",
        }}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx = {{ color : "#66FCF1"}}/>}
          sx = {{
            boxShadow: "0px 0px 0px 0px",
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(-90deg)',},
            "& .MuiPaper-root":{
                boxShadow: "none",
              }
          }}
          boxShadow = "none"
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
          <Typography sx = {{color : "#66FCF1"}}> Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceSlider
            filterPrice={filterPrice}
            onPriceChange = {(newValue) => {setFilterPrice(newValue)}}
            minInvalidate={minInvalidate}
            maxInvalidate ={maxInvalidate}
            onChange = {(flag, newValue)=>{flag? setMinInvalidate(newValue): setMaxInvalidate(newValue)}}
            />

          <Accordion
            sx ={{
              marginTop: 1,
              background: "#0e151c",
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx = {{ color : "#66FCF1"}}/>}
              sx = {{
                flexDirection: 'row-reverse',
                  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(-90deg)',
                  },
              }}>
              <Typography sx = {{color : "#66FCF1"}}>Тип комплектующего</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx = {{
                padding:"0px 16px 16px",
              }}  
            >
              <ComponentCheck
                category = {category}
                onChange = {(id) => {setCategory(id)}}
              />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>

              
        <Box 
        sx = {{
          justifyContent: "center",
          display: "flex",
          alignItems:"center",
          marginBottom: "16px",
        }}>
          <Button
              size="small"
              
              onClick={() => {
                store.setCategory(category)
                store.setMaxPrice(filterPrice[1])
                store.setMinPrice(filterPrice[0])
              }}
              color="success"
              sx = {{
                padding: "8px",
                borderRadius: "20px",
                //color: "black",
                background: "#8300ff",
                borderRadius: "20px",
              }}
            >
              Применить
            </Button>
        </Box>
      </Accordion>     
    </div>
  );
}


