import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const ParticlesOptions = 
 {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}



const initialState = {
   input: '',
      imgURL:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        email:'',
        name:'',
        password: '',
        entries: 0,
        joined:''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgURL:'',
      box:{},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        email:'',
        name:'',
        password: '',
        entries: 0,
        joined:''

      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol:clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  createFaceBox = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = () => {
    this.setState({imgURL: this.state.input});
      fetch('https://murmuring-crag-22222.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  input:this.state.input
               })
              })
              .then(response => response.json())   
              .then(response => {
              if(response) {
              fetch('https://murmuring-crag-22222.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id:this.state.user.id
               })
              })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries:count}))
              })
              .catch(console.log);
            }
            this.createFaceBox(this.calculateFaceLocation(response))
          })
          .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route ==='home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route: route});

  }

  render() {
    const {isSignedIn, imgURL, route, box} = this.state;
    return (
    <div className="App">
      <Particles  className='Particles'
        params = {ParticlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home'
        ? <div>
            <Logo /> 
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries} 
            /> 
            <ImageLinkForm
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}
            />           
            <FaceRecognition imgURL={imgURL} box={box} />
        </div>
        : (
          this.state.route === 'signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>   
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>   
        )
      }
    </div>
  );
}
}

export default App;
