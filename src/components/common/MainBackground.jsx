import React from 'react';
import backgroundImageUrl from '../../assets/images/background-image.jpeg';

const MainBackground = ({ children }) => {
	return (
		<div className="background-container" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
			<div className="colour-overlay"></div>
			<div className="content">
				{children}
			</div>
		</div>
	);
};

export default MainBackground;
