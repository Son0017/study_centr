import React from "react";
import { Table } from "antd";

const MainTable: React.FC<{
  columns: any;
  data: any;
  loading: boolean;
}> = ({ columns, loading, data }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      key={columns.key}
    />
  );
};

export default MainTable;
