const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:border-slate-400 focus-visible:ring-0 focus-visible:shadow-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-300 hover:shadow-md ${className}`}
    {...props}
  />
);

export default Input;