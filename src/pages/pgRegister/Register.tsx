import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './register.module.scss';
import {LoadingSatus} from "../../enums/loadingSatus.enum";
import useInput from "../../hooks/useInput";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {UserService} from "../../api/user-service";
import {UserDtoResponse} from "../../DTO/response/user.dto.response";
import {RegionService} from "../../api/region-service";
import {RegionDtoResponse} from "../../DTO/response/region.dto.response";
import {UserDtoRequest} from "../../DTO/request/user.dto.request";
import {UserRoles} from "../../enums/userRoles.enum";
import {registration} from "../../store/slices/actions/user/registration";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../routes";
import {nullingErrorData} from "../../store/slices/userSlice";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";

const Register = () => {

    const email = useInput('')
    const pass = useInput('')
    const confirmPass = useInput('')
    const name = useInput('')
    const surname = useInput('')
    const level = useInput('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useTypedSelector(state => state.user)

    const [isShowContent, setIsShowContent] = useState(false)

    const [trainerId, setTrainerId] = useState<number>()
    const [regionId, setRegionId] = useState<number>()

    const [trainers, setTrainers] = useState<UserDtoResponse[]>([])
    const [regions, setRegions] = useState<RegionDtoResponse[]>([])

    const [submitted, setSubmitted] = useState(false)


    useEffect(() => {
        dispatch(nullingErrorData())
        Promise.all(
            [UserService.getTrainers()
            .then(trainers => setTrainers(trainers.data))
            .catch(e => console.log(e.message)),

        RegionService.getAll()
            .then(regions => setRegions(regions.data))
            .catch(e => console.log(e.message))]
        ).then(() => setIsShowContent(true))

    }, [])

    useEffect(() => {
        regionId && UserService.getTrainersByRegion(regionId)
            .then(trainers => setTrainers(trainers.data))
            .catch(e => console.log(e.message));
    }, [regionId])

    useEffect(() => {
        if(!user.errors?.length && user.data?.id && submitted) {
            navigate(RouteNames.MAIN);
        }
    }, [user.loadingStatus])

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newUser: UserDtoRequest = {
            name: name.value,
            surname: surname.value,
            email: email.value,
            level: level.value,
            password: pass.value,
            trainerId: trainerId!,
            regionId: regionId!,
            organizationIds: [2, 3],
            role: UserRoles.LEARNER
        }

        if(newUser.regionId && newUser.trainerId) { // if уберется, когда добавится валидация
            Promise.resolve(dispatch(registration(newUser)))
                .then(() => setSubmitted(true));

        } else {
            console.log("ТЫ ШО, ОФИГЕЛ? Тренера с регионом выбрал, помойка!")
        }
    }

    return (
        <main className={styles.wrapper}>
            <p className={styles.title}>REGISTRATION</p>
            {isShowContent &&
            <form className={styles.form} onSubmit={handleSubmit}>
                <ul>
                    <li className={styles.input_wrapper}>
                        <Input classes={styles.input} {...name} type="text" placeholder="name.."/>
                        <Input classes={styles.input} {...surname} type="text" placeholder="surname.."/>
                    </li>
                    <li className={styles.input_wrapper}>
                        <Input classes={styles.input} {...email} type="email" placeholder="email..."/>
                        <Input classes={styles.input} {...level} type="text" placeholder="level..."/>
                    </li>
                    <li className={styles.input_wrapper}>
                        <Input classes={styles.input} {...pass} type="password" placeholder="password..."/>
                        <Input classes={styles.input} {...confirmPass} type="password" placeholder="confirm password..."/>
                    </li>
                </ul>
                <Select
                    onChangeFunc={(e) => setRegionId(+e.target.value)}
                    data={regions}
                    defaultTitle="Выберите регион"
                    showContent={["title"]}
                    classes={styles.select}
                />
                <Select
                    onChangeFunc={(e) => setTrainerId(+e.target.value)}
                    data={trainers}
                    defaultTitle="Выберите тренера"
                    showContent={["name", "surname", "level"]}
                    classes={styles.select}
                />

                <button>SEND DATA</button>
            </form>}
            {user.loadingStatus === LoadingSatus.ERROR && user.errors?.map(error => <p className={styles.error}>{error}</p>)}
        </main>
    );
};

export default Register;