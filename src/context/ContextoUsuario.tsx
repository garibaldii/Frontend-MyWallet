// src/context/UsuarioContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { retornaUsarioJwt } from '@/services/userService';
import { UsuarioComum } from '@/models/UsuarioComum';

// Tipo do contexto que inclui o objeto `usuario` e a função `atualizarReceitas`
type UsuarioContextType = {
  usuario: UsuarioComum | null;
  atualizarReceitas: () => void;
};

// Cria o contexto com o tipo definido
const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

interface UsuarioProviderProps {
  children: ReactNode;
}

// Provedor do contexto
export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioComum | null>(null);

  const carregarUsuario = async () => {
    try {
      const usuario = await retornaUsarioJwt();
      setUsuario(usuario);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  // Função para atualizar as receitas
  const atualizarReceitas = async () => {
    try {
      await carregarUsuario();
    } catch (error) {
      console.error('Erro ao atualizar receitas:', error);
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, atualizarReceitas }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (context === undefined) {
    throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
  }
  return context;
};
