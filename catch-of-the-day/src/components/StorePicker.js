import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends Component {
	static propTypes = {
		history: PropTypes.object
	};

	storeInput = React.createRef();

	goToStore = (e) => {
		e.preventDefault();
		const storeName = this.storeInput.value.value;
		this.props.history.push(`/store/${storeName}`);
	};

	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					required
					placeholder="Store Name"
					defaultValue={getFunName()}
					ref={this.storeInput}
				/>
				<button type="submit">Visit Store →</button>
			</form>
		);
	}
}

export default StorePicker;
