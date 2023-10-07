import { Table } from "antd";
import { useAppSelector } from "../hooks/reduxHook";
import { selectapp } from "../context/appSlice";

const MainTable = ({ columns }: { columns: any }) => {
  const { loading, tableData } = useAppSelector(selectapp);

  return (
    <Table
      style={{ textTransform: "capitalize" }}
      onChange={() => {
        console.log(1);
      }}
      columns={columns}
      dataSource={tableData}
      loading={loading}
      key={columns.key}
    />
  );
};

export default MainTable;
