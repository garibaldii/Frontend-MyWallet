// src/components/DadosUsuario.tsx

import React from 'react';
import { useUsuario } from '@/context/ContextoUsuario';

const DadosUsuario: React.FC = () => {
  const usuario = useUsuario();

  return (
    <div>
      {usuario ? (
        <div>
          
          <p>Olá <strong>{usuario.nome}</strong></p>
          <p>Saldo: R$ {usuario.saldo},00</p>
          
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}
    </div>
  );
};

export default DadosUsuario;
