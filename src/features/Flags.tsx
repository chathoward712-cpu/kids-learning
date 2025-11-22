import { useState } from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { playPopSound, playBackSound } from '../utils/sound';

interface FlagsProps {
    language: 'en' | 'zh';
}

interface FlagData {
    code: string; // ISO 3166-1 alpha-2 code for flagcdn
    emoji: string;
    en: string;
    zh: string;
}

const flags: FlagData[] = [
    { code: 'cn', emoji: '🇨🇳', en: 'China', zh: '中国' },
    { code: 'us', emoji: '🇺🇸', en: 'USA', zh: '美国' },
    { code: 'gb', emoji: '🇬🇧', en: 'UK', zh: '英国' },
    { code: 'jp', emoji: '🇯🇵', en: 'Japan', zh: '日本' },
    { code: 'fr', emoji: '🇫🇷', en: 'France', zh: '法国' },
    { code: 'de', emoji: '🇩🇪', en: 'Germany', zh: '德国' },
    { code: 'it', emoji: '🇮🇹', en: 'Italy', zh: '意大利' },
    { code: 'ru', emoji: '🇷🇺', en: 'Russia', zh: '俄罗斯' },
    { code: 'kr', emoji: '🇰🇷', en: 'South Korea', zh: '韩国' },
    { code: 'es', emoji: '🇪🇸', en: 'Spain', zh: '西班牙' },
    { code: 'br', emoji: '🇧🇷', en: 'Brazil', zh: '巴西' },
    { code: 'ca', emoji: '🇨🇦', en: 'Canada', zh: '加拿大' },
];

export const Flags: React.FC<FlagsProps> = ({ language }) => {
    const [selectedFlag, setSelectedFlag] = useState<FlagData | null>(null);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleFlagClick = (flag: FlagData) => {
        playPopSound();
        setSelectedFlag(flag);
        speak(language === 'en' ? flag.en : flag.zh);
    };

    const handleBack = () => {
        playBackSound();
        setSelectedFlag(null);
    };

    if (selectedFlag) {
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
                    onClick={() => speak(language === 'en' ? selectedFlag.en : selectedFlag.zh)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                    <img 
                        src={`https://flagcdn.com/w320/${selectedFlag.code}.png`} 
                        alt={selectedFlag.en}
                        style={{ 
                            borderRadius: '10px', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            width: '320px',
                            height: 'auto',
                            marginBottom: '20px',
                            backgroundColor: '#eee'
                        }}
                    />
                    <h2 style={{ fontSize: '4rem', color: '#4ECDC4', margin: 0 }}>
                        {language === 'en' ? selectedFlag.en : selectedFlag.zh}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: '#4ECDC4' }}>
                {language === 'en' ? "Flags!" : "国旗!"}
            </h2>
            <Grid>
                {flags.map((flag) => (
                    <Card
                        key={flag.code}
                        content={flag.emoji}
                        color="var(--color-card-bg)"
                        onClick={() => handleFlagClick(flag)}
                    />
                ))}
            </Grid>
        </div>
    );
};
