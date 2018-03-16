import React from 'react';

export default (props) => {
	return (
		<nav className="login">
			<h2>inventory login</h2>
			<p>Sign in to manage your store's inventory.</p>
			<button className="facebook" onClick={() => props.authenticate('Facebook')}>
				Log In With Facebook
			</button>
			<button className="twitter" onClick={() => props.authenticate('Twitter')}>
				Log In With Twitter
			</button>
			<button className="github" onClick={() => props.authenticate('Github')}>
				Log In With GitHub
			</button>
		</nav>
	);
};
