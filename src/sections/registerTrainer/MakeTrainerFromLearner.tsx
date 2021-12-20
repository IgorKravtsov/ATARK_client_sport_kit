import React, {FC, useEffect, useState} from 'react';
import Input from "../../components/input/Input";
import Datalist from "../../components/datalist/Datalist";
import {IDataListValue} from "../../components/datalist/types/datalist.value.interface";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import useInput from "../../hooks/useInput";
import {TrainerService} from "../../api/trainer-service";
import Modal from "../../components/modal/Modal";
import MakeTrainerSc from "../../pages/pgRegisterTrainer/makeTrainerModal/MakeTrainerSc";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";

export interface MakeTrainerFromLearnerProps {
    setPopUpText: Function
}

const MakeTrainerFromLearner:FC<MakeTrainerFromLearnerProps> = ({setPopUpText}) => {

    const {learners} = useTypedSelector(state => state.trainer)
    const length = learners.data?.length || 0

    const learner = useInput('')
    const [learnersState, setLearnersState] = useState<IDataListValue[]>([])
    const [isMakeTrainerModalVisible, setIsMakeTrainerModalVisible] = useState(false)
    const [learnerError, setLearnerError] = useState<string | null>(null)

    useEffect(() => {
        const newLearnerList: IDataListValue[] = learners.data?.map(learner => ({
            value: `${learner.name} ${learner.surname} (id: ${learner.id.toString().substring(0, 15)})`,
            valueToShow: `level: ${learner.level || 'not known'}`
        })) || []
        setLearnersState(newLearnerList)
    }, [learners])


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setLearnerError(null)
        if(learner.value) {
            setIsMakeTrainerModalVisible(true)
        } else {
            setLearnerError("Необходимо выбрать ученика!")
        }
    }

    return (
        <>
            {length > 0 ?
                <>
                    <Input
                        {...learner}
                        type="text"
                        list="learners"
                        autoComplete="off"
                        placeholder="Choose learner from list"
                    />
                    <ErrorMessage isVisible={learnerError !== null}>{learnerError}</ErrorMessage>
                    <Datalist dataList={learnersState} id="learners" />
                    <button onClick={handleSubmit}>CLICK</button>
                    <Modal active={isMakeTrainerModalVisible} setActive={setIsMakeTrainerModalVisible}>
                        <MakeTrainerSc
                            setPopUpText={setPopUpText}
                            closeModal={() => setIsMakeTrainerModalVisible(false)}
                            learner={learner.value}/>
                    </Modal>
                </> :
                <p>No learners found</p>}
        </>
    );
};

export default MakeTrainerFromLearner;