import React, { useState } from 'react';

const PairsCard = ({ index, val, onClick }) => {
	const [active, setActive] = useState(false);
	const cardClass = val.isActive
		? { transform: 'rotateY(0deg)' }
		: { transform: 'rotateY(180deg)' };

	const handleClick = () => {
		const res = { ...val, index: index };
		onClick(res, setActive);
	};

	const backTimer = () => setTimeout(() => setActive(false), 2000);

	return (
		<div onClick={handleClick} className="pg-card">
			<div style={cardClass} className="pg-card-inner">
				<div className="pg-card-front">{val.item}</div>
				<div className="pg-card-back"></div>
			</div>
		</div>
	);
};

export default PairsCard;
