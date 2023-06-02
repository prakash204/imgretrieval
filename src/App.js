import React , {Component} from 'react';
import CanvasDraw from 'react-canvas-draw';
import retr1 from './images/1.jpg';
import retr2 from './images/2.jpg';
import retr3 from './images/3.jpg';
import retr4 from './images/4.jpg';
import retr5 from './images/5.jpg';
import bgcanva from "./images/background-canvas.png"
// import Demo from './Demo.js';
// import {BrowserRouter as Router,Switch,Route}  from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
// import imageDataURI from 'image-data-uri'

import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "black",
            width: 700,
            height: 500,
            brushRadius: 5,
            lazyRadius: 12,
            showRetrieved: false,
            retrieved:null
    }
}

  componentDidMount(){
    this.setState({showRetrieved:false, retrieved:[retr1, retr2, retr3, retr4, retr5]});
  }

  saveimage(dataurl) {
    console.log(dataurl);
    // await imageDataURI.outputFile(dataurl,'./base/outimg').then(res => console.log(res));
    const pngUrl = dataurl//dataurl("image/png").replace("image/png","image/octe-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "drawing.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    this.setState({showRetrieved : true});
    console.log(true)

    // axios.get("http://localhost:8000/image?data="+dataurl)
    //     .then(res => {
    //         this.setState({relevantImages : res.result})
    //     })
    //     .catch(err => console.log(err))
  }

  render () {
  return (
    <div className="App">
        <div>
            <CanvasDraw
            ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
            brushColor={this.state.color}
            brushRadius={this.state.brushRadius}
            lazyRadius={this.state.lazyRadius}
            canvasWidth={this.state.width}
            canvasHeight={this.state.height}
            // imgSrc={bgcanva}
            />
            <button class="canva-button" onClick={() => (this.saveimage(this.saveableCanvas.getDataURL('png',false,"white")))}>Submit</button>
            <button class="canva-button" onClick={() => {
              this.saveableCanvas.eraseAll()
              this.setState({showRetrieved:false})
              console.log(false);
              }}>Reset</button>
            <button class="canva-button" onClick={() => (this.saveableCanvas.undo())}>Undo</button>
        </div>
        {
        this.state.showRetrieved ? 
        <div class="retrieved">
          <div class="item">
            <img src={this.state.retrieved[0]} alt="ret1"/>
            <img src={this.state.retrieved[1]} alt="ret1"/>
          </div>

          <div class="item">
            <img src={this.state.retrieved[2]} alt="ret1"/>
            <img src={this.state.retrieved[3]} alt="ret1"/>
          </div>
          
          <div class="item">
            <img src={this.state.retrieved[4]} alt="ret1"/>
          </div>
        </div> 
        : ""
        }
        
    </div>
  );
}
}

export default App;
