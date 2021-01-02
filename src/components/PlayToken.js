import React from 'react';
import { FaRegCircle, FaTimes } from 'react-icons/fa';

const PlayToken = ({ player, size, chosen, onClick }) => {
	let customStyle = {};
	if (chosen) {
		if (chosen === player) {
			customStyle = { opacity: 1 };
		} else {
			customStyle = { opacity: 0.4 };
		}
	}

	let token = <></>;
	if (player === 1) {
		token = <FaRegCircle size={size} color="#eb3b5a" />;
	} else if (player === 2) {
		token = <FaTimes size={size} color="#575fcf" />;
	}

	return (
		<div className="ttt-play-token" style={customStyle} onClick={onClick}>
			{token}
		</div>
	);
};

export default PlayToken;
