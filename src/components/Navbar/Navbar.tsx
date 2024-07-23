import React from 'react';
import DropdownMenu from './MenuHamburguer'

export default function Navbar() {


    return (
        <nav className="p-11">
            <div className="container mx-auto flex justify-between items-center">

                <DropdownMenu/>
                {/* Botão do Menu Hambúrguer */}
                <div className="flex items-center">
                   
   
                   
                </div>

                {/* Texto Central */}
                <div>
                    <span className="text-black text-2xl font-bold">MyWallet 🗃️</span>
                </div>

                {/* Lado Direito (vazio por enquanto) */}
                <div className="flex items-center">
                    {/* Conteúdo vazio */}
                </div>
            </div>

            
        </nav>
    );
}
