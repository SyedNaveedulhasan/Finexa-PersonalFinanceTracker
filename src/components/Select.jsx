const Select = ({ className = "", children, ...props }) => (
  <select
    className={`flex h-10 w-full items-center justify-between rounded-lg border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md ${className}`}
    {...props}
  >
    {children}
  </select>
);

export default Select;