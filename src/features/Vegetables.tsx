import { useState } from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { playPopSound, playBackSound } from '../utils/sound';

interface VegetablesProps {
    language: 'en' | 'zh';
}

interface VegetableData {
    emoji: string;
    en: string;
    zh: string;
}

const vegetables: VegetableData[] = [
    { emoji: '🍅', en: 'Tomato', zh: '番茄' },
    { emoji: '🥕', en: 'Carrot', zh: '胡萝卜' },
    { emoji: '🥦', en: 'Broccoli', zh: '西兰花' },
    { emoji: '🌽', en: 'Corn', zh: '玉米' },
    { emoji: '🥔', en: 'Potato', zh: '土豆' },
    { emoji: '🍆', en: 'Eggplant', zh: '茄子' },
    { emoji: '🥒', en: 'Cucumber', zh: '黄瓜' },
    { emoji: '🍄', en: 'Mushroom', zh: '蘑菇' },
    { emoji: '🧅', en: 'Onion', zh: '洋葱' },
    { emoji: '🧄', en: 'Garlic', zh: '大蒜' },
    { emoji: '🌶️', en: 'Pepper', zh: '辣椒' },
    { emoji: '🎃', en: 'Pumpkin', zh: '南瓜' },
];

export const Vegetables: React.FC<VegetablesProps> = ({ language }) => {
    const [selectedVegetable, setSelectedVegetable] = useState<VegetableData | null>(null);
    const [imageError, setImageError] = useState(false);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleVegetableClick = (vegetable: VegetableData) => {
        playPopSound();
        setSelectedVegetable(vegetable);
        setImageError(false);
        speak(language === 'en' ? vegetable.en : vegetable.zh);
    };

    const handleBack = () => {
        playBackSound();
        setSelectedVegetable(null);
        setImageError(false);
    };

    const getImagePrompt = (name: string) => {
        return `fresh ${name.toLowerCase()} white background`;
    };

    if (selectedVegetable) {
        return (
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <Button
                    onClick={handleBack}
                    variant="outline"
                    size="small"
                    style={{ position: 'absolute', top: '20px', left: '20px', color: 'white', borderColor: 'white' }}
                >
                    {language === 'en' ? '← Back' : '← 返回'}
                </Button>
                
                <div 
                    className="animate-pop"
                    onClick={() => speak(language === 'en' ? selectedVegetable.en : selectedVegetable.zh)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                    {!imageError ? (
                        <img 
                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(getImagePrompt(selectedVegetable.en))}?width=400&height=400&nologo=true&seed=${selectedVegetable.en}`} 
                            alt={selectedVegetable.en}
                            onError={() => setImageError(true)}
                            style={{ 
                                borderRadius: '20px', 
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                width: '300px',
                                height: '300px',
                                objectFit: 'cover',
                                marginBottom: '20px',
                                backgroundColor: '#eee'
                            }}
                        />
                    ) : (
                        <div style={{ 
                            fontSize: '150px', 
                            lineHeight: '300px',
                            width: '300px', 
                            height: '300px', 
                            marginBottom: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'white',
                            borderRadius: '20px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                        }}>
                            {selectedVegetable.emoji}
                        </div>
                    )}
                    <h2 style={{ fontSize: '4rem', color: '#6AB04C', margin: 0 }}>
                        {language === 'en' ? selectedVegetable.en : selectedVegetable.zh}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: '#6AB04C' }}>
                {language === 'en' ? "Vegetables!" : "蔬菜园!"}
            </h2>
            <Grid>
                {vegetables.map((veg) => (
                    <Card
                        key={veg.en}
                        content={veg.emoji}
                        color="var(--color-card-bg)"
                        onClick={() => handleVegetableClick(veg)}
                    />
                ))}
            </Grid>
        </div>
    );
};
