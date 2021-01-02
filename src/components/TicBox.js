import React, { forwardRef } from 'react';

import PlayToken from './PlayToken';

const TicBox = forwardRef(({ tag, index, size, onClick }, ref) => {
	const handleClick = () => onClick(index);

	return (
		<div className="ttt-box" onClick={handleClick} ref={ref}>
			<PlayToken player={tag} size={size} />
		</div>
	);
});

export default TicBox;
