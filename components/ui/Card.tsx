import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${clickableClasses} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;