// src/components/Navbar/Navbar.tsx

import React, { useEffect, useState } from "react";
import DropdownMenu from "./MenuHamburguer";
import DadosUsuario from "./DadosUsuario";
import { useUsuario } from "../../context/ContextoUsuario"
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { usuario, atualizarReceitas } = useUsuario();

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
    <nav className="p-11">
      <div className="container mx-auto flex justify-between items-center relative">
        <div className="flex items-center">
          <button className="p-2 focus:outline-none" onClick={() => setOpenMenu((prev) => !prev)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 18H21V20H3V18Z" fill="currentColor" />
              <path d="M3 11H21V13H3V11Z" fill="currentColor" />
              <path d="M3 4H21V6H3V4Z" fill="currentColor" />
            </svg>
          </button>
          <DropdownMenu isOpen={openMenu} closeMenu={() => setOpenMenu(false)} />
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/Inicio">
            <span className="text-black text-2xl font-bold">MyWallet 🗃️</span>
          </Link>
        </div>

        <div className="flex items-center">
          <DadosUsuario />
        </div>
      </div>
    </nav>
  );
}
