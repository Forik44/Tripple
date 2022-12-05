import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PriceSlider from './PriceSlider';

export default function FilterAccordions() {
  const [expanded, setExpanded] = React.useState(false);
  const [minInvalidate, setMinInvalidate] = React.useState(false);
  const [maxInvalidate, setMaxInvalidate] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        disableGutters 
        square
        expanded={expanded === 'panel1'} 
        onChange={handleChange('panel1')}
        sx ={{
          borderRadius : "20px",
        }}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          sx = {{
            flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
              transform: 'rotate(-90deg)'},
          }}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PriceSlider
            minInvalidate={minInvalidate}
            maxInvalidate ={maxInvalidate}
            onChange = {(flag, newValue)=>{flag? setMinInvalidate(newValue): setMaxInvalidate(newValue)}}
            />
        </AccordionDetails>
      </Accordion>     
    </div>
  );
}


