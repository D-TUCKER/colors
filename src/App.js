import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
// import { throttle } from "lodash";

import "./App.css";

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

    // const count = Math.floor(
    //   Math.min(
    //     window.innerHeight / (OFFSET * 2),
    //     window.innerWidth / (OFFSET * 2)
    //   )
    // );

    const boxData = [
      { text: "red text", color: "red" },
      { text: "blue text", color: "blue" },
      { text: "yellow text", color: "yellow" },
      { text: "orange text", color: "orange" },
      { text: "purple text", color: "purple" }
    ];

    this.state = { boxData };
  }

  boxClicked = offSet => {
    //console.log(offSet, this.state.boxData);
    const boxData = this.state.boxData.slice();

    //const index = boxData.length - 1 - offSet;
    //console.log(offSet, index, this.state.boxData);

    if (boxData.length - 1 !== offSet) {
      const clicked = boxData.splice(offSet, 1);
      this.setState({
        boxData: boxData.concat(clicked)
      });
    }

    // this.setState({
    //   boxData: [...boxData.slice(index), ...boxData.slice(0, index)]
    // });
  };

  // componentDidMount() {
  //   window.onresize = throttle(this.resize, RESIZE_TIMEOUT);
  // }

  // resize = () => {
  //   const count = Math.floor(
  //     Math.min(
  //       window.innerHeight / (OFFSET * 2),
  //       window.innerWidth / (OFFSET * 2)
  //     )
  //   );

  //   if (count < this.state.boxData.length) {
  //     this.setState({ boxData: this.state.boxData.slice(0, count) });
  //   } else if (count > this.state.boxData.length) {
  //     const diff = count - this.state.boxData.length;
  //     this.setState({ boxData: this.state.boxData.concat(getColors(diff)) });
  //   }
  // };

  render() {
    return this.state.boxData.map((box, index) => (
      <ColorDiv
        boxClicked={this.boxClicked}
        key={this.props.offSet}
        color={box.color}
        text={box.text}
        index={index}
        len={this.state.boxData.length}
      />
    ));
  }
}

class ColorDiv extends Component {
  render() {
    const offSet = this.props.index * 50 || 0;
    const behind = this.props.index < this.props.len - 1;

    const style = {
      position: "fixed",
      backgroundColor: this.props.color,
      left: offSet,
      right: 0,
      top: offSet,
      bottom: 0,
      opacity: behind ? 0.9 : 1,
      cursor: behind ? "pointer" : ""
    };

    return (
      <div
        className="color-box"
        key={this.props.index}
        style={style}
        onClick={this.props.boxClicked.bind(null, this.props.index)}
      >
        <h2 className="box-text">{this.props.text}</h2>
      </div>
    );
  }
}

export default App;
