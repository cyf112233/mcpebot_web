import Image from "next/image";
import MinecraftServerStatus from "./components/MinecraftServerStatus";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white">
      <header className="w-full max-w-4xl mb-12">
        <h1 className="text-4xl font-bold mb-4">mcpebot无规则生存服务器</h1>
        <h2 className="text-2xl font-semibold text-green-400">欢迎你的游玩</h2>
      </header>
      
      <main className="w-full max-w-4xl flex-1">
        
        <section className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4">Minecraft服务器</h2>
          <MinecraftServerStatus />
        </section>
      </main>
      
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-gray-800">
        <p className="text-center text-sm text-gray-400">&copy; 2024 Minecraft服务器状态监控</p>
      </footer>
    </div>
  );
}
