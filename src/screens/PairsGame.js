import React, { Component } from 'react';
import PairsCard from '../components/PairsCard';
import '../styles/PairsGame.css';

class PairsGame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameState: [
				{ item: 0, isActive: false },
				{ item: 0, isActive: false },
				{ item: 1, isActive: false },
				{ item: 1, isActive: false },
				{ item: 2, isActive: false },
				{ item: 2, isActive: false },
				{ item: 3, isActive: false },
				{ item: 3, isActive: false },
			],
			opened: [],
			score: 0,
		};
	}

	closeCards = () => {
		this.setState(
			{
				opened: [],
				gameState: [
					{ item: 0, isActive: false },
					{ item: 0, isActive: false },
					{ item: 1, isActive: false },
					{ item: 1, isActive: false },
					{ item: 2, isActive: false },
					{ item: 2, isActive: false },
					{ item: 3, isActive: false },
					{ item: 3, isActive: false },
				],
			},
			() => console.log('closed')
		);
	};

	handleCardClick = (res) => {
		const { item, isActive, index } = res;
		const { gameState, opened } = this.state;

		const tempArr = [...gameState];
		let tempObj = {};
		let tempOpened = [...opened];

		if (isActive) {
			tempOpened = tempOpened.filter((i) => i !== item);
		} else {
			tempObj = { ...res, isActive: true };
			tempOpened.push(index);
		}
		tempArr[index] = tempObj;
		this.setState({ opened: tempOpened, gameState: tempArr }, () =>
			this.checkCards()
		);
	};

	checkCards = () => {
		const { opened } = this.state;
		console.log(opened, 'check');

		if (opened.length === 2) {
			setTimeout(() => {
				this.closeCards();
			}, 1500);
		} else if (opened.length > 2) {
			this.closeCards();
		}
	};

	render() {
		const { gameState, opened, score } = this.state;

		return (
			<div className="pairs-game">
				<p className="pg-title">Pairs Game</p>
				<p className="pg-sub-title">Match the pairs.</p>
				<p className="pg-score">
					{score} | {opened.toString()}
				</p>

				<div className="pg-content">
					{gameState.map((val, index) => (
						<PairsCard
							key={index}
							index={index}
							val={val}
							onClick={this.handleCardClick}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default PairsGame;
