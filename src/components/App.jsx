import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Estilos customizados (movido para fora do App para evitar re-render)
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
        /* Animação para o Typing Indicator */
        .typing-bubble {
            animation: pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .typing-bubble:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing-bubble:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        /* --- ANIMAÇÕES E ESTILOS PREMIUM --- */
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

// Componente para a Tela Inicial (Dashboard)
const HomeScreen = ({ onOpenChat, petPhoto, handleAvatarClick, greeting, petName }) => {
    const [missionValidity, setMissionValidity] = useState('');
    const [showHeart, setShowHeart] = useState(false);
    const [progress, setProgress] = useState(60);

    useEffect(() => {
        // Countdown da Missão
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
            {/* Cabeçalho de Boas-Vindas */}
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

            {/* Ações Rápidas */}
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

            {/* Card: Missão da Semana */}
            <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20 shadow-inner-white-sm">
                <h3 className="font-bold text-lg flex items-center"><span className="text-yellow-300 mr-2">⭐</span> Missão da Semana</h3>
                <p className="text-sm mt-1 text-white">Compre petisco gourmet e ganhe 20% OFF no banho! <span aria-live="polite" id="mission-validity" className="font-bold text-yellow-300 block">{missionValidity}</span></p>
                 <div className="w-full bg-white/20 rounded-full h-2 mt-2 overflow-hidden">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-out' }}></div>
                </div>
                <button onClick={handleButtonClick} type="button" className="w-full bg-amber-500 hover:bg-amber-600 font-bold py-2 px-4 rounded-lg mt-4 shadow-md transition-transform hover:scale-105 active:scale-95">
                    {progress > 50 ? 'Quase lá!' : 'Participar'}
                </button>
            </div>
            
            {/* Seção: Compre de Novo */}
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

// --- COMPONENTE ProductsScreen ---
const ProductsScreen = () => {
    const mockProducts = [ { id: 1, name: 'Ração Hipoalergênica', price: 'R$ 189,90', image: 'https://placehold.co/200x200/dbeafe/1e3a8a?text=Ração' }, { id: 2, name: 'Brinquedo Mordedor', price: 'R$ 49,90', image: 'https://placehold.co/200x200/fef3c7/b45309?text=Brinquedo' }, { id: 3, name: 'Shampoo Neutro', price: 'R$ 79,90', image: 'https://placehold.co/200x200/d1d5db/1f2937?text=Shampoo' }, { id: 4, name: 'Coleira de Couro', price: 'R$ 129,90', image: 'https://placehold.co/200x200/fde68a/854d0e?text=Coleira' } ];
    const aiRecommendation = mockProducts[0];
    return ( <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient"> <div className="space-y-6"> <h2 className="text-3xl font-bold text-white">Nossos Produtos</h2> <div className="relative"> <input type="text" placeholder="Buscar por ração, brinquedo..." className="w-full p-3 pl-10 rounded-full border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-white/70" /> <svg aria-hidden="true" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> </div> </div> <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20"> <h3 className="text-lg font-bold text-white mb-2 flex items-center"> <span className="bg-amber-500 text-black text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">Recomendado</span> <span>para o Rex 🐶</span> </h3> <div className="bg-white/10 p-3 rounded-xl flex items-center space-x-4"> <img src={aiRecommendation.image} alt={aiRecommendation.name} className="w-20 h-20 rounded-lg object-cover" loading="lazy"/> <div className="flex-1"> <p className="text-sm text-white/80">Como o Rex tem pele sensível...</p> <h4 className="font-bold text-white">{aiRecommendation.name}</h4> <p className="font-semibold text-amber-300">{aiRecommendation.price}</p> </div> <button className="bg-amber-500 text-black p-2 rounded-full hover:bg-amber-400 transition-colors" aria-label={`Adicionar ${aiRecommendation.name} ao carrinho`}> <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> </button> </div> </div> <div> <h3 className="text-lg font-bold text-white mb-2">Todos os Produtos</h3> <div className="grid grid-cols-2 gap-4"> {mockProducts.map(product => ( <div key={product.id} className="bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-3 text-center text-white" aria-label={`Produto: ${product.name}, Preço: ${product.price}`}> <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" loading="lazy"/> <h4 className="font-bold text-sm">{product.name}</h4> <p className="text-white/80 font-semibold">{product.price}</p> <button className="w-full mt-2 bg-white/10 text-white font-bold py-2 rounded-lg hover:bg-white/20 transition-colors"> Adicionar </button> </div> ))} </div> </div> </div> );
};

// --- COMPONENTE ServicesScreen ---
const ServicesScreen = () => {
    // ... (código existente, sem alterações)
    const featuredService = { id: 1, name: 'Banho & Tosa Premium', description: 'Cuidado completo com shampoo hipoalergênico e tosa na tesoura.', icon: <svg aria-hidden="true" className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> }; const otherServices = [ { id: 2, name: 'Consulta Veterinária', description: 'Check-up completo com nossos especialistas.' }, { id: 3, name: 'Adestramento Básico', description: 'Aulas em grupo para um pet bem-comportado.' }, { id: 4, name: 'Hotel para Pets', description: 'Conforto e segurança enquanto você viaja.' } ];
    return ( <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient"> <h2 className="text-3xl font-bold text-white">Nossos Serviços</h2> <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20"> <h3 className="text-lg font-bold text-white mb-2 flex items-center"> <span className="text-amber-300 mr-2">⭐</span> <span>Serviço em Destaque</span> </h3> <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-4"> {featuredService.icon} <div className="flex-1"> <h4 className="font-bold text-white">{featuredService.name}</h4> <p className="text-sm text-white/80">{featuredService.description}</p> </div> <button className="bg-amber-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors" aria-label={`Agendar ${featuredService.name}`}> Agendar </button> </div> </div> <div> <h3 className="text-lg font-bold text-white mb-2">Outros Serviços</h3> <div className="space-y-3"> {otherServices.map(service => ( <div key={service.id} className="bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-3 flex items-center justify-between text-white" aria-label={`Serviço: ${service.name}`}> <div> <h4 className="font-bold text-sm">{service.name}</h4> <p className="text-xs text-white/70">{service.description}</p> </div> <button className="bg-white/10 text-white font-bold py-2 px-3 rounded-lg hover:bg-white/20 transition-colors text-sm"> Agendar </button> </div> ))} </div> </div> </div> );
};

// --- COMPONENTE ProfileScreen ---
const ProfileScreen = ({ petPhoto, onEditProfile, petName, petBreed }) => {
    // ... (código existente, sem alterações)
    const menuOptions = [ { id: 1, name: 'Configurações da Conta', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> }, { id: 2, name: 'Histórico de Compras', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> }, { id: 3, name: 'Ajuda & Suporte', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> } ];
    return ( <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient"> <h2 className="text-3xl font-bold text-white text-center">Perfil</h2> <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center text-center"> <img src={petPhoto} alt="Foto do Pet" className="w-24 h-24 rounded-full border-4 border-white/50 p-1 bg-gradient-to-tr from-amber-300 to-orange-400 shadow-lg object-cover" /> <h3 className="text-2xl font-bold mt-4">{petName}</h3> <p className="text-white/80">{petBreed}</p> <button onClick={onEditProfile} className="mt-4 bg-white/10 text-white font-bold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm" aria-label="Editar Perfil"> Editar Perfil </button> </div> <div className="space-y-3"> {menuOptions.map(option => ( <button key={option.id} className="w-full bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-4 flex items-center justify-between text-white text-left hover:bg-black/30 transition-colors"> <div className="flex items-center space-x-4"> {option.icon} <span className="font-bold">{option.name}</span> </div> <svg aria-hidden="true" className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg> </button> ))} </div> </div> );
};


// Componente da Barra de Navegação
const NavigationBar = ({ activeScreen, setActiveScreen }) => {
    const navItems = [ 
        { id: 'home', label: 'Início', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1V10a1 1 0 00-1-1H7a1 1 0 00-1 1v10a1 1 0 001 1h3z"></path></svg> }, 
        { id: 'products', label: 'Produtos', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> }, 
        { id: 'services', label: 'Serviços', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> }, 
        { id: 'profile', label: 'Perfil', icon: <svg aria-hidden="true" className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> } 
    ];
    
    const handleNavClick = (screenId) => { 
        if (navigator.vibrate) { navigator.vibrate(50); } 
        setActiveScreen(screenId); 
    };

    return ( 
        <nav role="navigation" aria-label="Navegação principal" className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-white border-t border-gray-200 flex justify-around items-center"> 
            {navItems.map(item => ( 
                <button 
                    key={item.id} 
                    tabIndex="0" 
                    type="button" 
                    onClick={() => handleNavClick(item.id)} 
                    className={`nav-item text-center text-gray-500 p-2 ${activeScreen === item.id ? 'active' : ''}`}
                    aria-label={`Ir para ${item.label}`}
                > 
                    {item.icon} 
                    <span className="text-xs">{item.label}</span> 
                </button> 
            ))} 
        </nav> 
    );
};
const MemoizedNavigationBar = memo(NavigationBar);


// Componente Indicador de "Digitando..."
const TypingIndicator = () => (
    // ... (código existente, sem alterações)
    <div className="flex justify-start"> <div className="p-3 rounded-2xl max-w-xs lg:max-w-md bg-gray-100 rounded-bl-none"> <div className="flex items-center justify-center space-x-1"> <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div> <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div> <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div> </div> </div> </div>
);


// --- COMPONENTE ChatModal ---
const ChatModal = ({ isOpen, onClose, petName }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);
    const inputRef = useRef(null);
    
    // Carregar histórico do localStorage
    useEffect(() => {
        if(isOpen) {
            const savedMessages = localStorage.getItem('chatHistory');
            // Reinicia o chat se o nome do pet no histórico for diferente do atual
            try {
                const parsedMessages = savedMessages ? JSON.parse(savedMessages) : [];
                if (parsedMessages.length > 0 && !parsedMessages[0].content.includes(petName)) {
                     const initialMessage = { role: 'assistant', content: `Olá! Sou seu assistente virtual. Em que posso ajudar com o ${petName} hoje?` };
                     setMessages([initialMessage]);
                } else if (parsedMessages.length > 0) {
                    setMessages(parsedMessages);
                } else {
                    const initialMessage = { role: 'assistant', content: `Olá! Sou seu assistente virtual. Em que posso ajudar com o ${petName} hoje?` };
                    setMessages([initialMessage]);
                }
            } catch (e) {
                 const initialMessage = { role: 'assistant', content: `Olá! Sou seu assistente virtual. Em que posso ajudar com o ${petName} hoje?` };
                 setMessages([initialMessage]);
            }
             // Auto-foco no input ao abrir
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, petName]);

    // Salvar histórico no localStorage
    useEffect(() => {
        if(messages.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

    // Auto-scroll para a última mensagem
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    if (!isOpen) return null;

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        // --- INTEGRAÇÃO REAL COM A API GEMINI ---
        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            
            if (!apiKey) {
                console.warn('API Key não configurada. Use .env.local para adicionar VITE_GEMINI_API_KEY');
                setMessages(prev => [...prev, { role: 'assistant', content: 'Ops! A chave de API não foi configurada. Por favor, adicione a chave para conversar comigo. 🐾' }]);
                setIsLoading(false);
                return;
            }

            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const contents = newMessages.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));
            
            const systemInstruction = {
                role: "system",
                parts: [{ text: `Você é um assistente para pets, amigável e útil, chamado Amigo IA. O pet do usuário é o ${petName}, um labrador. Responda sempre em pt-BR com um tom carinhoso e prestativo, usando emojis de animais quando apropriado.` }]
            };

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents, systemInstruction })
            });

            if (!res.ok) {
                const errorBody = await res.json();
                console.error("API Error Body:", errorBody);
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            const assistantResponse = data.candidates[0]?.content?.parts[0]?.text || "Desculpe, não consegui pensar em uma resposta. 🐾";
            
            setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

        } catch (error) {
            console.error("Erro ao chamar a API:", error);
            toast.error(`Erro de conexão: ${error.message}`);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Ops, algo deu errado com minha conexão! Tente novamente mais tarde. 🦴' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in z-50">
            <div className="bg-white rounded-t-2xl flex flex-col h-[90%] max-h-[700px] animate-slide-up">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Oi, sou o Amigo IA! 🐶</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Fechar chat">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-2xl max-w-xs lg:max-w-md ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && <TypingIndicator />}
                </div>
                <div className="p-4 bg-white border-t">
                    <div className="flex items-center space-x-2">
                         <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder={`Pergunte algo sobre o ${petName}...`}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            disabled={isLoading}
                            aria-label={`Digite sua mensagem sobre ${petName}`}
                            aria-describedby="chat-help"
                        />
                        <span id="chat-help" className="sr-only">Envie perguntas sobre seu pet para o nosso assistente de IA.</span>
                         <button onClick={handleSendMessage} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400" aria-label="Enviar mensagem" disabled={isLoading}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- COMPONENTE EditProfileModal ---
const EditProfileModal = ({ isOpen, onClose, petData, onSave, handleAvatarClick }) => {
    // ... (código existente, sem alterações)
    const [localPetData, setLocalPetData] = useState(petData); const [isSaving, setIsSaving] = useState(false); const inputRef = useRef(null);
    useEffect(() => { setLocalPetData(petData); if(isOpen) { setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen, petData]);
    const handleSaveClick = () => { if (!localPetData.name.trim()) { toast.error("O nome do pet não pode ficar em branco."); return; } if (localPetData.breed.trim().length < 2) { toast.error("A raça deve ter pelo menos 2 caracteres."); return; } setIsSaving(true); setTimeout(() => { onSave(localPetData); setIsSaving(false); toast.success('Perfil salvo com sucesso! 🐾'); onClose(); }, 1000); };
    if (!isOpen) return null;
    return ( <div role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in z-50 p-4"> <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm text-gray-800 animate-slide-up space-y-4"> <h2 id="edit-profile-title" className="text-2xl font-bold text-center">Editar Perfil do Pet</h2> <div> <label htmlFor="petName" className="font-semibold text-sm">Nome do Pet</label> <input ref={inputRef} id="petName" type="text" value={localPetData.name} onChange={(e) => setLocalPetData(prev => ({...prev, name: e.target.value}))} className="w-full p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" disabled={isSaving} /> </div> <div> <label htmlFor="petBreed" className="font-semibold text-sm">Raça</label> <input id="petBreed" type="text" value={localPetData.breed} onChange={(e) => setLocalPetData(prev => ({...prev, breed: e.target.value}))} className="w-full p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600" disabled={isSaving} /> </div> <button onClick={handleAvatarClick} className="w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300 transition-colors" disabled={isSaving}> Trocar Foto </button> <div className="flex space-x-2"> <button onClick={onClose} className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg hover:bg-gray-500 transition-colors" disabled={isSaving}> Cancelar </button> <button onClick={handleSaveClick} className="w-full bg-amber-500 text-black font-bold py-2 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center" disabled={isSaving}> {isSaving ? ( <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div> ) : ( 'Salvar' )} </button> </div> </div> </div> );
};


// Componente Principal do App
export default function App() {
    const [activeScreen, setActiveScreen] = useState('home');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // ✅ HOOK PARA PERSISTIR DADOS DO PET NO LOCALSTORAGE
    const [petData, setPetData] = useState(() => {
        try {
            const savedData = localStorage.getItem('petProfile');
            return savedData ? JSON.parse(savedData) : {
                name: 'Rex',
                breed: 'Labrador Retriever',
                photo: 'https://images.unsplash.com/photo-1587402092301-721638668283?q=80&w=2574&auto=format&fit=crop'
            };
        } catch (error) {
            console.error("Falha ao ler o perfil do pet do localStorage", error);
            // Retorna o padrão em caso de erro
            return { name: 'Rex', breed: 'Labrador Retriever', photo: 'https://images.unsplash.com/photo-1587402092301-721638668283?q=80&w=2574&auto=format&fit=crop' };
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('petProfile', JSON.stringify(petData));
        } catch (error) {
            console.error("Falha ao salvar o perfil do pet no localStorage", error);
        }
    }, [petData]);


    const fileInputRef = useRef(null);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) setGreeting(`Bom dia, ${petData.name}! ☀️`);
        else if (hour >= 12 && hour < 18) setGreeting(`Boa tarde, ${petData.name}! 🌤️`);
        else setGreeting(`Boa noite, ${petData.name}! 🌙`);
    }, [petData.name]);

    const handleAvatarClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handlePhotoChange = (event) => {
        // ✅ GERENCIAMENTO DE ERRO NO UPLOAD DE FOTO
        try {
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                // Simples verificação de tipo de arquivo
                if (!file.type.startsWith('image/')) {
                    toast.error('Por favor, selecione um arquivo de imagem.');
                    return;
                }
                const newPhotoURL = URL.createObjectURL(file);
                setPetData(prev => ({ ...prev, photo: newPhotoURL }));
                toast.success('Foto atualizada! 📸');
            }
        } catch (error) {
            console.error("Erro ao processar a foto:", error);
            toast.error('Houve um problema ao carregar sua foto.');
        }
    };
    
    const handleSaveProfile = useCallback((newPetData) => {
        setPetData(newPetData);
    }, []);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'products':
                return <ProductsScreen />;
            case 'services':
                return <ServicesScreen />;
            case 'profile':
                return <ProfileScreen 
                            petPhoto={petData.photo} 
                            onEditProfile={() => setIsEditModalOpen(true)}
                            petName={petData.name}
                            petBreed={petData.breed}
                        />;
            case 'home':
            default:
                return <HomeScreen 
                            onOpenChat={() => setIsChatOpen(true)} 
                            petPhoto={petData.photo}
                            handleAvatarClick={handleAvatarClick}
                            greeting={greeting}
                            petName={petData.name}
                        />;
        }
    };
    
    return (
        <>
            <GlobalStyles />
            <Toaster position="top-center" />
            <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handlePhotoChange}
                className="hidden"
            />
            <main id="app-container" className="max-w-md mx-auto h-screen bg-white shadow-lg flex flex-col z-10 relative">
                <div id="content-area" className="flex-1 overflow-y-auto pb-16">
                    {renderScreen()}
                </div>
                <MemoizedNavigationBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            </main>
            <ChatModal 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
                petName={petData.name}
            />
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                petData={petData}
                onSave={handleSaveProfile}
                handleAvatarClick={handleAvatarClick}
            />
        </>
    );
}

