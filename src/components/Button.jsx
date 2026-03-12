// Button.jsx - Exact Figma Button Specifications

import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] min-w-[44px]';
  
  const variants = {
    primary: 'bg-primary text-white rounded-xl shadow-lg shadow-primary/25 hover:bg-primary/90 focus:ring-primary',
    secondary: 'border-2 border-slate-200 text-slate-900 rounded-xl hover:border-primary hover:text-primary focus:ring-primary',
    ghost: 'text-primary hover:bg-primary/5 rounded-xl focus:ring-primary'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-4 text-base'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;