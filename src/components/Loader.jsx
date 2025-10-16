import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center py-60">
      <div className="relative w-20 h-20">
        {/* First ripple */}
        <div 
          className="absolute rounded-full"
          style={{
            border: '4px solid #10b981',
            animation: 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite'
          }}
        ></div>
        
        {/* Second ripple with delay */}
        <div 
          className="absolute rounded-full"
          style={{
            border: '4px solid #10b981',
            animation: 'ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite -0.5s'
          }}
        ></div>
      </div>
      
      <style>{`
        @keyframes ripple {
          0% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
          4.9% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
          5% {
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            opacity: 1;
            transform: translate(-50%, -50%);
          }
          100% {
            top: 50%;
            left: 50%;
            width: 72px;
            height: 72px;
            opacity: 0;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
}

export default Loader;