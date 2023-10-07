import { useEffect } from "react";
import MainTable from "../components/Table";
import type { ColumnsType } from "antd/es/table";
import useFetchHook from "../hooks/useFetchHook";
import { url } from "../constant/constant";
import { setTableData } from "../context/appSlice";
import { useAppDispatch } from "../context/store";

const columns: ColumnsType<any> = [
  {
    title: "№",
    dataIndex: "id",
    key: "id",
    render: (_: any, r: any, index: any) => index + 1,
  },
  {
    title: "Group Nomi",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Fan",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Boshlanish Vaqti",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Qurs Narxi",
    key: "price",
    dataIndex: "price",
  },
  {
    title: "Qarzdorlar Soni",
    dataIndex: "_count",
    key: "_count",
    render: (item: any) => item?.studentDebt,
  },
];
function MainPage() {
  const { data, loading, error } = useFetchHook(url + "course/home");
  const dispatch = useAppDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(
      setTableData({
        tableData: data ? data : error,
        loading: loading,
      })
    );
  }, [data]);
  return (
    <>
      <MainTable columns={columns} />
    </>
  );
}

export default MainPage;
