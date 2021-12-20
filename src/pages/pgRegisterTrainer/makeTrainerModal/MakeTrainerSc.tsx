import React, {FC} from 'react';
import styles from './makeTrainerSc.module.scss';
import {TrainerService} from "../../../api/trainer-service";
import {useDispatch} from "react-redux";
import {getLearners} from "../../../store/slices/actions/trainer/getLearners";

export interface MakeTrainerScProps {
    learner: string
    closeModal: (e: React.MouseEvent<HTMLButtonElement>) => void
    setPopUpText: Function
}

const MakeTrainerSc:FC<MakeTrainerScProps> = ({learner, closeModal, setPopUpText}) => {

    const dispatch = useDispatch()

    const findId = (str: string): string => {
        const start = str.lastIndexOf(': ')
        const end = str.lastIndexOf(')')

        return str.substring(start + 2, end)
    }

    const makeTrainer = async () => {
        const id = findId(learner)
        await TrainerService.makeTrainerFromLearner(+id)
            .then(() => dispatch(getLearners()))
            .then(() => setPopUpText("Данные были успешно обновлены"))
            .catch(() => setPopUpText("Что-то пошло не так..."))
    }

    //TODO: сделать имя ученика ссылкой на его профиль)
    return (
        <section className={styles.wrapper}>
            <p>Вы уверены, что хотите назначить пользователя {learner} тренером?</p>
            <ul className={styles.btn_wrapper}>
                <li><button onClick={closeModal}>DENY</button></li>
                <li><button onClick={makeTrainer}>CONFIRM</button></li>
            </ul>
        </section>
    );
};

export default MakeTrainerSc;