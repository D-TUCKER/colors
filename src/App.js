import React, { Component } from "react";
import "./App.css";
import { throttle } from "lodash";

const OFFSET = 50;
const RESIZE_TIMEOUT = 100;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getColors(count) {
  const boxData = [];
  for (let x = 0; x < count; x++) {
    const red = getRandomInt(0, 255);
    const green = getRandomInt(0, 255);
    const blue = getRandomInt(0, 255);
    //const opacity = getRandomInt(0, 10) * 0.1;
    const color = `rgba(${red}, ${green}, ${blue}, ${1})`;

    boxData.push(color);
  }

  return boxData;
}

class App extends React.Component {
  constructor(props) {
    super(props);

    const count = Math.floor(
      Math.min(
        window.innerHeight / (OFFSET * 2),
        window.innerWidth / (OFFSET * 2)
      )
    );

    const boxData = getColors(count);

    this.state = { boxData };
  }

  componentDidMount() {
    window.onresize = throttle(this.resize, RESIZE_TIMEOUT);
  }

  resize = () => {
    const count = Math.floor(
      Math.min(
        window.innerHeight / (OFFSET * 2),
        window.innerWidth / (OFFSET * 2)
      )
    );

    if (count < this.state.boxData.length) {
      this.setState({ boxData: this.state.boxData.slice(0, count) });
    } else if (count > this.state.boxData.length) {
      const diff = count - this.state.boxData.length;
      this.setState({ boxData: this.state.boxData.concat(getColors(diff)) });
    }
  };

  render() {
    return this.state.boxData.map((color, index) => (
      <ColorDiv color={color} offSet={index * OFFSET} />
    ));
  }
}

class ColorDiv extends Component {
  render() {
    const offSet = this.props.offSet || 0;

    const style = {
      position: "fixed",
      backgroundColor: this.props.color,
      left: offSet,
      right: 0,
      top: offSet,
      bottom: 0
    };

    return <div className="color-box" style={style} />;
  }
}

export default App;
