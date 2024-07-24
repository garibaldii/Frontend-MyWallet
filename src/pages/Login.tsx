    import Link from 'next/link';
    import React, { useState } from 'react';
    import routes from '../../routes';
    import { useRouter } from 'next/router';
    import { loginUsuario } from '@/services/authService';

    const LoginUsuario: React.FC = () => {
        const [email, setEmail] = useState<string>('');
        const [senha, setSenha] = useState<string>('');
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);
        const [success, setSuccess] = useState<string | null>(null);
        const router = useRouter();

        const handleSubmit = async (event: React.FormEvent) => {
            event.preventDefault();
            setLoading(true);
            setError(null);
            setSuccess(null);

            // Simulação de envio do formulário
            try {
                const response = await loginUsuario(email, senha);
                setSuccess('Login realizado com sucesso!');
                router.push(routes.inicio)
            } catch (err) {
                setError('Erro ao realizar o login. ' + err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="flex justify-center items-center flex-col min-h-screen p-4 bg-gray-100">
                <h1 className="text-5xl font-bold mb-4">Login</h1>
                <h2 className="text-3xl font-semibold mb-6">
                    Já possui uma conta? Entre com seus dados!
                </h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="senha"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className='w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-400'
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                    <p className = "flex gap-1"> Não possui uma Conta?    
                        <Link href={routes.home} className='underline font-bold '>Cadastre-se Aqui</Link>
                    </p>
                </form>
                {error && <p className='text-red-500 mt-4'>{error}</p>}
                {success && <p className='text-green-500 mt-4'>{success}</p>}
            </div>
        );
    };

    export default LoginUsuario;
