import React from 'react';
import AppListCard from '../components/AppListCard';
import todo from '../assets/todo.png';
import ttt from '../assets/tic-tac-toe.png';
import calc from '../assets/calc.png';

const MainApp = () => {
	return (
		<div className="container">
			<div className="navbar">
				<span className="logo">finlab</span>
			</div>

			<div className="main-content">
				<AppListCard title="ToDo App" img={todo} to="/todo" />
				<AppListCard title="Calculator" img={calc} to="/calculator" />
				<AppListCard title="Tic Tac Toe" img={ttt} to="/tic-tac-toe" />
				<AppListCard title="Pairs Game" to="/pairs" />
			</div>
		</div>
	);
};

export default MainApp;
