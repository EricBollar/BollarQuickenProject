// uses built-in react state to store actions
import { useCallback, useEffect, useState } from "react"

// defines which keys relate to which actions
function actionByKey(key) {
    const keyActionMap = {
        KeyW: 'KeyW',
        KeyA: 'KeyA',
        KeyD: 'KeyD',
        Space: 'Space',
        Digit1: 'Digit1',
    }
    return keyActionMap[key];
}

export const useKeyboard = () => {
    // set "keydown" variables that can use elsewhere
    const[actions, setActions] = useState({
        KeyW: false,
        KeyA: false,
        KeyD: false,
        Space: false,
        Digit1: false,
    })

    // if key is pressed, set its action to true
    const handleKeyDown = useCallback((e) => {
        const action = actionByKey(e.code);
        if (action) {
            setActions((prev) => {
                return({
                    ...prev,
                    [action]: true
                })
            })
        }
    }, [])

    // if key is released, set its action to false
    const handleKeyUp = useCallback((e) => {
        const action = actionByKey(e.code);
        if (action) {
            setActions((prev) => {
                return({
                    ...prev,
                    [action]: false
                })
            })
        }
    }, [])

    // add eventlisteners on the page that use the above functions
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [handleKeyDown, handleKeyUp])

    // export those action variables that were defined earlier
    return actions
}