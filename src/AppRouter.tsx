import React from 'react';
import {Route, Routes} from "react-router-dom";
import {RouteNames} from "./routes";
import Main from "./pages/pgMain/Main";
import Login from "./pages/pgLogin/Login";
import Register from "./pages/pgRegister/Register";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={RouteNames.MAIN} element={<Main />} />
            <Route path={RouteNames.LOGIN} element={<Login />} />
            <Route path={RouteNames.REGISTER} element={<Register />} />
            <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
    );
};

export default AppRouter;