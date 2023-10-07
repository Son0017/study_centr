import { useEffect } from "react";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { useAppDispatch } from "../hooks/reduxHook";
import { setTableData } from "../context/appSlice";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { setOpen } from "../context/drawerSlicde";
import { GROUP_FORM } from "../constant/constant";
// import { Button } from "antd";
// import { GROUP_FORM } from "../constant/constant";
// import { setOpen } from "../context/drawerSlicde";

function Group() {
  const { data, loading } = useFetchHook("course?status=group&students=true");
  const dispatch = useAppDispatch();

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
      title: "Davmiyligi",
      key: "Davmiyligi",
      dataIndex: "duration",
      render: (i) => {
        return i + " soat";
      },
    },
    {
      title: "O'qituvchi",
      key: "teacher",
      dataIndex: "teacher",
      render: (i) => {
        return i?.last_name.charAt() + "." + i?.first_name;
      },
    },
    {
      title: "Student soni",
      key: "_count",
      dataIndex: "_count",
      render: (i) => {
        return i?.students;
      },
    },
    {
      title: "Edit",
      key: "teacher",
      dataIndex: "id",
      render: (i, r) => {
        return (
          <div className="miniButton">
            <Link to={"/admin/group/" + i}>
              <Button type="primary"></Button>
            </Link>
            <Button
              type="default"
              onClick={() => {
                dispatch(
                  setOpen({
                    open: true,
                    title: "CREATE",
                    component: GROUP_FORM,
                    initialValues: r,
                    method: "PATCH",
                  })
                );
              }}
            >
              <EditFilled style={{ fontSize: "10px" }} />
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      setTableData({
        tableData: data,
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

export default Group;
