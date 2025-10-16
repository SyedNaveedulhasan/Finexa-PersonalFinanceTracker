import Button from './button';
import { CardHeader, CardTitle, CardContent } from './Card';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

const Modal = ({ show, onClose, title, onSubmit, children, expenseCardRect }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Small delay to ensure the modal is rendered before animation starts
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      // Hide modal after animation completes
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [show]);

  if (!isVisible) return null;

  // Calculate initial position and scale based on expense card position
  const getInitialStyle = () => {
    if (!expenseCardRect) return {};
    
    const modalWidth = 400; // Approximate modal width
    const modalHeight = 500; // Approximate modal height
    const scaleX = expenseCardRect.width / modalWidth;
    const scaleY = expenseCardRect.height / modalHeight;
    const translateX = expenseCardRect.left + expenseCardRect.width / 2 - window.innerWidth / 2;
    const translateY = expenseCardRect.top + expenseCardRect.height / 2 - window.innerHeight / 2;

    return {
      transform: `translate(${translateX}px, ${translateY}px) scale(${Math.min(scaleX, scaleY)})`,
      opacity: 0,
    };
  };

  const getAnimatedStyle = () => {
    if (!isAnimating) return getInitialStyle();
    
    return {
      transform: 'translate(0px, 0px) scale(1)',
      opacity: 1,
    };
  };
  
  return (
    <div 
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div 
        className="bg-white rounded-xl border-2 border-slate-200 shadow-2xl w-full max-w-md transition-all duration-300 ease-out"
        style={getAnimatedStyle()}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {children}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button onClick={onSubmit} className="flex-1">
              Add
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default Modal;