import React from "react";

import ListDesc from "./ListDesc";

const ListItem: React.FC<{
  data: any;
}> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((item: any) => {
          return (
            <ListDesc data={item} key={data.id * Math.random()}></ListDesc>
          );
        })}
    </>
  );
};

export default ListItem;
