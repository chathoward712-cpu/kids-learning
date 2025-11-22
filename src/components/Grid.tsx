import React from 'react';

interface GridProps {
    children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children }) => {
    return (
        <div className="grid-container">
            {children}
        </div>
    );
};
