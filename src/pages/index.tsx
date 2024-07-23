//import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });




//vai precisar criar uma funcao que irá consumir o objeto da api e alimentar variáveis locais de cada componente
//por exemplo, navbar deve retornar o nome do usuário, logo terá um método nela.




export default function Home() {
  return (
    <main>
      <div>{Navbar()}</div>
    </main>
  );
}
