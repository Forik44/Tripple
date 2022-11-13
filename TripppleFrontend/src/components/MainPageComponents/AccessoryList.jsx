import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../App";

import AccessoryCard from "./AccessoryCard";

import MyPagination from "./MyPagination";

export function AccessoryList(props) {
  const { store } = useContext(Context);
  return (
    <>
      {props.data.map((dat) => (
        <AccessoryCard key={dat.amount + "id" + dat.id} data={dat} />
      ))}

      <MyPagination
        onChange={(num) => {
          props.setActualPage(num);
        }}
        default={props.actualPage}
        count={props.totalPages}
      />
    </>
  );
}

export default observer(AccessoryList);
