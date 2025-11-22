import { useState } from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { playPopSound, playBackSound } from '../utils/sound';

interface AnimalsProps {
    language: 'en' | 'zh';
}

interface AnimalData {
    emoji: string;
    en: string;
    zh: string;
}

const animals: AnimalData[] = [
    { emoji: '🐶', en: 'Dog', zh: '狗' },
    { emoji: '🐱', en: 'Cat', zh: '猫' },
    { emoji: '🦁', en: 'Lion', zh: '狮子' },
    { emoji: '🐯', en: 'Tiger', zh: '老虎' },
    { emoji: '🐘', en: 'Elephant', zh: '大象' },
    { emoji: '🐵', en: 'Monkey', zh: '猴子' },
    { emoji: '🐼', en: 'Panda', zh: '熊猫' },
    { emoji: '🐰', en: 'Rabbit', zh: '兔子' },
    { emoji: '🐷', en: 'Pig', zh: '猪' },
    { emoji: '🐮', en: 'Cow', zh: '牛' },
    { emoji: '🦆', en: 'Duck', zh: '鸭子' },
    { emoji: '🐔', en: 'Chicken', zh: '鸡' },
];

export const Animals: React.FC<AnimalsProps> = ({ language }) => {
    const [selectedAnimal, setSelectedAnimal] = useState<AnimalData | null>(null);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const [imageError, setImageError] = useState(false);

    const handleAnimalClick = (animal: AnimalData) => {
        playPopSound();
        setSelectedAnimal(animal);
        setImageError(false); // Reset error state
        speak(language === 'en' ? animal.en : animal.zh);
    };

    const handleBack = () => {
        playBackSound();
        setSelectedAnimal(null);
        setImageError(false);
    };

    const getAnimalImagePrompt = (animal: string) => {
        const prompts: Record<string, string> = {
            'Dog': 'golden retriever puppy',
            'Cat': 'cute kitten face',
            'Lion': 'lion face close up',
            'Tiger': 'tiger cub face',
            'Elephant': 'baby elephant standing',
            'Monkey': 'cute monkey face',
            'Panda': 'giant panda eating bamboo',
            'Rabbit': 'white bunny rabbit',
            'Pig': 'cute piglet',
            'Cow': 'cute cow face',
            'Duck': 'yellow duckling swimming',
            'Chicken': 'cute baby chick'
        };
        return prompts[animal] || `cute ${animal}`;
    };

    if (selectedAnimal) {
        return (
            <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
                <Button
                    onClick={handleBack}
                    variant="outline"
                    size="small"
                    style={{ position: 'absolute', top: '20px', left: '20px' }}
                >
                    {language === 'en' ? '← Back' : '← 返回'}
                </Button>
                
                <div 
                    className="animate-pop"
                    onClick={() => speak(language === 'en' ? selectedAnimal.en : selectedAnimal.zh)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                    {!imageError ? (
                        <img 
                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(getAnimalImagePrompt(selectedAnimal.en))}?width=400&height=400&nologo=true&seed=${selectedAnimal.en}`} 
                            alt={selectedAnimal.en}
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
                            {selectedAnimal.emoji}
                        </div>
                    )}
                    <h2 style={{ fontSize: '4rem', color: '#FF9F43', margin: 0 }}>
                        {language === 'en' ? selectedAnimal.en : selectedAnimal.zh}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: '#FF9F43' }}>
                {language === 'en' ? "Animals!" : "动物世界!"}
            </h2>
            <Grid>
                {animals.map((animal) => (
                    <Card
                        key={animal.en}
                        content={animal.emoji}
                        color="var(--color-card-bg)"
                        onClick={() => handleAnimalClick(animal)}
                    />
                ))}
            </Grid>
        </div>
    );
};
