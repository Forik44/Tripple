import { Box } from "@mui/system";
import React, { useContext } from "react";

import FilterAccordions from "./FilterAccordions";

export function FilterMenu() {
  return (
    <Box
      sx={{
        width: "90%",
        height: "20%",
        display: "flex",
        justifyContent: "start",
        ml: "1rem",
        mr: "1rem",
        mt: "1rem",
      }}
    >
      <FilterAccordions />
    </Box>
  );
}
