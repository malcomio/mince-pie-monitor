import React from 'react';
import Score from './Score';
import Shop from "./Shop";

const Pie = (props) => {
    const {pie} = props;
    return (
        <a href={pie.Tweet} className='pie__wrapper' target='_blank' rel='noopener noreferrer'>
            <li className='pie'>
                <Shop shop={pie.Shop}/>
                <p className='pie__name'>{pie.Name} </p>
                <img className='pie__image' src={pie.Image} alt={'Photo of ' + pie.Name}/>
                <Score score={pie.Score}/>
            </li>
        </a>
    )
};

export default Pie;
