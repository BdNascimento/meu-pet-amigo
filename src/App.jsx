import React, { useState, useEffect, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Importando nossos componentes
import GlobalStyles from './components/GlobalStyles';
import NavigationBar from './components/NavigationBar';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ServicesScreen from './screens/ServicesScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatModal from './modals/ChatModal';
import EditProfileModal from './modals/EditProfileModal';

// Componente Principal do App
export default function App() {
    const [activeScreen, setActiveScreen] = useState('home');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [petData, setPetData] = useState({
        name: 'Rex',
        breed: 'Labrador Retriever',
        photo: 'https://images.unsplash.com/photo-1587402092301-721638668283?q=80&w=2574&auto=format&fit=crop'
    });

    const fileInputRef = useRef(null);
    const [greeting, setGreeting] = useState('Olá, Rex!');

     useEffect(() => {
        const updateGreeting = () => {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                setGreeting(`Bom dia, ${petData.name}! ☀️`);
            } else if (hour >= 12 && hour < 18) {
                setGreeting(`Boa tarde, ${petData.name}! 🌤️`);
            } else {
                setGreeting(`Boa noite, ${petData.name}! 🌙`);
            }
        };
        updateGreeting();
    }, [petData.name]);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handlePhotoChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const newPhotoURL = URL.createObjectURL(event.target.files[0]);
            setPetData(prev => ({...prev, photo: newPhotoURL}));
            toast.success('Foto atualizada! 📸');
        }
    };
    
    const handleSaveProfile = (newPetData) => {
        setPetData(newPetData);
    };


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
                <NavigationBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
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
