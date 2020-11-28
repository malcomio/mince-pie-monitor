import React from 'react';

import tree from "../img/tree.svg";

const Score = (props) => {

    const {score} = props;
    let output = [];
    for (let i = 0; i < Math.floor(score); i++) {
        output.push(<img key={'score-' + i} className='score__tree' src={tree} alt=''/>);
    }

    if (score > Math.floor(score)) {
        output.push(<img key='halftree' className='score__tree score__tree__half' src={tree} alt=''/>)
    }

    return (
        <p className='pie__score'>
            {output}
        </p>
    );
};

export default Score;

