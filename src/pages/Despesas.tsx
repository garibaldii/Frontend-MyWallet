import React, { useState, useEffect } from 'react';
import { useUsuario } from '@/context/ContextoUsuario';
import { TrashIcon, PencilIcon, CheckCircleIcon } from '@heroicons/react/24/outline'; // Importando ícones
import { deletarDespesa, finalizarDespesa } from '@/services/DespesaService';
import { Status } from '@/enums/Status';

export default function Despesas() {
  const usuario = useUsuario();
  const [despesas, setDespesas] = useState(usuario?.despesas || []);

  useEffect(() => {
    if (usuario && usuario.despesas) {
      setDespesas(usuario.despesas);
    }
  }, [usuario]);

  const handleDelete = async (id: number) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir a despesa ${id}?`);

    if (confirmacao) {
      try {
        await deletarDespesa(id);
        setDespesas(despesas.filter(despesa => despesa.id !== id));
      } catch (error) {
        alert("Não foi possível excluir a despesa: " + error);
      }
    } else {
      console.log(`A exclusão da despesa com ID ${id} foi cancelada.`);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Editar despesa com ID: ${id}`);
    // Implementar lógica para editar a despesa
  };

  const handleFinalize = async (id: number) => {
    const confirmacao = window.confirm(`Tem certeza?`);

    if (confirmacao) {
      try {
        await finalizarDespesa(id, usuario!.id);
        setDespesas(despesas.map(despesa =>
          despesa.id === id ? { ...despesa, status: Status.FINALIZADO } : despesa
        ));
        alert(`Despesa finalizada com sucesso! Saldo Atualizado: R$ ${usuario!.saldo}`);
      } catch (error) {
        console.log(`A finalização da despesa com ID ${id} foi cancelada.`);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-center text-3xl mb-3 font-bold">Despesas</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opções</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {despesas.length > 0 ? (
            despesas.map((despesa, index) => (
              <tr key={index} className={despesa.status === Status.FINALIZADO ? 'bg-gray-300' : ''}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despesa.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despesa.descricao}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despesa.categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{despesa.valor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  {despesa.status !== Status.FINALIZADO && (
                    <>
                      <button
                        onClick={() => handleDelete(despesa.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Excluir"
                      >
                        <TrashIcon className="h-5 w-5" title='Excluir' />
                      </button>
                      <button
                        onClick={() => handleEdit(despesa.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar"
                      >
                        <PencilIcon className="h-5 w-5" title='Editar' />
                      </button>
                      <button
                        onClick={() => handleFinalize(despesa.id)}
                        className="text-green-500 hover:text-green-700"
                        aria-label="Finalizar"
                      >
                        <CheckCircleIcon className="h-5 w-5" title='Finalizar' />
                        
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhuma despesa encontrada</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
