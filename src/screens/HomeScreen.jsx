import React, { useState, useEffect } from 'react';

const HomeScreen = ({ onOpenChat, petPhoto, handleAvatarClick, greeting, petName }) => {
    const [missionValidity, setMissionValidity] = useState('');
    const [showHeart, setShowHeart] = useState(false);
    const [progress, setProgress] = useState(60);

    useEffect(() => {
        function updateMissionCountdown() {
            const today = new Date();
            const deadline = new Date('2025-09-15T23:59:59-03:00');
            const diffTime = deadline - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 1) {
                setMissionValidity(`Expira em ${diffDays} dias!`);
            } else if (diffDays === 1) {
                setMissionValidity(`Expira amanhã!`);
            } else if (diffDays === 0) {
                setMissionValidity(`Expira hoje!`);
            } else {
                setMissionValidity(`Missão expirada.`);
            }
        }
        
        updateMissionCountdown();
        const interval = setInterval(updateMissionCountdown, 3600000);
        return () => clearInterval(interval);
    }, []);

    const handleButtonClick = () => {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const onAvatarClick = () => {
        handleAvatarClick();
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 800);
    };
    
    return (
        <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-8 animated-gradient">
            <div className="flex items-center space-x-4 animate-fade-in">
                <div className="relative">
                    <img 
                        src={petPhoto}
                        alt="Foto do Pet" 
                        aria-label="Personalizar foto do pet"
                        className="w-20 h-20 rounded-full border-4 border-white/50 p-1 bg-gradient-to-tr from-amber-300 to-orange-400 shadow-lg avatar-interactive cursor-pointer object-cover"
                        onClick={onAvatarClick}
                        loading="lazy"
                    />
                    {petPhoto.includes('unsplash') && (
                         <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-xs text-center p-1 pointer-events-none">
                            Toque para personalizar!
                        </div>
                    )}
                    {showHeart && <span className="absolute top-0 right-0 text-3xl animate-ping">❤️</span>}
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold" style={{textShadow: '0 0 5px rgba(0,0,0,0.3)'}}>{greeting.replace('Rex', petName)}</h1>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                 <button onClick={handleButtonClick} type="button" className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl shadow transition-all min-h-[60px] flex flex-col justify-center items-center active:scale-95 hover:scale-105" aria-label="Agendar um serviço">
                    <svg aria-hidden="true" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                    <span className="text-sm font-semibold mt-1 block">Agendar</span>
                </button>
                <button onClick={() => { handleButtonClick(); onOpenChat(); }} type="button" className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl shadow transition-all min-h-[60px] flex flex-col justify-center items-center active:scale-95 hover:scale-105" aria-label="Falar com o assistente virtual">
                    <svg aria-hidden="true" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    <span className="text-sm font-semibold mt-1 block">Assistente</span>
                </button>
                 <button onClick={handleButtonClick} type="button" className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl shadow transition-all min-h-[60px] flex flex-col justify-center items-center active:scale-95 hover:scale-105" aria-label="Ver o diário de saúde">
                    <svg aria-hidden="true" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    <span className="text-sm font-semibold mt-1 block">Diário</span>
                </button>
            </div>

            <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20 shadow-inner-white-sm">
                <h3 className="font-bold text-lg flex items-center"><span className="text-yellow-300 mr-2">⭐</span> Missão da Semana</h3>
                <p className="text-sm mt-1 text-white">Compre petisco gourmet e ganhe 20% OFF no banho! <span aria-live="polite" className="font-bold text-yellow-300 block">{missionValidity}</span></p>
                 <div className="w-full bg-white/20 rounded-full h-2 mt-2 overflow-hidden">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}></div>
                </div>
                <button onClick={handleButtonClick} type="button" className="w-full bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded-lg mt-4 shadow-md transition-transform hover:scale-105 active:scale-95">
                    {progress > 50 ? 'Quase lá!' : 'Participar'}
                </button>
            </div>
            
            <div className="bg-black/20 backdrop-blur-[15px] p-3 rounded-2xl shadow-lg border border-white/20 shadow-inner-white-sm">
                <h3 className="font-bold text-lg mb-2 text-white px-1">Compre de novo</h3>
                <div className="bg-white/80 p-3 rounded-xl shadow flex items-center justify-between text-gray-800">
                    <div className="flex items-center space-x-3">
                        <img src="https://placehold.co/80x80/e0e7ff/3730a3?text=Ração" alt="Imagem do Produto" className="w-16 h-16 rounded-lg"/>
                        <div>
                            <h4 className="font-bold">Ração Super Premium</h4>
                            <p className="text-sm text-gray-600">15kg • Última compra: 2 dias atrás</p>
                        </div>
                    </div>
                    <button onClick={handleButtonClick} type="button" className="relative bg-amber-500 hover:bg-amber-600 text-white font-bold p-3 rounded-full shadow-md transition-transform active:scale-90" aria-label="Adicionar 1 Ração Super Premium ao carrinho">
                        <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">1</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
