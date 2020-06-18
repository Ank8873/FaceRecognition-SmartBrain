import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';

function App() {
  return (
    <div className="App">
      <Particles 
        params = {ParticlesOptions} />
      <Navigation />
      <Logo />
       <Rank /> 
      <ImageLinkForm />
     
      {/*
      <FaceRecognition />*/}
    </div>
  );
}

export default App;
