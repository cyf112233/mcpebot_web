import Image from "next/image";
import MinecraftServerStatus from "./components/MinecraftServerStatus";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-white">
      <header className="w-full max-w-4xl mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">mcpebot服务器</h1>
          <h2 className="text-2xl font-semibold text-green-400">欢迎你的游玩</h2>
        </div>
        <a
          href="http://www.mcpebot.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          返回主页
        </a>
      </header>
      
      <main className="w-full max-w-4xl flex-1">
        
        <section className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4">Minecraft服务器</h2>
          <MinecraftServerStatus />
        </section>
      </main>
    </div>
  );
}
