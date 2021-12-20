import React, {FC} from 'react';
import {IDataListValue} from "./types/datalist.value.interface";

export interface DatalistProps {
    dataList: IDataListValue[]
    id: string
}

const Datalist:FC<DatalistProps> = ({dataList, id}) => {
    return (
        <datalist id={id}>
            {dataList.map((data, index) =>
                <option key={Date.now() + index} value={data.value}>{data.valueToShow}</option>
            )}
        </datalist>
    );
};

export default Datalist;