import React from "react";
import styles from '../styles.js';
import { useNavigate } from "react-router-dom";

export const Navbar = ({size, sizeEnum, changeCanvasSize}) => {

    // navigation functions
    const navigate = useNavigate(); 
    const redirectToOtherPage = () => { 
        navigate("/otherpage");
    }
    const redirectToHome = () => {
        navigate("/");
    }
    const redirectToMySite = () => {
        window.open("https://www.ericbollar.com");
    }

    return <div style={styles.header}>
        <h1 style={styles.ellipseText}>
            Eric Bollar Quicken Project
        </h1>

        {/* navigation buttons */}
        <div style={styles.row}>
            <button style={styles.button} onClick={redirectToHome}>Project Page</button>
            <button style={styles.button} onClick={redirectToOtherPage}>Other Page</button>
            <button style={styles.button} onClick={redirectToMySite}>EricBollar.com</button>
        </div>

        <div style={styles.stack}>
            <h4>
                Canvas Size:
            </h4>

            <div style={styles.row}>
                {Object.keys(sizeEnum).map((key) =>
                    <button key={key} onClick={() => {changeCanvasSize(key)}}
                    style={{
                        ...styles.button,
                        backgroundColor: key === size && '#C9C7C5',
                        cursor: key !== size && 'pointer',
                    }}>
                        {key}
                    </button>
                )}
            </div>
        </div>
    </div>
}