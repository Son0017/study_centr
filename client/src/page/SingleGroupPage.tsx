import { useEffect } from "react";
import { ColumnsType } from "antd/es/table";
import MainTable from "../components/Table";
import useFetchHook from "../hooks/useFetchHook";
import { Button } from "antd";
import { setOpen } from "../context/drawerSlicde";
import { STUDENT_COURSE_FORM } from "../constant/constant";
import { deleteTableData, setTableData } from "../context/appSlice";
import { useAppDispatch } from "../hooks/reduxHook";
import { useParams } from "react-router-dom";
import { DeleteFilled } from "@ant-design/icons";
import axiosFetch from "../utils/axiosFetch";
function SingleGroupPage() {
  let { id } = useParams();
  const { data, loading, error } = useFetchHook("studentsCourses/" + id);
  if (error) {
    return <div>404 page not gount</div>;
  }
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
      render: (_: any, r: any) => {
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
      title: "",
      dataIndex: "id",
      render: (_: any, r: any, index: any) => {
        return (
          <Button
            onClick={async () => {
              try {
                await axiosFetch("studentsCourses/" + _ + "," + id, {
                  method: "DELETE",
                });

                dispatch(deleteTableData({ id: Number(_) }));
              } catch (error) {}
            }}
          >
            <DeleteFilled />
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    let student = data?.map((i: any) => {
      return i.student;
    });
    dispatch(
      setTableData({
        tableData: student,
        loading: loading,
      })
    );
  }, [data]);

  return (
    <>
      <div className="wrapperSelect">
        <Button
          style={{ marginBottom: "20px" }}
          onClick={() => {
            dispatch(
              setOpen({
                open: true,
                initialValues: { id, data },
                title: "STUDENT QO'SHISH",
                component: STUDENT_COURSE_FORM,
                method: "POST",
              })
            );
          }}
        >
          STUDENT QO'SHISH
        </Button>
      </div>
      <MainTable columns={columns}></MainTable>
    </>
  );
}

export default SingleGroupPage;
