import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { setUser } from "../context/userSlice";
function ProtectedRoute({ children }: { children: any }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") as string);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      if (!user) {
        navigate("/login");
      } else if (user.type === "ADMIN") {
        navigate("/admin");
        document.cookie = `token=${user.token}`;
        return children;
      } else if (user.type === "TEACHER") {
        navigate("/teacher");
        document.cookie = `token=${user.token}`;
        return children;
      }
    }

    if (!user) {
      navigate("/login");
    } else if (user.type === "ADMIN") {
      dispatch(setUser(user));
      document.cookie = `token=${user.token}`;
      return children;
    } else if (user.type === "TEACHER") {
      dispatch(setUser(user));
      document.cookie = `token=${user.token}`;
      return children;
    }
  }, []);

  return <>{children}</>;
}

export default ProtectedRoute;
