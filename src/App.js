import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from "./styles";
import TurtleGame from "./components/TurtleGame";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer"

// having an App function makes it easier to segment different parts of the site

const sizeEnum = {
    small: [800, 480],
    medium: [1024, 576],
    large: [1280, 720],
    'absolute unit': [1920, 1080],
};

export default function App() {

    // width and height of canvas
    const [width, setWidth] = useState(sizeEnum["small"][0]);
    const [height, setHeight] = useState(sizeEnum["small"][1]);

    // size string
    const [size, setSize] = useState("small");

    // re-adjust size of canvas
    const changeCanvasSize = (s) => {
        setWidth(sizeEnum[s][0]);
        setHeight(sizeEnum[s][1]);
        setSize(s);
    }

    return <>
        <BrowserRouter>
            <div style={styles.root}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Navbar size={size} sizeEnum={sizeEnum} changeCanvasSize={changeCanvasSize}/>

                            <div style={styles.column}>
                                <TurtleGame width={width} height={height} />

                                <Footer width={width} />
                            </div>
                        </>
                    }></Route>
                    <Route path="/otherpage" element={
                        <>
                            <Navbar size={size} sizeEnum={sizeEnum} changeCanvasSize={changeCanvasSize}/>

                            <h1>This is another page.</h1>
                        </>
                    }></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
}