// src/pages/receitas.tsx

import React from 'react';
import { useUsuario } from '@/context/ContextoUsuario';
import { TrashIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline'; // Importando ícones


export default function Receitas() {
  const usuario = useUsuario();

  // Verifique se o usuário está carregado e tem receitas
  if (!usuario || !usuario.receitas) {
    return <div>Carregando receitas...</div>;
  }

    // Funções fictícias para as ações dos ícones
    const handleDelete = (id: string) => {
      
    };
    
  
    const handleEdit = (id: string) => {
      console.log(`Editar despesa com ID: ${id}`);
      // Implementar lógica para editar a despesa
    };
  
    const handleFinalize = (id: string) => {
      console.log(`Finalizar despesa com ID: ${id}`);
      // Implementar lógica para finalizar a despesa
    };

  return (
    <div className="overflow-x-auto">

    <h2 className="text-center text-3xl mb-3 font-bold">Receitas</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titulo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opções</th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuario.receitas.length > 0 ? (
            usuario.receitas.map((receita, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receita.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receita.descricao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receita.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receita.valor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  <button
                    onClick={() => handleDelete(receita.titulo)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Excluir"
                  >
                    <TrashIcon className="h-5 w-5" title='Excluir' />
                  </button>
                  <button
                    onClick={() => handleEdit(receita.titulo)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Editar"
                  >
                    <PencilIcon className="h-5 w-5" title='Editar'/>
                  </button>
                  <button
                    onClick={() => handleFinalize(receita.titulo)}
                    className="text-green-500 hover:text-green-700"
                    aria-label="Finalizar"
                  >
                    <CheckCircleIcon className="h-5 w-5 "  title='Finalizar'/>
                    
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma receita encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
