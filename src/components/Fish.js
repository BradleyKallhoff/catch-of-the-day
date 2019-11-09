import React from 'react'
import { formatPrice } from '../helpers';
import PropTypes from 'prop-types';

class Fish extends React.Component {

    render() {
        const {name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available';
        const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';
        return (
        <li className="menu-fish">
            <img src={require('../images/bip.jpg')} alt={name}/>
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

Fish.propTypes = {
    index: PropTypes.string.isRequired,
    details: PropTypes.object.isRequired,
    addToOrder: PropTypes.func.isRequired,
}

export default Fish;