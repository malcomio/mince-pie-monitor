import React from 'react';
import Pie from "./Pie";

const Podium = (props) => {
    let {list} = props;
    if (!list || list.length === 0) return <p>No pies, sorry</p>;

    // Get all pies matching the top score.
    let pies = [];
    const topScore = list[0].Score;
    for (const thisPie in list) {
        if (list[thisPie].Score === topScore) {
            pies.push(list[thisPie])
        }
    }

    return (
        <div className='winners box'>
            <h2 className='list-head'>The Best</h2>
            <ul className='podium'>
                {pies.map((pie) => {
                    return (
                        <Pie key={pie.Tweet} pie={pie} />
                    );
                })}
            </ul>
        </div>
    );
};

export default Podium;
