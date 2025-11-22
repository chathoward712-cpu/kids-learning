import { useState } from 'react';
import { Numbers } from './features/Numbers';
import { Letters } from './features/Letters';
import { Animals } from './features/Animals';
import { Vegetables } from './features/Vegetables';
import { Flags } from './features/Flags';
import { Vehicles } from './features/Vehicles';
import { Button } from './components/Button';
import { playPopSound, playBackSound } from './utils/sound';
import { CosmicBackground } from './components/CosmicBackground';

type View = 'home' | 'numbers' | 'letters' | 'animals' | 'vegetables' | 'flags' | 'vehicles';
type Language = 'en' | 'zh';

function App() {
  const [view, setView] = useState<View>('home');
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    playPopSound();
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const handleSetView = (newView: View) => {
    if (newView === 'home') {
        playBackSound();
    } else {
        playPopSound();
    }
    setView(newView);
  };

  const renderView = () => {
    switch (view) {
      case 'numbers':
        return <Numbers language={language} />;
      case 'letters':
        return <Letters language={language} />;
      case 'animals':
        return <Animals language={language} />;
      case 'vegetables':
        return <Vegetables language={language} />;
      case 'flags':
        return <Flags language={language} />;
      case 'vehicles':
        return <Vehicles language={language} />;
      default:
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            gap: '40px'
          }}>
            <h1 className="animate-bounce" style={{ color: '#FFD700', textShadow: '0 0 20px #FFD700' }}>
              {language === 'en' ? 'Kids Learning' : '儿童乐园'}
            </h1>
            
            <Button 
              onClick={toggleLanguage}
              variant="outline"
              size="small"
              style={{ position: 'absolute', top: '20px', right: '20px', color: 'white', borderColor: 'white' }}
            >
              {language === 'en' ? '🇨🇳 中文' : '🇺🇸 English'}
            </Button>

            <div className="home-grid">
              <Button
                onClick={() => handleSetView('numbers')}
                variant="primary"
                size="large"
              >
                {language === 'en' ? '🔢 123 Numbers' : '🔢 123 数字'}
              </Button>
              <Button
                onClick={() => handleSetView('letters')}
                variant="secondary"
                size="large"
              >
                {language === 'en' ? '🔤 ABC Letters' : '🔤 ABC 字母'}
              </Button>
              <Button
                onClick={() => handleSetView('animals')}
                color="#FF9F43"
                size="large"
              >
                {language === 'en' ? '🐶 Animals' : '🐶 动物'}
              </Button>
              <Button
                onClick={() => handleSetView('vegetables')}
                color="#6AB04C"
                size="large"
              >
                {language === 'en' ? '🥦 Vegetables' : '🥦 蔬菜'}
              </Button>
              <Button
                onClick={() => handleSetView('flags')}
                color="#4ECDC4"
                size="large"
              >
                {language === 'en' ? '🇨🇳 Flags' : '🇨🇳 国旗'}
              </Button>
              <Button
                onClick={() => handleSetView('vehicles')}
                color="#FF6B6B"
                size="large"
              >
                {language === 'en' ? '🚗 Vehicles' : '🚗 交通工具'}
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      <CosmicBackground />
      {view !== 'home' && (
        <Button
          onClick={() => handleSetView('home')}
          variant="outline"
          size="small"
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 100,
            color: 'white',
            borderColor: 'white'
          }}
        >
          {language === 'en' ? '← Back' : '← 返回'}
        </Button>
      )}
      {renderView()}
    </div>
  );
}

export default App;
