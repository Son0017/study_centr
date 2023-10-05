import React from "react";
import { Drawer } from "antd";
import Payment from "../components/Forms/PaymentForm";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHook";
import { selectDraw, setClose } from "../context/drawerSlicde";
import { PAYMENT_FORM } from "../constant/constant";

const MainDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectDraw);
  const onClose = () => {
    dispatch(setClose());
  };
  return (
    <>
      <Drawer
        title={state.title}
        placement="right"
        onClose={onClose}
        open={state.open}
      >
        {state.component === PAYMENT_FORM && <Payment></Payment>}
      </Drawer>
    </>
  );
};

export default MainDrawer;
