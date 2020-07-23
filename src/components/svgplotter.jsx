import React, { Component } from "react";

class Plotter extends Component {
  //   state = {
  //     count: 0,
  // tags: [],
  /*imageUrl: 'https://picsum.photos/200'*/
  //   };
  constructor() {
    //   Counter is a child class as we doing inheritance here, it is extending Component class. So, before calling the
    //   constructor of child class we have to call the constructor of parent class and we do that by calling super().
    super();
    //   console.log("Constructor", this);
    // Functions in javascript are objects, So they can have properties and methods, bind() is one of them.
    // and with bind we can set the value of this. bind() method will return the new instance of count increment function
    // and in that function this will be refering to the current object.
    // So, it will return a new function and we will be setting it to the countIncrement function.
    this.countIncrement = this.countIncrement.bind(this);
    this.state = { input: "", count: 0, flag: false };
    this.onSubmit = this.onSubmit.bind(this);
    this.drawCicle = this.drawCicle.bind(this);
  }
  // its good practice to make class for styling keeping in the view
  // maintainbility and performance but sometimes we may want to break the rules so,
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

  renderTags() {
    /*
        Unlike angular we don't have if/else condition because its not 
        a templating engine. So, to render elements conditionally we need to go back to 
        plain old javascript.
    */
    //   if Array is empty then it will render "there is no tags."
    if (this.state.tags.length === 0) return <p>There are no Tags!</p>;

    // otherwise this will get render.
    return (
      <ul>
        {/* Iterators we use in javascript are Map(ES6), ForEach, For-of, among them Map is best to use.
            To ensure that each HTML element in the React DOM has a unique 
            identifier, you’re required to provide each rendered element with, well, a unique key.
            You do this by providing a key attribute on the HTML element that 
            you are rendering inside of the Map function. */}
        {this.state.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    );
  }
  generateRandomColor() {
      let color = Math.floor(Math.random()*16777215).toString(16);
      return "#" + color;
  }

  onSubmit(e) {
    e.preventDefault();
    // this.state.input = this.title;
    let text = document.getElementById("svgInput");
    this.isPolygon = false;
    this.isEllipse = false;
    this.setState({ flag: false });
    let values = text.value.replace(/\r\n/g, "\n").split("\n");
    let check = values.toString();
    check.split("");
    console.log(this.state.input);
    console.log(values);
    // console.log(check.split(' '));
    // console.log(this.arrayToStoreValues);
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
    // if(this.arrayToStoreValues[0] === 'c') {
    //     this.xCoordinat = parseInt(this.arrayToStoreValues.circle[1]);
    //     this.yCoordinat = parseInt(this.arrayToStoreValues.circle[2]);
    //     this.radius = parseInt(this.arrayToStoreValues.circle[3]);
    //     this.setState({flag:true});
    // }
  }
  myChangeHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  render() {
    let polygon = this.isPolygon;
    let ellipse = this.isEllipse;
    return (
      <div>
        {/* <React.Fragment> use this tag if you want to render something without using any tag */}
        {/* <img src={this.state.imageUrl} alt=""/ > */}
        {/* <span style={this.styles} className="badge badge-primary m-2">{this.state.count } </span> */}
        {/* for inline styling style={{ fontSize: 20}} */}
        {/*<span className="badge badge-primary m-2">{this.state.count } </span> */}

        {/* 
            Imagine just before rendering the rnederTags method we want to render another
            method based on the condition and we have simple IF statement without and else part.
            So, this is how we will be achieving this in React 
          */}
        {/* 
            How this is actually works, in javascript unlike other programming languages we can apply 
            logical (&&) and operator between non-boolean values.
            Examples, Plain javascript.
            ----->: true && false
            result: flase

            what will be the result?
            ----->: true && 'Hi'
            result: Hi
            Reason: When javascript tries to eveluate this expression, it will look at the first operand 
                    and in this case its true so it will look at the second operand and Its a string and not empty (string which have atleast one character always return true)
                    so it will also give us true. Essentially we have two operands, which are truthy.
                    In that case Javascript engine return the second operand, that's why we get the 'Hi'
            
            ----->: true && 'Hi' && 1
            result: Hi
            Reason: All three operands are true, if number is not 0 then it will always be true. So, the result is the last operand, we will get 1. 

            Ps: First will be the logical condition and then it could be any jsx express.
          */}
        {/* { this.state.tags.length === 0 && 'Please create a new tag!'}
          {this.renderTags()} */}

        {/* <span className={this.getBadgeClasses()}>{this.formatCount()} </span> */}

        {/* 
            Note that, we are not calling the method, we are simply passing refrence to it.
            this is different from handling onclick in Vanila Javascript, in vanila JS we call
            the target function, when setting the onclick.
        */}
        {/* <button
          onClick={this.countIncrement}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button> */}

        <div style={{ margin: 20, textAlign: "center" }}>
          <form>
            <h1>SVG Plotter</h1>
            <p>Enter Values:</p>
            {/* <input type="text" onChange={this.myChangeHandler} /> */}
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
              {/* { this.button? <span>{this.drawCicle}</span>:null} */}
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
          {/* <span>
            { this.arrayToStoreValues.length === 5 && this.state.flag && }
        </span> */}
          {/* <svg height="250" width="250">
            {this.arrayToStoreValues.map((item,index)=>{
                return(
                    <circle
            cx={item[]}
            cy="30"
            r="20"
            stroke="black"
            stroke-width="3"
            fill="red"
          />
                )
            })}
          
        </svg> */}
        </div>
      </div>
    );
  }
  drawCicle() {
    return (
      <div>
        <svg height="250" width="250">
          {this.arrayToStoreValues.circle.values.length > 0 &&
            this.state.flag && (
              <circle
                cx={this.arrayToStoreValues.circle.xCoordinat}
                cy={this.arrayToStoreValues.circle.yCoordinat}
                r={this.arrayToStoreValues.circle.radius}
                style={{ stroke: "black", strokeWidth: 3, fill: "red" }}
              />
            )}
        </svg>
      </div>
    );
  }

  countIncrement() {}
  getBadgeClasses() {
    // Using a let variable instead of const because we cannot change the state of const variable
    // but we can change the field of const object e.g
    // const obj={ name:'Ali'};
    // obj.name="Numan";

    // Rendering class properties dynamically
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? "Zero" : count;
  }
}

export default Plotter;
