import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import PlayToken from '../components/PlayToken';
import TicBox from '../components/TicBox';

import '../styles/TicTac-Toe.css';

class TicTacToe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 2,
			chosenPiece: 1,
			gameActive: true,
			modalActive: false,
			playerTurn: 1,
			boardState: Array(9).fill(0),
			winConfig: [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6],
			],
		};
	}

	changeTurn = () => {
		const { gameActive, playerTurn } = this.state;
		if (!gameActive) return;

		let tempTurn;
		if (playerTurn === 1) {
			tempTurn = 2;
		} else if (playerTurn === 2) {
			tempTurn = 1;
		}
		this.setState({ playerTurn: tempTurn }, () => this.compTurn());
	};

	checkWin = (turn) => {
		const { winConfig, boardState } = this.state;
		let won = false;

		for (let i = 0; i < winConfig.length; i++) {
			if (
				boardState[winConfig[i][0]] === boardState[winConfig[i][1]] &&
				boardState[winConfig[i][0]] === boardState[winConfig[i][2]] &&
				boardState[winConfig[i][0]] === turn
			) {
				won = true;
				break;
			}
		}

		if (won) {
			this.setState({ gameActive: false }, () => console.log('won'));
		} else {
			this.changeTurn();
		}
	};

	resetGame = () => {
		this.setState({
			modalActive: false,
			gameActive: true,
			playerTurn: this.state.chosenPiece,
			boardState: Array(9).fill(0),
		});
	};

	quitGame = () => {
		this.resetGame();
		this.setState({ page: 1 });
	};

	handleBoxClick = (index) => {
		const { gameActive, boardState, playerTurn } = this.state;
		if (!gameActive) return;

		const tempBoardState = [...boardState];
		if (tempBoardState[index] !== 0) return;

		tempBoardState[index] = playerTurn;
		this.setState({ boardState: tempBoardState }, () =>
			this.checkWin(playerTurn)
		);
	};

	compTurn = () => {
		const { chosenPiece, boardState, winConfig, playerTurn } = this.state;
		if (playerTurn === chosenPiece) return;

		let tempArr = [];
		let compArr = [];
		let playedBoxes = [];
		let possibleWin = [];
		for (let i = 0; i < boardState.length; i++) {
			if (boardState[i] === 0) {
				tempArr.push(i);
			} else if (boardState[i] !== chosenPiece) {
				compArr.push(i);
			} else {
				playedBoxes.push(i);
			}
		}

		let maxCounter = 0;
		for (let i = 0; i < winConfig.length; i++) {
			const play = winConfig[i].filter(
				(val) => tempArr.includes(val) || compArr.includes(val)
			);

			if (play.length > possibleWin.length) {
				possibleWin = play;
				console.log(play);
			}
		}

		let compChoice =
			possibleWin[Math.ceil(Math.random() * possibleWin.length) - 1];

		setTimeout(() => {
			this.handleBoxClick(compChoice);
		}, 100);
	};

	renderStartScreen = () => {
		const { chosenPiece } = this.state;

		const renderTokens = (id) => {
			return (
				<PlayToken
					player={id}
					size={120}
					chosen={chosenPiece}
					onClick={() =>
						this.setState({ chosenPiece: id, playerTurn: id })
					}
				/>
			);
		};

		return (
			<div className="ttt-welcome">
				<p className="ttt-logo">TIC-TAC-TOE</p>

				<p className="ttt-choose">Pick your side</p>
				<div className="ttt-sides">
					{renderTokens(1)}
					{renderTokens(2)}
				</div>

				<div
					className="ttt-play-btn"
					onClick={() => this.setState({ page: 2 })}>
					START
				</div>
			</div>
		);
	};

	renderMainGame = () => {
		const { boardState, gameActive } = this.state;
		const { handleBoxClick, quitGame } = this;

		const parentClass = gameActive ? 'ttt-game' : 'ttt-game game-end';
		const iconSize = gameActive ? 70 : 40;

		return (
			<div className={parentClass}>
				<div className="ttt-go-to-start">
					<span onClick={quitGame}>
						<FaArrowLeft /> Quit
					</span>
				</div>
				<div className="ttt-score">
					<span className="ttt-player-lbl">You</span>
					<span className="ttt-scores">0 : 0</span>
					<span className="ttt-player-lbl">Computer</span>
				</div>
				<div className="ttt-board">
					{boardState.map((val, index) => (
						<TicBox
							key={index}
							tag={val}
							index={index}
							size={iconSize}
							ref={this.board[index]}
							onClick={handleBoxClick}
						/>
					))}
				</div>

				<div className="ttt-end-settings">
					<div className="ttt-end-settings-btns">
						<div className="ttt-end-quit">Back To Main</div>
						<div
							className="ttt-end-restart"
							onClick={() =>
								this.setState({ page: 2 }, () =>
									this.resetGame()
								)
							}>
							RESTART
						</div>
					</div>
				</div>
			</div>
		);
	};

	renderWinScreen = () => {
		const { playerTurn } = this.state;

		return (
			<div className="ttt-end-game">
				<div className="icon">
					<PlayToken player={playerTurn} size={120} />
				</div>

				<div className="ttt-end-buttons">
					<div className="ttt-end-quit">Back To Main</div>
					<div
						className="ttt-end-restart"
						onClick={() =>
							this.setState({ page: 2 }, () => this.resetGame())
						}>
						RESTART
					</div>
				</div>
			</div>
		);
	};

	render() {
		const { page } = this.state;
		const { renderStartScreen, renderMainGame, renderWinScreen } = this;

		let screen = <></>;
		if (page === 1) {
			screen = renderStartScreen();
		} else if (page === 2) {
			screen = renderMainGame();
		} else if (page === 3) {
			screen = renderWinScreen();
		}

		return (
			<div className="ttt-container" ref={this.myItem}>
				<div className="ttt-inner">{screen}</div>
			</div>
		);
	}
}

export default TicTacToe;
