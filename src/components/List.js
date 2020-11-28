import React from 'react';
import Pie from "./Pie";

const List = (props) => {
    const {list} = props;
    if (!list || list.length === 0) return <p>No pies, sorry</p>;

    return (
        <div className='list'>
            <h2 className='list-head'>The full list</h2>
            <ul className='list-inner'>
                {list.map((pie) => {
                    return (
                        <Pie key={pie.Tweet} pie={pie}/>
                    );
                })}
            </ul>
        </div>
    );
};

export default List;
