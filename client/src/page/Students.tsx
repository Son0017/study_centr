import { useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { Button, Checkbox } from "antd";
import { setOpen } from "../context/drawerSlicde";
import { STUDENT_FORM } from "../constant/constant";
import { editTableData, setTableData } from "../context/appSlice";
import { useAppDispatch } from "../hooks/reduxHook";
import { EditFilled } from "@ant-design/icons";
import axiosFetch from "../utils/axiosFetch";

function Students() {
  const { data, loading, error } = useFetchHook("student");

  const dispatch = useAppDispatch();
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_: any, r: any, index: any) => {
        return _ ? "Active" : "Disabled";
      },
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
                    component: STUDENT_FORM,
                    method: "PATCH",
                    initialValues: r,
                  })
                );
              }}
            >
              <EditFilled style={{ fontSize: "14px" }}></EditFilled>
            </Button>
            <Checkbox
              checked={_}
              onChange={async () => {
                try {
                  const data = await axiosFetch("student/" + r.id, {
                    method: "PATCH",
                    data: {
                      status: _ ? false : true,
                    },
                  });
                  console.log(data);

                  if (data.data) {
                    dispatch(editTableData(data.data.data));
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            ></Checkbox>
          </div>
        );
      },
    },
  ];
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
      <Button
        style={{ marginBottom: "20px" }}
        onClick={() => {
          dispatch(
            setOpen({
              open: true,
              title: "CREATE",
              component: STUDENT_FORM,
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

export default Students;
