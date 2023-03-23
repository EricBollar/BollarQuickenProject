import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useFrame, useThree } from "@react-three/fiber"
import styles from './styles.js';

// use our keyboard listener
import { useKeyboard } from './hooks/useKeyboard';

const sizeEnum = {
    small: [800, 480],
    medium: [1024, 576],
    large: [1280, 720],
    'absolute unit': [1920, 1080],
};

const turtle = {
    x: 360,
    y: 200,
    angle: 0,
    penDown: true,
    penColor: '#000000',
    lineWidth: 2
};
const moveArray = ['shiftLeft', 'shiftRight', 'shiftUp', 'shiftDown'];

function ReactRoot() {
    // grab deconstructed list of actions from keyboard listener
    const {moveForward, turnLeft, turnRight, penIsDown, drawingStar} = useKeyboard();

    const [size, setSize] = useState('small');
    const width = sizeEnum[size][0];
    const height = sizeEnum[size][1];

    // if turning, update the turtle's angle
    const rotationSpeed = 0.05;
    let updatedAngle = turtle.angle - (turnLeft ? rotationSpeed : 0) + (turnRight ? rotationSpeed : 0);
    // want to restrict angle between 0 and 360 
    while (updatedAngle > 360) {
        updatedAngle -= 360;
    }
    while (updatedAngle < 0) {
        updatedAngle += 360
    }
    turtle.angle = updatedAngle;

    // if moving forward, update the turtle's position based on it's local forward direction
    const movementSpeed = 0.01; 
        // this is really movement distance, the speed is dependent on how fast each frame renders
        // so it is likely the case that when drawing, the turtle moves slower (rendering takes more processing)
        // this is not the best way to do it, but for time's sake i will leave it like this
        // improvement here would be separating the thread for movement and rendering
    const updatedPositionX = Math.cos(turtle.angle * Math.PI / 180 + Math.PI / 2) * movementSpeed + turtle.x;
    const updatedPositionY = Math.sin(turtle.angle * Math.PI / 180 + Math.PI / 2) * movementSpeed + turtle.y;
    if (moveForward) {
        // if drawing, draw! don't want to be drawing pen and star at same time, so prioritize penIsDown
        if (penIsDown) {
            turtle.forward(movementSpeed);
        } else if (drawingStar) {
            turtle.drawStar();
        }
        turtle.x = updatedPositionX;
        turtle.y = updatedPositionY;
    } else if (drawingStar) {
        turtle.drawStar();
    }

    // keeps the turtle within the bounds of the canvas, I set this edgeGap arbitrarily
    // it's a bit finniky because the turtle's position is not the center of the triangle
    // improvement here would involve re-aligning the center of turtle
    const edgeGap = 8;
    if (turtle.x > width - edgeGap) {
        turtle.x = edgeGap;
    } else if (turtle.x < edgeGap) {
        turtle.x = width - edgeGap;
    }
    if (turtle.y > height - edgeGap) {
        turtle.y = edgeGap;
    } else if (turtle.y < edgeGap) {
        turtle.y = height - edgeGap;
    }

    // turtle position
    const [x, setX] = useState(turtle.x);
    const [y, setY] = useState(turtle.y);
    const [angle, setAngle] = useState(turtle.angle);

    setInterval(() => {
        setX(turtle.x);
        setY(turtle.y);
        setAngle(turtle.angle);
    }, 50);

    return (
        <div style={styles.root}>
            <div style={styles.header}>
                <h1 style={styles.ellipseText}>
                    Eric Bollar Quicken Project
                </h1>
                {/* <div style={styles.stack}>
                    <h4>
                        Canvas Size:
                    </h4>
                    <div style={styles.row}>
                        {Object.keys(sizeEnum).map((key) =>
                            <button
                                key={key}
                                onClick={() => {setSize(key)}}
                                style={{
                                    ...styles.button,
                                    backgroundColor: key === size && '#C9C7C5',
                                    cursor: key !== size && 'pointer',
                                }}
                            >
                                {key}
                            </button>
                        )}
                    </div>
                </div> */}
            </div>
            <div style={styles.column}>
                <button
                    onClick={clearCanvas}
                    style={styles.button}
                >
                    Reset Canvas
                </button>
                <div style={{...styles.canvasWrapper, width: width + 2, height: height + 2 }}>
                    <div
                        style={{
                            ...styles.turtle,
                            left: x,
                            top: y,
                            transform: `rotate(${angle}DEG)`,
                        }}
                    />
                    <canvas
                        id="myDrawing"
                        width={width}
                        height={height}
                    />
                </div>
                {/* <h4 style={{ margin: 0 }}>
                    TURTLE FUNCTIONS
                </h4> */}

                <div style={{ ...styles.row, ...styles.spacer}}>
                    {/* {moveArray.map((key) =>
                        <button
                            key={key}
                            onClick={() => turtle[key]()}
                            style={styles.button}
                        >
                            {key}
                        </button>
                    )} */}
                    
                <p>Thanks for viewing my project! This is Turtle. You can move Turtle forward with 'W' and turn him with 'A' and 'D'.
                    You can draw lines while moving by holding SPACE or by pressing '1', in which case Turtle will draw a star!
                </p>
                </div>

                <div style={{ ...styles.row, maxWidth: width - 48 }}>
                    {/* <button
                        onClick={() => turtle.hexagon()}
                        style={styles.blueButton}
                    >
                        Hexagon
                    </button> */}
                    {/* <button
                        onClick={() => turtle.drawStar()}
                        style={styles.blueButton}
                    >
                        Star
                    </button> */}
                    {/*
                    // ================================================================================
                    //                      Maybe things should go here?
                    // ================================================================================
                    */}
                    {/* <button
                        onClick={() => console.log('yo')}
                        style={styles.blueButton}
                    >
                        Custom ???
                    </button> */}
                </div>
            </div>
        </div>
    );
}
// react insertion
const wrapper = document.getElementById("react-entry");
wrapper ? ReactDOM.render(<ReactRoot />, wrapper) : false;




