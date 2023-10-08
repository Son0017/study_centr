import AttendancePage from "./AttendancePage";
import Blacklist from "./Blacklist";
import Group from "./Group";
import MainPage from "./MainPage";
import PayOut from "./PayOut";
import Payment from "./Payment";
import SingleGroupPage from "./SingleGroupPage";
import Students from "./Students";
import TeacherGroup from "./TeacherGroup";
import TeacherMain from "./TeacherMain";
import Teachers from "./Teachers";
import User from "./User";

const children = [
  {
    path: "/admin",
    element: <MainPage />,
  },
  {
    path: "/admin/tolov",
    element: <Payment />,
  },
  {
    path: "/admin/oylik",
    element: <PayOut />,
  },
  {
    path: "/admin/user",
    element: <User />,
  },
  {
    path: "/admin/oqituvchi",
    element: <Teachers />,
  },
  {
    path: "/admin/abuturent",
    element: <Students />,
  },
  {
    path: "/admin/group/:id",
    element: <SingleGroupPage />,
  },
  {
    path: "/admin/group",
    element: <Group />,
  },
  {
    path: "/admin/qoralama",
    element: <Blacklist />,
  },
  {
    path: "/admin/qoralama/:id",
    element: <SingleGroupPage />,
  },
];

const teachChildren = [
  {
    path: "/teacher",
    element: <TeacherMain />,
  },
  {
    path: "/teacher/group",
    element: <TeacherGroup />,
  },
  {
    path: "/teacher/group/:id",
    element: <AttendancePage />,
  },
];
export {
  Payment,
  Blacklist,
  MainPage,
  Group,
  PayOut,
  Students,
  Teachers,
  User,
  teachChildren,
  children,
};
