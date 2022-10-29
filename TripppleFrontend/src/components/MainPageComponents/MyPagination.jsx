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
          //   "& .MuiPaginationItem-root": {
          //     color: "white",
          //   },
        }}
        count={props.count}
        variant="outlined"
        // color="secondary"
        onChange={(event, newPage) => {
          props.onChange(newPage);
        }}
      />
    </Stack>
  );
}
