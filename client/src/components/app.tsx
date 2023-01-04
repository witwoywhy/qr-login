import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
import SignupForm from '../routes/signup';
import Login from '../routes/login';

const App = () => (
	<div id="app">
		<Header />
		<main>
			<Router>
				<Route path="/" component={Home} />
				<Route path="/profile/" component={Profile} user="me" />
				<Route path="/profile/:user" component={Profile} />
				<Route path='/signup' component={SignupForm} />
				<Route path='login' component={Login} />
			</Router>
		</main>
	</div>
);

export default App;
