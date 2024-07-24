// src/pages/contasFinalizadas.tsx

import React from 'react';
import { useUsuario } from '@/context/ContextoUsuario';

export default function ContasFinalizadas() {
  const usuario = useUsuario();

  // Verifique se o usuário está carregado e tem receitas e despesas
  if (!usuario || !usuario.receitas || !usuario.despesas) {
    return <div>Carregando dados...</div>;
  }

  // Filtra receitas e despesas com status 'FINALIZADO'
  const receitasFinalizadas = usuario.receitas.filter(receita => receita.status === 'FINALIZADO');
  const despesasFinalizadas = usuario.despesas.filter(despesa => despesa.status === 'FINALIZADO');

  // Combina receitas e despesas em uma única lista
  const contasFinalizadas = [
    ...receitasFinalizadas.map(item => ({ ...item, tipo: 'Receita' })),
    ...despesasFinalizadas.map(item => ({ ...item, tipo: 'Despesa' })),
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {contasFinalizadas.length > 0 ? (
            contasFinalizadas.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tipo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.descricao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.valor}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma conta finalizada encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
