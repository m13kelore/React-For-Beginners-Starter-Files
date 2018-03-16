import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';

class Inventory extends Component {
	static propTypes = {
		fishes: PropTypes.object,
		addFish: PropTypes.func,
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		loadSampleFishes: PropTypes.func
	};

	authenticate = (provider) => {
		console.log('authenticating ', provider);
	};

	render() {
		return <Login authenticate={this.authenticate} />;
		return (
			<div className="inventory">
				<h2>Inventory</h2>
				{Object.keys(this.props.fishes).map((currentFish) => (
					<EditFishForm
						key={currentFish}
						index={currentFish}
						fish={this.props.fishes[currentFish]}
						updateFish={this.props.updateFish}
						deleteFish={this.props.deleteFish}
					/>
				))}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
			</div>
		);
	}
}

export default Inventory;
