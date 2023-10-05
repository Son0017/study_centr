import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import Selected from "../components/Selected";
import useFetchHook from "../hooks/useFetchHook";
import axiosFetch from "../utils/axiosFetch";
import { Input } from "antd";
// import { useAppDispatch } from "../hooks/reduxHook";
// import { setOpen } from "../context/drawerSlicde";
// import { PAY_FORM } from "../constant/constant";

function Payment() {
  const { data, loading } = useFetchHook("studentDebt");
  const [students, setStudents] = useState<any>(null);

  // const dispatch = useAppDispatch();

  useEffect(() => {
    setStudents(data);
  }, [data]);
  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let search = e.target.value;
      const data = await axiosFetch("studentDebt/" + search);
      const res = data.data;
      console.log(res);

      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e: string) => {
    let filterData = students.filter((student: any) => {
      student.course_id = e;
    });

    setStudents(filterData);
  };
  let studentOption = students?.map((item: any) => {
    return {
      value: item.course_id,
      label: item.course.name + " " + item.course.subject,
    };
  });

  return (
    <div>
      <div className="wrapperSelect">
        <Input
          style={{ width: "200px" }}
          placeholder="id orqali qidiring"
          onChange={onSearch}
        ></Input>
        <Selected
          onSearch={() => {}}
          options={studentOption}
          loading={loading}
          width={200}
          onChange={onChange}
        ></Selected>
      </div>
      <div style={{ margin: "10px" }}></div>
      <ListItem data={students}></ListItem>
    </div>
  );
}

export default Payment;
