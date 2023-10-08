import { ColumnsType } from "antd/es/table";
import useFetchHook from "../hooks/useFetchHook";
import MainTable from "../components/Table";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { setTableData } from "../context/appSlice";

function TeacherGroup() {
  const { data, loading } = useFetchHook("course?status=group");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setTableData({
        tableData: data,
        loading: loading,
      })
    );
  }, [data]);
  console.log(data);

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
      title: "Davmiyligi",
      key: "Davmiyligi",
      dataIndex: "duration",
      render: (i: any) => {
        return i + " soat";
      },
    },
    {
      title: "Xona",
      key: "Xona",
      dataIndex: "room",
      render: (i: any) => {
        return i?.name;
      },
    },
    {
      title: "Student soni",
      key: "_count",
      dataIndex: "_count",
      render: (i: any) => {
        return i?.students;
      },
    },
  ];
  return <MainTable columns={columns} />;
}

export default TeacherGroup;
