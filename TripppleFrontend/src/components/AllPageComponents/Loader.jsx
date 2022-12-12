import { CircularProgress } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    >
      <CircularProgress color="success" />{" "}
    </Box>
  );
};

export default Loader;
