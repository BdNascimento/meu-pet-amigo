import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose, petData, onSave, handleAvatarClick }) => {
    const [localPetData, setLocalPetData] = useState(petData);
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setLocalPetData(petData);
        if(isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, petData]);

    const handleSaveClick = () => {
        if (!localPetData.name.trim()) {
            toast.error("O nome do pet não pode ficar em branco.");
            return;
        }
        if (localPetData.breed.trim().length < 2) {
            toast.error("A raça deve ter pelo menos 2 caracteres.");
            return;
        }
        setIsSaving(true);
        setTimeout(() => {
            onSave(localPetData);
            setIsSaving(false);
            toast.success('Perfil salvo com sucesso! 🐾');
            onClose();
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-fade-in z-50 p-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 w-full max-w-sm text-gray-800 animate-slide-up space-y-4">
                <h2 id="edit-profile-title" className="text-2xl font-bold text-center">Editar Perfil do Pet</h2>
                <div>
                    <label htmlFor="petName" className="font-semibold text-sm">Nome do Pet</label>
                    <input 
                        ref={inputRef}
                        id="petName"
                        type="text"
                        value={localPetData.name}
                        onChange={(e) => setLocalPetData(prev => ({...prev, name: e.target.value}))}
                        className="w-full p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        disabled={isSaving}
                    />
                </div>
                 <div>
                    <label htmlFor="petBreed" className="font-semibold text-sm">Raça</label>
                    <input 
                        id="petBreed"
                        type="text"
                        value={localPetData.breed}
                        onChange={(e) => setLocalPetData(prev => ({...prev, breed: e.target.value}))}
                        className="w-full p-2 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        disabled={isSaving}
                    />
                </div>
                <button onClick={handleAvatarClick} className="w-full bg-gray-200 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-300 transition-colors" disabled={isSaving}>
                    Trocar Foto
                </button>
                <div className="flex space-x-2">
                     <button onClick={onClose} className="w-full bg-gray-400 text-white font-bold py-2 rounded-lg hover:bg-gray-500 transition-colors" disabled={isSaving}>
                        Cancelar
                    </button>
                    <button onClick={handleSaveClick} className="w-full bg-amber-500 text-black font-bold py-2 rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center" disabled={isSaving}>
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
