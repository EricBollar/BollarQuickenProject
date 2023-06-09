import React, { useEffect, useRef, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard';
import styles from '../styles.js';
import { ColorSliders } from './ColorSliders';

// local turtlegame attributes used for calculations
const localTurtle = {
    x: 360, // coordinates
    y: 200,
    angle: 0, // angle in degrees
    moving: false, // isMovingForward?
    turningLeft: false, // isTurning?
    turningRight: false,
    color: '#000000', // pen color
    penDown: false, // isDrawingLine?
    drawingStar: false, // isDrawingStar?
    canvasWidth: 0, // canvas dimensions
    canvasHeight: 0,
}

// TurtleGame class which handles the drawing and calculations of Turtle
// Improvement here would be separating Canvas and Turtle into two separate
// classes. It would make the code much cleaner

const TurtleGame = ({width, height}) => {

    // this allows access to the graphics context
    const canvasRef = useRef(null);

    // stored turtle attributes
    const [x, setX] = useState(localTurtle.x);
    const [y, setY] = useState(localTurtle.y);
    const [angle, setAngle] = useState(localTurtle.angle);

    // grab deconstructed list of actions from keyboard listener
    const {KeyW, KeyA, KeyD, Space, Digit1} = useKeyboard();

    // updates local color
    const setColor = (color) => {
        localTurtle.color = color;
    }

    // update local canvasHeight when props change
    useEffect(() => {
        localTurtle.canvasHeight = height;
    }, [height])

    // update local canvasWidth when props change
    useEffect(() => {
        localTurtle.canvasWidth = width;
    }, [width])

    // update moving when KeyW key changes
    useEffect(() => {
        localTurtle.moving = KeyW;
    }, [KeyW])

    // update turningLeft when KeyA key changes
    useEffect(() => {
        localTurtle.turningLeft = KeyA;
    }, [KeyA])

    // update turningRight when KeyD key changes
    useEffect(() => {
        localTurtle.turningRight = KeyD;
    }, [KeyD])

    // update penDown when Space key changes
    useEffect(() => {
        localTurtle.penDown = Space;
    }, [Space])

    // update drawStar when 1 key changes
    useEffect(() => {
        localTurtle.drawingStar = Digit1;
    }, [Digit1])

    function updateRotation() {
        // if turning, update the turtle's angle
        // this is really turning distance, the speed is dependent on how fast each frame renders
        const rotationSpeed = 0.01;
        let updatedAngle = localTurtle.angle
            - (localTurtle.turningLeft ? rotationSpeed : 0)
            + (localTurtle.turningRight ? rotationSpeed : 0);

        // want to restrict angle between 0 and 360 degrees
        while (updatedAngle > 360) {
            updatedAngle -= 360;
        }
        while (updatedAngle < 0) {
            updatedAngle += 360
        }
        // update local
        localTurtle.angle = updatedAngle;

        // call hook
        setAngle(localTurtle.angle);
    }

    function updatePosition() {
        // if moving forward, update the turtle's position based on it's local forward direction
        // this is really movement distance (similar to rotation), the speed is dependent on how fast each frame renders
        // so it is likely the case that when drawing, the turtle moves slower (rendering takes more processing)
        // this is not the best way to do it, but for time's sake i will leave it like this
        // improvement here would be separating the thread for movement and rendering
        const movementSpeed = .005; 

        // move the turtle forwards relative to it's direction
        let updatedPositionX = Math.cos(localTurtle.angle * Math.PI / 180 + Math.PI / 2) * movementSpeed + localTurtle.x;
        let updatedPositionY = Math.sin(localTurtle.angle * Math.PI / 180 + Math.PI / 2) * movementSpeed + localTurtle.y;

        // keeps the turtle within the bounds of the canvas, I set this edgeGap arbitrarily
        // it's a bit finniky because the turtle's position is not the center of the triangle
        // improvement here would involve re-aligning the center of turtle
        const edgeGap = 5;
        if (updatedPositionX > localTurtle.canvasWidth - edgeGap) {
            updatedPositionX = edgeGap;
        } else if (updatedPositionX < edgeGap) {
            updatedPositionX = localTurtle.canvasWidth - edgeGap;
        }
        if (updatedPositionY > localTurtle.canvasHeight - edgeGap) {
            updatedPositionY = edgeGap;
        } else if (updatedPositionY < edgeGap) {
            updatedPositionY = localTurtle.canvasHeight - edgeGap;
        }
        
        // if drawing, draw! can only draw forward if moving
        if (localTurtle.penDown) {
            drawForward(movementSpeed);
        }

        // update position
        localTurtle.x = updatedPositionX;
        localTurtle.y = updatedPositionY;

        // call hooks
        setX(localTurtle.x);
        setY(localTurtle.y);
    }

    // game loop
    setInterval(() => {
        if (localTurtle.moving) {
            updatePosition();
        }
        updateRotation();

        if (localTurtle.drawingStar) {
            drawStar();
        }
    }, 50);

    // draws a line of given length from turtle in forward direction
    function drawForward(length) {
        // get canvas context
        const canvas = canvasRef.current;
        if (!canvas) { return };
        const ctx = canvas.getContext('2d');
        if (!ctx) { return };

        // draw the line
        const angleInRadians = (localTurtle.angle * Math.PI) / 180;
        let x1 = localTurtle.x + length * Math.sin(angleInRadians);
        let y1 = localTurtle.y + length * Math.cos(angleInRadians);
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = localTurtle.color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(localTurtle.x, localTurtle.y);
        ctx.stroke();

        // return the endpoints (helpful in drawStar)
        // this is a bit hacky and could be cleaned up
        // improvement would be to separate drawing functions from turtlegame entirely
        return {x1, y1};
    }

    // draw a star at turtle's position
    function drawStar() {
        var i;
        for (i = 0; i < 18; i++) {
            localTurtle.angle -= 100;

            // grab endpoints of drawForward and re-assign turtle's position
            const {x1, y1} = drawForward(80);
            if (x1 && y1) {
                localTurtle.x = x1;
                localTurtle.y = y1;
            }
        }
    };

    // clears the canvas and resets turtle position
    function resetCanvas() {
        // get canvas context
        const canvas = canvasRef.current;
        if (!canvas) { return };
        const ctx = canvas.getContext('2d');
        if (!ctx) { return };

        ctx.clearRect(0, 0, width, height);

        // update local
        localTurtle.x = 360;
        localTurtle.y = 200;

        // call hooks
        setX(localTurtle.x);
        setY(localTurtle.y);
    }
    
    // return the canvas element and reset button
    return <>
        <div style={styles.row}>
            <button style={styles.button} onClick={resetCanvas}>
                Reset Canvas
            </button>

            <ColorSliders setColor={setColor}/>
        </div>
            
        <div style={{...styles.canvasWrapper, width: width + 2, height: height + 2 }}>
            <div
                style={{
                    ...styles.turtle,
                    left: x,
                    top: y,
                    transform: `rotate(${angle}DEG)`,
                }}
            />
            <canvas width={width + 2} height={height+2}  ref={canvasRef}/>
        </div>
    </>
}

export default TurtleGame;