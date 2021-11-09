import React, {} from "react";

import './style.scss';

const BoxWrapper = (props) => {
    return <div className="box-wrapper">
        {props.children}
    </div>;
}

export default BoxWrapper;