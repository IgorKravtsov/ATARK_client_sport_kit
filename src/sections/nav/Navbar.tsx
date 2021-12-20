import React from 'react';
import styles from "./nav.module.scss";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../routes";
import logo from "../../components/header/img/logo_v1.jpg";
import {UserRoles} from "../../enums/userRoles.enum";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {LocalstorageKey} from "../../enums/localstorageKey.enum";
import {useDispatch} from "react-redux";
import {logout} from "../../store/slices/userSlice";

const Navbar = () => {

    const {user} = useTypedSelector(state => state.user)
    const isAuth = !!user.data

    const dispatch = useDispatch()

    const logoutHandler = () => {
        localStorage.removeItem(LocalstorageKey.USER)
        dispatch(logout())
    }

    return (
        <nav className={styles.nav}>
            <NavLink to={RouteNames.MAIN}>
                <p className={styles.img_wrapper}><img className={styles.img} src={logo} alt="logo"/></p>
            </NavLink>
            {!isAuth ?
                <>
                    <NavLink to={RouteNames.LOGIN}>LOGIN</NavLink>
                    <NavLink to={RouteNames.LEARNER_REGISTER}>REGISTER</NavLink>
                </> :
                <>
                    <button onClick={logoutHandler}>Logout</button>
                </>
            }
            {isAuth && user.data?.role !== UserRoles.LEARNER ?
                <NavLink to={RouteNames.TRAINER_REGISTER}>REGISTER TRAINER</NavLink> : null}
        </nav>
    );
};

export default Navbar;