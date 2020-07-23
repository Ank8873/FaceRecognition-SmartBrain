import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange , onButtonSubmit}) => {
	return(
		<div className=''> 
			<p className='f3 white'>
			{
				'This Magic Brain will detect the faces in your pictures. Give it a try :)'
			} </p>
			<div className='pa4 br3 form center'>
				<input className='f4 pa2 center h2 b--purple bg-lightest-blue w-70 ' type='text' onChange={onInputChange}/>
				<button className='w-30 b--purple dim h2 tc f5 link ph3 pv2 dib white bg-dark-blue' onClick={onButtonSubmit}> Detect</button>
			</div>		
		</div>
	);
}

export default ImageLinkForm;