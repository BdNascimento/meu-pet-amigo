import React from 'react';

const ProductsScreen = () => {
    const mockProducts = [
        { id: 1, name: 'Ração Hipoalergênica', price: 'R$ 189,90', image: 'https://placehold.co/200x200/dbeafe/1e3a8a?text=Ração' },
        { id: 2, name: 'Brinquedo Mordedor', price: 'R$ 49,90', image: 'https://placehold.co/200x200/fef3c7/b45309?text=Brinquedo' },
        { id: 3, name: 'Shampoo Neutro', price: 'R$ 79,90', image: 'https://placehold.co/200x200/d1d5db/1f2937?text=Shampoo' },
        { id: 4, name: 'Coleira de Couro', price: 'R$ 129,90', image: 'https://placehold.co/200x200/fde68a/854d0e?text=Coleira' }
    ];
    
    const aiRecommendation = mockProducts[0];

    return (
        <div className="screen bg-gradient-to-br from-teal-600 via-blue-700 to-blue-800 text-white p-6 space-y-6 animated-gradient">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Nossos Produtos</h2>
                <div className="relative">
                    <input type="text" placeholder="Buscar por ração, brinquedo..." className="w-full p-3 pl-10 rounded-full border border-white/30 bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-white/70" />
                    <svg aria-hidden="true" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-[15px] p-4 rounded-2xl shadow-lg border border-white/20">
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    <span className="bg-amber-500 text-black text-xs font-bold mr-2 px-2.5 py-0.5 rounded-full">Recomendado</span>
                    <span>para o Rex 🐶</span>
                </h3>
                <div className="bg-white/10 p-3 rounded-xl flex items-center space-x-4">
                    <img src={aiRecommendation.image} alt={aiRecommendation.name} className="w-20 h-20 rounded-lg object-cover" loading="lazy"/>
                    <div className="flex-1">
                        <p className="text-sm text-white/80">Como o Rex tem pele sensível...</p>
                        <h4 className="font-bold text-white">{aiRecommendation.name}</h4>
                        <p className="font-semibold text-amber-300">{aiRecommendation.price}</p>
                    </div>
                    <button className="bg-amber-500 text-black p-2 rounded-full hover:bg-amber-400 transition-colors" aria-label={`Adicionar ${aiRecommendation.name} ao carrinho`}>
                        <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold text-white mb-2">Todos os Produtos</h3>
                <div className="grid grid-cols-2 gap-4">
                    {mockProducts.map(product => (
                        <div key={product.id} className="bg-black/20 backdrop-blur-[15px] border border-white/20 rounded-2xl p-3 text-center text-white" aria-label={`Produto: ${product.name}, Preço: ${product.price}`}>
                            <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" loading="lazy"/>
                            <h4 className="font-bold text-sm">{product.name}</h4>
                            <p className="text-white/80 font-semibold">{product.price}</p>
                            <button className="w-full mt-2 bg-white/10 text-white font-bold py-2 rounded-lg hover:bg-white/20 transition-colors">
                                Adicionar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsScreen;
