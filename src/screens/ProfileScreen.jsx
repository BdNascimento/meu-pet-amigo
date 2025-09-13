import React from 'react';

const ProfileScreen = ({ petPhoto, onEditProfile, petName, petBreed }) => {
    const menuOptions = [
        { id: 1, name: 'Configurações da Conta', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> },
        { id: 2, name: 'Histórico de Compras', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> },
        { id: 3, name: 'Ajuda & Suporte', icon: <svg aria-hidden="true" className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> }
    ];

    return (
        <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient">
            <h2 className="text-3xl font-bold text-white text-center">Perfil</h2>
            
            <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center text-center">
                <img 
                    src={petPhoto}
                    alt="Foto do Pet" 
                    className="w-24 h-24 rounded-full border-4 border-white/50 p-1 bg-gradient-to-tr from-amber-300 to-orange-400 shadow-lg object-cover"
                />
                <h3 className="text-2xl font-bold mt-4">{petName}</h3>
                <p className="text-white/80">{petBreed}</p>
                <button onClick={onEditProfile} className="mt-4 bg-white/10 text-white font-bold py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm" aria-label="Editar Perfil">
                    Editar Perfil
                </button>
            </div>

            <div className="space-y-3">
                {menuOptions.map(option => (
                    <button key={option.id} className="w-full bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-4 flex items-center justify-between text-white text-left hover:bg-black/30 transition-colors">
                        <div className="flex items-center space-x-4">
                            {option.icon}
                            <span className="font-bold">{option.name}</span>
                        </div>
                        <svg aria-hidden="true" className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileScreen;
