import React from 'react';

const GlobalStyles = () => (
    <style>{`
        body {
            font-family: 'Nunito', sans-serif;
        }
        .nav-item.active {
            color: #f59e0b; /* amber-500 */
            transform: scale(1.1);
            transition: transform 0.2s ease-in-out;
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slide-up {
            from { transform: translateY(20px); }
            to { transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        .animate-slide-up {
            animation: slide-up 0.3s ease-out forwards;
        }
        .skeleton-item {
            background-color: #e5e7eb; /* gray-200 */
            border-radius: 0.5rem;
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }
        .typing-bubble {
            animation: pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .typing-bubble:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-bubble:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes background-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animated-gradient {
            background-size: 200% 200%;
            animation: background-pan 15s ease infinite;
        }
        @keyframes avatar-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.03); }
        }
        .avatar-interactive {
            animation: avatar-pulse 4s ease-in-out infinite;
            transition: transform 0.2s ease;
        }
        .avatar-interactive:active {
            transform: scale(0.95);
        }
    `}</style>
);

export default GlobalStyles;
