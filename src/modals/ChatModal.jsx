import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const TypingIndicator = () => (
    <div className="flex justify-start">
        <div className="p-3 rounded-2xl max-w-xs lg:max-w-md bg-gray-100 rounded-bl-none">
            <div className="flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full typing-bubble"></div>
            </div>
        </div>
    </div>
);

const ChatModal = ({ isOpen, onClose, petName }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef(null);
    const inputRef = useRef(null);
    
    useEffect(() => {
        if(isOpen) {
            const savedMessages = localStorage.getItem('chatHistory');
            if (savedMessages && JSON.parse(savedMessages).length > 0) {
                 setMessages(JSON.parse(savedMessages));
            } else {
                const initialMessage = { role: 'assistant', content: `Olá! Sou seu assistente virtual. Em que posso ajudar com o ${petName} hoje?` };
                setMessages([initialMessage]);
            }
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen, petName]);

    useEffect(() => {
        if(messages.length > 0) {
            localStorage.setItem('chatHistory', JSON.stringify(messages));
        }
    }, [messages]);

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

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Cole sua chave aqui APENAS para testes locais
            
            if (!apiKey) {
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
                throw new Error(`API error: ${res.status}`);
            }

            const data = await res.json();
            const assistantResponse = data.candidates[0]?.content?.parts[0]?.text || "Desculpe, não consegui pensar em uma resposta. 🐾";
            
            setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);

        } catch (error) {
            console.error("Erro ao chamar a API:", error);
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
                        />
                         <button onClick={handleSendMessage} className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-400" aria-label="Enviar mensagem" disabled={isLoading}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
