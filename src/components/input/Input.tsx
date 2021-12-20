import React, {FC} from 'react';
import styles from './input.module.scss'

export interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    classes?: string
}

const Input:FC<InputProps> = (props) => {
    return (
        <input {...props} className={[styles.input, props.classes].join(' ')}/>
    );
};

export default Input;