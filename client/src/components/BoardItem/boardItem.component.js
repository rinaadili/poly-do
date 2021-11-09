import React, { useEffect, useState } from 'react';

import './style.scss';

const BoardItem = (props) => {

    const [ tasks, setTasks ] = useState([]);

    return <div className="board-item__container">
        <div className="board-item--title">
            <h5>{props.group.name}</h5>
        </div>
        <div className="board-item--list">
            {props.group.tasks && props.group.tasks.map(task => <>
                <div className="board-tast--item">
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <p>{task.date}</p>
                </div>
            </>)}
        </div>
    </div>;
}

export default BoardItem;