import { Plus, Download, Upload, X } from 'lucide-react';

const Button = ({ variant = "default", size = "default", className = "", children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-xl",
    secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300 border border-slate-300 hover:shadow-lg",
    outline: "border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:shadow-lg hover:border-slate-400",
    ghost: "hover:bg-slate-200 text-slate-700 hover:shadow-md"
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;