import React from 'react';
import '../styles/ModalScreen.css';

const ModalScreen = ({ active, winner }) => {
	const modalDisplay = active ? { display: 'block' } : { display: 'none' };

	return (
		<div className="modal-container" style={modalDisplay}>
			<div className="modal-inner">{winner} won</div>
		</div>
	);
};

export default ModalScreen;
