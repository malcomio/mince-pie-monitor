import React from 'react';
import Pie from "./Pie";

const Podium = (props) => {
    let {list} = props;
    if (!list || list.length === 0) return <p>No pies, sorry</p>;

    // Delete all pies not matching the top score.
    const topScore = list[0].Score;
    for (const thisPie in list) {
        if (list[thisPie].Score < topScore) {
            delete list[thisPie];
        }
    }

    return (
        <div className='winners box'>
            <h2 className='list-head'>The Best</h2>
            <ul className='podium'>
                {list.map((pie) => {
                    return (
                        <Pie key={pie.Tweet} pie={pie} />
                    );
                })}
            </ul>
        </div>
    );
};

export default Podium;
