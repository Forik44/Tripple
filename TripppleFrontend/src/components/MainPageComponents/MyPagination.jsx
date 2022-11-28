import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function MyPagination(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        defaultPage={props.default}
        page={props.default}
        sx={{
          mt: "2rem",
          display: "flex",
          justifyContent: "center",
          // color: "black",
          "& .MuiPaginationItem-root": {
            color: "#45A29E",
          },
          "& .Mui-selected": { color: "#66FCF1" },
        }}
        count={props.count}
        variant="outlined"
        onChange={(event, newPage) => {
          props.onChange(newPage);
        }}
      />
    </Stack>
  );
}
