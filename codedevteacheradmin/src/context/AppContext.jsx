import React, { createContext, useState } from 'react';
import initialAppContext from './initiateAppContext';

export const AppContext = createContext();

export let setStateApp = null;
export let getStateApp = null;

const AppContextProvider = (props) => {


    const [appState, setAppState] = useState(initialAppContext);

    if (!setStateApp) {
        setStateApp = setAppState;
    }
    if (!getStateApp) {
        getStateApp = appState;
    }


    return (
        <AppContext.Provider
            value={{appState, setAppState}}
        >
            {props.children}
        </AppContext.Provider>
    );
};



export default AppContextProvider;
