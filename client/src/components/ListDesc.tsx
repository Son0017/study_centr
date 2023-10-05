// import Selected from "../components/Selected";
// import MainTable from "../components/Table";
import MainDescription from "../components/MainDescription";
import { Button, type DescriptionsProps } from "antd";
import { useAppDispatch } from "../context/store";
import { setOpen } from "../context/drawerSlicde";
import { MONTH, PAYMENT_FORM } from "../constant/constant";
const ListDesc: React.FC<{
  data: any;
}> = ({ data }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "F.O",
      children: data?.student.first_name + " " + data?.student.last_name || "",
    },
    {
      key: "2",
      label: "Group nome",
      children: data?.course.name,
    },
    {
      key: "3",
      label: "Telefon Raqami",
      children: data?.student.phone_number,
    },
    {
      key: "4",
      label: "Group vaqti",
      children: data?.course.time,
    },
    {
      key: "5",
      label: "Fan",
      children: data?.course.subject,
    },
    {
      key: "6",
      label: "Qarzdorlik",
      children: data?.debt_summa ? data?.summa : 0,
      style: { color: "red" },
    },
    {
      key: "7",
      label: "Oy",
      children: data?.updateAt && MONTH[new Date(data?.updateAt).getMonth()],
    },
  ];
  const dispatch = useAppDispatch();
  return (
    <div className="wrapper">
      <MainDescription data={items}></MainDescription>
      <Button
        type="primary"
        onClick={() => {
          dispatch(
            setOpen({
              title: "To'lov",
              open: true,
              initialValues: {
                course_id: data?.course_id,
                student_id: data?.student_id,
                id: data?.id,
                summa: data?.summa,
              },
              component: PAYMENT_FORM,
            })
          );
        }}
      >
        To'lov
      </Button>
    </div>
  );
};

export default ListDesc;
