import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = ({ darkMode, toggleTheme }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => setIsAnimating(false), 600);
            return () => clearTimeout(timeout);
        }
    }, [isAnimating]);

    const createRipple = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
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
        }, 600);
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
                    w-20 h-10 rounded-full
                    transition-all duration-500 ease-out
                    ${darkMode 
                        ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900' 
                        : 'bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300'
                    }
                    shadow-2xl hover:shadow-3xl
                    border-2 ${darkMode ? 'border-slate-600' : 'border-orange-300'}
                    hover:scale-105 active:scale-95
                    before:absolute before:inset-0 before:rounded-full
                    before:bg-gradient-to-r ${darkMode 
                        ? 'before:from-blue-500/20 before:to-purple-500/20' 
                        : 'before:from-yellow-400/30 before:to-orange-400/30'
                    }
                    before:opacity-0 hover:before:opacity-100
                    before:transition-opacity before:duration-300
                    group
                `}
                onClick={handleClick}
                style={{
                    boxShadow: darkMode 
                        ? '0 0 30px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        : '0 0 30px rgba(251, 191, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
            >
                {/* Ripple Effects */}
                {ripples.map(ripple => (
                    <div
                        key={ripple.id}
                        className="absolute rounded-full animate-ping"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size,
                            backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)',
                        }}
                    />
                ))}

                {/* Background Glow */}
                <div className={`
                    absolute inset-0 rounded-md
                    ${darkMode 
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
                        : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
                    }
                    transition-all duration-500
                    ${isAnimating ? 'animate-pulse' : ''}
                `} />

                {/* Toggle Indicator */}
                <div 
                    className={`
                        absolute top-[4px] w-7 h-7 left-1 right-0  rounded-full
                        transition-all duration-500 ease-out
                        ${darkMode ? 'translate-x-10' : 'translate-x-1'}
                        ${darkMode 
                            ? 'bg-gradient-to-br from-slate-200 to-slate-300' 
                            : 'bg-gradient-to-br from-white to-yellow-100'
                        }
                        shadow-xl
                        flex items-center justify-center
                        border-2 ${darkMode ? 'border-slate-300' : 'border-yellow-200'}
                        group-hover:shadow-2xl
                        ${isAnimating ? 'animate-bounce' : ''}
                    `}
                    style={{
                        boxShadow: darkMode 
                            ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                            : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                    }}
                >
                    <FontAwesomeIcon 
                        icon={darkMode ? faMoon : faSun} 
                        className={`
                            transition-all duration-500 ease-out
                            ${isAnimating ? 'animate-spin' : ''}
                            ${darkMode ? 'text-slate-700' : 'text-orange-500'}
                            text-sm
                        `}
                        style={{
                            filter: darkMode 
                                ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))'
                                : 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
                        }}
                    />
                </div>

                {/* Animated Background Elements */}
                <div className={`
                    absolute inset-0 rounded-full
                    ${darkMode 
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20' 
                        : 'bg-gradient-to-r from-yellow-400/30 to-orange-400/30'
                    }
                    transition-all duration-700
                    ${isAnimating ? 'animate-pulse scale-110' : ''}
                `} />

                {/* Floating Particles */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`
                            absolute w-1 h-1 rounded-full
                            ${darkMode ? 'bg-blue-400' : 'bg-yellow-400'}
                            transition-all duration-1000
                            ${isAnimating ? 'animate-ping' : ''}
                        `}
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + i * 15}%`,
                            opacity: isAnimating ? 1 : 0,
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>

            
        </div>
    );
};

export default ToggleButton;