import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => (
	<div>
		<h1>Home Page</h1>
		<h3>can you here me</h3>
        <Link to={"/users"}>
        <button>Remy</button>
        </Link>
	</div>
);

export default Login;