import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      ghost: 'bg-transparent hover:bg-primary/10 text-primary',
    };

    return (
      <motion.button
        ref={(node) => {
          // @ts-ignore
          buttonRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'relative flex items-center justify-center rounded-full font-semibold transition-colors',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
MagneticButton.displayName = 'MagneticButton';
