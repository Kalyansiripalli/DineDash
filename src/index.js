import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import About from "./components/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomErrorPage from "./components/CustomErrorPage";
import Body from "./components/Body";
import ResturantMenu from "./components/ResturantMenu";
import Shimmer from "./components/Shimmer";
import Cart from "./components/Cart";
import CategoryResturants from "./components/CategoryResturants";
// import Grocery from "./components/Grocery";
const Grocery = lazy(() => import("./components/Grocery"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <CustomErrorPage />,
    children: [
  
      {
        path: "/",
        element: <Body />,
      },

      {
        path: "/aboutUS",
        element: <About />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/resturant/menu/:resturantId",
        element: <ResturantMenu />,
      },
      {
        path:"/cart",
        element:<Cart />
      },
      {
        path:"/category/view/:collectionId/:searchContext",
        element:<CategoryResturants />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
