import React from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';

interface NumbersProps {
    language: 'en' | 'zh';
}

export const Numbers: React.FC<NumbersProps> = ({ language }) => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);

    const speak = (num: number) => {
        const utterance = new SpeechSynthesisUtterance(num.toString());
        utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: 'var(--color-primary)' }}>
                {language === 'en' ? "Let's Count!" : "一起数数!"}
            </h2>
            <Grid>
                {numbers.map((num) => (
                    <Card
                        key={num}
                        content={num}
                        color="var(--color-card-bg)"
                        onClick={() => speak(num)}
                    />
                ))}
            </Grid>
        </div>
    );
};
