import React from 'react';

interface CardProps {
    content: string | number;
    onClick?: () => void;
    color?: string;
}

export const Card: React.FC<CardProps> = ({ content, onClick, color = 'var(--color-card-bg)' }) => {
    return (
        <div
            onClick={onClick}
            style={{ backgroundColor: color }}
            className="card animate-pop"
        >
            {content}
        </div>
    );
};
