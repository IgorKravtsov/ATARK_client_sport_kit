import React, {FC} from 'react';
import styles from './organizationCard.module.scss'
import {OrganizationDtoResponse} from "../../DTO/response/organization.dto.response";
import defaultPic from './img/background-card.png'
import {Link} from "react-router-dom";
import {RouteNames} from "../../routes";

export interface OrganizationCardProps {
    organization: OrganizationDtoResponse
}

const OrganizationCard:FC<OrganizationCardProps> = ({organization}) => {
    return (
        <>
            <div className={styles.wrapper}>
                <Link to={RouteNames.ORGANIZATION + `/${organization.id}`}>
                    {organization.title}
                </Link>
            </div>
        </>
    );
};

export default OrganizationCard;