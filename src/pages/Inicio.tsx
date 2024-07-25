// src/pages/dashboard.tsx
import { useEffect } from "react";

import { useUsuario } from "@/context/ContextoUsuario";

const Dashboard = () => {
  const {  atualizarReceitas } = useUsuario();

  useEffect(() => {
    const handleResize = () => {
      atualizarReceitas();
    };

    // Adiciona o listener para o evento de resize
    window.addEventListener('resize', handleResize);

    // Remove o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [atualizarReceitas]);

  

  return (
    <div className = "flex flex-col justify-center items-center h-2/3">
      <h1 className = "text-5xl text-green-950 font-bold">Seja bem vindo ao MyWallet!</h1>
      <h1 >Seu gerenciador financeiro particular 😉</h1>
    </div>
  );
};

export default Dashboard;
