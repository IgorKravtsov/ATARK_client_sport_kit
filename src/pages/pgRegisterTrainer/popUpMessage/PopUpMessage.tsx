import React, {FC, useEffect} from 'react';
import styles from './popUpMessage.module.scss'
import cn from "classnames";

export interface PopUpMessageProps {
    text: string | null
    setFunc: Function
}

const PopUpMessage:FC<PopUpMessageProps> = ({text, setFunc}) => {

    useEffect(() => {
        if(text) {
            setTimeout(() => setFunc(null), 5000)
        }
    }, [text])

    return (
        <div className={cn(styles.wrapper, { [styles.visible]: text !== null })}>
            <p>{text}</p>
        </div>
    );
};

export default PopUpMessage;