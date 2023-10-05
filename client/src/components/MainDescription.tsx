import React from "react";
import { Descriptions } from "antd";

const MainDescription: React.FC<{
  data: any;
}> = ({ data }) => (
  <Descriptions
    style={{ textTransform: "capitalize" }}
    title="User Info"
    items={data}
    key={data.id}
  />
);

export default MainDescription;
