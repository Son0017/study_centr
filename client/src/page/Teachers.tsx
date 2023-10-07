import { useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { setTableData } from "../context/appSlice";

import { useAppDispatch } from "../hooks/reduxHook";
import { setOpen } from "../context/drawerSlicde";
import { TEACHER_FORM } from "../constant/constant";

function Teachers() {
  const { data, loading, error } = useFetchHook("teacher");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setTableData({
        tableData: data ? data : error,
        loading: loading,
      })
    );
  }, [data]);
  const columns: ColumnsType<any> = [
    {
      title: "№",
      dataIndex: "id",
      key: "id",
      render: (_: any, r: any, index: any) => index + 1,
    },
    {
      title: "Ismi",
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
      title: "Oylik",
      dataIndex: "summa",
      key: "status",
      render: (_: any, r: any, index: any) => {
        return _ ? _ : 0;
      },
    },
    {
      title: "Lavozim",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Edit",
      dataIndex: "status",
      key: "status",
      render: (_: any, r: any, index: any) => {
        return (
          <div className="miniButton">
            <Button
              onClick={() => {
                dispatch(
                  setOpen({
                    open: true,
                    title: "CREATE",
                    component: TEACHER_FORM,
                    method: "PATCH",
                    initialValues: r,
                  })
                );
              }}
            >
              <EditFilled style={{ fontSize: "14px" }}></EditFilled>
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button
        style={{ marginBottom: "20px" }}
        onClick={() => {
          dispatch(
            setOpen({
              open: true,
              title: "CREATE",
              component: TEACHER_FORM,
              method: "POST",
            })
          );
        }}
      >
        Create
      </Button>
      <MainTable columns={columns}></MainTable>
    </>
  );
}

export default Teachers;
