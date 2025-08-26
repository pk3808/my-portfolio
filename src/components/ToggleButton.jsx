import React, { useState, useEffect } from 'react';
import { Sun, Moon, Stars, Sparkles } from 'lucide-react';

const ToggleButton = ({ darkMode, toggleTheme }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [ripples, setRipples] = useState([]);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => setIsAnimating(false), 800);
            return () => clearTimeout(timeout);
        }
    }, [isAnimating]);

    // Generate floating particles
    useEffect(() => {
        const generateParticles = () => {
            const newParticles = Array.from({ length: 4 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 2
            }));
            setParticles(newParticles);
        };

        generateParticles();
        const interval = setInterval(generateParticles, 5000);
        return () => clearInterval(interval);
    }, [darkMode]);

    const createRipple = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const newRipple = {
            x,
            y,
            size,
            id: Date.now()
        };
        
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 800);
    };

    const handleClick = (e) => {
        createRipple(e);
        setIsAnimating(true);
        toggleTheme();
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <div 
                className={`
                    relative overflow-hidden cursor-pointer
                    w-16 h-8 rounded-full
                    transition-all duration-700 ease-out
                    ${darkMode 
                        ? 'bg-gradient-to-br from-green-900 via-slate-800 to-green-900' 
                        : 'bg-gradient-to-br from-amber-300 via-orange-300 to-pink-300'
                    }
                    shadow-2xl hover:shadow-3xl
                    border-2 ${darkMode ? 'border-slate-600/50' : 'border-orange-200/50'}
                    hover:scale-105 active:scale-95
                    backdrop-blur-sm
                    group
                `}
                onClick={handleClick}
                style={{
                    boxShadow: darkMode 
                        ? '0 0 25px rgba(79, 70, 229, 0.4), 0 0 50px rgba(79, 70, 229, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 0 25px rgba(251, 191, 36, 0.5), 0 0 50px rgba(251, 191, 36, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}
            >
                {/* Animated Background Gradient */}
                <div className={`
                    absolute inset-0 rounded-full
                    ${darkMode 
                        ? 'bg-gradient-to-r from-green-600/30 via-purple-600/30 to-green-600/30' 
                        : 'bg-gradient-to-r from-yellow-400/40 via-orange-400/40 to-pink-400/40'
                    }
                    transition-all duration-700
                    ${isAnimating ? 'animate-pulse scale-110 rotate-180' : ''}
                `} />

                {/* Ripple Effects */}
                {ripples.map(ripple => (
                    <div
                        key={ripple.id}
                        className="absolute rounded-full opacity-30"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                            background: darkMode 
                                ? 'radial-gradient(circle, rgba(79, 70, 229, 0.6) 0%, rgba(79, 70, 229, 0) 70%)'
                                : 'radial-gradient(circle, rgba(251, 191, 36, 0.6) 0%, rgba(251, 191, 36, 0) 70%)',
                            animation: 'ripple 0.8s ease-out forwards',
                        }}
                    />
                ))}

                {/* Floating Particles */}
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className={`
                            absolute rounded-full
                            ${darkMode ? 'bg-indigo-400' : 'bg-amber-400'}
                            ${isAnimating ? 'animate-ping' : ''}
                        `}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: 0.6,
                            animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s`,
                            filter: darkMode 
                                ? 'drop-shadow(0 0 4px rgba(79, 70, 229, 0.8))'
                                : 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))'
                        }}
                    />
                ))}

                {/* Toggle Track */}
                <div className={`
                    absolute inset-1 rounded-full
                    ${darkMode 
                        ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50' 
                        : 'bg-gradient-to-r from-orange-200/50 to-yellow-200/50'
                    }
                    transition-all duration-700
                    backdrop-blur-sm
                `} />

                {/* Toggle Indicator */}
                <div 
                    className={`
                        absolute top-[2px] w-6 h-6 rounded-full
                        transition-all duration-700 ease-out
                        ${darkMode ? 'translate-x-8' : 'translate-x-[2px]'}
                        ${darkMode 
                            ? 'bg-gradient-to-br from-slate-100 via-slate-200 to-indigo-100' 
                            : 'bg-gradient-to-br from-white via-yellow-50 to-orange-50'
                        }
                        shadow-xl
                        flex items-center justify-center
                        border-2 ${darkMode ? 'border-slate-300/80' : 'border-yellow-200/80'}
                        group-hover:shadow-2xl
                        ${isAnimating ? 'animate-bounce scale-110' : ''}
                        backdrop-blur-sm
                    `}
                    style={{
                        boxShadow: darkMode 
                            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 20px rgba(79, 70, 229, 0.3)'
                            : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 0 20px rgba(251, 191, 36, 0.4)'
                    }}
                >
                    <div className="relative">
                        {/* Main Icon */}
                        {darkMode ? (
                            <Moon 
                                size={14}
                                className={`
                                    transition-all duration-500 ease-out
                                    ${isAnimating ? 'animate-spin' : ''}
                                    text-slate-700
                                `}
                                style={{
                                    filter: 'drop-shadow(0 0 12px rgba(79, 70, 229, 0.6))'
                                }}
                            />
                        ) : (
                            <Sun 
                                size={14}
                                className={`
                                    transition-all duration-500 ease-out
                                    ${isAnimating ? 'animate-spin' : ''}
                                    text-orange-500
                                `}
                                style={{
                                    filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.8))'
                                }}
                            />
                        )}

                        {/* Decorative Elements */}
                        {isAnimating && (
                            <>
                                {darkMode ? (
                                    <Stars 
                                        size={8}
                                        className="absolute -top-2 -right-2 text-indigo-400 animate-pulse"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                ) : (
                                    <Sparkles 
                                        size={8}
                                        className="absolute -top-2 -right-2 text-yellow-400 animate-pulse"
                                        style={{ animationDelay: '0.2s' }}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Ambient Glow */}
                <div className={`
                    absolute inset-0 rounded-full
                    ${darkMode 
                        ? 'bg-gradient-to-r from-green-500/20 to-green-500/20' 
                        : 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30'
                    }
                    transition-all duration-700
                    ${isAnimating ? 'animate-pulse scale-125' : ''}
                    blur-sm
                `} />

                {/* Hover Effect Overlay */}
                <div className={`
                    absolute inset-0 rounded-full
                    ${darkMode 
                        ? 'bg-gradient-to-r from-green-500/10 to-green-500/10' 
                        : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
                    }
                    opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    backdrop-blur-sm
                `} />
            </div>

            {/* Additional Styles */}
            <style jsx>{`
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 0.6;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-10px) rotate(180deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};
export default ToggleButton;