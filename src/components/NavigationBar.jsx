import React from 'react';

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

export default NavigationBar;
