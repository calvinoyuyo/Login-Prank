import React from 'react';
import LoginCard from './components/LoginCard';

export default function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <LoginCard />
      
      <div className="absolute bottom-4 text-slate-500 text-xs text-center w-full">
        &copy; {new Date().getFullYear()} SecureCorp Inc. All rights reserved. <br/> System version 4.0.2 (Unstable)
      </div>
    </div>
  );
}