// =====================================================================================
//                                  GRAPHICS
// =====================================================================================


// canvas preparation
const canvas = document.getElementById('myDrawing');

if (canvas && canvas.getContext) { // does the browser support 'canvas'?
    turtle.ct = canvas.getContext("2d"); // get drawing context
} else {
    alert('You need a browser which supports the HTML5 canvas!');
}

function clearCanvas () {
    if (canvas && canvas.getContext) {
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        turtle.x = 360;
        turtle.y = 200;
    }
}


//      Turtle functions
// =======================================================
turtle.logPenStatus = function () {
    console.log('x=' + this.x + "; y=" + this.y + '; angle = ' + this.angle + '; penDown = ' + this.penDown);
};

// reposition turtle
turtle.shiftLeft = function (length=50) {
    turtle.x -= length;
};
turtle.shiftRight = function (length=50) {
    turtle.x += length;
};
turtle.shiftUp = function (length=50) {
    turtle.y -= length;
};
turtle.shiftDown = function (length=50) {
    turtle.y += length;
};

// draw in a direction
turtle.forward = function (length) {
    // this.logPenStatus();
    var x0 = this.x,
        y0 = this.y;
    const angleInRadians = (this.angle * Math.PI) / 180;
    this.x += length * Math.sin(angleInRadians);
    this.y += length * Math.cos(angleInRadians);
    if (this.ct) {
        if (this.penDown) {
            //this.logPenStatus();
            this.ct.beginPath();
            this.ct.lineWidth = this.lineWidth;
            this.ct.strokeStyle = this.penColor;
            this.ct.moveTo(x0, y0);
            this.ct.lineTo(this.x, this.y);
            this.ct.stroke();
        }
    } else {
        this.ct.moveTo(this.x, this.y);
    }
    return this;
};
turtle.backward = function (length) {
    this.forward(-length);
    return this;
};

// turning
turtle.left = function (angle) {
    this.angle += angle;
    return this;
};
turtle.right = function (angle) {
    this.left(-angle);
    return this;
};


// ===============================================================
//                      Pattern Functions
// ===============================================================

turtle.hexagon = function (length=50) {
    console.log('length', length);
    var i;
    for (i = 1; i <= 6; i++) {
        turtle.forward(length);
        turtle.left(60);

    }
};

turtle.drawStar = function () {
    var i;
    for (i = 0; i < 18; i++) {
        turtle.left(100);
        turtle.forward(80);
    }
};



//  Oh Wow Look at this space
// =======================================================









