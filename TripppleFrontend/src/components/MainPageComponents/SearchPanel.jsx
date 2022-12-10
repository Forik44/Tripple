import { TextField, Container, Typography } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

const SearchPanel = () => {
  const { store } = useContext(Context);
  return (
    <TextField
      sx={{
        color: "white",
        backgroundColor: "#0e151c",
        borderRadius: "15px",
        input: { color: "white" },
        placeholder: { color: "white" },
        "& fieldset": { border: "none" },
      }}
      value={store.tempSearch}
      onChange={(e) => {
        store.setTempSearch(e.target.value);
      }}
      id="outlined-basic"
      placeholder="Поиск..."
      variant="outlined"
      fullWidth={true}
    />
  );
};

export default observer(SearchPanel);
