import { Table } from "antd";
import { useAppSelector } from "../hooks/reduxHook";
import { selectapp } from "../context/appSlice";

const MainTable = ({ columns }: { columns: any; pagination?: boolean }) => {
  const { loading, tableData } = useAppSelector(selectapp);
  return (
    <div className="table">
      <Table
        style={{ textTransform: "capitalize" }}
        onChange={() => {
          console.log(1);
        }}
        pagination={false}
        columns={columns}
        dataSource={tableData}
        loading={loading}
        key={columns.key}
      />
    </div>
  );
};

export default MainTable;
