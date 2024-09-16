import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider
} from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Exercise, {loader as exerciseLoader} from "./routes/exercise/$number.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/"
        loader={async function () {
          return redirect("/exercise/1");
        }}
      />
      <Route path="exercise/:number" element={<Exercise />} loader={exerciseLoader}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
