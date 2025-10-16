const Badge = ({ variant = "default", className = "", children, ...props }) => {
  const variants = {
    default: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    destructive: "bg-emerald-900 text-emerald-100 hover:bg-emerald-800",
    outline: "border border-emerald-200 text-emerald-700"
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Badge;