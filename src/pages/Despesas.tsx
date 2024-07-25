// src/components/Despesas.tsx

import React, { useState, useEffect } from "react";
import { useUsuario } from "@/context/ContextoUsuario";
import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  deletarDespesa,
  finalizarDespesa,
  editarDespesa,
  obterDespesaPorId,
} from "@/services/DespesaService";
import { Status } from "@/enums/Status";
import router from "next/router";

export default function Despesas() {
  const { usuario, atualizarReceitas } = useUsuario();
  const [despesas, setDespesas] = useState(usuario?.despesas || []);

  useEffect(() => {
    atualizarReceitas();
    if (usuario?.despesas) {
      setDespesas(usuario?.despesas);
    }
  }, [usuario]);

  useEffect(() => {
    const handleResize = () => {
      atualizarReceitas();
    };

    // Adiciona o listener para o evento de resize
    window.addEventListener("resize", handleResize);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [atualizarReceitas]);

  const handleDelete = async (id: number) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir a despesa ${id}?`
    );

    if (confirmacao) {
      try {
        await deletarDespesa(id);
        setDespesas(despesas.filter((despesa) => despesa.id !== id));
      } catch (error) {
        alert("Não foi possível excluir a despesa: " + error);
      }
    } else {
      console.log(`A exclusão da despesa com ID ${id} foi cancelada.`);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      router.push(`/EditarConta?id=${id}&tipo=despesa`);
      await editarDespesa(id, await obterDespesaPorId(id));
    } catch (error) {
      alert("Não foi possível editar a despesa: " + error);
    }
  };

  const handleFinalize = async (id: number) => {
    const confirmacao = window.confirm(`Tem certeza?`);

    if (confirmacao) {
      try {
        if (usuario?.id) {
          const [despesaAtualizada, usuarioAtualizado] = await finalizarDespesa(
            id,
            usuario.id
          );
          setDespesas(
            despesas.map((despesa) =>
              despesa.id === id
                ? { ...despesaAtualizada, status: Status.FINALIZADO }
                : despesa
            )
          );
          alert(
            `Despesa finalizada com sucesso! Saldo Atualizado: R$ ${usuarioAtualizado.saldo}`
          );
          atualizarReceitas(); // Atualize as receitas após a finalização
        } else {
          console.error("ID do usuário não definido.");
        }
      } catch (error) {
        console.error(`A finalização da despesa com ID ${id} falhou: ${error}`);
      }
    }
  };

  if (!usuario || !usuario.despesas) {
    return <div>Carregando despesas...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-center text-3xl mb-3 font-bold">Despesas</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Título
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Opções
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {despesas.length > 0 ? (
            despesas.map((despesa) => (
              <tr
                key={despesa.id}
                className={
                  despesa.status === Status.FINALIZADO ? "bg-gray-300" : ""
                }
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {despesa.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {despesa.descricao}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {despesa.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {despesa.valor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">



                  {despesa.status === Status.FINALIZADO ? (

                    <span className="text-gray-500">FINALIZADO</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(despesa.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Excluir"
                      >
                        <TrashIcon className="h-5 w-5" title="Excluir" />
                      </button>
                      <button
                        onClick={() => handleEdit(despesa.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar"
                      >
                        <PencilIcon className="h-5 w-5" title="Editar" />
                      </button>
                      <button
                        onClick={() => handleFinalize(despesa.id)}
                        className="text-green-500 hover:text-green-700"
                        aria-label="Finalizar"
                      >
                        <CheckCircleIcon
                          className="h-5 w-5"
                          title="Finalizar"
                        />
                      </button>
                    </>
                  )}
                  {despesa.status === Status.FINALIZADO && (
                    <button
                      onClick={() => handleDelete(despesa.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Excluir"
                    >
                      <TrashIcon className="h-5 w-5" title="Excluir" />
                    </button>
                  )}

                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Nenhuma despesa encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
