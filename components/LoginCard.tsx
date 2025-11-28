import React, { useState, useRef, useEffect, useCallback } from 'react';
import Input from './Input';
import { LockIcon, UserIcon, EyeIcon, EyeOffIcon, AlertTriangleIcon } from '../icons';

export default function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{ top: string; left: string }>({ top: '0', left: '0' });
  const [isHovered, setIsHovered] = useState(false);
  const [taunt, setTaunt] = useState('Login');
  const [attempts, setAttempts] = useState(0);
  const [forgotPassText, setForgotPassText] = useState('Forgot Password?');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const taunts = [
    "Too slow!",
    "Missed me!",
    "Try again!",
    "Nope!",
    "Almost!",
    "Too fast?",
    "Catch me!",
    "Oops!",
    "Not today!",
    "Access Denied!"
  ];

  const moveButton = useCallback(() => {
    if (!containerRef.current || !buttonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Calculate safe boundaries (subtracting button size from container size)
    const maxX = containerRect.width - buttonRect.width - 40; // 40px padding
    const maxY = containerRect.height - buttonRect.height - 40;

    // Generate random position
    const newX = Math.random() * maxX + 20; // 20px offset
    const newY = Math.random() * maxY + 20;

    setButtonPosition({
      top: `${newY}px`,
      left: `${newX}px`,
    });

    // Update taunt message occasionally
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    setTaunt(randomTaunt);
    setAttempts(prev => prev + 1);
  }, [taunts]);

  // Initial positioning logic
  useEffect(() => {
     // Set initial static position (bottom right) for visual consistency before first interaction
     // But we will switch to absolute positioning on the first hover
     // For now, let's just initialize it somewhere reasonable if it's "running"
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    moveButton();
  };

  const handleFocus = () => {
    moveButton();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Wait, how did you do that?!");
  };

  const handleForgotPassClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setForgotPassText("Login stupid boy");
  };

  return (
    <div className="w-full max-w-md perspective-1000">
      <div 
        ref={containerRef}
        className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mb-4">
            <LockIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">Please enter your credentials to access the portal.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6 flex-grow flex flex-col">
          <Input 
            id="email"
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            icon={<UserIcon className="w-5 h-5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input 
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              icon={<LockIcon className="w-5 h-5" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[34px] text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-slate-400 hover:text-white cursor-pointer transition-colors">
              <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-700 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-0" />
              Remember me
            </label>
            <a 
              href="#" 
              onClick={handleForgotPassClick} 
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {forgotPassText}
            </a>
          </div>

          {/* Spacer to push button area down, but we don't strictly need it since the container is absolute context */}
          <div className="flex-grow"></div>

          {/* The Running Button */}
          {/* We wrap it in a slightly larger invisible div to catch the mouse earlier */}
          <div 
            className={`transition-all duration-300 ease-out z-50 ${isHovered ? 'absolute' : 'relative w-full'}`}
            style={isHovered ? { top: buttonPosition.top, left: buttonPosition.left } : {}}
          >
             {/* Trigger zone wrapper */}
             <div 
                className="p-8 -m-8 inline-block" // Larger hit area for the trigger
                onMouseEnter={handleMouseEnter}
                onTouchStart={handleMouseEnter} // For mobile fun
             >
                <button
                  ref={buttonRef}
                  type="submit"
                  onFocus={handleFocus}
                  className={`
                    w-full min-w-[120px] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg 
                    shadow-lg shadow-indigo-500/30 transition-colors duration-200 flex items-center justify-center gap-2
                    ${isHovered ? 'w-auto' : ''}
                  `}
                >
                  <span>{taunt}</span>
                  {attempts > 5 && <AlertTriangleIcon className="w-4 h-4" />}
                </button>
             </div>
          </div>
        </form>

        {/* Footer info */}
        {attempts > 0 && (
          <div className="absolute bottom-2 left-0 w-full text-center text-slate-600 text-[10px] pointer-events-none">
            Security Level: IMPOSSIBLE ({attempts})
          </div>
        )}
      </div>
    </div>
  );
}