import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fishes: {},
			order: {}
		};
	}

	static propTypes = {
		match: PropTypes.object
	};

	componentDidMount() {
		const { params } = this.props.match;
		const localStorageRef = localStorage.getItem(params.storeId);
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: 'fishes'
		});

		if (localStorageRef) {
			this.setState({ order: JSON.parse(localStorageRef) });
		}
	}

	componentDidUpdate() {
		localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	addFish = (fish) => {
		const fishes = { ...this.state.fishes };

		fishes[`fish${Date.now()}`] = fish;

		this.setState({
			fishes
		});
	};

	updateFish = (key, updatedFish) => {
		const fishes = { ...this.state.fishes };
		fishes[key] = updatedFish;
		this.setState({ fishes });
	};

	deleteFish = (fishToDelete) => {
		const fishes = { ...this.state.fishes };
		fishes[fishToDelete] = null;
		this.setState({ fishes });
	};

	loadSampleFishes = () => {
		this.setState({
			fishes: sampleFishes
		});
	};

	addToOrder = (fishToAdd) => {
		const order = { ...this.state.order };
		order[fishToAdd] = order[fishToAdd] + 1 || 1;
		this.setState({ order });
	};

	deleteFromOrder = (fishToDelete) => {
		const order = { ...this.state.order };
		delete order[fishToDelete];
		this.setState({ order });
	};

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="fishes">
						{Object.keys(this.state.fishes).map((currentFish) => (
							<Fish
								key={currentFish}
								index={currentFish}
								details={this.state.fishes[currentFish]}
								addToOrder={this.addToOrder}
							/>
						))}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					deleteFromOrder={this.deleteFromOrder}
				/>
				<Inventory
					addFish={this.addFish}
					updateFish={this.updateFish}
					deleteFish={this.deleteFish}
					loadSampleFishes={this.loadSampleFishes}
					fishes={this.state.fishes}
					storeId={this.props.match.params.storeId}
				/>
			</div>
		);
	}
}

export default App;
