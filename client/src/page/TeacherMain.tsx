import { Button, DescriptionsProps } from "antd";
import useFetchHook from "../hooks/useFetchHook";
import MainDescription from "../components/MainDescription";
import MainTable from "../components/Table";
import { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { setTableData } from "../context/appSlice";
import { weeks } from "../constant/constant";
import { useNavigate } from "react-router-dom";

function TeacherMain() {
  const { data, loading } = useFetchHook("teacher?teacher_id=0");
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const options: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "F.O",
      children: data?.first_name + " " + data?.last_name || "",
    },
    {
      key: "3",
      label: "Telefon Raqami",
      children: data?.phone_number,
    },
    {
      key: "4",
      label: "Summa",
      children: data?.summa ? data?.summa : 0,
    },
    {
      key: "5",
      label: "Foiz",
      children: data?.payout_percentage,
    },
    {
      key: "6",
      label: "Group",
      children: data?.course.length + " ta",
    },
  ];

  useEffect(() => {
    let nowWeek = new Date().getDay() + 1;

    let tableData: any = [];
    data?.course.map((item: any) => {
      if (item.week_days.includes(weeks[nowWeek])) {
        tableData.push(item);
      }
    });
    dispatch(setTableData({ tableData: tableData, loading: loading }));
  }, [data]);

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
      render: (i) => {
        return i + " soat";
      },
    },
    {
      title: "",
      dataIndex: "id",
      render: (_: any, r: any, index: any) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              navigation("/group/:_");
            }}
          ></Button>
        );
      },
    },
  ];

  return (
    <>
      <div className="wrapper">
        <MainDescription data={options} key={Math.random()} />
      </div>
      <div>
        <h1 style={{ margin: "20px 0" }}>Bugungi Darslar:</h1>
        <MainTable columns={columns} />
      </div>
    </>
  );
}

export default TeacherMain;
