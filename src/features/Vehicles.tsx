import { useState } from 'react';
import { Card } from '../components/Card';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { playPopSound, playBackSound } from '../utils/sound';

interface VehiclesProps {
    language: 'en' | 'zh';
}

interface VehicleData {
    emoji: string;
    en: string;
    zh: string;
}

const vehicles: VehicleData[] = [
    { emoji: '🚗', en: 'Car', zh: '汽车' },
    { emoji: '🚌', en: 'Bus', zh: '公交车' },
    { emoji: '🚂', en: 'Train', zh: '火车' },
    { emoji: '✈️', en: 'Airplane', zh: '飞机' },
    { emoji: '🚢', en: 'Ship', zh: '轮船' },
    { emoji: '🚲', en: 'Bicycle', zh: '自行车' },
    { emoji: '🏍️', en: 'Motorcycle', zh: '摩托车' },
    { emoji: '🚚', en: 'Truck', zh: '卡车' },
    { emoji: '🚓', en: 'Police Car', zh: '警车' },
    { emoji: '🚑', en: 'Ambulance', zh: '救护车' },
    { emoji: '🚒', en: 'Fire Engine', zh: '消防车' },
    { emoji: '🚀', en: 'Rocket', zh: '火箭' },
];

export const Vehicles: React.FC<VehiclesProps> = ({ language }) => {
    const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(null);
    const [imageError, setImageError] = useState(false);

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const handleVehicleClick = (vehicle: VehicleData) => {
        playPopSound();
        setSelectedVehicle(vehicle);
        setImageError(false);
        speak(language === 'en' ? vehicle.en : vehicle.zh);
    };

    const handleBack = () => {
        playBackSound();
        setSelectedVehicle(null);
        setImageError(false);
    };

    const getImagePrompt = (name: string) => {
        const prompts: Record<string, string> = {
            'Car': 'red sports car on road',
            'Bus': 'yellow school bus',
            'Train': 'modern high speed train',
            'Airplane': 'passenger airplane flying in blue sky',
            'Ship': 'large cruise ship on ocean',
            'Bicycle': 'colorful bicycle in park',
            'Motorcycle': 'cool motorcycle',
            'Truck': 'big transport truck',
            'Police Car': 'police car with lights',
            'Ambulance': 'ambulance vehicle',
            'Fire Engine': 'red fire truck',
            'Rocket': 'space rocket launching'
        };
        return prompts[name] || `toy ${name.toLowerCase()}`;
    };

    if (selectedVehicle) {
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
                    onClick={() => speak(language === 'en' ? selectedVehicle.en : selectedVehicle.zh)}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                >
                    {!imageError ? (
                        <img 
                            src={`https://image.pollinations.ai/prompt/${encodeURIComponent(getImagePrompt(selectedVehicle.en))}?width=400&height=400&nologo=true&seed=${selectedVehicle.en}`} 
                            alt={selectedVehicle.en}
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
                            {selectedVehicle.emoji}
                        </div>
                    )}
                    <h2 style={{ fontSize: '4rem', color: '#FF6B6B', margin: 0 }}>
                        {language === 'en' ? selectedVehicle.en : selectedVehicle.zh}
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h2 className="page-title" style={{ color: '#FF6B6B' }}>
                {language === 'en' ? "Vehicles!" : "交通工具!"}
            </h2>
            <Grid>
                {vehicles.map((vehicle) => (
                    <Card
                        key={vehicle.en}
                        content={vehicle.emoji}
                        color="var(--color-card-bg)"
                        onClick={() => handleVehicleClick(vehicle)}
                    />
                ))}
            </Grid>
        </div>
    );
};
