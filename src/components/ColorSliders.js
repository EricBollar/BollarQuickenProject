import React from "react";
import { useState } from "react";

export const ColorSliders = ({setColor}) => {
    
    // color values
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    // converts rgb inputs to hex string
    function rgbToHex(r, g, b) {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }

    // onChange functions that move slider value and set color
    function changeRed(event) {
        setRed(event.target.value);
        setColor(rgbToHex(red, green, blue));
    }
    function changeGreen(event) {
        setGreen(event.target.value);
        setColor(rgbToHex(red, green, blue));
    }
    function changeBlue(event) {
        setBlue(event.target.value);
        setColor(rgbToHex(red, green, blue));
    }

    // this is not very clean html/css
    // improvement would be to refactor this
    return <>
        <p>Red: {red}</p>
        <input type="range" min="0" max="255" value={red} onChange={changeRed}></input>

        <p>Green: {green}</p>
        <input type="range" min="0" max="255" value={green} onChange={changeGreen}></input>

        <p>Blue: {blue}</p>
        <input type="range" min="0" max="255" value={blue} onChange={changeBlue}></input>

        &nbsp;

        <div style={{width: "20px", height: "20px", backgroundColor: rgbToHex(red, green, blue)}}></div>

        <p>&#9001;-- Current Color</p>
    </>
}