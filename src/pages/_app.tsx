// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { UsuarioProvider } from "@/context/ContextoUsuario";
import Navbar from '@/components/Navbar/Navbar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  // Lista de caminhos onde a Navbar não deve ser exibida
  const noNavbarPaths = ['/', '/Login'];

  // Verifica se o caminho atual está na lista de caminhos onde a Navbar não deve ser exibida
  const showNavbar = !noNavbarPaths.includes(pathname);

  return (
    <UsuarioProvider>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </UsuarioProvider>
  );
}
