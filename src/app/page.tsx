import TicTacToe from "@/components/TicTacToe";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-color-100">
      <TicTacToe/>
    </main>
  );
}
