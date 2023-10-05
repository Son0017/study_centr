import { useState, useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import axiosFetch from "../utils/axiosFetch";

function Students() {
  const { data } = useFetchHook("student");
  const [student, setStudent] = useState<any>();
  useEffect(() => {
    setStudent(data);
  }, [data]);

  const columns: ColumnsType<any> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "F.I",
      dataIndex: "first_name",
      key: "first_name",
      render: (_: any, r: any, index: any) => {
        return r.first_name + " " + r.last_name;
      },
    },
    {
      title: "Telefon raqami",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "O'chirish",
      dataIndex: "status",
      key: "status",
      render: (_: any, r: any, index: any) => {
        return _ ? "Active" : "Disabled";
      },
    },
  ];

  return (
    <>
      <MainTable columns={columns} data={student} loading={false}></MainTable>{" "}
    </>
  );
}

export default Students;
