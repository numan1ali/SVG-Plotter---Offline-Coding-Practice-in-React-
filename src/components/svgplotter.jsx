import React, { Component } from "react";

class Plotter extends Component {
  constructor() {
    //   Counter is a child class as we doing inheritance here, it is extending Component class. So, before calling the
    //   constructor of child class we have to call the constructor of parent class and we do that by calling super().
    super();
    this.countIncrement = this.countIncrement.bind(this);
    this.state = { input: "", count: 0, flag: false };
    this.onSubmit = this.onSubmit.bind(this);
  }
  // its good practice to make class for styling keeping in the view
  // maintainbility and performance.
  styles = {
    fontSize: 15,
    fontWeight: "bold",
  };
  btnStyle = {
    backgroundColor: "#e7e7e7",
    color: "white",
    padding: 20,
    textAlign: "center",
    display: "inline-block",
    fontSize: 16,
    margin: 4,
    cursor: "pointer",
  };
  gridContainer = {
    display: "grid",
    gridTemplateColumns: `auto auto auto auto`,
    textAlign: "center",
    backgroundColor: "#E0E0E0",
    marginTop: 20,
    padding: 10,
  };
  gridItem = {
    border: `1 solid rgba(0, 0, 0, 0.8)`,
    padding: 10,
    textAlign: "center",
  };
  isPolygon;
  isEllipse;
  arrayToStoreValues = {
    circle: {
      xCoordinat: 0,
      yCoordinat: 0,
      radius: 0,
      values: [],
    },
    rectangle: {
      xCoordinat: 0,
      yCoordinat: 0,
      rWidth: 0,
      rHeight: 0,
      values: [],
    },
    polygon: {
      points: "",
      values: [],
    },
    ellipse: {
      xCoordinat: 0,
      yCoordinat: 0,
      horizentalRadius: 0,
      verticalRadius: 0,
      values: [],
    },
  };

  generateRandomColor() {
      let color = Math.floor(Math.random()*16777215).toString(16);
      return "#" + color;
  }

  onSubmit(e) {
    e.preventDefault();

    let text = document.getElementById("svgInput");
    this.isPolygon = false;
    this.isEllipse = false;
    this.setState({ flag: false });
    let values = text.value.replace(/\r\n/g, "\n").split("\n");

    if (values.length > 0) {
      values.forEach((element) => {
        let convertFromArrayToString = element.toString();
        let svgValues = convertFromArrayToString.split(" ");
        console.log(svgValues);
        if (svgValues[0] === "c") {
          this.arrayToStoreValues.circle.xCoordinat = parseInt(svgValues[1]);
          this.arrayToStoreValues.circle.yCoordinat = parseInt(svgValues[2]);
          this.arrayToStoreValues.circle.radius = parseInt(svgValues[3]);
          this.setState({ flag: true });
          this.arrayToStoreValues.circle.values = svgValues;
        } else if (svgValues[0] === "r") {
          this.arrayToStoreValues.rectangle.xCoordinat = parseInt(svgValues[1]);
          this.arrayToStoreValues.rectangle.yCoordinat = parseInt(svgValues[2]);
          this.arrayToStoreValues.rectangle.rWidth = parseInt(svgValues[3]);
          this.arrayToStoreValues.rectangle.rHeight = parseInt(svgValues[4]);
          this.arrayToStoreValues.rectangle.values = svgValues;
          this.setState({ flag: true });
        } else if (svgValues[0] === "p") {
            this.arrayToStoreValues.polygon.points = convertFromArrayToString.slice(2);
            this.arrayToStoreValues.polygon.values = svgValues;
            this.setState({ flag: true });
            this.isPolygon = true;
        } else if (svgValues[0] === "e") {
            this.arrayToStoreValues.ellipse.xCoordinat = parseInt(svgValues[1]);
            this.arrayToStoreValues.ellipse.yCoordinat = parseInt(svgValues[2]);
            this.arrayToStoreValues.ellipse.horizentalRadius = parseInt(svgValues[3]);
            this.arrayToStoreValues.ellipse.verticalRadius = parseInt(svgValues[4]);
            this.arrayToStoreValues.ellipse.values = svgValues;
            this.setState({ flag: true });
            this.isEllipse = true;
        }
      });
      console.log(this.state.input);
      console.log(values);
      console.log(this.arrayToStoreValues);
    } else console.log("Please enter input");
  }
  myChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    let polygon = this.isPolygon;
    let ellipse = this.isEllipse;
    return (
      <div>
        <div style={{ margin: 20, textAlign: "center" }}>
          <form>
            <h1>SVG Plotter</h1>
            <p>Enter Values:</p>
            <textarea
              id="svgInput"
              name="textarea"
              style={{ width: 300, height:100 }}
              onChange={this.myChangeHandler}
            ></textarea>
          </form>
          <button onClick={this.onSubmit} className={this.btnStyle}>
            Draw
          </button>

          <div style={this.gridContainer}>
            <div style={this.gridItem}>
              {this.arrayToStoreValues.circle.values.length === 4 &&
                this.state.flag && (
                  <svg height="250" width="250">
                    <circle
                      cx={this.arrayToStoreValues.circle.xCoordinat}
                      cy={this.arrayToStoreValues.circle.yCoordinat}
                      r={this.arrayToStoreValues.circle.radius}
                      style={{ stroke: "black", strokeWidth: 3, fill: this.generateRandomColor() }}
                    />
                  </svg>
                )}

            </div>
            <div style={this.gridItem}>
              {this.arrayToStoreValues.rectangle.values.length === 5 &&
                this.state.flag && (
                  <svg height="250" width="250">
                    <rect
                      x={this.arrayToStoreValues.rectangle.xCoordinat}
                      y={this.arrayToStoreValues.rectangle.yCoordinat}
                      width={this.arrayToStoreValues.rectangle.rWidth}
                      height={this.arrayToStoreValues.rectangle.rHeight}
                      style={{
                        fill: this.generateRandomColor(),
                        strokeWidth: 3,
                        stroke: "rgb(0,0,0)",
                      }}
                    />
                  </svg>
                )}
            </div>
            <div style={this.gridItem}>
              {this.state.flag && polygon && (

              <svg height="210" width="500">
                <polygon
                  points={this.arrayToStoreValues.polygon.points}
                  style={{fill:this.generateRandomColor(),stroke:"purple",strokeWidth:1}}
                />
              </svg>
              )}
            </div>
            <div style={this.gridItem}>
              { this.state.flag && ellipse && (
                  <svg height="250" width="250">
                    <ellipse
                      cx={this.arrayToStoreValues.ellipse.xCoordinat}
                      cy={this.arrayToStoreValues.ellipse.yCoordinat}
                      rx={this.arrayToStoreValues.ellipse.horizentalRadius}
                      ry={this.arrayToStoreValues.ellipse.verticalRadius}
                      style={{
                        fill: this.generateRandomColor(),
                        strokeWidth: 3,
                        stroke: "purple",
                      }}
                    />
                  </svg>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Plotter;
