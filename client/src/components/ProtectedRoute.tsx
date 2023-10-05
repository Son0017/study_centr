import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function ProtectedRoute() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") as string);
  useEffect(() => {
    console.log(user);

    if (!user) {
      navigate("/login");
    } else if (user.type === "ADMIN") {
      console.log(1);
      document.cookie = `token=${user.token}`;
      navigate("/admin");
    }
  }, []);

  return <></>;
}

export default ProtectedRoute;
