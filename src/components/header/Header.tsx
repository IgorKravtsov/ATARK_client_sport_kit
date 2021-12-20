import React, {FC, useEffect} from 'react';
import styles from './header.module.scss';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Navbar from "../../sections/nav/Navbar";

export interface HeaderProps {

}

const Header:FC<HeaderProps> = () => {

    // const {user} = useTypedSelector(state => state.user)


    return (
        <header className={styles.header}>
            <Navbar />
        </header>
    );
};

export default Header;