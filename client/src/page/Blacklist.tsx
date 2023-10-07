import { useEffect } from "react";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { useAppDispatch } from "../hooks/reduxHook";
import { setTableData, statusChange } from "../context/appSlice";
import { ColumnsType } from "antd/es/table";
import { Button } from "antd";
import { GROUP_FORM } from "../constant/constant";
import { setOpen } from "../context/drawerSlicde";
import { Link } from "react-router-dom";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function BlackList() {
  const { data, loading } = useFetchHook("course?status=black&students=true");
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
      title: "Vaqti",
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
      title: "soni",
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
      render: (i, r: any) => {
        return (
          <div className="miniButton">
            <Link to={"/admin/qoralama/" + i}>
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
            {!r.started_data && (
              <Button>
                <DeleteFilled />
              </Button>
            )}
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
      <Button
        style={{ marginBottom: "20px" }}
        onClick={() => {
          dispatch(
            setOpen({
              open: true,
              title: "CREATE",
              component: GROUP_FORM,
              method: "POST",
            })
          );
        }}
      >
        Create
      </Button>
      <MainTable columns={columns} />
    </>
  );
}

export default BlackList;
