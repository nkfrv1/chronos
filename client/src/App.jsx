import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { checkAuth } from './features/login/loginThunk';
import appRouter from './app/router';
import './App.css';
import { useSelector } from 'react-redux';

function App() {
	const { isAuth, user } = useSelector(state => state.auth);

	useEffect(() => {
		(async function () {
			if (localStorage.getItem('token')) {
				await checkAuth();
			}
		})();
	}, []);


	return (
		<>
			{isAuth && <h3 style={{ textAlign: 'center' }}>Current user: {user.username}</h3>}
			<div className="App">
				<RouterProvider router={appRouter} />
			</div>
		</>
	);
}

export default App;
