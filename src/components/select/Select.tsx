import React, {ChangeEvent, FC} from 'react';
import styles from './select.module.scss'

export interface SelectProps {
    onChangeFunc: (event: ChangeEvent<HTMLSelectElement>) => void
    data: any[]
    defaultTitle: string
    showContent: string[]
    classes?: string
}

const Select:FC<SelectProps> = ({data, defaultTitle,showContent, onChangeFunc, classes}) => {
    return (
        <select className={[styles.select, classes].join(' ')} onChange={onChangeFunc}>
            <option className={styles.option} value="">{defaultTitle}</option>
            {data.map(element => {
                let showStr = '';
                    showContent.forEach(content => {
                        showStr += `${element[content] || ""} `
                    })
                return (
                    <option className={styles.option} key={element.id} value={element.id}>
                        {showStr}
                    </option>
                )
            }
            )}
        </select>
    );
};

export default Select;