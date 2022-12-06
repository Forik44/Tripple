import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ComponentSelector() {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box 
        sx={{minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="demo-simple-select"> Age </InputLabel>
        <Select
          //labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          placeholder= "Тип комплектующего..."
          onChange={handleChange}
        >
          <MenuItem value={10}>Процессор</MenuItem>
          <MenuItem value={20}>Видеокарта</MenuItem>
          <MenuItem value={30}>Материнская плата</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}