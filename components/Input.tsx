import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export default function Input({ label, icon, className, id, ...props }: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <label htmlFor={id} className="text-sm font-medium text-slate-300 pl-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
          {icon}
        </div>
        <input
          id={id}
          {...props}
          className="w-full bg-slate-900/50 border border-slate-600 text-slate-100 rounded-lg py-2.5 pl-10 pr-4 
          focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
          placeholder-slate-500 transition-all duration-200"
        />
      </div>
    </div>
  );
}