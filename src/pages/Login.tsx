import React, { useState } from 'react';

const LoginUsuario: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Simulação de envio do formulário
        try {
            // Substitua com a chamada real de API
            // const response = await loginUsuarioApi({ email, senha });
            setSuccess('Login realizado com sucesso!');
        } catch (err) {
            setError('Erro ao realizar o login.');
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
            </form>
            {error && <p className='text-red-500 mt-4'>{error}</p>}
            {success && <p className='text-green-500 mt-4'>{success}</p>}
        </div>
    );
};

export default LoginUsuario;
