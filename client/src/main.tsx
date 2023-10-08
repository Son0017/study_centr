import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Provider } from "react-redux";
import { children, teachChildren } from "./page/page.tsx";
import { store } from "./context/store.ts";
import Login from "./page/Login.tsx";
import Teacher from "./Teacher.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>{}</ProtectedRoute>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: children,
  },
  {
    path: "/teacher",
    element: (
      <ProtectedRoute>
        <Teacher />
      </ProtectedRoute>
    ),
    children: teachChildren,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
