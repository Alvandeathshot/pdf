
import React from 'react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <header>Header</header>
            <main>{children}</main>
            <footer>Footer</footer>
        </div>
    );
};

export default MainLayout;
