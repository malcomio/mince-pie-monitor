import React from 'react';
import Pie from "./Pie";

const Podium = (props) => {
    const { list } = props;
    if (!list || list.length === 0) return <p>No repos, sorry</p>;

    return (
        <div className='loser'>
            <h2 className='list-head'>The Worst</h2>
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
