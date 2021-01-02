import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/AppListCard.css';

const AppListCard = ({ title, img, to }) => {
	const history = useHistory();
	const handleClick = () => history.push(to);

	return (
		<div className="app-list-card" onClick={handleClick}>
			<div className="app-list-card-image">
				<img src={img} alt={title} />
			</div>
			<div className="app-list-card-name">{title}</div>
		</div>
	);
};

export default AppListCard;
