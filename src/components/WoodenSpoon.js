import React from 'react';
import Pie from "./Pie";

const Podium = (props) => {
    const { list } = props;
    if (!list || list.length === 0) return <p>No repos, sorry</p>;

    return (
        <div className='loser box'>
            <h2 className='list-head'>
                <span className='heading-before'>👎</span>
                The Worst
                <span className='heading-after'>👎</span>
            </h2>
            <ul className='wooden-spoon'>
                {list.slice(list.length - 1).map((pie) => {
                    return (
                        <Pie key={pie.Tweet} pie={pie}/>
                    );
                })}
            </ul>
        </div>
    );
};
export default Podium;
