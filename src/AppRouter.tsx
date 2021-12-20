import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, learnerRoutes, publicRoutes, RouteNames, trainerRoutes} from "./routes";
import Main from "./pages/pgMain/Main";
import Login from "./pages/pgLogin/Login";
import Register from "./pages/pgRegister/Register";
import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setUserFromLocalStorage} from "./store/slices/userSlice";
import * as util from "./util";
import {IUser} from "./interfaces/user.interface";
import {UserRoles} from "./enums/userRoles.enum";

const AppRouter = () => {

    const {user} = useTypedSelector(state => state.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            setUserFromLocalStorage(util.decodeToken() || null)
        )
    }, [])

    return (
        <Routes>
            {user.data?.role === UserRoles.LEARNER && [...learnerRoutes]}
            {user.data?.role === UserRoles.TRAINER && [...trainerRoutes]}
            {user.data?.role === UserRoles.ADMIN && [...adminRoutes]}
            {[...publicRoutes]}
        </Routes>
    );
};

export default AppRouter;