import { TextField } from "@mui/material";


const SearchPanel = (props) =>{
    

    return(
        <TextField 
            id="outlined-basic" 
            placeholder="Найти..."
            variant="outlined" 
            value = {props.value}
            onChange = {(e, newValue) => props.onChange(newValue)}
            />
    );
}

export default SearchPanel;