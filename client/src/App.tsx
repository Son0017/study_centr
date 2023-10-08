// import MainDrawer from "./components/MainDrawer";
import useMessage from "antd/es/message/useMessage";
import MainLayout from "./layout/MainLayout";
import { useAppSelector } from "./hooks/reduxHook";
import { selectapp } from "./context/appSlice";
import { useEffect } from "react";

function App() {
  const [message, contextHolder] = useMessage();

  const app = useAppSelector(selectapp).message;

  useEffect(() => {
    message.open({
      ...app,
    });
  }, [app]);

  return (
    <>
      {contextHolder}
      <MainLayout></MainLayout>
    </>
  );
}

export default App;
