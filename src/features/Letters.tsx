import React from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';

interface LettersProps {
    language: 'en' | 'zh';
}

export const Letters: React.FC<LettersProps> = ({ language }) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const speak = (letter: string) => {
        const utterance = new SpeechSynthesisUtterance(letter.toLowerCase());
        utterance.lang = 'en-US'; // Always use English for English letters
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: 'var(--color-secondary)' }}>
                {language === 'en' ? "ABC Time!" : "ABC 时间!"}
            </h2>
            <Grid>
                {letters.map((letter) => (
                    <Card
                        key={letter}
                        content={letter}
                        color="var(--color-card-bg)"
                        onClick={() => speak(letter)}
                    />
                ))}
            </Grid>
        </div>
    );
};
