import React, { Component } from "react";

// const initialState = { input: "", inputError: "", flag: false };
class Plotter extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      inputError: "",
      flag: false,
      circleError: "",
      rectangleError: "",
      ellipseError: "",
      polygonError: "",
      commandName: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  // its good practice to make class for styling keeping in the view
  // maintainbility and performance.
  infoNote = {
    backgroundColor: "#e7f3fe",
    borderLeft: `6px solid #2196F3  `,
    width: 470,
    height: 240,
    textAlign: "center",
    marginBottom: 15
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
  objectToStoreValues = {
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
  inputLength;

  generateRandomColor() {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + color;
  }
  validate = () => {
    let inputErrorBlank = "";
    let inputError = "";
    if (!this.state.input) {
      inputErrorBlank = "TextArea Cannot be blank";
    }
    let text = document.getElementById("svgInput");
    let values = text.value.replace(/\r\n/g, "\n").split("\n");
    this.inputLength = values.length;
    if (values.length > 4) {
      inputError =
        "Wrong input pattern - At max you ou can only add 4 commands at a time";
    }
    if (inputErrorBlank) {
      this.setState({
        inputError: inputErrorBlank,
        ellipseError: "",
        circleError: "",
        polygonError: "",
        rectangleError: "",
        commandName: "",
      });
      return false;
    } else if (inputError) {
      this.setState({ inputError });
      return false;
    } else {
      this.setState({
        inputError: "",
        ellipseError: "",
        circleError: "",
        polygonError: "",
        rectangleError: "",
        commandName: "",
      });
    }
    return true;
  };
  onSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.isPolygon = false;
      this.isEllipse = false;
      this.setState({ flag: false });
      let text = document.getElementById("svgInput");
      let values = text.value.replace(/\r\n/g, "\n").split("\n");
      this.inputLength = values.length;

      if (values.length > 0) {
        let line = 1;
        values.forEach((element) => {
          let convertFromArrayToString = element.toString();
          let svgValues = convertFromArrayToString.split(" ");
          console.log(svgValues);
          if (svgValues[0] === "c") {
            this.objectToStoreValues.circle.xCoordinat = parseInt(svgValues[1]);
            this.objectToStoreValues.circle.yCoordinat = parseInt(svgValues[2]);
            this.objectToStoreValues.circle.radius = parseInt(svgValues[3]);
            this.setState({ flag: true });
            this.objectToStoreValues.circle.values = svgValues;
            let circleError;
            if (svgValues.length > 4 || svgValues.length < 4) {
              circleError = `Wrong input pattern for circle - error in line ${line}`;
            } else if (
              !this.objectToStoreValues.circle.xCoordinat ||
              !this.objectToStoreValues.circle.yCoordinat ||
              !this.objectToStoreValues.circle.radius
            ) {
              circleError = `Wrong input pattern for circle - error in line ${line}`;
            } else {
              circleError = "";
            }
            this.setState({ circleError });
          } else if (svgValues[0] === "r") {
            this.objectToStoreValues.rectangle.xCoordinat = parseInt(
              svgValues[1]
            );
            this.objectToStoreValues.rectangle.yCoordinat = parseInt(
              svgValues[2]
            );
            this.objectToStoreValues.rectangle.rWidth = parseInt(svgValues[3]);
            this.objectToStoreValues.rectangle.rHeight = parseInt(svgValues[4]);
            this.objectToStoreValues.rectangle.values = svgValues;
            this.setState({ flag: true });
            let rectangleError;
            if (svgValues.length > 5 || svgValues.length < 5) {
              rectangleError = `Wrong input pattern for rectangle - error in line ${line}`;
            } else if (
              !this.objectToStoreValues.rectangle.xCoordinat ||
              !this.objectToStoreValues.rectangle.yCoordinat ||
              !this.objectToStoreValues.rectangle.rWidth ||
              !this.objectToStoreValues.rectangle.rHeight
            ) {
              rectangleError = `Wrong input pattern for rectangle - error in line ${line}`;
            } else {
              rectangleError = "";
            }
            this.setState({ rectangleError });
          } else if (svgValues[0] === "p") {
            this.objectToStoreValues.polygon.points = convertFromArrayToString.slice(
              2
            );
            this.objectToStoreValues.polygon.values = svgValues;
            this.setState({ flag: true });
            let polygonError;
            if (svgValues.length > 4 || svgValues.length < 4) {
              polygonError = `Wrong input pattern for polygon - error in line ${line}`;
            } else if (svgValues.indexOf(" ") !== -1) {
              polygonError = `Wrong input pattern for polygon - error in line ${line}`;
            } else {
              polygonError = "";
            }
            this.setState({ polygonError });
            // this.isPolygon = true;
          } else if (svgValues[0] === "e") {
            this.objectToStoreValues.ellipse.xCoordinat = parseInt(svgValues[1]);
            this.objectToStoreValues.ellipse.yCoordinat = parseInt(svgValues[2]);
            this.objectToStoreValues.ellipse.horizentalRadius = parseInt(
              svgValues[3]
            );
            this.objectToStoreValues.ellipse.verticalRadius = parseInt(
              svgValues[4]
            );
            this.objectToStoreValues.ellipse.values = svgValues;
            this.setState({ flag: true });
            let ellipseError;
            if (svgValues.length > 5 || svgValues.length < 5) {
              ellipseError = `Wrong input pattern for ellipse - error in line ${line}`;
            } else if (
              !this.objectToStoreValues.ellipse.xCoordinat ||
              !this.objectToStoreValues.ellipse.yCoordinat ||
              !this.objectToStoreValues.ellipse.horizentalRadius ||
              !this.objectToStoreValues.ellipse.verticalRadius
            ) {
              ellipseError = `Wrong input pattern for ellipse - error in line ${line}`;
            } else {
              ellipseError = "";
            }
            this.setState({ ellipseError });
          } else {
            let commandName;
            commandName =
              "Wrong input pattern - Command can only start with c,r,p or e.";

            if (commandName) {
              this.setState({ commandName });
            }
          }
          line++;
        });
        console.log(this.state.input);
        console.log(values);
        console.log(this.objectToStoreValues);
      } else {
        this.objectToStoreValues = {};
        this.setState({ flag: false });
      }
    }
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
            <div style={{textAlign: "-webkit-center"}}>
              <div style={this.infoNote}>
                <strong style={{textAlign: "center"}}>Note!</strong> 
                <ul>
                  <li>
                    Please Read the readme.txt file to get the format.
                  </li>
                  <li>
                    You can only add 4 command at a time otherwise get error.
                  </li>
                  <li>Commands name can only start with c,r,p or e.</li>
                  <li>You will see the errors, once you click on the draw button. </li>
                  <li>Circle: CX - CY - Radius | c 20 50 44</li>
                  <li>Rectangle: X - Y - Width - Height | r 20 50 44 55</li>
                  <li>Polygon: X1,Y1 - X2,Y2 - X3,Y3 | p 98,89 50,78 77,67</li>
                  <li>Ellipse: EX - EY - HRadius - VRadius | e 20 50 44 54</li>
                
                </ul>
              </div>
            </div>
            {/* <p>Enter Values:</p> */}

            <textarea
              id="svgInput"
              name="textarea"
              style={{ width: 300, height: 100 }}
              onChange={this.myChangeHandler}
            ></textarea>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.inputError}
            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.circleError}
            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.rectangleError}
            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.ellipseError}
            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.polygonError}
            </div>
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.commandName}
            </div>
          </form>
          <button onClick={this.onSubmit} className={this.btnStyle}>
            Draw
          </button>

          {this.inputLength <= 4 ? (
            <div style={this.gridContainer}>
              <div style={this.gridItem}>
                {this.objectToStoreValues.circle.values.length === 4 &&
                  this.state.flag && (
                    <svg height="250" width="250">
                      <circle
                        cx={this.objectToStoreValues.circle.xCoordinat}
                        cy={this.objectToStoreValues.circle.yCoordinat}
                        r={this.objectToStoreValues.circle.radius}
                        style={{
                          stroke: "black",
                          strokeWidth: 3,
                          fill: this.generateRandomColor(),
                        }}
                      />
                    </svg>
                  )}
              </div>
              <div style={this.gridItem}>
                {this.objectToStoreValues.rectangle.values.length === 5 &&
                  this.state.flag && (
                    <svg height="250" width="250">
                      <rect
                        x={this.objectToStoreValues.rectangle.xCoordinat}
                        y={this.objectToStoreValues.rectangle.yCoordinat}
                        width={this.objectToStoreValues.rectangle.rWidth}
                        height={this.objectToStoreValues.rectangle.rHeight}
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
                {this.objectToStoreValues.polygon.values.length === 4 &&
                  this.state.flag && (
                    <svg height="210" width="500">
                      <polygon
                        points={this.objectToStoreValues.polygon.points}
                        style={{
                          fill: this.generateRandomColor(),
                          stroke: "purple",
                          strokeWidth: 1,
                        }}
                      />
                    </svg>
                  )}
              </div>
              <div style={this.gridItem}>
                {this.state.flag &&
                  this.objectToStoreValues.ellipse.values.length === 5 && (
                    <svg height="250" width="250">
                      <ellipse
                        cx={this.objectToStoreValues.ellipse.xCoordinat}
                        cy={this.objectToStoreValues.ellipse.yCoordinat}
                        rx={this.objectToStoreValues.ellipse.horizentalRadius}
                        ry={this.objectToStoreValues.ellipse.verticalRadius}
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
          ) : null}
        </div>
      </div>
    );
  }
}

export default Plotter;
