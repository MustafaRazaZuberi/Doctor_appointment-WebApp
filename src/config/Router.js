import React from "react";
import ReactDOM from "react-dom/client";
import SiginButtons from "../components/SiginButtons/SiginButtons"
import Home from "../components/Home/Home"
import Detail from "../components/Detail/Detail"
import MyCompanies from "../components/MyCompanies/MyCompanies"
import { auth } from "./Firebase"

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";




const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <SiginButtons />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/detail",
            element: <Detail />,
        },
        {
            path: "/myCompanies",
            element: <MyCompanies />,
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default Router
