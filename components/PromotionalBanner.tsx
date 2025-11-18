import React from 'react';

interface PromotionalBannerProps {
  message: string;
  type?: 'info' | 'success' | 'warning';
  visible?: boolean;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ 
  message, 
  type = 'info',
  visible = true 
}) => {
  if (!visible || !message) return null;

  const bgColors = {
    info: 'bg-cyan-500/20 border-cyan-500/50',
    success: 'bg-green-500/20 border-green-500/50',
    warning: 'bg-yellow-500/20 border-yellow-500/50'
  };

  const textColors = {
    info: 'text-cyan-300',
    success: 'text-green-300',
    warning: 'text-yellow-300'
  };

  return (
    <div className={`${bgColors[type]} border-2 rounded-lg p-4 mb-6 text-center animate-fade-in`}>
      <p className={`${textColors[type]} font-semibold text-sm md:text-base`}>
        {message}
      </p>
    </div>
  );
};

export default PromotionalBanner;
