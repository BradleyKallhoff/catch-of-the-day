import React from 'react'
import { formatPrice } from '../helpers';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import PropTypes from 'prop-types';

class Order extends React.Component {

    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 },
        }

        if(!fish || fish.status === 'unavailable') {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry, {fish ? fish.name : 'fish'} is no longer available!
                        {removeButton}
                    </li>
                </CSSTransition>
            );
        }

        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                <span className="grid">
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition
                                classNames="count"
                                key={count}
                                timeout={{ enter: 500, exit: 500 }}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                    </span>
                    <span className="price">
                        {formatPrice(count * fish.price)}
                        {removeButton}
                    </span>
                </span>
                </li>
            </CSSTransition>
        );
    }

    render() {
        let orderIds = [];
        if(this.props.order) {
            orderIds =  Object.keys(this.props.order);
        }
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * fish.price || 0)
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        )
    }
}

Order.propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object,
    params: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired,
}

export default Order;
