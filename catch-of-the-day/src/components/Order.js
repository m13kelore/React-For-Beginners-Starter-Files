import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends Component {
	static propTypes = {
		fishes: PropTypes.object,
		order: PropTypes.object,
		removeFromOrder: PropTypes.func
	};

	renderOrder = (currentFish) => {
		const fish = this.props.fishes[currentFish];
		const count = this.props.order[currentFish];
		const isAvailable = fish && fish.status === 'available';
		const transitionOptions = {
			classNames: 'order',
			key: currentFish,
			timeout: { enter: 500, exit: 500 }
		};

		if (!fish) return null;

		if (!isAvailable) {
			return (
				<CSSTransition {...transitionOptions}>
					<li key={currentFish}>Sorry {fish ? fish.name : ' this fish'} is no longer available</li>
				</CSSTransition>
			);
		}

		return (
			<CSSTransition {...transitionOptions}>
				<li key={currentFish}>
					<span>
						<TransitionGroup component="span" className="count">
							<CSSTransition {...transitionOptions}>
								<span>{count}</span>
							</CSSTransition>
						</TransitionGroup>
						lbs {fish.name}
						{formatPrice(count * fish.price)}
						<button onClick={() => this.props.deleteFromOrder(currentFish)}>&times;</button>
					</span>
				</li>
			</CSSTransition>
		);
	};

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, currentFish) => {
			const fish = this.props.fishes[currentFish];
			const count = this.props.order[currentFish];
			const isAvailable = fish && fish.status === 'available';
			if (isAvailable) {
				return prevTotal + count * fish.price;
			}
			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrder)}
				</TransitionGroup>
				<div className="total">
					Total:
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
