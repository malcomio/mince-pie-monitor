import React from 'react';

import aldi from "../img/logos/aldi.svg";
import asda from "../img/logos/asda.svg";
import mands from "../img/logos/mands.svg";
import mrkipling from "../img/logos/mrkipling.jpeg";
import sainsburys from "../img/logos/sainsburys.svg";
import tesco from "../img/logos/tesco.svg";
import waitrose from "../img/logos/waitrose.svg";

const logoFile = (shop) => {
    const logos = {
        'Asda': asda,
        'Aldi': aldi,
        'Tesco': tesco,
        'M&S': mands,
        'Mr Kipling': mrkipling,
        "Sainsbury's": sainsburys,
        'Waitrose': waitrose
    };

    return logos[shop];
};

const Shop = (props) => {
    const {shop} = props;

    const logo = logoFile(shop);

    return (
        // TODO: shop logos
        <img className='pie__shop' src={logo} alt={shop}/>
    )
};

export default Shop;
