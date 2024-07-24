// src/context/UsuarioContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { retornaUsarioJwt } from '@/services/userService';
import { UsuarioComum } from '@/models/UsuarioComum';

// Define o tipo do contexto
type UsuarioContextType = UsuarioComum | null;

// Cria o contexto com o tipo definido
const UsuarioContext = createContext<UsuarioContextType>(null);

interface UsuarioProviderProps {
    children: ReactNode;
}

// Provedor do contexto
export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
    const [usuario, setUsuario] = useState<UsuarioContextType>(null);

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const usuario = await retornaUsarioJwt();
                setUsuario(usuario);
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
            }
        };

        carregarUsuario();
    }, []);

    return (
        <UsuarioContext.Provider value={usuario}>
            {children}
        </UsuarioContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useUsuario = () => useContext(UsuarioContext);
