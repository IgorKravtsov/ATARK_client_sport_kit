import React, {FC, useEffect, useState} from 'react';
import ReactDOM from "react-dom";

const Portal:FC = ({children}) => {
    const [node, setNode] = useState<HTMLElement | null>(null)

    useEffect(() => {
        const root = document.getElementById('root')
        root && document.body.appendChild(root);
        setNode(root)

        return () => {
            node && document.body.removeChild(node)
        }
    }, [])

    return node && ReactDOM.createPortal(children, node);
};

export default Portal;