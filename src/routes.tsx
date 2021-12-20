import {Route} from "react-router-dom";
import Main from "./pages/pgMain/Main";
import React, {ReactElement} from "react";
import Login from "./pages/pgLogin/Login";
import Register from "./pages/pgRegister/Register";
import RegisterTrainer from "./pages/pgRegisterTrainer/RegisterTrainer";
import Organization from "./pages/pgOrganization/Organization";


export enum RouteNames {
    MAIN='/',
    LOGIN='/login',
    LEARNER_REGISTER='/register',
    TRAINER_REGISTER='/trainer-register',
    ORGANIZATION='/organization',
    PARTICULAR_ORGANIZATION='/organization/:organizationId',
    FOR_ADMIN='/for-admin',

}

export const publicRoutes: ReactElement[] = [
    <Route key={RouteNames.MAIN} path={RouteNames.MAIN} element={<Main />} />,
    <Route key={RouteNames.LOGIN} path={RouteNames.LOGIN} element={<Login />} />,
    <Route key={RouteNames.LEARNER_REGISTER} path={RouteNames.LEARNER_REGISTER} element={<Register />} />,
    <Route key="Not found" path="*" element={<h1>Not found</h1>}/>,

]

export const learnerRoutes: ReactElement[] = [
    <Route key={RouteNames.PARTICULAR_ORGANIZATION} path={RouteNames.PARTICULAR_ORGANIZATION} element={<Organization />} />,
    ...publicRoutes,
]

export const trainerRoutes: ReactElement[] = [
    <Route key={RouteNames.TRAINER_REGISTER} path={RouteNames.TRAINER_REGISTER} element={<RegisterTrainer />} />,
    ...learnerRoutes,
]

export const adminRoutes: ReactElement[] = [
    ...trainerRoutes,

]