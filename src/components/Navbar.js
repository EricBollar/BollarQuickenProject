import React from "react";
import styles from '../styles.js';

export const Navbar = ({size, sizeEnum, changeCanvasSize}) => {

    // this is practically the same as the template navbar
    return <div style={styles.header}>
        <h1 style={styles.ellipseText}>
            Eric Bollar Quicken Project
        </h1>
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