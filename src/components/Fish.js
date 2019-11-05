import React from 'react'
import { formatPrice } from '../helpers';

class Fish extends React.Component {

    render() {
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        return (
        <li className="menu-fish">
            <img src={image} alt={name}/>
            <h3 className="fish-name">
                {name}
            </h3>
            <span className="price">{formatPrice(price)}</span>
            <p>{desc}</p>
            <button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{buttonText}</button>
        </li>
        );
    }

}

export default Fish;