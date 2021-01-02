import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Calculator from './screens/Calculator';
import MainApp from './screens/MainApp';
import MiniToDoApp from './screens/MiniToDoApp';
import PairsGame from './screens/PairsGame';
import TicTacToe from './screens/TicTacToe';

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Switch>
				<Route path="/" exact component={MainApp} />
				<Route path="/todo" component={MiniToDoApp} />
				<Route path="/calculator" component={Calculator} />
				<Route path="/tic-tac-toe" component={TicTacToe} />
				<Route path="/pairs" component={PairsGame} />
			</Switch>
		</Router>
	);
};

export default App;
