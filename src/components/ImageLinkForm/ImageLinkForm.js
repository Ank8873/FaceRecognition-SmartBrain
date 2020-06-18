import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return(
		<div className=''> 
			<p className='f3'>
			{
				'This Magic Brain will detect the faces in your pictures. Give it a try :)'
			} </p>
			<div className='pa4 br3 form center'>
			<input className='f4 pa2 b--purple h2 bg-lightest-blue w-80 ' type='text' />
			<button className='w-20 button1 b--purple dim h2 tc f5   link ph3  dib white bg-dark-blue'> Detect</button>
			</div>		
		</div>
	);
}

export default ImageLinkForm;