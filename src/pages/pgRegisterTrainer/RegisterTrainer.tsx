import React, {FC, ReactElement, useEffect, useMemo, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {getLearners} from "../../store/slices/actions/trainer/getLearners";
import MakeTrainerFromLearner from "../../sections/registerTrainer/MakeTrainerFromLearner";
import {LoadingSatus} from "../../enums/loadingSatus.enum";
import Spinner from "../../components/spinner/Spinner";
import Portal from "../../components/portal/Portal";
import PopUpMessage from "./popUpMessage/PopUpMessage";
import Modal from "../../components/modal/Modal";

const RegisterTrainer:FC = ():ReactElement => {

    const {learners} = useTypedSelector(state => state.trainer)
    const dispatch = useDispatch()

    const [popUpMessage, setPopUpMessage] = useState(null)
    const [isPopUpActive, setIsPopUpActive] = useState(false)

    const setContentToShow = (loadingStatus: LoadingSatus) => {
        switch (loadingStatus) {
            case LoadingSatus.IDLE:

                return <>
                            <MakeTrainerFromLearner setPopUpText={setPopUpMessage} />
                       </>

            case LoadingSatus.LOADING:
                return <Spinner />

            case LoadingSatus.ERROR:
                return <p>{learners.errors?.map((err, index) => <p key={index}>{err}</p>)}</p>
        }
    }

    useEffect(() => {
        dispatch(getLearners())
    }, [])

    // useEffect(() => {
    // }, [learners.loadingStatus])


    return (
        <main>
            {setContentToShow(learners.loadingStatus)}

            <Portal>
                <PopUpMessage setFunc={setPopUpMessage} text={popUpMessage}/>
            </Portal>
        </main>
    );
};

export default RegisterTrainer;