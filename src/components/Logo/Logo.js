import React from 'react';
import Tilt from 'react-tilt'
import logo from './logo.png'

const Logo = () => {
	return(
		<div className='ma4 mt0'> 
			<Tilt className="Tilt" options={{ max :75 }} style={{ height: 130, width: 130 }} >
 			<div className="Tilt-inner">
 			<img style={{paddingTop:'0px'}} alt='logo' src={logo}/>
 			</div>
		</Tilt>


		</div>
	



	);
}

export default Logo;