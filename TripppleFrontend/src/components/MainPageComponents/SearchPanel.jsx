import { TextField, Container, Typography } from "@mui/material";

const SearchPanel = () => {
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
      id="outlined-basic"
      placeholder="Поиск..."
      variant="outlined"
      fullWidth={true}
    />
  );
};

export default SearchPanel;
