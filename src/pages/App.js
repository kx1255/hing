import React from 'react';
import NavBar from './NavBar';
import Index from './index';
import RandomColors from './RandomColors';

const App = () => {
    // Get the current URL path
    const currentPath = window.location.pathname;

    let content;
    switch (currentPath) {
        case '/':
            content =     <><RandomColors /><Index /></>;
            break;
        default:
            content = <Index />;
    }

    return (
        <>
            <NavBar />
            <div>{content}</div>
        </>
    );
};

export default App;