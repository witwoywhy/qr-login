import { h } from 'preact';
import { route } from 'preact-router';
import { Link } from 'preact-router/match';
import style from './style.css';

const logout = () => {
	localStorage.removeItem('user')
  route('/login', true)
}

const Header = () => (
	<header class={style.header}>
		<a href="/" class={style.logo}>
			<img src="../../assets/preact-logo-inverse.svg" alt="Preact Logo" />
			<h1>QR Login</h1>
		</a>
		<nav>
			<Link activeClassName={style.active} href="/">
				Home
			</Link>
			<Link activeClassName={style.active} href="/login">
				Login
			</Link>
			<Link activeClassName={style.active} href="/signup">
				Sign Up
			</Link>
			<Link activeClassName={style.active} onClick={logout}>
				Logout
			</Link>
		</nav>
	</header>
);

export default Header;
