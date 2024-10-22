import React, { useState } from 'react';
import { cadastraUsuario } from '@/services/userService';
import { UsuarioComum } from '@/models/UsuarioComum';
import Link from 'next/link';
import routes from '../../routes';
import { Router, useRouter } from 'next/router';

const fileToBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        const blob = new Blob([reader.result], { type: file.type });
        console.log("Blob criado com sucesso:", blob);
        resolve(blob);
      } else {
        reject(new Error('Erro ao ler o arquivo.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo.'));
    };

    reader.readAsArrayBuffer(file);
  });
};


const CadastroUsuario: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [saldo, setSaldo] = useState<number | string>('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const fotoBlob: Blob = foto ? await fileToBlob(foto) : new Blob(); // Garante que fotoBlob nunca seja null

      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('email', email);
      formData.append('senha', senha);
      formData.append('saldo', String(saldo));
      formData.append('foto', fotoBlob, foto?.name || 'default.jpg')

      const resposta = await fetch('http://localhost:8080/api/usuarioComum/', {
        method: 'POST',
        body: formData,
      });

      if(!resposta.ok){
        throw new Error("ERRO AO CADASTRAR USUÁRIO")
      }

      setSuccess('Usuário cadastrado com sucesso!');
      
    } catch (err) {
      setError('Erro ao cadastrar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const blob = await fileToBlob(file);
  
      console.log("Tamanho do Blob:", blob.size);
      console.log("Tipo do Blob:", blob.type);
      console.log("Tamanho do Arquivo Original:", file.size);
      console.log("Tipo do Arquivo Original:", file.type);
  
      // Opcional: Crie uma URL do Blob para visualização
      const url = URL.createObjectURL(blob);
      console.log("URL do Blob:", url);
  
      // Limpe a URL após o uso
      URL.revokeObjectURL(url);
    }
  };
  ;

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col items-center'>
        <h1 className='text-5xl font-bold mb-4'>Bem-vindo ao MyWallet 🗃️</h1>
        <h2 className='text-3xl font-semibold mb-4'>Cadastre-se Agora!</h2>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
          <div className='mb-4'>
            <label htmlFor="nome" className='block text-gray-700 text-sm font-medium mb-1'>Nome Completo</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 text-sm font-medium mb-1'>Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="senha" className='block text-gray-700 text-sm font-medium mb-1'>Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="saldo" className='block text-gray-700 text-sm font-medium mb-1'>Saldo</label>
            <input
              id="saldo"
              type="number"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="foto" className='block text-gray-700 text-sm font-medium mb-1'>Foto</label>
            <input
              id="foto"
              type="file"
              onChange={handleFileChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className='w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-zinc-950 disabled:bg-blue-300'
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <p>Já possui conta?
            <Link href={routes.login} className='underline font-bold '>Entre aqui</Link>
          </p>
        </form>
        {error && <p className='text-red-500 mt-4'>{error}</p>}
        {success && <p className='text-green-500 mt-4'>{success}</p>}
      </div>
    </div>
  );
};

export default CadastroUsuario;
