import React from 'react';
import Pie from "./Pie";

const Podium = (props) => {
    const {list} = props;
    if (!list || list.length === 0) return <p>No pies, sorry</p>;

    return (
        <div className='winners box'>
            <h2 className='list-head'>The Best</h2>
            <ul className='podium'>
                {list.slice(0, 3).map((pie) => {
                    return (
                        <Pie key={pie.Tweet} pie={pie} />
                    );
                })}
            </ul>
        </div>
    );
};

export default Podium;
