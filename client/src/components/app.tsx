import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import SignUp from '../routes/signup';
import Login from '../routes/login';
import Me from '../routes/me';

const App = () => (
	<div id="app">
		<Header />
		<main>
			<Router>
				<Route path="/" component={Home} />
				<Route path='/signup' component={SignUp} />
				<Route path='/login' component={Login} />
				<Route path='/me' component={Me} />
			</Router>
		</main>
	</div>
);

export default App;
