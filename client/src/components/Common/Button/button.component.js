import React from 'react';
import classNames from "classnames";
import './style.scss';

const Button = (props) => {
    return <>
        <button
            type="button"
            onClick={props.onClick}
            style={props.style}
            className={classNames({
                'btn': true,
                'customButton': true,
            })}
        >
            <div className="button-icon">{props?.icon}</div>
            {props?.label}
        </button>
    </>;
}

export default Button;