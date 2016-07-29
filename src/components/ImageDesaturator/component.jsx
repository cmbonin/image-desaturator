import React from 'react';
import styles from './styles.scss';

export default class ImageDesaturator extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      image: {},
      bwImage: ''
    };
    this.handleDragover = this.handleDragover.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDesaturate = this.handleDesaturate.bind(this);
    this.handleClearImages = this.handleClearImages.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover', this.handleDragover);
    window.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('dragover', this.handleDragover);
    window.removeEventListener('drop', this.handleDrop);
  }

  handleDragover(e) {
    e.preventDefault();
  }

  handleDrop(e) {
    // TODO: image file type validation
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    for (let file of files) {
      this.handleFileDrop(file);
    }
  }

  handleFileDrop(file) {

    const reader = new FileReader();
    reader.addEventListener('load', (e) => {

      this.state.image = {
        file: e.target.result,
        name: file.name,
      };
      this.state.bgImage = '';

      this.setState(this.state);
    });
    reader.readAsDataURL(file);
  }

  getImagePreview() {
  	const image = this.state.image;
  	if(image.file) {
  		return (
  				<div className="image-holder"><img id="image" src={image.file} /></div>
  		);
  	}
  }

  getImageName() {
  	const image = this.state.image;
  	if(image.name) {
  		return (
  				<p>{image.name}</p>
  		);
  	}
  }

  handleDesaturate() {
    const imgObj = document.getElementById('image');
  	if(!imgObj) {
      return false;
    }

    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    const imgW = imgObj.width;
    const imgH = imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;
    canvasContext.drawImage(imgObj, 0, 0);
    const imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
    for(let i = 0; i < imgPixels.height; i++){
         for(let j = 0; j < imgPixels.width; j++){
              const vertex = (i * 4) * imgPixels.width + j * 4;
              const avg = (imgPixels.data[vertex] + imgPixels.data[vertex + 1] + imgPixels.data[vertex + 2]) / 3;
              imgPixels.data[vertex] = avg;
              imgPixels.data[vertex + 1] = avg;
              imgPixels.data[vertex + 2] = avg;
         }
    }

    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

    const bwImage = canvas.toDataURL();
    this.state.bwImage = bwImage;
    this.setState(this.state);

  }

  handleClearImages() {
    const state = this.state;
    state.image = {}
    state.bwImage = '';
    this.setState(state);
  }

  render() {
    const state = this.state;
    const style = {};
    if (!state.image.file) {
      style.display = 'none'
    }

    return (
      <div>
        <div className="column">
          <p>Drop an image here to convert it to black and white</p>
          <div className="image-wrapper">
            <div className="image-preview">
              { this.getImagePreview() }
            </div>
            <div className="image-name">
              { this.getImageName() }
            </div>
            <button onClick={this.handleDesaturate} style={style}>Desaturate</button>
            <button onClick={this.handleClearImages} style={style}>Clear images</button>
          </div>
          <div className="image-preview"><img src={state.bwImage}/></div>
        </div>
      </div>
    );
  }
}
