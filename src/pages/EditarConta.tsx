// src/pages/contaEdit.tsx

import React, { useState, useEffect } from 'react';
import { useUsuario } from '@/context/ContextoUsuario';
import { editarReceita, obterReceitaPorId } from '@/services/ReceitaService';
import { editarDespesa, obterDespesaPorId } from '@/services/DespesaService';
import { Receita } from '@/models/Receita';
import { Despesa } from '@/models/Despesa';
import { useRouter } from 'next/router';
import routes from '../../routes';

enum CategoriaReceita {
    SALARIO = "Salário",
    INVESTIMENTO = "Investimento",
    PRODUTOS_E_SERVIÇOS = "Produtos e Serviços Vendidos",
}

enum CategoriaDespesa {
    ALIMENTACAO = "Alimentação",
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    SEGURO_MEDICO = "Seguro Médico",
}

export default function ContaEdit() {
    const [fase, setFase] = useState<'primeira' | 'segunda'>('primeira');
    const [tipoConta, setTipoConta] = useState<'receita' | 'despesa' | null>(null);
    const [categoria, setCategoria] = useState('');
    const [valor, setValor] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idConta, setIdConta] = useState<number | null>(null);

    const router = useRouter();
    const usuario = useUsuario();
    const categoriasReceita = Object.values(CategoriaReceita);
    const categoriasDespesa = Object.values(CategoriaDespesa);

    useEffect(() => {
        const id = router.query.id as string;
        const tipo = router.query.tipo as string;
        if (id && tipo) {
            setIdConta(Number(id));
            setTipoConta(tipo as 'receita' | 'despesa');
            buscarConta(Number(id), tipo as 'receita' | 'despesa');
        }
    }, [router.query.id, router.query.tipo]);

    const buscarConta = async (id: number, tipo: 'receita' | 'despesa') => {
        try {
            if (tipo === 'receita') {
                const conta = await obterReceitaPorId(id);
                setCategoria(conta.categoria);
                setValor(conta.valor.toString());
                setTitulo(conta.titulo);
                setDescricao(conta.descricao);
            } else if (tipo === 'despesa') {
                const conta = await obterDespesaPorId(id);
                setCategoria(conta.categoria);
                setValor(conta.valor.toString());
                setTitulo(conta.titulo);
                setDescricao(conta.descricao);
            }
            setFase('segunda');
        } catch (error) {
            console.error('Erro ao buscar conta:', error);
            alert('Erro ao buscar conta');
        }
    };

    const handleTipoContaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTipoConta(event.target.value as 'receita' | 'despesa');
        setCategoria('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!usuario) {
            alert('Usuário não autenticado');
            return;
        }

        const data = {
            tipoConta,
            categoria,
            valor: parseFloat(valor),
            titulo,
            descricao,
            usuario: usuario,
        };

        try {
            if (tipoConta === 'receita') {
                if (idConta) {
                    await editarReceita(idConta, data as unknown as Receita);
                }
            } else if (tipoConta === 'despesa') {
                if (idConta) {
                    await editarDespesa(idConta, data as unknown as Despesa);
                }
            }
            alert('Conta editada com sucesso');
            router.push(routes.inicio);
        } catch (error) {
            console.error('Erro ao editar conta:', error);
            alert('Erro ao editar conta');
        }
    };

    return (
        <div className="relative max-w-lg mx-auto">
            {/* Botão Voltar */}
            {fase === 'segunda' && (
                <button
                    type="button"
                    onClick={() => setFase('primeira')}
                    className="absolute top-4 left-4 bg-gray-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-600"
                >
                    <span className="text-xl">←</span>
                </button>
            )}

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fase === 'primeira' && (
                        <div className="space-y-4">
                            {/* Seção 1: Escolha entre Receita e Despesa */}
                            <fieldset>
                                <legend className="text-lg font-semibold text-center p-4">Escolha o Tipo de Conta</legend>
                                <div className="flex justify-center space-x-4 text-center p-4">
                                    <label>
                                        <input
                                            type="radio"
                                            value="receita"
                                            checked={tipoConta === 'receita'}
                                            onChange={handleTipoContaChange}
                                            className="mr-2"
                                        />
                                        Receita
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            value="despesa"
                                            checked={tipoConta === 'despesa'}
                                            onChange={handleTipoContaChange}
                                            className="mr-2"
                                        />
                                        Despesa
                                    </label>
                                </div>
                            </fieldset>

                            {/* Categoria */}
                            <div>
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                                    Categoria
                                </label>
                                <select
                                    id="categoria"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    disabled={!tipoConta} 
                                    required
                                >
                                    <option value="">Selecione a Categoria</option>
                                    {tipoConta === 'receita' && categoriasReceita.map(categoria => (
                                        <option key={categoria} value={categoria}>{categoria}</option>
                                    ))}
                                    {tipoConta === 'despesa' && categoriasDespesa.map(categoria => (
                                        <option key={categoria} value={categoria}>{categoria}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Botão Próximo */}
                            <button
                                type="button"
                                onClick={() => setFase('segunda')}
                                disabled={!tipoConta || !categoria}
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                            >
                                Próximo
                            </button>
                        </div>
                    )}

                    {fase === 'segunda' && (
                        <div className="space-y-4">
                            {/* Seção 2: Campos Adicionais */}
                            <div>
                                <label htmlFor="valor" className="block text-sm mt-10 font-medium text-gray-700">
                                    Valor
                                </label>
                                <input
                                    type="number"
                                    id="valor"
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    required
                                    min="0"
                                />
                            </div>

                            <div>
                                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    id="titulo"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                                    Descrição
                                </label>
                                <textarea
                                    id="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Botão Salvar */}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600"
                            >
                                Salvar
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
