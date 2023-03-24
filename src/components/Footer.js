import React from "react";
import styles from '../styles.js';

export const Footer = ({width}) => {
    return <>
        <h4 style={{ margin: 0 }}>
            Welcome to Turtle!
        </h4>
        <h5 style={{width: width}}>This is Turtle. You can move turtle forward by pressing 'W'. 
            You can turn him left or right by pressing 'A' or 'D' respectively.
            If you want him to draw while moving, you can hold 'SPACE'. If you want 
            him to draw a star, hold '1'. <br/> You can also change the size of the canvas
            by selecting a button in the top-right. Note that if you change the size, the 
            canvas will be reset. </h5>
    </>
};