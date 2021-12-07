import React from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../../routes";
import styles from './main.module.scss';

const Main = () => {
    return (
        <main>
            <Link to={RouteNames.LOGIN}>LOGIN</Link>
            <br/>
            <Link to={RouteNames.REGISTER}>REGISTER</Link>
        </main>
    );
};

export default Main;