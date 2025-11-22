import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'custom';
    size?: 'small' | 'medium' | 'large';
    color?: string; // New prop for custom colors
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  color,
  className = '',
  style,
  ...props 
}) => {
  const getVariantStyles = () => {
    if (color) {
        return { 
            backgroundColor: color,
            boxShadow: `0 6px 0 ${adjustColorBrightness(color, -20)}` // Auto-generate shadow color
        };
    }

    switch (variant) {
      case 'secondary':
        return { backgroundColor: 'var(--color-secondary)' };
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          border: '2px solid var(--color-text)',
          color: 'var(--color-text)',
          boxShadow: 'none'
        };
      default:
        return { backgroundColor: 'var(--color-primary)' };
    }
  };

  // Helper to darken color for shadow
  const adjustColorBrightness = (hex: string, percent: number) => {
      // Remove # if present
      hex = hex.replace(/^#/, '');

      // Parse r, g, b
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      // Adjust brightness
      r = Math.floor(r * (100 + percent) / 100);
      g = Math.floor(g * (100 + percent) / 100);
      b = Math.floor(b * (100 + percent) / 100);

      // Clamp values
      r = r < 255 ? r : 255;
      g = g < 255 ? g : 255;
      b = b < 255 ? b : 255;

      // Convert back to hex
      const rr = (r.toString(16).length === 1 ? '0' : '') + r.toString(16);
      const gg = (g.toString(16).length === 1 ? '0' : '') + g.toString(16);
      const bb = (b.toString(16).length === 1 ? '0' : '') + b.toString(16);

      return `#${rr}${gg}${bb}`;
  };

  const sizeClass = `btn-${size}`;

  return (
    <button
      className={`animate-pop ${sizeClass} ${className}`}
      style={{
        ...getVariantStyles(),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};
