import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import styles from './login.module.scss';
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/actions/user/login";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {LoadingSatus} from "../../enums/loadingSatus.enum";
import {RouteNames} from "../../routes";
import {useNavigate} from "react-router-dom";
import {nullingErrorData} from "../../store/slices/userSlice";

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useTypedSelector(state => state.user);

    useEffect(() => {
        dispatch(nullingErrorData())
    }, [])

    useEffect(() => {
        if(!user.errors?.length && user.data?.id && submitted) {
            navigate(RouteNames.MAIN);
        }
    }, [user.loadingStatus])

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        Promise.resolve(dispatch(login(email, pass)))
            .then(() => setSubmitted(true))
    }

    return (
        <main className={styles.wrapper}>
            <p>LOGIN FOR PIDORS NURE SOSET KSTATI</p>
            <form className={styles.form} onSubmit={handleSubmit}>

                <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
                <input className={styles.input} value={pass} onChange={(e) => setPass(e.target.value)} type="password"/>
                <button  className={styles.button}>SEND DATA</button>
                {user.loadingStatus === LoadingSatus.ERROR && user.errors?.map(error => <p className={styles.error}>{error}</p>)}
            </form>
        </main>
    );
};

export default Login;