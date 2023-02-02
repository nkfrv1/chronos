import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { checkAuth } from './features/login/loginThunk';
import theme from './features/ui/theme';
import appRouter from './app/router';
import './App.css';

function App() {
	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth();
		}
	}, []);

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<RouterProvider router={appRouter} />
			</ThemeProvider>
		</div>
	);
}

export default App;
