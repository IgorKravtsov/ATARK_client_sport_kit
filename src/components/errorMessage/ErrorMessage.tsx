import React from 'react';
import styles from './errorMessage.module.scss';
import cn from "classnames";
import error from './img/error.svg';


export interface FormErrorProps {
    // message: string;
    classes?: string;
    isVisible: boolean;
    width?: string | number
}

const ErrorMessage:React.FC<FormErrorProps> = (
    {
        width,
        classes,
        children,
        isVisible,
    }) => {
    return (
        <div style={{ width }} className={ cn(styles.error, classes, { [styles.error_visible]: isVisible }) }>
            <img src={error} alt="error" className={styles.error_img}/>
            {children}
        </div>
    );
};

export default ErrorMessage;