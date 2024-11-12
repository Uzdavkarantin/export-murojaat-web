import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";

const App = () => {
  return (
    <>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </>
  );
};

export default App;
