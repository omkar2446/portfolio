import React from 'react';

/**
 * GlobalBackground Component
 * Renders a high-end, smooth mesh gradient with subtle movement and grain.
 * This provides the base atmosphere for the 3D background elements.
 */
const GlobalBackground: React.FC = () => {
    return (
        <>
            {/* Deep Base Layer */}
            <div className={`fixed inset-0 -z-50 bg-[#050508]`} />

            {/* Premium Mesh Gradient Blobs */}
            <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none opacity-40">
                {/* Primary Aura (Violet) */}
                <div 
                    className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full opacity-[0.25] blur-[160px] animate-blob-slow"
                    style={{ 
                        background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
                    }} 
                />
                
                {/* Secondary Aura (Blue) */}
                <div 
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-[0.2] blur-[140px] animate-blob-reverse"
                    style={{ 
                        background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
                        animationDelay: '-2s'
                    }} 
                />
            </div>
            
            {/* Subtle Grain Texture Overlay */}
            <div className="fixed inset-0 -z-20 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <style>{`
                @keyframes blob-slow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                @keyframes blob-reverse {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-40px, 40px) scale(1.15); }
                    66% { transform: translate(30px, -30px) scale(0.85); }
                }
                .animate-blob-slow {
                    animation: blob-slow 20s ease-in-out infinite;
                }
                .animate-blob-reverse {
                    animation: blob-reverse 25s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default GlobalBackground;
