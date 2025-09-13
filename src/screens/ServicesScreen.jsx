import React from 'react';

const ServicesScreen = () => {
    const featuredService = { id: 1, name: 'Banho & Tosa Premium', description: 'Cuidado completo com shampoo hipoalergênico e tosa na tesoura.', icon: <svg aria-hidden="true" className="w-12 h-12 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg> };
    const otherServices = [
        { id: 2, name: 'Consulta Veterinária', description: 'Check-up completo com nossos especialistas.' },
        { id: 3, name: 'Adestramento Básico', description: 'Aulas em grupo para um pet bem-comportado.' },
        { id: 4, name: 'Hotel para Pets', description: 'Conforto e segurança enquanto você viaja.' }
    ];

    return (
        <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient">
            <h2 className="text-3xl font-bold text-white">Nossos Serviços</h2>
            
            <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    <span className="text-amber-300 mr-2">⭐</span>
                    <span>Serviço em Destaque</span>
                </h3>
                <div className="bg-white/10 p-4 rounded-xl flex items-center space-x-4">
                    {featuredService.icon}
                    <div className="flex-1">
                        <h4 className="font-bold text-white">{featuredService.name}</h4>
                        <p className="text-sm text-white/80">{featuredService.description}</p>
                    </div>
                    <button className="bg-amber-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-amber-400 transition-colors" aria-label={`Agendar ${featuredService.name}`}>
                        Agendar
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-2">Outros Serviços</h3>
                <div className="space-y-3">
                    {otherServices.map(service => (
                        <div key={service.id} className="bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-3 flex items-center justify-between text-white" aria-label={`Serviço: ${service.name}`}>
                            <div>
                                <h4 className="font-bold text-sm">{service.name}</h4>
                                <p className="text-xs text-white/70">{service.description}</p>
                            </div>
                            <button className="bg-white/10 text-white font-bold py-2 px-3 rounded-lg hover:bg-white/20 transition-colors text-sm">
                                Agendar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;
