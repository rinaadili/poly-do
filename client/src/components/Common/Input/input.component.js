import React from 'react';
import classNames from "classnames";

import './style.scss'

const Input = (props) => {
    return <>
        <input
            type={props?.type ? props?.type : 'text'}
            value={props.value}
            name={props.name}
            placeholder={props.placeholder}
            className={classNames({
                [props.className]: props.className,
                ['inputField']: true,
            })}
            onChange={props.onChange} />
    </>;
}

export default Input;