import { Button, Checkbox } from "antd";
import MainTable from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import useFetchHook from "../hooks/useFetchHook";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHook";
import { setTableData } from "../context/appSlice";
import axiosFetch from "../utils/axiosFetch";

function AttendancePage() {
  const [student, setStudent] = useState<any>([]);
  const { id } = useParams();
  const { data, loading } = useFetchHook("attendance/" + id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mainData: any = [];
    data?.students.map((item: any) => {
      mainData.push(item.student);
    });
    setStudent(data?.attendance);
    dispatch(
      setTableData({
        tableData: mainData,
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
      title: "№",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Familia",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "",
      dataIndex: "id",
      render: (_: any, r: any, index: any) => {
        return (
          <Checkbox
            checked={student.includes(_) ? true : false}
            onChange={(e) => {
              if (e.target.checked) {
                setStudent([...student, _]);
              } else {
                let x = student.filter((item: number) => item !== _);
                setStudent([...x]);
              }
            }}
          ></Checkbox>
        );
      },
    },
  ];

  const onClick = async () => {
    try {
      const dates = new Date();

      let query = `${dates.getFullYear()}-${dates.getMonth()}-${dates.getDate()}`;
      const data = await axiosFetch("attendance", {
        method: "POST",
        data: {
          date: new Date(query),
          attendace: student,
          course_id: Number(id),
        },
      });
      let mainData: any = [];
      if (data.data) {
        data.data?.student.map((item: any) => {
          mainData.push(item.student);
        });
        setStudent(data.data?.attendance);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <MainTable columns={columns} pagination={false} />
      <Button type="primary" onClick={onClick}>
        Tasdiqlaash
      </Button>
    </div>
  );
}

export default AttendancePage;
