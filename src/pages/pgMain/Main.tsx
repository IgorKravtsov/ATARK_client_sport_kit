import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {RouteNames} from "../../routes";
import styles from './main.module.scss';
import {UserService} from "../../api/user-service";
import {OrganizationDtoResponse} from "../../DTO/response/organization.dto.response";
import {getOrganizations} from "../../store/slices/actions/organizations/getOrganizations";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import OrganizationCard from "../../components/organizationCard/OrganizationCard";

const Main = () => {

    const dispatch = useDispatch()
    const {userOrganizations} = useTypedSelector(state => state.organizations)

    useEffect(() => {
        dispatch(getOrganizations())
    }, [])

    return (
        <main className={styles.wrapper}>
            {userOrganizations.data?.map(org => <OrganizationCard key={org.id} organization={org} />)}
        </main>
    );
};

export default Main;