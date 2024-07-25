// src/pages/receitas.tsx

import React, { useEffect, useState } from "react";
import { useUsuario } from "@/context/ContextoUsuario";
import {
  TrashIcon,
  PencilIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"; // Importando ícones
import {
  deletarReceita,
  editarReceita,
  finalizarReceita,
  obterReceitaPorId,
} from "@/services/ReceitaService";
import router from "next/router";
import { Status } from "@/enums/Status";

export default function Receitas() {
  const { usuario, atualizarReceitas } = useUsuario(); // Supondo que você tenha uma função para atualizar receitas no seu contexto
  const [receitas, setReceitas] = useState(usuario?.receitas || []);

  useEffect(() => {
    atualizarReceitas();
    if (usuario?.receitas) {
      setReceitas(usuario?.receitas);
    }
  }, [usuario]);

  const handleDelete = async (id: number) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja excluir a receita ${id}?`
    );

    if (confirmacao) {
      try {
        await deletarReceita(id);
        setReceitas(receitas.filter((receita) => receita.id !== id));
      } catch (error) {
        alert("Não foi possível excluir a receita: " + error);
      }
    } else {
      console.log(`A exclusão da receita com ID ${id} foi cancelada.`);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      router.push(`/EditarConta?id=${id}&tipo=receita`);
      await editarReceita(id, await obterReceitaPorId(id));
    } catch (error) {
      alert("Não foi possível editar a receita: " + error);
    }
  };

  const handleFinalize = async (id: number) => {
    const confirmacao = window.confirm(`Tem certeza?`);

    if (confirmacao) {
      try {
        if (usuario?.id) {
          const [ReceitaAtualizada, usuarioAtualizado] = await finalizarReceita(
            id,
            usuario.id
          );
          setReceitas(
            receitas.map((receita) =>
              receita.id === id
                ? { ...ReceitaAtualizada, status: Status.FINALIZADO }
                : receita
            )
          );
          alert(
            `Receita finalizada com sucesso! Saldo Atualizado: R$ ${usuarioAtualizado.saldo}`
          );
          atualizarReceitas(); // Atualize as receitas após a finalização
        } else {
          console.error("ID do usuário não definido.");
        }
      } catch (error) {
        console.error(`A finalização da receita com ID ${id} falhou: ${error}`);
      }
    }
  };

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

  // Verifique se o usuário está carregado e tem receitas
  if (!usuario || !usuario.receitas) {
    return <div>Carregando receitas...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-center text-3xl mb-3 font-bold">Receitas</h2>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Titulo
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
          {usuario.receitas.length > 0 ? (
            usuario.receitas.map((receita, index) => (
              <tr
                key={index}
                className={receita.status === Status.FINALIZADO ? 'bg-gray-300' : ''}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receita.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receita.descricao}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receita.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {receita.valor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                  {receita.status === Status.FINALIZADO ? (
                    <span className="text-gray-500">FINALIZADO</span>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDelete(receita.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Excluir"
                      >
                        <TrashIcon className="h-5 w-5" title="Excluir" />
                      </button>
                      <button
                        onClick={() => handleEdit(receita.id)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Editar"
                      >
                        <PencilIcon className="h-5 w-5" title="Editar" />
                      </button>
                      <button
                        onClick={() => handleFinalize(receita.id)}
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
                  {receita.status === Status.FINALIZADO && (
                    <button
                      onClick={() => handleDelete(receita.id)}
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
                Nenhuma receita encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
