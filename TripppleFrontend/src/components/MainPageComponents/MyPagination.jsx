import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "../../App";

const MyPagination = (props) => {
  const { store } = useContext(Context);
  return (
    <Stack spacing={2}>
      <Pagination
        defaultPage={store.page}
        page={store.page}
        sx={{
          mt: "2rem",
          display: "flex",
          justifyContent: "center",
          "& .MuiPaginationItem-root": {
            color: "#45A29E",
          },
          "& .Mui-selected": { color: "#66FCF1" },
        }}
        count={props.count}
        variant="outlined"
        onChange={(event, newPage) => {
          store.setPage(newPage);
        }}
      />
    </Stack>
  );
};
export default observer(MyPagination);
