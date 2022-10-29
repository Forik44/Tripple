import React from "react";

import AccessoryCard from "./AccessoryCard";

import MyPagination from "./MyPagination";

export function EventsList(props) {
  return (
    <>
      {props.data.map((dat) => (
        <AccessoryCard key={dat.id} data={dat} />
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

export default EventsList;
