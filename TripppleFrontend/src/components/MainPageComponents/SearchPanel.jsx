import { TextField, Container, Typography } from "@mui/material";

const SearchPanel = (props) => {
  return (
    <TextField
      sx={{
        color: "white",
        backgroundColor: "#1F2833",
        borderRadius: "15px",
        input: { color: "white" },
        placeholder: { color: "white" },
        "& fieldset": { border: "none" },
      }}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value);
        console.log(e.target.value);
      }}
      id="outlined-basic"
      placeholder="Поиск..."
      variant="outlined"
      fullWidth={true}
    />
  );
};

export default SearchPanel;
